window.addEventListener('DOMContentLoaded', () => { //Espera que el DOM este cargado

    const usuario = sessionStorage.getItem('usuario');
    const loginBoton = document.getElementById('login');
    const logoutBoton = document.getElementById('logout');
    const adminBoton = document.getElementById('admin');
    const usuariosBoton = document.getElementById('usuarios');

    //Si esta logueado: muestra boton admin, usuarios, logout y oculta login
    if (usuario) {
        mostrar(adminBoton);
        ocultar(loginBoton);
        mostrar(logoutBoton);
        mostrar(usuariosBoton);

        if (logoutBoton) {
            logoutBoton.addEventListener('click', () => {
                sessionStorage.clear();
                window.location.href = 'index.html';
            });
        }
    //Sino: muestra boton login y oculta admin, logout y usuarios   
    } else {
        mostrar(loginBoton);
        ocultar(logoutBoton);
        ocultar(adminBoton);
        ocultar(usuariosBoton);
    }
});

//Oculta los botones con display-none
function mostrar(boton) {
    if (boton) boton.classList.remove('d-none');
}

function ocultar(boton) {
    if (boton) boton.classList.add('d-none');
}