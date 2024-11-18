<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agendacontactos";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Comprobar si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $telefono = $_POST["telefono"];
    $red_social = $_POST["usuario-red"]; // Revisa que el nombre coincida con el del HTML
    $usuario_red = $_POST["red-social"];
    $comentario = $_POST["comentario"];

    // Procesar imagen
    $imagenRuta = "";
    if (isset($_FILES["imagen"]) && $_FILES["imagen"]["error"] == 0) {
        $directorio = "uploads/";
        if (!is_dir($directorio)) {
            mkdir($directorio, 0777, true);
        }
        $nombreImagen = basename($_FILES["imagen"]["name"]);
        $imagenRuta = $directorio . uniqid() . "_" . $nombreImagen;

        // Mover imagen a la carpeta 'uploads'
        if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $imagenRuta)) {
            echo "Error al subir la imagen.";
            exit;
        }
    }

    // Insertar contacto en la base de datos
    $sql = "INSERT INTO contactos (nombre, correo, telefono, red_social, usuario_red, comentario, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $nombre, $correo, $telefono, $red_social, $usuario_red, $comentario, $imagenRuta);

    if ($stmt->execute()) {
        echo "Contacto agregado exitosamente.";
    } else {
        echo "Error al agregar el contacto: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
