'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-selector';
import { sendContactMessage, resetContact } from '@/store/slices/contactSlice';
import { CustomInput } from '@/components/ui/custom-input';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import {
  InputGroup,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { LoaderSmall } from '@/components/ui/loader';
import { ErrorMessage } from '@/components/ui/error-message';
import { SuccessMessage } from '@/components/ui/success-message';

export function ContactForm() {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errors.email = 'Valid email is required';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(sendContactMessage(formData) as any);
  };

  const handleDismissSuccess = () => {
    dispatch(resetContact());
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  if (success) {
    return (
      <SuccessMessage
        message="Message sent successfully! We'll get back to you as soon as possible."
        onDismiss={handleDismissSuccess}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <ErrorMessage message={error} />}

      <InputGroup label="Nom" required error={fieldErrors.name}>
        <CustomInput
          placeholder="Votre nom"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={!!fieldErrors.name}
        />
      </InputGroup>

      <InputGroup label="Email" required error={fieldErrors.email}>
        <CustomInput
          type="email"
          placeholder="votreemail@email.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          error={!!fieldErrors.email}
        />
      </InputGroup>

      <InputGroup label="Sujet" required error={fieldErrors.subject}>
        <CustomInput
          placeholder="Quel est l'objet de votre message ?"
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          error={!!fieldErrors.subject}
        />
      </InputGroup>

      <InputGroup label="Message" required error={fieldErrors.message}>
        <CustomTextarea
          placeholder="Écrivez votre message ici..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          error={!!fieldErrors.message}
        />
      </InputGroup>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <LoaderSmall /> Envoi en cours...
          </>
        ) : (
          'Envoyer le message'
        )}
      </Button>
    </form>
  );
}
