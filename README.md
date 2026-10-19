# MedLink — Healthcare Appointment Booking Platform

MedLink is an enterprise healthcare appointment and telemedicine platform supporting three distinct portals:
- 🧑‍🦱 **Patient Portal**: Doctor discovery, booking appointments, medical records, digital prescriptions, consultation chat.
- 🩺 **Doctor Portal**: Daily schedule queue, consultation notes, issuing prescriptions, patient history, and real-time chat.
- 🛡️ **Admin Portal**: System analytics, physician credential verification, patient management, and platform financial audit.

---

## 🏗️ Architecture & Monorepo Structure

```text
MedLink/
├── apps/
│   ├── web/                         # React + Vite + TypeScript (Tailwind CSS, TanStack Query, Zustand)
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── components/          # Reusable UI & Layout components
│   │   │   ├── features/            # Feature-specific logic
│   │   │   ├── routes/              # Public, Auth, Patient, Doctor, Admin routes
│   │   │   ├── hooks/               # useAuth and custom hooks
│   │   │   ├── layouts/             # Root, Patient, Doctor, Admin layouts
│   │   │   ├── lib/                 # Axios client, i18n, Socket.io
│   │   │   ├── stores/              # Zustand state stores
│   │   │   ├── styles/              # Tailwind CSS styles
│   │   │   ├── types/               # Type re-exports & UI types
│   │   │   ├── App.tsx              # Router setup
│   │   │   └── main.tsx             # React entrypoint
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   └── api/                         # NestJS backend (Prisma ORM, MySQL 8, JWT, WebSockets, Cron)
│       ├── prisma/
│       │   ├── schema.prisma        # Database schema
│       │   ├── migrations/          # Prisma migrations directory
│       │   └── seed.ts              # Database seed script
│       ├── src/
│       │   ├── config/              # App configuration
│       │   ├── common/              # Decorators, Guards, Filters, Interceptors, Pipes
│       │   ├── prisma/              # PrismaService & PrismaModule
│       │   ├── modules/             # Auth, Users, Patients, Doctors, Catalog,
│       │   │                        # Appointments, Payments, Prescriptions,
│       │   │                        # Chat, Notifications, Reviews, Reports, Admin
│       │   ├── app.module.ts        # Root NestJS module
│       │   └── main.ts              # NestJS bootstrap, Swagger & CORS
│       ├── test/                    # End-to-end tests
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── shared/                      # Shared types, Enums, Zod validation schemas
│       ├── src/
│       │   ├── enums.ts             # UserRole, AppointmentStatus, PaymentStatus, etc.
│       │   ├── types.ts             # User, DoctorProfile, Appointment, ApiResponse, etc.
│       │   ├── schemas/             # Zod validation schemas for auth & appointments
│       │   └── index.ts             # Barrel export
│       ├── package.json
│       └── tsconfig.json
│
├── docs/                            # Project documentation
│   └── README.md
├── docker-compose.yml               # MySQL 8 container configuration
├── pnpm-workspace.yaml              # pnpm workspace definition
├── package.json                     # Monorepo scripts
├── .gitignore                       # Git ignore rules
└── .env.example                     # Environment variables template
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (Node 25 supported)
- **pnpm**: v9+ (Installed globally: `npm install -g pnpm`)
- **Docker** (optional, for MySQL 8)

### 2. Install Dependencies
From the repository root:
```powershell
pnpm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env` in the root and in `apps/api`:
```powershell
cp .env.example apps/api/.env
```

### 4. Database Setup (MySQL 8)
Start the MySQL container via Docker:
```powershell
docker-compose up -d
```

Generate Prisma client & run migrations:
```powershell
pnpm --filter @medlink/api prisma:generate
pnpm --filter @medlink/api prisma:migrate
pnpm --filter @medlink/api prisma:seed
```

### 5. Running the Applications

#### Run Frontend & Backend Together
```powershell
pnpm dev
```

#### Run Frontend Only (Port 5173)
```powershell
pnpm dev:web
```

#### Run Backend Only (Port 4000)
```powershell
pnpm dev:api
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:4000/api/v1](http://localhost:4000/api/v1)
- **Interactive Swagger Documentation**: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

---

## 🛠️ Root Scripts Reference

| Command | Description |
| :--- | :--- |
| `pnpm dev:web` | Starts the React + Vite frontend development server |
| `pnpm dev:api` | Starts the NestJS API in watch mode |
| `pnpm build` | Compiles `@medlink/shared`, `@medlink/web`, and `@medlink/api` |
| `pnpm lint` | Runs linter across all workspaces |
| `pnpm test` | Runs automated test suites across all workspaces |
| `pnpm typecheck` | Type-checks all TypeScript workspaces |
