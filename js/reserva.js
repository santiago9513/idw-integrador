const form = document.getElementById('formReserva');
const selecSalon = document.getElementById('nombreSalon');
const tablaBody = document.querySelector('#tablaSalones tbody');
const selecServicio = document.getElementById('nombreServicio');

//Renderizo salones disponibles en form y tabla
function renderizarSalones(){
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    
    selecSalon.innerHTML = '<option value="" disabled selected>Seleccione un salon</option>';
    tablaBody.innerHTML = '';

    salones.forEach((salon, index) => {

        //Renderizo lista de salones disponibles como opciones en el form
        if (salon.estado === "Disponible") {
            const opcion = document.createElement('option');
            opcion.value = salon.nombre;
            opcion.textContent = `${salon.nombre} ($${salon.valor})`;
            selecSalon.appendChild(opcion);

            //Renderizo lista de salones disponibles en tabla
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

//Renderizo lista de servicios en checkbox de form
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

    // Capturo salon seleccionado
    const salonSeleccionado = salones.find(s => s.nombre === selecSalon.value);

    // Capturo servicios seleccionados
    const serviciosElegidos = servicios.filter(s => document.querySelector(`input[name="servicios"][value="${s.nombre}"]`).checked);

    // Calculo valor total
    let total = parseFloat(salonSeleccionado.valor);
    serviciosElegidos.forEach(servicio => {
        total += parseFloat(servicio.valor);
    });

    // Muestro resumen 
    let resumen = `Salón: ${salonSeleccionado.nombre} ($${salonSeleccionado.valor})\n`;
    resumen += `\nServicios:\n`;
    if (serviciosElegidos.length === 0) {
        resumen += `- Sin servicios adicionales\n`;
    } else {
        serviciosElegidos.forEach(servicio => {
            resumen += `- ${servicio.nombre} ($${servicio.valor})\n`;
        });
    }
    resumen += `\nTotal: $${total}`;

    const confirmado = confirm(resumen + '\n\nConfirmar la reserva?');

    if (confirmado) {
        // Actualizo localstorage con salon reservado
        const indexSalon = salones.findIndex(s => s === salonSeleccionado);
        if (indexSalon !== -1) {
            salones[indexSalon].estado = "Reservado";
            localStorage.setItem('salones', JSON.stringify(salones));
        }

        renderizarSalones();
        form.reset();
        } else {
            alert('Reserva cancelada.');
        }
});

renderizarSalones();
renderizarServicios();

