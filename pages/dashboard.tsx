// tendioo/frontend/pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import VideoUploader from '../components/VideoUploader';
import MessageList from '../components/MessageList';
import TikTokStats from './TikTokStats';

type PostItem = {
  id: string;
  description: string;
  status: string;
  publishAt?: string;
  hashtags?: string[];
  createdAt?: string;
};

export default function Dashboard() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [accessToken, setAccessToken] = useState<string>('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // carga token desde localStorage si lo guardaste en auth/callback
    const t = localStorage.getItem('tendioo_access_token');
    if (t) setAccessToken(t);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/posts/local/list`); // endpoint local para listar posts guardados (backend debe exponerlo si quieres)
      setPosts(res.data || []);
    } catch (err) {
      console.log('no local posts', err);
    }
  };

  useEffect(() => {
    // tomar token y open_id de la URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const open_id = params.get('open_id');

    
    if(!localStorage.getItem('tendioo_access_token'))
      localStorage.setItem('tendioo_access_token',token as string);
    if(!localStorage.getItem('tendioo_open_id'))
      localStorage.setItem('tendioo_open_id', open_id as string);

    if (token && open_id) {
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user-info?token=${token}&open_id=${open_id}`
      ).then(res => {
        setUser(res.data.data.user); // TikTok responde en data.data.user
      }).catch(console.error);
    }
  }, []);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard Tendioo</h2>
        
      {user ? (
        <div>
          <img src={user.avatar_url} alt={user.display_name} width={50}/>
          <p>{user.display_name}</p>
        </div>
      ) : (
        <p>Cargando usuario...</p>
      )}
        <div>
          <Link href="/upload">
            <button className="bg-green-500 px-4 py-2 rounded mr-2">Subir Video</button>
          </Link>
          <Link href="/messages">
            <button className="bg-blue-500 px-4 py-2 rounded">Mensajes</button>
          </Link>
        </div>
      </header>

      <section className="mb-6">
        <h3 className="font-semibold mb-2">Subir / Programar</h3>
        <VideoUploader accessToken={accessToken} />
      </section>

      <section>
        <h3 className="font-semibold mb-2">Publicaciones guardadas</h3>
        <div className="bg-white/5 p-4 rounded">
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Status</th>
                <th>Programado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id} className="border-t border-white/5">
                  <td>{p.description}</td>
                  <td>{p.status}</td>
                  <td>{p.publishAt || '-'}</td>
                  <td>
                    {/* Acciones: editar, eliminar, publicar ahora */}
                    <button className="mr-2">Editar</button>
                    <button>Publicar ahora</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="font-semibold mb-2">Mensajes</h3>
        <MessageList accessToken={accessToken} />
      </section>
      
      {/* <section className="mt-8">
        <h3 className="font-semibold mb-2">Estadisticas</h3>
        <TikTokStats accessToken={accessToken} />
      </section> */}
    </div>
  );
}
