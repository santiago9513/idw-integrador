import { login } from './auth.js';

document.getElementById('loginForm').addEventListener('submit', async function (event) {    //Usa funcion asincrona para poder esperar la respuestas del servidor
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const pass = document.getElementById('contrasena').value;

    const usuarioValidado = await login(usuario, pass); //a traves de auth.js hace la solicitud al servidor y espera respuesta

    //Si el servidor devolvio datos validos, se guarda el usuario y token en sessionstorage
    if (usuarioValidado) {
        sessionStorage.setItem('usuario', usuarioValidado.username);
        sessionStorage.setItem('token', usuarioValidado.token);
        alert('Login exitoso');
        window.location.href = '../index.html';
    } else {
        alert('Usuario o contrasena incorrecta');
    }
});