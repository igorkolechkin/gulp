export default function mobileHeader() {
  const burger = document.querySelector('.header__burger')
  const nav = document.querySelector('.header__nav')
  if (!burger || window.matchMedia('(min-width: 991px)').matches) return

  burger.addEventListener('click', () => showNav(nav, burger))

  const links = nav.querySelectorAll('.header__menu-link')
  const scrollingLinks = [...links].filter(getScrollingLinks)
  scrollingLinks && scrollingLinksAction(scrollingLinks, nav, burger)

  const subNavButtons = nav.querySelectorAll('.header__menu-toggle')
  !subNavButtons.length && subNavButtons.forEach(button => button.addEventListener('click', showSubNav))
}

const scrollingLinksAction = (links, nav, burger) => {
  links.forEach(link => {
    link.addEventListener('click', () => showNav(nav, burger))
  })
}

function showNav(nav, button) {
  nav.classList.toggle('show')
  button.classList.toggle('active')
  document.body.classList.toggle('no-scroll')
}

function showSubNav() {
  const parent = this.closest('.header__menu-item')
  parent.classList.toggle('show')
}

function getScrollingLinks(link) {
  const slug = link.href.replace(window.location.origin, '').slice(1)

  if (slug.match(/#/)) {
    return link
  }
}