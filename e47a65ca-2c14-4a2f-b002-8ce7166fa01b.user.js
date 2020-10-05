// ==UserScript==
// @name             AmazonTweeks
// @namespace    com.gmail.fujifruity.greasemonkey
// @description      Opaque out adds.
// @version          1
// @match            https://www.amazon.co.jp/*
// ==/UserScript==

(() => {
    const log = (...msg)=>console.log('AmazonTweeks',...msg)

    function handler() {
        log('Make sponsored items opaque.')
        let sponsoredHeaders = Array.from(
            document.getElementsByClassName('s-sponsored-header')
        )
        let sponsoredItems = sponsoredHeaders.map(e => e.parentElement.parentElement)
        for (let elem of sponsoredItems) {
            elem.style.opacity = '0.5'
            console.log("detected:", elem)
        }
    }
    window.addEventListener("load", handler, false)

    // window.setTimeout(()=>{
    //     const buttons = document.getElementsByClassName('a-accordion-row a-declarative')
    //     if(buttons.length==0) return
    //     log('Click to enable onetime buy.')
    //     buttons[0].click()
    // }, 4000)

})()