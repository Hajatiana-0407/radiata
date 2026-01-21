import { Suspense } from 'react';
import ReservationClient from './ReservationClient';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Loading from '../destinations/loading';

export default function ReservationPage() {
  return (
    <Suspense fallback={<main>
      <Navbar />
      <Loading />
      <Footer />
    </main>}>
      <ReservationClient />
    </Suspense>
  );
}