import React from 'react'
import { Plus } from 'lucide-react'

const Header = ({ title, subtitle, onCreateNew, buttonText = 'Create New Resume', darkMode = false }) => {
  return (
    <div className={`shadow-sm ${darkMode ? 'bg-gray-900 border-b border-white/10' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>
          </div>
          {onCreateNew && (
            <button
              onClick={onCreateNew}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-md transition ${
                darkMode ? 'bg-violet-600 text-white hover:bg-violet-500' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Plus size={20} />
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header