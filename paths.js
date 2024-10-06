export default {
  styles: {
    src: 'src/styles/bundles/*.scss',
    dest: '../assets/styles',
    watch: 'src/styles/**/*.scss'
  },
  scripts: {
    src: 'src/scripts/bundles',
    dest: '../assets/scripts',
    watch: 'src/scripts/**/*.js'
  },
  images: {
    src: 'src/images/**/*.{jpg,jpeg,png,svg,gif}',
    dest: '../assets/images'
  },
  views: {
    watch: '../**/*.php'
  },
}