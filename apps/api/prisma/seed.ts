import { PrismaClient, Role, Gender, ApprovalStatus, HealthItemType, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding MedLink database with new schema...');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Password123!', salt);

  // 1. Seed Reference Data: Specialties
  const cardiology = await prisma.specialty.upsert({
    where: { nameEn: 'Cardiology' },
    update: {},
    create: {
      nameEn: 'Cardiology',
      nameAr: 'أمراض القلب',
    },
  });

  const dermatology = await prisma.specialty.upsert({
    where: { nameEn: 'Dermatology' },
    update: {},
    create: {
      nameEn: 'Dermatology',
      nameAr: 'الجلدية',
    },
  });

  const neurology = await prisma.specialty.upsert({
    where: { nameEn: 'Neurology' },
    update: {},
    create: {
      nameEn: 'Neurology',
      nameAr: 'المخ والأعصاب',
    },
  });

  // 2. Seed Reference Data: Locations
  const cairoLocation = await prisma.location.upsert({
    where: {
      governorate_city: {
        governorate: 'Cairo',
        city: 'Nasr City',
      },
    },
    update: {},
    create: {
      governorate: 'Cairo',
      city: 'Nasr City',
      latitude: 30.0561,
      longitude: 31.3301,
    },
  });

  // 3. Seed Admin User
  await prisma.user.upsert({
    where: { email: 'admin@medlink.com' },
    update: {},
    create: {
      email: 'admin@medlink.com',
      mobile: '+201000000001',
      passwordHash,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  // 4. Seed Doctor User & Doctor Profile
  let doctorUser = await prisma.user.findUnique({
    where: { email: 'dr.smith@medlink.com' },
    include: { doctor: true },
  });

  if (!doctorUser) {
    doctorUser = await prisma.user.create({
      data: {
        email: 'dr.smith@medlink.com',
        mobile: '+201000000002',
        passwordHash,
        role: Role.DOCTOR,
        status: UserStatus.ACTIVE,
        doctor: {
          create: {
            specialtyId: cardiology.id,
            locationId: cairoLocation.id,
            fullName: 'Dr. Sarah Smith',
            gender: Gender.FEMALE,
            yearsExperience: 12,
            bio: 'Board-certified cardiologist specializing in adult cardiovascular care and preventive cardiology.',
            clinicName: 'Smith Cardiology Clinic',
            clinicAddress: '100 Medical Center Way, Suite 400',
            licenseNumber: 'MD-CARD-99281',
            approvalStatus: ApprovalStatus.APPROVED,
            currentPrice: 150.0,
          },
        },
      },
      include: { doctor: true },
    });
  }

  // 5. Seed Patient User & Patient Profile
  let patientUser = await prisma.user.findUnique({
    where: { email: 'patient.john@medlink.com' },
    include: { patient: true },
  });

  if (!patientUser) {
    patientUser = await prisma.user.create({
      data: {
        email: 'patient.john@medlink.com',
        mobile: '+201000000003',
        passwordHash,
        role: Role.PATIENT,
        status: UserStatus.ACTIVE,
        patient: {
          create: {
            fullName: 'John Doe',
            gender: Gender.MALE,
            dateOfBirth: new Date('1990-05-15'),
            healthItems: {
              create: [
                {
                  itemType: HealthItemType.ALLERGY,
                  name: 'Penicillin',
                  notes: 'Causes mild rash and swelling',
                },
              ],
            },
          },
        },
      },
      include: { patient: true },
    });
  }

  console.log('Seed completed successfully for new schema.');
}

main()
  .catch((e) => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
