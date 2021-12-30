import gulp from "gulp";
import plumber from "gulp-plumber";
import sourcemap from "gulp-sourcemaps";
import sass from "gulp-sass";
import dartsass from "sass";
sass.compiler = dartsass;
import postcss from "gulp-postcss";
import rename from "gulp-rename";
import uglify from "gulp-uglify-es"//.default;
import csso from "postcss-csso";
import autoprefixer from "autoprefixer";
import imagemin from "gulp-imagemin";
import webp from "gulp-webp";
import svgstore from "gulp-svgstore";
import del from "del";
import sync from "browser-sync";
const browserSync = sync.create();

// Styles

export const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync .stream());
}

// exports.styles = styles;

// HTML

export const html = () => {
  return gulp.src("source/**/*.html")
  .pipe(gulp.dest("build"))
}

//Scripts

export const scripts = () => {
  return gulp.src("source/js/**/*.js")
  .pipe(uglify())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest("build/js"))
  .pipe(browserSync .stream());
}

// exports.scripts = scripts;

//Images

export const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(imagemin([
    imagemin.mozjpeg({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"))
}

// exports.images = images;

//WebP

export const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
  .pipe(webp({quality: 90}))
  .pipe(rename(function (path) {
    path.dirname += "/webp";}))
  .pipe(gulp.dest("build/img"))
}

// exports.createWebp = createWebp;

//Sprite

export const sprite = () => {
  return gulp.src("source/img/svg/inline/*.svg")
  .pipe(svgstore())
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img/svg"))
}

// exports.sprite = sprite;

//Copy

export const copy = () => {
  return gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/img/**/*.{jpg,png,svg}"
  ],
    {
      base: "source"
    })
  .pipe(gulp.dest("build"))
}

// exports.copy = copy;

//Clean

export const clean = () => {
  return del("build")
}

// Server

export const server = (done) => {
  browserSync .init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// exports.server = server;

// Reload

export const reload = done => {
  browserSync .reload();
  done();
}

// Watcher

export const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/**/*.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

//Build
export const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    sprite,
    copy,
    images,
    createWebp,
    scripts
  )
)

// exports.build = build;

export default gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    sprite,
    copy,
    createWebp,
    scripts
  ),
  gulp.series(
    server, watcher
  )
)
