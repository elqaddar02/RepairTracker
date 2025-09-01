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
    english: "Anglais"
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
    english: "English"
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
    english: "الإنجليزية"
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
