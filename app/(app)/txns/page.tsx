'use client';
import { TransactionsScreen } from '@/components/screens/TransactionsScreen';
import { WebActivityView } from '@/components/web/WebActivityView';
export default function TxnsPage() {
  return (
    <>
      <div className="mobile-view"><TransactionsScreen /></div>
      <div className="web-view"><WebActivityView /></div>
    </>
  );
}
