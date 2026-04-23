"use client";

import { useState } from "react";

type Copy = {
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  consent: string;
  submit: string;
};

export function FooterSubscribe({ copy }: { copy: Copy }) {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="mt-8"
    >
      <h5 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
        {copy.title}
      </h5>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <input
          type="text"
          name="firstname"
          placeholder={copy.firstname}
          required
          className="bg-transparent border border-[var(--rule)] px-3 py-2.5 text-[14px] text-white placeholder:text-white/35 focus:border-[var(--accent-neteon)] focus:outline-none"
        />
        <input
          type="text"
          name="lastname"
          placeholder={copy.lastname}
          required
          className="bg-transparent border border-[var(--rule)] px-3 py-2.5 text-[14px] text-white placeholder:text-white/35 focus:border-[var(--accent-neteon)] focus:outline-none"
        />
      </div>
      <div className="mt-2 flex gap-2">
        <input
          type="email"
          name="email"
          placeholder={copy.email}
          required
          className="flex-1 bg-transparent border border-[var(--rule)] px-3 py-2.5 text-[14px] text-white placeholder:text-white/35 focus:border-[var(--accent-neteon)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={sent}
          className="px-5 py-2.5 text-[13px] font-mono uppercase tracking-[0.1em] bg-[var(--accent-neteon)] text-black hover:bg-[var(--accent-neteon-hover)] transition-colors disabled:opacity-60"
        >
          {sent ? "✓" : copy.submit}
        </button>
      </div>
      <p className="mt-3 text-[11px] leading-[1.5] text-white/40 max-w-md">{copy.consent}</p>
    </form>
  );
}
