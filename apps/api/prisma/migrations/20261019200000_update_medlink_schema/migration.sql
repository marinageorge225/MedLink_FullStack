-- DropForeignKey
ALTER TABLE `appointments` DROP FOREIGN KEY `appointments_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `appointments` DROP FOREIGN KEY `appointments_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `chat_messages` DROP FOREIGN KEY `chat_messages_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `chat_messages` DROP FOREIGN KEY `chat_messages_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `doctor_profiles` DROP FOREIGN KEY `doctor_profiles_specialtyId_fkey`;

-- DropForeignKey
ALTER TABLE `doctor_profiles` DROP FOREIGN KEY `doctor_profiles_userId_fkey`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_userId_fkey`;

-- DropForeignKey
ALTER TABLE `patient_profiles` DROP FOREIGN KEY `patient_profiles_userId_fkey`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_appointmentId_fkey`;

-- DropForeignKey
ALTER TABLE `prescription_items` DROP FOREIGN KEY `prescription_items_prescriptionId_fkey`;

-- DropForeignKey
ALTER TABLE `prescriptions` DROP FOREIGN KEY `prescriptions_appointmentId_fkey`;

-- DropForeignKey
ALTER TABLE `prescriptions` DROP FOREIGN KEY `prescriptions_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `prescriptions` DROP FOREIGN KEY `prescriptions_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_appointmentId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_patientId_fkey`;

-- DropIndex
DROP INDEX `appointments_doctorId_fkey` ON `appointments`;

-- DropIndex
DROP INDEX `appointments_patientId_fkey` ON `appointments`;

-- DropIndex
DROP INDEX `appointments_scheduledAt_idx` ON `appointments`;

-- DropIndex
DROP INDEX `chat_messages_receiverId_fkey` ON `chat_messages`;

-- DropIndex
DROP INDEX `chat_messages_senderId_fkey` ON `chat_messages`;

-- DropIndex
DROP INDEX `notifications_userId_fkey` ON `notifications`;

-- DropIndex
DROP INDEX `payments_appointmentId_key` ON `payments`;

-- DropIndex
DROP INDEX `prescription_items_prescriptionId_fkey` ON `prescription_items`;

-- DropIndex
DROP INDEX `prescriptions_appointmentId_key` ON `prescriptions`;

-- DropIndex
DROP INDEX `prescriptions_doctorId_fkey` ON `prescriptions`;

-- DropIndex
DROP INDEX `prescriptions_patientId_fkey` ON `prescriptions`;

-- DropIndex
DROP INDEX `reviews_appointmentId_key` ON `reviews`;

-- DropIndex
DROP INDEX `reviews_doctorId_fkey` ON `reviews`;

-- DropIndex
DROP INDEX `reviews_patientId_fkey` ON `reviews`;

-- DropIndex
DROP INDEX `specialties_name_key` ON `specialties`;

-- AlterTable
ALTER TABLE `appointments` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `doctorId`,
    DROP COLUMN `durationMinutes`,
    DROP COLUMN `notes`,
    DROP COLUMN `patientId`,
    DROP COLUMN `reason`,
    DROP COLUMN `scheduledAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `active_slot_start` DATETIME(3) NULL,
    ADD COLUMN `cancellation_reason` TEXT NULL,
    ADD COLUMN `cancelled_at` DATETIME(3) NULL,
    ADD COLUMN `cancelled_by` BIGINT NULL,
    ADD COLUMN `doctor_id` BIGINT NOT NULL,
    ADD COLUMN `end_at` DATETIME(3) NOT NULL,
    ADD COLUMN `patient_id` BIGINT NOT NULL,
    ADD COLUMN `payment_method` ENUM('CASH', 'CREDIT_CARD') NOT NULL,
    ADD COLUMN `price_at_booking` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `start_at` DATETIME(3) NOT NULL,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `status` ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW') NOT NULL DEFAULT 'PENDING',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `chat_messages` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `isRead`,
    DROP COLUMN `message`,
    DROP COLUMN `receiverId`,
    DROP COLUMN `senderId`,
    ADD COLUMN `appointment_id` BIGINT NOT NULL,
    ADD COLUMN `body` TEXT NULL,
    ADD COLUMN `file_path` VARCHAR(191) NULL,
    ADD COLUMN `read_at` DATETIME(3) NULL,
    ADD COLUMN `sender_id` BIGINT NOT NULL,
    ADD COLUMN `sent_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `notifications` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `isRead`,
    DROP COLUMN `message`,
    DROP COLUMN `title`,
    DROP COLUMN `userId`,
    ADD COLUMN `appointment_id` BIGINT NULL,
    ADD COLUMN `channel` ENUM('EMAIL', 'IN_APP', 'SMS') NOT NULL,
    ADD COLUMN `read_at` DATETIME(3) NULL,
    ADD COLUMN `recipient_id` BIGINT NOT NULL,
    ADD COLUMN `scheduled_for` DATETIME(3) NULL,
    ADD COLUMN `sent_at` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('PENDING', 'SENT', 'FAILED', 'READ') NOT NULL DEFAULT 'PENDING',
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `type` ENUM('BOOKING_CONFIRMED', 'REMINDER_24H', 'REMINDER_2H', 'DOCTOR_APPROVED', 'DOCTOR_REJECTED', 'NEW_PRESCRIPTION', 'NEW_CHAT_MESSAGE', 'DOCTOR_PENDING_APPROVAL') NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `payments` DROP PRIMARY KEY,
    DROP COLUMN `appointmentId`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `currency`,
    DROP COLUMN `paymentMethod`,
    DROP COLUMN `transactionRef`,
    ADD COLUMN `appointment_id` BIGINT NOT NULL,
    ADD COLUMN `gateway_reference` VARCHAR(191) NULL,
    ADD COLUMN `method` ENUM('CASH', 'CREDIT_CARD') NOT NULL,
    ADD COLUMN `paid_at` DATETIME(3) NULL,
    ADD COLUMN `refunded_amount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `prescription_items` DROP PRIMARY KEY,
    DROP COLUMN `dosage`,
    DROP COLUMN `medicationName`,
    DROP COLUMN `prescriptionId`,
    ADD COLUMN `dose` VARCHAR(191) NULL,
    ADD COLUMN `medicine_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `notes` TEXT NULL,
    ADD COLUMN `prescription_id` BIGINT NOT NULL,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `frequency` VARCHAR(191) NULL,
    MODIFY `duration` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `prescriptions` DROP PRIMARY KEY,
    DROP COLUMN `appointmentId`,
    DROP COLUMN `diagnosis`,
    DROP COLUMN `doctorId`,
    DROP COLUMN `issuedAt`,
    DROP COLUMN `patientId`,
    ADD COLUMN `appointment_id` BIGINT NOT NULL,
    ADD COLUMN `doctor_id` BIGINT NOT NULL,
    ADD COLUMN `issued_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `patient_id` BIGINT NOT NULL,
    ADD COLUMN `version` INTEGER NOT NULL DEFAULT 1,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `reviews` DROP PRIMARY KEY,
    DROP COLUMN `appointmentId`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `doctorId`,
    DROP COLUMN `patientId`,
    ADD COLUMN `appointment_id` BIGINT NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `doctor_id` BIGINT NOT NULL,
    ADD COLUMN `patient_id` BIGINT NOT NULL,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `rating` SMALLINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `specialties` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `description`,
    DROP COLUMN `icon`,
    DROP COLUMN `name`,
    ADD COLUMN `name_ar` VARCHAR(191) NULL,
    ADD COLUMN `name_en` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `avatarUrl`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `firstName`,
    DROP COLUMN `isActive`,
    DROP COLUMN `lastName`,
    DROP COLUMN `passwordHash`,
    DROP COLUMN `phoneNumber`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email_verified_at` DATETIME(3) NULL,
    ADD COLUMN `mobile` VARCHAR(191) NULL,
    ADD COLUMN `password_hash` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `email` VARCHAR(191) NULL,
    ALTER COLUMN `role` DROP DEFAULT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `doctor_profiles`;

-- DropTable
DROP TABLE `patient_profiles`;

-- CreateTable
CREATE TABLE `password_reset_tokens` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `token_hash` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `used_at` DATETIME(3) NULL,

    INDEX `password_reset_tokens_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `user_id` BIGINT NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `date_of_birth` DATE NULL,
    `gender` ENUM('MALE', 'FEMALE') NULL,
    `photo_url` VARCHAR(191) NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_health_items` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `patient_id` BIGINT NOT NULL,
    `item_type` ENUM('ALLERGY', 'CHRONIC_CONDITION', 'PREVIOUS_CONDITION', 'MEDICATION') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `notes` TEXT NULL,

    INDEX `patient_health_items_patient_id_idx`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attachments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `patient_id` BIGINT NOT NULL,
    `file_name` VARCHAR(191) NOT NULL,
    `file_path` VARCHAR(191) NOT NULL,
    `file_type` VARCHAR(191) NOT NULL,
    `size_bytes` INTEGER NOT NULL,
    `uploaded_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `attachments_patient_id_idx`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `governorate` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `latitude` DECIMAL(9, 6) NULL,
    `longitude` DECIMAL(9, 6) NULL,

    UNIQUE INDEX `locations_governorate_city_key`(`governorate`, `city`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_settings` (
    `key` VARCHAR(100) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctors` (
    `user_id` BIGINT NOT NULL,
    `specialty_id` INTEGER NOT NULL,
    `location_id` INTEGER NULL,
    `reviewed_by` BIGINT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NULL,
    `bio` TEXT NULL,
    `years_experience` SMALLINT NULL,
    `clinic_name` VARCHAR(191) NULL,
    `clinic_address` VARCHAR(191) NULL,
    `license_number` VARCHAR(191) NOT NULL,
    `license_document_path` VARCHAR(191) NULL,
    `approval_status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED') NOT NULL DEFAULT 'PENDING',
    `rejection_reason` TEXT NULL,
    `current_price` DECIMAL(10, 2) NOT NULL,

    UNIQUE INDEX `doctors_license_number_key`(`license_number`),
    INDEX `doctors_specialty_id_idx`(`specialty_id`),
    INDEX `doctors_location_id_idx`(`location_id`),
    INDEX `doctors_approval_status_idx`(`approval_status`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor_working_hours` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `doctor_id` BIGINT NOT NULL,
    `day_of_week` SMALLINT NOT NULL,
    `start_time` TIME(0) NOT NULL,
    `end_time` TIME(0) NOT NULL,
    `slot_minutes` SMALLINT NOT NULL,

    INDEX `doctor_working_hours_doctor_id_day_of_week_idx`(`doctor_id`, `day_of_week`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor_blocked_periods` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `doctor_id` BIGINT NOT NULL,
    `starts_at` DATETIME(3) NOT NULL,
    `ends_at` DATETIME(3) NOT NULL,
    `reason` VARCHAR(191) NULL,

    INDEX `doctor_blocked_periods_doctor_id_starts_at_idx`(`doctor_id`, `starts_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointment_audit_logs` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `appointment_id` BIGINT NOT NULL,
    `changed_by` BIGINT NULL,
    `old_status` ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW') NULL,
    `new_status` ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW') NULL,
    `old_start_at` DATETIME(3) NULL,
    `new_start_at` DATETIME(3) NULL,
    `changed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `appointment_audit_logs_appointment_id_idx`(`appointment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `price_change_log` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `doctor_id` BIGINT NOT NULL,
    `changed_by` BIGINT NOT NULL,
    `old_price` DECIMAL(10, 2) NOT NULL,
    `new_price` DECIMAL(10, 2) NOT NULL,
    `changed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reason` TEXT NULL,

    INDEX `price_change_log_doctor_id_changed_at_idx`(`doctor_id`, `changed_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `actor_id` BIGINT NULL,
    `action` VARCHAR(191) NOT NULL,
    `entity_type` VARCHAR(191) NOT NULL,
    `entity_id` BIGINT NULL,
    `before_data` JSON NULL,
    `after_data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_entity_type_entity_id_idx`(`entity_type`, `entity_id`),
    INDEX `audit_logs_actor_id_idx`(`actor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `appointments_patient_id_start_at_idx` ON `appointments`(`patient_id`, `start_at`);

-- CreateIndex
CREATE INDEX `appointments_doctor_id_start_at_idx` ON `appointments`(`doctor_id`, `start_at`);

-- CreateIndex
CREATE INDEX `appointments_status_idx` ON `appointments`(`status`);

-- CreateIndex
CREATE UNIQUE INDEX `appointments_doctor_id_active_slot_start_key` ON `appointments`(`doctor_id`, `active_slot_start`);

-- CreateIndex
CREATE INDEX `chat_messages_appointment_id_sent_at_idx` ON `chat_messages`(`appointment_id`, `sent_at`);

-- CreateIndex
CREATE INDEX `notifications_recipient_id_status_idx` ON `notifications`(`recipient_id`, `status`);

-- CreateIndex
CREATE INDEX `notifications_status_scheduled_for_idx` ON `notifications`(`status`, `scheduled_for`);

-- CreateIndex
CREATE UNIQUE INDEX `payments_appointment_id_key` ON `payments`(`appointment_id`);

-- CreateIndex
CREATE INDEX `payments_status_idx` ON `payments`(`status`);

-- CreateIndex
CREATE INDEX `prescription_items_prescription_id_idx` ON `prescription_items`(`prescription_id`);

-- CreateIndex
CREATE INDEX `prescriptions_patient_id_idx` ON `prescriptions`(`patient_id`);

-- CreateIndex
CREATE INDEX `prescriptions_doctor_id_idx` ON `prescriptions`(`doctor_id`);

-- CreateIndex
CREATE UNIQUE INDEX `prescriptions_appointment_id_version_key` ON `prescriptions`(`appointment_id`, `version`);

-- CreateIndex
CREATE UNIQUE INDEX `reviews_appointment_id_key` ON `reviews`(`appointment_id`);

-- CreateIndex
CREATE INDEX `reviews_doctor_id_idx` ON `reviews`(`doctor_id`);

-- CreateIndex
CREATE UNIQUE INDEX `specialties_name_en_key` ON `specialties`(`name_en`);

-- CreateIndex
CREATE UNIQUE INDEX `users_mobile_key` ON `users`(`mobile`);

-- AddForeignKey
ALTER TABLE `password_reset_tokens` ADD CONSTRAINT `password_reset_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_health_items` ADD CONSTRAINT `patient_health_items_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attachments` ADD CONSTRAINT `attachments_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_reviewed_by_fkey` FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_specialty_id_fkey` FOREIGN KEY (`specialty_id`) REFERENCES `specialties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_working_hours` ADD CONSTRAINT `doctor_working_hours_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_blocked_periods` ADD CONSTRAINT `doctor_blocked_periods_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_cancelled_by_fkey` FOREIGN KEY (`cancelled_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment_audit_logs` ADD CONSTRAINT `appointment_audit_logs_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment_audit_logs` ADD CONSTRAINT `appointment_audit_logs_changed_by_fkey` FOREIGN KEY (`changed_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription_items` ADD CONSTRAINT `prescription_items_prescription_id_fkey` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `price_change_log` ADD CONSTRAINT `price_change_log_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `price_change_log` ADD CONSTRAINT `price_change_log_changed_by_fkey` FOREIGN KEY (`changed_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_actor_id_fkey` FOREIGN KEY (`actor_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
