let mix = require('laravel-mix');

mix.js('resource/js/app.js', 'js').vue()
    .sass("resource/sass/app.sass", "css");
    
    mix.setPublicPath('public');
