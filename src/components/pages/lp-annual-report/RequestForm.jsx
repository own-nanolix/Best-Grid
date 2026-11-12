'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Field from '@/components/ui/Field';
import { CONTACT } from '@/lib/brand';
import s from './lp-annual-report.module.css';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// "Request the report": a form with real states (idle, invalid, sent). It makes no network request: the sent state
// says so. Labels, errors and messages are plain English; the contact is the case study's own.
export default function RequestForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function validate() {
    const e = {};
    if (!name.trim()) e.name = 'Enter your name.';
    if (!email.trim()) e.email = 'Enter your email address.';
    else if (!EMAIL.test(email.trim())) e.email = 'This email address looks incomplete. Use the form name@company.com.';
    return e;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  }

  function onReset() {
    setSent(false);
    setErrors({});
  }

  if (sent) {
    return (
      <div className={s.form}>
        <p className={s.status} role="status">
          Nothing was sent. This page is a demonstration and makes no network request, so no one has received your details. To reach Best Grid, write to{' '}
          <span lang="es">{CONTACT.email}</span>.
        </p>
        <div>
          <Button type="button" variant="outline" onClick={onReset} cross={false} iconRight="arrow-right">
            Edit details
          </Button>
        </div>
      </div>
    );
  }

  const bad = (k) => (errors[k] ? <span className={s.err}>{errors[k]}</span> : undefined);
  return (
    <form className={s.form} onSubmit={onSubmit} noValidate aria-label="Request the report">
      <Field
        id="lp-annual-report-name"
        label="Name"
        autoComplete="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-invalid={errors.name ? 'true' : undefined}
        hint={bad('name')}
      />
      <Field
        id="lp-annual-report-email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={errors.email ? 'true' : undefined}
        hint={bad('email')}
      />
      <div className={s.formHead}>
        <Button type="submit" variant="active" size="lg">
          Request the report
        </Button>
        <span className="t-small muted" aria-live="polite">
          {Object.keys(errors).length ? 'Check the highlighted fields.' : 'Both fields are required.'}
        </span>
      </div>
    </form>
  );
}
