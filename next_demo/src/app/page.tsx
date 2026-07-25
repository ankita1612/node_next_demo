import React from "react";

export default function Home() {
  const features = [
    {
      icon: "🚀",
      title: "App Router",
      description: "Nested layouts, Server Components, streaming, and built-in loading states for high performance.",
      code: "src/app/page.tsx",
    },
    {
      icon: "⚡",
      title: "Turbopack Bundler",
      description: "Blazing fast incremental compilation powered by Rust for instant hot module reloading.",
      code: "next dev --turbopack",
    },
    {
      icon: "🔒",
      title: "Server Components",
      description: "Execute code on the server by default to reduce client JavaScript bundle size and enhance security.",
      code: "'use server'",
    },
    {
      icon: "🎨",
      title: "Tailwind CSS v4",
      description: "Utility-first styling powered by high-performance Rust PostCSS compiler and native CSS theme tokens.",
      code: "@import 'tailwindcss';",
    },
    {
      icon: "🔍",
      title: "Metadata & SEO",
      description: "Built-in API for standard SEO meta tags, OpenGraph images, and dynamic social previews.",
      code: "export const metadata",
    },
    {
      icon: "🛠️",
      title: "TypeScript Native",
      description: "Strict static typing with auto-generated route parameters and API contracts.",
      code: "tsconfig.json",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[#090d16] text-slate-50 selection:bg-indigo-500/30 selection:text-white">
      {/* Background Radial Glow & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute -top-36 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-[140px] opacity-25 pointer-events-none" />

      {/* Header Navigation */}
      <header className="w-full max-w-6xl px-6 py-8 flex justify-between items-center z-10">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight" id="app-brand">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-lg text-white shadow-lg shadow-indigo-500/30">
            ▲
          </div>
          <span>Next.js + Tailwind v4</span>
        </div>
        <nav className="flex items-center gap-6">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 text-sm font-medium hover:text-white transition-colors"
            id="nav-docs"
          >
            Docs
          </a>
          <a
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 text-sm font-medium hover:text-white transition-colors"
            id="nav-tailwind"
          >
            Tailwind Docs
          </a>
          <span className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-400 backdrop-blur-md" id="v16-badge">
            Next.js v16 + Tailwind v4
          </span>
        </nav>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl px-6 pt-12 pb-24 flex flex-col items-center z-10">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-4 py-1.5 rounded-full text-xs font-medium text-indigo-300 mb-6" id="status-badge">
            <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" /> Ready for Real-Time Production
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-5 bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent" id="main-title">
            Build Stunning Apps with <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Tailwind CSS</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
            Tailwind CSS v4 is configured with Next.js 16 App Router and Turbopack. Enjoy high performance, CSS utility classes, and zero-config speed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5"
              id="cta-docs"
            >
              Explore Next.js Docs →
            </a>
            <a
              href="https://tailwindcss.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold text-sm px-7 py-3.5 rounded-xl backdrop-blur-md transition-all"
              id="cta-tailwind"
            >
              Tailwind v4 Reference
            </a>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-16" id="features-grid">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900/70 border border-white/10 hover:border-indigo-500/50 rounded-2xl p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
              id={`feature-card-${index}`}
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{item.description}</p>
              </div>
              <div className="bg-black/50 border border-white/5 rounded-lg px-3.5 py-2.5 font-mono text-xs text-indigo-300">
                <code>{item.code}</code>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl px-6 py-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 z-10" id="app-footer">
        <div>Next.js 16 + Tailwind CSS v4 Project</div>
        <div className="mt-2 sm:mt-0">Edit <code className="text-slate-300">src/app/page.tsx</code> to start building</div>
      </footer>
    </div>
  );
}
