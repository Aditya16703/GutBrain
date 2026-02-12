import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { SharePage } from './pages/SharePage'
import { LandingPage } from './pages/LandingPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:hash" element={<SharePage />} />
        {/* Redirect any other unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
