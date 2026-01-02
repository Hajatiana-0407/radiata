'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BarChart3, MapPin, CalendarCheck, Settings, LogOut } from 'lucide-react';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { logoutAdmin } from '@/store/slices/authSlice';

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: BarChart3 },
  { label: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { label: 'Reservations', href: '/admin/reservations', icon: CalendarCheck },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    window.location.href = '/';
  };

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-border bg-background">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 space-y-2 border-t border-border pt-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
