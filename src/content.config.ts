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

const projects = defineCollection({
  // loader говорит Astro где искать файлы коллекции
  loader: glob({
    pattern: '**/*.md',          // все .md файлы
    base: './src/content/projects' // в этой папке
  }),
  schema: z.object({
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
  }),
});

// Экспортируем все коллекции (у нас пока одна)
export const collections = { projects };
