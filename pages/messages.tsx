// tendioo/frontend/pages/messages.tsx
import React from 'react';
import MessageList from '../components/MessageList';

export default function MessagesPage() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('tendioo_access_token') || '' : '';
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bandeja de Mensajes</h1>
      <MessageList accessToken={token} />
    </div>
  );
}
