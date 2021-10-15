const { series, src, dest, watch, parallel } = require('gulp');
const gulpSass = require('gulp-dart-sass'); //en el video esto es diferente (?)
const imagemin = require('gulp-imagemin'); //minificar imagenes
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades CSS
const autoprefixer = require('autoprefixer'); //Permite agregar prefijos
const postcss = require('gulp-postcss'); //Agrega cierto procesamiento a nuestro css
const cssnano = require('cssnano'); //Simplifica el codigo del app.css
const sourcemaps = require('gulp-sourcemaps'); //Identifica en donde quedan las referencias de los archivos originales

//Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
    imagenes: 'src/scss/app.scss',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css( ) {
    return src(paths.scss) // src es para indicarle la ruta del archivo .scss
        .pipe( sourcemaps.init() )
        .pipe( gulpSass() ) //compila SASS
        .pipe( postcss ( [autoprefixer(), cssnano()] ))
        .pipe( sourcemaps.write('.') )
        .pipe( dest('./build/css') ); //dest sirve para guardar en la ruta designada el archivo .css

}

function minificarCSS() {
    return src( paths.scss )
        .pipe( gulpSass({
            outputStyle: 'compressed' //version minificado del app.css. otro valor es "expanded"
        }) ) //compila SASS
        .pipe( dest('./build/css') ); 
}

function javascript() {
    return src( paths.js )
        .pipe( sourcemaps.init() )
        .pipe( concat('bundle.js') )
        .pipe( terser() )
        .pipe( sourcemaps.write('.') )
        .pipe( rename({ sufix: 'min' }))
        .pipe( dest('./build/js'));
}

function imagenes() {
    return src( paths.imagenes )
        .pipe( imagemin() )
        .pipe( dest('./build/img') )
        .pipe( notify({ message: 'Imagen minficada' }) );
}

function versionWebp() {
    return src( paths.imagenes )
        .pipe( webp() )
        .pipe( dest('./build/img') )
        .pipe( notify( {message: 'Version webp lista'} ));
}

function watchArchivos() {
    watch( paths.scss, css ); //sirve para ejecutar cambios automaticamente. En este caso, "escucha" los cambios que hay en el 1er parametro y ejecuta la funcion del 2do (css)
    // * = la carpeta actual - ** = Todos los archivos con esa extension
    watch( paths.js, javascript);
}

exports.css = css;
exports.minificarCSS = minificarCSS;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.versionWebp = versionWebp;

exports.default = series( css,javascript, imagenes, versionWebp, watchArchivos );