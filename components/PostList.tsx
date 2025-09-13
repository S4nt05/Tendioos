import { useState } from "react";

interface Post {
  id: string;
  description: string;
  status: "pending" | "published" | "failed";
  scheduledAt?: string;
}

export default function PostList({ posts, onUpdate }: { posts: Post[]; onUpdate: (p: Post) => void }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const startEdit = (post: Post) => {
    setEditing(post.id);
    setDraft(post.description);
  };

  const saveEdit = (post: Post) => {
    onUpdate({ ...post, description: draft });
    setEditing(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">📌 Publicaciones</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Programada</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} className="border-t">
              <td className="p-2 border">
                {editing === post.id ? (
                  <input
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  post.description
                )}
              </td>
              <td className="p-2 border">{post.status}</td>
              <td className="p-2 border">{post.scheduledAt || "-"}</td>
              <td className="p-2 border space-x-2">
                {editing === post.id ? (
                  <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => saveEdit(post)}>
                    Guardar
                  </button>
                ) : (
                  <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => startEdit(post)}>
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
