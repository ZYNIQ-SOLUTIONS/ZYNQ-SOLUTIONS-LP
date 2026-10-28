import {lazy, StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const Admin = lazy(() => import('./admin/Admin.tsx'));
const Legal = lazy(() => import('./legal/LegalPage.tsx'));
const PortfolioPage = lazy(() => import('./portfolio/PortfolioPage.tsx'));
const path = window.location.pathname.replace(/\/+$/, '');
const isAdmin = path === '/admin';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? (
      <Suspense fallback={null}>
        <Admin />
      </Suspense>
    ) : path === '/portfolio' ? (
      <Suspense fallback={null}>
        <PortfolioPage />
      </Suspense>
    ) : path === '/terms' || path === '/privacy' ? (
      <Suspense fallback={null}>
        <Legal doc={path} />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
);
