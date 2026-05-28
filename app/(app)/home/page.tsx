'use client';
import { DashboardScreen } from '@/components/screens/DashboardScreen';
import { WebDashboardView } from '@/components/web/WebDashboardView';
export default function HomePage() {
  return (
    <>
      <div className="mobile-view"><DashboardScreen /></div>
      <div className="web-view"><WebDashboardView /></div>
    </>
  );
}
