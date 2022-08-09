import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import NotificationProvider from './notifications/NotificationProvider';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
);
