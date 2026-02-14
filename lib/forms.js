export async function submitForm(formType, payload) {
  const response = await fetch(`/api/forms/${formType}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  let responseBody = {};
  try {
    responseBody = await response.json();
  } catch (error) {
    responseBody = {};
  }

  if (!response.ok) {
    throw new Error(responseBody.error || 'Submission failed. Please try again.');
  }

  return responseBody;
}
