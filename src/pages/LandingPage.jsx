import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, FileText, Download, Menu, X } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-5 sm:px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 text-lg sm:text-xl font-bold">
            <Sparkles className="text-violet-400" size={20} />
            AtlasResumeAI
          </div>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-6">
            <button onClick={() => navigate('/dashboard')} className="text-white/60 hover:text-white text-sm font-medium transition">Dashboard</button>
            <button onClick={() => navigate('/builder')} className="text-white/60 hover:text-white text-sm font-medium transition">Builder</button>
            <button onClick={() => navigate('/builder')} className="bg-violet-600 hover:bg-violet-500 px-5 py-2 rounded-lg text-sm font-semibold transition">Get Started</button>
          </div>

          {/* Mobile hamburger */}
          <button className="sm:hidden p-2 text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="sm:hidden px-5 pb-4 pt-2 border-t border-white/10 flex flex-col gap-2">
            <button onClick={() => { navigate('/dashboard'); setMenuOpen(false) }} className="text-left py-2 text-sm text-white/70 hover:text-white transition">Dashboard</button>
            <button onClick={() => { navigate('/builder'); setMenuOpen(false) }} className="text-left py-2 text-sm text-white/70 hover:text-white transition">Builder</button>
            <button onClick={() => { navigate('/builder'); setMenuOpen(false) }} className="mt-1 w-full bg-violet-600 hover:bg-violet-500 py-2.5 rounded-lg text-sm font-semibold transition">Get Started</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-5 gap-5 pt-28 pb-12">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl">
          Build a resume that<br />
          <span className="text-violet-400">gets you hired</span>
        </h1>
        <p className="text-gray-400 max-w-sm sm:max-w-md text-base sm:text-lg">
          Create, customize, and export a professional resume in minutes.
        </p>
        <button
          onClick={() => navigate('/builder')}
          className="w-full max-w-xs sm:w-auto bg-violet-600 hover:bg-violet-500 px-8 py-3 rounded-xl text-base font-semibold transition"
        >
          Build My Resume →
        </button>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-gray-400">
          {[
            { icon: <FileText size={14} />, label: 'Easy to use' },
            { icon: <FileText size={14} />, label: 'Live preview' },
            { icon: <Download size={14} />, label: 'PDF export' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              {icon} {label}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}