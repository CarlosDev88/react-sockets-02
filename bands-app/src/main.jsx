import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BandNameApp } from './BandNameApp.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(<BandNameApp />)
