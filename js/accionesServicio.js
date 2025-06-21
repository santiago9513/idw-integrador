function editarServicio(index) {
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];  //carga servicios del localstorage
    const servicio = servicios[index];   //con el index ubica el servicio objetivo

    //llena el form con los datos del servicio objetivo (listo para editar y guardar como nuevo)
    document.getElementById('nombre').value = servicio.nombre;
    document.getElementById('descripcion').value = servicio.descripcion;
    document.getElementById('valor').value = servicio.valor;
    document.getElementById('imagen').value = servicio.imagen;

    indiceEditar = index;

    window.scrollTo({ top: 0, behavior: 'smooth' });    //Desplaza la pagina hacia arriba (form)
}

function eliminarServicio(index) {

    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];  //carga servicios del localstorage

    if (confirm(`Esta seguro de eliminar el servicio "${servicios[index].nombre}"?`)) {
        servicios.splice(index, 1);   //elimina el servicio
        localStorage.setItem('servicios', JSON.stringify(servicios)); //guarda en localstorage
        mostrarServicios();   //muestra en tabla
    }
}
