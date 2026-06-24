---
# Slug совпадает с русской версией: camera-platform.md
title: "Industrial Camera Control Platform"
description: "Extensible data-acquisition platform for cameras: a unified interface across different SDKs and synchronized capture from multiple cameras"
category: "work"
stack: ["Python", "PySide6", "multiprocessing", "OpenCV", "FastAPI", "UDP"]
year: 2025
status: "active"
featured: true
order: 0
---

## The task

We needed a foundation for working with industrial cameras that different measurement
applications could be built on. The key requirements: support for cameras from different
vendors, synchronized frame capture from several cameras at once, and control through a GUI,
CLI, or external API - so the program could run both as a desktop application and headless
on a server.

## My role

I designed the platform's architecture and implemented it as a data-acquisition application.
The structural decisions - splitting it into a core, interfaces, and a proxy layer, and
choosing processes for synchronized capture - were mine. In parallel, the team worked on the
computational solver that consumes the platform's data.

It started as a standalone camera-control program. Over time it became the foundation for the
other projects - vibration analysis and angle measurement.

## Architectural decisions

**A proxy layer behind a single `ICam` interface.**
To add a camera from a new vendor, you only implement the `ICam` interface methods - the core
stays untouched. Right now this mechanism integrates webcams (the standard OpenCV driver) and
Daheng industrial cameras (their shared vendor SDK). A new SDK plugs in the same way.

**Processes instead of threads for capture.**
One of the requirements was synchronized shots from several cameras with minimal latency.
Threads didn't fit here: because of the GIL they don't give true parallelism, and the latency
came out too high. A time-based scheduler wasn't fast enough either - frames had to be captured
as quickly as possible. The solution was a separate process per camera, which removes GIL
contention and gives real parallelism.

**Separating the core from the interfaces.**
The core (Command Controller + camera management) doesn't depend on the access method. The GUI
and External API run on top of it - which is what lets the platform run as a desktop application
or headless on a server.

## Architecture

<img src="/diagrams-en/camera-platform-architecture.en.svg" alt="Platform architecture: core, interfaces, proxy layer for camera SDKs, and child processes" style="width:100%;max-width:900px;display:block;margin:1.5rem auto">

## Current state

- Core, GUI, and multi-camera capture - implemented
- External API (REST/WebSocket/gRPC) - demonstration methods implemented (enabling a camera,
  grabbing a frame); intended for headless operation on a server
- CLI - planned
- Integrated: OpenCV cameras, Daheng SDK
