---
title: "Home infrastructure and self-hosted CI/CD"
description: "GitLab CE on mini-PC port forwarding via Tailscale, auto deploy to production servers"
category: "personal"
stack: ["Arch Linux", "Docker", "GitLab CE", "Tailscale", "PostgreSQL", "nginx"]
status: "active"
featured: true
order: 3
---

## What is it

My own infrastructure for developing and running my personal projects. The goal: to go
through the full cycle from commit to production by hand, without cloud abstractions.

## What's running

- **Mini-PC on Arch Linux** - the main dev node: GitLab CE in Docker, GitLab Runner, PostgreSQL, dnsmasq for local DNS
- **VPS #1** - a private-network coordinator for reaching the home GitLab from outside; a work-time-tracking Telegram bot
- **VPS #2** - production CRM (Django + PostgreSQL + nginx + HTTPS)

I first set the private network up on WireGuard, then migrated to Tailscale with my own
coordinator (headscale) - for automatic key management and easy addition of new nodes.

## How deployment works

For the CRM, the runner tagged `production` runs directly on the production VPS, so deployment
happens locally - no registry, no SSH:

```
Push to GitLab (mini-PC)
        │
        ▼
Runner tagged production (on the production VPS)
        │
        ▼
docker compose up -d --build   (image is built in place)
        │
        ▼
migrate + collectstatic
        │
        ▼
restart nginx → the new version is live
```

## What it gives me

A grasp of the whole chain: networking, DNS, containerization, orchestration, CI/CD,
certificate renewal, database backups. When something breaks, there's nowhere to fall back to -
I have to fix it myself. That's the best way to learn.