import { login } from './auth.js'

document.getElementById('loginForm').addEventListener('submit', async function(event){
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const pass = document.getElementById('contrasena').value;

    const usuarioValidado = await login(usuario,pass);
    
    if(usuarioValidado) {
        sessionStorage.setItem('usuario', usuario);
        alert('Login exitoso');
        window.location.href = '../adminSalones.html';
    }   else {
        alert('Usuario o contrasena incorrecta');
    }
    });