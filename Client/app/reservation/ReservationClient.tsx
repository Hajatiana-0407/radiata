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
            <ReservationForm destinationId={destinationId} />
            <Footer />
        </>
    );
}
