"use client";
import { useState } from "react";
import TestForm from "../components/TestForm";
import ResultDisplay from "../components/ResultDisplay";
export default function Page() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [payload, setPayload] = useState<any>(null);
  const [error, setError] = useState<{ status?: number; message?: string } | null>(null);
  return (
    <div>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-logo tri">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
      <section className="panel">
        <TestForm
          onStatusChange={setStatus}
          onSuccess={(data) => {
            setPayload(data);
            setError(null);
          }}
          onError={(err) => {
            setError(err);
            setPayload(null);
          }}
        />
        <div className="spacer" />
        <ResultDisplay status={status} data={payload} error={error ?? undefined} />
      </section>
      <footer className="footer">© {new Date().getFullYear()} One Eleven</footer>
    </div>
  );
}
