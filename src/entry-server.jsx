import React from 'react'
import { renderToString } from 'react-dom/server'
import { Router } from './router.jsx'
import App from './App.jsx'

export function render(path) {
  return renderToString(
    <React.StrictMode>
      <Router initialPath={path}>
        <App />
      </Router>
    </React.StrictMode>
  )
}
