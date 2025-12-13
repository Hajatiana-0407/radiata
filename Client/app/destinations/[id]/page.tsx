'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-selector';
import { fetchDestinationById } from '@/store/slices/destinationDetailSlice';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Loader } from '@/components/ui/loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, AlertCircle } from 'lucide-react';

export default function DestinationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { destination, loading, error } = useAppSelector(
    (state) => state.destinationDetail
  );

  const id = params.id as string;

  useEffect(() => {
    if (id) {
      dispatch(fetchDestinationById(id) as any);
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex items-center justify-center min-h-screen">
          <Loader />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !destination) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <div className="flex gap-3 items-start p-4 rounded-lg bg-destructive/10 border border-destructive/20 mb-6">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-destructive font-semibold">Error</p>
                <p className="text-sm text-destructive/80">{error || 'Destination not found'}</p>
              </div>
            </div>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div
          className="relative h-96 w-full bg-muted"
          style={{
            backgroundImage: `url('${destination.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <Badge label={destination.difficulty} variant="primary" />
          </div>

          <h1 className="text-4xl font-bold mb-4">{destination.name}</h1>

          <div className="flex flex-wrap gap-6 mb-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{destination.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{destination.duration} hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Group tours available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {destination.description}
                </p>
              </section>

              {destination.highlights.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                  <ul className="space-y-2">
                    {destination.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-muted-foreground"
                      >
                        <span className="text-primary font-bold">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div>
              <div className="rounded-lg border border-border bg-card sticky top-20 p-6">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                  <p className="text-4xl font-bold text-primary">
                    ${destination.price}
                  </p>
                </div>

                <Button
                  onClick={() =>
                    router.push(
                      `/reservation?destinationId=${destination.id}`
                    )
                  }
                  className="w-full mb-3"
                >
                  Reserve Now
                </Button>

                <Button variant="outline" className="w-full">
                  Contact Us
                </Button>

                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-semibold mb-3">Practical Info</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span className="font-medium capitalize">
                        {destination.difficulty}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">
                        {destination.duration}h
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
