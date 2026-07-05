---
# Английская версия проекта. Slug совпадает с src/content/projects/crm-family-business.md
title: "CRM for family business"
description: "Web application for clients, orders and finances. Django + PostgreSQL, deployed with a self-hosted CI/CD"
category: "personal"
stack: ["Django", "PostgreSQL", "Docker", "docker-compose", "nginx", "GitLab CI/CD"]
year: 2026
status: "in-progress"
featured: true
order: 2
---

## The Problem

Until recently, customer and financial records were either not kept at all or jotted down in a notebook. Since the business is custom furniture design and assembly, beyond clients and finances there's also a need to store photos and drawings for each order. What was needed was a simple tool that keeps all of this in one place and is accessible from anywhere.

## What I Did

- Designed and built the backend in Django with PostgreSQL
- Set up a production environment on a rented VPS: nginx, HTTPS via Let's Encrypt
- Configured a CI/CD pipeline through my home GitLab Runner: push to master → automatic build and deploy
- Registered and connected a custom domain

## In Progress

- Finance functionality
- Task-tracking system
- Charts
- Report-generation system
- Drawing storage system

Right now I'm refining the functionality based on feedback from the first real user.
This is a different experience compared to my work projects: direct contact with the client, vague requirements, tasks I have to define myself - and on top of that, anticipating what the user will actually need.

