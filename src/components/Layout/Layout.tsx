import React from 'react';
import Sidebar from './Sidebar';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-white overflow-x-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 relative">

        {/* <div className="max-w-6xl mx-auto relative flex flex-col min-h-screen"> */}
        <div className='w-full relative'>

          {/* subtle background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/10 to-transparent opacity-60 pointer-events-none" />

          {/* <div className="relative flex-1"> */}
          <div className="relative max-w-6xl mx-auto px-8 pb-20">
            {children}
          </div>

        </div>
      </main>
    </div>
  );
}