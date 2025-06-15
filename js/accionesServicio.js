function editarServicio(index){
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];  //cargo servicios del localstorage
    const servicio = servicios[index];   //con el index ubico el servicio objetivo

    //lleno el form con los datos del servicio objetivo (listo para editar y guardar como nuevo)
    document.getElementById('nombre').value = servicio.nombre; 
    document.getElementById('descripcion').value = servicio.descripcion;
    document.getElementById('valor').value = servicio.valor;
    document.getElementById('imagen').value = servicio.imagen;

    indiceEditar = index;

    window.scrollTo({ top: 0, behavior: 'smooth' });    //Desplaza la pagina hacia arriba (form)
}

function eliminarServicio(index){
    
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];  //cargo servicios del localstorage
    
    if (confirm(`Esta seguro de eliminar el servicio "${servicios[index].nombre}"?`)){
        servicios.splice(index, 1);   //elimino el servicio
        localStorage.setItem('servicios', JSON.stringify(servicios)); //guardo en localstorage
        mostrarServicios();   //muestro en tabla
    }
}
