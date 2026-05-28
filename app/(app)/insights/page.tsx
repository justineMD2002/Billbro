'use client';
import { InsightsScreen } from '@/components/screens/InsightsScreen';
import { WebInsightsView } from '@/components/web/WebInsightsView';
export default function InsightsPage() {
  return (
    <>
      <div className="mobile-view"><InsightsScreen /></div>
      <div className="web-view"><WebInsightsView /></div>
    </>
  );
}
