document.addEventListener('DOMContentLoaded', () => {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const tabla = document.getElementById('tablaReservas');

    if (reservas.length === 0) {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td colspan="6" class="text-center">No hay reservas registradas.</td>`;
        tabla.appendChild(fila);
        return;
    }

    reservas.forEach(reserva => {
        const fila = document.createElement('tr');

        const fecha = new Date(reserva.fecha).toLocaleString();

        let serviciosTexto = '';
        if (reserva.servicios.length > 0) {
            serviciosTexto = reserva.servicios.map(s => s.nombre).join(', ');
        } else {
            serviciosTexto = 'Sin servicios';
        }

        fila.innerHTML = `
        <td>${reserva.id}</td>
        <td>${fecha}</td>
        <td>${reserva.cliente}</td>
        <td>${reserva.salon.nombre}</td>
        <td>${serviciosTexto}</td>
        <td>$${reserva.valortotal}</td>
        `;

        tabla.appendChild(fila);
    });
});