'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { TabBar } from '@/components/ui/TabBar';
import { Sidebar } from '@/components/ui/Sidebar';
import { AddSheet } from '@/components/screens/AddSheet';
import { WebTopBar } from '@/components/web/WebTopBar';

function AppShell({ children }: { children: React.ReactNode }) {
  const { T } = useTheme();
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const tabFromPath = () => {
    if (pathname.includes('/txns')) return 'txns';
    if (pathname.includes('/insights')) return 'insights';
    if (pathname.includes('/budgets')) return 'budgets';
    if (pathname.includes('/loans')) return 'loans';
    if (pathname.includes('/settings')) return 'settings';
    return 'home';
  };

  function handleTabChange(id: string) {
    if (id === 'add') { setSheetOpen(true); return; }
    setSheetOpen(false);
    const routes: Record<string, string> = {
      home: '/home',
      txns: '/txns',
      insights: '/insights',
      budgets: '/budgets',
      loans: '/loans',
      settings: '/settings',
    };
    router.push(routes[id] ?? '/home');
  }

  return (
    <div className="fixed inset-0" style={{ background: T.bg }}>
      <div className="h-full w-full flex flex-col md:flex-row overflow-hidden">

        {/* hidden on mobile, shown on desktop */}
        <div className="hidden md:flex md:w-[220px] md:shrink-0 md:h-full">
          <Sidebar onAdd={() => setSheetOpen(true)} />
        </div>

        {/* Main area: content + tab bar */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0 relative" style={{ background: T.bg }}>
          <WebTopBar />

          <div className="flex-1 overflow-y-auto overscroll-none" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="md:max-w-[720px] md:mx-auto md:px-2">
              {children}
            </div>
          </div>

          {sheetOpen && <AddSheet onClose={() => setSheetOpen(false)} />}

          <div
            className="md:hidden shrink-0 relative"
            style={{
              height: 'calc(80px + env(safe-area-inset-bottom, 0px))',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            <TabBar
              active={sheetOpen ? 'add' : tabFromPath()}
              onChange={handleTabChange}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppShell>{children}</AppShell>
    </ThemeProvider>
  );
}
