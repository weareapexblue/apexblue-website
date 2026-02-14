import { useState } from 'react';
import { submitForm } from '@/lib/forms';

const initialValues = {
  companyName: '',
  email: '',
  phone: '',
  industry: '',
  website: '',
  vision: ''
};

export default function FractionalInquiryForm() {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  function updateValue(field, value) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const requiredFields = ['companyName', 'email', 'phone', 'industry', 'website'];
    const missingField = requiredFields.find((field) => !values[field].trim());

    if (missingField) {
      setStatus('error');
      setMessage('Please complete all required fields before submitting.');
      return;
    }

    try {
      setStatus('loading');
      setMessage('');
      await submitForm('fractional', {
        ...values,
        source: 'apex-blue-fractional-c-suite-form'
      });

      setStatus('success');
      setMessage('Request submitted. Apex Blue will reply with next steps and a discovery call window.');
      setValues(initialValues);
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="panel grid gap-4 rounded-3xl p-6"
      aria-label="Fractional C-suite information request"
    >
      <div className="grid gap-2 md:grid-cols-2 md:gap-4">
        <div className="grid gap-2">
          <label htmlFor="company-name" className="text-sm font-semibold">
            Company Name
          </label>
          <input
            id="company-name"
            required
            value={values.companyName}
            onChange={(event) => updateValue('companyName', event.target.value)}
            className="focus-ring rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-sky-700 dark:bg-sky-950/60"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="fractional-email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="fractional-email"
            type="email"
            required
            value={values.email}
            onChange={(event) => updateValue('email', event.target.value)}
            className="focus-ring rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-sky-700 dark:bg-sky-950/60"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="fractional-phone" className="text-sm font-semibold">
            Phone
          </label>
          <input
            id="fractional-phone"
            type="tel"
            required
            value={values.phone}
            onChange={(event) => updateValue('phone', event.target.value)}
            className="focus-ring rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-sky-700 dark:bg-sky-950/60"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="fractional-industry" className="text-sm font-semibold">
            Industry / Sector
          </label>
          <input
            id="fractional-industry"
            required
            value={values.industry}
            onChange={(event) => updateValue('industry', event.target.value)}
            className="focus-ring rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-sky-700 dark:bg-sky-950/60"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="fractional-website" className="text-sm font-semibold">
          Website
        </label>
        <input
          id="fractional-website"
          type="url"
          required
          value={values.website}
          onChange={(event) => updateValue('website', event.target.value)}
          placeholder="https://"
          className="focus-ring rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-sky-700 dark:bg-sky-950/60"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="fractional-vision" className="text-sm font-semibold">
          Vision Statement (optional)
        </label>
        <textarea
          id="fractional-vision"
          rows={4}
          value={values.vision}
          onChange={(event) => updateValue('vision', event.target.value)}
          className="focus-ring rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-sky-700 dark:bg-sky-950/60"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="focus-ring rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-70"
      >
        {status === 'loading' ? 'Submitting...' : 'Request Fractional C-Suite Details'}
      </button>

      {message ? (
        <p
          role="status"
          className={`text-sm ${
            status === 'error' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-300'
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
