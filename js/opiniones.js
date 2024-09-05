let formulario = []

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura los datos del formulario
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const message = document.getElementById('message').value;

    const formData = {
        Nombre: name,
        Contacto: contact,
        mensaje: message
    };
    formulario.push(formData)

    console.log(formulario)
    localStorage.setItem('contactArray', JSON.stringify(formulario));
    
    Swal.fire({
        title: "Tu mensaje ha sido enviado",
        text: "Gracias por tus reseñas",
        icon: "success"
      });

    document.getElementById('contactForm').reset();
});