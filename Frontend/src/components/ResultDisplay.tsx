import React from 'react';
import { CheckCircle2, AlertCircle, Terminal, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResultDisplayProps {
  result: any;
  error: string | null;
  status: number | null;
}

export default function ResultDisplay({ result, error, status }: ResultDisplayProps) {
  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    }
  };

  return (
    <AnimatePresence mode="wait">
      {(result || error) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Terminal size={14} />
              Execution Result
            </h3>
            {status && (
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                status >= 200 && status < 300 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                HTTP {status}
              </span>
            )}
          </div>

          {error ? (
            <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5 flex gap-3">
              <AlertCircle className="text-red-400 shrink-0" size={20} />
              <div className="space-y-1">
                <p className="text-sm font-medium text-red-400">Validation Failed</p>
                <p className="text-xs text-red-400/70 leading-relaxed">{error}</p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex gap-3">
              <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
              <div className="space-y-1">
                <p className="text-sm font-medium text-emerald-400">Validation Successful</p>
                <p className="text-xs text-emerald-400/70 leading-relaxed">
                  The endpoint responded correctly and the data has been synchronized.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="relative group">
              <button
                onClick={copyToClipboard}
                className="absolute right-3 top-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 opacity-0 group-hover:opacity-100 transition-all"
                title="Copy JSON"
              >
                <Copy size={14} />
              </button>
              <pre className="code-block max-h-[400px]">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
