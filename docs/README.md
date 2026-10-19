# MedLink Documentation

Welcome to the MedLink documentation hub.

## Architecture Overview

MedLink is a doctor appointment booking platform featuring three role-based portals:
1. **Patient Portal**: Search doctors, schedule appointments, view medical records & prescriptions, make payments, and chat.
2. **Doctor Portal**: Manage schedule/availability, view upcoming appointments, write digital prescriptions, patient history, and conduct chats.
3. **Admin Portal**: System analytics, doctor verification/management, patient records, payment logs, and platform configurations.

## Monorepo Layout

- `apps/web`: React + Vite + TypeScript application containing the public portal and role-based routes (`patient`, `doctor`, `admin`).
- `apps/api`: NestJS + TypeScript REST API and WebSocket gateway with Prisma ORM (MySQL 8).
- `packages/shared`: Shared TypeScript types, enums (e.g. `UserRole`, `AppointmentStatus`), and validation schemas used across both apps.

## Key Links & Setup

- [Local Windows Setup Without Docker](./LOCAL_SETUP_WITHOUT_DOCKER.md)
- [Project Root README](../README.md)

