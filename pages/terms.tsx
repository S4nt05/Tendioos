export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <h1 className="text-3xl font-bold mb-6">Términos de Servicio - Tendioo AutoReel</h1>
      <p className="mb-4">
        Bienvenido a <b>Tendioo AutoReel</b>. Al utilizar nuestra plataforma aceptas los siguientes
        términos. Esta aplicación permite gestionar publicaciones, responder mensajes y
        administrar contenido en TikTok a través de su API oficial.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>No compartiremos tus credenciales de TikTok con terceros.</li>
        <li>Las publicaciones, mensajes y datos son manejados únicamente con tu autorización explícita.</li>
        <li>No nos responsabilizamos por suspensión de cuentas debido a mal uso del API.</li>
        <li>Nos reservamos el derecho de modificar estos términos en cualquier momento.</li>
      </ul>
      <p>
        Si tienes preguntas, contáctanos en <a href="mailto:soporte@tendioo.com" className="text-blue-600">soporte@tendioo.com</a>.
      </p>
    </div>
  );
}
