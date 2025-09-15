// frontend/pages/auth/callback.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TikTokCallback() {
  const router = useRouter();

  useEffect(() => {
    const { token, open_id } = router.query;

    if (token && open_id) {
      localStorage.setItem('tendioo_access_token', token as string);
      localStorage.setItem('tendioo_open_id', open_id as string);
      router.replace('/dashboard'); // redirige al dashboard
    }
  }, [router.query]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
      <h1 className="text-2xl font-bold">Iniciando sesión...</h1>
    </div>
  );
}
