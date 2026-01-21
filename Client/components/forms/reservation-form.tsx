'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-selector';
import { createReservation, resetReservation } from '@/store/slices/reservationSlice';
import { CustomInput } from '@/components/ui/custom-input';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { InputGroup } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { LoaderSmall } from '@/components/ui/loader';
import { ErrorMessage } from '@/components/ui/error-message';
import { SuccessMessage } from '@/components/ui/success-message';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { accommodationTypes } from '@/lib/utils';

interface ReservationFormProps {
  destinationId: string;
}

type FormStep = 1 | 2 | 3 | 4;

export function ReservationForm({ destinationId }: ReservationFormProps) {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector(
    (state) => state.reservation
  );

  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [needsAccommodation, setNeedsAccommodation] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    adresse: '',
    startDate: '',
    endDate: '',
    adultes: '1',
    enfants: '0',
    bebes: '0',
    specialRequests: '',
    accommodationType: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateStep = (step: FormStep): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim())
          errors.firstName = 'Le prénom est obligatoire';
        if (!formData.lastName.trim())
          errors.lastName = 'Le nom de famille est obligatoire';
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
          errors.email = 'Une adresse email valide est obligatoire';
        if (!formData.phone.trim())
          errors.phone = 'Le téléphone est obligatoire';
        if (!formData.adresse.trim())
          errors.adresse = 'L\'adresse est obligatoire'
        break;

      case 2:
        if (!formData.startDate)
          errors.startDate = 'La date d\'arrivée est obligatoire';
        if (!formData.endDate)
          errors.endDate = 'La date de départ est obligatoire';
        if (formData.startDate && formData.endDate && new Date(formData.endDate) <= new Date(formData.startDate))
          errors.endDate = 'La date de départ doit être après la date d\'arrivée';
        break;

      case 3:
        if (parseInt(formData.adultes) < 1)
          errors.adultes = 'Au moins 1 adulte est obligatoire';
        if (parseInt(formData.enfants) < 0)
          errors.enfants = 'Le nombre d\'enfants ne peut pas être négatif';
        if (parseInt(formData.bebes) < 0)
          errors.bebes = 'Le nombre de bébés ne peut pas être négatif';
        break;

      case 4:
        if (needsAccommodation && !formData.accommodationType)
          errors.accommodationType = 'Veuillez sélectionner un type d\'hébergement';
        break;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1 as FormStep);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1 as FormStep);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    dispatch(
      createReservation({
        destinationId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        adresse: formData.adresse,
        phone: formData.phone,
        startDate: formData.startDate,
        endDate: formData.endDate,
        adultes: parseInt(formData.adultes),
        enfants: parseInt(formData.enfants),
        bebes: parseInt(formData.bebes),
        specialRequests: formData.specialRequests,
        needsAccommodation,
        accommodationType: needsAccommodation ? formData.accommodationType : null,
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
      adresse: '',
      phone: '',
      startDate: '',
      endDate: '',
      adultes: '1',
      enfants: '0',
      bebes: '0',
      specialRequests: '',
      accommodationType: '',
    });
    setNeedsAccommodation(false);
    setCurrentStep(1);
  };

  const steps = [
    { number: 1, title: 'Identité' },
    { number: 2, title: 'Dates de Séjour' },
    { number: 3, title: 'Participants' },
    { number: 4, title: 'Hébergement' },
  ];

  if (success) {
    return (
      <SuccessMessage
        message="Réservation créée avec succès ! Nous vous contacterons bientôt pour confirmer votre réservation."
        onDismiss={handleDismissSuccess}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex justify-between items-center relative">
          {/* Ligne de progression de fond */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10"></div>

          {/* Ligne de progression remplie - CORRECTION ICI */}
          <div
            className="absolute top-6 left-0 h-1 bg-[#40e0d0] -z-10 transition-all duration-500 ease-out rounded-full"
            style={{
              width: currentStep === 4 ? '100%' : `${((currentStep - 1) / 3) * 100}%`
            }}
          ></div>

          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isActive = currentStep === step.number;

            return (
              <div key={step.number} className="flex flex-col items-center relative z-10" style={{ flex: 1 }}>
                {/* Connexion entre les cercles (lignes) */}
                {/* {index < steps.length - 1 && (
                  <div
                    className="absolute top-6 left-1/2 w-full h-1 -z-20"
                    style={{ transform: 'translateX(-50%)' }}
                  >
                    <div
                      className={`h-full transition-all duration-500 ease-out  border  border-red-400 ${isCompleted || (isActive && index === steps.length - 2) ? 'bg-[#40e0d0]' : 'bg-gray-200'
                        }`}
                      style={{
                        width: '100%',
                        marginLeft: '1.5rem',
                        marginRight: '1.5rem'
                      }}
                    ></div>
                  </div>
                )} */}

                {/* Cercle d'étape */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 transform relative ${isCompleted
                    ? 'bg-[#40e0d0] shadow-lg shadow-[#40e0d0]/30 scale-110'
                    : isActive
                      ? 'bg-white border-4 border-[#40e0d0] shadow-lg shadow-[#40e0d0]/20 scale-110'
                      : 'bg-white border-2 border-gray-300'
                    }`}
                >
                  {isCompleted ? (
                    <Check className='text-white w-5 h-5' />
                  ) : (
                    <span
                      className={`text-lg font-bold ${isActive ? 'text-[#40e0d0]' : isCompleted ? 'text-white' : 'text-gray-400'
                        }`}
                    >
                      {step.number}
                    </span>
                  )}

                  {/* Effet de halo pour l'étape active */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-[#40e0d0]/30 animate-ping"></div>
                  )}
                </div>

                {/* Titre de l'étape */}
                <div className="text-center px-2">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider block ${isActive || isCompleted
                      ? 'text-[#40e0d0]'
                      : 'text-gray-400'
                      }`}
                  >
                    Étape {step.number}
                  </span>
                  <h4
                    className={`text-sm font-bold mt-1 hidden md:block ${isActive || isCompleted ? 'text-gray-800' : 'text-gray-500'
                      }`}
                    style={{ maxWidth: '120px' }}
                  >
                    {step.title}
                  </h4>
                </div>

                {/* Indicateur d'étape active */}
                {isActive && (
                  <div className="absolute -bottom-6">
                    <div className="w-2 h-2 bg-[#40e0d0] rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Indicateur de progression mobile */}
        <div className="mt-8">
          <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#40e0d0] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            >
              <div className="h-full w-1/3 bg-white/30 animate-shimmer"></div>
            </div>
          </div>
          <div className="text-center mt-4">
            <span className="text-sm font-semibold text-[#40e0d0]">
              Étape {currentStep} : {steps[currentStep - 1]?.title}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <ErrorMessage message={error} />}

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Informations Personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Nom" required error={fieldErrors.firstName}>
                <CustomInput
                  placeholder="Votre nom"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  error={!!fieldErrors.firstName}
                />
              </InputGroup>

              <InputGroup label="Prénom" required error={fieldErrors.lastName}>
                <CustomInput
                  placeholder="Votre prénom"
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

              <InputGroup label="Téléphone" required error={fieldErrors.phone}>
                <CustomInput
                  placeholder="+33 1 23 45 67 89"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  error={!!fieldErrors.phone}
                />
              </InputGroup>
            </div>

            <InputGroup label="Adresse">
              <CustomTextarea
                placeholder="Votre adresse comptète"
                value={formData.adresse}
                onChange={(e) =>
                  setFormData({ ...formData, adresse: e.target.value })
                }
                rows={3}
              />
            </InputGroup>
          </div>
        )}

        {/* Step 2: Dates */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Dates de Séjour
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Date de début" required error={fieldErrors.startDate}>
                <CustomInput
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  error={!!fieldErrors.startDate}
                  min={new Date().toISOString().split('T')[0]}
                />
              </InputGroup>

              <InputGroup label="Date de fin" required error={fieldErrors.endDate}>
                <CustomInput
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  error={!!fieldErrors.endDate}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                />
              </InputGroup>
            </div>
          </div>
        )}

        {/* Step 3: Participants */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Participants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup
                label="Adultes"
                required
                error={fieldErrors.adultes}
              >
                <CustomInput
                  type="number"
                  min="1"
                  value={formData.adultes}
                  onChange={(e) =>
                    setFormData({ ...formData, adultes: e.target.value })
                  }
                  error={!!fieldErrors.adultes}
                />
                <p className="text-sm text-gray-500 mt-1">Âge 18+</p>
              </InputGroup>

              <InputGroup
                label="Enfants"
                error={fieldErrors.enfants}
              >
                <CustomInput
                  type="number"
                  min="0"
                  value={formData.enfants}
                  onChange={(e) =>
                    setFormData({ ...formData, enfants: e.target.value })
                  }
                  error={!!fieldErrors.enfants}
                />
                <p className="text-sm text-gray-500 mt-1">Âge 2-17 ans</p>
              </InputGroup>

              <InputGroup
                label="Bébés"
                error={fieldErrors.bebes}
              >
                <CustomInput
                  type="number"
                  min="0"
                  value={formData.bebes}
                  onChange={(e) =>
                    setFormData({ ...formData, bebes: e.target.value })
                  }
                  error={!!fieldErrors.bebes}
                />
                <p className="text-sm text-gray-500 mt-1">Moins de 2 ans</p>
              </InputGroup>
            </div>

            <InputGroup label="Demandes Spéciales">
              <CustomTextarea
                placeholder="Allergies, régimes spéciaux, besoins particuliers..."
                value={formData.specialRequests}
                onChange={(e) =>
                  setFormData({ ...formData, specialRequests: e.target.value })
                }
                rows={3}
              />
            </InputGroup>
          </div>
        )}

        {/* Step 4: Accommodation */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Hébergement
            </h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Checkbox
                  id="needsAccommodation"
                  checked={needsAccommodation}
                  onCheckedChange={(checked: boolean) => {
                    setNeedsAccommodation(checked as boolean);
                    if (!checked) {
                      setFormData({ ...formData, accommodationType: '' });
                    }
                  }}
                />
                <Label htmlFor="needsAccommodation" className="text-lg cursor-pointer">
                  J'ai besoin d'un hébergement
                </Label>
              </div>

              {needsAccommodation && (
                <div className="space-y-4 mt-6">
                  <h4 className="font-medium text-gray-700">Type d'hébergement</h4>
                  {fieldErrors.accommodationType && (
                    <p className="text-sm text-red-500">{fieldErrors.accommodationType}</p>
                  )}

                  <RadioGroup
                    value={formData.accommodationType}
                    onValueChange={(value: string) =>
                      setFormData({ ...formData, accommodationType: value })
                    }
                    className="space-y-3"
                  >
                    {accommodationTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.accommodationType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => setFormData({ ...formData, accommodationType: type.id })}
                      >
                        <RadioGroupItem value={type.id} id={type.id} />
                        <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-800">{type.label}</div>
                          <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="px-6 flex items-center bg-gray-100 hover:bg-gray-200 hover:text-gray-600 gap-2 cursor-pointer"
            >
              <ArrowLeft />
              Précédent
            </Button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 && (
            <Button
              type="button"
              onClick={nextStep}
              className="px-8 bg-[#40e0d0] hover:bg-[#40e0d0] flex items-center gap-2 cursor-pointer"
            >
              Suivant
              <ArrowRight />
            </Button>
          )}
          {currentStep === 4 && (
            <Button
              type="submit"
              disabled={loading}
              className="px-8 bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              {loading ? (
                <>
                  <LoaderSmall /> Création de la réservation...
                </>
              ) : (
                <>
                  <Check /> Finaliser la réservation
                </>
              )}
            </Button>
          )}
        </div>

        {/* Step Indicator */}
        <div className="text-center text-sm text-gray-500">
          Étape {currentStep} sur 4
        </div>
      </form>
    </div>
  );
}