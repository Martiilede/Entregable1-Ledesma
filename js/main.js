let Pizzasarray = []

const pizzas = document.querySelectorAll(".pizzas")
pizzas.forEach((element, index) => {
    const idUnico = `${index + 1}`;
    element.id = idUnico;
    const button = element.querySelector('.agregar-carrito');      
    if (button) {
        button.addEventListener('click', function() {
            const message = document.createElement('p');
            message.textContent = 'Agregado al carrito';
            message.className = 'message';
            if (!element.querySelector('.message')) {
                element.appendChild(message);
                setTimeout(() => {
                    if (element.contains(message)) {
                        element.removeChild(message);
                    }
                }, 5000);
            }
            guardarInformacion(element);
        });
    }
});

function guardarInformacion(element) {
    const id = element.id
    const h2 = element.querySelector('h2').textContent;
    const p = element.querySelector('p').textContent;
    const imgSrc = element.querySelector('img').src;
    Pizzasarray.push({
        id : id,
        nombre: h2,
        parrafo: p,
        imagen: imgSrc
    });
    console.log(Pizzasarray)
    localStorage.setItem('carrito', JSON.stringify(Pizzasarray));
    
}
