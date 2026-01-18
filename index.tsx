
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Global error trap
window.onerror = function (msg, url, line, col, error) {
  if (msg.toString().includes('ResizeObserver loop')) return false;

  const errorBox = document.createElement('div');
  errorBox.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:red; color:white; padding:20px; z-index:100000; border:4px solid white; max-width:80%; font-size: 20px;';
  errorBox.innerHTML = '<h3>CRITICAL JS ERROR:</h3><p>' + msg + '</p>';
  document.body.appendChild(errorBox);
  return false;
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React Root Rendering App...');
} catch (e: any) {
  document.body.innerHTML += '<div style="color:red; font-size:24px; padding:20px;">REACT BOOTSTRAP ERROR: ' + e.message + '</div>';
  console.error(e);
}
