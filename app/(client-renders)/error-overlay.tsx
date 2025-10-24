"use client";

import React, { useEffect, useState } from "react";

type CapturedError = {
  message: string;
  stack?: string | null;
  source?: string | null;
};

export default function ErrorOverlay() {
  const [error, setError] = useState<CapturedError | null>(null);

  useEffect(() => {
    const onError = (ev: ErrorEvent) => {
      try {
        const message = ev.message || String(ev.error || ev.message || "Unknown error");
        const stack = ev.error?.stack || (ev as any).stack || null;
        setError({ message, stack, source: ev.filename || null });
      } catch (e) {
        // swallow
      }
    };

    const onUnhandledRejection = (ev: PromiseRejectionEvent) => {
      try {
        const reason = (ev && (ev as any).reason) || ev;
        let message = "";
        let stack: string | null = null;

        if (typeof reason === "string") {
          message = reason;
        } else if (reason && typeof reason === "object") {
          message = reason.message || JSON.stringify(reason);
          stack = reason.stack || null;
        } else {
          message = String(reason);
        }

        setError({ message, stack, source: null });
      } catch (e) {
        // swallow
      }
    };

    window.addEventListener("error", onError as EventListener);
    window.addEventListener("unhandledrejection", onUnhandledRejection as EventListener);

    return () => {
      window.removeEventListener("error", onError as EventListener);
      window.removeEventListener("unhandledrejection", onUnhandledRejection as EventListener);
    };
  }, []);

  if (!error) return null;

  return (
    <div
      id="client-error-overlay"
      className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pointer-events-none"
      aria-live="assertive"
    >
      <div className="pointer-events-auto max-w-3xl w-full bg-red-50 border border-red-200 text-red-900 rounded-lg shadow-lg p-4 overflow-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold">Client-side error</h3>
            <p className="text-sm break-words mt-1">{error.message}</p>
            {error.stack ? (
              <pre className="text-xs bg-white/60 rounded p-2 mt-3 overflow-auto max-h-48 text-left">{error.stack}</pre>
            ) : null}
            {error.source ? <p className="text-xs mt-2">source: {error.source}</p> : null}
          </div>
          <div className="flex-shrink-0">
            <button
              className="bg-red-200 hover:bg-red-300 rounded px-3 py-1 text-sm"
              onClick={() => setError(null)}
              aria-label="Dismiss error overlay"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
