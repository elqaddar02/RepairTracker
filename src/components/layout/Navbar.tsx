import React, { useState, useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Wrench, LogOut, User, Globe } from 'lucide-react';
import { useI18n } from '../../i18n';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useI18n();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'ar', name: t('arabic'), flag: '🇸🇦' },
    { code: 'fr', name: t('french'), flag: '🇫🇷' },
    { code: 'en', name: t('english'), flag: '🇺🇸' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLang: 'fr' | 'en' | 'ar') => {
    setLang(newLang);
    setIsLanguageDropdownOpen(false);
  };

  const currentLanguage = languages.find(l => l.code === lang);

  return (
    <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Wrench className="h-8 w-8" style={{ color: 'var(--fixoo-primary)' }} />
            <span
              className="text-xl font-extrabold bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #FF6B35, #FFB347)' }}
            >
              Fixoo
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2"
                style={{ outlineColor: 'var(--fixoo-primary)' }}
              >
                <Globe className="h-5 w-5 text-gray-600" />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code as 'fr' | 'en' | 'ar')}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                        lang === language.code ? 'bg-[rgba(255,107,53,0.08)] text-[var(--fixoo-primary)]' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-base">{language.flag}</span>
                      <span className="font-medium">{language.name}</span>
                      {lang === language.code && (
                        <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--fixoo-primary)' }}></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{user.name || user.shopName || user.email}</span>
                  <span className="text-xs px-2 py-1 rounded-full border" style={{ background: 'rgba(255,107,53,0.08)', color: 'var(--fixoo-primary)', borderColor: 'rgba(255,107,53,0.25)' }}>
                    {user.role.toUpperCase()}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/track">
                  <Button variant="outline" size="sm">Suivre réparation</Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm">Se connecter</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-[2px] w-full" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,107,53,0.3), rgba(255,179,71,0.3))' }} />
    </nav>
  );
};

export default memo(Navbar);