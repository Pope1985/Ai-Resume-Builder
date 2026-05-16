import { useNavigate } from 'react-router-dom'
import { Sparkles, FileText, Download } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Sparkles className="text-violet-400" size={22} />
          AtlasResumeAI
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white/60 hover:text-white text-sm font-medium transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/builder')}
            className="text-white/60 hover:text-white text-sm font-medium transition"
          >
            Builder
          </button>
          <button
            onClick={() => navigate('/builder')}
            className="bg-violet-600 hover:bg-violet-500 px-5 py-2 rounded-lg text-sm font-semibold transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-6 pt-24">
        <h1 className="text-5xl font-bold leading-tight max-w-2xl">
          Build a resume that<br />
          <span className="text-violet-400">gets you hired</span>
        </h1>
        <p className="text-gray-400 max-w-md text-lg">
          Create, customize, and export a professional resume in minutes.
        </p>
        <button
          onClick={() => navigate('/builder')}
          className="mt-2 bg-violet-600 hover:bg-violet-500 px-8 py-3 rounded-xl text-base font-semibold transition"
        >
          Build My Resume →
        </button>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm text-gray-400">
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