
document.addEventListener('DOMContentLoaded', function(){
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
  scrollNav();
  navegacionFija();
  navMobile();
}

// Navegación fija

function navegacionFija() {
  const barra = document.querySelector('.header');
  const contenidoFestival = document.querySelector('.contenido-festival');
  const body = document.querySelector('body');

  window.addEventListener('scroll', function() {
    if( contenidoFestival.getBoundingClientRect().top < 0 ) {
      barra.classList.add('fijo');
      body.classList.add('body-scroll');
    } else {
      barra.classList.remove('fijo');
      body.classList.remove('body-scroll');
    }
  });
}

// Scroll Nav

function scrollNav() {
  const enlaces = document.querySelectorAll('.contenido-header a');
  enlaces.forEach( enlace => {
    enlace.addEventListener('click', function(e){
      e.preventDefault();
      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      const navegacion = document.querySelector('.header');
      seccion.scrollIntoView({behavior: 'smooth'});
      navegacion.classList.remove('active');
    });
  });
}

// Galería

function crearGaleria() {
  const galeria = document.querySelector('.galeria-imagenes');

  for(let i = 1; i <= 12; i++) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
      <source srcset="build/img/thumb/${i}.avif" type="image/avif">
      <source srcset="build/img/thumb/${i}.webp" type="image/webp">
      <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imágen galería">
    `;

    imagen.onclick = function() {
      mostrarImagen(i);
    }
    galeria.appendChild(imagen);
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement('picture');
  imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imágen galería">
  `;

  // Crea el overlay con la imagen
  const overlay = document.createElement('DIV');
  overlay.appendChild(imagen);
  overlay.classList.add('overlay');
  overlay.onclick = function() {
    const body = document.querySelector('body');
    body.classList.remove('fijar-body');
    overlay.remove();
  }

  // Botón para cerrar el modal
  const cerrarModal = document.createElement('P');
  cerrarModal.textContent = 'X';
  cerrarModal.classList.add('btn-cerrar');
  cerrarModal.onclick = function() {
    const body = document.querySelector('body');
    body.classList.remove('fijar-body');
    overlay.remove();
  }
  
  overlay.appendChild(cerrarModal);

  // Se añade al HTML
  const body = document.querySelector('body');
  body.appendChild(overlay);
  body.classList.add('fijar-body');
}

// Mobile Nav

function navMobile() {
  const iconoNavMobile = document.querySelector('.contenido-header .nav-mobile');
  const navegacion = document.querySelector('.header');
  
  iconoNavMobile.addEventListener('click', ()=> {
    navegacion.classList.toggle('active');
  });
}
