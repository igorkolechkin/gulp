import Glide from '@glidejs/glide';

export default class SlidersCreator {
  sliders = []
  defaultSliderConfig = {
    type: 'carousel',
    gap: 20,
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

  createSlider(className, config) {
    const sliderName = document.querySelector(className)
    if (!sliderName) return

    const slider = new Glide(sliderName, { ...this.defaultSliderConfig, ...config })

    return slider.mount()
  }

  initSliders(slidersList) {
    if (slidersList.length === 0) return

    slidersList.forEach(slider => {
      const totalHeight = slider.totalHeight ?? true
      let newSlider = null

      if (this.isShowingResize(slider.resizes)) {
        newSlider = this.createSlider(slider.name, slider.config)
        this.setTotalHeight(newSlider, true, totalHeight)
      }

      this.sliders.push({
        slider: newSlider,
        name: slider.name,
        resizes: slider.resizes,
        config: slider.config,
        totalHeight: totalHeight
      })
    })
  }

  isSliderShow() {
    this.sliders.forEach(slider => {
      if (!this.isShowingResize(slider.resizes) && slider.slider) {
        this.setTotalHeight(slider.slider, false, slider.totalHeight)
        slider.slider.destroy()
        slider.slider = null
      } else if (this.isShowingResize(slider.resizes) && !slider.slider) {
        slider.slider = this.createSlider(slider.name, slider.config)
        this.setTotalHeight(slider.slider, true, slider.totalHeight)
      }
    })
  }

  isShowingResize(resize) {
    if (resize === undefined) return true

    return resize.some(point => window.outerWidth <= point.from && window.outerWidth >= point.to)
  }

  setTotalHeight(slider, flag, totalHeight) {
    if (!slider || !totalHeight) return

    slider.on('mount.after', () => {
      const slides = slider.selector.querySelectorAll('.glide__slide')
      const height = flag ? this.getSlidesHeight([...slides]) : 'unset'

      slides.forEach(slide => slide.style.cssText += `min-height: ${height}`)
    })

    slider.mount()
  }

  getSlidesHeight(slides) {
    return slides.reduce((maxHeight, current) =>
      current.offsetHeight > maxHeight ? current.offsetHeight : maxHeight, 0) + 'px'
  }

  getSlider(name) {
    return this.sliders.filter(slider => slider.name === name)[0]
  }

  init(slidersList = []) {
    this.initSliders(slidersList)

    window.addEventListener('resize', () => this.isSliderShow())
  }
}