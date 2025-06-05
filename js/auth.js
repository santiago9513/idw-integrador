export async function login(usuario, contrasena) {
    try {
        const response = await fetch('../utils/user.json');
        const usuarios = await response.json();

        const userOk = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

        return userOk !== undefined;
    
    } catch (error) {
        console.error('Error en la solicitud');
        return false;
    }
}