"use client";
import { useState } from "react";
import { Card, PageHeader, RuledDivider, StampButton } from "@/components/primitives";

export default function ContactPage() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    setError(null);
    const fd = new FormData(form);
    const body = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      honeypot: String(fd.get("hp") ?? ""),
    };
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) {
      setState("ok");
      form.reset();
    } else {
      const j = await r.json().catch(() => ({}));
      setError(j.error ?? "send failed");
      setState("err");
    }
  }

  const today = new Date().toISOString().slice(2, 10).replace(/-/g, ".");

  return (
    <div className="max-w-[720px] mx-auto px-6">
      <PageHeader code="MSG.IN" title="Send a note" meta="logged · acknowledged" />
      <RuledDivider pattern="slash" />
      <Card stamp code="FORM.01" label="MESSAGE // INTAKE">
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="NAME" name="name" required />
          <Field label="EMAIL" name="email" type="email" required />
          <Field label="MESSAGE" name="message" textarea required />
          <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <div className="flex items-center gap-3 pt-2">
            <StampButton variant="acid" type="submit" disabled={state === "sending"}>
              {state === "sending" ? "[ SENDING… ]" : "[ SEND ↗ ]"}
            </StampButton>
            {state === "ok" && (
              <span className="text-[11px] tracking-widest uppercase text-ink-2">
                MSG SENT // {today}
              </span>
            )}
            {state === "err" && (
              <span className="text-[11px] tracking-widest uppercase text-term-red">
                ERR // {error}
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
}: { label: string; name: string; type?: string; textarea?: boolean; required?: boolean }) {
  return (
    <label className="block">
      <div className="text-[10px] tracking-widest uppercase text-ink-3 mb-1">[{label}]</div>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={6}
          className="w-full bg-paper-0 border border-ink-0 px-3 py-2 font-mono text-[14px] focus:outline-none focus:bg-paper-1 focus:shadow-stamp"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className="w-full bg-paper-0 border border-ink-0 px-3 py-2 font-mono text-[14px] focus:outline-none focus:bg-paper-1 focus:shadow-stamp"
        />
      )}
    </label>
  );
}
