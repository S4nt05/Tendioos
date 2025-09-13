// // frontend/pages/schedule.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import PostList from '../components/PostList';

// type PostItem = {
//   id: string;
//   description: string;
//   status: string;
//   publishAt?: string;
//   hashtags?: string[];
// };

// export default function SchedulePage() {
//   const [posts, setPosts] = useState<PostItem[]>([]);
//   const accessToken = typeof window !== 'undefined' ? localStorage.getItem('tendioo_access_token') || '' : '';

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/posts/schedule`, {
//         params: { access_token: accessToken }
//       });
//       setPosts(res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const updatePost = async (post: PostItem) => {
//     try {
//       await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/posts/schedule/${post.id}`, post, {
//         headers: { 'Content-Type': 'application/json' }
//       });
//       fetchPosts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deletePost = async (post: PostItem) => {
//     try {
//       await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/posts/schedule/${post.id}`);
//       fetchPosts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Publicaciones Programadas</h1>
//       <PostList posts={posts} onUpdate={updatePost} />
//       <div className="mt-4">
//         {posts.map(p => (
//           <button
//             key={p.id}
//             className="bg-red-500 px-3 py-1 rounded mr-2 mt-2 text-white"
//             onClick={() => deletePost(p)}
//           >
//             Eliminar {p.description}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
// frontend/pages/schedule.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';

type PostItem = {
  id: string;
  description: string;
  status: string;
  publishAt?: string;
  hashtags?: string[];
};

type Post = Omit<PostItem, 'status'> & { status: 'pending' | 'published' | 'failed' };

export default function SchedulePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('tendioo_access_token') || '' : '';

  const mapStatus = (status: string): 'pending' | 'published' | 'failed' => {
    switch (status) {
      case 'scheduled':
        return 'pending';
      case 'published':
        return 'published';
      case 'failed':
        return 'failed';
      default:
        return 'pending';
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get<PostItem[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/posts/schedule`, {
        params: { access_token: accessToken }
      });

      const mappedPosts = res.data.map(p => ({ ...p, status: mapStatus(p.status) }));
      setPosts(mappedPosts);
    } catch (err) {
      console.error(err);
    }
  };

  const updatePost = async (post: Post) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/posts/schedule/${post.id}`, post, {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (post: Post) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/posts/schedule/${post.id}`);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Publicaciones Programadas</h1>
      <PostList posts={posts} onUpdate={updatePost} />
      <div className="mt-4">
        {posts.map(p => (
          <button
            key={p.id}
            className="bg-red-500 px-3 py-1 rounded mr-2 mt-2 text-white"
            onClick={() => deletePost(p)}
          >
            Eliminar {p.description}
          </button>
        ))}
      </div>
    </div>
  );
}
