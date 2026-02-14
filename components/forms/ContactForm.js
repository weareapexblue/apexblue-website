import { useState } from 'react';
import { submitForm } from '@/lib/forms';

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

export default function ContactForm({ formType = 'contact' }) {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState('idle');
  const [responseMessage, setResponseMessage] = useState('');

  function updateValue(field, value) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!values.name.trim() || !values.email.trim() || !values.subject.trim()) {
      setStatus('error');
      setResponseMessage('Please fill out Name, Email, and Subject.');
      return;
    }

    try {
      setStatus('loading');
      setResponseMessage('');

      const result = await submitForm(formType, {
        ...values,
        source: 'apex-blue-contact-form'
      });

      setStatus('success');
      setResponseMessage(
        result.warning || 'Message sent. A member of Apex Blue will follow up shortly.'
      );
      setValues(initialValues);
    } catch (error) {
      setStatus('error');
      setResponseMessage(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel grid gap-4 rounded-3xl p-6" aria-label="Contact Apex Blue">
      <div className="grid gap-2">
        <label htmlFor="contact-name" className="text-sm font-semibold">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          value={values.name}
          onChange={(event) => updateValue('name', event.target.value)}
          className="focus-ring rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-sky-700 dark:bg-sky-950/60"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-email" className="text-sm font-semibold">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) => updateValue('email', event.target.value)}
          className="focus-ring rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-sky-700 dark:bg-sky-950/60"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-subject" className="text-sm font-semibold">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          required
          value={values.subject}
          onChange={(event) => updateValue('subject', event.target.value)}
          className="focus-ring rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-sky-700 dark:bg-sky-950/60"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-sm font-semibold">
          Message (optional)
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => updateValue('message', event.target.value)}
          className="focus-ring rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-sky-700 dark:bg-sky-950/60"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="focus-ring rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-75"
      >
        {status === 'loading' ? 'Sending...' : 'Send message to Apex Blue'}
      </button>

      {responseMessage ? (
        <p
          role="status"
          className={`text-sm ${
            status === 'error' ? 'text-rose-700 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-300'
          }`}
        >
          {responseMessage}
        </p>
      ) : null}
    </form>
  );
}
