let indiceEditar = null; //Variable bandera, guarda indice del salon a editar o null si es un alta 

document.addEventListener('DOMContentLoaded', () => {   //Espera a que el DOM este cargado
    
    if (!sessionStorage.getItem('usuario')) {   //Si no hay usuario logueado, redirige a login.html
        alert('Debe loguearse');
        window.location.href = "js/login.html";
        return;
    }

    const salir = document.getElementById('logout');    // Boton salir, borra la sesion y redirige a salones.html
    if (salir) {
        salir.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'salones.html';
        });
    }

    const form = document.getElementById('formSalon');

    mostrarSalones();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        //obtiene los valores ingresadosa en el form
        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        const descripcion = document.getElementById('descripcion').value;
        const valor = document.getElementById('valor').value;
        const estado = document.getElementById('estado').value;
        const imagen = document.getElementById('imagen').value || 'img/salonDefault.png';   //si se deja vacio carga imagen default

        const salones = JSON.parse(localStorage.getItem('salones')) || [];  //carga salones o inicializa vacio
        const imagenes = JSON.parse(localStorage.getItem('imagenes')) || [];

        if (indiceEditar !== null) {
        // Modo edicion
            id = salones[indiceEditar].id;
            alert(`Salon editado: ${nombre}`);
        } else {
            // Modo alta
            const ids = salones.map(s => s.id);
            if (ids.length > 0) {
                id = Math.max(...ids) + 1;
            } else {
                id = 0;
            }
            alert(`Salon agregado: ${nombre}`);
        }

        const salon = { id, nombre, direccion, valor, descripcion, estado, imagen };

        if (indiceEditar !== null) {
            salones[indiceEditar] = salon;

            const indexImagen = imagenes.findIndex(img => img.idSalon === id)
            imagenes[indexImagen].ruta = imagen;

            indiceEditar = null;
        } else {
            salones.push(salon);

            let idImagen;
            const idsImg = imagenes.map(img => img.id);
            if (idsImg.length > 0) {
                idImagen = Math.max(...idsImg) + 1;
            } else {
                idImagen = 0;
            }
            imagenes.push({
                id: idImagen,
                idSalon: id,
                ruta: imagen
            });
        }



        //agrega el salon al arreglo de salones
        localStorage.setItem('imagenes', JSON.stringify(imagenes));
        localStorage.setItem('salones', JSON.stringify(salones))    

        this.reset();   //limpia el formulario despues de enviarlo

        mostrarSalones();

    });
});

//Renderiza salones en una tabla
function mostrarSalones() {

    const tablaBody = document.querySelector('#tablaSalones tbody');

    tablaBody.innerHTML = '';   //Limpia la tabla

    const salones = JSON.parse(localStorage.getItem('salones')) || [];

    salones.forEach((salon) => { //Renderiza en la tabla cada salon del arreglo de salones
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td class="text-center"><img src="${salon.imagen}" alt="${salon.nombre}" style="width: 100px; height: 100px;"></td>
        <td class="text-center">${salon.nombre}</td>
        <td>${salon.direccion}</td>
        <td>${salon.descripcion}</td>
        <td class="text-center">$${salon.valor}</td>
        <td class="text-center">${salon.estado}</td>
        <td class="text-center">
            <button class="btn btn-sm btn-warning m-3" onclick="editarSalon(${salon.id})">Editar</button>
            <button class="btn btn-sm btn-danger m-3" onclick="eliminarSalon(${salon.id})">Eliminar</button>
        </td>
        `;

        tablaBody.appendChild(fila);
    })
}