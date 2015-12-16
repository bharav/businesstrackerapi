/**
 * Created by vivek on 19-10-2015.
 */
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    nodemon({
        script:'app.js',
        ext:'js',
        env:{
            PORT:80
        },
        ignore:['./node_modules/**']
    })
    .on('restart',function(){
            console.log("Restarting");
        })
})