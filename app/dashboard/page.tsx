'use client';

import { useAuth } from '@/app/context/auth-context';
import { LoginPage } from '@/components/login-page';
import { DashboardPage } from '@/components/dashboard-page';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRoute() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <DashboardPage /> : null;
}
