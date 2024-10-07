import SlidersCreator from '../helpers/slidersCreator';

export default function sliders() {
  const slidersList = [
    { name: '.advantage-utp', config: { perView: 2 }, resizes: [ { from: 1297, to: 0 } ] },
  ]

  const slidersCreator = new SlidersCreator()
  slidersCreator.init(slidersList)
}