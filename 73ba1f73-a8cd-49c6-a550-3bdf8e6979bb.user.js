// ==UserScript==
// @name         SpotifyFocus
// @version      1
// @grant        none
// @include      https://open.spotify.com/*
// @description  aaa
// ==/UserScript==

(() => {
    let log = (...msg) => console.log("Spotify:", msg)

    let focusedTrackIdx = { value: 0 }
    let focusedMenuIdx = { value: 0 }

    // function title(trackElem) {
    //     trackElem.getElementsByClassName('tracklist-name')[0].innerText
    // }

    // maybe undefined
    function menuContainer() {
        return document.getElementsByClassName('react-contextmenu react-contextmenu--visible')[0]
    }

    function handler(event) {
        if (event.target.tagName != "INPUT") {
            if (menuContainer()) {
                performMenuShortcut(event)
            } else {
                performTrackShortcut(event)
            }
        }
    }

    function refocus(elements, focusedIdx, nextIdx) {
        elements[focusedIdx.value].style.border = null
        focusedIdx.value = nextIdx
        elements[focusedIdx.value].style.border = '2px solid lightgreen'
        elements[focusedIdx.value].scrollIntoView({ behavior: "smooth", block: "nearest" })
        elements[focusedIdx.value].focus()
    }

    function performMenuShortcut(event) {
        let menuItems = menuContainer().children
        switch (event.key) {
            case 'j': {
                log('j: menu down')
                refocus(menuItems, focusedMenuIdx, (focusedMenuIdx.value + 1) % menuItems.length)
                break
            }
            case 'k': {
                log('k: menu up')
                refocus(menuItems, focusedMenuIdx, (focusedMenuIdx.value - 1 + menuItems.length) % menuItems.length)
                break
            }
            case 'l': {
                log('l: menu click')
                menuItems[focusedMenuIdx.value].click()
                break
            }
        }
    }

    function performTrackShortcut(event) {
        let tracks = document.getElementsByClassName('tracklist-row')
        switch (event.key) {
            case 'j': {
                log('j: track down')
                refocus(tracks, focusedTrackIdx, (focusedTrackIdx.value + 1) % tracks.length)
                break
            }
            case 'k': {
                log('k: track up')
                refocus(tracks, focusedTrackIdx, (focusedTrackIdx.value - 1 + tracks.length) % tracks.length)
                break
            }
            case 'l': {
                log('l: track dblclick')
                doubleclick(tracks[focusedTrackIdx.value])
                break
            }
            case 'm': {
                log('m: track menu')
                rightclick(tracks[focusedTrackIdx.value])
                break
            }
            // case 'p': {
            //     log('p: track add playlist')
            //     rightclick(tracks[focusedTrackIdx.value])
            //     menuContainer().children[3].click()
            //     break
            // }
            // case 'd': {
            //     log('d: track delete')
            //     rightclick(tracks[focusedTrackIdx.value])
            //     menuContainer().children[1].click()
            //     break
            // }
        }
    }

    function rightclick(element) {
        element.dispatchEvent(new MouseEvent("contextmenu", {
            bubbles: true,
            button: 2,
            clientX: element.getBoundingClientRect().x,
            clientY: element.getBoundingClientRect().y
        }))
    }

    function doubleclick(element) {
        element.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }))
    }

    window.addEventListener('keydown', handler)

    log("ready")

})()
