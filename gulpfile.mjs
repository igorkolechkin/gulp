import gulp from 'gulp'
import plumber from 'gulp-plumber'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import sortMediaQueries from 'postcss-sort-media-queries'
import webpack from 'webpack'
import gulpif from 'gulp-if'
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin'
import changed from 'gulp-changed'
import webp from 'gulp-webp'
import webpackStream from 'webpack-stream'
import browserSync from 'browser-sync'

import paths from './paths.js'
import webpackConfig from './webpack.config.js'

const sass = gulpSass(dartSass)
const devMode = process.argv.includes('--dev')
const browser = browserSync.create()

export const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(!devMode, postcss([autoprefixer(), sortMediaQueries(), cssnano()])))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browser.stream())
}

export const scripts = () => {
  return gulp.src(paths.scripts.src)
    .pipe(plumber({
      errorHandler: function(err) {
        console.error(err.stack)
        done()
      }
    }))
    .pipe(webpackStream(webpackConfig(paths.scripts, devMode), webpack))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browser.stream())
}

export function images() {
  return gulp.src(paths.images.src, { encoding: false })
    .pipe(changed(paths.images.dest))
    .pipe(imagemin([
      gifsicle(gulpif(!devMode, { optimizationLevel: 2 })),
      mozjpeg(gulpif(!devMode, { quality: 80, progressive: true })),
      optipng(gulpif(!devMode, { compressionLevel: 9 })),
      svgo({
        plugins: [
          { name: 'removeViewBox', active: false }
        ]
      })
    ]),
    {
      verbose: true
    })
    .pipe(gulp.dest(paths.images.dest))
    .pipe(webp(gulpif(!devMode,{ quality: 80, lossless: true })))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browser.stream())
}

export const views = () => {
  return gulp.src(paths.views.watch)
    .pipe(browser.stream())
}


export const serve = done => {
  browser.init({
    proxy: '',
    port: 8080
  })

  done()
}

export const watch = () => {
  gulp.watch(paths.styles.watch, styles)
  gulp.watch(paths.scripts.watch, scripts)
  gulp.watch(paths.views.watch, views)
  gulp.watch(paths.images.src, images)
}

const baseTasks = gulp.parallel(styles, scripts, images)
const runTasks = devMode
  ? gulp.series(baseTasks, serve, watch)
  : gulp.series(baseTasks)

export default runTasks