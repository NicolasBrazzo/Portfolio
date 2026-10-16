import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { LEGACY_PROJECT_IDS } from './data/projects'

/* I vecchi link /case-studies/:id puntano ora a /projects/:id */
function LegacyCaseStudyRedirect() {
  const { id } = useParams()
  return <Navigate to={`/projects/${LEGACY_PROJECT_IDS[id] ?? id}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/case-studies/:id" element={<LegacyCaseStudyRedirect />} />
      </Routes>
    </BrowserRouter>
  )
}
