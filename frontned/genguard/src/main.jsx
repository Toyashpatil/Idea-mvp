import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SecureBankForm from './screens/SecureBankForm.jsx'
import Dashboard from './screens/Dashboard.jsx'
import Simulate from './screens/Simulate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SecureBankForm />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/simulate" element={<Simulate />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
