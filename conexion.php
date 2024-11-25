<?php
// Configuración de conexión a la base de datos
$host = "localhost"; // Cambia según tu configuración
$usuario = "root"; // Usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$baseDatos = "agendacontactos";

// Crear conexión
$conn = new mysqli($host, $usuario, $password, $baseDatos);

// Verificar conexión
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

// Capturar datos del formulario
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$redSocial = $_POST['red-social'];
$usuarioRed = $_POST['usuario-red'];
$comentario = $_POST['comentario'];

// Preparar la consulta SQL para insertar los datos
$sql = "INSERT INTO contactos (nombre, correo, telefono, red_social, usuario_red, comentario) 
        VALUES (?, ?, ?, ?, ?, ?)";

// Usar prepared statements para prevenir inyecciones SQL
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $nombre, $correo, $telefono, $redSocial, $usuarioRed, $comentario);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo "Contacto guardado exitosamente.";
} else {
    echo "Error al guardar el contacto: " . $stmt->error;
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
