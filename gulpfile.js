var gulp  = require('gulp');
// include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'del'],
    replaceString: /\bgulp[\-.]/
});
var config = require('./gulp.config.json');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


// create a default task to build the app
gulp.task('default', [ 'html', 'bowerFonts', 'bowercss', 'appcss', 'typescript', 'bowerjs' ], function() {
});

// transpiles all typescript files to single javascript file
gulp.task('typescript', function () {
    return gulp.src(config.allTypescript)
        .pipe(plugins.plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(plugins.typescript({
            noImplicitAny: false,
            out: config.typescriptOut,
        }))
        .pipe(gulp.dest(config.jsDestinationFolder))
        .pipe(reload({stream: true}));
});

// copy html from src to dist
gulp.task('html', function () {
    return gulp.src(config.allHtml)
	    .pipe(gulp.dest(config.destinationFolder));
});

// merges all bower js files into single vendor.js
gulp.task('bowerjs', function() {
    return gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter(config.bowerJs))
        .pipe(plugins.debug())
        .pipe(plugins.concat(config.bowerJsOut))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.jsDestinationFolder));
});

// merges all bower css files into single vendor.css
gulp.task('bowercss', function() {
    return gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter(config.bowerCss))
        .pipe(plugins.debug())
        .pipe(plugins.concat(config.bowerCssOut))
        .pipe(gulp.dest(config.cssDestinationFolder));
});

// copy fonts
gulp.task('bowerFonts', function() {
     return gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter(config.bowerFonts))
        .pipe(plugins.print())
        .pipe(gulp.dest(config.fontsDestinationFolder));
});

// merges all app css files into app.css
gulp.task('appcss', function () {
    return gulp.src(config.allCss)
        .pipe(gulp.dest(config.cssDestinationFolder))
        .pipe(reload({
            stream: true
        }));
});

// force clean dist
gulp.task('clean', function(done) {
    plugins.del(config.destinationFolder, {
        force: true
    }, done);
});

// serve
gulp.task('serve', ['default'], function () {

    // serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: config.baseDirectory
        }
    });

    // watch html, typescript and css files, and do reload on change
    gulp.watch(config.allHtml, ['html']).on("change", reload);
    gulp.watch(config.allTypescript, ['typescript']).on("change", reload);
	gulp.watch(config.allCss, ['appcss']).on("change", reload);
});
