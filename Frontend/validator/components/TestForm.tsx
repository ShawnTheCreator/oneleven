"use client";
import { useCallback, useMemo, useState } from "react";
type Props = {
  onStatusChange: (s: "idle" | "loading" | "success" | "error") => void;
  onSuccess: (data: any) => void;
  onError: (err: { status?: number; message?: string }) => void;
};
const DEFAULT_URL = process.env.NEXT_PUBLIC_DEFAULT_URL ?? "http://localhost:5282/webhook";
const DEFAULT_EMAIL = process.env.NEXT_PUBLIC_DEFAULT_EMAIL ?? "you@example.com";
export default function TestForm({ onStatusChange, onSuccess, onError }: Props) {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [submitting, setSubmitting] = useState(false);
  const validatorUrl = useMemo(() => {
    const base = "https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task";
    const u = new URL(base);
    u.searchParams.set("url", url);
    u.searchParams.set("email", email);
    return u.toString();
  }, [url, email]);
  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      onStatusChange("loading");
      setSubmitting(true);
      try {
        const res = await fetch(validatorUrl);
        const text = await res.text();
        let parsed: any;
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = text;
        }
        if (!res.ok) {
          onError({ status: res.status, message: typeof parsed === "string" ? parsed : JSON.stringify(parsed) });
          onStatusChange("error");
        } else {
          onSuccess(parsed);
          onStatusChange("success");
        }
      } catch (err: any) {
        onError({ message: String(err) });
        onStatusChange("error");
      } finally {
        setSubmitting(false);
      }
    },
    [validatorUrl, onError, onSuccess, onStatusChange]
  );
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="grid">
        <div>
          <label className="label">API URL</label>
          <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
      </div>
      <div className="row">
        <button type="submit" disabled={submitting} className="btn">
          {submitting ? "Validating..." : "Run"}
        </button>
        <span className="hint">Calls the validator and shows the raw response.</span>
      </div>
    </form>
  );
}

