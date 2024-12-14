import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Header from './Componets/Header/Header.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <header/>
    <App />
  </StrictMode>,
)
