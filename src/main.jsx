import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { Router } from './router.jsx'
import App from './App.jsx'

hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
