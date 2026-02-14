import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORM_TYPES = new Set(['contact', 'fractional', 'newsletter']);

function cleanText(value, maxLength = 500) {
  if (!value) return '';
  return String(value).trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function parseFormType(rawFormType) {
  if (Array.isArray(rawFormType)) return rawFormType[0];
  return rawFormType;
}

function validateContactForm(payload) {
  const submission = {
    name: cleanText(payload?.name, 160),
    email: cleanText(payload?.email, 320).toLowerCase(),
    subject: cleanText(payload?.subject, 240),
    message: cleanText(payload?.message, 4000),
    source: cleanText(payload?.source, 120)
  };

  if (!submission.name || !submission.email || !submission.subject) {
    throw new Error('Please complete Name, Email, and Subject.');
  }

  if (!EMAIL_REGEX.test(submission.email)) {
    throw new Error('Please enter a valid email address.');
  }

  return {
    ...submission,
    payload: {
      name: submission.name,
      email: submission.email,
      subject: submission.subject,
      message: submission.message
    }
  };
}

function validateFractionalForm(payload) {
  const submission = {
    companyName: cleanText(payload?.companyName, 200),
    email: cleanText(payload?.email, 320).toLowerCase(),
    phone: cleanText(payload?.phone, 60),
    industry: cleanText(payload?.industry, 200),
    website: cleanText(payload?.website, 500),
    vision: cleanText(payload?.vision, 4000),
    source: cleanText(payload?.source, 120)
  };

  if (!submission.companyName || !submission.email || !submission.phone || !submission.industry || !submission.website) {
    throw new Error('Please complete all required fields before submitting.');
  }

  if (!EMAIL_REGEX.test(submission.email)) {
    throw new Error('Please enter a valid email address.');
  }

  try {
    const parsed = new URL(submission.website);
    if (!parsed.protocol.startsWith('http')) {
      throw new Error('Website must include http or https.');
    }
  } catch (error) {
    throw new Error('Please enter a valid website URL.');
  }

  return {
    name: submission.companyName,
    email: submission.email,
    subject: 'Fractional C-Suite Inquiry',
    source: submission.source,
    payload: {
      companyName: submission.companyName,
      email: submission.email,
      phone: submission.phone,
      industry: submission.industry,
      website: submission.website,
      vision: submission.vision
    }
  };
}

function validateNewsletterForm(payload) {
  const submission = {
    email: cleanText(payload?.email, 320).toLowerCase(),
    source: cleanText(payload?.source, 120)
  };

  if (!submission.email || !EMAIL_REGEX.test(submission.email)) {
    throw new Error('Please enter a valid email address for newsletter updates.');
  }

  return {
    name: '',
    email: submission.email,
    subject: 'Newsletter Subscription',
    source: submission.source,
    payload: {
      email: submission.email
    }
  };
}

function validateFormPayload(formType, payload) {
  if (formType === 'contact') return validateContactForm(payload);
  if (formType === 'fractional') return validateFractionalForm(payload);
  if (formType === 'newsletter') return validateNewsletterForm(payload);
  throw new Error('Unsupported form type.');
}

function getEnvBySuffix(suffix) {
  const match = Object.entries(process.env).find(([key, value]) => key.endsWith(`_${suffix}`) && value);
  return match?.[1] || '';
}

function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    getEnvBySuffix('DATABASE_URL') ||
    getEnvBySuffix('POSTGRES_URL') ||
    getEnvBySuffix('POSTGRES_PRISMA_URL') ||
    getEnvBySuffix('POSTGRES_URL_NON_POOLING') ||
    ''
  );
}

async function ensureTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS form_submissions (
      id BIGSERIAL PRIMARY KEY,
      form_type VARCHAR(40) NOT NULL,
      source VARCHAR(120),
      name VARCHAR(200),
      email VARCHAR(320),
      subject VARCHAR(240),
      payload JSONB NOT NULL,
      ip_address TEXT,
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_form_submissions_type_created
    ON form_submissions (form_type, created_at DESC)
  `;
}

async function storeSubmission(sql, { formType, submission, ipAddress, userAgent }) {
  const rows = await sql`
    INSERT INTO form_submissions (
      form_type,
      source,
      name,
      email,
      subject,
      payload,
      ip_address,
      user_agent
    )
    VALUES (
      ${formType},
      ${submission.source || null},
      ${submission.name || null},
      ${submission.email || null},
      ${submission.subject || null},
      ${JSON.stringify(submission.payload)}::jsonb,
      ${ipAddress || null},
      ${userAgent || null}
    )
    RETURNING id, created_at
  `;

  return rows[0];
}

function buildEmailBody(formType, submission, id, createdAt) {
  const lines = Object.entries(submission.payload).map(([key, value]) => {
    const label = key.replace(/([A-Z])/g, ' $1');
    return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value || '-')}</p>`;
  });

  return `
    <h2>New Apex Blue ${escapeHtml(formType)} submission</h2>
    <p><strong>Submission ID:</strong> ${escapeHtml(id)}</p>
    <p><strong>Submitted:</strong> ${escapeHtml(new Date(createdAt).toISOString())}</p>
    ${lines.join('\n')}
  `;
}

async function sendNotification(formType, submission, id, createdAt) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY for form notifications.');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.FORM_NOTIFICATION_TO || 'guru@apex.blue';
  const from = process.env.FORM_NOTIFICATION_FROM || 'Apex Blue Forms <forms@apex.blue>';
  const subject = `[Apex Blue] New ${formType} submission`;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html: buildEmailBody(formType, submission, id, createdAt)
  });

  if (error) {
    throw new Error(error.message || 'Resend email notification failed.');
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const formType = parseFormType(req.query.formType);
  if (!FORM_TYPES.has(formType)) {
    return res.status(404).json({ ok: false, error: 'Form endpoint not found.' });
  }

  let submission;
  try {
    submission = validateFormPayload(formType, req.body);
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message });
  }

  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) {
    return res.status(503).json({
      ok: false,
      error: 'Form submissions are temporarily unavailable. Database is not configured yet.'
    });
  }

  const sql = neon(databaseUrl);
  const forwardedFor = cleanText(req.headers['x-forwarded-for'], 200);
  const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : cleanText(req.socket?.remoteAddress, 200);
  const userAgent = cleanText(req.headers['user-agent'], 1000);

  try {
    await ensureTable(sql);
    const saved = await storeSubmission(sql, {
      formType,
      submission,
      ipAddress,
      userAgent
    });

    let warning = '';
    try {
      await sendNotification(formType, submission, saved.id, saved.created_at);
    } catch (emailError) {
      warning = 'Saved successfully, but the notification email did not send.';
      console.error('Notification email failed:', emailError);
    }

    return res.status(201).json({
      ok: true,
      submissionId: saved.id,
      warning
    });
  } catch (error) {
    console.error('Form submission failed:', error);
    return res.status(500).json({
      ok: false,
      error: 'Submission failed. Please try again in a moment.'
    });
  }
}
