'use client';
import { LoansScreen } from '@/components/screens/LoansScreen';
import { WebLoansView } from '@/components/web/WebLoansView';
export default function LoansPage() {
  return (
    <>
      <div className="mobile-view"><LoansScreen /></div>
      <div className="web-view"><WebLoansView /></div>
    </>
  );
}
