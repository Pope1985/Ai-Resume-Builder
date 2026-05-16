import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

const STORAGE_KEY = "resumes";

// ─── CLASSIC TEMPLATE (matches screenshot - centered, serif, bold sections) ──
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
            {resume.skills.split("\n").filter(Boolean).map((line, i) => (
              <li key={i}>{line}</li>
            ))}
            {/* fallback: if skills are comma-separated not newline */}
            {!resume.skills.includes("\n") &&
              resume.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s, i) => (
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

// ─── MODERN TEMPLATE (dark header, violet accents, pill tags) ────────────────
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

// ─── MINIMAL TEMPLATE (left-aligned, bordered sections, clean) ───────────────
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

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function PreviewPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const found = stored.find((item) => String(item.id) === String(id));
    setResume(found?.data ?? null);
  }, [id]);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "print-styles";
    style.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #resume-card, #resume-card * { visibility: visible; }
        #resume-card {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          margin: 0; padding: 0;
          box-shadow: none;
          border-radius: 0;
        }
        @page { margin: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("print-styles");
      if (el) el.remove();
    };
  }, []);

  if (!resume) {
    return (
      <div className="min-h-screen bg-[#080809] text-white flex items-center justify-center p-6">
        <div className="max-w-md bg-gray-900 rounded-3xl p-8 text-center shadow-2xl shadow-black/50">
          <p className="text-xl font-semibold mb-4">Resume not found</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-3 bg-violet-600 hover:bg-violet-500 rounded-2xl text-sm font-semibold transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Read template from saved resume data (set in BuilderPage)
  const template = resume.template || "default";

  const templateLabel = {
    default: "Classic",
    modern: "Modern",
    minimal: "Minimalist",
  }[template] || "Classic";

  return (
    <div className="min-h-screen bg-[#080809] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
            >
              <ArrowLeft size={16} />
              Dashboard
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold mt-3">Resume Preview</h1>
            <p className="text-sm text-white/50 mt-1">
              {resume.name || "Untitled"} · <span className="text-violet-400">{templateLabel} template</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/builder/${id}`)}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-semibold text-white transition"
            >
              Edit Resume
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition"
            >
              <Download size={16} />
              Print / Export
            </button>
          </div>
        </div>

        {/* Resume Card */}
        <div id="resume-card" className="bg-white shadow-2xl overflow-hidden rounded-2xl">
          {template === "default"  && <ClassicTemplate  resume={resume} />}
          {template === "modern"   && <ModernTemplate   resume={resume} />}
          {template === "minimal"  && <MinimalTemplate  resume={resume} />}
        </div>
      </div>
    </div>
  );
}