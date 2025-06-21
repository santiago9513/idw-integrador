
//crea los salones default y los guarda en localstorage
const salonesDefault = [
  {
    nombre: "Salón Aire Libre",
    direccion: "San Martin 456",
    descripcion: "Un espacio fresco y natural, ideal para eventos al aire libre, con juegos interactivos y áreas verdes para disfrutar del aire libre en cualquier ocasión.",
    valor: 35000,
    estado: "Reservado",
    imagen: "img/ImagenSalonAireLibre.jpg"
  },
  {
    nombre: "Salón Aventura",
    direccion: "Av. Rivadavia 1234",
    descripcion: "Un salón lleno de emociones y diversión, con juegos para escalar y moverse. Perfecto para niños inquietos.",
    valor: 40000,
    estado: "Disponible",
    imagen: "img/ImagenSalonAventura.jpg"
  },
  {
    nombre: "Salón Cuento",
    direccion: "Mitre 1010",
    descripcion: "Inspirado en cuentos, con rincón de lectura y decoración mágica.",
    valor: 38000,
    estado: "Disponible",
    imagen: "img/ImagenSalonCuento.jpg"
  },
  {
    nombre: "Salón Selva",
    direccion: "Av. Colón 789",
    descripcion: "Un ambiente exótico inspirado en la naturaleza, te invita a jugar y divertirte.",
    valor: 37000,
    estado: "Disponible",
    imagen: "img/ImagenSalonSelva.jpg"
  },
  {
    nombre: "Salón FarmHouse",
    direccion: "Quintana 6670",
    descripcion: "Ofrece un entorno cálido, natural y lleno de encanto. La protagonista: una gran casita estilo granja, rodeada de aire libre y decoración campestre, donde los peques pueden jugar, explorar y conectarse con lo simple y lo lindo de la infancia.",
    valor: 60000,
    estado: "Reservado",
    imagen: "img/ImagenSalonFarmHouse.jpg"
  },
  {
    nombre: "Salón Baby",
    direccion: "Magallanes 620",
    descripcion: "Diseñado especialmente para bebés de 0 a 2 años, con espacios seguros, suaves y estimulantes para que descubran el mundo a su ritmo. Juegos sensoriales, colores suaves, rincones de exploración y mucho amor en cada detalle.",
    valor: 50000,
    estado: "Disponible",
    imagen: "img/ImagenSalonBaby.jpg"
  }
];

//Si no hay datos en el localstorage, carga los salones default
if (!localStorage.getItem('salones')) {
  localStorage.setItem('salones', JSON.stringify(salonesDefault));
}

//carga salones al catalogo (renderiza)
document.addEventListener('DOMContentLoaded', () => {   //Espera a que el DOM este cargado
  const catalogo = document.getElementById('catalogoSalones');
  const salones = JSON.parse(localStorage.getItem('salones')) || [];

  //Recorre cada salon del arreglo y genera una card para el catalogo
  salones.forEach(salon => {
    const article = document.createElement('article');
    article.className = 'col';

    article.innerHTML = `
      <div class="card h-100">
        <img src="${salon.imagen || 'img/salonDefault.png'}" class="card-img-top" alt="Imagen de ${salon.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${salon.nombre}</h5>
          <p class="card-text">${salon.descripcion}</p>
          <p class="card-text"><strong>Dirección:</strong> ${salon.direccion}</p>
          <p class="card-text text-center mt-auto"><span class="badge fs-6 bg-${salon.estado === 'Disponible' ? 'success' : 'danger'}">${salon.estado}</span></p>
        </div>
        <div class="card-footer">
          <p class="fw-bold mb-0">Precio: $${Number(salon.valor).toLocaleString()}</p>
        </div>
      </div>
    `;

    catalogo.appendChild(article);
  });
});