var gulp  = require('gulp'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('main-bower-files'),
    order = require('gulp-order'),
    filter = require('gulp-filter')
    exec = require('child_process').exec;

// Путь к собранным файлам
var buildPath = "src/build";

// Компоненты bower
var vendorsJsFiles = mainBowerFiles({
  filter:'**/*.js',
    paths: {
        bowerDirectory: 'bower_components'
    }
});
var vendorsCssFiles = mainBowerFiles({
  filter:'**/*.css',
    paths: {
        bowerDirectory: 'bower_components'
    }
});

// Пути к пользовательским файлам
var leoJsPath    = 'src/app/**/*.js',
    leoCssPath   = 'src/app/styles.css',
    leoFontsPath = 'src/assets/fonts/*';

gulp.task('vendors_js', function(){
  return gulp.src(vendorsJsFiles)
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest(buildPath + '/js'));
});

gulp.task('vendors_css', function(){
  return gulp.src(vendorsCssFiles)
  .pipe(concat('vendors.css'))
  .pipe(gulp.dest(buildPath + '/css'));
});

gulp.task('leo_js', function(){
  return gulp.src(leoJsPath)
  .pipe(order([
    "**/**.module.js",
    "**/*.js"
  ]))
  .pipe(concat('leo.js'))
  .pipe(gulp.dest(buildPath + '/js'));
});

gulp.task('leo_css', function(){
  return gulp.src(leoCssPath)
  .pipe(concat('leo.css'))
  .pipe(gulp.dest(buildPath + '/css'));
});

gulp.task('leo_fonts', function(){
  return gulp.src(leoFontsPath)
  .pipe(gulp.dest(buildPath + '/fonts'));
});

gulp.task('server', function (cb) {
  exec('node server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('watch', function(){
  gulp.watch(vendorsJsFiles, ['vendors_js']);
  gulp.watch(vendorsCssFiles, ['vendors_css']);
  gulp.watch(leoJsPath, ['leo_js']);
  gulp.watch(leoCssPath, ['leo_css']);
});

// Выполняет сборку
gulp.task('build', ['vendors_js', 'vendors_css', 'leo_js', 'leo_css','leo_fonts']);

// Собирает проект, запускает сервер и отслеживает изменения
gulp.task('default', ['serve']);
gulp.task('serve', ['build', 'server', 'watch']);
// Альтернативный вызов для запуска сервера и отслеживания изменений (без предварительной сборки)
gulp.task('run', ['server', 'watch']);

