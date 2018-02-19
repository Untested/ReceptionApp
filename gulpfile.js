var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');

// Source and Destination Folders
var imgInput = './src/img/*.*';
var imgOutput = './public/img';
var htmlInput = './src/*.html';
var htmlOutput = './public';
var es6Input = './src/js/*.js';
var es6Output = './public/js';
var sassInput = './src/css/*.scss';
var sassOutput = './public/css';
var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};
var sassdocOptions = {
	dest: './public/css/sassdoc'
};

// Target Old Browsers
var autoprefixerOptions = {
	browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']
};

// Task: Copy HTML Files to Public Folder
gulp.task('html', function () {
	return gulp
		.src(htmlInput)
		.pipe(gulp.dest(htmlOutput));
});

// Task: Copy IMG Files to Public Folder
gulp.task('img', function () {
	return gulp
		.src(imgInput)
		.pipe(gulp.dest(imgOutput));
});

// Task: SASS Doc
gulp.task('sass-doc', function () {
	return gulp
		.src(sassInput)
		.pipe(sassdoc(sassdocOptions))
		.resume();
});

// Task: SASS
gulp.task('sass', function () {
	return gulp
		.src(sassInput) // Find All SASS Files
		.pipe(sourcemaps.init()) // Init Source Maps, For Debugging Purposes
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(sourcemaps.write()) // Write Source Maps
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest(sassOutput)) // Output the SASS Files
		.pipe(sassdoc())
		.resume();
});

// Task: SASS Watch
gulp.task('sass-watch', function () {
	return gulp
		.watch(sassInput, ['sass']) // Watch Source Folder for Change, If So Run SASS Task
		.on('change', function (event) { // Log a Message When There is a Change
			console.log('SASS File: ' + event.path + ' [' + event.type.toUpperCase() + '] [Gulp Task]');
		});
});

// Task : ES6
gulp.task('es6', function () {
	return gulp
		.src(es6Input)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(es6Output));
});

// Task: ES6 Watch
gulp.task('es6-watch', function () {
	return gulp
		.watch(es6Input, ['es6']) // Watch Source Folder for Change, If So Run ES6 Task
		.on('change', function (event) { // Log a Message When There is a Change
			console.log('ES6 File: ' + event.path + ' [' + event.type + '] [Gulp Task]');
		});
});

// Task: HTML Watch
gulp.task('html-watch', function () {
	return gulp
		.watch(htmlInput, ['html']) // Watch Source Folder for Change, If So Run HTML Task
		.on('change', function (event) { // Log a Message When There is a Change
			console.log('HTML File: ' + event.path + ' [' + event.type + '] [Gulp Task]');
		});
});

// Task: IMG Watch
gulp.task('img-watch', function () {
	return gulp
		.watch(imgInput, ['img']) // Watch Source Folder for Change, If So Run IMG Task
		.on('change', function (event) { // Log a Message When There is a Change
			console.log('IMG File: ' + event.path + ' [' + event.type + '] [Gulp Task]');
		});
});

// Task: Run Dependency Tasks
gulp.task('default', ['es6', 'es6-watch', 'sass', 'sass-watch']);

// Task: For Production
gulp.task('sass-prod', ['sass-doc'], function () {
	return gulp
		.src(sassInput)
		.pipe(sass({
			outputStyle: 'uncompressed'
		}))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest(sassOutput));
});