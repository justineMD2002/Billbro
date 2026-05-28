'use client';

import { WalletBro } from '@/components/mascot/WalletBro';

export function LandingMascot() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
      <WalletBro expression="coaching" size={140} accent="#A88BFF" accentDark="#7B5BE0" pop="#FF7A45" />
    </div>
  );
}
