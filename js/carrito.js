let recuperarstorage = localStorage.getItem("carrito");
let pizzas = JSON.parse(recuperarstorage);
let container = document.getElementById("finalizar");
function crearContainer() {
    pizzas.forEach(pizza => {
        let div = document.createElement("div");
        div.classList.add("pizzas");
        div.innerHTML = `
            <h2>${pizza.nombre}</h2>
            <img src="${pizza.imagen}" alt="${pizza.nombre}">
            <p>${pizza.parrafo}</p>
        `;
        container.appendChild(div);
    });
}
crearContainer(container);