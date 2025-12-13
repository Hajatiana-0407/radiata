'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/use-app-selector';
import { LoginForm } from '@/components/forms/login-form';

export default function AdminLoginPage() {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      router.push('/admin');
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#7ac243] to-[#40e0d0] mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
              R
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Radiata Admin</h1>
            <p className="text-sm text-slate-600 mt-2">
              Connectez-vous pour gérer votre contenu
            </p>
          </div>

          <LoginForm />

          <p className="text-xs text-center text-slate-500 mt-6 border-t border-slate-200 pt-6">
            Identifiants de démonstration: admin@radiata.com / password
          </p>
        </div>
      </div>
    </div>
  );
}
