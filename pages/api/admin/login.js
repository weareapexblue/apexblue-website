import { createAdminSessionCookie, isAdminAuthConfigured, verifyAdminCredentials } from '@/lib/adminAuth';

function cleanText(value, maxLength = 320) {
  if (!value) return '';
  return String(value).trim().slice(0, maxLength);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const username = cleanText(req.body?.username, 320).toLowerCase();
  const password = cleanText(req.body?.password, 320);

  if (!isAdminAuthConfigured()) {
    return res.status(503).json({
      ok: false,
      error: 'Admin authentication is not configured on this environment.'
    });
  }

  if (!verifyAdminCredentials(username, password)) {
    return res.status(401).json({ ok: false, error: 'Invalid credentials.' });
  }

  const sessionCookie = createAdminSessionCookie(username);
  res.setHeader('Set-Cookie', sessionCookie);

  return res.status(200).json({ ok: true });
}
