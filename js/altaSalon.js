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

    alert(`El nuevo salon tiene los siguientes atributos Nombre: ${nombre}.Precio: ${valor}.Descripcion: ${descripcion}`);

    this.reset();
    });
});