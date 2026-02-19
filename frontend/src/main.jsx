import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContex.jsx'

// Prevent service worker registration errors in webview/extension contexts
if ('serviceWorker' in navigator) {
  // Check if we're in a webview or extension context
  const isWebview = window.location.protocol === 'vscode-webview:' || 
                   window.location.href.includes('vscode-webview') ||
                   !window.location.origin.includes('localhost');
  
  if (isWebview) {
    // Disable service worker registration in webview contexts
    delete navigator.serviceWorker;
  } else {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => registration.unregister());
    });
  }
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
     <App />
  </AppContextProvider>   
  </BrowserRouter>,
)
