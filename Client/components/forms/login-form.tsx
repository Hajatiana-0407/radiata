'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { loginAdmin } from '@/store/slices/authSlice';
import { CustomInput } from '@/components/ui/custom-input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { LoaderSmall } from '@/components/ui/loader';
import { ErrorMessage } from '@/components/ui/error-message';

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errors.email = 'Un email valide est requis';
    if (password.length < 6) errors.password = 'Le mot de passe doit contenir au moins 6 caractères';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await dispatch(loginAdmin({ email, password }) as any);
    if (result.meta.requestStatus === 'fulfilled') {
      router.push('/admin');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage message={error} />}

      <InputGroup label="Email" required error={fieldErrors.email}>
        <CustomInput
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!fieldErrors.email}
        />
      </InputGroup>

      <InputGroup label="Mot de passe" required error={fieldErrors.password}>
        <CustomInput
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!fieldErrors.password}
        />
      </InputGroup>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <LoaderSmall /> Connexion en cours...
          </>
        ) : (
          'Se connecter'
        )}
      </Button>
    </form>
  );
}
