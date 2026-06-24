---
# Английская версия проекта. Slug совпадает с src/content/projects/deformation-measurement.md
title: "Deformation Measurement System (Stereo-DIC)"
description: "Measuring an object's deformation fields from a stereo image pair. C++ computer-vision libraries, camera calibration, GPU visualization"
category: "work"
stack: ["C++", "OpenCV", "Eigen", "Boost", "Python", "OpenCL", "Matplotlib"]
year: 2024
status: "completed"
featured: true
order: 2
---

## The Task

Measure an object's deformation under load contactlessly - from images captured by a stereo
pair of cameras (an approach close to commercial DIC systems such as VIC-3D). The object's
surface is prepared specifically for this: a layer of white paint or primer is applied, and
over it a random speckle pattern (high-contrast dots sprayed on from a can of black paint or
flicked on as ink spatter from a toothbrush). The test runs through several loading stages,
and from this pattern we compute how much each point on the surface has displaced and
deformed between stages.

## My Role

This was the first, prototype implementation. On it we worked out the approach and learned
things the hard way, and from those lessons the next version grew - a camera-management
platform. I was responsible for the data-acquisition system and the C++ computer-vision
libraries; the team worked in parallel on the deformation-solver compute engine.

## What I Did

### Data-acquisition system

- Implemented connection and synchronized frame capture from multiple cameras (Daheng and USB cameras)
- Implemented camera parameter configuration: exposure, frame size, gamma, bit depth, and more
- Extracted the camera-handling logic into a separate layer (a precursor to the future
  platform core - here the abstraction wasn't yet fully refined, which became one of the
  lessons for the next version)

### C++ computer-vision libraries

Written in C++ with OpenCV, Eigen, and Boost (Boost for building the Python bindings).

- A library for recognizing the target pattern in an image
- Segmentation of the useful part of the target and handling of ArUco markers
- A camera-calibration library
- A function to convert pixel coordinates to real-world coordinates using the cameras' positions and parameters
- **Point-matching algorithm between frames:** for each reference point, angles relative to
  the edge were computed, then the points were sorted and matched to points in the next
  frame - this made it possible to track the same points across different loading stages

### Visualization

- **Charts (Matplotlib):** moved plotting to a separate thread so the UI wouldn't freeze with
  large numbers of points; added a median line over the chart data
- **Deformation fields (OpenCL):** started getting into GPU rendering - 25 MP frames
  (5120×5120) across several loading stages made CPU rendering too slow. I didn't manage to
  finish this; colleagues completed it

## Results and Lessons

The prototype proved the approach worked and exposed its weak spots - first and foremost the
underdeveloped camera-management abstraction. These conclusions formed the basis of the next
version, designed from the ground up as an extensible platform.