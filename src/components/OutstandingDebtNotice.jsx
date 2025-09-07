import React from "react";
import { AlertCircle } from "lucide-react"; // optional: `npm i lucide-react`

export default function OutstandingDebtNotice({ className = "" }) {
  return (
    <div
      role="note"
      aria-label="Important notice about outstanding balances"
      className={`flex items-start gap-3 rounded-b-xl border border-amber-300 bg-amber-50/70 p-3 text-amber-900 ${className}`}
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="text-sm leading-relaxed">
        <p className="font-semibold">Important Notice</p>
        <p>
          If your SIM has any outstanding balance or debt with your network
          provider, any purchased <strong>airtime or data</strong> may first be
          used to clear the outstanding amount before it is credited to your
          account.
        </p>
      </div>
    </div>
  );
}
