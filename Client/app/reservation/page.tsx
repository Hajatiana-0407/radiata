import { Suspense } from 'react';
import ReservationClient from './ReservationClient';

export default function ReservationPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ReservationClient />
    </Suspense>
  );
}