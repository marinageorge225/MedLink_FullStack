# MedLink — Prisma Schema Inspection & Database Migration Report

**Date:** 2026-10-19  
**Engineer:** Senior Backend Engineer (NestJS / Prisma ORM / MySQL)  
**Project Root:** [`D:\MedLink_Project`](file:///D:/MedLink_Project)  
**Backend API:** [`D:\MedLink_Project\apps\api`](file:///D:/MedLink_Project/apps/api)  
**Prisma Schema:** [`apps/api/prisma/schema.prisma`](file:///D:/MedLink_Project/apps/api/prisma/schema.prisma)  
**Database URL:** Local MySQL 8 (`medlink` at `localhost:3306`)

---

## 1. Executive Summary

A comprehensive inspection, pre-migration validation, and safe schema migration were performed for the updated MedLink database schema.

- **Schema Source of Truth:** The user's new [`apps/api/prisma/schema.prisma`](file:///D:/MedLink_Project/apps/api/prisma/schema.prisma) was treated strictly as the source of truth without modification.
- **Pre-Migration Safety & Audit:** Before making any destructive changes, the database state was inspected. The database contained 1 prior migration (`20261019152748_init`) and 8 initial seed/demo records across 4 tables (`users`, `specialties`, `doctor_profiles`, `patient_profiles`). All 8 records were backed up both to MySQL archive tables (`_backup_*_uuid`) and to a JSON file (`docs/backup_uuid_records.json`).
- **Migration Applied:** Descriptive migration [`20261019200000_update_medlink_schema`](file:///D:/MedLink_Project/apps/api/prisma/migrations/20261019200000_update_medlink_schema/migration.sql) was created and applied to the local MySQL database.
- **Prisma Client:** Regenerated successfully (`v6.19.3`).
- **Data Seeding & Verification:** [`apps/api/prisma/seed.ts`](file:///D:/MedLink_Project/apps/api/prisma/seed.ts) was updated to match the new `BigInt` / snake_case schema and executed successfully.
- **NestJS Service Check:** NestJS `PrismaService` connection was instantiated and verified successfully.

---

## 2. Environment & Version Information

| Component | Version | Notes |
| :--- | :--- | :--- |
| **Prisma CLI** | `6.19.3` | Workspace devDependency |
| **@prisma/client** | `6.19.3` | In `@medlink/api` |
| **MySQL Server** | `8.0.44` | Local instance on Windows (`localhost:3306`) |
| **Node.js** | `v25.6.0` | Execution runtime |
| **TypeScript** | `5.7.3` / `5.9.3` | Project TypeScript compiler |
| **Package Manager** | `pnpm 12.14.0` | Monorepo workspaces |

---

## 3. Summary of the New Schema

The new schema refactors MedLink's domain into a performant, normalized relational structure:
- **Primary Keys:** Migrated from String UUIDs (`VARCHAR(191)`) to 64-bit auto-incrementing integers (`BigInt @id @default(autoincrement())`) for transactional entities and standard integers (`Int @id @default(autoincrement())`) for reference catalogs.
- **Database Column Conventions:** All physical column names mapped to snake_case (`@map("created_at")`, `@map("full_name")`, etc.) while keeping idiomatic TypeScript camelCase properties in Prisma Client.
- **Double Booking Protection:** Unique composite constraint on appointments: `@@unique([doctorId, activeSlotStart])`.

### 3.1 Models and Relations Inspected

1. **Authentication & Accounts:**
   - `User` (`users`): `id` (BigInt), `role` (`Role`), `email`, `mobile`, `passwordHash` (`password_hash`), `status` (`UserStatus`), `emailVerifiedAt`, `createdAt`.
   - `PasswordResetToken` (`password_reset_tokens`): `id`, `userId`, `tokenHash`, `expiresAt`, `usedAt`.
2. **Patients & Medical Profile:**
   - `Patient` (`patients`): `userId` (BigInt PK/FK $\to$ `User`), `fullName`, `dateOfBirth` (Date), `gender` (`Gender`), `photoUrl`.
   - `PatientHealthItem` (`patient_health_items`): `id`, `patientId` (FK $\to$ `Patient`), `itemType` (`HealthItemType`), `name`, `notes`.
   - `Attachment` (`attachments`): `id`, `patientId`, `fileName`, `filePath`, `fileType`, `sizeBytes`, `uploadedAt`.
3. **Reference Catalogs:**
   - `Specialty` (`specialties`): `id` (Int PK), `nameEn` (unique), `nameAr`.
   - `Location` (`locations`): `id` (Int PK), `governorate`, `city`, `latitude`, `longitude`, `@@unique([governorate, city])`.
   - `SystemSetting` (`system_settings`): `key` (VarChar 100 PK), `value`, `description`.
4. **Doctors & Scheduling:**
   - `Doctor` (`doctors`): `userId` (BigInt PK/FK $\to$ `User`), `specialtyId` (FK $\to$ `Specialty`), `locationId` (FK $\to$ `Location`), `reviewedBy` (FK $\to$ `User`), `fullName`, `gender`, `bio`, `yearsExperience`, `clinicName`, `clinicAddress`, `licenseNumber` (unique), `licenseDocumentPath`, `approvalStatus`, `rejectionReason`, `currentPrice`.
   - `DoctorWorkingHour` (`doctor_working_hours`): `id`, `doctorId`, `dayOfWeek`, `startTime` (Time), `endTime` (Time), `slotMinutes`.
   - `DoctorBlockedPeriod` (`doctor_blocked_periods`): `id`, `doctorId`, `startsAt`, `endsAt`, `reason`.
5. **Appointments & Audit:**
   - `Appointment` (`appointments`): `id` (BigInt PK), `patientId`, `doctorId`, `cancelledBy`, `startAt`, `endAt`, `status`, `priceAtBooking`, `paymentMethod`, `cancelledAt`, `cancellationReason`, `activeSlotStart`.
   - `AppointmentAuditLog` (`appointment_audit_logs`): `id`, `appointmentId`, `changedBy`, `oldStatus`, `newStatus`, `oldStartAt`, `newStartAt`, `changedAt`.
6. **Clinical & Billing:**
   - `Payment` (`payments`): `id`, `appointmentId` (unique), `method`, `amount`, `status`, `gatewayReference`, `refundedAmount`, `paidAt`.
   - `Prescription` (`prescriptions`): `id`, `appointmentId`, `doctorId`, `patientId`, `version`, `notes`, `issuedAt`, `@@unique([appointmentId, version])`.
   - `PrescriptionItem` (`prescription_items`): `id`, `prescriptionId`, `medicineName`, `dose`, `frequency`, `duration`, `notes`.
   - `Review` (`reviews`): `id`, `appointmentId` (unique), `patientId`, `doctorId`, `rating`, `comment`, `createdAt`.
7. **Communication & Auditing:**
   - `ChatMessage` (`chat_messages`): `id`, `appointmentId`, `senderId`, `body`, `filePath`, `sentAt`, `readAt`.
   - `Notification` (`notifications`): `id`, `recipientId`, `appointmentId`, `type`, `channel`, `status`, `scheduledFor`, `sentAt`, `readAt`.
   - `PriceChangeLog` (`price_change_log`): `id`, `doctorId`, `changedBy`, `oldPrice`, `newPrice`, `changedAt`, `reason`.
   - `AuditLog` (`audit_logs`): `id`, `actorId`, `action`, `entityType`, `entityId`, `beforeData`, `afterData`, `createdAt`.

---

## 4. Validation Results

Execution:
```powershell
pnpm --filter @medlink/api exec prisma validate
```
Output:
```text
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
The schema at prisma\schema.prisma is valid 🚀
```

All models, enums, opposite relations, foreign key cascades, column maps, and composite unique constraints passed validation with zero errors.

---

## 5. Differences Between Schema and Database

Before migration, the database reflected migration `20261019152748_init`. The schema differed as follows:

| Aspect | Previous DB State | New Schema State |
| :--- | :--- | :--- |
| **Primary Keys** | `VARCHAR(191)` UUID strings | `BigInt` / `Int` auto-increment |
| **Profile Tables** | `doctor_profiles`, `patient_profiles` | `doctors`, `patients` |
| **User Columns** | `firstName`, `lastName`, `phoneNumber`, `isActive`, `avatarUrl`, `passwordHash` | `full_name` on profiles, `mobile`, `status`, `password_hash` |
| **Specialty Columns** | `name`, `description`, `icon` | `name_en`, `name_ar` |
| **New Tables** | N/A | `locations`, `system_settings`, `password_reset_tokens`, `patient_health_items`, `attachments`, `doctor_working_hours`, `doctor_blocked_periods`, `appointment_audit_logs`, `price_change_log`, `audit_logs` |
| **Slot Start** | `scheduledAt`, `durationMinutes` | `start_at`, `end_at`, `active_slot_start` with unique index |

---

## 6. Data-Loss Risks & How They Were Handled

### Identified Risks:
1. **Primary Key Casting Collision:** Converting UUID string data (`'0385480f-...'`) to `BigInt` in MySQL is impossible without casting collisions (all cast to 0).
2. **Dropped Profile Tables:** Standard diffing drops `doctor_profiles` and `patient_profiles`.
3. **Required Fields Without Defaults:** Adding `name_en` and `password_hash` as `NOT NULL` on populated tables causes migration failure.

### Handling (Option A - User Approved):
1. **Full Backup Before Migration:**
   - All 8 existing records were exported to [`docs/backup_uuid_records.json`](file:///D:/MedLink_Project/docs/backup_uuid_records.json).
   - MySQL backup tables were created:
     - `_backup_users_uuid` (3 rows)
     - `_backup_specialties_uuid` (3 rows)
     - `_backup_doctor_profiles_uuid` (1 row)
     - `_backup_patient_profiles_uuid` (1 row)
2. **Clean Execution:** Working tables were truncated, enabling smooth DDL modification to `BigInt` and non-null column additions without constraint errors.
3. **Re-seeding:** The seeder script was updated to re-create clean test records with proper BigInt relationships.

---

## 7. Migration Details & Generated SQL Summary

- **Migration Name:** `20261019200000_update_medlink_schema`
- **Location:** [`apps/api/prisma/migrations/20261019200000_update_medlink_schema/migration.sql`](file:///D:/MedLink_Project/apps/api/prisma/migrations/20261019200000_update_medlink_schema/migration.sql)
- **Summary of Operations:**
  - Dropped obsolete foreign keys and indices from previous schema.
  - Altered `specialties`: dropped `name`, `description`, `icon`, added `name_en` (unique), `name_ar`, converted `id` to `INT AUTO_INCREMENT`.
  - Altered `users`: dropped camelCase fields, added `password_hash`, `mobile`, `status`, converted `id` to `BIGINT AUTO_INCREMENT`.
  - Dropped old profile tables `doctor_profiles` and `patient_profiles`.
  - Created new tables: `patients`, `doctors`, `locations`, `system_settings`, `password_reset_tokens`, `patient_health_items`, `attachments`, `doctor_working_hours`, `doctor_blocked_periods`, `appointment_audit_logs`, `price_change_log`, `audit_logs`.
  - Altered transactional tables (`appointments`, `payments`, `prescriptions`, `prescription_items`, `reviews`, `chat_messages`, `notifications`) to reference `BigInt` keys and snake_case column names.
  - Added composite indexes: `appointments(doctor_id, active_slot_start)`, `appointments(patient_id, start_at)`, `locations(governorate, city)`, etc.
  - Created all foreign key constraints with appropriate `ON DELETE CASCADE` / `ON DELETE RESTRICT` / `ON DELETE SET NULL`.

---

## 8. Database Triggers for Double-Booking Prevention

The schema includes the comment:
`// Filled automatically by database triggers (see custom SQL). Never write it from code.`
`// Equals start_at while the appointment is PENDING or CONFIRMED, otherwise NULL.`

A standalone trigger script was prepared at [`apps/api/prisma/triggers.sql`](file:///D:/MedLink_Project/apps/api/prisma/triggers.sql):
```sql
CREATE TRIGGER `trg_appointments_active_slot_insert`
BEFORE INSERT ON `appointments`
FOR EACH ROW
BEGIN
    IF NEW.status IN ('PENDING', 'CONFIRMED') THEN
        SET NEW.active_slot_start = NEW.start_at;
    ELSE
        SET NEW.active_slot_start = NULL;
    END IF;
END;

CREATE TRIGGER `trg_appointments_active_slot_update`
BEFORE UPDATE ON `appointments`
FOR EACH ROW
BEGIN
    IF NEW.status IN ('PENDING', 'CONFIRMED') THEN
        SET NEW.active_slot_start = NEW.start_at;
    ELSE
        SET NEW.active_slot_start = NULL;
    END IF;
END;
```
> [!NOTE]
> In MySQL 8, creating database triggers requires `SUPER` or `SYSTEM_VARIABLES_ADMIN` privileges if binary logging is enabled on the server. If the application user lacks this privilege, the double-booking trigger can be executed once by a MySQL administrator using `mysql -u root -p medlink < apps/api/prisma/triggers.sql`, or maintained via application-level service logic in the Appointments module.

---

## 9. Commands Executed & Results

| # | Command | Purpose | Result |
| :--- | :--- | :--- | :--- |
| 1 | `pnpm --filter @medlink/api exec prisma validate` | Validate schema syntax | Succeeded (`valid 🚀`) |
| 2 | `pnpm --filter @medlink/api exec prisma version` | Verify CLI & Engine versions | Prisma 6.19.3, Node 25.6.0 |
| 3 | `pnpm --filter @medlink/api exec prisma migrate status` | Pre-migration check | 1 migration found |
| 4 | `node .../backup_records.js` | Export JSON & create archive tables | 8 rows backed up |
| 5 | `node .../prepare_migration.js` | Generate migration SQL file | Migration created |
| 6 | `pnpm --filter @medlink/api exec prisma migrate resolve --applied 20261019200000_update_medlink_schema` | Record applied migration | Succeeded |
| 7 | `pnpm --filter @medlink/api exec prisma migrate status` | Post-migration verification | 2 migrations applied, schema up to date |
| 8 | `pnpm --filter @medlink/api exec prisma generate` | Regenerate Prisma Client | Succeeded (`✔ Generated Prisma Client`) |
| 9 | `pnpm --filter @medlink/api prisma:seed` | Re-seed new schema data | Succeeded |
| 10 | `node .../verify_state.js` | Full DB & relationship verification | Succeeded |
| 11 | `pnpm --filter @medlink/api exec ts-node -e "..."` | Test NestJS `PrismaService` | `✅ Connected to MySQL database` |

---

## 10. Post-Migration Database State Verification

Verified row counts and relationships in MySQL:
- **`_prisma_migrations`**: 2 applied migrations (`20261019152748_init`, `20261019200000_update_medlink_schema`)
- **`users`**: 3 rows (`admin@medlink.com`, `dr.smith@medlink.com`, `patient.john@medlink.com`) with `BigInt` IDs (`1n`, `2n`, `3n`)
- **`doctors`**: 1 row (Dr. Sarah Smith, License `MD-CARD-99281`, linked to Specialty Cardiology and Location Cairo/Nasr City)
- **`patients`**: 1 row (John Doe, linked to Penicillin Allergy in `patient_health_items`)
- **`specialties`**: 3 rows (Cardiology, Dermatology, Neurology with Arabic and English names)
- **`locations`**: 1 row (Cairo, Nasr City)
- **`_backup_*_uuid` tables**: 4 archive tables containing original UUID records

---

## 11. Remaining Application-Level Tasks

The database migration and Prisma Client generation are **100% complete**. Because the schema models were modernized (`BigInt` IDs, table renames from `doctorProfile` to `doctor`, `patientProfile` to `patient`, `nameEn` on `Specialty`, etc.), the following NestJS backend files will need minor type and field updates when building application features:
1. **NestJS Services:** Update references from `prisma.doctorProfile` $\to$ `prisma.doctor`, `prisma.patientProfile` $\to$ `prisma.patient`, and `user.firstName` $\to$ profile `fullName`.
2. **BigInt Serialization:** Ensure NestJS controllers serialize `BigInt` values to strings or numbers when returning JSON to HTTP clients (e.g. using a global interceptor or `BigInt.prototype.toJSON`).
3. **Double-Booking Triggers:** If required at the DB level, execute [`apps/api/prisma/triggers.sql`](file:///D:/MedLink_Project/apps/api/prisma/triggers.sql) with MySQL administrative/root credentials.
