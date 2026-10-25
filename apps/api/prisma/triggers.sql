-- =============================================================================
-- MedLink — Database Triggers for Appointment Double-Booking Prevention
-- =============================================================================
-- This file contains the MySQL triggers to automatically maintain the
-- `active_slot_start` column in the `appointments` table.
--
-- Logic:
-- While an appointment status is 'PENDING' or 'CONFIRMED', active_slot_start
-- equals start_at. When the appointment is 'COMPLETED', 'CANCELLED', or 'NO_SHOW',
-- active_slot_start becomes NULL.
-- Combined with UNIQUE INDEX `appointments_doctor_id_active_slot_start_key`,
-- this prevents double-booking active slots for any doctor.
--
-- Note: Requires SUPER or SYSTEM_VARIABLES_ADMIN privileges if MySQL binary
-- logging is enabled on the server.
--
-- Execution (as MySQL root/admin user):
-- mysql -u root -p medlink < triggers.sql
-- =============================================================================

DROP TRIGGER IF EXISTS `trg_appointments_active_slot_insert`;
DROP TRIGGER IF EXISTS `trg_appointments_active_slot_update`;

DELIMITER $$

CREATE TRIGGER `trg_appointments_active_slot_insert`
BEFORE INSERT ON `appointments`
FOR EACH ROW
BEGIN
    IF NEW.status IN ('PENDING', 'CONFIRMED') THEN
        SET NEW.active_slot_start = NEW.start_at;
    ELSE
        SET NEW.active_slot_start = NULL;
    END IF;
END$$

CREATE TRIGGER `trg_appointments_active_slot_update`
BEFORE UPDATE ON `appointments`
FOR EACH ROW
BEGIN
    IF NEW.status IN ('PENDING', 'CONFIRMED') THEN
        SET NEW.active_slot_start = NEW.start_at;
    ELSE
        SET NEW.active_slot_start = NULL;
    END IF;
END$$

DELIMITER ;
