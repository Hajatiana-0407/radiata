'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-selector';
import { fetchAdminDestinations } from '@/store/slices/adminDestinationsSlice';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Plus, MapPin } from 'lucide-react';

export default function AdminDestinationsPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state) => state.adminDestinations
  );

  useEffect(() => {
    dispatch(fetchAdminDestinations() as any);
  }, [dispatch]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Destinations</h1>
          <p className="text-muted-foreground mt-1">
            Manage your travel destinations
          </p>
        </div>
        <Link href="/admin/destinations/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Destination
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 flex justify-center">
          <Loader />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 rounded-lg border border-border bg-card">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground mb-4">No destinations yet</p>
          <Link href="/admin/destinations/new">
            <Button>Create First Destination</Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((destination) => (
                  <tr key={destination.id} className="hover:bg-muted">
                    <td className="px-6 py-4 text-sm font-medium">
                      {destination.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {destination.location}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge
                        label={destination.difficulty}
                        variant="primary"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      ${destination.price}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/destinations/${destination.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/destinations/${destination.id}/delete`}>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
