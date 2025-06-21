//crea los servicios default y los guarda en localstorage
const serviciosDefault = [
  {
    nombre: "Animación Infantil",
    descripcion: "Contamos con animadores que organizan juegos, shows y actividades para que todos se diviertan.",
    valor: 9000,
    imagen: "img/animacion.png"
  },
  {
    nombre: "Catering",
    descripcion: "Ofrecemos un servicio de catering con opciones adaptadas para grandes y chicos: menú saludable, dulces y salados.",
    valor: 12000,
    imagen: "img/catering.png"
  },
  {
    nombre: "Fotografía y Video",
    descripcion: "Capturamos los mejores momentos del evento con fotos y videos profesionales para que tengas un recuerdo inolvidable.",
    valor: 9000,
    imagen: "img/fotografia.png"
  },
  {
    nombre: "Alquiler de Inflables",
    descripcion: "Disponemos de inflables seguros y divertidos para todas las edades.",
    valor: 15000,
    imagen: "img/inflables.png"
  },
  {
    nombre: "Música y DJ",
    descripcion: "Música para todos los eventos.",
    valor: 8000,
    imagen: "img/dj.png"
  },
  {
    nombre: "Decoración Temática",
    descripcion: "Temáticas personalizadas con decoración única y creativa.",
    valor: 8000,
    imagen: "img/decoracion.png"
  },
  {
    nombre: "Cotillón",
    descripcion: "Cotillón colorido y divertido que complementa la fiesta.",
    valor: 6000,
    imagen: "img/cotillon.png"
  }
];

//Si no hay datos en el localstorage, carga los servicios default
if (!localStorage.getItem('servicios')) {
  localStorage.setItem('servicios', JSON.stringify(serviciosDefault));
}

//carga servicios al catalogo (renderiza)
document.addEventListener('DOMContentLoaded', () => {
  const catalogo = document.getElementById('catalogoServicios');
  const servicios = JSON.parse(localStorage.getItem('servicios')) || [];

  //Recorre cada servicio del arreglo y genera una card para el catalogo
  servicios.forEach(servicio => {
    const article = document.createElement('article');
    article.className = 'col';

    article.innerHTML = `
      <div class="card h-100">
        <img src="${servicio.imagen || 'img/salonDefault.png'}" class="card-img-top" alt="Imagen de ${servicio.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${servicio.nombre}</h5>
          <p class="card-text">${servicio.descripcion}</p>
        </div>
        <div class="card-footer">
          <p class="fw-bold mb-0">Precio: $${Number(servicio.valor).toLocaleString()}</p>
        </div>
      </div>
    `;

    catalogo.appendChild(article);
  });
});