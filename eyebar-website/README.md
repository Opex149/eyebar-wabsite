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

1. Распакуйте ZIP, откройте каталог `eyebar-website` и создайте на GitHub отдельный публичный репозиторий `Opex149/eyebar-website`. Оставьте его пустым при создании.
2. Выполните команды ниже из папки проекта. Они добавят исходники, `package-lock.json` и скрытую папку `.github` с рабочим процессом публикации.

   ```sh
   git init -b main
   git add .
   git commit -m "Add EyeBar website"
   git remote add origin https://github.com/Opex149/eyebar-website.git
   git push -u origin main
   ```

3. В новом репозитории откройте **Settings → Pages → Build and deployment → Source** и выберите **GitHub Actions**.
4. На вкладке **Actions** выберите **Deploy site to GitHub Pages** и запустите его через **Run workflow** для ветки `main`. После успешного запуска GitHub покажет адрес в **Settings → Pages**. Следующие обновления ветки `main` запустят публикацию автоматически.

Адрес для этой конфигурации — `https://opex149.github.io/eyebar-website/`. Для другого владельца, имени репозитория или домена обновите `base` в `vite.config.ts`, `siteUrl` в `src/content.ts` и адрес Sitemap в `public/robots.txt`.

## Как обновить сайт

- Тексты для двух языков, ссылка на EXE и страница релиза находятся в `src/content.ts`. Для новой версии сверьте ссылку и размер файла в [GitHub Releases EyeBar](https://github.com/Opex149/EyeBar/releases).
- Изображения StandBy для русской страницы взяты из `preview/` архива `EyeBar-PC-1.1-Android.zip`. Английские снимки StandBy и снимки мини-бара на двух языках получены из окон оригинального EyeBar 1.1 в Qt. На снимках показано состояние без подключённых погодных и музыкальных данных.
- Classic Blue, Cyber Cat и favicon отрисованы исходными функциями EyeBar 1.1. Изображения персонажей сохранены в исходных пропорциях. Они и скриншоты преобразованы в WebP для сайта. Карточки Open Graph используют рисунок Classic Blue.
- Статус Android-беты указан по предоставленной сборке. Для добавления ссылки на скачивание разместите APK в публичном GitHub Release и проверьте его URL. Планы EyeBar 2.0 хранятся в отдельном блоке `roadmap`.
- Лицензия шрифта Manrope находится в `public/manrope-OFL.txt`. Лицензии React и Lucide находятся в `public/third-party-notices.txt`.
