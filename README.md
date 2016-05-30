# frontend-build

My own build with browsersync plugin.
Also if you never used browsersync you need to try it!

## gulp features for styles, images, fonts
- sourcemaps
- globbing
- autoprefixer for css
- styles minifying
- images minifying
- browserify
- nunjucks

## scss files globing
Previously I always forget add appropriate string to "app.scss" for new "partial.scss".
This problem I've solved with *gulp-css-globbing* plugin which allows just include whole folder without adding all files

## images minifying
Every img placed in assets folder will minifying by appropriate gulp task using *gulp-imagemin*
Also for better performance I use *gulp-cache*

## templating with nunjucks
*nunjuck* used for implementing templates ability

## bower
Just few unnecessary things:
- reset styles
- bourbon
