# Portfolio Site

Сайт-резюме Дмитрия Гладких на Astro. Статический сайт, собирается через npm, разворачивается на nginx через self-hosted GitLab CI/CD.

## Стек

- **Astro 6** — генератор статических сайтов
- **Обычный CSS** (без Tailwind/SCSS) — стили прямо в .astro-файлах через `<style>`
- **Markdown + Content Collections** — контент проектов как файлы в `src/content/projects/` (RU) и `src/content/projects-en/` (EN)
- **TypeScript** — для типов в Content Collections
- **Node.js 18+** — нужен только для сборки, на проде не требуется

## Структура

```
src/
├── content.config.ts          # Схема валидации проектов (Zod)
├── content/
│   ├── projects/*.md          # Контент проектов (RU) в markdown с frontmatter
│   └── projects-en/*.md       # Контент проектов (EN), slug совпадает с RU
├── layouts/
│   └── BaseLayout.astro       # Общий каркас (header/footer/<head>, i18n-редирект)
├── components/
│   └── ProjectCard.astro      # Переиспользуемая карточка проекта
└── pages/                     # Файловый роутинг → URL
    ├── index.astro            # /
    ├── about.astro            # /about/
    ├── projects/
    │   ├── index.astro        # /projects/
    │   └── [slug].astro       # /projects/<slug>/ — динамическая
    └── en/                    # Английская версия (заглушки): /en/, /en/about/, /en/projects/...

public/                        # Статика, копируется как есть
└── favicon.svg
```

## Команды

```bash
npm install         # установить зависимости
npm run dev         # dev-сервер на http://localhost:4321 (live reload)
npm run build       # собрать прод-версию в dist/
npm run preview     # предпросмотр собранного билда
```

## Как добавить новый проект

Создай файл `src/content/projects/<slug>.md`:

```markdown
---
title: "Название"
description: "Короткое описание для карточки"
category: "work" | "personal"
stack: ["Python", "Django"]
year: 2025                    # опционально
status: "active" | "completed" | "in-progress"   # опционально
featured: true                # показывать ли на главной (опционально)
order: 4                      # порядок сортировки, меньше = выше (опционально)
github: "https://..."         # ссылка на GitHub (опционально)
live: "https://..."           # ссылка на работающий сайт (опционально)
---

## Задача
...

## Что сделал
...
```

После `npm run build` страница появится автоматически по адресу `/projects/<slug>/`.

Для английской версии создай файл с **тем же slug** в `src/content/projects-en/<slug>.md`
(структурные поля `category`/`stack`/`year`/`status`/`featured`/`order` — те же, переводятся только
`title`, `description` и тело). Страница появится по адресу `/en/projects/<slug>/`.

## Деплой

(в работе)

Планируется: push в GitLab → GitLab Runner на мини-ПК делает `npm run build` → `rsync dist/ user@vps:/var/www/site/` → nginx раздаёт.
