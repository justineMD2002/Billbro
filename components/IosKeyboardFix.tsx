'use client';

import { useEffect } from 'react';

// iOS PWA (standalone mode) doesn't show the keyboard when tapping inputs
// unless the body is registered as a touch-interactive element.
// Setting ontouchstart="" on the body is the canonical fix.
export function IosKeyboardFix() {
  useEffect(() => {
    document.body.setAttribute('ontouchstart', '');
  }, []);
  return null;
}
