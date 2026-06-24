import React from "react";

const SettingsView = () => {
  return (
    <div className="bg-card-bg p-6 rounded-2xl border border-border-subtle shadow-sm space-y-4">
      <h2 className="font-extrabold text-sm text-text-dark uppercase tracking-wider">
        System Settings
      </h2>
      <div className="space-y-3 max-w-sm">
        <input
          type="number"
          defaultValue={5}
          placeholder="Max bookings per tech"
          className="border border-border-subtle p-3 text-xs w-full rounded-xl bg-bg-ivory outline-none focus:ring-1 focus:ring-primary-maroon/20"
        />
        <input
          type="number"
          defaultValue={250}
          placeholder="Default diagnostics fee (INR)"
          className="border border-border-subtle p-3 text-xs w-full rounded-xl bg-bg-ivory outline-none focus:ring-1 focus:ring-primary-maroon/20"
        />
        <input
          type="email"
          defaultValue="admin@vvservices.com"
          placeholder="Alert notifications email"
          className="border border-border-subtle p-3 text-xs w-full rounded-xl bg-bg-ivory outline-none focus:ring-1 focus:ring-primary-maroon/20"
        />
      </div>
    </div>
  );
};

export default SettingsView;
