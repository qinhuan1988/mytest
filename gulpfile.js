var gulp = require('gulp-help')(require('gulp')),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gettext = require('gulp-angular-gettext'),
    templateCache = require('gulp-angular-templatecache'),
    clean = require('gulp-clean'),
    shell = require('gulp-shell'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    preprocess = require('gulp-preprocess'),
    requireDir = require('require-dir'),
    args = require('yargs').argv,
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version'),
    sonarqubeScanner = require('sonarqube-scanner'),
    merge = require('merge-stream'),
    gulpIf = require('gulp-if');

requireDir('node_modules/gulp-tasks/tasks-cordova');

var APP_DIRECTORY = './dist';
var isWatching = false;

gulp.task('default', ['watch']);




gulp.task('serve', 'Serve internally and externally on port 3000', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        files: APP_DIRECTORY + '/**/*'
    });
});




gulp.task('watch', 'Watch changes for bundling project', function() {
    isWatching = true;

    function logFileChange(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    }

    gulp.watch('app/sass/**/*.scss', ['css']).on('change', logFileChange);
    gulp.watch('app/img/**/*.*', ['copyimg']).on('change', logFileChange);
    gulp.watch('app/js/**/*.html', ['ngTemplate', 'pot']).on('change', logFileChange);

    gulp.watch([
        'app/js/**/*.js',
        '!app/js/**/*.test.js' // we don't want to browerify when a test change...
    ], function () {
        runSequence(
            'jshint',
            'browserify:dev',
            'pot'
        );
    }).on('change', logFileChange);

    gulp.watch('app/js/**/*.test.js', function () {
        runSequence(
            'jshint',
            'test'
        );
    }).on('change', logFileChange);
});


var karmaServer = require('karma').Server;

gulp.task('test', function (done) {
      var server = new karmaServer({
          configFile: __dirname + '/karma.conf.js',
          singleRun: true
      }, done);

      server.start();
});


gulp.task('clean', 'Clean ' + APP_DIRECTORY + ' directory', shell.task(
    ['rm -rf ' + APP_DIRECTORY]
));




gulp.task('pot', 'Extract keys from HTML and JS files', function() {
    return gulp.src(['app/js/**/*.html', 'app/js/**/*.js'])
        .pipe(gettext.extract('template.pot'))
        .pipe(gulp.dest('po/'));
});




gulp.task('translations', 'Compiles translation to an angular module', function() {
    return gulp.src('po/**/*.po')
        .pipe(gettext.compile({
            // options to pass to angular-gettext-tools...
            format: 'javascript'
        }))
        .pipe(gulp.dest('app/js/translations/po'));
});




gulp.task('jshint', 'JSHINT JS files', function() {
    return gulp.src(['gulpfile.js', 'app/js/**/*.js', 'test/**/*.js', '!app/js/main.js', '!app/js/i18n/**/*.js', '!app/js/libs/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulpIf(!isWatching, jshint.reporter('fail')));
});




gulp.task('copyfonts', 'Copy fonts from ionic and /fonts', function() {
    var ngFonts = gulp.src(['./node_modules/ionic-angular/release/fonts/**/*.{otf,eot,svg,ttf,woff,woff2}'])
        .pipe(gulp.dest(APP_DIRECTORY + '/fonts/ionic'));


    var vendortFonts = gulp.src(['./app/fonts/*.{otf,eot,svg,ttf,woff,woff2}'])
        .pipe(gulp.dest(APP_DIRECTORY + '/fonts/bmw'));

    return merge(ngFonts, vendortFonts);
});




gulp.task('copyimg', 'Copy files in /img', function() {
    return gulp.src('./app/img/**/*.*')
        .pipe(gulp.dest(APP_DIRECTORY + '/img'));
});




gulp.task('copy:locales', 'Copy /js/i18n/{{locales files}}', function() {
    return gulp.src(['./app/js/i18n/**'])
        .pipe(gulp.dest('./dist/js/i18n/'));
});




gulp.task('css', 'Compiles SCSS files', function() {
    return sass('app/sass/style.scss', {
            style: 'compressed'
        })
        .on('error', function(err) {
            console.log(err.message);
        })
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 10']
        }))
        .pipe(gulp.dest(APP_DIRECTORY + '/css'));
});




gulp.task('ngTemplate', 'Create an angular module for your templates', function() {
    return gulp.src('app/js/modules/**/*.html')
        .pipe(templateCache('template.js', {
            module: 'webapp.template',
            standalone: true,
            root: 'js/modules/'
        }))
        .pipe(gulp.dest('app/js/'));
});




gulp.task('html', 'Generates index.html compatible CORDOVA', function() {
    return gulp.src('./app/index.html')
        .pipe(preprocess({
            context: {
                CORDOVA: true
            }
        }))
        .pipe(gulp.dest('./dist/'));
});




gulp.task('browserify:dev', 'Bundles your JS for development', function() {
    return gulp.src(['app/js/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(APP_DIRECTORY + '/js'));
});

gulp.task('browserify:prod', 'Bundles your JS for production', function() {
    return gulp.src(['app/js/main.js'])
        .pipe(browserify())
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest(APP_DIRECTORY + '/js'));
});




function incrementVersion(importance) {
    return gulp.src('./package.json')
        .pipe(bump({
            type: importance
        }))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('bumps package version'))
        // read only one file to get the version number
        .pipe(filter('package.json'))
        .pipe(tag_version());
}

gulp.task('version:patch', function() {
    return incrementVersion('patch');
});
gulp.task('version:feature', function() {
    return incrementVersion('minor');
});
gulp.task('version:release', function() {
    return incrementVersion('major');
});




/* Setup Tasks */

gulp.task('setup', function(callback) {
    runSequence('clean', 'ngTemplate', 'copyfonts', 'copyimg', 'html', 'css', 'copy:locales', 'translations', 'config',callback);
});




/*
 * Configure project for an environment
 *
 * @args: --env {dev/qa/prod}
 *
 */
gulp.task('config', 'Inject environment configuration (--env {dev/qa/prod})', function(callback) {
    if (!args || !isValidEnvironment(args.env)) {
        args.env = 'qa';
        console.warn('no env, fallback to QA...');
    }
     return gulp.src('./config/' + args.env + '/env.js')
                .pipe(gulp.dest('app/js'));
});




/*
 * Build for distribution
 *
 * @args: --env {dev/qa/prod}
 *
 */
gulp.task('build', 'Build for environment passed in argument (--env {dev/qa/prod})', function(callback) {
    if (args && isValidEnvironment(args.env)) {
        var minificationMode = getMinificationMode(args.env);
        runSequence(
            'jshint',
            'test',
            'setup',
            'config',
            'browserify:' + minificationMode,
            callback
        );
    } else {
        console.warn('no env passed to the task, abording...');
        callback();
    }
});




/*
 * Sonar scan
 *
 * TODO:
 *   - Delete this gulp task after Jenkins setup
 *
 */
gulp.task('sonar:scan', function(callback) {
    sonarqubeScanner({
        serverUrl: "https://sonar-cn.mcon-group.com/",
        token: "94339e6f6541892c4ecc295ba0fa640df8c45f0f",
        options: {
            "sonar.projectKey": "bmw-loyalty--bmw-lp-fe",
            "sonar.projectName": "bmw-lp-fe",
            "sonar.sources": "app/js",
            "sonar.exclusions": "po/**, dist/**, etc/**, cordova/**, cordova-build/**"
        }
    }, callback);
});





/* Helpers functions */

function isValidEnvironment(env) {
    if (env === 'dev' ||
        env === 'qa' ||
        env === 'prod') {
        return true;
    } else {
        return false;
    }
}

function getMinificationMode(env) {
    if (env === 'prod') {
        return 'prod';
    } else {
        return 'dev';
    }
}
