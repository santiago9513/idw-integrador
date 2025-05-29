function editarSalon(index){
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const salon = salones[index];

    document.getElementById('nombre').value = salon.nombre;
    document.getElementById('valor').value = salon.valor; 
    document.getElementById('descripcion').value = salon.descripcion;

    salones.splice(index, 1);
    localStorage.setItem('salones', JSON.stringify(salones));
    mostrarSalones();
}