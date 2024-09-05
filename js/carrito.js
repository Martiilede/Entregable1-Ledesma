function recuperarDatos() {
    try {
        let recuperarstorage = localStorage.getItem('carrito');
        return recuperarstorage ? JSON.parse(recuperarstorage) : [];
    } catch (err) {
        console.error('Error al recuperar o parsear los datos del localStorage:', err);
    }
}

async function guardarDatos(pizzas) {
    try {
        localStorage.setItem('carrito', JSON.stringify(pizzas));
    } catch (err) {
        console.error('Error al guardar los datos en localStorage:', err);
    }
}

function crearContainer() {
    let container = document.getElementById("finalizar");
    container.innerHTML = '';
    let pizzas = recuperarDatos();
    pizzas.forEach(pizza => {
        let div = document.createElement("section");
        div.classList.add("pizzas")
        div.id = pizza.id;
        div.innerHTML = `
        <article>
            <h2>${pizza.nombre}</h2>
            <img src="${pizza.imagen}" alt="${pizza.nombre}">
            <p>${pizza.parrafo}</p>
            <h6>Precio $${pizza.precio}</h6>
            <div class="controls">
                <button id="decrement">-</button>
                <span class="quantity">${pizza.cantidad || 1}</span>
                <button id="increment">+</button>
                <button id="remove">Eliminar</button>
            </div>
            </article>
        `;

        div.querySelector('#increment').addEventListener('click', () => cambiarCantidad(pizza.id, 1));
        div.querySelector('#decrement').addEventListener('click', () => cambiarCantidad(pizza.id, -1));
        div.querySelector('#remove').addEventListener('click', () => eliminarPizza(pizza.id));

        container.appendChild(div);
    });
    actualizarEstadoBotones()
}

function cambiarCantidad(id, cambio) {
    let cantidadActualizada = 0;
    try {
        let pizzas = recuperarDatos();
        pizzas = pizzas.map(pizza => {
            if (pizza.id === id) {
                pizza.cantidad = (pizza.cantidad || 1) + cambio;
                cantidadActualizada = pizza.cantidad;
                if (cantidadActualizada <= 0) {
                    return null;
                }
            }
            return pizza
        }).filter(pizza => pizza !== null);
        guardarDatos(pizzas);
        crearContainer();

        actualizarEstadoBotones();
        return cantidadActualizada;
    } catch (err) {
        console.error('Error al cambiar la cantidad:', err);
    }
}

function actualizarEstadoBotones() {
    document.querySelectorAll('#decrement').forEach(button => {
        const section = button.closest('section');
        const quantitySpan = section.querySelector('.quantity');
        const cantidad = parseInt(quantitySpan.textContent);
        if (cantidad === 1) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    });
}

 async function eliminarPizza(id) {
    try {
        let pizzas = recuperarDatos();
        Swal.fire({
            title: "¿Estás seguro de eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "¡Producto Eliminado!",
                text: "¡Su producto ha sido eliminado!",
                icon: "success"
            });
            pizzas = pizzas.filter(pizza => pizza.id !== id);
            guardarDatos(pizzas);
            crearContainer();
            }
          });
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "¡Hubo un Error!",
            text: "¡No se pudo eliminar!",
          });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    crearContainer();
});

document.addEventListener('DOMContentLoaded', () => {
    const botonEnviar = document.getElementById('boton-enviar');
    const modalElement = document.getElementById('popup');
    const modal = new bootstrap.Modal(modalElement);
    const summaryModalElement = document.getElementById('summary-popup');
    const summaryModal = new bootstrap.Modal(summaryModalElement);
    botonEnviar.addEventListener('click', () => {
        let pizzas = recuperarDatos();
        if (pizzas.length > 0) {
            let pizza = pizzas[0];
            mostrarPopup(pizza);
            modal.show();
        } else{
            Swal.fire({
                title: "¡Su carrito está vació!",
                icon: "warning"
              });
        }
    });
    function mostrarPopup(pizza) {
        pizza = recuperarDatos()
        const itemList = document.getElementById('item-list');
        const totalPriceContainer = document.getElementById('total-price');
        itemList.innerHTML = '';
        let totalPrice = 0;
        
        pizza.forEach(pizza => {
            const listItem = document.createElement('li');
            const cantidad = pizza.cantidad || 1;

            const precioTotalPizza = pizza.precio * cantidad;
            totalPrice += precioTotalPizza; 

            listItem.innerHTML = `<strong>Nombre:</strong> ${pizza.nombre} <br> <strong>Cantidad:</strong> ${cantidad} <br> <strong>Precio:</strong> ${pizza.precio}`;
            itemList.appendChild(listItem);
        });
        totalPriceContainer.innerHTML = `<strong>Precio Total:</strong> $${totalPrice.toFixed(2)}`;

    }
    document.getElementById('order-form').addEventListener('submit', (e) => {
        e.preventDefault();
    
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

    mostrarResumenPedido(name, phone, address, recuperarDatos());

    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    summaryModal.show(); 

    function mostrarResumenPedido(name, phone, address, pizzas) {
        const summaryInfo = document.getElementById('summary-info');
        const itemList = pizzas.map(pizza => {
            const cantidad = pizza.cantidad || 1;
            const precioTotalPizza = pizza.precio * cantidad;
            return `<strong>Nombre:</strong> ${pizza.nombre} <br> <strong>Cantidad:</strong> ${cantidad} <br> <strong>Total:</strong> $${precioTotalPizza.toFixed(2)}`;
        }).join('<br>');

        const totalPrice = pizzas.reduce((sum, pizza) => sum + (pizza.precio * (pizza.cantidad || 1)), 0);

        summaryInfo.innerHTML = `
            <p><strong>Nombre y Apellido:</strong> ${name}</p>
            <p><strong>Número de Teléfono:</strong> ${phone}</p>
            <p><strong>Dirección:</strong> ${address}</p>
            <h6>Detalles del Pedido:</h6>
            ${itemList}<br>
            <strong>Precio Total:</strong> $${totalPrice.toFixed(2)}
        `;
    }
    });
});