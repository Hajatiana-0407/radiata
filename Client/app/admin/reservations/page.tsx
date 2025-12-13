'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-selector';
import { fetchAdminReservations, updateReservationStatus, resetAction } from '@/store/slices/adminReservationsSlice';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { CustomSelect } from '@/components/ui/custom-select';
import { Badge } from '@/components/ui/badge';
import { SuccessMessage } from '@/components/ui/success-message';
import { CalendarCheck, Mail, User } from 'lucide-react';

export default function AdminReservationsPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error, actionSuccess } = useAppSelector(
    (state) => state.adminReservations
  );
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    dispatch(fetchAdminReservations() as any);
  }, [dispatch]);

  const handleStatusChange = (reservationId: string, newStatus: string) => {
    dispatch(updateReservationStatus({ id: reservationId, status: newStatus }) as any);
  };

  const handleDismissSuccess = () => {
    dispatch(resetAction());
  };

  const filteredItems = statusFilter
    ? items.filter((item) => item.status === statusFilter)
    : items;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reservations</h1>
        <p className="text-muted-foreground mt-1">
          Manage customer reservations and track status
        </p>
      </div>

      {actionSuccess && (
        <SuccessMessage
          message="Reservation updated successfully!"
          onDismiss={handleDismissSuccess}
        />
      )}

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="text-sm font-medium mb-2 block">Filter by Status</label>
        <CustomSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: '', label: 'All Status' },
            { value: 'pending', label: 'Pending' },
            { value: 'confirmed', label: 'Confirmed' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
        />
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <Loader />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 rounded-lg border border-border bg-card">
          <CalendarCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">
            {statusFilter ? 'No reservations with this status' : 'No reservations yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((reservation) => (
            <div
              key={reservation.id}
              className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold">
                      {reservation.firstName} {reservation.lastName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${reservation.email}`} className="hover:text-primary">
                      {reservation.email}
                    </a>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    <strong>Phone:</strong> {reservation.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm mb-2">
                    <strong>Destination:</strong> {reservation.destination?.name || 'N/A'}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Dates:</strong> {new Date(reservation.startDate).toLocaleDateString()} -{' '}
                    {new Date(reservation.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <strong>People:</strong> {reservation.numberOfPeople}
                  </p>
                </div>
              </div>

              {reservation.specialRequests && (
                <div className="mb-4 p-3 bg-muted rounded text-sm">
                  <strong className="text-muted-foreground">Requests:</strong> {reservation.specialRequests}
                </div>
              )}

              <div className="flex items-center gap-4">
                <Badge
                  label={reservation.status}
                  variant={
                    reservation.status === 'confirmed'
                      ? 'secondary'
                      : reservation.status === 'cancelled'
                      ? 'destructive'
                      : 'primary'
                  }
                />

                <select
                  value={reservation.status}
                  onChange={(e) =>
                    handleStatusChange(reservation.id, e.target.value)
                  }
                  className="text-sm border border-input rounded px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
