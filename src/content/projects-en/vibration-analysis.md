---
# Английская версия проекта. Slug совпадает с src/content/projects/vibration-analysis.md
title: "Vibration Analysis System"
description: "Contactless measurement of oscillation amplitude and frequency from a video stream. Up to 80 measurements/sec per marker"
category: "work"
stack: ["Python", "PySide6", "OpenCV", "AruCo", "multiprocessing", "UDP", "PyQtGraph"]
year: 2026
status: "completed"
featured: true
order: 1
---

## The task

Oscillations of test objects used to be measured with accelerometers - physical sensors that
have to be attached directly to the object. The goal was to build a contactless measurement
method: track markers on the object through a video stream and, in real time, compute the
amplitude and frequency of each marker's oscillation and write them to a CSV file.

## What I did

The project started as a camera application. I added AruCo marker detection and oscillation-
parameter computation to it, and from there it was refined iteratively

- Implemented detection and tracking of AruCo markers, obtaining both pixel and physical coordinates
- Implemented computation of each marker's oscillation amplitude and frequency from the time series of its coordinates
- Reached **80 measurements per second per marker** - in real tests, up to 7 markers on a single object were tracked simultaneously
- Implemented real-time visualization: plots of X/Y coordinates, displacement from the start, frequency, and amplitude for each marker
- Implemented pixel-to-millimeter conversion through a scale factor derived from the marker's known physical dimensions, with unit switching directly in the UI
- Implemented communication with a single-board computer over UDP - it acted as an external trigger and provided frame capture at 80 FPS (the server side on the single-board computer was written by a colleague)

## How it works

<img src="/diagrams-en/vibration-analysis-pipeline.en.svg" alt="Data pipeline: from frame capture to plots and CSV export" style="width:100%;max-width:540px;display:block;margin:1.5rem auto">

## Advantage over accelerometers

The contactless method makes it possible to track several points on the object at once from a
single camera - without mounting a sensor on each point.
