"use client";
import { useState } from "react";
import { Card, PageHeader, RuledDivider, StampButton } from "@/components/primitives";
import { Field, Input, Textarea } from "@/components/primitives/Field";

export default function ContactPage() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const body = {
      name, email, message,
      honeypot: String(fd.get("hp") ?? ""),
    };
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) {
      setState("ok");
      setName(""); setEmail(""); setMessage("");
    } else {
      const j = await r.json().catch(() => ({}));
      setError(j.error ?? "send failed");
      setState("err");
    }
  }

  const today = new Date().toISOString().slice(2, 10).replace(/-/g, ".");
  const emailValid = email.length === 0 || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <PageHeader code="MSG.IN" title="Send a note" meta="logged · acknowledged" accent="acid" />
      <RuledDivider pattern="slash" />
      <Card stamp code="FORM.01" label="MESSAGE // INTAKE">
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="NAME" required count={name.length} max={64} helper="plain text · 64 chars max">
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 64))}
              required
              autoComplete="name"
            />
          </Field>

          <Field
            label="EMAIL"
            required
            error={!emailValid ? "invalid email format" : undefined}
            helper="focus → 3px acid ring + block caret"
          >
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              error={!emailValid}
            />
          </Field>

          <Field label="MESSAGE" required count={message.length} max={2000}>
            <Textarea
              name="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 2000))}
              required
            />
          </Field>

          <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <StampButton variant="acid" type="submit" disabled={state === "sending" || !emailValid}>
              {state === "sending" ? "[ SENDING… ]" : "[ SEND ↗ ]"}
            </StampButton>
            {state === "ok" && (
              <span className="text-[11px] tracking-widest uppercase text-kelly font-bold">
                ✓ MSG SENT // {today}
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
