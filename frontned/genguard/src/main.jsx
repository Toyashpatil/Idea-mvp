import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SecureBankForm from './screens/SecureBankForm.jsx'
import Dashboard from './screens/Dashboard.jsx'
import Simulate from './screens/Simulate.jsx'
import Login from './screens/login.jsx'
import Insights from './screens/Insights.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SecureBankForm />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/simulate" element={<Simulate />} />
    <Route path="/insights" element={<Insights />} />
  <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

