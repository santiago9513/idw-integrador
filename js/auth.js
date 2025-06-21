export async function login(usuario, contrasena) {
    // Hace una solicitud POST a la API de autenticacion con el usuario y contrasena ingresados
    try {   
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usuario,
                password: contrasena
            })
        });
        //Verifica si la respuesta es correcta
        if (!response.ok) {
            console.error('Credenciales incorrectas');
            return false;
        }

        //Devuelve los datos recibidos (token, usuario)
        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error en la solicitud');
        return false;
    }
}