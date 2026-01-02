'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-selector';
import { fetchDashboardStats } from '@/store/slices/dashboardSlice';
import { Loader } from '@/components/ui/loader';
import { SkeletonCard } from '@/components/ui/skeleton';
import { BarChart3, MapPin, CalendarCheck, DollarSign } from 'lucide-react';

export default function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const { stats, loading, error } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats() as any);
  }, [dispatch]);

  const statCards = [
    {
      icon: MapPin,
      label: 'Total Destinations',
      value: stats?.totalDestinations || 0,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: CalendarCheck,
      label: 'Total Reservations',
      value: stats?.totalReservations || 0,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: BarChart3,
      label: 'Contact Messages',
      value: stats?.totalContacts || 0,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: DollarSign,
      label: 'Revenue (This Month)',
      value: `$${stats?.revenueThisMonth || 0}`,
      color: 'bg-yellow-100 text-yellow-600',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the Radiata Explorer admin panel
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-lg bg-muted animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg p-3 ${card.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {card.label}
                    </p>
                    <p className="text-2xl font-bold mt-1">{card.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/admin/destinations"
                className="text-primary hover:underline"
              >
                → Manage Destinations
              </a>
            </li>
            <li>
              <a
                href="/admin/reservations"
                className="text-primary hover:underline"
              >
                → View Reservations
              </a>
            </li>
            <li>
              <a href="/admin/settings" className="text-primary hover:underline">
                → Site Settings
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <p className="text-sm text-muted-foreground">
            No recent activity to display. Visit the destinations or reservations
            pages to manage your content.
          </p>
        </div>
      </div>
    </div>
  );
}
