const form = document.getElementById('formReserva');
const selecSalon = document.getElementById('nombreSalon');
const tablaBody = document.querySelector('#tablaSalones tbody');
const selecServicio = document.getElementById('nombreServicio');

//Renderiza salones disponibles en form y tabla
function renderizarSalones(){
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    
    selecSalon.innerHTML = '<option value="" disabled selected>Seleccione un salon</option>';
    tablaBody.innerHTML = '';

    salones.forEach((salon, index) => {

        //Renderiza lista de salones disponibles como opciones en el form
        if (salon.estado === "Disponible") {
            const opcion = document.createElement('option');
            opcion.value = salon.nombre;
            opcion.textContent = `${salon.nombre} ($${salon.valor})`;
            selecSalon.appendChild(opcion);

            //Renderiza lista de salones disponibles en tabla
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td class="text-center"><img src="${salon.imagen}" alt="${salon.nombre}" style="width: 100px; height: 100px;"></td>
                <td class="text-center">${salon.nombre}</td>
                <td>${salon.direccion}</td>
                <td>${salon.descripcion}</td>
                <td class="text-center">$${salon.valor}</td>
                `;

            tablaBody.appendChild(fila);
        }
    });
}

//Renderiza lista de servicios en checkbox de form
function renderizarServicios(){
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    
    selecServicio.innerHTML = '';
    
    servicios.forEach((servicio, index) => {
        const div = document.createElement('div');
        div.className = 'form-check';
        div.innerHTML = `
            <input class="form-check-input" type="checkbox" id="servicio${index}" name="servicios" value="${servicio.nombre}">
            <label class="form-check-label" for="servicio${index}">
                ${servicio.nombre} ($${servicio.valor})
            </label>
        `;
        selecServicio.appendChild(div);
    });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const reservas = JSON.parse(localStorage.getItem('reservas')) || []; // Array de reservas

    // Captura salon seleccionado
    const salonSeleccionado = salones.find(s => s.nombre === selecSalon.value);

    // Captura servicios seleccionados
    const serviciosElegidos = servicios.filter(s => document.querySelector(`input[name="servicios"][value="${s.nombre}"]`).checked);

    // Calcula valor total
    let total = parseFloat(salonSeleccionado.valor);

    serviciosElegidos.forEach(servicio => {
        total += parseFloat(servicio.valor);
    });

    // Muestra resumen y confirmacion
    let resumen = `Salon:\n - ${salonSeleccionado.nombre} ($${salonSeleccionado.valor})\n`;

    resumen += `\nServicios:\n`;

    if (serviciosElegidos.length !== 0) {
        serviciosElegidos.forEach(servicio => {
            resumen += `- ${servicio.nombre} ($${servicio.valor})\n`;
        });
    } else {
        resumen += `- Sin servicios adicionales\n`;
    }

    resumen += `\nTotal: $${total}`;

    const confirmado = confirm(resumen + '\n\nConfirmar la reserva?');

    if (confirmado) {
        let nombreCliente = null;
        while (!nombreCliente) {
            nombreCliente = prompt("Ingrese nombre y apellido:");
        }

        // Actualiza localstorage con salon reservado
        const indexSalon = salones.findIndex(s => s === salonSeleccionado);
        if (indexSalon !== -1) {
            salones[indexSalon].estado = "Reservado";
            localStorage.setItem('salones', JSON.stringify(salones));
        }

        let idReserva;
        const idsReservas = reservas.map(r => r.id);
            if (idsReservas.length > 0) {
                idReserva = Math.max(...idsReservas) + 1;
            } else {
                idReserva = 0;
            }
        const fechaActual = new Date().toISOString();
        const nuevaReserva = {
            id: idReserva,
            cliente: nombreCliente,
            fecha: fechaActual,
            salon: salonSeleccionado,
            servicios: serviciosElegidos,
            valortotal: total
        };

        reservas.push(nuevaReserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));

        renderizarSalones();
        form.reset();

        //Si la reserva se cancela, no se guarda el estado de reserva del salon
        } else {
            alert('Reserva cancelada.');
        }
});

renderizarSalones();
renderizarServicios();

