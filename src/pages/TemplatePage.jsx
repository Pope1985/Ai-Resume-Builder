import { useNavigate, useParams } from "react-router-dom";

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional format with centered header, bold section titles and clean dividers.",
    preview: (
      <div className="text-[6px] leading-tight p-2 font-serif text-black">
        <div className="text-center font-bold uppercase text-[8px]">JOHN DOE</div>
        <div className="text-center text-[5px] mb-1">Lagos • 08012345678 • john@email.com</div>
        <hr className="border-gray-400 mb-1" />
        <div className="font-bold uppercase text-[6px] mb-0.5">EXPERIENCE</div>
        <hr className="border-gray-300 mb-0.5" />
        <div className="flex justify-between"><span className="font-bold">Software Engineer</span><span>2023 - 2025</span></div>
        <div>Google Inc.</div>
        <div className="mt-1 font-bold uppercase text-[6px]">EDUCATION</div>
        <hr className="border-gray-300 mb-0.5" />
        <div className="flex justify-between"><span className="font-bold">University of Lagos</span><span>2020</span></div>
      </div>
    ),
  },
  {
    id: "modern",
    name: "Modern",
    description: "Sleek dark header with white body, colored accents and pill-style skill tags.",
    preview: (
      <div className="text-[6px] leading-tight text-black">
        <div className="bg-slate-900 text-white p-2">
          <div className="font-semibold text-[8px]">John Doe</div>
          <div className="text-slate-300 text-[5px]">john@email.com • Lagos</div>
        </div>
        <div className="p-2 space-y-1">
          <div className="flex items-center gap-1"><span className="uppercase tracking-widest text-[4px] text-slate-400">Experience</span><div className="h-px flex-1 bg-slate-200"/></div>
          <div className="font-semibold">Software Engineer</div>
          <div className="text-violet-600 text-[5px]">Google Inc.</div>
          <div className="flex items-center gap-1 mt-1"><span className="uppercase tracking-widest text-[4px] text-slate-400">Skills</span><div className="h-px flex-1 bg-slate-200"/></div>
          <div className="flex gap-1 flex-wrap">
            <span className="bg-slate-100 rounded-full px-1 text-[4px]">React</span>
            <span className="bg-slate-100 rounded-full px-1 text-[4px]">Node.js</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple left-aligned layout with subtle borders and lots of whitespace.",
    preview: (
      <div className="text-[6px] leading-tight p-2 text-black">
        <div className="font-bold text-[9px] mb-0.5">John Doe</div>
        <div className="text-gray-500 text-[5px] mb-2">john@email.com | Lagos | 08012345678</div>
        <div className="border-l-2 border-gray-800 pl-1.5 mb-1">
          <div className="font-semibold uppercase text-[5px] text-gray-500 tracking-widest">Experience</div>
        </div>
        <div className="font-semibold text-[6px]">Software Engineer</div>
        <div className="text-gray-500 text-[5px]">Google · 2023–2025</div>
        <div className="border-l-2 border-gray-800 pl-1.5 mt-1 mb-1">
          <div className="font-semibold uppercase text-[5px] text-gray-500 tracking-widest">Education</div>
        </div>
        <div className="font-semibold text-[6px]">University of Lagos</div>
        <div className="text-gray-500 text-[5px]">B.Sc Computer Science · 2020</div>
      </div>
    ),
  },
];

export default function TemplatePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSelect = (templateId) => {
    navigate(`/preview/${id}?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-[#080809] text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Choose a Template</h1>
        <p className="text-white/50 text-sm mb-10">Pick a format for your resume. You can always come back and change it.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {templates.map((t) => (
            <div
              key={t.id}
              className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500 transition cursor-pointer group"
              onClick={() => handleSelect(t.id)}
            >
              {/* Mini preview */}
              <div className="bg-white h-48 overflow-hidden">
                {t.preview}
              </div>

              {/* Info */}
              <div className="p-4">
                <h2 className="font-semibold text-white text-base">{t.name}</h2>
                <p className="text-white/50 text-xs mt-1 leading-relaxed">{t.description}</p>
                <button
                  className="mt-4 w-full py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm font-semibold transition"
                  onClick={() => handleSelect(t.id)}
                >
                  Use this template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}