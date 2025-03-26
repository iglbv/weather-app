import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const injectFonts = () => {
  const inter = document.createElement('link');
  inter.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  inter.rel = 'stylesheet';

  const montserrat = document.createElement('link');
  montserrat.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
  montserrat.rel = 'stylesheet';

  document.head.append(inter, montserrat);
};
injectFonts();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);