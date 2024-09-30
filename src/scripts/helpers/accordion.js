export default function accordion() {
  const accordions = document.querySelectorAll('.accordion')
  if (!accordions.length) return

  accordions.forEach(accordion => {
    const accordionItems = accordion.querySelectorAll('.accordion__item')
    if (!accordionItems.length) return

    accordion.addEventListener('click', accordionClick)
  })
}

function accordionClick({ target }) {
  if (target.classList.contains('accordion__title')
    || target.closest('.accordion__title')
  ) {
    const item = target.closest('.accordion__item')
    item.classList.toggle('show')
  }
}