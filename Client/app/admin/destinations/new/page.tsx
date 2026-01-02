'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-dispatch';
import { createDestination, resetAction } from '@/store/slices/adminDestinationsSlice';
import { DestinationForm } from '@/components/forms/destination-form';
import { SuccessMessage } from '@/components/ui/success-message';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function NewDestinationPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { actionLoading, actionError, actionSuccess } = useAppSelector(
    (state) => state.adminDestinations
  );

  const handleSubmit = async (data: any) => {
    const result = await dispatch(createDestination(data) as any);
    if (result.meta.requestStatus === 'fulfilled') {
      setTimeout(() => {
        router.push('/admin/destinations');
      }, 1500);
    }
  };

  const handleDismissSuccess = () => {
    dispatch(resetAction());
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Destination</h1>
          <p className="text-muted-foreground mt-1">
            Add a new destination to your catalog
          </p>
        </div>
      </div>

      {actionSuccess && (
        <SuccessMessage
          message="Destination created successfully! Redirecting..."
          onDismiss={handleDismissSuccess}
        />
      )}

      <div className="max-w-2xl">
        <div className="rounded-lg border border-border bg-card p-8">
          <DestinationForm
            onSubmit={handleSubmit}
            loading={actionLoading}
            error={actionError}
          />
        </div>
      </div>
    </div>
  );
}
