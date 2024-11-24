const { src, dest, watch, series } = require ("gulp");
const gulp = require("gulp");
const concat = require ("gulp-concat");
//const sass = require ("gulp-sass");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require ("gulp-autoprefixer");
const cssnano = require ("gulp-cssnano");
const rename = require ("gulp-rename");
const uglify = require ("gulp-uglify");
const pump = require ("pump");
const imagemin = require ("gulp-imagemin");
const clean = require('gulp-clean');
const browserSync =require("browser-sync").create();
const del = require('del');
const fs = require('fs');
var reload = browserSync.reload;
//копіювання HTML файлів в папку dist
function html_task(cb){
    pump([
        gulp.src( "app/*.html"),
        gulp.dest( "dist")
    ],
    cb);
}
exports.html = html_task;
//(У консолі прописуємо: gulp html)
//об'єднання, компіляція Sass в CSS, додавання префіксів і подальша мінімізація коду
function sass_task(cb){
    pump([
        gulp.src ( "app/sass/*.scss"),
        concat ( 'styles.scss'),
        sass (),
        autoprefixer ({
        overrideBrowserslist: [ 'last 2 versions'],
        cascade: false
        }),
        cssnano (),
        rename ({suffix: '.min'}),
        gulp.dest ( "dist/css/")
    ],
    cb
    );
}
//gulp.task('sass', sass_task);
exports.sass = sass_task;
//перекомпільовуємо scss у сss і закидаємо у app/css
function sass_toCSS_task(cb){  
    pump([
        //del(['app/css/styles.css','!app','!app/css']),// видаляємо файл 
        gulp.src("app/css/styles.css", {read : false}),// видаляємо файл 
        clean(),
        // fs.access('app/css/styles.css', (err)=>{
        //     if(!err) del(['app/css/styles.css','!app','!app/css'])
        //     gulp.src ( "app/sass/*.scss"),
        // sass().on('error', sass.logError),
        // gulp.dest ( "app/css/")
        // }),
        gulp.src ( "app/sass/*.scss"),//створюємо потік
        sass().on('error', sass.logError),//перекомпільовуємо scss у css
        gulp.dest ( "app/css/")//куди копіюємо 
    ],
    cb
    );
}
exports.sassToCSS = sass_toCSS_task;
//об'єднання і стиснення JS-файлів
function script_task(cb) {
    pump([
          gulp.src("app/js/*.js"),
          concat ( 'scripts.js'),
          uglify(),
          rename({suffix: '.min'}),
          gulp.dest('dist/js/')
      ],
      cb
    );
  }   
//gulp.task("scripts", script_task);
exports.scripts = script_task;
function img_task(cb){
    pump([
        gulp.src("app/img/*.+(jpg|jpeg|png|gif)"),
        imagemin ({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }),
        gulp.dest("dist/images/")
    ],
    cb
    );
}
//gulp.task("imgs",img_task);
exports.imgs = img_task;
function json_task(cb){
    pump([
        gulp.src( "app/data/*.json"),
        gulp.dest( "dist/data")
    ],
    cb);
}
exports.json = json_task;
   //(У консолі прописуємо: gulp imgs)
   //відстежування за змінами у файлах
function watching() {
    // Serve files from the root of this project
    browserSync.init({
        server: "./app",
        reloadDebounce: 1000,  // дає невеликий час для завантаження перед релоадом
    });
    
    gulp.watch("app/*.html").on("change", reload);
    gulp.watch("app/js/*.js").on("change", reload);
    gulp.watch("app/css/*.css").on("change", reload);
    gulp.watch("app/sass/*.scss").on("change", reload);
    gulp.watch("app/data/*.json", series(json_task, script_task)).on("change", reload);
    gulp.watch("app/images/*.+(jpg | jpeg | png | gif)").on("change", reload);
    watch ( "app/*.html",  html_task);
    watch ( "app/js/*.js",  script_task);
    watch ( "app/sass/*.scss",  sass_task);
    //watch ( "app/sass/*.scss",  sass_toCSS_task);
    watch ( "app/images/*.+(jpg | jpeg | png | gif)", img_task);
    watch ( "app/data/*.json",  json_task);
}
//gulp.task('serve', watching);
exports.watch = watching;
gulp.task('clean', function(cb){
    pump([
        gulp.src("dist/*", {read : false}),
        clean()
    ],
    cb);
});
   //(У консолі прописуємо: gulp watch)
   //Запуск тасків за замовчуванням
   exports.default = series(html_task,sass_task,script_task,img_task, json_task, watching);
   