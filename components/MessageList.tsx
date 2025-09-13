// tendioo/frontend/components/MessageList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Message = {
  id: string;
  from: string;
  text: string;
  createdAt?: string;
};

const MessageList: React.FC<{ accessToken?: string }> = ({ accessToken }) => {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [replyText, setReplyText] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [accessToken]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/messages`, {
        params: { access_token: accessToken || localStorage.getItem('tendioo_access_token') }
      });
      // Adaptar según respuesta real
      setMsgs((res.data.data && res.data.data.messages) || res.data.messages || []);
    } catch (err) {
      console.log('fetch messages error', err);
    }
  };

  const sendReply = async () => {
    if (!selected) return alert('Selecciona un mensaje');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/messages/reply`, {
        access_token: accessToken || localStorage.getItem('tendioo_access_token'),
        message_id: selected,
        text: replyText
      });
      setReplyText('');
      fetchMessages();
    } catch (err) {
      alert('Error reply');
    }
  };

  return (
    <div className="bg-white/5 p-4 rounded">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <h4 className="font-semibold">Conversaciones</h4>
          <ul>
            {msgs.map(m => (
              <li key={m.id} className={`p-2 cursor-pointer ${selected === m.id ? 'bg-white/10' : ''}`} onClick={() => setSelected(m.id)}>
                <div className="font-medium">{m.from}</div>
                <div className="text-sm text-gray-300 truncate">{m.text}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          <h4 className="font-semibold">Lectura / Responder</h4>
          {selected ? (
            <>
              <div className="h-40 p-2 border rounded overflow-auto mb-2">
                {msgs.find(m => m.id === selected)?.text}
              </div>
              <textarea value={replyText} onChange={e => setReplyText(e.target.value)} className="w-full p-2 mb-2" />
              <button onClick={sendReply} className="bg-blue-600 px-4 py-2 rounded">Enviar respuesta</button>
            </>
          ) : (
            <div className="text-gray-400">Selecciona un mensaje</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageList;
