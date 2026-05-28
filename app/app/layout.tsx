'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { TabBar } from '@/components/ui/TabBar';
import { Sidebar } from '@/components/ui/Sidebar';
import { AddSheet } from '@/components/screens/AddSheet';

function AppShell({ children }: { children: React.ReactNode }) {
  const { T } = useTheme();
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const tabFromPath = () => {
    if (pathname.includes('/txns')) return 'txns';
    if (pathname.includes('/insights')) return 'insights';
    if (pathname.includes('/cats')) return 'cats';
    return 'home';
  };

  function handleTabChange(id: string) {
    if (id === 'add') { setSheetOpen(true); return; }
    setSheetOpen(false);
    router.push(`/app/${id === 'home' ? 'home' : id}`);
  }

  return (
    <div className="app-shell-bg" style={{ position: 'fixed', inset: 0, background: T.bg }}>
      <div className="app-shell-frame" style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Sidebar — hidden on mobile, shown on desktop via CSS */}
        <div className="app-sidebar-slot" style={{ display: 'none' }}>
          <Sidebar onAdd={() => setSheetOpen(true)} />
        </div>

        {/* Main area: content + tab bar */}
        <div className="app-main-area" style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          overflow: 'hidden', minHeight: 0,
          position: 'relative', background: T.bg,
        }}>
          {/* Scrollable content */}
          <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'none' }}>
            <div className="screen-content-wrap">
              {children}
            </div>
          </div>

          {/* Add sheet overlay — positioned inside main area */}
          {sheetOpen && <AddSheet onClose={() => setSheetOpen(false)} />}

          {/* Tab bar — hidden on desktop via CSS */}
          <div className="app-tab-bar-wrap" style={{
            flexShrink: 0, position: 'relative',
            height: 'calc(80px + env(safe-area-inset-bottom, 0px))',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}>
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
