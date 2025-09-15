import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import { useI18n } from '../i18n';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Auth: React.FC = () => {
  const { t } = useI18n();
  const { login, register } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialTab = (searchParams.get('tab') as 'login' | 'register') || 'login';
  const initialRole = (searchParams.get('role') as 'client' | 'store') || 'client';

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [role, setRole] = useState<'client' | 'store'>(initialRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const isClient = useMemo(() => role === 'client', [role]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // AuthContext expects username param name, pass email value
      await (login as unknown as (username: string, password: string) => Promise<void>)(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('invalidLogin'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload: any = isClient
        ? {
            role: 'client',
            email,
            password,
            fullName,
            phone,
          }
        : {
            role: 'store',
            email,
            password,
            shopName,
            city,
            address,
          };
      await register(payload as any);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('emailRegistered'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-blue-200">
      <Header />
      <main className="flex-1 flex items-center justify-center my-5">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-orange-600 mb-2">{t('welcome')}</h2>
              <p className="text-lg text-gray-500">{t('signInOrCreate')}</p>
            </div>

            <div className="mb-8 p-4 bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 rounded-xl shadow">
              <h3 className="text-sm font-semibold text-orange-800 mb-2">Demo Credentials:</h3>
              <div className="text-xs text-orange-700 space-y-1">
                <p><strong>Client:</strong> client@demo.com / password</p>
                <p><strong>Store:</strong> store@demo.com / password</p>
                <p><strong>Admin:</strong> admin / password</p>
              </div>
            </div>

            <Card className="shadow-none border-none">
              <CardHeader>
                <div className="flex space-x-2 bg-gray-100 p-2 rounded-xl mb-4">
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-3 px-4 rounded-lg text-base font-semibold transition-all duration-200 ${
                      activeTab === 'login'
                        ? 'bg-orange-500 text-white shadow'
                        : 'bg-white text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <LogIn className="h-5 w-5 inline mr-2" />
                    {t('login')}
                  </button>
                  <button
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 py-3 px-4 rounded-lg text-base font-semibold transition-all duration-200 ${
                      activeTab === 'register'
                        ? 'bg-orange-500 text-white shadow'
                        : 'bg-white text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <UserPlus className="h-5 w-5 inline mr-2" />
                    {t('register')}
                  </button>
                </div>
              </CardHeader>

              <CardContent>
                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm font-medium">
                    {error}
                  </div>
                )}

                {activeTab === 'login' ? (
                  <form onSubmit={handleLogin} className="space-y-6">
                    <Input
                      label={t('email')}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Input
                      label={t('password')}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button type="submit" disabled={loading} className="w-full py-3 text-base rounded-lg font-semibold">
                      {loading ? t('signingIn') : t('signIn')}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-6">
                    <div className="flex space-x-2 bg-gray-100 p-2 rounded-xl mb-2">
                      <button
                        type="button"
                        onClick={() => setRole('client')}
                        className={`flex-1 py-2 px-4 rounded-lg text-base font-semibold transition-all duration-200 ${
                          isClient ? 'bg-orange-500 text-white shadow' : 'bg-white text-orange-600 hover:bg-orange-50'
                        }`}
                      >
                        {t('client')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('store')}
                        className={`flex-1 py-2 px-4 rounded-lg text-base font-semibold transition-all duration-200 ${
                          !isClient ? 'bg-orange-500 text-white shadow' : 'bg-white text-orange-600 hover:bg-orange-50'
                        }`}
                      >
                        {t('store')}
                      </button>
                    </div>

                    <Input
                      label={t('email')}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Input
                      label={t('password')}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    {isClient ? (
                      <>
                        <Input
                          label={t('fullName')}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                        <Input
                          label={t('phone')}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </>
                    ) : (
                      <>
                        <Input
                          label={t('shopName')}
                          value={shopName}
                          onChange={(e) => setShopName(e.target.value)}
                          required
                        />
                        <Input
                          label={t('city')}
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                        <Input
                          label={t('address')}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </>
                    )}

                    <Button type="submit" disabled={loading} className="w-full py-3 text-base rounded-lg font-semibold">
                      {loading ? t('creatingAccount') : t('createAccount')}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;