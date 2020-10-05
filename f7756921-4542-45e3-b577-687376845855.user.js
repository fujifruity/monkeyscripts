// ==UserScript==
// @name         Unfix
// @namespace    com.gmail.fujifruity.greasemonkey
// @version      1
// @grant        none
// @include      https://*/*
// @include      http://*/*
// @description  Unfix sticky elements such as navigation bar. Keymap: ctrl+alt+u
// ==/UserScript==


(() => {
    let log = (...msg)=>console.log("Unfix:", msg.join(' '))

    // Get the css of the element
    function cssOf(elem) { return document.defaultView.getComputedStyle(elem, '') }
    function isFixed(elem) {
        return ['fixed', 'sticky'].includes(cssOf(elem).position) // && parseInt(cssOf(elem).width) >= parseInt(cssOf(elem.parentElement).width)
    }

    // Unfixes the element if it is fixed
    function unfix(elem) {
        if (isFixed(elem)) {
            elem.style.setProperty('position', 'unset', 'important')
            log('unfixed:', elem)
        }
    }

    // Keeps all elements unfixed
    function keepUnfix() {
        // Unfix all fixed elements
        let allElems = Array.from(document.body.getElementsByTagName("*"))
        allElems.forEach(unfix)

        // Start observing to unfix elements get fixed
        let observer = new window.MutationObserver((mutationRecords) => {
            mutationRecords.forEach((mutationRecord) => {
                unfix(mutationRecord.target)
            });
        });
        let config = { attributes: true, subtree: true };
        observer.observe(document.body, config);
        log('observing...');
    }

    // Set a shortcut to keep them unfixed
    window.addEventListener('keydown', (event) => {
        if (event.key == 'u' && event.ctrlKey == true && event.altKey == true) {
            keepUnfix()
            log('keydown')
        }
    })
    log('set shortcut')

})();