import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BuilderPage from './pages/BuilderPage'
import DashBoardPage from './pages/DashboardPage'
import PreviewPage from './pages/PreviewPage'
import TemplatePage from './pages/TemplatePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/builder" element={<BuilderPage />} />
      <Route path="/builder/:id" element={<BuilderPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />
      <Route path="/preview/:id" element={<PreviewPage />} />
      <Route path="/templates" element={<TemplatePage />} />
    </Routes>
  )
}