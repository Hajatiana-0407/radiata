'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-selector';
import { createReservation, resetReservation } from '@/store/slices/reservationSlice';
import { CustomInput } from '@/components/ui/custom-input';
import { CustomTextarea } from '@/components/ui/custom-textarea';
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
import { SuccessMessage } from '@/components/ui/success-message';

interface ReservationFormProps {
  destinationId: string;
}

export function ReservationForm({ destinationId }: ReservationFormProps) {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector(
    (state) => state.reservation
  );

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    numberOfPeople: '1',
    specialRequests: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.startDate) errors.startDate = 'Start date is required';
    if (!formData.endDate) errors.endDate = 'End date is required';
    if (new Date(formData.endDate) <= new Date(formData.startDate))
      errors.endDate = 'End date must be after start date';
    if (parseInt(formData.numberOfPeople) < 1)
      errors.numberOfPeople = 'At least 1 person required';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(
      createReservation({
        destinationId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        startDate: formData.startDate,
        endDate: formData.endDate,
        numberOfPeople: parseInt(formData.numberOfPeople),
        specialRequests: formData.specialRequests,
        status: 'pending',
        totalPrice: 0,
      } as any)
    );
  };

  const handleDismissSuccess = () => {
    dispatch(resetReservation());
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      startDate: '',
      endDate: '',
      numberOfPeople: '1',
      specialRequests: '',
    });
  };

  if (success) {
    return (
      <SuccessMessage
        message="Reservation created successfully! We'll contact you soon to confirm your booking."
        onDismiss={handleDismissSuccess}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage message={error} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="First Name" required error={fieldErrors.firstName}>
          <CustomInput
            placeholder="John"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            error={!!fieldErrors.firstName}
          />
        </InputGroup>

        <InputGroup label="Last Name" required error={fieldErrors.lastName}>
          <CustomInput
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            error={!!fieldErrors.lastName}
          />
        </InputGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Email" required error={fieldErrors.email}>
          <CustomInput
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={!!fieldErrors.email}
          />
        </InputGroup>

        <InputGroup label="Phone" required error={fieldErrors.phone}>
          <CustomInput
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            error={!!fieldErrors.phone}
          />
        </InputGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Start Date" required error={fieldErrors.startDate}>
          <CustomInput
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            error={!!fieldErrors.startDate}
          />
        </InputGroup>

        <InputGroup label="End Date" required error={fieldErrors.endDate}>
          <CustomInput
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            error={!!fieldErrors.endDate}
          />
        </InputGroup>
      </div>

      <InputGroup
        label="Number of People"
        required
        error={fieldErrors.numberOfPeople}
      >
        <CustomInput
          type="number"
          min="1"
          value={formData.numberOfPeople}
          onChange={(e) =>
            setFormData({ ...formData, numberOfPeople: e.target.value })
          }
          error={!!fieldErrors.numberOfPeople}
        />
      </InputGroup>

      <InputGroup label="Special Requests">
        <CustomTextarea
          placeholder="Any special requests or dietary requirements?"
          value={formData.specialRequests}
          onChange={(e) =>
            setFormData({ ...formData, specialRequests: e.target.value })
          }
        />
      </InputGroup>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <LoaderSmall /> Creating Reservation...
          </>
        ) : (
          'Complete Reservation'
        )}
      </Button>
    </form>
  );
}
