document.addEventListener('DOMContentLoaded', function() {
    crearGalaeria();
})

function crearGalaeria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++ ) {
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenID = i;

        //Añadir funcion de mostrar imagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {
    const id = parseInt( e.target.dataset.imagenID );

    //Generar la imagen
    const imagen = document.createElement('IMG')
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //Cerrar imagen con un click en el overlay
    overlay.onclick = function() {
        overlay.remove();
    }

    //Boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');
    overlay.appendChild(cerrarImagen);

    //Evento de cerrar cuando se presiona el boton
    cerrarImagen.onclick = function() {
        overlay.remove();
    }


    //Motrar en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);

}