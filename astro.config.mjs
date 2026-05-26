// @ts-check
import { defineConfig } from 'astro/config';

// Это главный конфиг Astro. Тут можно задавать:
// - site: финальный URL сайта (нужно для генерации правильных ссылок и sitemap)
// - output: 'static' (по умолчанию) или 'server'. Мы делаем статику.
// - integrations: дополнительные плагины (например, для генерации sitemap)
//
// Пока конфиг минимальный. Когда у тебя будет реальный домен — пропиши его в site.

export default defineConfig({
  site: 'https://example.com', // ЗАМЕНИ на свой реальный домен когда будешь деплоить
  output: 'static',
});
