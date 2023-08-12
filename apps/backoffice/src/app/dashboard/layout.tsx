import React from 'react';
import DashboardHeader from '@/components/dashboard-header';
import DashboardBreadcrumb from '@/components/dashboard-breadcrumb';

export default async function DashboardLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">
      <DashboardHeader />
      <div className="flex flex-col w-full">
        <DashboardBreadcrumb />
        <div className="w-full h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
