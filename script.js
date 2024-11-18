let contacts = [];
let deletedContacts = [];

// Mostrar la sección seleccionada
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Agregar contacto
function addContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const social = document.getElementById('social').value;
    const comment = document.getElementById('comment').value;
    const image = document.getElementById('contactImage').files[0];

    if (name && email && phone) {
        const contact = {
            name,
            email,
            phone,
            social,
            comment,
            image: URL.createObjectURL(image)
        };

        contacts.push(contact);
        displayContacts();
        document.getElementById('contactForm').reset();
        alert("Contacto agregado exitosamente.");
    }
}

// Mostrar contactos agregados
function displayContacts() {
    const contactsDiv = document.getElementById('contacts');
    contactsDiv.innerHTML = '';

    contacts.forEach((contact, index) => {
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');

        contactCard.innerHTML = `
            <img src="${contact.image}" alt="${contact.name}" class="contact-image">
            <h3>${contact.name}</h3>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Teléfono:</strong> ${contact.phone}</p>
            <p><strong>Red Social:</strong> ${contact.social}</p>
            <p><strong>Comentario:</strong> ${contact.comment}</p>
            <button onclick="deleteContact(${index})">Eliminar</button>
        `;

        contactsDiv.appendChild(contactCard);
    });
}

// Eliminar contacto y mover a la sección de contactos eliminados
function deleteContact(index) {
    const deletedContact = contacts.splice(index, 1)[0];
    deletedContacts.push(deletedContact);
    displayContacts();
    displayDeletedContacts();
}

// Mostrar contactos eliminados
function displayDeletedContacts() {
    const deletedContactsDiv = document.getElementById('deletedContacts');
    deletedContactsDiv.innerHTML = '';

    deletedContacts.forEach(contact => {
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');

        contactCard.innerHTML = `
            <img src="${contact.image}" alt="${contact.name}" class="contact-image">
            <h3>${contact.name}</h3>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Teléfono:</strong> ${contact.phone}</p>
            <p><strong>Red Social:</strong> ${contact.social}</p>
            <p><strong>Comentario:</strong> ${contact.comment}</p>
        `;

        deletedContactsDiv.appendChild(contactCard);
    });
}
