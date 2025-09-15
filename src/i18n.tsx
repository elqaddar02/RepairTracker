import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  fr: {
    welcome: "Bienvenue",
    signInOrCreate: "Connectez-vous à votre compte ou créez-en un nouveau",
    login: "Connexion",
    register: "Inscription",
    email: "E-mail",
    password: "Mot de passe",
    signIn: "Se connecter",
    signingIn: "Connexion...",
    createAccount: "Créer un compte",
    creatingAccount: "Création du compte...",
    client: "Client",
    store: "Magasin",
    fullName: "Nom complet",
    phone: "Numéro de téléphone",
    shopName: "Nom du magasin",
    city: "Ville",
    address: "Adresse",
    invalidLogin: "E-mail ou mot de passe invalide",
    emailRegistered: "E-mail déjà enregistré",
    language: "Langue",
    arabic: "Arabe",
    french: "Français",
    english: "Anglais",
    back: "Retour",
    findStoreNearMe: "Trouver un magasin près de moi",
    searchStores: "Rechercher des magasins...",
    continueLoginRegister: "Continuer vers connexion/inscription",
    // ...add more keys as needed...
  },
  en: {
    welcome: "Welcome Back",
    signInOrCreate: "Sign in to your account or create a new one",
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    signingIn: "Signing in...",
    createAccount: "Create Account",
    creatingAccount: "Creating Account...",
    client: "Client",
    store: "Store",
    fullName: "Full Name",
    phone: "Phone Number",
    shopName: "Shop Name",
    city: "City",
    address: "Address",
    invalidLogin: "Invalid email or password",
    emailRegistered: "Email already registered",
    language: "Language",
    arabic: "Arabic",
    french: "French",
    english: "English",
    dashboard: "Dashboard",
    myRepairs: "My Repairs",
    repairManagement: "Repair Management",
    userManagement: "User Management",
    back: "Back",
    findStoreNearMe: "Find store near to me",
    searchStores: "Search stores...",
    continueLoginRegister: "Continue to login/register",
    // ...add more keys as needed...
  },
  ar: {
    welcome: "مرحبًا بعودتك",
    signInOrCreate: "سجّل الدخول إلى حسابك أو أنشئ حسابًا جديدًا",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    signingIn: "جاري تسجيل الدخول...",
    createAccount: "إنشاء حساب",
    creatingAccount: "جاري إنشاء الحساب...",
    client: "عميل",
    store: "متجر",
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف",
    shopName: "اسم المتجر",
    city: "المدينة",
    address: "العنوان",
    invalidLogin: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    emailRegistered: "البريد الإلكتروني مسجل بالفعل",
    language: "اللغة",
    arabic: "العربية",
    french: "الفرنسية",
    english: "الإنجليزية",
    dashboard: "لوحة التحكم",
    myRepairs: "إصلاحاتي",
    repairManagement: "إدارة الإصلاحات",
    userManagement: "إدارة المستخدمين",
    back: "رجوع",
    findStoreNearMe: "ابحث عن متجر بالقرب مني",
    searchStores: "ابحث عن المتاجر...",
    continueLoginRegister: "متابعة إلى تسجيل الدخول/التسجيل",
    // ...add more keys as needed...
  }
};

type Lang = 'fr' | 'en' | 'ar';
type I18nContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof typeof translations['fr']) => string;
};

const I18nContext = createContext<I18nContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (key) => translations.fr[key] || key,
});

export const I18nProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'fr');
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);
  const t = (key: keyof typeof translations['fr']) => translations[lang][key] || key;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);

// Add more French translations
const frenchTranslations = {
  // Navigation & Layout
  dashboard: "Tableau de bord",
  repairs: "Réparations",
  logout: "Déconnexion",
  settings: "Paramètres",
  users: "Utilisateurs",
  reports: "Rapports",
  
  // Table & Data
  trackingCode: "Code de suivi",
  deviceBrand: "Marque de l'appareil",
  deviceModel: "Modèle de l'appareil",
  status: "Statut",
  created: "Créé",
  lastUpdate: "Dernière mise à jour",
  actions: "Actions",
  
  // Statuses
  waiting: "En attente",
  inProgress: "En cours",
  completed: "Terminé",
  cancelled: "Annulé",
  pending: "En attente",
  approved: "Approuvé",
  blocked: "Bloqué",
  
  // Common UI
  name: "Nom",
  device: "Appareil",
  store: "Magasin",
  client: "Client",
  role: "Rôle",
  joined: "Inscrit",
  
  // Landing page
  trackYourDevice: "Suivez facilement la réparation de votre appareil",
  landingSubtitle: "Fixoo vous aide à suivre et gérer les réparations d'appareils en toute simplicité. Obtenez des mises à jour en temps réel, des notifications instantanées et une plateforme sécurisée pour les clients et les magasins.",
  getStarted: "Commencer",
  trackMyRepair: "Suivre ma réparation",
  easyTracking: "Suivi facile",
  easyTrackingDesc: "Suivez l'état de votre réparation avec un simple code de suivi. Obtenez des mises à jour en temps réel sur votre appareil.",
  securePlatform: "Plateforme sécurisée",
  securePlatformDesc: "Vos données sont protégées par des mesures de sécurité et un chiffrement de niveau industriel.",
  realTimeUpdates: "Mises à jour en temps réel",
  realTimeUpdatesDesc: "Recevez des notifications instantanées lorsque l'état de votre réparation change ou est terminé.",
  
  // Store finder
  findRepairStores: "Trouver des magasins de réparation",
  findStoresDesc: "Découvrez des magasins de réparation de confiance près de chez vous. Parcourez les emplacements, comparez les services et choisissez le magasin parfait pour vos besoins de réparation d'appareils.",
  backToHome: "Retour à l'accueil",
  
  // Track repair
  trackRepairTitle: "Suivre votre réparation",
  trackRepairDesc: "Entrez votre code de suivi pour voir l'état actuel de votre réparation",
  checkStatus: "Vérifier le statut",
  repairNotFound: "Réparation non trouvée. Veuillez vérifier votre code de suivi.",
  repairDetails: "Détails de la réparation",
  deviceInformation: "Informations sur l'appareil",
  repairInformation: "Informations sur la réparation",
  statusTimeline: "Chronologie du statut",
  
  // Common
  type: "Type",
  brand: "Marque",
  model: "Modèle",
  issue: "Problème",
  submitted: "Soumis",
  estimatedCost: "Coût estimé",
  address: "Adresse",
  phone: "Téléphone",
  rating: "Note",
  servicesOffered: "Services offerts",
  workingHours: "Heures d'ouverture",
  chooseThisStore: "Choisir ce magasin",
  keepLooking: "Continuer à chercher",
  continueAsClient: "Continuer en tant que client",
  iHaveAccount: "J'ai un compte",
  signInExisting: "Connectez-vous à votre compte existant",
  createNewAccount: "Créer un nouveau compte",
  registerAsNew: "S'inscrire en tant que nouveau client"
};
