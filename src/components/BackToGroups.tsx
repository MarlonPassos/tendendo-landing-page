'use client';

import { ArrowUp } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function BackToGroups() {
  const pathname = usePathname();

  return (
    <a className="footer-back-link" href={pathname === '/' ? '#grupos' : '/#grupos'}>
      <ArrowUp size={16} aria-hidden="true" /> Voltar aos grupos
    </a>
  );
}
