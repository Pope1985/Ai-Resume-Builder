import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Code2,
  Download,
  Plus,
  ChevronRight,
  Heart,
  Folder,
  Save,
  Palette,
  X,
  CheckCheck,
  Loader2,
} from "lucide-react";

const STORAGE_KEY = "resumes";

const SECTIONS = [
  { id: "Personal", icon: User, desc: "Contact info & summary" },
  { id: "Experience", icon: Briefcase, desc: "Work history" },
  { id: "Education", icon: GraduationCap, desc: "Schools & degrees" },
  { id: "Skills", icon: Code2, desc: "Tools & technologies" },
  { id: "Projects", icon: Folder, desc: "Personal projects" },
  { id: "Hobbies", icon: Heart, desc: "Interests & hobbies" },
  { id: "Templates", icon: Palette, desc: "Choose a resume style" },
];

const TEMPLATES = [
  { id: "default", name: "Classic", desc: "Timeless and professional" },
  { id: "modern", name: "Modern", desc: "Clean and contemporary" },
  { id: "minimal", name: "Minimalist", desc: "Simple and elegant" },
];

const inputCls = `
  w-full bg-[#0f0f12] border border-white/8 rounded-xl px-4 py-3
  text-sm text-white placeholder-white/20
  focus:outline-none focus:border-violet-500/60 focus:bg-[#13131a]
  transition-all duration-200
`;

const labelCls = `block text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-2`;

// ── CLASSIC TEMPLATE ─────────────────────────────────────────────────────────
function ClassicTemplate({ resume }) {
  return (
    <div style={{ fontFamily: "'Times New Roman', Times, serif" }} className="text-black px-12 py-10">
      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold uppercase tracking-wide">{resume.name || "Your Name"}</h1>
        {resume.title && <p className="text-base font-bold uppercase tracking-widest mt-1">{resume.title}</p>}
      </div>
      <div className="text-center text-sm mb-1">
        {[resume.location, resume.phone, resume.email].filter(Boolean).join(" • ")}
      </div>
      {(resume.linkedin || resume.website) && (
        <div className="text-center text-sm mb-1">
          {[resume.linkedin, resume.website].filter(Boolean).join("   ")}
        </div>
      )}
      <hr className="border-t-2 border-gray-400 mt-4 mb-5" />

      {resume.summary && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2">Summary</h2>
          <hr className="border-t border-gray-300 mb-3" />
          <p className="text-sm leading-relaxed text-justify">{resume.summary}</p>
        </section>
      )}

      {resume.projects?.some((p) => p.title) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2">Projects</h2>
          <hr className="border-t border-gray-300 mb-3" />
          {resume.projects.filter((p) => p.title).map((proj, i) => (
            <div key={i} className="mb-3">
              <p className="text-sm font-bold">{proj.title}</p>
              {proj.link && <p className="text-sm">{proj.link}</p>}
              {proj.description && <p className="text-sm leading-relaxed text-justify mt-1">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {resume.skills && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2">Technical Skills</h2>
          <hr className="border-t border-gray-300 mb-3" />
          <ul className="list-disc list-outside pl-5 text-sm space-y-1">
            {resume.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {resume.experience?.some((e) => e.company || e.role) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2">Experience</h2>
          <hr className="border-t border-gray-300 mb-3" />
          {resume.experience.filter((e) => e.company || e.role).map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold">{exp.role || "—"}</p>
                  <p className="text-sm">{exp.company}</p>
                </div>
                <span className="text-sm shrink-0 ml-4">{exp.duration}</span>
              </div>
              {exp.bullets && (
                <ul className="mt-2 list-disc list-outside pl-5 text-sm space-y-1">
                  {exp.bullets.split("\n").filter(Boolean).map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {resume.education?.some((e) => e.school) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2">Education</h2>
          <hr className="border-t border-gray-300 mb-3" />
          {resume.education.filter((e) => e.school).map((edu, i) => (
            <div key={i} className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-bold">{edu.school}</p>
                <p className="text-sm">{edu.degree}</p>
              </div>
              <span className="text-sm shrink-0 ml-4">{edu.year}</span>
            </div>
          ))}
        </section>
      )}

      {resume.hobbies && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2">Interests</h2>
          <hr className="border-t border-gray-300 mb-3" />
          <p className="text-sm">{resume.hobbies}</p>
        </section>
      )}
    </div>
  );
}

// ── MODERN TEMPLATE ──────────────────────────────────────────────────────────
function ModernTemplate({ resume }) {
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }} className="text-black">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-10 py-10">
        <h1 className="text-3xl font-light tracking-tight text-white">{resume.name || "Your Name"}</h1>
        {resume.title && <p className="text-violet-200 text-sm mt-1">{resume.title}</p>}
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-violet-100">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
        </div>
        {resume.summary && (
          <p className="mt-4 text-sm text-violet-100 leading-relaxed max-w-2xl">{resume.summary}</p>
        )}
      </div>

      <div className="px-10 py-8 space-y-7 bg-gradient-to-br from-slate-50 to-slate-100">
        {resume.experience?.some((e) => e.company || e.role) && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Experience</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            {resume.experience.filter((e) => e.company || e.role).map((exp, i) => (
              <div key={i} className="mb-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{exp.role || "—"}</p>
                    <p className="text-sm text-violet-600 mt-0.5">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-4 bg-white px-2.5 py-1 rounded-md border border-gray-100">{exp.duration}</span>
                </div>
                {exp.bullets && (
                  <ul className="mt-2 space-y-1.5">
                    {exp.bullets.split("\n").filter(Boolean).map((b, j) => (
                      <li key={j} className="flex gap-2 text-sm text-gray-600">
                        <span className="text-violet-400 mt-1 shrink-0">▸</span>{b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {resume.projects?.some((p) => p.title) && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Projects</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            {resume.projects.filter((p) => p.title).map((proj, i) => (
              <div key={i} className="mb-4">
                <p className="text-sm font-semibold text-gray-900">{proj.title}</p>
                {proj.link && <p className="text-sm text-violet-600 break-all">{proj.link}</p>}
                {proj.description && <p className="mt-1 text-sm text-gray-600 leading-relaxed">{proj.description}</p>}
              </div>
            ))}
          </section>
        )}

        {resume.skills && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Skills</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex flex-wrap gap-2">
              {resume.skills.split(",").map((s) => s.trim()).filter(Boolean).map((skill, i) => (
                <span key={i} className="text-xs text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg font-medium">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {resume.education?.some((e) => e.school) && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Education</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            {resume.education.filter((e) => e.school).map((edu, i) => (
              <div key={i} className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.degree}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0 ml-4 bg-white px-2.5 py-1 rounded-md border border-gray-100">{edu.year}</span>
              </div>
            ))}
          </section>
        )}

        {resume.hobbies && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Interests</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex flex-wrap gap-2">
              {resume.hobbies.split(",").map((h) => h.trim()).filter(Boolean).map((hobby, i) => (
                <span key={i} className="text-xs text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg">{hobby}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ── MINIMAL TEMPLATE ─────────────────────────────────────────────────────────
function MinimalTemplate({ resume }) {
  return (
    <div style={{ fontFamily: "Georgia, serif" }} className="text-black bg-white border-2 border-slate-200 px-10 py-10">
      <h1 className="text-4xl font-bold text-gray-900">{resume.name || "Your Name"}</h1>
      {resume.title && <p className="text-base text-gray-500 mt-1">{resume.title}</p>}
      <p className="text-sm text-gray-500 mt-2">
        {[resume.email, resume.location, resume.phone].filter(Boolean).join(" | ")}
      </p>
      <div className="border-t-2 border-gray-800 mt-5 mb-6" />

      {resume.summary && (
        <section className="mb-6">
          <div className="border-l-4 border-gray-800 pl-3 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Summary</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-700">{resume.summary}</p>
        </section>
      )}

      {resume.experience?.some((e) => e.company || e.role) && (
        <section className="mb-6">
          <div className="border-l-4 border-gray-800 pl-3 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Experience</h2>
          </div>
          {resume.experience.filter((e) => e.company || e.role).map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <p className="text-sm font-bold text-gray-900">{exp.role || "—"}</p>
                <span className="text-sm text-gray-500">{exp.duration}</span>
              </div>
              <p className="text-sm text-gray-500">{exp.company}</p>
              {exp.bullets && (
                <ul className="mt-2 list-disc list-outside pl-5 text-sm text-gray-700 space-y-1">
                  {exp.bullets.split("\n").filter(Boolean).map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {resume.projects?.some((p) => p.title) && (
        <section className="mb-6">
          <div className="border-l-4 border-gray-800 pl-3 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Projects</h2>
          </div>
          {resume.projects.filter((p) => p.title).map((proj, i) => (
            <div key={i} className="mb-3">
              <p className="text-sm font-bold text-gray-900">{proj.title}</p>
              {proj.link && <p className="text-sm text-gray-500">{proj.link}</p>}
              {proj.description && <p className="text-sm text-gray-700 leading-relaxed mt-1">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {resume.skills && (
        <section className="mb-6">
          <div className="border-l-4 border-gray-800 pl-3 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Skills</h2>
          </div>
          <p className="text-sm text-gray-700">
            {resume.skills.split(",").map((s) => s.trim()).filter(Boolean).join(" • ")}
          </p>
        </section>
      )}

      {resume.education?.some((e) => e.school) && (
        <section className="mb-6">
          <div className="border-l-4 border-gray-800 pl-3 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Education</h2>
          </div>
          {resume.education.filter((e) => e.school).map((edu, i) => (
            <div key={i} className="flex justify-between mb-2">
              <div>
                <p className="text-sm font-bold text-gray-900">{edu.school}</p>
                <p className="text-sm text-gray-500">{edu.degree}</p>
              </div>
              <span className="text-sm text-gray-500">{edu.year}</span>
            </div>
          ))}
        </section>
      )}

      {resume.hobbies && (
        <section className="mb-6">
          <div className="border-l-4 border-gray-800 pl-3 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Interests</h2>
          </div>
          <p className="text-sm text-gray-700">{resume.hobbies}</p>
        </section>
      )}
    </div>
  );
}

// ── AI Suggestion Modal ──────────────────────────────────────────────────────
function AiModal({ suggestion, onApply, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-[#0f0f14] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <Sparkles size={13} className="text-violet-400" />
            </div>
            <span className="text-sm font-semibold text-white/90">AI Suggestion</span>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white/70 transition p-1 rounded-lg hover:bg-white/6">
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-4">
          <p className="text-[11px] uppercase tracking-widest text-white/25 mb-3 font-semibold">Generated output</p>
          <div className="bg-[#0c0c10] border border-white/6 rounded-xl px-4 py-3 text-sm text-white/80 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
            {suggestion}
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-5">
          <button onClick={onApply} className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-violet-500/20">
            <CheckCheck size={14} />
            Apply to field
          </button>
          <button onClick={onClose} className="flex items-center justify-center gap-2 bg-white/6 hover:bg-white/10 border border-white/8 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-white/60 hover:text-white/80">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

// ── AI Suggest Button ────────────────────────────────────────────────────────
function AiButton({ loading, onClick }) {
  return (
    <button onClick={onClick} disabled={loading} className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-violet-400 hover:text-violet-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
      {loading ? "Generating…" : "AI Suggest"}
    </button>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function BuilderPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const previewRef = useRef(null);
  const [active, setActive] = useState("Personal");
  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: [{ company: "", role: "", duration: "", bullets: "" }],
    education: [{ school: "", degree: "", year: "" }],
    skills: "",
    projects: [{ title: "", description: "", link: "" }],
    hobbies: "",
    template: "default",
  });

  const [aiLoading, setAiLoading] = useState({});
  const [aiModal, setAiModal] = useState(null);

  useEffect(() => {
    if (!id) return;
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const saved = stored.find((item) => String(item.id) === String(id));
    if (saved?.data) setResume(saved.data);
  }, [id]);

  const update = (field, value) => setResume((r) => ({ ...r, [field]: value }));

  const handleAiSuggest = async (loadingKey, text, onApply) => {
    if (!text || !text.trim()) {
      alert("Please enter some text first before asking for AI suggestions.");
      return;
    }
    setAiLoading((prev) => ({ ...prev, [loadingKey]: true }));
    try {
      const res = await fetch("http://localhost:5000/api/ai-suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      const suggestion = data.suggestion || "";
      if (!suggestion) { alert("AI returned an empty response. Please try again."); return; }
      setAiModal({ suggestion, onApply: () => { onApply(suggestion); setAiModal(null); } });
    } catch (err) {
      console.error(err);
      alert("Could not reach the AI. Make sure the backend server is running on port 5000.");
    } finally {
      setAiLoading((prev) => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleSaveToDashboard = () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const now = new Date();
    const existing = stored.find((item) => String(item.id) === String(id));
    const newResume = {
      id: existing ? existing.id : Date.now(),
      title: resume.name || "Untitled Resume",
      createdDate: existing ? existing.createdDate : now.toLocaleDateString(),
      lastModified: now.toLocaleDateString(),
      data: resume,
    };
    const updated = existing
      ? stored.map((item) => (String(item.id) === String(id) ? newResume : item))
      : [...stored, newResume];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    navigate("/dashboard");
  };

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resume.name?.trim() || "resume"}.pdf`);
  };

  const Field = ({ label, field, placeholder, as = "input", rows = 3 }) => (
    <div>
      <label className={labelCls}>{label}</label>
      {as === "textarea" ? (
        <textarea key={field} rows={rows} className={inputCls + " resize-none leading-relaxed"} placeholder={placeholder} value={resume[field]} onChange={(e) => update(field, e.target.value)} />
      ) : (
        <input key={field} className={inputCls} placeholder={placeholder} value={resume[field]} onChange={(e) => update(field, e.target.value)} />
      )}
    </div>
  );

  return (
    <div className="h-screen bg-[#080809] text-white flex flex-col overflow-hidden">
      {aiModal && <AiModal suggestion={aiModal.suggestion} onApply={aiModal.onApply} onClose={() => setAiModal(null)} />}

      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-b border-white/6 shrink-0 bg-[#080809]/80 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 mb-2 sm:mb-0">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
            <Sparkles size={15} className="text-violet-400" />
          </div>
          <span className="font-semibold text-white/90 tracking-tight">ResumeAI</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/30 mb-2 sm:mb-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Auto-saving
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button onClick={handleSaveToDashboard} className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-violet-500/20">
            <Save size={14} />
            Save to Dashboard
          </button>
          <button onClick={handleExportPDF} className="flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-white/10">
            <Download size={14} />
            Export PDF
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

        {/* Sidebar */}
        <nav className="w-full lg:w-52 shrink-0 border-b lg:border-b-0 lg:border-r border-white/6 p-3 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-y-auto">
          <p className={labelCls + " px-3 pt-2"}>Sections</p>
          {SECTIONS.map(({ id, icon: Icon, desc }) => (
            <button key={id} onClick={() => setActive(id)} className={`group flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 min-w-max lg:min-w-0 ${active === id ? "bg-violet-500/15 border border-violet-500/20 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/4 border border-transparent"}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${active === id ? "bg-violet-500/30" : "bg-white/6"}`}>
                <Icon size={13} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium leading-tight">{id}</div>
                <div className="text-[10px] text-white/25 mt-0.5 leading-tight truncate">{desc}</div>
              </div>
              {active === id && <ChevronRight size={12} className="ml-auto text-violet-400 shrink-0" />}
            </button>
          ))}
        </nav>

        {/* Form panel */}
        <main className="w-full lg:w-[320px] shrink-0 border-b lg:border-b-0 lg:border-r border-white/6 overflow-y-auto p-5 flex flex-col gap-5">

          {active === "Personal" && (
            <>
              <div>
                <h2 className="text-base font-semibold text-white/90">Personal info</h2>
                <p className="text-xs text-white/30 mt-0.5">Your contact details and intro</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><Field label="Full name" field="name" placeholder="Ada Lovelace" /></div>
                <Field label="Email" field="email" placeholder="ada@mail.com" />
                <Field label="Phone" field="phone" placeholder="+234 800 000" />
                <div className="col-span-2"><Field label="Location" field="location" placeholder="Lagos, Nigeria" /></div>
              </div>
              <div>
                <label className={labelCls}>Professional summary</label>
                <textarea key="summary" rows={4} className={inputCls + " resize-none leading-relaxed"} placeholder="Brief intro about yourself..." value={resume.summary} onChange={(e) => update("summary", e.target.value)} />
                <AiButton loading={!!aiLoading["summary"]} onClick={() => handleAiSuggest("summary", resume.summary || `${resume.name} — ${resume.skills}`, (text) => update("summary", text))} />
              </div>
            </>
          )}

          {active === "Experience" && (
            <>
              <div>
                <h2 className="text-base font-semibold text-white/90">Work experience</h2>
                <p className="text-xs text-white/30 mt-0.5">Add your roles, latest first</p>
              </div>
              {resume.experience.map((exp, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-white/3 border border-white/6">
                  <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">Role {i + 1}</span>
                  {[{ label: "Company", key: "company", placeholder: "Acme Corp" }, { label: "Job title", key: "role", placeholder: "Software Engineer" }, { label: "Duration", key: "duration", placeholder: "2022 – Present" }].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className={labelCls}>{label}</label>
                      <input key={`exp-${i}-${key}`} className={inputCls} placeholder={placeholder} value={exp[key]} onChange={(e) => { const u = [...resume.experience]; u[i] = { ...u[i], [key]: e.target.value }; update("experience", u); }} />
                    </div>
                  ))}
                  <div>
                    <label className={labelCls}>Bullet points (one per line)</label>
                    <textarea key={`exp-bullets-${i}`} rows={3} className={inputCls + " resize-none leading-relaxed"} placeholder={"Built X, improving Y by 40%\nLed a team of 5 engineers"} value={exp.bullets} onChange={(e) => { const u = [...resume.experience]; u[i] = { ...u[i], bullets: e.target.value }; update("experience", u); }} />
                    <AiButton loading={!!aiLoading[`exp-${i}`]} onClick={() => handleAiSuggest(`exp-${i}`, exp.bullets || `${exp.role} at ${exp.company} (${exp.duration})`, (text) => { const u = [...resume.experience]; u[i] = { ...u[i], bullets: text }; update("experience", u); })} />
                  </div>
                </div>
              ))}
              <button onClick={() => update("experience", [...resume.experience, { company: "", role: "", duration: "", bullets: "" }])} className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition py-1">
                <Plus size={14} /> Add another role
              </button>
            </>
          )}

          {active === "Education" && (
            <>
              <div>
                <h2 className="text-base font-semibold text-white/90">Education</h2>
                <p className="text-xs text-white/30 mt-0.5">Schools and qualifications</p>
              </div>
              {resume.education.map((edu, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-white/3 border border-white/6">
                  <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">Entry {i + 1}</span>
                  {[{ label: "Institution", key: "school", placeholder: "University of Lagos" }, { label: "Degree", key: "degree", placeholder: "B.Sc Computer Science" }, { label: "Years", key: "year", placeholder: "2019 – 2023" }].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className={labelCls}>{label}</label>
                      <input key={`edu-${i}-${key}`} className={inputCls} placeholder={placeholder} value={edu[key]} onChange={(e) => { const u = [...resume.education]; u[i] = { ...u[i], [key]: e.target.value }; update("education", u); }} />
                    </div>
                  ))}
                </div>
              ))}
              <button onClick={() => update("education", [...resume.education, { school: "", degree: "", year: "" }])} className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition py-1">
                <Plus size={14} /> Add another
              </button>
            </>
          )}

          {active === "Skills" && (
            <>
              <div>
                <h2 className="text-base font-semibold text-white/90">Skills</h2>
                <p className="text-xs text-white/30 mt-0.5">Separate with commas</p>
              </div>
              <div>
                <label className={labelCls}>Technologies & tools</label>
                <textarea key="skills" rows={6} className={inputCls + " resize-none leading-relaxed"} placeholder="React, TypeScript, Node.js, PostgreSQL, Figma, AWS" value={resume.skills} onChange={(e) => update("skills", e.target.value)} />
                <AiButton loading={!!aiLoading["skills"]} onClick={() => handleAiSuggest("skills", resume.skills || resume.experience.map((e) => `${e.role} at ${e.company}`).join(", "), (text) => update("skills", text))} />
              </div>
              {resume.skills && (
                <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-white/3 border border-white/6">
                  {resume.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s, i) => (
                    <span key={i} className="bg-violet-500/15 border border-violet-500/20 text-violet-300 text-xs px-3 py-1.5 rounded-lg">{s}</span>
                  ))}
                </div>
              )}
            </>
          )}

          {active === "Projects" && (
            <>
              <div>
                <h2 className="text-base font-semibold text-white/90">Projects</h2>
                <p className="text-xs text-white/30 mt-0.5">Showcase your work</p>
              </div>
              {resume.projects.map((proj, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-white/3 border border-white/6">
                  <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">Project {i + 1}</span>
                  {[{ label: "Title", key: "title", placeholder: "E-commerce Website" }, { label: "Link", key: "link", placeholder: "https://example.com" }].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className={labelCls}>{label}</label>
                      <input key={`proj-${i}-${key}`} className={inputCls} placeholder={placeholder} value={proj[key]} onChange={(e) => { const u = [...resume.projects]; u[i] = { ...u[i], [key]: e.target.value }; update("projects", u); }} />
                    </div>
                  ))}
                  <div>
                    <label className={labelCls}>Description</label>
                    <textarea key={`proj-desc-${i}`} rows={3} className={inputCls + " resize-none leading-relaxed"} placeholder="Describe the project..." value={proj.description} onChange={(e) => { const u = [...resume.projects]; u[i] = { ...u[i], description: e.target.value }; update("projects", u); }} />
                    <AiButton loading={!!aiLoading[`proj-${i}`]} onClick={() => handleAiSuggest(`proj-${i}`, proj.description || `Project: ${proj.title}`, (text) => { const u = [...resume.projects]; u[i] = { ...u[i], description: text }; update("projects", u); })} />
                  </div>
                </div>
              ))}
              <button onClick={() => update("projects", [...resume.projects, { title: "", description: "", link: "" }])} className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition py-1">
                <Plus size={14} /> Add another project
              </button>
            </>
          )}

          {active === "Hobbies" && (
            <>
              <div>
                <h2 className="text-base font-semibold text-white/90">Hobbies</h2>
                <p className="text-xs text-white/30 mt-0.5">Personal interests</p>
              </div>
              <div>
                <label className={labelCls}>Interests & hobbies</label>
                <textarea key="hobbies" rows={6} className={inputCls + " resize-none leading-relaxed"} placeholder="Reading, Hiking, Photography, Cooking" value={resume.hobbies} onChange={(e) => update("hobbies", e.target.value)} />
              </div>
              {resume.hobbies && (
                <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-white/3 border border-white/6">
                  {resume.hobbies.split(",").map((h) => h.trim()).filter(Boolean).map((hobby, i) => (
                    <span key={i} className="bg-violet-500/15 border border-violet-500/20 text-violet-300 text-xs px-3 py-1.5 rounded-lg">{hobby}</span>
                  ))}
                </div>
              )}
            </>
          )}

          {active === "Templates" && (
            <>
              <div>
                <h2 className="text-base font-semibold text-white/90">Templates</h2>
                <p className="text-xs text-white/30 mt-0.5">Choose a resume style</p>
              </div>
              <div className="grid gap-3">
                {TEMPLATES.map((template) => (
                  <button key={template.id} onClick={() => update("template", template.id)} className={`p-4 rounded-2xl border transition-all duration-200 ${resume.template === template.id ? "bg-violet-500/15 border-violet-500/20" : "bg-white/3 border-white/6 hover:bg-white/5"}`}>
                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-white/90">{template.name}</h3>
                      <p className="text-xs text-white/50 mt-1">{template.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </main>

        {/* Preview - now uses the same template components as PreviewPage */}
        <section className="flex-1 overflow-y-auto bg-[#0c0c0f] flex items-start justify-center p-4 sm:p-8">
          <div
            ref={previewRef}
            className="w-full max-w-[640px] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden bg-white"
            style={{ minHeight: "600px" }}
          >
            {resume.template === "default" && <ClassicTemplate resume={resume} />}
            {resume.template === "modern"  && <ModernTemplate  resume={resume} />}
            {resume.template === "minimal" && <MinimalTemplate resume={resume} />}
          </div>
        </section>

      </div>
    </div>
  );
}