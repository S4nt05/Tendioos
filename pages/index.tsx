import Link from 'next/link';
export default function HomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-inter px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">🎬 Tendioo AutoReel</h1>
      <p className="text-md md:text-lg text-gray-300 mb-10 text-center max-w-xl">
        Crea contenido viral desde imágenes o videos. Gratis y online.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link href="/upload">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl shadow-xl text-lg transition-all duration-300">
            🖼 Edición de imagen
          </button>
        </Link>
        <Link href="/upload">
          <button className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-xl shadow-xl text-lg transition-all duration-300">
            ✂️ Edición de video
          </button>
        </Link>
        <Link href="/dashboard">
          <button className="bg-fuchsia-400 hover:bg-pink-600 text-white py-3 px-6 rounded-xl shadow-xl text-lg transition-all duration-300">
            Tus redes sociales
          </button>
        </Link>
      </div>
      <div className="text-xs mt-8 text-gray-500">💧 Marca de agua en modo gratuito</div>
    </div>
  );
}
