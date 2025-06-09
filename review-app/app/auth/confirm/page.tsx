// app/confirm/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ConfirmPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const hash = url.hash;
    const params = new URLSearchParams(hash.substring(1));
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');

    if (access_token && refresh_token) {
      supabase.auth.setSession({
        access_token,
        refresh_token,
      }).then(() => {
        router.push('/dashboard'); // or wherever
      });
    } else {
      console.log('Missing tokens');
    }
  }, []);

  return <p>Confirming your email...</p>;
}
