import { PrismaClient, Role, Gender } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding MedLink database...');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Password123!', salt);

  // 1. Seed Specialties
  const cardiology = await prisma.specialty.upsert({
    where: { name: 'Cardiology' },
    update: {},
    create: {
      name: 'Cardiology',
      description: 'Heart and cardiovascular system specialists',
      icon: 'heart-pulse',
    },
  });

  const dermatology = await prisma.specialty.upsert({
    where: { name: 'Dermatology' },
    update: {},
    create: {
      name: 'Dermatology',
      description: 'Skin, hair, and nail health specialists',
      icon: 'activity',
    },
  });

  const neurology = await prisma.specialty.upsert({
    where: { name: 'Neurology' },
    update: {},
    create: {
      name: 'Neurology',
      description: 'Brain, spinal cord, and nervous system specialists',
      icon: 'brain',
    },
  });

  // 2. Seed Admin User
  await prisma.user.upsert({
    where: { email: 'admin@medlink.com' },
    update: {},
    create: {
      email: 'admin@medlink.com',
      passwordHash,
      firstName: 'System',
      lastName: 'Administrator',
      role: Role.ADMIN,
      phoneNumber: '+1-555-0100',
    },
  });

  // 3. Seed Doctor User
  const doctorUser = await prisma.user.upsert({
    where: { email: 'dr.smith@medlink.com' },
    update: {},
    create: {
      email: 'dr.smith@medlink.com',
      passwordHash,
      firstName: 'Sarah',
      lastName: 'Smith',
      role: Role.DOCTOR,
      phoneNumber: '+1-555-0101',
      doctorProfile: {
        create: {
          specialtyId: cardiology.id,
          licenseNumber: 'MD-CARD-99281',
          yearsOfExperience: 12,
          bio: 'Board-certified cardiologist specializing in adult cardiovascular care and preventive cardiology.',
          consultationFee: 150.0,
          clinicAddress: '100 Medical Center Way, Suite 400',
          isVerified: true,
          ratingAverage: 4.9,
          totalReviews: 84,
        },
      },
    },
  });

  // 4. Seed Patient User
  await prisma.user.upsert({
    where: { email: 'patient.john@medlink.com' },
    update: {},
    create: {
      email: 'patient.john@medlink.com',
      passwordHash,
      firstName: 'John',
      lastName: 'Doe',
      role: Role.PATIENT,
      phoneNumber: '+1-555-0102',
      patientProfile: {
        create: {
          gender: Gender.MALE,
          bloodType: 'O+',
          allergies: 'Penicillin',
          emergencyContact: 'Jane Doe (+1-555-0199)',
        },
      },
    },
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
