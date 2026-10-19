import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'MedLink',
      welcome: 'Welcome to MedLink Healthcare',
      bookAppointment: 'Book Appointment',
      findDoctor: 'Find a Specialist',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      patientPortal: 'Patient Portal',
      doctorPortal: 'Doctor Portal',
      adminPortal: 'Admin Portal',
    },
  },
  ar: {
    translation: {
      appName: 'ميدلينك',
      welcome: 'مرحبًا بك في منصة ميدلينك للرعاية الصحية',
      bookAppointment: 'حجز موعد',
      findDoctor: 'ابحث عن طبيب متخصص',
      login: 'تسجيل الدخول',
      register: 'حساب جديد',
      logout: 'تسجيل الخروج',
      patientPortal: 'بوابة المريض',
      doctorPortal: 'بوابة الطبيب',
      adminPortal: 'لوحة تحكم المسؤول',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
