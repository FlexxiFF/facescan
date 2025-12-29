
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-200 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-rose-500 rounded-full animate-pulse" />
            </div>
            <span className="font-playfair text-xl font-bold text-stone-800 tracking-tight">DermaScan AI</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            <a href="#" className="hover:text-rose-600 transition-colors">How it works</a>
            <a href="#" className="hover:text-rose-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-rose-600 transition-colors">Expert Blog</a>
          </div>
          <button className="px-4 py-2 bg-stone-900 text-white text-sm rounded-full hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl active:scale-95">
            Get Started
          </button>
        </div>
      </nav>
      <main className="flex-grow pt-16">
        {children}
      </main>
      <footer className="bg-stone-100 border-t border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-stone-500 text-sm">© 2024 DermaScan AI. AI-powered skin analysis for better health.</p>
        </div>
      </footer>
    </div>
  );
};
