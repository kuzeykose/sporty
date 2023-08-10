'use client';

import React from 'react';
import { LargeSidebar } from '@/components/sidebar-large';
import { SmallSidebar } from '@/components/sidebar-small';
import { useParams } from 'next/navigation';

export default function DashboardHeader() {
  const params = useParams();

  return params.programId ? <SmallSidebar className="flex flex-col justify-between min-w-fit" /> : <LargeSidebar />;
}
