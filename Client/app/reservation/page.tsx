'use client';

import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ReservationForm } from '@/components/forms/reservation-form';

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const destinationId = searchParams.get('destinationId') || '';

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Book Your Adventure</h1>
            <p className="text-muted-foreground">
              Fill in your details to reserve your spot on this amazing journey
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8">
            <ReservationForm destinationId={destinationId} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
