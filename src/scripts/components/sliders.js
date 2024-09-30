import Glide from '@glidejs/glide';

// TODO Correct Class logic; Initialize in one method

export default class Sliders {
  slidersList = [
    { name: '.advantage-utp', config: { perView: 2 }, resizes: [ { from: 1297, to: 0 } ] },
    { name: '.clients', config: { perView: 3 }, resizes: [ { from: 1297, to: 0 } ] },
    { name: '.insights', config: { gap: 17 } },
    { name: '.portfolio', config: { gap: 16 }, resizes: [ { from: 2500, to: 576 } ] },
    { name: '.events', config: { gap: 16 }, resizes: [ { from: 2500, to: 576 } ] },
  ]
  defaultSliderConfig = {
    type: 'carousel',
    gap: 20,
    startAt: 0,
    perView: 4,
    hoverpause: true,
    autoplay: false,
    animationDuration: 1000,
    animationTimingFunc: 'ease-in-out',
    breakpoints: {
      767: {
        perView: 2
      }
    }
  }

  glideSliderCreator(className, config) {
    const sliderName = document.querySelector(className)
    if (!sliderName) return

    const slider = new Glide(sliderName, { ...this.defaultSliderConfig, ...config })

    return slider.mount();
  }

  createSlidersObject() {
    this.slidersList.forEach(slider => {
      if (this.isShowingResize(slider.resizes)) {
        slider['obj'] = this.glideSliderCreator(slider.name, slider.config)
        this.setTotalHeight(slider.obj, true)
      }
    })
  }

  isShowingResize(resize) {
    if (resize === undefined) return true

    return resize.some(point => window.outerWidth <= point.from && window.outerWidth >= point.to)
  }

  setTotalHeight(slider, flag) {
    const slides = slider.selector.querySelectorAll('.glide__slide')
    const height = !flag ? 'unset' : [...slides].reduce((maxHeight, current) =>
      current.offsetHeight > maxHeight ? current.offsetHeight : maxHeight, 0) + 'px'

    slides.forEach(slide => slide.style.cssText += `min-height: ${height}`)
  }

  isSliderShow() {
    this.slidersList.forEach(slider => {
      if (!this.isShowingResize(slider.resizes) && slider.obj) {
        this.setTotalHeight(slider.obj, false)
        slider.obj.destroy()
        slider.obj = null
      } else if (this.isShowingResize(slider.resizes) && !slider.obj) {
        slider.obj = this.glideSliderCreator(slider.name, slider.config);
        this.setTotalHeight(slider.obj, true)
      }
    })
  }

  init() {
    this.createSlidersObject()
    this.isSliderShow()

    window.addEventListener('resize', () => this.isSliderShow())
  }
}