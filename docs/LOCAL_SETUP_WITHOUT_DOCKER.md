# MedLink Local Setup Without Docker (Windows & Native MySQL 8)

This guide documents the native local configuration of the **MedLink** project on Windows without Docker or Docker Compose. All components (React frontend, NestJS API, Prisma ORM, and MySQL 8) run directly on your host operating system.

---

## 1. Local Architecture Overview

```text
[ Windows Host OS ]
 ├── Frontend Client : React 18 + Vite + TypeScript (port 5173)
 │    └── Communicates via HTTP / REST & WebSockets (Socket.io)
 │
 ├── Backend API     : NestJS 11 + TypeScript (port 4000)
 │    └── REST API Prefix : /api/v1
 │    └── Swagger Docs   : /api/docs
 │    └── Realtime Chat  : WebSocket Gateway
 │
 ├── Shared Library  : @medlink/shared (packages/shared)
 │    └── Enums, shared DTOs, and Zod schemas
 │
 ├── Data Layer      : Prisma ORM (v6.19.3)
 │    └── Client generated directly to node_modules
 │    └── Database driver: mysql
 │
 └── Database        : Native Windows Service (MySQL80 on port 3306)
      └── No Docker containers or virtualization
```

---

## 2. Windows MySQL 8 Configuration

### 2.1 Current Local Environment Status

Inspection of your Windows environment revealed:
- **MySQL Server 8.0**: Installed at `C:\Program Files\MySQL\MySQL Server 8.0\bin\` (`mysql.exe`, `mysqld.exe`, `mysqladmin.exe` v8.0.44).
- **Windows Service**: Registered as `MySQL80`.
- **Status**: Currently `Stopped` (Startup type: `Manual`).

### 2.2 Starting the MySQL Windows Service

Because Windows services require administrative privileges to start/stop, execute one of the following:

#### Option A: Administrator PowerShell or Command Prompt (Recommended)
Open PowerShell or Command Prompt as **Administrator** and run:
```powershell
net start MySQL80
```
or
```powershell
Start-Service MySQL80
```

*(Optional)* To configure MySQL to start automatically whenever Windows boots:
```powershell
Set-Service -Name MySQL80 -StartupType Automatic
```

#### Option B: Windows Services Console (GUI)
1. Press `Win + R`, type `services.msc`, and press Enter.
2. Scroll down to find **MySQL80**.
3. Right-click **MySQL80** and select **Start**.

### 2.3 Verify MySQL is Listening on Port 3306

From any regular PowerShell window, verify the local port:
```powershell
Test-NetConnection -ComputerName 127.0.0.1 -Port 3306
```
Expected output: `TcpTestSucceeded : True`.

### 2.4 Create the Database and Application User

Log in to your local MySQL server using the MySQL command-line client:
```powershell
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
```
*(Enter your MySQL root password when prompted)*

Execute the following SQL statements to initialize the database and create a dedicated user:

```sql
-- 1. Create the database
CREATE DATABASE IF NOT EXISTS medlink
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- 2. Create the application user (replace 'YOUR_PASSWORD' with your password)
CREATE USER IF NOT EXISTS 'medlink_user'@'localhost' IDENTIFIED BY 'YOUR_PASSWORD';

-- 3. Grant privileges to the user on the medlink database
GRANT ALL PRIVILEGES ON medlink.* TO 'medlink_user'@'localhost';

-- 4. Apply changes
FLUSH PRIVILEGES;

-- 5. Exit MySQL shell
EXIT;
```

---

## 3. Environment Variables Configuration

Environment variables are isolated per application. The project provides clean template files (`.env.example`) with placeholders.

### 3.1 Backend Configuration (`apps/api/.env`)

Create or update `apps/api/.env` (which is excluded from Git in `.gitignore`):

```ini
# Server Configuration
NODE_ENV=development
PORT=4000
API_PREFIX=api/v1

# Local MySQL 8 Connection
# Replace USERNAME and PASSWORD with your MySQL credentials.
DATABASE_URL="mysql://medlink_user:YOUR_PASSWORD@localhost:3306/medlink"

# JWT Authentication
JWT_SECRET=medlink_jwt_secret_key_minimum_32_characters_long
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=medlink_jwt_refresh_secret_key_minimum_32_chars
JWT_REFRESH_EXPIRES_IN=30d

# CORS Allowed Origin
CORS_ORIGIN=http://localhost:5173
```

> **Security Rule**: Never commit passwords or credentials to source control. The `.gitignore` file is configured to strictly exclude `.env` files while preserving `.env.example`.

### 3.2 Frontend Configuration (`apps/web/.env`)

If custom configuration is needed for the frontend, create `apps/web/.env`:

```ini
# Points to the local NestJS backend
VITE_API_BASE_URL=http://localhost:4000/api/v1

# Realtime WebSocket server
VITE_WS_URL=http://localhost:4000

# App Branding
VITE_APP_TITLE=MedLink
```

---

## 4. Prisma ORM Workflow (Without Docker)

The schema is defined in [apps/api/prisma/schema.prisma](file:///d:/MedLink_Project/apps/api/prisma/schema.prisma) with `provider = "mysql"`.

### 4.1 Root Convenience Scripts

The monorepo root [package.json](file:///d:/MedLink_Project/package.json) contains direct helper scripts for Prisma:

| Action | Root Command | Workspace Command |
|---|---|---|
| **Generate Prisma Client** | `pnpm db:generate` | `pnpm --filter @medlink/api prisma:generate` |
| **Run Migrations (Dev)** | `pnpm db:migrate` | `pnpm --filter @medlink/api prisma:migrate` |
| **Deploy Migrations (Safe)** | `pnpm db:deploy` | `pnpm --filter @medlink/api prisma:deploy` |
| **Seed Database** | `pnpm db:seed` | `pnpm --filter @medlink/api prisma:seed` |

### 4.2 Safe Migration Guidelines
- **Development**: Use `pnpm db:migrate` (`prisma migrate dev`). It generates new migration SQL files and applies them to your local MySQL database.
- **Applying Existing Migrations Safely**: Use `pnpm db:deploy` (`prisma migrate deploy`). It applies pending migrations without prompting or resetting data.
- **NEVER RUN**: `prisma migrate reset` or `prisma db push --force-reset` on databases containing data you wish to preserve.

---

## 5. Day-to-Day Development Workflow

To develop with hot reloading, open **two separate terminal windows**:

### Terminal 1: React Frontend (Web)
```powershell
cd D:\MedLink_Project
pnpm dev:web
```
- Available at: `http://localhost:5173`
- Network URL: Displayed in the terminal for LAN testing.

### Terminal 2: NestJS Backend (API)
```powershell
cd D:\MedLink_Project
pnpm dev:api
```
- API Base: `http://localhost:4000/api/v1`
- Swagger Documentation: `http://localhost:4000/api/docs`
- Health check / route mapping logs will display upon startup.

---

## 6. Build and Test Commands

```powershell
# Build all workspaces (@medlink/shared, @medlink/api, @medlink/web)
pnpm build

# Run TypeScript typechecks across the monorepo
pnpm typecheck

# Run test suites
pnpm test
```

---

## 7. Verification Results (Conducted on Host)

During this configuration session, the following checks were performed directly on this Windows machine:

| Component / Step | Status | Evidence / Notes |
|---|---|---|
| **pnpm Workspaces** | **PASS** | `pnpm -r ls` resolved `@medlink/api`, `@medlink/web`, and `@medlink/shared`. |
| **Shared Package Build** | **PASS** | `pnpm --filter @medlink/shared build` built ESM and CJS bundles cleanly via `tsup`. |
| **Prisma Client Generation** | **PASS** | `pnpm db:generate` generated Prisma Client v6.19.3. |
| **Frontend Production Build** | **PASS** | `pnpm --filter @medlink/web build` built in 15.20s without errors. |
| **Backend NestJS Build** | **PASS** | `nest build` completed with exit code 0 (`dist/` generated). |
| **Backend Unit Tests** | **PASS** | `pnpm --filter @medlink/api test` passed (Jest 1 passed). |
| **Backend Startup (No Docker)** | **PASS** | `node apps/api/dist/main.js` started Nest application successfully, mapped all 28 API routes, and bound Swagger UI to port 4000. |
| **Docker Compose Dependency** | **REMOVED** | Removed Docker warnings in `PrismaService`. `docker-compose.yml` is retained but optional. |
| **Local MySQL 8 Service** | **IDENTIFIED** | Service `MySQL80` found stopped. Requires Administrator privileges (`net start MySQL80`) to start. |

---

## 8. Remaining Next Steps for You

To complete connecting to your local MySQL database:

1. **Start the MySQL Service**:
   Open an Administrator Command Prompt or PowerShell:
   ```powershell
   net start MySQL80
   ```
2. **Set Up the Database**:
   Log in to MySQL (`mysql -u root -p`) and create the `medlink` database and user as shown in [Section 2.4](#24-create-the-database-and-application-user).
3. **Verify `apps/api/.env`**:
   Ensure `DATABASE_URL` matches your local MySQL username and password.
4. **Run Initial Migrations & Seed**:
   ```powershell
   pnpm db:migrate
   pnpm db:seed
   ```
5. **Start Frontend & Backend**:
   Run `pnpm dev:web` and `pnpm dev:api` in separate terminals.
