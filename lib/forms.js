const FORM_ENDPOINTS = {
  contact: process.env.NEXT_PUBLIC_FORMSPREE_CONTACT || '',
  fractional: process.env.NEXT_PUBLIC_FORMSPREE_FRACTIONAL || '',
  newsletter: process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER || ''
};

export async function submitForm(formType, payload) {
  const endpoint = FORM_ENDPOINTS[formType];

  if (!endpoint) {
    // Keep static export deployments usable even before live form endpoints are connected.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      ok: true,
      simulated: true
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Submission failed. Please try again.');
  }

  return {
    ok: true,
    simulated: false
  };
}
