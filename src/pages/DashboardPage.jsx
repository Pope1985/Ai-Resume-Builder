import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Plus, Eye, Download, Trash2 } from "lucide-react";

const STORAGE_KEY = "resumes";

export default function DashBoardPage() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setResumes(stored);
  }, []);

  const handleCreateNew = () => navigate("/builder");
  const handleViewResume = (id) => navigate(`/preview/${id}`);
  const handleEditResume = (id) => navigate(`/builder/${id}`);
  const handleDownloadResume = (id) => {
    window.open(`/preview/${id}`, "_blank");
  };

  const handleDeleteResume = (id) => {
    const updated = resumes.filter((resume) => resume.id !== id);
    setResumes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#080809] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header: Stack on mobile */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold">My Resumes</h1>
            <p className="text-sm text-white/50 mt-2">
              Manage the resumes you saved from the builder.
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition"
          >
            <Plus size={16} />
            Create New Resume
          </button>
        </div>

        {/* Grid: Single column on mobile, responsive columns */}
        <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {resumes.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-slate-950 p-10 text-center">
              <FileText size={44} className="mx-auto text-white/30 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No resumes yet</h2>
              <p className="text-sm text-white/50 mb-6">
                Save a resume from the builder and it will appear here.
              </p>
              <button
                onClick={handleCreateNew}
                className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition"
              >
                Start building
              </button>
            </div>
          ) : (
            resumes.map((resume) => (
              <div
                key={resume.id}
                className="rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-xl shadow-black/20"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{resume.title}</h2>
                    <p className="text-sm text-white/50 mt-1">
                      Updated {resume.lastModified}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-violet-500/15 px-3 py-2 text-xs font-semibold text-violet-200">
                    {resume.createdDate}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEditResume(resume.id)}
                    className="flex-1 rounded-2xl bg-violet-600 px-3 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleViewResume(resume.id)}
                    className="flex-1 rounded-2xl bg-slate-800 px-3 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownloadResume(resume.id)}
                    className="rounded-2xl bg-slate-800 p-3 text-white hover:bg-slate-700 transition"
                    title="Open preview to export"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteResume(resume.id)}
                    className="rounded-2xl bg-red-500/10 p-3 text-red-300 hover:bg-red-500/20 transition"
                    title="Delete resume"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}