import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/manrope';
import { App } from './App';
import { content, getLocale } from './content';
import './style.css';

const locale = getLocale(window.location.pathname);
const root = document.getElementById('root');
if (!root) throw new Error('Missing React root');

const app = <App locale={locale} />;
if (root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  document.documentElement.lang = locale;
  document.title = content[locale].title;
  createRoot(root).render(app);
}
