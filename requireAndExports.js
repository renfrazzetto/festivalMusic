const { series, parallel } = require('gulp'); //Extrae la funcion de series de Gulp. el require sirve para importar

function css( done ) {
    console.log("Compilando... SASS");

    done(); //sirve para que no nos devuelva el texto de "tasks did not complete"
} //En la terminal poner "gulp css"

function javascript( done ) {
    console.log('Compilando JavaScript...');

    done();
}

exports.css = css;//Asi se llama a la funcion hola()
exports.javascript = javascript;
exports.default = series( css, javascript );// gulp (como tiene default, no hace falta poner nada despues del "gulp") (en la terminal) ejecuta las 2 funciones, en serie.
export.default = parallel( css, javascript ); //Ejecuta las tareas al mismo tiempo