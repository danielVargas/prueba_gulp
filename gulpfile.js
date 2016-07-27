var gulp = require('gulp');
//npm install --save-dev gulp-bower
var bower = require('gulp-bower');
//npm install gulp-sass --save-dev
var sass = require('gulp-sass');
// npm install --save-dev gulp-autoprefixer
var autoprefixer = require('gulp-autoprefixer');
//npm install wiredep --save-dev
var wiredep = require('wiredep').stream; 
//npm install --save-dev gulp-inject
var inject = require('gulp-inject');


gulp.task('bower', function() {
    return bower({
        directory: './app/bower_components'
    });
});
//Compila archivos Sass a Css 
gulp.task('sass', function(){
    gulp.src('./app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))    
    .pipe(gulp.dest('./app/css'));   
});

gulp.task('wiredep', function () {
    return gulp.src('./app/index.html')
    .pipe(wiredep({
        directory: './app/bower_components',
        bowerJson: require('./bower.json')        
    }))
    .pipe(gulp.dest('./app')); 
});

gulp.task('inject', function(){
    var target = gulp.src('./app/index.html');
    var sources = gulp.src(['./app/js/**/*.js', './app/styles/**/*.css'], {read: false});
 
  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./app'));

});

gulp.task('default', ['bower','sass','wiredep','inject']);