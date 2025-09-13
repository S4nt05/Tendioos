// tendioo/frontend/pages/login.tsx
import React from 'react';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    // Redirige al backend que inicia OAuth con TikTok
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/auth/login`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="p-8 rounded-lg shadow-lg bg-gray-800/60">
        <h1 className="text-2xl font-bold mb-4">Iniciar sesión con TikTok</h1>
        <p className="mb-6 text-gray-300">Conecta tu cuenta para gestionar publicaciones y mensajes.</p>
        <button onClick={handleLogin} className="bg-blue-500 px-6 py-3 rounded-lg font-semibold">
          Iniciar con TikTok
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
