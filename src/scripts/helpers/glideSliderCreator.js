import Glide from '@glidejs/glide'

const defaultConfig = {
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

export default function glideSliderCreator(elem, config) {
	const sliderName = document.querySelector(elem)
	if (!sliderName) return

	const glide = new Glide(sliderName, { ...defaultConfig, ...config })

	return glide.mount();
}