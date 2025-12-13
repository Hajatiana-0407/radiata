'use client';

import { useState } from 'react';
import { Destination } from '@/lib/types';
import { CustomInput } from '@/components/ui/custom-input';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { CustomSelect } from '@/components/ui/custom-select';
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

interface DestinationFormProps {
  destination?: Destination;
  onSubmit: (data: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>) => void;
  loading: boolean;
  error: string | null;
}

export function DestinationForm({
  destination,
  onSubmit,
  loading,
  error,
}: DestinationFormProps) {
  const [formData, setFormData] = useState({
    name: destination?.name || '',
    description: destination?.description || '',
    image: destination?.image || '',
    price: destination?.price.toString() || '',
    difficulty: destination?.difficulty || 'moderate',
    duration: destination?.duration.toString() || '',
    location: destination?.location || '',
    highlights: destination?.highlights.join('\n') || '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.image.trim()) errors.image = 'Image URL is required';
    if (!formData.price || parseFloat(formData.price) <= 0)
      errors.price = 'Valid price is required';
    if (!formData.duration || parseInt(formData.duration) <= 0)
      errors.duration = 'Valid duration is required';
    if (!formData.location.trim()) errors.location = 'Location is required';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
      name: formData.name,
      description: formData.description,
      image: formData.image,
      price: parseFloat(formData.price),
      difficulty: formData.difficulty as 'easy' | 'moderate' | 'hard',
      duration: parseInt(formData.duration),
      location: formData.location,
      highlights: formData.highlights
        .split('\n')
        .map((h) => h.trim())
        .filter((h) => h),
    } as any);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage message={error} />}

      <InputGroup label="Destination Name" required error={fieldErrors.name}>
        <CustomInput
          placeholder="e.g., Mountain Peak Trail"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          error={!!fieldErrors.name}
        />
      </InputGroup>

      <InputGroup label="Description" required error={fieldErrors.description}>
        <CustomTextarea
          placeholder="Describe this destination..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          error={!!fieldErrors.description}
        />
      </InputGroup>

      <InputGroup label="Image URL" required error={fieldErrors.image}>
        <CustomInput
          placeholder="https://example.com/image.jpg"
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
          error={!!fieldErrors.image}
        />
      </InputGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Price ($)" required error={fieldErrors.price}>
          <CustomInput
            type="number"
            step="0.01"
            placeholder="1999"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            error={!!fieldErrors.price}
          />
        </InputGroup>

        <InputGroup label="Duration (hours)" required error={fieldErrors.duration}>
          <CustomInput
            type="number"
            placeholder="8"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            error={!!fieldErrors.duration}
          />
        </InputGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Difficulty" required>
          <CustomSelect
            value={formData.difficulty}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: e.target.value })
            }
            options={[
              { value: 'easy', label: 'Easy' },
              { value: 'moderate', label: 'Moderate' },
              { value: 'hard', label: 'Hard' },
            ]}
          />
        </InputGroup>

        <InputGroup label="Location" required error={fieldErrors.location}>
          <CustomInput
            placeholder="e.g., Colorado, USA"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            error={!!fieldErrors.location}
          />
        </InputGroup>
      </div>

      <InputGroup label="Highlights (one per line)">
        <CustomTextarea
          placeholder="Amazing views&#10;Wildlife spotting&#10;Expert guides"
          value={formData.highlights}
          onChange={(e) =>
            setFormData({ ...formData, highlights: e.target.value })
          }
        />
      </InputGroup>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <LoaderSmall /> Saving...
            </>
          ) : destination ? (
            'Update Destination'
          ) : (
            'Create Destination'
          )}
        </Button>
      </div>
    </form>
  );
}
