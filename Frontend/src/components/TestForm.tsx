import React, { useState } from 'react';
import { Play, Loader2, Globe, Mail } from 'lucide-react';

interface TestFormProps {
  onRun: (apiUrl: string, email: string) => Promise<void>;
  isLoading: boolean;
}

export default function TestForm({ onRun, isLoading }: TestFormProps) {
  const [apiUrl, setApiUrl] = useState('https://api.oneeleven.com/v1/validate');
  const [email, setEmail] = useState('recruiter@oneeleven.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRun(apiUrl, email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="apiUrl" className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Globe size={14} />
            API Endpoint URL
          </label>
          <input
            id="apiUrl"
            type="url"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="https://your-api-url.com"
            className="input-field w-full"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Mail size={14} />
            Validator Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="input-field w-full"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full group"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Validating...
          </>
        ) : (
          <>
            <Play size={18} className="group-hover:translate-x-0.5 transition-transform" />
            Run Validator
          </>
        )}
      </button>
    </form>
  );
}
