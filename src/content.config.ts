// src/content.config.ts
//
// ЧТО ЭТО ЗА ФАЙЛ:
// Здесь мы описываем "коллекции" — наборы markdown-файлов одного типа.
// У нас будет одна коллекция: projects (карточки проектов).
//
// Для каждой коллекции мы задаём СХЕМУ — какие поля обязательны, какие нет.
// Если в .md файле забыть обязательное поле — Astro упадёт со сборкой и скажет где.
// Это защита от опечаток и забытых полей.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// z — это Zod, библиотека валидации схем. Astro её использует под капотом.
// z.string() = "это поле должно быть строкой"
// z.string().optional() = "поле необязательное"
// z.array(z.string()) = "массив строк"

// Схема одна на оба языка — поля проекта одинаковые, отличается только язык
// текстов (title/description + сам markdown). Выносим её, чтобы не дублировать.
const projectSchema = z.object({
  // Обязательные поля каждого проекта:
  title: z.string(),
  description: z.string(),     // короткое описание для карточки
  category: z.enum(['work', 'personal']), // рабочий или личный проект
  stack: z.array(z.string()),  // список технологий

  // Опциональные поля:
  year: z.number().optional(),
  status: z.enum(['active', 'completed', 'in-progress']).optional(),
  github: z.string().url().optional(),     // ссылка на GitHub (если есть)
  live: z.string().url().optional(),       // ссылка на работающий сайт (если есть)
  featured: z.boolean().optional().default(false), // показывать на главной?
  order: z.number().optional().default(99), // порядок сортировки (меньше = выше)
});

// Русские проекты — src/content/projects/*.md
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: projectSchema,
});

// Английские проекты — src/content/projects-en/*.md
// Важно: slug (имя файла) должен совпадать с русской версией, тогда страницы
// /projects/<slug>/ и /en/projects/<slug>/ ссылаются на один и тот же проект.
const projectsEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects-en' }),
  schema: projectSchema,
});

// Экспортируем все коллекции. Ключ 'projects-en' и используется в getCollection().
export const collections = { projects, 'projects-en': projectsEn };
