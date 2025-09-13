export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad - Tendioo AutoReel</h1>
      <p className="mb-4">
        En <b>Tendioo AutoReel</b>, respetamos tu privacidad. Esta política explica cómo recopilamos,
        usamos y protegemos tu información.
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Datos recopilados</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Información básica de usuario de TikTok (open_id, nombre, avatar).</li>
        <li>Tokens de acceso proporcionados por TikTok para gestionar tu cuenta.</li>
        <li>Estadísticas de publicaciones y mensajes enviados/recibidos.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-4 mb-2">Uso de la información</h2>
      <p className="mb-4">
        Los datos se utilizan únicamente para automatizar la publicación de contenido, responder
        mensajes y mostrar estadísticas en tu panel. Nunca compartiremos ni venderemos tu información.
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Seguridad</h2>
      <p className="mb-4">
        Implementamos medidas técnicas y organizativas para proteger tu información contra accesos no autorizados.
      </p>
      <p>
        Si tienes preguntas, escribe a <a href="mailto:privacidad@tendioo.com" className="text-blue-600">privacidad@tendioo.com</a>.
      </p>
    </div>
  );
}
