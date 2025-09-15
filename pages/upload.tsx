import { useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');

  // const handleUpload = async () => {
  //   if (!file) return;
  //   const formData = new FormData();
  //   formData.append('video', file as any);
  //   formData.append('description', description);
  //   formData.append('hashtags', JSON.stringify(hashtags.split(',')));
  //   formData.append('access_token', 'TOKEN_USUARIO'); // token de backend
  //   formData.append('open_id', 'OPEN_ID_USUARIO');

  //   const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/posts/upload`, formData,{ headers: { 'Content-Type': 'multipart/form-data' } });
  //   alert('Publicado: ' + JSON.stringify(res.data));
  // };
const handleUpload = async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append('video', file); // nombre = 'video'
  formData.append('description', description);
  formData.append('hashtags', JSON.stringify(hashtags.split(',').map(h => h.trim())));
  formData.append('access_token', 'TOKEN_USUARIO'); 
  formData.append('open_id', 'OPEN_ID_USUARIO');

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/upload`,
      formData
    );
    alert('Publicado: ' + JSON.stringify(res.data));
  } catch (err: any) {
    console.error('Error upload:', err.response?.data || err.message);
    alert('Error al subir video: ' + (err.response?.data?.error || err.message));
  }
};

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Subir y publicar video</h1>
      <input type="file" accept="video/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <input type="text" placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} className="block mt-2 p-2 border" />
      <input type="text" placeholder="Hashtags separados por coma" value={hashtags} onChange={e => setHashtags(e.target.value)} className="block mt-2 p-2 border" />
      <button onClick={handleUpload} className="mt-4 p-2 bg-blue-500 text-white rounded">Publicar</button>
    </div>
  );
}
