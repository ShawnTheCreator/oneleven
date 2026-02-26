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
    <div className="box success">
      <div className="title">Success</div>
      <pre className="content">
        {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

