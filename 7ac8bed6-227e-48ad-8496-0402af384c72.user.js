// ==UserScript==
// @name         HjklNavigation
// @namespace    com.gmail.fujifruity.greasemonkey
// @version      0.1
// @description  Introduces (h)jkl navigation into the page.
// @author       fujifruity
// @include      https://www.google.com/search*
// @include      https://econ.workport.co.jp/new/case.php*
// @grant        GM.openInTab
// ==/UserScript==

(() => {
    function log(...msg) { return console.log("HjklNavigation:", ...msg) }
    function cssOf(elem) { return document.defaultView.getComputedStyle(elem, '') }

    const googleUrl = "www.google.com"
    const workportUrl = "econ.workport.co.jp"

    let focusedIdx = null
    const results = (() => {
        switch (location.hostname) {
            case googleUrl: return document.getElementsByClassName('rc')
            case workportUrl: return Array.from(document.getElementsByClassName("case-section ng-scope"))
                .find(e => cssOf(e).display != "none")
                .getElementsByClassName("case_box")
        }
    })()

    function refocus(nextIdx) {
        if (focusedIdx == null) {
            focusedIdx = 0
        } else {
            results[focusedIdx].style.backgroundColor = null
            focusedIdx = nextIdx
        }
        results[focusedIdx].style.backgroundColor = 'lightyellow'
        results[focusedIdx].scrollIntoView({ behavior: "smooth", block: "center" })
    }

    function handler(event) {
        if (event.target.tagName == "INPUT" || event.ctrlKey || event.altKey) return

        const result = results[focusedIdx]

        switch (event.key) {
            case 'j': {
                log('j: down')
                refocus((focusedIdx + 1) % results.length)
                break
            }
            case 'k': {
                log('k: up')
                refocus((focusedIdx - 1 + results.length) % results.length)
                break
            }
            case 'g': {
                log('g: home')
                refocus(0)
                break
            }
            case 'G': {
                log('G: end')
                refocus(results.length-1)
                break
            }
            case 'l': {
                log('l: open')
                switch (location.hostname) {
                    case googleUrl: {
                        const url = result.firstChild.firstChild.href
                        GM.openInTab(url, false)
                        break
                    }
                    case workportUrl: {
                        // open detail page
                        result.getElementsByClassName("circle_btn1")[1].click()
                        break
                    }
                }
                break
            }
            case 'd': {
                log('d: delete')
                switch (location.hostname) {
                    case workportUrl: {
                        // hide the result
                        result.getElementsByClassName("cardBtn cardBtn--white")[0].click()
                        break
                    }
                }
                break
            }
        }

    }

    window.addEventListener('keydown', handler)
})()