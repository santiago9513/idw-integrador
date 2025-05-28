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
        window.location.href = 'js/login.html';
    });
}

const form = document.getElementById('formSalon');

form.addEventListener('submit', function(event){
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const valor = document.getElementById('valor').value; 
    const descripcion = document.getElementById('descripcion').value;

    const salon = {nombre, valor, descripcion};
    const salones = JSON.parse(localStorage.getItem('salones')) || [];  //carga salones o inicializa vacio
    salones.push(salon);    //agrega el salon al arreglo de salones
    localStorage.setItem('salones', JSON.stringify(salones))    //guarda los salones

    alert(`El nuevo salon tiene los siguientes atributos Nombre: ${nombre}.Precio: ${valor}.Descripcion: ${descripcion}`);

    this.reset();   //limpia el formulario despues de enviarlo

    mostrarSalones();

    });

mostrarSalones()
});

function mostrarSalones(){
    
    const tablaBody = document.querySelector('#tablaSalones tbody');    
    
    tablaBody.innerHTML = ''; 
    
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    
    salones.forEach((salon) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${salon.nombre}</td>
        <td>${salon.valor}</td>
        <td>${salon.descripcion}</td>
        `;

        tablaBody.appendChild(fila);
    })
}