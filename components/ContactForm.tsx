'use client';
import { useRef, useState } from 'react';
import { submitContact } from '../lib/api';

type Values = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldEl = HTMLInputElement | HTMLTextAreaElement;

const EMPTY: Values = { name: '', email: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!v.email.trim()) e.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'That email address doesn’t look right.';
  if (v.message.trim().length < 10) e.message = 'Please write at least 10 characters.';
  return e;
}

type FieldProps = {
  id: string;
  name: keyof Values;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<FieldEl>;
  inputRef: React.Ref<FieldEl>;
  error?: string;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
};

function Field({ id, label, error, multiline, inputRef, ...props }: FieldProps) {
  const Tag = (multiline ? 'textarea' : 'input') as React.ElementType;
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-[11px] uppercase tracking-label text-mute">
        {label}
      </label>
      <Tag
        id={id}
        ref={inputRef}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        rows={multiline ? 5 : undefined}
        className={`mt-2 block w-full resize-y border-0 border-b bg-transparent px-0 py-2 text-base text-ink placeholder:text-mute/70 focus:border-accent focus:ring-0 focus-visible:outline-offset-2 ${
          error ? 'border-ink' : 'border-line'
        }`}
        {...props}
      />
      {error && (
        <p id={errId} className="mt-2 text-xs text-ink">
          <span aria-hidden="true">✕ </span>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const nameRef = useRef<FieldEl>(null);
  const emailRef = useRef<FieldEl>(null);
  const messageRef = useRef<FieldEl>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<FieldEl>) => {
    const key = e.target.name as keyof Values;
    const { value } = e.target;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    if (status === 'success') setStatus('idle');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Values)[])[0];
    if (first) {
      const refs = { name: nameRef, email: emailRef, message: messageRef };
      refs[first].current?.focus();
      return;
    }
    setStatus('submitting');
    setServerError('');
    try {
      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        website: honeypotRef.current?.value ?? '',
      });
      setValues(EMPTY);
      setStatus('success');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  const busy = status === 'submitting';

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Contact form" className="space-y-8">
      <Field id="cf-name" name="name" label="Name" autoComplete="name" value={values.name} onChange={onChange} error={errors.name} inputRef={nameRef} />
      <Field id="cf-email" name="email" type="email" label="Email" autoComplete="email" value={values.email} onChange={onChange} error={errors.email} inputRef={emailRef} />
      <Field id="cf-message" name="message" label="Message" multiline value={values.message} onChange={onChange} error={errors.message} inputRef={messageRef} />

      {/* Honeypot: invisible to people, bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          ref={honeypotRef}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <button
          type="submit"
          disabled={busy}
          className="group inline-flex items-center gap-2 text-sm disabled:opacity-50"
        >
          <span className="relative pb-0.5">
            {busy ? 'Sending…' : 'Send message'}
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line" />
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-300 group-hover:origin-right group-hover:scale-x-0 motion-reduce:transition-none" />
          </span>
          <span aria-hidden="true" className="text-xs">→</span>
        </button>
        <p role="status" aria-live="polite" className="text-xs text-mute">
          {status === 'success' && 'Thanks, your message was sent. I’ll reply by email.'}
          {status === 'error' && serverError}
        </p>
      </div>
    </form>
  );
}