function editarSalon(index){
    const salones = JSON.parse(localStorage.getItem('salones')) || [];  //cargo salones del localstorage
    const salon = salones[index];   //con el index ubico el salon objetivo

    //lleno el form con los datos del salon objetivo (listo para editar y guardar como nuevo)
    document.getElementById('nombre').value = salon.nombre; 
    document.getElementById('descripcion').value = salon.descripcion;
    document.getElementById('valor').value = salon.valor;

    salones.splice(index, 1);   //elimino el salon
    
    localStorage.setItem('salones', JSON.stringify(salones)); //guardo en localstorage
    
    mostrarSalones();   //muestro en tabla
}

function eliminarSalon(index){
    const salones = JSON.parse(localStorage.getItem('salones')) || [];  //cargo salones del localstorage
    const salon = salones[index];   //con el index ubico el salon objetivo

    salones.splice(index, 1);   //elimino el salon

    localStorage.setItem('salones', JSON.stringify(salones)); //guardo en localstorage
    
    mostrarSalones();   //muestro en tabla
}