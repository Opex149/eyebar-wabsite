# EyeBar Website

Официальный сайт EyeBar для Windows на React, Vite и TypeScript. Русская версия открывается по адресу `/eyebar-website/`, английская — по `/eyebar-website/en/`. Сборка создаёт HTML для каждого языка, поэтому обе страницы открываются напрямую на GitHub Pages и доступны поисковым роботам. Шрифты и изображения хранятся в проекте. Сайт обходится без серверной части, cookies и аналитики.

## Локальный запуск

Понадобится Node.js 22.12 или новее. В GitHub Actions используется Node.js 24.

```sh
npm ci
npm run dev
```

Откройте `http://localhost:5173/eyebar-website/` или URL с портом, который выведет Vite.

```sh
npm run build
npm run preview
```

Готовые файлы находятся в `dist/`. Для проверки сборки используйте адрес, который выведет `npm run preview`, обычно `http://localhost:4173/eyebar-website/`.

## Публикация на GitHub Pages

Этот репозиторий должен называться `Opex149/eyebar-website`. Проект расположен во вложенной папке `eyebar-website`, а workflow `.github/workflows/deploy.yml` — в корне репозитория.

1. В репозитории откройте **Settings → Pages → Build and deployment → Source** и выберите **GitHub Actions**.
2. Отправьте изменения в ветку `main`. Если нужен ручной запуск, откройте **Actions → Deploy EyeBar to GitHub Pages → Run workflow** и выберите `main`.
3. Проверьте результат на вкладке **Actions**. Workflow выполняет `npm ci` и `npm run build` во вложенной папке и публикует `eyebar-website/dist`.

Адрес сайта — `https://opex149.github.io/eyebar-website/`. Для другого владельца, имени репозитория или домена обновите `base` в `vite.config.ts`, `siteUrl` в `src/content.ts` и адрес Sitemap в `public/robots.txt`.

## Как обновить сайт

- Тексты для двух языков, ссылка на EXE и страница релиза находятся в `src/content.ts`. Для новой версии сверьте ссылку и размер файла в [GitHub Releases EyeBar](https://github.com/Opex149/EyeBar/releases).
- Изображения StandBy для русской страницы взяты из `preview/` архива `EyeBar-PC-1.1-Android.zip`. Английские снимки StandBy и снимки мини-бара на двух языках получены из окон оригинального EyeBar 1.1 в Qt. На снимках показано состояние без подключённых погодных и музыкальных данных.
- Classic Blue, Cyber Cat и favicon отрисованы исходными функциями EyeBar 1.1. Изображения персонажей сохранены в исходных пропорциях. Они и скриншоты преобразованы в WebP для сайта. Карточки Open Graph используют рисунок Classic Blue.
- Статус Android-беты указан по предоставленной сборке. Для добавления ссылки на скачивание разместите APK в публичном GitHub Release и проверьте его URL. Планы EyeBar 2.0 хранятся в отдельном блоке `roadmap`.
- Лицензия шрифта Manrope находится в `public/manrope-OFL.txt`. Лицензии React и Lucide находятся в `public/third-party-notices.txt`.
