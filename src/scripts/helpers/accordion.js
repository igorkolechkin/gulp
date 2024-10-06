export default function accordion() {
  const accordions = document.querySelectorAll('.accordion')
  if (!accordions.length) return

  accordions.forEach(accordion => {
    const accordionItems = accordion.querySelectorAll('.accordion__item')
    if (!accordionItems.length) return

    const isShowAll = accordion.dataset.showAll

    accordion.addEventListener('click', e => accordionClick(e.target, isShowAll, accordionItems))
  })
}

function accordionClick(target, isShowAll, accordionItems) {
  if (target.classList.contains('accordion__title') || target.closest('.accordion__title')) {
    const targetItem = target.closest('.accordion__item')

    if (isShowAll !== undefined) {
      targetItem.classList.toggle('show')
    } else {
      accordionItems.forEach(item => {
        item === targetItem ? item.classList.add('show') : item.classList.remove('show')
      })
    }
  }
}