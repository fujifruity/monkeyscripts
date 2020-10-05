// ==UserScript==
// @name         Headdings
// @namespace    com.gmail.fujifruity.greasemonkey
// @version      1
// @grant        none
// @description  Create a table of contents by h-tags. Keymap: ctrl+alt+t
// @include      https://*/*
// ==/UserScript==

(() => {
    let log = (...msg) => console.log('Headdings:', ...msg)
    let handler = (event) => {
        //log('event:', event)
        if (event.ctrlKey == true && event.altKey == true && event.key == 't') {
            log('keydown')
            let modalId = 'headdings'
            var modal = document.getElementById(modalId)
            if (!modal) {
                // Create modal
                modal = document.createElement('div')
                modal.id = modalId
                modal.style.zIndex = 99999
                modal.style.width = 'auto'
                modal.style.maxHeight = '90%'
                modal.style.position = 'fixed'
                modal.style.padding = '1em'
                modal.style.margin = '1em'
                modal.style.overflowY = 'auto'
                modal.style.backgroundColor = 'white'
                modal.style.cursor = 'pointer'
                modal.style.boxShadow = '0 2px 10px rgba(0,0,0,0.16)'
                document.body.prepend(modal)
                // Add headdings to the modal
                let headdings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
                let clonedHeaddings = headdings.map(e => e.cloneNode(true))
                function closeModal() {
                    modal.style.display = 'none'
                    window.removeEventListener('keydown', closeModal)
                    log('close modal')
                }
                let clickableHeaddings = clonedHeaddings.map(
                    (e, i) => {
                        e.addEventListener('click', () => {
                            headdings[i].scrollIntoView()
                            closeModal()
                        })
                        return e
                    }
                )
                clickableHeaddings.forEach(e => modal.appendChild(e))
                log('modal created')
            } else {
                modal.style.display = 'block'
                log('show modal')
            }
            // Set shortcut to hide the modal
            window.addEventListener('keydown', event => {
                if (event.key == 'Escape') {
                    closeModal()
                }
            })
        }
    }
    window.addEventListener('keydown', handler)
    log('set shortcuts')
})()