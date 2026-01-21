'use client';

import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ReservationForm } from '@/components/forms/reservation-form';

export default function ReservationClient() {
    const searchParams = useSearchParams();
    const destinationId = searchParams.get('destinationId') || '';

    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <ReservationForm destinationId={destinationId} />
            </div>
            <Footer />
        </>
    );
}
