import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as Sass from 'sass';
import sourcemap from 'gulp-sourcemaps';//mapeia a origem do arquivo
import uglify from 'gulp-uglify';//comprime o codigo
import obfuscate from 'gulp-obfuscate';//obscurece o codigo(deixa inelegivel)
import imagemin from 'gulp-imagemin';//minifica imagens
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";

const sass = gulpSass(Sass);

function compilarSass(){
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemap.init())//inicia o mapeamento
        .pipe(sass({
            outputStyle: 'compressed' //comprime o arquivo css
        }))
        .pipe(sourcemap.write('./map'))//cria a pasta do mapeamento
        .pipe(gulp.dest('./build/styles'))
}

function compilarJs(){
    return gulp.src('./source/js/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/js'))
}

function comprimirImage(){
    return gulp.src('./source/images/*')
        .pipe(imagemin([
            imageminGifsicle({ interlaced: true }), // Otimiza GIFs para carregar de maneira progressiva
            imageminMozjpeg({ quality: 70, progressive: true }), // Otimiza JPEGs com qualidade 75
            imageminPngquant({ quality: [0.6, 0.8] }), // Otimiza PNGs com qualidade entre 60% e 80%
        ]))
        .pipe(gulp.dest('./build/images'))
}

const main = gulp.series(compilarJs, compilarSass, comprimirImage);
export{main as default}