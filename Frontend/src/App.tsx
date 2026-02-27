import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Activity, Database, ExternalLink, Loader2 } from 'lucide-react';
import TestForm from './components/TestForm';
import ResultDisplay from './components/ResultDisplay';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const handleRunValidation = async (apiUrl: string, email: string) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    setStatus(null);

    try {
      // Simulate API call for demonstration if the URL is the placeholder
      // In a real scenario, this would be a real fetch
      if (apiUrl.includes('api.oneeleven.com')) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockResponse = {
          success: true,
          timestamp: new Date().toISOString(),
          data: {
            user_email: email,
            validation_id: Math.random().toString(36).substring(7),
            supabase_sync: "active",
            checks: [
              { id: "auth", status: "passed", latency: "42ms" },
              { id: "db_connection", status: "passed", latency: "12ms" },
              { id: "payload_schema", status: "passed", latency: "5ms" }
            ]
          }
        };
        setResult(mockResponse);
        setStatus(200);
      } else {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        
        setStatus(response.status);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || `Server responded with ${response.status}`);
        }
        
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during validation.');
      if (!status) setStatus(500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-brand-dark/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-end gap-1 h-6">
              <div className="w-1.5 h-3 bg-brand-red rounded-sm" />
              <div className="w-1.5 h-5 bg-brand-red rounded-sm" />
              <div className="w-1.5 h-7 bg-brand-red rounded-sm" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white uppercase">
              One Eleven <span className="text-slate-500 font-medium lowercase ml-2">API Validator</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Logs</a>
            <a href="https://oneeleven.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              Website <ExternalLink size={14} />
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12">
          {/* Left Column: Controls */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Internal <span className="text-brand-red">Developer</span> Tool
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Validate your backend integration and Supabase synchronization in one click. 
                Designed for robust error handling and technical clarity.
              </p>
            </div>

            <div className="glass-panel p-8">
              <TestForm onRun={handleRunValidation} isLoading={isLoading} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="glass-panel p-4 flex flex-col items-center gap-2 text-center">
                <Shield size={20} className="text-brand-red" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Secure</span>
              </div>
              <div className="glass-panel p-4 flex flex-col items-center gap-2 text-center">
                <Activity size={20} className="text-brand-red" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Real-time</span>
              </div>
              <div className="glass-panel p-4 flex flex-col items-center gap-2 text-center">
                <Database size={20} className="text-brand-red" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Synced</span>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="space-y-6">
            <div className="glass-panel p-8 min-h-[500px] flex flex-col">
              {!result && !error && !isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-500 flex items-center justify-center">
                    <Activity size={32} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Awaiting Execution</p>
                    <p className="text-sm">Configure the endpoint and run the validator to see results.</p>
                  </div>
                </div>
              ) : (
                <ResultDisplay result={result} error={error} status={status} />
              )}
              
              {isLoading && (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-brand-red/20 animate-pulse" />
                    <Loader2 className="absolute inset-0 m-auto animate-spin text-brand-red" size={24} />
                  </div>
                  <p className="text-sm font-medium animate-pulse">Communicating with server...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 uppercase tracking-widest">
          <p>© 2026 One Eleven Consultancy. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
