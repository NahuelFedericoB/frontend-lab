import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('The application root element is missing.');
}

createRoot(container).render(
  <StrictMode>
    <App embedded={new URLSearchParams(window.location.search).get('embed') === 'true'} />
  </StrictMode>,
);
