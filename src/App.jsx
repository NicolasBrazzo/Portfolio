import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { CaseStudyDetail } from './pages/CaseStudyDetail'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
