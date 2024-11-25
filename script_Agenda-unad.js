let contactoEditando = null;
let contactosEliminados = []; 

// Mostrar la sección seleccionada
function showSection(sectionId) {
    document.querySelectorAll('.formulario').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}


function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("usuario-red").value = "Facebook";
    document.getElementById("red-social").value = "";
    document.getElementById("comentario").value = "";
    document.getElementById("imagen").value = "";
}

function agregarContacto() {
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const redSocial = document.getElementById('usuario-red').value;
    const usuarioRed = document.getElementById('red-social').value;
    const comentario = document.getElementById('comentario').value;
    const imagen = document.getElementById('imagen').files[0];

    if (nombre && correo && telefono && redSocial && usuarioRed) {
        const listaContactos = document.getElementById('contactos-lista');
        const li = document.createElement('li');
        const divImagen = document.createElement('div');
        const divInfo = document.createElement('div');
        const divAcciones = document.createElement('div');

       

        if (imagen) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(imagen);
            img.alt = nombre;
            divImagen.appendChild(img);
        }

        divInfo.innerHTML = `
            <strong>${nombre}</strong><br>
            Correo: ${correo}<br>
            Teléfono: ${telefono}<br>
            ${redSocial}: ${usuarioRed}<br>
            Comentario: ${comentario}
        `;

        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.addEventListener('click', function() {
            editarContacto(this);
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', function() {
            eliminarContacto(this);
        });

        divAcciones.appendChild(botonEditar);
        divAcciones.appendChild(botonEliminar);

        li.appendChild(divImagen);
        li.appendChild(divInfo);
        li.appendChild(divAcciones);

        listaContactos.appendChild(li);

       
        limpiarCampos();
        alert("Contacto agregado exitosamente.");
    } else {
        alert("Por favor, complete todos los campos obligatorios.");
    }

    const year = new Date().getFullYear();
    document.querySelector('footer p').textContent = `Agenda de Contactos UNAD © ${year}`;
        
}

function mostrarContactos() {
    const contactosLista = document.getElementById("contactos-lista");
    contactosLista.style.display = contactosLista.style.display === "none" ? "block" : "none";
}


function eliminarContacto(boton) {
    const li = boton.parentElement.parentElement;
    li.remove();
}

function editarContacto(boton) {
    const li = boton.parentElement.parentElement;
    contactoEditando = li;

    const infoDiv = li.querySelector('div:nth-child(2)');
    const datos = infoDiv.innerHTML.split('<br>');

    document.getElementById("nombre-editar").value = datos[0].replace('<strong>', '').replace('</strong>', '');
    document.getElementById("correo-editar").value = datos[1].split(': ')[1];
    document.getElementById("telefono-editar").value = datos[2].split(': ')[1];
    document.getElementById("red-social-editar").value = datos[3].split(': ')[0];
    document.getElementById("usuario-red-editar").value = datos[3].split(': ')[1];
    document.getElementById("comentario-editar").value = datos[4].split(': ')[1];

    document.getElementById("modal-editar").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal-editar").style.display = "none";
}

function guardarEdicion() {
    const nombre = document.getElementById("nombre-editar").value;
    const correo = document.getElementById("correo-editar").value;
    const telefono = document.getElementById("telefono-editar").value;
    const redSocial = document.getElementById("red-social-editar").value;
    const usuarioRed = document.getElementById("usuario-red-editar").value;
    const comentario = document.getElementById("comentario-editar").value;

    if (contactoEditando) {
        const infoDiv = contactoEditando.querySelector('div:nth-child(2)');
        infoDiv.innerHTML = `
            <strong>${nombre}</strong><br>
            Correo: ${correo}<br>
            Teléfono: ${telefono}<br>
            ${redSocial}: ${usuarioRed}<br>
            Comentario: ${comentario}
        `;
    }

    cerrarModal();
}



