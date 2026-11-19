import { useEffect, useRef, useState } from 'react';
import {
  AppWindow, AudioLines, CloudSun, Github, Maximize2, Menu, Monitor,
  PanelsTopLeft, Radio, SlidersHorizontal, Smartphone, Sparkles,
  TabletSmartphone, X, Zap,
} from 'lucide-react';
import { base, content, localePaths, release, socials, standbyPreviews } from './content';
import type { Copy, Locale } from './content';

const media = `${base}media/`;
const sections = ['features', 'ecosystem', 'roadmap', 'community'] as const;
const locales = ['ru', 'en'] as const;
const utilityIcons = [CloudSun, AudioLines, Zap, SlidersHorizontal];
const platformIcons = [WindowsMark, Smartphone, TabletSmartphone];
const roadmapIcons = [Radio, SlidersHorizontal, Monitor, PanelsTopLeft, AudioLines, Sparkles];

function WindowsMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
    </svg>
  );
}

function Brand({ href }: { href: string }) {
  return (
    <a className="brand" href={href}>
      <img src={`${base}favicon.png`} width="32" height="32" alt="" />
      <span>EyeBar</span>
    </a>
  );
}

function Header({ locale, copy }: { locale: Locale; copy: Copy }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="shell header-inner">
        <Brand href={`${base}${localePaths[locale]}`} />
        <nav id="main-navigation" className={`main-nav${open ? ' is-open' : ''}`} aria-label={copy.mainNav}>
          {sections.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{copy.nav[id]}</a>
          ))}
          <a className="button button-primary mobile-download" href="#download" onClick={() => setOpen(false)}>
            {copy.download}
          </a>
        </nav>
        <div className="header-actions">
          <nav className="languages" aria-label={copy.languageNav}>
            {locales.map((language) => (
              <a
                key={language}
                href={`${base}${localePaths[language]}`}
                hrefLang={language}
                lang={language}
                aria-label={content[language].localeName}
                aria-current={language === locale ? 'page' : undefined}
              >
                {language.toUpperCase()}
              </a>
            ))}
          </nav>
          <a className="button button-header" href="#download">{copy.download}</a>
          <button
            className="menu-button icon-button"
            type="button"
            ref={menuButton}
            aria-controls="main-navigation"
            aria-expanded={open}
            aria-label={open ? copy.menuClose : copy.menuOpen}
            onClick={() => setOpen((previous) => !previous)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function DownloadLink({ children }: { children: string }) {
  return (
    <a className="button button-primary" href={release.downloadUrl}>
      <WindowsMark size={19} />
      {children}
    </a>
  );
}

function Hero({ copy }: { copy: Copy }) {
  const [first, second, third] = copy.hero.heading;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero-inner">
        <div className="hero-copy">
          <span className="hero-label"><WindowsMark size={15} />{copy.hero.platform}</span>
          <h1 id="hero-title"><span>{first}</span>{' '}<span>{second}</span>{' '}<span className="hero-accent">{third}</span></h1>
          <p>{copy.hero.body}</p>
          <div className="hero-actions">
            <DownloadLink>{copy.download}</DownloadLink>
            <a className="button button-secondary" href="#features">{copy.nav.features}</a>
            <a className="button button-secondary" href={`${base}app/`}>{copy.localeName === "Русский" ? "Открыть EyeBar Web" : "Open EyeBar Web"}</a>
          </div>
        </div>
        <figure className="hero-art">
          <div className="art-grid" aria-hidden="true" />
          <div className="art-orbit art-orbit-outer" aria-hidden="true" />
          <div className="art-orbit art-orbit-inner" aria-hidden="true" />
          <div className="art-center">
            <img className="hero-mascot" src={`${media}classic-blue.webp`} width="899" height="852" alt={copy.hero.characterAlt} fetchPriority="high" />
          </div>
          <figcaption className="art-caption"><strong>Classic Blue</strong><span>{copy.hero.character}</span></figcaption>
          <span className="art-mark" aria-hidden="true" />
        </figure>
      </div>
    </section>
  );
}

function StandbyCard({ locale, copy }: { locale: Locale; copy: Copy['features']['standby'] }) {
  const [mode, setMode] = useState<(typeof standbyPreviews)[number]>(standbyPreviews[0]);
  const dialog = useRef<HTMLDialogElement>(null);
  const preview = copy.modes[mode];
  const screenshot = `${media}standby-${mode}-${locale}.webp`;

  return (
    <article className="card standby-card" data-reveal>
      <div className="card-copy">
        <div className="feature-icon blue"><Monitor size={22} /></div>
        <div><h3>{copy.title}</h3><p>{copy.body}</p></div>
      </div>
      <fieldset className="standby-modes">
        <legend className="visually-hidden">{copy.options}</legend>
        {standbyPreviews.map((option) => (
          <label key={option}>
            <input className="visually-hidden" type="radio" name="standby-mode" value={option}
              checked={mode === option} onChange={() => setMode(option)} />
            <span>{copy.modes[option].label}</span>
          </label>
        ))}
      </fieldset>
      <button className="screenshot-trigger" type="button" title={copy.open} aria-label={copy.open}
        aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
        <img src={screenshot} alt={preview.alt} width="1920" height="1080" loading="lazy" />
        <span className="screenshot-zoom" aria-hidden="true"><Maximize2 size={17} /></span>
      </button>
      <dialog className="screenshot-dialog" ref={dialog} aria-labelledby="screenshot-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}>
        <div className="screenshot-content">
          <form method="dialog" className="screenshot-header">
            <h2 id="screenshot-title">StandBy · {preview.label}</h2>
            <button className="icon-button" type="submit" aria-label={copy.close}><X size={22} /></button>
          </form>
          <img src={screenshot} alt={preview.alt} width="1920" height="1080" loading="lazy" />
        </div>
      </dialog>
    </article>
  );
}

function Features({ locale, copy }: { locale: Locale; copy: Copy }) {
  const features = copy.features;

  return (
    <section className="shell section" id="features" aria-labelledby="features-title" tabIndex={-1}>
      <div className="section-heading" data-reveal>
        <p className="eyebrow">{copy.nav.features}</p>
        <h2 id="features-title">{features.title}</h2>
        <p className="section-intro">{features.body}</p>
      </div>
      <div className="features-grid">
        <StandbyCard locale={locale} copy={features.standby} />
        <article className="card minibar-card" data-reveal>
          <div className="card-copy">
            <div className="feature-icon violet"><AppWindow size={22} /></div>
            <div><h3>{features.minibar.title}</h3><p>{features.minibar.body}</p></div>
          </div>
          <div className="minibar-art" role="img" aria-label={features.minibar.alt}>
            <img className="cube-capture" src={`${media}cube-${locale}.webp`} alt="" width="320" height="356" loading="lazy" />
            <img className="minibar-capture" src={`${media}minibar-${locale}.webp`} alt="" width="576" height="582" loading="lazy" />
          </div>
        </article>
        <article className="card characters-card" data-reveal>
          <div className="card-copy"><div><h3>{features.mascots.title}</h3><p>{features.mascots.body}</p></div></div>
          <div className="portrait-grid">
            <figure><img src={`${media}classic-blue.webp`} width="899" height="852" alt="" loading="lazy" /><figcaption>Classic Blue</figcaption></figure>
            <figure><img src={`${media}cyber-cat.webp`} width="889" height="904" alt="" loading="lazy" /><figcaption>Cyber Cat</figcaption></figure>
          </div>
        </article>
        <div className="utilities-grid">
          {features.utilities.map((feature, index) => {
            const Icon = utilityIcons[index];
            return (
              <article className="card utility-card" key={feature.title} data-reveal>
                <div className={`feature-icon ${index % 2 ? 'violet' : 'blue'}`}><Icon size={21} /></div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Ecosystem({ copy }: { copy: Copy }) {
  return (
    <section className="shell section" id="ecosystem" aria-labelledby="ecosystem-title" tabIndex={-1}>
      <div className="section-heading" data-reveal>
        <p className="eyebrow">{copy.nav.ecosystem}</p>
        <h2 id="ecosystem-title">{copy.ecosystem.title}</h2>
      </div>
      <div className="platform-grid">
        {copy.ecosystem.platforms.map((platform, index) => {
          const Icon = platformIcons[index];
          return (
            <article className="card platform-card" key={platform.name} data-reveal>
              <div className="platform-top">
                <div className={`feature-icon ${['blue', 'mint', 'violet'][index]}`}><Icon size={23} /></div>
                <span className={`status status-${index}`}>{platform.status}</span>
              </div>
              <h3>{platform.name}</h3>
              <p>{platform.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Roadmap({ copy }: { copy: Copy['roadmap'] }) {
  return (
    <section className="shell section" id="roadmap" aria-labelledby="roadmap-title" tabIndex={-1}>
      <div className="roadmap-board" data-reveal>
        <div className="roadmap-heading">
          <p className="eyebrow">{copy.status}</p>
          <h2 id="roadmap-title">{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
        <ul className="roadmap-list">
          {copy.items.map((item, index) => {
            const Icon = roadmapIcons[index];
            return <li key={item}><Icon size={19} />{item}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}

function Download({ copy }: { copy: Copy }) {
  return (
    <section id="download" className="shell section" aria-labelledby="download-title" tabIndex={-1}>
      <div className="download-board" data-reveal>
        <div>
          <p className="eyebrow">Windows <span aria-hidden="true">/</span> {release.version}</p>
          <h2 id="download-title">{copy.downloads.title}</h2>
          <p>{copy.downloads.body}</p>
        </div>
        <div className="download-actions">
          <DownloadLink>{copy.download}</DownloadLink>
          <p className="file-info">{release.file}<span aria-hidden="true"> · </span>{copy.downloads.size}</p>
          <a className="text-link" href={release.pageUrl}>{copy.downloads.notes}</a>
        </div>
      </div>
    </section>
  );
}

function SocialMark({ name }: { name: (typeof socials)[number]['name'] }) {
  if (name === 'GitHub') return <Github size={23} aria-hidden="true" />;

  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {name === 'Telegram' ? (
        <path d="M21.78 4.27 18.6 19.36c-.24 1.06-.86 1.32-1.74.82l-4.84-3.57-2.33 2.25c-.26.26-.47.47-.97.47l.35-4.94 9-8.13c.39-.35-.08-.54-.6-.19L6.35 13.08 1.57 11.6c-1.03-.32-1.05-1.03.22-1.52l18.7-7.2c.86-.31 1.61.2 1.29 1.39z" />
      ) : (
        <path d="M15.7 2h-3.4v13.34a2.66 2.66 0 1 1-2.66-2.66c.28 0 .56.05.82.13V9.35a6.1 6.1 0 1 0 5.24 6.04V8.61a8.3 8.3 0 0 0 4.88 1.57V6.76A4.88 4.88 0 0 1 15.7 2z" />
      )}
    </svg>
  );
}

function Community({ copy }: { copy: Copy }) {
  return (
    <section className="shell section community" id="community" aria-labelledby="community-title" tabIndex={-1}>
      <div className="section-heading" data-reveal>
        <h2 id="community-title">{copy.community.title}</h2>
        <p className="section-intro">{copy.community.body}</p>
      </div>
      <div className="social-grid">
        {socials.map((social) => (
          <a className="card social-card" key={social.name} href={social.url} data-reveal>
            <div className="feature-icon blue"><SocialMark name={social.name} /></div>
            <span><strong>{social.name}</strong><span className="social-handle">{social.handle}</span></span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function App({ locale }: { locale: Locale }) {
  const copy = content[locale];

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('entered');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">{copy.skip}</a>
      <Header locale={locale} copy={copy} />
      <main id="main" tabIndex={-1}>
        <Hero copy={copy} />
        <Features locale={locale} copy={copy} />
        <Ecosystem copy={copy} />
        <Roadmap copy={copy.roadmap} />
        <Download copy={copy} />
        <Community copy={copy} />
      </main>
      <footer className="site-footer">
        <div className="shell footer-inner"><Brand href={`${base}${localePaths[locale]}`} /><p>{copy.footer}</p></div>
      </footer>
    </>
  );
}
