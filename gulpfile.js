var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
// var sassdoc = require('sassdoc');

// Source and Destination Folders
var src = './src';
var dest = './public';

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

// Target Old Browsers
var autoprefixerOptions = {
	browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']
};

// Copy Src to Dest Folder
gulp.task('html', function () {
	return gulp.src(src + '/*.html').pipe(gulp.dest(dest));
});
gulp.task('style', function () {
	return gulp
		.src(src + '/css/*.*') // Find All Style Files
		.pipe(sourcemaps.init()) // Init Source Maps, For Debugging Purposes
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(sourcemaps.write()) // Write Source Maps
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest(dest + '/css')) // Output the Style Files
		// .pipe(sassdoc())
		.resume();
});
gulp.task('js', function () {
	return gulp
		.src(src + '/js/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(dest + '/js'));
});
gulp.task('img', function () {
	return gulp.src(src + '/img/*.*').pipe(gulp.dest(dest + '/img'));
});
gulp.task('font', function () {
	return gulp.src(src + '/fonts/*/*.*').pipe(gulp.dest(dest + '/fonts'));
});

// Task: Watch
gulp.task('watch', function () {
	gulp.watch(src + '/*.html', ['html']); // HTML
	gulp.watch(src + '/css/*.*', ['style']); // Style
	gulp.watch(src + '/js/*.js', ['js']); // JS
	gulp.watch(src + '/img/*.*', ['img']); // IMG
	gulp.watch(src + '/fonts/*/*.*', ['font']); // Font
});


// Task: Dev
gulp.task('dev', ['html', 'style', 'js', 'img', 'font', 'watch']);

// Task: Prod
gulp.task('prod', ['html', 'style', 'js', 'img', 'font']);