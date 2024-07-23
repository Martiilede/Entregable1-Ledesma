const saludo = alert("Bienvenidos a Pizzeria a la pizza")
let napolitana = 5300;
let cuatroquesos = 5800;
let fugazzeta = 5500;
let muzzarella = 4800;
const pizzas = ['Napolitana', 'Cuatro Quesos', 'Fugazzeta', 'Muzzarella'];
let carrito = [];

function total (items){
    let total = 0;
    for(item of items){
      switch(item){
        case 'Napolitana':
            total +=  napolitana;
        break;
        case 'Cuatro Quesos':
            total += cuatroquesos;
        break;
        case 'Fugazzeta':
            total += fugazzeta;
        break;
        case 'Muzzarella':
            total += muzzarella
        break;
        default:
         console.log ('Error')              
      }
    }
    return total
};

let compras = confirm("Desea Comprar?");
if (compras) {
    alert("Tenemos Pizzas de " + pizzas.join(", "));
    function elegir() {
        return parseInt(prompt("Aprete \n 1 para Napolitana $" + napolitana + "\n 2 Para Cuatro Quesos $" + cuatroquesos + "\n 3 para Fugazzeta $" + fugazzeta + "\n 4 para Muzzarella $"+muzzarella+ "\n 5 para Salir"));
    }
    let opcion = elegir();
    while (opcion !== 5) {
        switch (opcion) {
            case 1:
                alert("Agregaste una Napolitana $" + napolitana);
                carrito.push ("Napolitana");
                console.log("Tenes Agregado $" +napolitana);
                break;
            case 2:
                alert("Agregaste una 4 quesos $" + cuatroquesos);
                carrito.push ("Cuatro Quesos");
                console.log("Tenes Agregado $" +cuatroquesos);
                break;
            case 3:
                alert("Agregaste una Fugazzeta $" + fugazzeta);
                carrito.push ("Fugazzeta");
                console.log("Tenes Agregado $" +fugazzeta);
                break;
            case 4:
                alert ("Agregaste una Muzzarella $" + muzzarella);
                carrito.push ("Muzzarella")
                console.log("Tenes Agregado $" +muzzarella);
                break;    
            default:
                alert("Opcion Incorrecta");
                break;
        }
        opcion = elegir();
    }
    
    let eliminar = confirm("Desea Eliminar algun producto")
    if(eliminar){
        function eliminaritem () {
            return parseInt(prompt("Aprete \n 1 para la Napolitana\n 2 Para Cuatro Quesos\n 3 para Fugazzeta\n 4 para Muzzarella\n 5 para Salir"));
        }
        let borrar = eliminaritem()
        while (borrar !== 5) {
            switch (borrar) {
                case 1:
                    if (carrito.includes('Napolitana')) {
                        carrito = carrito.filter(item => item !== 'Napolitana');
                        console.log("Borraste una Napolitana del carrito");
        
                    } else {
                        alert("No tienes Napolitana en el carrito para borrar");
                    }
                    break;
                case 2:
                    if (carrito.includes('Cuatro Quesos')) {
                        carrito = carrito.filter(item => item !== 'Cuatro Quesos');
                        console.log("Borraste una Cuatro Quesos del carrito");
                    } else {
                        alert("No tienes Cuatro Quesos en el carrito para borrar");
                    }
                    break;
                case 3:
                    if (carrito.includes('Fugazzeta')) {
                        carrito = carrito.filter(item => item !== 'Fugazzeta');
                        console.log("Borraste una Fugazzeta del carrito");
                    } else {
                        alert("No tienes Fugazzeta en el carrito para borrar");
                    }
                    break;
                case 4:
                    if (carrito.includes('Muzzarella')) {
                        carrito = carrito.filter(item => item !== 'Muzzarella');
                        console.log("Borraste una Muzzarella del carrito");
                    } else {
                        alert("No tienes Muzzarella en el carrito para borrar");
                    }
                    break;
                default:
                    alert("Opcion Incorrecta");
                    break;
            }
            borrar = eliminaritem()
        }
    }
    let totalcompra = total (carrito)
    console.log ("El Total de su Compra es $" +totalcompra)
    alert("El Total de su Compra es $" +totalcompra)
}
alert('Muchas Gracias por Visitarnos!');
console.log(carrito)