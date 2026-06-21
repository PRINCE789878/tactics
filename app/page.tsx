'use client';

import { useAuth } from '@/app/context/auth-context';
import { LoginPage } from '@/components/login-page';
import { DashboardPage } from '@/components/dashboard-page';

export default function Page() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <DashboardPage /> : <LoginPage />;
}
