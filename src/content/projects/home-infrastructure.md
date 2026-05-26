---
title: "Домашняя инфраструктура и self-hosted CI/CD"
description: "GitLab CE на мини-ПК, проброс через WireGuard, автоматический деплой проектов на боевые серверы"
category: "personal"
stack: ["Arch Linux", "Docker", "GitLab CE", "WireGuard", "PostgreSQL", "nginx"]
status: "active"
featured: true
order: 3
---

## Что это

Собственная инфраструктура для разработки и эксплуатации моих личных проектов.
Цель — пройти полный цикл от коммита до прода своими руками, без облачных абстракций.

## Что развёрнуто

- **Мини-ПК на Arch Linux** — основной dev-узел: GitLab CE в Docker, GitLab Runner, PostgreSQL, dnsmasq для локального DNS
- **VPS №1** — WireGuard hub для доступа к домашнему GitLab извне; Telegram-бот учёта рабочего времени
- **VPS №2** — production CRM (Django + PostgreSQL + nginx + HTTPS)

## Как устроен деплой

```
Push в GitLab (мини-ПК)
        │
        ▼
GitLab Runner собирает Docker-образ
        │
        ▼
Образ пушится в registry
        │
        ▼
Runner подключается к боевому VPS по SSH
        │
        ▼
docker compose pull && docker compose up -d
        │
        ▼
Готово, новая версия в проде
```

## Что это даёт

Понимание всей цепочки: сеть, DNS, контейнеризация, оркестрация, CI/CD, обновление сертификатов,
бэкапы БД. Когда что-то ломается — некуда отступать, чинить надо самому. Это лучшая школа.
