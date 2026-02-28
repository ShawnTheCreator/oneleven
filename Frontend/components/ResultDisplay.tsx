type Props = {
  status: "idle" | "loading" | "success" | "error";
  data?: any;
  error?: { status?: number; message?: string };
};
export default function ResultDisplay({ status, data, error }: Props) {
  if (status === "idle") {
    return <div className="note">Fill the form and run a validation.</div>;
  }
  if (status === "loading") {
    return <div className="note">Running validation…</div>;
  }
  if (status === "error") {
    return (
      <div className="box error">
        <div className="title">Error</div>
        <div className="content">
          {error?.status ? `Status: ${error.status} • ` : null}
          {error?.message ?? "Request failed"}
        </div>
      </div>
    );
  }
  return (
    <div className="box success pulse">
      <div className="title">Success</div>
      <pre className="content">
        {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
      </pre>
      <div className="score">
        <div className="score-value">100%</div>
        <div className="score-sub">All criteria met</div>
      </div>
      <div className="checklist">
        <div className="check-item">
          <svg className="check-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" fill="currentColor" />
          </svg>
          <span>POST endpoint reachable</span>
        </div>
        <div className="check-item">
          <svg className="check-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" fill="currentColor" />
          </svg>
          <span>Accepts JSON with data string</span>
        </div>
        <div className="check-item">
          <svg className="check-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" fill="currentColor" />
          </svg>
          <span>Sorts characters alphabetically</span>
        </div>
        <div className="check-item">
          <svg className="check-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" fill="currentColor" />
          </svg>
          <span>Returns word array in JSON</span>
        </div>
      </div>
    </div>
  );
}
