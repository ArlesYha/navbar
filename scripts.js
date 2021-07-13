const header = document.querySelector('.header').offsetHeight;
const nav = document.querySelector('.nav').offsetHeight;
const heightWindow = window.innerHeight;

document.documentElement.style.setProperty('--height', `${heightWindow - header - nav}px`)
document.addEventListener('resize', _ => {
    document.documentElement.style.setProperty('--height', `${heightWindow - header - nav}px`)
})

const links = document.querySelectorAll('.nav__link')
for (const link of links) {
    link.addEventListener("click", e => {
        e.preventDefault();
        for (const linkActive of links) {
            linkActive.parentElement.classList.remove('nav__item--active')
        }

        e.target.parentElement.classList.add("nav__item--active")

        const getHref = e.target.getAttribute("href")
        let offsetTop = 0
        if(getHref != "#") {
            const element = document.querySelector(getHref)
            const getStyleElement = element.currentStyle || window.getComputedStyle(element)
            const mT = getStyleElement.marginTop
            offsetTop = parseInt(element.offsetTop - (nav + parseInt(mT.slice(0, mT.length - 2))));
        }

        scroll({
            top: offsetTop,
            behavior: "smooth"
        })
    })
}
