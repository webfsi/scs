"use strict";

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    watch       = require('gulp-watch'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    rigger      = require('gulp-rigger'),
    rimraf      = require('rimraf'),
    // wait        = require('gulp-wait'),
    changed     = require('gulp-changed'),
    gutil       = require('gulp-util'),
    cheerio     = require('gulp-cheerio'),
    replace     = require('gulp-replace'),
    svgSprite   = require('gulp-svg-sprite'),
    reload      = browserSync.reload;

var config = {
    server: {
        baseDir: "build"
    },
    // online: false,
    // tunnel: true,
    index: "preview.html",
    host: 'localhost',
    port: 9000,
    logPrefix: "FS-server"
};

// npm install gulp-cheerio gulp-replace gulp-svg-sprite --save-dev

var configsvg = {
    mode: {
        symbol: {
            dest : '.',
            sprite: "sprite.svg",
            render: {
                sass: {
                    dest: '../../../_sprite-svg.sass',
                    template: 'src/style/helpers/_sprite_svg_template.sass'
                }
            }
        }
    }
};

var path = {
    build: {
        html: 'build',
        jslibs: 'build/js/libs',
        js: 'build/js',
        css: 'build/css',
        img: 'build/img',
        fonts: 'build/fonts'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/**/*',
        jsnomain: ['!src/js/main.js', 'src/js/**/*'],
        jsmain: 'src/js/main.js',
        style: 'src/style/main.sass',
        css: 'src/css/*',
        img: 'src/img/**/*',
        fonts: 'src/fonts/*',
        jslibs: 'src/js/libs',
        svgicon: 'src/img/icons/',
        jsfolder: 'src/js'
    },
    watch: {
        html: 'src/**/*.html',
        jsmain: 'src/js/main.js',
        jsnomain: ['!src/js/main.js', 'src/js/**/*.js'],
        style: 'src/style/**/*',
        css: 'src/css/*',
        img: 'src/img/**/*',
        fonts: 'src/fonts/*.*'
    },
    bower: {
        fancy: 'bower_components/fancybox/dist/jquery.fancybox.min.js',
        owl: 'bower_components/owl.carousel/dist/owl.carousel.min.js',
        jcf: 'bower_components/jcf/js/jcf.js',
        // jcf: 'bower_components/noUiSlider/distribute/nouislider.min.js',
        jquery: 'bower_components/jquery/dist/jquery.min.js'
    },
    clean: 'build'
};

gulp.task('webserver', function () {
    browserSync(config);
});

// zborka

// main.svg
gulp.task('spritesvg', function () {
    return gulp.src(path.src.svgicon + '*.svg')
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite(configsvg))
    .pipe(gulp.dest(path.src.svgicon));
});

// gulp spritesvg

// main.js
gulp.task('jsmain:build', function () {
    return gulp.src(path.src.jsmain)
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

// Other js files
gulp.task('js:build', function() {
    return gulp.src(path.src.jsnomain)
        .pipe(gulp.dest(path.build.js));
});

// styles
gulp.task('style:build', function () {
    return gulp.src(path.src.css)
    // return gulp.src(path.src.style)
        //, {base:'src/style'}
        // .pipe(wait(200))
        // .pipe(changed(path.build.css))
        // .pipe(sourcemaps.init())
        // .pipe(sass({
        //     includePaths: ['src/style'],
        //     errLogToConsole: true,
        //     outputStyle: 'expanded'
        // }))
        // .on('error', sass.logError)
        // .on('error', gutil.log)
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

// Html
gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

// Images
gulp.task('image:build', function () {
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.reload({stream: true}));
});

// Fonts
gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// export Build
gulp.task('build', [
    'jsmain:build',
    'js:build',
    'style:build',
    'html:build',
    'fonts:build',
    'image:build'
]);

// Watch
// setTimeout(function(){ // задержка
// }, 500);
gulp.task('watch', function(){
    watch([path.watch.html], {usePolling: true}, function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], {usePolling: true}, function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.jsmain], {usePolling: true}, function(event, cb) {
        gulp.start('jsmain:build');
    });
    watch(path.watch.jsnomain, {usePolling: true}, function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], {usePolling: true}, function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], {usePolling: true}, function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('startnewproject', function () {
    return gulp.src('../../zdefault/import/**/*')
        .pipe(gulp.dest(''));
});

gulp.task('default', ['build', 'watch', 'webserver']);



//dop tasks
// compress img
gulp.task('imgcompress', function() {
  return gulp.src('src/img/**/*') 
    .pipe(imagemin({ 
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('clean', ['build', 'imgcompress'], function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('spritepng', function() {
    var spriteData = 
        gulp.src('src/img/icon/*.png') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
                imgPath: '../img/sprite.png',
                algorithm: 'binary-tree',
                padding: 10
            }));

    spriteData.img.pipe(gulp.dest('src/img')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('src/style/helpers')); // путь, куда сохраняем стили
});

gulp.task('jslibs:src', function() {
    return gulp.src([
            path.bower.owl,
            path.bower.fancy
        ])
        .pipe(gulp.dest(path.src.jslibs));
});

gulp.task('jscompress:src', function() {
    return gulp.src(path.bower.jcf)
        .pipe(uglify())
        .pipe(gulp.dest(path.src.jslibs));
});

gulp.task('jsjquery:src', function() {
    return gulp.src(path.bower.jquery)
        .pipe(gulp.dest(path.src.jsfolder));
});

gulp.task('bower', ['jslibs:src', 'jscompress:src', 'jsjquery:src']);


// gulp startnewproject
// добавляем плагины
// bower i
// gulp
// gulp clean
// gulp build
// gulp imgcompress
// gulp bower
// gulp spritepng
// gulp spritesvg