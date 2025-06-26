let indiceEditar = null; //Variable bandera, guarda indice del salon a editar o null si es un alta

document.addEventListener('DOMContentLoaded', () => {   //Espera a que el DOM este cargado
    
    if (!sessionStorage.getItem('usuario')) {   //Si no hay usuario logueado, redirige a login.html
        alert('Debe loguearse');
        window.location.href = "js/login.html";
        return;
    }

    const salir = document.getElementById('logout');    // Boton salir, borra la sesion y redirige a servicios.html
    if (salir) {
        salir.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'adicionales.html';
        });
    }

    const form = document.getElementById('formServicio');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        //obtiene los valores ingresadosa en el form
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const valor = document.getElementById('valor').value;
        const imagen = document.getElementById('imagen').value || 'img/salonDefault.png';   //si se deja vacio carga imagen default

        const servicios = JSON.parse(localStorage.getItem('servicios')) || [];  //carga servicios o inicializa vacio

        if (indiceEditar !== null) {
            //  Entra a modo edicion
            id = servicios[indiceEditar].id;
            alert(`Servicio editado: ${nombre}`);
        } else {
            //Modo alta
            const ids = servicios.map(s => s.id);
            if (ids.length > 0) {
                id = Math.max(...ids) + 1;
            } else {
                id = 0;
            }
            alert(`Servicio agregado: ${nombre}`);
        }

        const servicio = { id, nombre, descripcion, valor, imagen };

        if (indiceEditar !== null) {
            servicios[indiceEditar] = servicio;
            indiceEditar = null;
        } else {
            servicios.push(servicio);
        }

        //agrega el servicio al arreglo de servicios

        localStorage.setItem('servicios', JSON.stringify(servicios))    //guarda los servicios

        this.reset();   //limpia el formulario despues de enviarlo

        mostrarServicios();

    });

    mostrarServicios()
});

//Renderiza salones en una tabla
function mostrarServicios() {

    const tablaBody = document.querySelector('#tablaServicios tbody');

    tablaBody.innerHTML = '';   //Limpia la tabla

    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];

    servicios.forEach((servicio) => {    //Renderiza en la tabla cada servicio del arreglo de servicios
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td class="text-center"><img src="${servicio.imagen}" alt="${servicio.nombre}" style="width: 100px; height: 100px;"></td>
        <td class="text-center">${servicio.nombre}</td>
        <td>${servicio.descripcion}</td>
        <td class="text-center">$${servicio.valor}</td>
        <td class="text-center">
            <button class="btn btn-sm btn-warning m-3" onclick="editarServicio(${servicio.id})">Editar</button>
            <button class="btn btn-sm btn-danger m-3" onclick="eliminarServicio(${servicio.id})">Eliminar</button>
        </td>
        `;

        tablaBody.appendChild(fila);
    })
}