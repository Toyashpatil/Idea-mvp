import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignupStep1 from './screens/SecureBankForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignupStep1 />
  </StrictMode>
)
