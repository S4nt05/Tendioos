// // tendioo/frontend/components/TikTokStats.tsx
// import dynamic from 'next/dynamic';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StatsChartClient = dynamic(() => import('../components/StatsChartClient'), { ssr: false });

// type Point = { day: string; views: number; likes: number };

// export default function TikTokStats({ accessToken }: { accessToken?: string }) {
//   const [data, setData] = useState<Point[] | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/tiktok/stats`, {
//           params: { access_token: accessToken || localStorage.getItem('tendioo_access_token') }
//         });
//         // res.data -> formato: { timeseries: [{day, views, likes}, ...], summary: {...} }
//         setData(res.data.timeseries || []);
//       } catch (err) {
//         console.error('stats fetch err', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (accessToken || typeof window !== 'undefined') fetchStats();
//   }, [accessToken]);

//   if (loading) return <div>Cargando estadísticas...</div>;
//   if (!data || data.length === 0) return <div>No hay datos para mostrar</div>;

//   return <StatsChartClient data={data} />;
// }
// tendioo/frontend/components/TikTokStats.tsx
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatsChartClient = dynamic(() => import('../components/StatsChartClient'), { ssr: false });

type Point = { day: string; views: number; likes: number };
type Summary = { followers: number; total_videos: number; engagement: number };
type StatsResponse = { timeseries: Point[]; summary?: Summary };

export default function TikTokStats({ accessToken }: { accessToken?: string }) {
  const [data, setData] = useState<Point[] | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await axios.get<StatsResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/tiktok/stats`, {
          params: { access_token: accessToken || localStorage.getItem('tendioo_access_token') }
        });
        setData(res.data.timeseries || []);
        setSummary(res.data.summary || null);
      } catch (err) {
        console.error('stats fetch err', err);
      } finally {
        setLoading(false);
      }
    }
    if (accessToken || typeof window !== 'undefined') fetchStats();
  }, [accessToken]);

  if (loading) return <div>Cargando estadísticas...</div>;
  if (!data || data.length === 0) return <div>No hay datos para mostrar</div>;

  return (
    <div>
      <StatsChartClient data={data} />
      {summary && (
        <div className="mt-4 bg-white/5 p-4 rounded">
          <p>Followers: {summary.followers}</p>
          <p>Total Videos: {summary.total_videos}</p>
          <p>Engagement: {summary.engagement}%</p>
        </div>
      )}
    </div>
  );
}
