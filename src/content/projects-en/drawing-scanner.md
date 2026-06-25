---
# Slug совпадает с русской версией: drawing-scanner.md
title: "Drawing Digitization Scanner"
description: "Digitizing large-format drawings (up to A0) with a camera and frame stitching. OpenCV, SQLite, SQLAlchemy"
category: "work"
stack: ["Python", "OpenCV", "SQLite", "SQLAlchemy"]
year: 2025
status: "completed"
featured: false
order: 3
---

## The task

Digitize an archive of old drawings in formats up to A0. The challenge wasn't the size itself,
but the condition of the documents: the drawings were very old and fragile and could fall apart
in your hands - ordinary sheet-fed scanners didn't work for them, since the sheet can't be moved.
Hanging a drawing on a wall or laying it out on a large enough table wasn't an option either.

The solution was to shoot the drawing from above in sections with a camera and stitch the frames
into a single image, without moving the document itself.

## What I did

Entirely my own project, from image capture to storing the result.

- Implemented frame capture from a Daheng camera (MER2-502-79U3M with a VT4Z1450MXJ lens)
- Integrated the OpenCV stitching module to merge several frames into one complete image of
  the drawing - most drawings didn't fit in a single frame
- Set up local storage for the digitized drawings: SQLite + SQLAlchemy (ORM)

## Context

One of the applied systems built on the camera control platform. A small project in scope, but
complete: from camera work and computer vision to designing the data storage.