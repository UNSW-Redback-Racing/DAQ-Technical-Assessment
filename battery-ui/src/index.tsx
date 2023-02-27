import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DimensionsProvider from './DimensionsProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DimensionsProvider>
      <App />
    </DimensionsProvider>
  </React.StrictMode>
);
