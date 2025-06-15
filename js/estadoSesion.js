window.addEventListener('DOMContentLoaded', () => {
    const usuario = sessionStorage.getItem('usuario');
    const loginBoton = document.getElementById('login');
    const logoutBoton = document.getElementById('logout');
    const adminBoton = document.getElementById('admin');

    if (usuario) {
        mostrar(adminBoton);
        ocultar(loginBoton);
        mostrar(logoutBoton);

        if (logoutBoton) {
            logoutBoton.addEventListener('click', () => {
                sessionStorage.clear();
                window.location.href = 'index.html';
            });
        }
    } else {
        mostrar(loginBoton);
        ocultar(logoutBoton);
        ocultar(adminBoton);
    }
});

function mostrar(boton) {
    if (boton) boton.classList.remove('d-none');
}

function ocultar(boton) {
    if (boton) boton.classList.add('d-none');
}