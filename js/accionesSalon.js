function editarSalon(index) {
    const salones = JSON.parse(localStorage.getItem('salones')) || [];  //carga salones del localstorage
    const salon = salones[index];   //con el index ubica el salon objetivo

    //llena el form con los datos del salon objetivo (listo para editar y guardar como nuevo)
    document.getElementById('nombre').value = salon.nombre;
    document.getElementById('direccion').value = salon.direccion;
    document.getElementById('descripcion').value = salon.descripcion;
    document.getElementById('valor').value = salon.valor;
    document.getElementById('estado').value = salon.estado;
    document.getElementById('imagen').value = salon.imagen;

    indiceEditar = index;   

    window.scrollTo({ top: 0, behavior: 'smooth' });    //Desplaza la pagina hacia arriba (form)
}

function eliminarSalon(index) {

    const salones = JSON.parse(localStorage.getItem('salones')) || [];  //carga salones del localstorage

    if (confirm(`Esta seguro de eliminar el salon "${salones[index].nombre}"?`)) {
        salones.splice(index, 1);   //elimina el salon
        localStorage.setItem('salones', JSON.stringify(salones)); //guarda en localstorage
        mostrarSalones();   //muestra en tabla
    }
}



