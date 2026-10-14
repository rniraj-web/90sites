"use client";

import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "cookie-consent";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === null;
}

function getServerSnapshot() {
  return false;
}

export default function CookieConsent() {
  const needsConsent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  if (!needsConsent || dismissed) return null;

  function dismiss() {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setDismissed(true);
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-muted-foreground">
        We use cookies to improve your experience. See our{" "}
        <a href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </a>
        .
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="min-h-11 shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 active:opacity-100"
      >
        Accept
      </button>
    </div>
  );
}
