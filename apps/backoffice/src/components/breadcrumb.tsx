'use client';

import React, { useEffect } from 'react';
import { Program } from '@/constants/Programs.type';
import { useLayoutContext } from './layout-provider';
import { usePathname } from 'next/navigation';

export default function Breadcrumb({ program }: { program: Program }) {
  const pathname = usePathname();
  const layoutContext = useLayoutContext();

  useEffect(() => {
    program && layoutContext.setProgram({ name: program.name, id: program.id });
  }, []);

  return (
    <div className="h-12 w-full border-b text-sm flex flex-none items-center justify-between px-7 capitalize">
      {pathname
        .split('/')
        .slice(3)
        .join(' / ')
        .replace(program.id, program.name)
        .replace(layoutContext.plan.id, layoutContext.plan.name)}
    </div>
  );
}
