let Pizzasarray = []

function cargarDatos() {
    let storedData = localStorage.getItem('carrito');
    if (storedData) {
        Pizzasarray = JSON.parse(storedData);
}
}
cargarDatos()

fetch("./db/data.json")
.then(response => response.json())
.then(data => {
    const main = document.getElementsByClassName("main")[0];
    data.forEach(item => {
        let crearsection = document.createElement("section");
        crearsection.classList.add("pizzas");
        crearsection.id = item.id;
        crearsection.innerHTML = `
            <article>
                <h2>${item.nombre}</h2>
                <img src="${item.imagen}" alt="${item.nombre}">
                <p>${item.parrafo}</p>
                <h6>Precio $<span>${item.precio}</span></h6>
                <button class="agregar-carrito">${item.button}</button>
            </article>
        `;
        main.appendChild(crearsection);
    });
    const pizzas = document.querySelectorAll(".pizzas")
    pizzas.forEach((element) => {
        const button = element.querySelector('.agregar-carrito');      
        if (button) {
            button.addEventListener('click', function() {
                Toastify({
                    text: "Producto agregado al carrito",
                    duration: 3000,
                    style : {
                        background: "linear-gradient(to right, rgb(0, 176, 155), rgb(150, 201, 61)",
                    }
                    }).showToast();
                    guardarInformacion(element);
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "¡Hubo un Error!",
                    text: "¡No se pudo agregar al Carrito!",
                });
            }
        });
})

    
            
function guardarInformacion(element) {
    const id = element.id
    const h2 = element.querySelector('h2').textContent;
    const p = element.querySelector('p').textContent;
    const imgSrc = element.querySelector('img').src;
    const precio = element.querySelector("span").textContent
    const evitarduplicados = Pizzasarray.some(pizza => pizza.id === id);
    if (!evitarduplicados) {
        Pizzasarray.push({
            id: id,
            nombre: h2,
            parrafo: p,
            imagen: imgSrc,
            precio: precio
        });
    };
    console.log(Pizzasarray)
    localStorage.setItem('carrito', JSON.stringify(Pizzasarray));
    
}
