import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 relative">
        {/* <div className="max-w-6xl mx-auto relative flex flex-col min-h-screen"> */}
        <div className="w-full relative">
          {/* subtle background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/10 to-transparent opacity-60 pointer-events-none" />

          {/* <div className="relative flex-1"> */}
          <div className="relative max-w-6xl mx-auto px-8 pb-20">
            {children}
          </div>

          {/* Footer */}
        <div className="mt-20 mb-5 flex flex-col items-center gap-3">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
          <div className="text-xs font-mono tracking-widest text-neutral-300 hover:text-white hover:font-bold transition-all duration-200 cursor-pointer">
            Q₆ systems
          </div>
        </div>
        </div>

      </main>
    </div>
  );
}
