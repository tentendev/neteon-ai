"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Dictionary } from "@/types/dictionary";
import { submitQuoteToHubSpot, type QuoteFields } from "@/lib/hubspot";
import { Close } from "./icons";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  copy: Dictionary["quote"];
  onClose: () => void;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuoteModal({ copy, onClose }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof QuoteFields, string>>>({});
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    firstInputRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields: QuoteFields = {
      firstname: String(data.get("firstname") ?? "").trim(),
      lastname: String(data.get("lastname") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const errs: Partial<Record<keyof QuoteFields, string>> = {};
    if (!fields.firstname) errs.firstname = copy.required;
    if (!fields.lastname) errs.lastname = copy.required;
    if (!fields.email) errs.email = copy.required;
    else if (!EMAIL_RE.test(fields.email)) errs.email = copy.invalidEmail;
    if (!fields.company) errs.company = copy.required;
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});

    setStatus("submitting");
    setErrorMsg("");
    try {
      await submitQuoteToHubSpot(fields);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-title"
      className="fixed inset-0 z-[2000] grid place-items-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#0b0b0b] border border-[var(--rule)] rounded-[12px] shadow-2xl overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.close}
          className="absolute top-3 end-3 p-2 text-white/60 hover:text-white transition-colors"
        >
          <Close width={18} height={18} />
        </button>

        <div className="px-7 pt-8 pb-5 border-b border-[var(--rule)]">
          <h2
            id="quote-title"
            className="font-mono text-[22px] leading-[1.15] tracking-[-0.01em] text-white"
          >
            {copy.title}
          </h2>
          <p className="mt-2 text-[14px] leading-[20px] text-white/60">{copy.sub}</p>
        </div>

        {status === "success" ? (
          <div className="px-7 py-10 text-center">
            <div className="mx-auto mb-5 h-12 w-12 rounded-full grid place-items-center bg-[var(--accent-neteon)]/15 border border-[var(--accent-neteon)]/30">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-neteon)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <p className="text-[15px] text-white/85">{copy.success}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 inline-flex items-center gap-2 font-mono text-[13px] h-9 px-4 rounded-[4px] bg-[var(--accent-neteon)] text-[var(--ink)] hover:rounded-[8px] transition-[border-radius]"
            >
              {copy.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-7 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field
                ref={firstInputRef}
                name="firstname"
                label={copy.labels.firstname}
                required
                error={fieldErrors.firstname}
                autoComplete="given-name"
              />
              <Field
                name="lastname"
                label={copy.labels.lastname}
                required
                error={fieldErrors.lastname}
                autoComplete="family-name"
              />
            </div>
            <Field
              name="email"
              type="email"
              label={copy.labels.email}
              required
              error={fieldErrors.email}
              autoComplete="email"
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                name="company"
                label={copy.labels.company}
                required
                error={fieldErrors.company}
                autoComplete="organization"
              />
              <Field
                name="phone"
                type="tel"
                label={copy.labels.phone}
                autoComplete="tel"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-white/55 mb-1.5">
                {copy.labels.message}
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder={copy.placeholders.message}
                className="w-full bg-black border border-white/10 rounded-[6px] px-3 py-2.5 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--accent-neteon)] transition-colors resize-none"
              />
            </div>
            <p className="text-[12px] text-white/45 leading-[18px]">{copy.labels.consent}</p>

            {status === "error" ? (
              <p className="text-[13px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-[6px] px-3 py-2">
                {copy.error}
                {errorMsg ? <span className="block text-[11px] opacity-70 mt-1 font-mono">{errorMsg}</span> : null}
              </p>
            ) : null}

            <div className="pt-1">
              <button
                type="submit"
                disabled={status === "submitting"}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 font-mono text-[14px] h-11 rounded-[6px] bg-[var(--accent-neteon)] text-[var(--ink)] transition-[background-color,border-radius] hover:rounded-[10px] disabled:opacity-60 disabled:cursor-not-allowed",
                )}
              >
                {status === "submitting" ? copy.submitting : copy.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

type FieldProps = {
  name: keyof QuoteFields;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
};

function Field({
  ref,
  name,
  label,
  type = "text",
  required,
  error,
  autoComplete,
}: FieldProps & { ref?: React.Ref<HTMLInputElement> }) {
  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-white/55 mb-1.5">
        {label}
        {required ? <span className="text-[var(--accent-neteon)] ms-1">*</span> : null}
      </label>
      <input
        ref={ref}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        className={cn(
          "w-full bg-black border rounded-[6px] px-3 h-10 text-[14px] text-white placeholder:text-white/30 focus:outline-none transition-colors",
          error ? "border-red-500/60" : "border-white/10 focus:border-[var(--accent-neteon)]",
        )}
      />
      {error ? <p className="mt-1 text-[11px] text-red-400">{error}</p> : null}
    </div>
  );
}
