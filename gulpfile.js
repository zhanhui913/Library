var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

/* do not include node_modules */
var jsFiles = ['*.js','src/**/*.js'];

gulp.task('style', function(){
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', function(){
			verbose : true;
		}))
		.pipe(jscs());
});

/* inject those css & js files into our html */
gulp.task('inject', function(){
	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');

	//inject is used for our local 'public/css' & 'public/js'
	var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read:false});

	var injectOptions = {
		ignorePath : '/public'
	};

	//wiredep works by looking into our bower.json dependencies (ie: everything in our 'public/lib' dir)
	var options = {
		bowerJson : require('./bower.json'),
		directory : './public/lib',
		ignorePath: '../../public'
	};

	//whatever the extension for inject
	return gulp.src('./src/views/*.jade')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./src/views'));
});

//This runs style and inject async (together) before running whats in function
gulp.task('serve', ['style','inject'], function(){
	var options = {
		script : 'app.js',
		delayTime : 1,
		env: {
			'PORT' : 3000
		},
		watch: jsFiles
	};

	return nodemon(options)
		.on('restart', function(ev){
			console.log('Restarting....');
		});
});


