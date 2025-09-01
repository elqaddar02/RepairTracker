import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
// Update the import path below if Input exists elsewhere, e.g.:
import Input from './Input';
// Or, if Input does not exist, create 'Input.tsx' in the same folder with a basic implementation:
import Button from './Button';
// If Card.tsx exists in the same folder:
import Card, { CardHeader, CardContent } from './Card';

// Or, if Card.tsx exists in 'src/components/ui/':
// import Card, { CardHeader, CardContent } from './Card';
import { useI18n } from '../../i18n';

const Auth: React.FC = () => {
  const { t } = useI18n();

  // Language state
  const [lang, setLang] = useState<'fr' | 'en' | 'ar'>(
    () => (localStorage.getItem('lang') as 'fr' | 'en' | 'ar') || 'fr'
  );
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'client' | 'store'>('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // Remove useAuth, use local mock instead
  // const { login, register } = useAuth();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    shopName: '',
    city: '',
    address: '',
  });

  // Mock local storage for users
  const saveUser = (user: any) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const findUser = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find((u: any) => u.email === email && u.password === password);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const user = findUser(loginData.email, loginData.password);
      console.log('Trying login with:', loginData, 'Found user:', user); // <-- Add this line
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        setError(t('invalidLogin'));
      }
      setLoading(false);
    }, 800);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some((u: any) => u.email === registerData.email)) {
        setError(t('emailRegistered'));
        setLoading(false);
        return;
      }
      const userData = {
        email: registerData.email,
        password: registerData.password,
        role: userType,
        ...(userType === 'client' 
          ? { name: registerData.name, phone: registerData.phone }
          : { shopName: registerData.shopName, city: registerData.city, address: registerData.address }
        ),
      };
      saveUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      navigate('/dashboard');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Language Selector */}
        <div className="flex justify-end mb-2">
          <select
            value={lang}
            onChange={e => setLang(e.target.value as 'fr' | 'en' | 'ar')}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="ar">{t('arabic')}</option>
            <option value="fr">{t('french')}</option>
            <option value="en">{t('english')}</option>
          </select>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{t('welcome')}</h2>
          <p className="mt-2 text-gray-600">{t('signInOrCreate')}</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'login'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <LogIn className="h-4 w-4 inline mr-2" />
                {t('login')}
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'register'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <UserPlus className="h-4 w-4 inline mr-2" />
                {t('register')}
              </button>
            </div>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  label={t('email')}
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
                <Input
                  label={t('password')}
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? t('signingIn') : t('signIn')}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
                  <button
                    type="button"
                    onClick={() => setUserType('client')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                      userType === 'client'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {t('client')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('store')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                      userType === 'store'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {t('store')}
                  </button>
                </div>

                <Input
                  label={t('email')}
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
                <Input
                  label={t('password')}
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />

                {userType === 'client' ? (
                  <>
                    <Input
                      label={t('fullName')}
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                    <Input
                      label={t('phone')}
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      required
                    />
                  </>
                ) : (
                  <>
                    <Input
                      label={t('shopName')}
                      value={registerData.shopName}
                      onChange={(e) => setRegisterData({ ...registerData, shopName: e.target.value })}
                      required
                    />
                    <Input
                      label={t('city')}
                      value={registerData.city}
                      onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })}
                      required
                    />
                    <Input
                      label={t('address')}
                      value={registerData.address}
                      onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                      required
                    />
                  </>
                )}

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? t('creatingAccount') : t('createAccount')}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;