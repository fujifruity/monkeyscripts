// ==UserScript==
// @name        MaybeNext
// @description Opens predicted next page. Keymap: ctrl+] (or alt+right)
// @include     https://*/*
// @version     1
// ==/UserScript==

/**
 * keycodes:
left  = 37
up    = 38
right = 39
down  = 40
 */
(() => {
    let log = (...msg)=>console.log('Maybe Next', ...msg)

    let url = new URL(location.href)
    let is_google = ['www.google.com', 'www.google.co.jp'].includes(url.host)
    // Remind yourself of this shortcut
    if (is_google) document.getElementById('pnnext').style.opacity = '0.3'

    function handleKeydown(event) {
        if ((event.key == ']' && event.ctrlKey == true) || (event.key== 'ArrowRight' && event.altKey == true)) {
            if (is_google) {
                log('is_google')
                // Assumes 1 page 20 results
                let n_results = document.getElementsByClassName('g').length
                let start = url.searchParams.get('start')
                let new_start = start ? parseInt(start) + n_results : n_results
                url.searchParams.set('start', new_start)
                window.location.href = url.href
            } else {
                log('non-google')
                let urlParts = url.split('/')
                let lastPart = urlParts.pop()
                function increment(match, offset, string) {
                    return parseInt(match) + 1
                }
                // increment the last consecutive digits
                let incrementedLastPart = lastPart.replace(/(\d+)(?=\D*$)/, increment)
                // jump to another page in the same host
                window.location.href = incrementedLastPart
            }
        }
    }

    window.addEventListener('keydown', handleKeydown)
    log('set shortcuts')
})()