import React from 'react'
import { FileText, Eye, Download, Trash2 } from 'lucide-react'

const OutputCard = ({ 
  resume, 
  onEdit, 
  onView, 
  onDownload, 
  onDelete,
  darkMode = false
}) => {
  return (
    <div className={`rounded-lg shadow-md hover:shadow-lg transition overflow-hidden ${
      darkMode ? 'bg-gray-900 border border-white/10' : 'bg-white'
    }`}>
      {/* Preview Area */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-600 h-40 flex items-center justify-center">
        <FileText size={64} className="text-white opacity-80" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`text-lg font-bold mb-1 truncate ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {resume.title}
        </h3>
        <p className={`text-sm mb-4 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Modified {resume.lastModified}
        </p>
        <p className={`text-xs mb-6 ${
          darkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          Created: {resume.createdDate}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => onEdit(resume.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition text-sm font-medium ${
              darkMode ? 'bg-violet-600 text-white hover:bg-violet-500' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <FileText size={16} />
            Edit
          </button>
          <button
            onClick={() => onView(resume.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition text-sm font-medium ${
              darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <Eye size={16} />
            View
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onDownload(resume.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition text-sm font-medium ${
              darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <Download size={16} />
          </button>
          <button
            onClick={() => onDelete(resume.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition text-sm font-medium ${
              darkMode ? 'bg-red-900 text-red-300 hover:bg-red-800' : 'bg-red-100 text-red-600 hover:bg-red-200'
            }`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default OutputCard