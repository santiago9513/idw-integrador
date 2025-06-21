document.addEventListener('DOMContentLoaded', async () => { //Espera a que el DOM este cargado
    
    if (!sessionStorage.getItem('usuario')) {   //Si no hay usuario logueado, redirige a login.html
        alert('Debe loguearse');
        window.location.href = "js/login.html";
        return;
    }

    const salir = document.getElementById('logout');    // Boton salir, borra la sesion y redirige a salones.html
    if (salir) {
        salir.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
    }

    const tabla = document.querySelector('#tablaUsuarios tbody');

    try {   //Hace una solicitud GET a la API para obtener usuarios
        const response = await fetch('https://dummyjson.com/users');
        
        if (response.ok) {  //Verifica respuesta exitosa
            const data = await response.json(); //obtiene arreglo de usuarios
            const usuarios = data.users;    

            usuarios.forEach((usuario) => { //Recorre cada usuario y lo renderiza en la tabla
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${usuario.firstName}</td>
                    <td>${usuario.lastName}</td>
                    <td>${usuario.age}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.address.city}</td>
                `;

                tabla.appendChild(fila);
            });
        } else {    //Error en la consulta
            console.error(response.status);
            throw Error("Error al consultar")
        }

    } catch (error) {   //Error en la solicitud a la API
        console.error("Error: ", error);
        alert("Error con la api de usuarios");
    };
});