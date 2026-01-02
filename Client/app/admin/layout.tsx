'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/use-app-selector';
import { AdminSidebar } from '@/components/layout/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      router.push('/admin/login');
    }
  }, [token, user, router]);

  if (!token || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 md:ml-64">
        <div className="h-16 border-b border-border"></div>
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
