"use client";
import { useState } from "react";

export default function EmailReveal({ email }: { email: string }) {
    const [showEmail, setShowEmail] = useState(false);
    const [copied, setCopied] = useState(false);

    function obfuscateEmail(email: string) {
        return email.replace("@", " [ät] ");
    }

    async function revealAndCopy(email: string) {
        setShowEmail(true);

        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch (err) {
            console.error("Clipboard copy failed", err);
        }
    }

    return (
        <button
            type="button"
            onClick={() => revealAndCopy(email)}
            className="
        mt-3 text-sm text-slate-600 hover:text-slate-800
        transition font-medium
      "
        >
      <span
          className={`transition-all duration-300 ${
              copied ? "text-green-600 font-medium" : ""
          }`}
      >
        {copied
            ? "Kopioitu!"
            : showEmail
                ? obfuscateEmail(email)
                : "Näytä sähköposti"}
      </span>
        </button>
    );
}
