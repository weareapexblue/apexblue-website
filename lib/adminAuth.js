import crypto from 'crypto';

const COOKIE_NAME = 'apex_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const DEFAULT_USERNAME = 'guru@apex.blue';
const DEFAULT_PASSWORD = 'magic123';
const DEFAULT_SECRET = 'apex-blue-admin-secret-change-me';

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function toBase64Url(input) {
  return Buffer.from(input).toString('base64url');
}

function fromBase64Url(input) {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function getCredentials() {
  const allowDefaults = !isProduction();
  return {
    username: process.env.ADMIN_USERNAME || (allowDefaults ? DEFAULT_USERNAME : ''),
    password: process.env.ADMIN_PASSWORD || (allowDefaults ? DEFAULT_PASSWORD : '')
  };
}

function getSecret() {
  if (process.env.ADMIN_COOKIE_SECRET) {
    return process.env.ADMIN_COOKIE_SECRET;
  }

  return isProduction() ? '' : DEFAULT_SECRET;
}

function safeEqual(a, b) {
  const valueA = Buffer.from(String(a || ''));
  const valueB = Buffer.from(String(b || ''));

  if (valueA.length !== valueB.length) {
    return false;
  }

  return crypto.timingSafeEqual(valueA, valueB);
}

function parseCookieHeader(cookieHeader = '') {
  return cookieHeader
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .reduce((acc, part) => {
      const separator = part.indexOf('=');
      if (separator === -1) return acc;
      const key = decodeURIComponent(part.slice(0, separator).trim());
      const value = decodeURIComponent(part.slice(separator + 1).trim());
      acc[key] = value;
      return acc;
    }, {});
}

function signPayload(payloadText) {
  const secret = getSecret();
  if (!secret) {
    return '';
  }

  return crypto.createHmac('sha256', secret).update(payloadText).digest('base64url');
}

function encodeToken(payloadObject) {
  const payloadText = toBase64Url(JSON.stringify(payloadObject));
  const signature = signPayload(payloadText);
  return `${payloadText}.${signature}`;
}

function decodeToken(token) {
  if (!token || !token.includes('.')) {
    return null;
  }

  const [payloadText, signature] = token.split('.');
  const expectedSignature = signPayload(payloadText);

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(payloadText));
    if (!payload?.exp || Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
}

function formatCookie({
  name,
  value,
  maxAge = SESSION_TTL_SECONDS,
  httpOnly = true,
  secure = process.env.NODE_ENV === 'production',
  sameSite = 'Strict',
  path = '/'
}) {
  const parts = [`${name}=${value}`, `Path=${path}`, `Max-Age=${maxAge}`, `SameSite=${sameSite}`];
  if (httpOnly) parts.push('HttpOnly');
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

export function verifyAdminCredentials(username, password) {
  if (!isAdminAuthConfigured()) {
    return false;
  }

  const credentials = getCredentials();
  return safeEqual(username, credentials.username) && safeEqual(password, credentials.password);
}

export function createAdminSessionCookie(username) {
  if (!isAdminAuthConfigured()) {
    throw new Error('Admin authentication is not configured.');
  }

  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const token = encodeToken({
    sub: username,
    exp: expiresAt
  });

  return formatCookie({
    name: COOKIE_NAME,
    value: token
  });
}

export function clearAdminSessionCookie() {
  return formatCookie({
    name: COOKIE_NAME,
    value: '',
    maxAge: 0
  });
}

export function isAdminAuthConfigured() {
  const credentials = getCredentials();
  const secret = getSecret();

  return Boolean(credentials.username && credentials.password && secret);
}

export function getAdminSession(req) {
  if (!isAdminAuthConfigured()) {
    return null;
  }

  const cookies = parseCookieHeader(req?.headers?.cookie || '');
  const token = cookies[COOKIE_NAME];
  const payload = decodeToken(token);

  if (!payload?.sub) {
    return null;
  }

  return {
    username: payload.sub,
    expiresAt: payload.exp
  };
}
