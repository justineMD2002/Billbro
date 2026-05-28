'use client';
import { BudgetsScreen } from '@/components/screens/BudgetsScreen';
import { WebBudgetsView } from '@/components/web/WebBudgetsView';
export default function BudgetsPage() {
  return (
    <>
      <div className="mobile-view"><BudgetsScreen /></div>
      <div className="web-view"><WebBudgetsView /></div>
    </>
  );
}
