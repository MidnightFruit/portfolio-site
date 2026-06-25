---
# Английская версия проекта. Slug совпадает с src/content/projects/tg-worktime-bot.md
title: "Work-Time Tracking Telegram Bot"
description: "Clock in/out with buttons, writes to Google Sheets, monthly reports as an image. A personal tool I use daily "
category: "personal"
stack: ["Python", "python-telegram-bot", "gspread", "Google Sheets API", "Matplotlib"]
year: 2026
status: "active"
featured: false
order: 4
---

## Why

Pay at work is calculated by the hours spent on site. I needed a quick way to clock in and out
and see my estimated earnings for the month - without counting by hand. I built the bot for
myself and use it every day.

## What it does

- Clock in and out - via menu buttons or commands (`/in`, `/out`), with the option to enter a specific time manually
- Writes to a personal Google Sheets tracker through a service account
- Monthly report - delivered as an image, with a choice of month from the last 12

## A design decision I'm happy with

The bot writes only two things to the sheet - the clock-in and clock-out times. Everything else
(hours per day, earnings, monthly totals) is computed by formulas in the Google Sheet itself.
This is a deliberate separation: the bot handles data entry, the sheet handles the calculations.
The counting logic can be changed right in the sheet, without touching the bot's code. 

## Technical details

- `python-telegram-bot` for the interface
- `gspread` + a Google service account for working with the sheet
- `matplotlib` for generating the report image
- Deployed on a VPS, running continuously
- Access restricted to a single user (checked by Telegram user id)

## What it shows

A small but complete and genuinely working tool: an external API (Google Sheets), image
generation, careful handling of secrets (`.env`, a service account, nothing extra in the
repository), and deployment to an always-on server.
