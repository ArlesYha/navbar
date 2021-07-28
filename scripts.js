const nav = document.querySelector('nav')
const body = document.getElementsByTagName("body")[0]
const buttonMenu = document.getElementById("openMenu")
const bodyAnimate = document.querySelector(".card__body--animate")


buttonMenu.addEventListener("click", _ => {
    nav.classList.add("open")
    body.classList.add("scroller--none")
})

nav.addEventListener('click', e => {
    e.target.classList.remove("open")
    body.classList.remove("scroller--none")
})

const sectionTitle = document.querySelector(`.section__title`)
const sectionTitleStyle = sectionTitle.currentStyle || window.getComputedStyle(sectionTitle)
const mTop = sectionTitleStyle.marginTop.slice(0, sectionTitleStyle.marginTop.length - 2)
const sections = document.querySelectorAll(".section")
let sTop = []
for (const section of sections) {
    if(window.innerWidth <= 500 ) 
        sTop.push(section.offsetTop - (Math.round(parseFloat(mTop) + 100))) 
    else 
        sTop.push(section.offsetTop - (nav.clientHeight + Math.round(parseFloat(mTop) + 100)))
    
}

// console.log(document.styleSheets.length)

window.onresize = _ => {
    sTop = []
    for (const section of sections) {
        if(window.innerWidth <= 500 ) 
            sTop.push(section.offsetTop - (Math.round(parseFloat(mTop) + 100)))
        else {
            sTop.push(section.offsetTop - (nav.clientHeight + Math.round(parseFloat(mTop) + 100)))
        }
    }

    if(window.innerHeight <= 500 && window.innerWidth > 500) {
        for (const item of document.querySelectorAll(".nav__item")) {
            item.classList.remove("nav__item--pseudo")
        }
    } else {
        for (const item of document.querySelectorAll(".nav__item")) {
            item.classList.add("nav__item--pseudo")
        }
    }
}

const links = document.querySelectorAll(".nav__link")
for (const link of links) {
    link.addEventListener('click', e => {
        e.preventDefault();

        if(window.innerWidth <= 500) {
            nav.classList.remove("open")
        }

        const section = e.target.getAttribute("href")
        if(section !== "#") {
            const elementTop = document.getElementById(section.slice(1, section.length))
            let oSetTop = 0
            if(window.innerWidth <= 500) 
                oSetTop = elementTop.offsetTop - (Math.round(parseFloat(mTop)))
            else
                oSetTop = elementTop.offsetTop - (nav.clientHeight + Math.round(parseFloat(mTop)))

            window.scroll({
                top: oSetTop,
                behavior: "smooth"
            })
        } else {
            window.scroll({
                top: 0,
                behavior: "smooth"
            })
        }
    })
}

const sectionSobremi = document.getElementById("sobremi")
const conocimientos = document.getElementById("conocimientos")

window.onscroll = _ => {
    const scroll = document.documentElement.scrollTop
    if(scroll < sTop[0]) {
        buttonMenu.classList.remove("button__menu--color")
        document.getElementById("firstListItem").classList.add("nav__item--active")
        document.getElementById("secondListItem").classList.remove("nav__item--active")
        document.getElementById("thirdListItem").classList.remove("nav__item--active")
    } else if (scroll >= sTop[0] && scroll < sTop[1]) {
        buttonMenu.classList.add("button__menu--color")
        document.getElementById("firstListItem").classList.remove("nav__item--active")
        document.getElementById("secondListItem").classList.add("nav__item--active")
        document.getElementById("thirdListItem").classList.remove("nav__item--active")
    } else if (scroll >= sTop[1]) {
        document.getElementById("firstListItem").classList.remove("nav__item--active")
        document.getElementById("secondListItem").classList.remove("nav__item--active")
        document.getElementById("thirdListItem").classList.add("nav__item--active")
    }
}

const buttonsModal = document.querySelectorAll(".button__modal")
for (const buttons of buttonsModal) {
    buttons.addEventListener("click", e => {
        document.getElementById(e.target.dataset.ref).classList.toggle("modal__active")
        if(e.target.dataset.ref === "modalDW") {
            toggleBar(1)
        }else if(e.target.dataset.ref === "modalDB") {
            toggleBar(2)
        }
        body.classList.add("scroller--none")
    })
}

const modals = document.querySelectorAll(".modal")
for (const modal of modals) {
    modal.addEventListener("click", e => {
        if(e.target.getAttribute("id") === "modalDW") {
            toggleBar(1)
        }else if(e.target.getAttribute("id") === "modalDB") {
            toggleBar(2)
        }
        e.target.classList.toggle("modal__active")
        body.classList.remove("scroller--none")
    })
}

const arrows = document.querySelectorAll(".arrow")
for (const arrow of arrows) {
    arrow.onclick = e => {
        if(e.target.classList.contains("arrow-first") || e.target.classList.contains("fa-arrow-alt-circle-left")){
            cardBox.scroll({
                left: 0,
                behavior: 'smooth'
            })
            document.querySelector(".arrow-last").classList.remove("arrow--inactive")
            document.querySelector(".arrow-first").classList.add("arrow--inactive")
        } else {
            cardBox.scroll({
                left: cardBox.offsetWidth,
                behavior: 'smooth'
            })
            document.querySelector(".arrow-last").classList.add("arrow--inactive")
            document.querySelector(".arrow-first").classList.remove("arrow--inactive")
        }
    }
}               
                
const cardBox = document.getElementById("card__box")
cardBox.onscroll = e => {
    switch (e.target.scrollLeft) {
        case cardBox.offsetWidth:
            document.querySelector(".arrow-last").classList.add("arrow--inactive")
            document.querySelector(".arrow-first").classList.remove("arrow--inactive")
            break;
        
        case 0:
            document.querySelector(".arrow-last").classList.remove("arrow--inactive")
            document.querySelector(".arrow-first").classList.add("arrow--inactive")
            break;
    }
}

const modalsClose = document.querySelectorAll(".button__modal--close")
for (const modalClose of modalsClose) {
    modalClose.onclick = e => {
        const modal = e.target.closest(".modal")
        if(modal.getAttribute("id") === "modalDW") {
            toggleBar(1)
        }else if(modal.getAttribute("id") === "modalDB") {
            toggleBar(2)
        }

        modal.classList.toggle("modal__active")
        body.classList.remove("scroller--none")
    }
}

const toggleBar = (selector) => {
    if(selector === 1) {
        document.querySelector(".html").classList.toggle("skill__bar--html")
        document.querySelector(".css").classList.toggle("skill__bar--css")
        document.querySelector(".scss").classList.toggle("skill__bar--scss")
        document.querySelector(".js").classList.toggle("skill__bar--js")
        document.querySelector(".php").classList.toggle("skill__bar--php")
        document.querySelector(".react").classList.toggle("skill__bar--react")
    } else if (selector === 2) {
        document.querySelector(".sql").classList.toggle("skill__bar--sql")
        document.querySelector(".md").classList.toggle("skill__bar--md")
    }
}

const linksCon = document.querySelectorAll(".footer__link__conocimientos")
for (const linkCon of linksCon) {
    linkCon.onclick = e => {
        e.preventDefault()
        const href = e.target.getAttribute("href")
        document.getElementById(href.slice(1, href.length)).classList.toggle("modal__active")
        if(href.slice(1, href.length) === "modalDW") {
            toggleBar(1)
        }else if(href.slice(1, href.length) === "modalDB") {
            toggleBar(2)
        }
        body.classList.add("scroller--none")
    }
}

const linkLogoFooter = document.querySelector(".footer__logo__link")
linkLogoFooter.onclick = e => {
    e.preventDefault();
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
}

// console.log(document.styleSheets[0])

// for (var i = 0; i < document.styleSheets.length; i++) { 
//     var rulesToLoose = []; 
//     // _.each(sheet.cssRules, function (rule, index) { 
//     //     if (rule.selectorText && rule.selectorText.indexOf(':hover') > 0) { 
//     //         rulesToLoose.push(index);
//     //     }
//     // });
//     console.log(rulesToLoose)
// };

// const userAgent = navigator.userAgent || navigator.vendor || window.opera
// if (/android/i.test(userAgent)) {
//     console.log("object")
// }

// if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
//     document.getElementsByClassName('android')[0].style.visibility = 'hidden';
//    document.getElementsByClassName('android')[0].style.display = 'none';
// }

// var isMobile = {
//     Android: function() {
//         return navigator.userAgent.match(/Android/i);
//     },
//     BlackBerry: function() {
//         return navigator.userAgent.match(/BlackBerry/i);
//     },
//     iOS: function() {
//         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//     },
//     Opera: function() {
//         return navigator.userAgent.match(/Opera Mini/i);
//     },
//     Windows: function() {
//         return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
//     },
//     any: function() {
//         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
//     }
// };

// if( isMobile.any() ) alert('Mobile');