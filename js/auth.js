export async function login(usuario, contrasena) {
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: usuario,
                password: contrasena
            })
        });
        if(!response.ok){
            console.error('Credenciales incorrectas');
            return false;
        }

        const data = await response.json();

        return data;
    
    } catch (error) {
        console.error('Error en la solicitud');
        return false;
    }
}