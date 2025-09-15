// tendioo/frontend/components/VideoUploader.tsx
import React, { useState } from 'react';
import axios from 'axios';

type Props = { accessToken?: string };

const VideoUploader: React.FC<Props> = ({ accessToken }) => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [scheduleAt, setScheduleAt] = useState<string>('');

  const upload = async () => {
    if (!file) return alert('Selecciona un archivo');
    // Si tu backend espera multipart/form-data:
    const fd = new FormData();
    fd.append('video', file);
    fd.append('description', description);
    fd.append('hashtags', hashtags);
    fd.append('access_token', accessToken || '');
    fd.append('open_id', localStorage.getItem('tendioo_open_id') || '');

    // Si deseas programar, guardamos en DB (endpoint /api/posts/schedule)
    if (scheduleAt) {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/posts/schedule`, {
        description, hashtags: hashtags.split(',').map(h => h.trim()), publishAt: scheduleAt,
        // IMPORTANT: en producción guarda file en S3 o storage y pasa path al job
        // aquí asumimos backend puede recibir file multipart en /schedule endpoint
      }, { headers: { 'Content-Type': 'application/json' }});
      alert('Programado');
      return;
    }

    // Publicación directa: endpoint backend que hace upload -> publish
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/posts/upload`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Publicado: ' + JSON.stringify(res.data));
    } catch (err: any) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="bg-white/5 p-4 rounded">
      <input type="file" accept="video/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <input className="block mt-2 p-2 w-full" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" />
      <input className="block mt-2 p-2 w-full" value={hashtags} onChange={e => setHashtags(e.target.value)} placeholder="Hashtags separados por coma" />
      <label className="block mt-2 text-sm">Programar (opcional)</label>
      <input type="datetime-local" className="block mt-1 p-2" value={scheduleAt} onChange={e => setScheduleAt(e.target.value)} />
      <button onClick={upload} className="mt-3 bg-indigo-600 px-4 py-2 rounded">Subir / Publicar</button>
    </div>
  );
};

export default VideoUploader;
