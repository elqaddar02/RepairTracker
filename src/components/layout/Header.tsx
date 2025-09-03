import React, { useState, useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Globe } from 'lucide-react';
import { useI18n } from '../../i18n';
import Button from '../ui/Button';

class HeaderErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // Optionally log error
    // console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          Something went wrong in the header.
        </div>
      );
    }
    return this.props.children;
  }
}

const Header: React.FC = () => {
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
    <HeaderErrorBoundary>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RepairTracker</span>
            </Link>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Globe className="h-5 w-5 text-gray-600" />
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code as 'fr' | 'en' | 'ar')}
                        className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                          lang === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-base">{language.flag}</span>
                        <span className="font-medium">{language.name}</span>
                        {lang === language.code && (
                          <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/track">
                <Button variant="outline" size="sm">Track Repair</Button>
              </Link>
              <Link to="/auth">
                <Button size="sm">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </HeaderErrorBoundary>
  );
};

export default memo(Header);