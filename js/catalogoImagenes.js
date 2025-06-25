//crea los imagenes default y los guarda en localstorage
const imagenesDefault = [
  {
    id: 0,
    idSalon: 0,
    ruta: "img/ImagenSalonAireLibre.jpg"
  },
  {
    id: 1,
    idSalon: 1,
    ruta: "img/ImagenSalonAventura.jpg"
  },
  {
    id: 2,
    idSalon: 2,
    ruta: "img/ImagenSalonCuento.jpg"
  },
  {
    id: 3,
    idSalon: 3,
    ruta: "img/ImagenSalonSelva.jpg"
  },
  {
    id: 4,
    idSalon: 4,
    ruta: "img/ImagenSalonFarmHouse.jpg"
  },
  {
    id: 5,
    idSalon: 5,
    ruta: "img/ImagenSalonBaby.jpg"
  }
];

//Si no hay datos en el localstorage, carga las imagenes default
if (!localStorage.getItem('imagenes')) {
  localStorage.setItem('imagenes', JSON.stringify(imagenesDefault));
}