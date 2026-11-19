export const base = import.meta.env.BASE_URL;
export const siteUrl = 'https://opex149.github.io/eyebar-website/';

export const release = {
  version: 'v1.1',
  file: 'EyeBar.exe',
  downloadUrl: 'https://github.com/Opex149/EyeBar/releases/download/v1.1/EyeBar.exe',
  pageUrl: 'https://github.com/Opex149/EyeBar/releases/tag/v1.1',
};

export const socials = [
  { name: 'Telegram', handle: '@eyebar_app', url: 'https://t.me/eyebar_app' },
  { name: 'TikTok', handle: '@eyebar1', url: 'https://www.tiktok.com/@eyebar1' },
  { name: 'GitHub', handle: 'Opex149/EyeBar', url: 'https://github.com/Opex149/EyeBar' },
] as const;

export const standbyPreviews = ['classic', 'dashboard', 'minimal'] as const;

export const content = {
  ru: {
    title: 'EyeBar — твой рабочий стол. По-новому.',
    description: 'Бесплатное приложение EyeBar для Windows 10 и 11. Погода, музыка, быстрые действия, живые персонажи и полноэкранный StandBy.',
    localeName: 'Русский',
    skip: 'К содержанию',
    mainNav: 'Главное меню',
    languageNav: 'Язык сайта',
    menuOpen: 'Открыть меню',
    menuClose: 'Закрыть меню',
    download: 'Скачать EyeBar',
    nav: { features: 'Возможности', ecosystem: 'Экосистема', roadmap: 'EyeBar 2.0', community: 'Сообщество' },
    hero: {
      platform: 'Бесплатно для Windows',
      heading: ['EyeBar — твой', 'рабочий стол.', 'По-новому.'],
      body: 'Погода, музыка, быстрые действия и живые персонажи в одном компактном приложении',
      character: 'Персонаж EyeBar',
      characterAlt: 'Синий персонаж с цифровыми часами',
    },
    features: {
      title: 'Всё под рукой.',
      body: 'От маленького виджета у края экрана до полноэкранных часов.',
      standby: {
        title: 'Полноэкранный StandBy',
        body: 'Крупные часы, заметки, таймер и управление музыкой. Выбирай, сколько деталей оставить на экране.',
        options: 'Вид StandBy',
        open: 'Увеличить скриншот StandBy',
        close: 'Закрыть скриншот',
        modes: {
          classic: { label: 'Классический', alt: 'Классический StandBy с часами, Classic Blue и карточками' },
          dashboard: { label: 'Панель', alt: 'StandBy с панелью статуса, часами, Classic Blue и карточками' },
          minimal: { label: 'Минимальный', alt: 'Минимальный StandBy с крупными часами в центре экрана' },
        },
      },
      minibar: {
        title: 'Компактный мини-бар',
        body: 'Панель у края экрана можно свернуть в кубик, чтобы освободить место.',
        alt: 'Компактный мини-бар EyeBar и его свёрнутый режим в форме кубика',
      },
      mascots: {
        title: 'Живые персонажи',
        body: 'Реагируют на музыку и погоду. Кибер-кот умеет следить за курсором.',
      },
      utilities: [
        { title: 'Погода', body: 'Температура и условия для выбранного города.' },
        { title: 'Музыкальный плеер', body: 'Пауза, воспроизведение и переключение треков.' },
        { title: 'Быстрые действия', body: 'Снимок экрана, Проводник и калькулятор.' },
        { title: 'Свой стиль', body: 'Графит или стекло, прозрачность и цвет подсветки.' },
      ],
    },
    ecosystem: {
      title: 'EyeBar на твоих устройствах.',
      platforms: [
        { name: 'EyeBar для Windows', status: 'Доступно', body: 'Мини-бар, персонажи и StandBy для компьютеров с Windows 10 и 11.' },
        { name: 'EyeBar Android', status: 'Бета', body: 'Компаньон для мониторинга и управления ПК по локальной сети.' },
        { name: 'iEyeBar для iOS/iPadOS', status: 'В разработке', body: 'Будущая версия EyeBar для iPhone и iPad.' },
      ],
    },
    roadmap: {
      status: 'Скоро',
      title: 'EyeBar 2.0',
      body: 'Планы на будущее обновление.',
      items: ['EyeBar Connect', 'Персонализация', 'Улучшенный StandBy', 'Новые виджеты', 'Анимации', 'Другие улучшения'],
    },
    downloads: {
      title: 'Попробуй EyeBar.',
      body: 'Бесплатное приложение для Windows 10 и 11.',
      size: '48,3 МБ',
      notes: 'Страница релиза',
    },
    community: { title: 'Сообщество EyeBar.', body: 'Следи за обновлениями и делись идеями.' },
    footer: 'Официальный сайт EyeBar',
  },
  en: {
    title: 'EyeBar — your desktop. Reimagined.',
    description: 'Free EyeBar app for Windows 10 and 11. Weather, music, quick actions, animated characters, and full-screen StandBy.',
    localeName: 'English',
    skip: 'Skip to content',
    mainNav: 'Main menu',
    languageNav: 'Site language',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    download: 'Download EyeBar',
    nav: { features: 'Features', ecosystem: 'Ecosystem', roadmap: 'EyeBar 2.0', community: 'Community' },
    hero: {
      platform: 'Free for Windows',
      heading: ['EyeBar — your', 'desktop.', 'Reimagined.'],
      body: 'Weather, music, quick actions, and animated characters in one compact app',
      character: 'EyeBar character',
      characterAlt: 'Blue character with a digital clock',
    },
    features: {
      title: 'Everything within reach.',
      body: 'From a small widget at the edge of your screen to a full-screen clock.',
      standby: {
        title: 'Full-screen StandBy',
        body: 'A large clock, notes, a timer, and music controls. Choose how much detail to keep on screen.',
        options: 'StandBy layout',
        open: 'Enlarge StandBy screenshot',
        close: 'Close screenshot',
        modes: {
          classic: { label: 'Classic', alt: 'Classic StandBy with a clock, Classic Blue, and cards' },
          dashboard: { label: 'Dashboard', alt: 'StandBy dashboard with a status strip, clock, Classic Blue, and cards' },
          minimal: { label: 'Minimal', alt: 'Minimal StandBy with a large clock in the center of the screen' },
        },
      },
      minibar: {
        title: 'Compact mini-bar',
        body: 'Collapse the panel at the edge of your screen into a cube to make more room.',
        alt: 'The EyeBar mini-bar and its collapsed cube mode',
      },
      mascots: {
        title: 'Interactive characters',
        body: 'They react to music and weather. Cyber Cat can follow your cursor.',
      },
      utilities: [
        { title: 'Weather', body: 'Temperature and conditions for your selected city.' },
        { title: 'Music player', body: 'Play, pause, and switch tracks.' },
        { title: 'Quick actions', body: 'Screenshots, File Explorer, and Calculator.' },
        { title: 'Make it yours', body: 'Graphite or glass, with adjustable opacity and accent glow.' },
      ],
    },
    ecosystem: {
      title: 'EyeBar on your devices.',
      platforms: [
        { name: 'EyeBar for Windows', status: 'Available', body: 'The mini-bar, characters, and StandBy for Windows 10 and 11.' },
        { name: 'EyeBar Android', status: 'Beta', body: 'A companion for monitoring and controlling your PC over your local network.' },
        { name: 'iEyeBar for iOS/iPadOS', status: 'In development', body: 'A future version of EyeBar for iPhone and iPad.' },
      ],
    },
    roadmap: {
      status: 'Coming soon',
      title: 'EyeBar 2.0',
      body: 'Plans for a future update.',
      items: ['EyeBar Connect', 'Personalization', 'Improved StandBy', 'New widgets', 'Animations', 'Other improvements'],
    },
    downloads: {
      title: 'Try EyeBar.',
      body: 'A free app for Windows 10 and 11.',
      size: '48.3 MB',
      notes: 'Release page',
    },
    community: { title: 'The EyeBar community.', body: 'Follow updates and share your ideas.' },
    footer: 'Official EyeBar website',
  },
} as const;

export type Locale = keyof typeof content;
export type Copy = (typeof content)[Locale];

export const localePaths = { ru: '', en: 'en/' } as const;

export function getLocale(pathname: string): Locale {
  const relativePath = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.slice(1);
  return relativePath === 'en' || relativePath.startsWith('en/') ? 'en' : 'ru';
}
