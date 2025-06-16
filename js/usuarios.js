document.addEventListener('DOMContentLoaded', async () => {
    if (!sessionStorage.getItem('usuario')) {
        alert('Debe loguearse');
        window.location.href = "js/login.html";
        return;
    }

    const salir = document.getElementById('logout');
    if (salir) {
        salir.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
    }

    const tabla = document.querySelector('#tablaUsuarios tbody');

    try {
        const response = await fetch('https://dummyjson.com/users');
        if (response.ok) {
            const data = await response.json();
            const usuarios = data.users;

            usuarios.forEach((usuario) => {
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
        } else {
            console.error(response.status);
            throw Error("Error al consultar")
        }

    } catch (error) {
        console.error("Error: ", error);
        alert("Error con la api de usuarios");
    };
});