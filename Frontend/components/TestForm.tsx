"use client";
import { useCallback, useMemo, useState } from "react";
type Props = {
  onStatusChange: (s: "idle" | "loading" | "success" | "error") => void;
  onSuccess: (data: any) => void;
  onError: (err: { status?: number; message?: string }) => void;
};
const DEFAULT_URL = process.env.NEXT_PUBLIC_DEFAULT_URL ?? "https://oneevelen.onrender.com/webhook";
const DEFAULT_EMAIL = process.env.NEXT_PUBLIC_DEFAULT_EMAIL ?? "you@example.com";
export default function TestForm({ onStatusChange, onSuccess, onError }: Props) {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [mode, setMode] = useState<"live" | "direct" | "offline">("live");
  const [dataString, setDataString] = useState("example");
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
        if (mode === "live") {
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
        } else if (mode === "direct") {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: dataString })
          });
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
        } else {
          const normalized = dataString.toLowerCase();
          const chars = Array.from(normalized).sort();
          const result = { word: chars.map((c) => c) };
          onSuccess(result);
          onStatusChange("success");
        }
      } catch (err: any) {
        onError({ message: String(err) });
        onStatusChange("error");
      } finally {
        setSubmitting(false);
      }
    },
    [validatorUrl, onError, onSuccess, onStatusChange, mode, dataString, url]
  );
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="grid">
        <div>
          <label className="label">Mode</label>
          <select className="input" value={mode} onChange={(e) => setMode(e.target.value as "live" | "direct" | "offline")}>
            <option value="live">Live</option>
            <option value="direct">Direct Webhook</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        <div>
          <label className="label">API URL</label>
          <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label className="label">Data String</label>
          <input className="input" value={dataString} onChange={(e) => setDataString(e.target.value)} placeholder='example' />
        </div>
      </div>
      <div className="row">
        <button type="submit" disabled={submitting} className="btn">
          {submitting ? "Validating..." : "Run"}
        </button>
        <span className="hint">Live: Supabase validator • Direct: POST {`{ data: "${dataString}" }`} • Offline: local sort</span>
      </div>
    </form>
  );
}
