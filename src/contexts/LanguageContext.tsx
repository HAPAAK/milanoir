/**
 * LanguageContext - Provides internationalization support
 * Supports English, Spanish, and Nepali languages
 */

import { createContext, useContext, useState, ReactNode } from "react";

// Supported language codes
export type LanguageCode = "en" | "es" | "ne";

// Language metadata
export const languages = [
  { code: "en" as LanguageCode, label: "English", flag: "🇬🇧" },
  { code: "es" as LanguageCode, label: "Español", flag: "🇪🇸" },
  { code: "ne" as LanguageCode, label: "नेपाली", flag: "🇳🇵" },
];

// Translation strings
export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About Us",
      contact: "Contact",
      waitlist: "Waitlist",
    },
    // Hero section
    hero: {
      presents: "presents",
      tagline: "Experience the celebration of a lifetime",
      location: "London, United Kingdom",
      dateLabel: "April 13, 2026",
      scrollCta: "Discover the lineup",
      joinWaitlist: "Join the Waitlist",
    },
    // Countdown
    countdown: {
      title: "Countdown to the celebration",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      eventPassed: "The event has begun!",
    },
    // Artists section
    artists: {
      sectionTitle: "Featured Artists",
      sectionSubtitle: "World-class performers bringing the energy",
      playPreview: "Play Preview",
      comingSoon: "Coming Soon",
      upcomingArtistLabel: "Upcoming Artist",
    },
    // Contact page
    contact: {
      getInTouch: "Get In Touch",
      title: "Let's Create Something",
      subtitle: "Extraordinary",
      description: "Have a vision? Let's bring it to life together. Reach out to discuss your next big event.",
      sendMessage: "Send Us a Message",
      formDescription: "Fill out the form below and we'll get back to you within 24 hours.",
      fullName: "Full Name",
      email: "Email Address",
      message: "Message (What's this about?)",
      submit: "Send Message",
      joinJourney: "Join Our Journey",
      joinJourneyText: "Whether you're an artist seeking to perform on international stages, a sponsor looking to connect with engaged diaspora audiences, a venue partner wanting to host culturally significant events, or simply someone who believes in the power of purposeful entertainment—we invite you to be part of The Beginning of Infinity.",
    },
    // Footer
    footer: {
      tagline: "The Beginning of Infinity — Representing the Nepalese Diaspora Globally",
      followUs: "Follow Us",
      privacyPolicy: "Privacy Policy",
      terms: "Terms & Conditions",
      registered: "Registered in England & Wales • Company Number: 16820191",
      copyright: "© 2026 Milanoir Events Limited. All rights reserved.",
    },
    // Waitlist
    waitlist: {
      title: "Join the Waitlist",
      subtitle: "Be the first to know when tickets go live",
      infinityBeginsIn: "Infinity begins in...",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number (Optional)",
      termsAgree: "I agree to the",
      termsLink: "Terms & Conditions",
      andThe: "and the",
      privacyLink: "Privacy Policy",
      submit: "Join the Waitlist",
      successTitle: "You're on the list!",
      successMessage: "We'll notify you when tickets are available.",
    },
  },
  es: {
    // Navigation
    nav: {
      home: "Inicio",
      about: "Sobre Nosotros",
      contact: "Contacto",
      waitlist: "Lista de Espera",
    },
    // Hero section
    hero: {
      presents: "presenta",
      tagline: "Experimenta la celebración de tu vida",
      location: "Londres, Reino Unido",
      dateLabel: "13 de Abril, 2026",
      scrollCta: "Descubre el lineup",
      joinWaitlist: "Únete a la Lista",
    },
    // Countdown
    countdown: {
      title: "Cuenta regresiva para la celebración",
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
      eventPassed: "¡El evento ha comenzado!",
    },
    // Artists section
    artists: {
      sectionTitle: "Artistas Destacados",
      sectionSubtitle: "Artistas de clase mundial trayendo la energía",
      playPreview: "Reproducir Vista Previa",
      comingSoon: "Próximamente",
      upcomingArtistLabel: "Próximo Artista",
    },
    // Contact page
    contact: {
      getInTouch: "Contáctanos",
      title: "Creemos Algo",
      subtitle: "Extraordinario",
      description: "¿Tienes una visión? Hagámosla realidad juntos. Contáctanos para discutir tu próximo gran evento.",
      sendMessage: "Envíanos un Mensaje",
      formDescription: "Completa el formulario y te responderemos en 24 horas.",
      fullName: "Nombre Completo",
      email: "Correo Electrónico",
      message: "Mensaje (¿De qué se trata?)",
      submit: "Enviar Mensaje",
      joinJourney: "Únete a Nuestro Viaje",
      joinJourneyText: "Ya seas un artista buscando actuar en escenarios internacionales, un patrocinador buscando conectar con audiencias de la diáspora, un socio de venue queriendo organizar eventos culturalmente significativos, o simplemente alguien que cree en el poder del entretenimiento con propósito—te invitamos a ser parte del Comienzo del Infinito.",
    },
    // Footer
    footer: {
      tagline: "El Comienzo del Infinito — Representando a la Diáspora Nepalí Globalmente",
      followUs: "Síguenos",
      privacyPolicy: "Política de Privacidad",
      terms: "Términos y Condiciones",
      registered: "Registrado en Inglaterra y Gales • Número de Empresa: 16820191",
      copyright: "© 2026 Milanoir Events Limited. Todos los derechos reservados.",
    },
    // Waitlist
    waitlist: {
      title: "Únete a la Lista de Espera",
      subtitle: "Sé el primero en saber cuando los boletos estén disponibles",
      infinityBeginsIn: "El infinito comienza en...",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo Electrónico",
      phone: "Teléfono (Opcional)",
      termsAgree: "Acepto los",
      termsLink: "Términos y Condiciones",
      andThe: "y la",
      privacyLink: "Política de Privacidad",
      submit: "Unirse a la Lista",
      successTitle: "¡Estás en la lista!",
      successMessage: "Te notificaremos cuando los boletos estén disponibles.",
    },
  },
  ne: {
    // Navigation
    nav: {
      home: "गृहपृष्ठ",
      about: "हाम्रो बारेमा",
      contact: "सम्पर्क",
      waitlist: "प्रतीक्षा सूची",
    },
    // Hero section
    hero: {
      presents: "प्रस्तुत गर्दछ",
      tagline: "जीवनभरको उत्सव अनुभव गर्नुहोस्",
      location: "लन्डन, बेलायत",
      dateLabel: "अप्रिल १३, २०२६",
      scrollCta: "कलाकारहरू हेर्नुहोस्",
      joinWaitlist: "प्रतीक्षा सूचीमा सामेल हुनुहोस्",
    },
    // Countdown
    countdown: {
      title: "उत्सवको उल्टो गणना",
      days: "दिन",
      hours: "घण्टा",
      minutes: "मिनेट",
      seconds: "सेकेन्ड",
      eventPassed: "कार्यक्रम सुरु भयो!",
    },
    // Artists section
    artists: {
      sectionTitle: "विशेष कलाकारहरू",
      sectionSubtitle: "विश्वस्तरीय कलाकारहरू ऊर्जा ल्याउँदै",
      playPreview: "प्रिभ्यु सुन्नुहोस्",
      comingSoon: "छिट्टै आउँदै",
      upcomingArtistLabel: "आगामी कलाकार",
    },
    // Contact page
    contact: {
      getInTouch: "सम्पर्क गर्नुहोस्",
      title: "केही असाधारण",
      subtitle: "सिर्जना गरौं",
      description: "तपाईंको दृष्टिकोण छ? सँगै यसलाई साकार पार्न। तपाईंको अर्को ठूलो कार्यक्रम बारे छलफल गर्न सम्पर्क गर्नुहोस्।",
      sendMessage: "हामीलाई सन्देश पठाउनुहोस्",
      formDescription: "तलको फारम भर्नुहोस् र हामी २४ घण्टा भित्र जवाफ दिनेछौं।",
      fullName: "पूरा नाम",
      email: "इमेल ठेगाना",
      message: "सन्देश (यो के बारेमा हो?)",
      submit: "सन्देश पठाउनुहोस्",
      joinJourney: "हाम्रो यात्रामा सामेल हुनुहोस्",
      joinJourneyText: "तपाईं अन्तर्राष्ट्रिय मञ्चमा प्रदर्शन गर्न खोज्ने कलाकार हुनुहुन्छ, प्रवासी दर्शकहरूसँग जोडिन खोज्ने प्रायोजक, सांस्कृतिक रूपमा महत्त्वपूर्ण कार्यक्रमहरू आयोजना गर्न चाहने स्थल साझेदार, वा उद्देश्यपूर्ण मनोरञ्जनको शक्तिमा विश्वास गर्ने कोही—हामी तपाईंलाई अनन्तताको सुरुवातको हिस्सा हुन आमन्त्रित गर्दछौं।",
    },
    // Footer
    footer: {
      tagline: "अनन्तताको सुरुवात — विश्वव्यापी रूपमा नेपाली प्रवासीको प्रतिनिधित्व",
      followUs: "हामीलाई फलो गर्नुहोस्",
      privacyPolicy: "गोपनीयता नीति",
      terms: "सर्तहरू र सर्तहरू",
      registered: "इङ्ग्ल्यान्ड र वेल्समा दर्ता • कम्पनी नम्बर: 16820191",
      copyright: "© २०२६ Milanoir Events Limited। सर्वाधिकार सुरक्षित।",
    },
    // Waitlist
    waitlist: {
      title: "प्रतीक्षा सूचीमा सामेल हुनुहोस्",
      subtitle: "टिकटहरू बिक्रीमा आउँदा पहिलो जान्नुहोस्",
      infinityBeginsIn: "अनन्तता सुरु हुन्छ...",
      firstName: "पहिलो नाम",
      lastName: "थर",
      email: "इमेल ठेगाना",
      phone: "फोन नम्बर (ऐच्छिक)",
      termsAgree: "म सहमत छु",
      termsLink: "सर्तहरू र सर्तहरू",
      andThe: "र",
      privacyLink: "गोपनीयता नीति",
      submit: "सूचीमा सामेल हुनुहोस्",
      successTitle: "तपाईं सूचीमा हुनुहुन्छ!",
      successMessage: "टिकटहरू उपलब्ध हुँदा हामी तपाईंलाई सूचित गर्नेछौं।",
    },
  },
};

type Translations = typeof translations.en;

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>("en");

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
