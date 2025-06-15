let indiceEditar = null; //Variable bandera 

document.addEventListener('DOMContentLoaded', () =>{
if(!sessionStorage.getItem('usuario')){
        alert('Debe loguearse')
        window.location.href = "js/login.html";
        return;
}

const salir = document.getElementById('logout');
if(salir) {
    salir.addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = 'adicionales.html';
    });
}

const form = document.getElementById('formServicio');

form.addEventListener('submit', function(event){
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const valor = document.getElementById('valor').value; 
    const imagen = document.getElementById('imagen').value || 'img/salonDefault.png';   //si se deja vacio carga imagen default

    const servicio = {nombre, valor, descripcion, imagen};
    
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];  //carga servicios o inicializa vacio
    
    if (indiceEditar !== null) {
        //  Entra a modo edicion
        servicios[indiceEditar] = servicio;
        alert(`Servicio editado: ${nombre}`);
        indiceEditar = null;    //Vuelve modo alta nuevo
    } else {
        //Modo alta
        servicios.push(servicio);
        alert(`Servicio agregado: ${nombre}`);
    }
        //agrega el servicio al arreglo de servicios
    
    localStorage.setItem('servicio', JSON.stringify(servicios))    //guarda los servicios

    this.reset();   //limpia el formulario despues de enviarlo

    mostrarServicios();

    });

mostrarServicios()
});

function mostrarServicios(){
    
    const tablaBody = document.querySelector('#tablaServicios tbody');    
    
    tablaBody.innerHTML = ''; 
    
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    
    servicios.forEach((servicio, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td class="text-center"><img src="${servicio.imagen}" alt="${servicio.nombre}" style="width: 100px; height: 100px;"></td>
        <td class="text-center">${servicio.nombre}</td>
        <td>${servicio.descripcion}</td>
        <td class="text-center">$${servicio.valor}</td>
        <td class="text-center">
            <button class="btn btn-sm btn-warning m-3" onclick="editarServicio(${index})">Editar</button>
            <button class="btn btn-sm btn-danger m-3" onclick="eliminarServicio(${index})">Eliminar</button>
        </td>
        `;

        tablaBody.appendChild(fila);
    })
}