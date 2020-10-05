// ==UserScript==
// @name         GoogleAppsScriptShortcuts
// @version      1
// @grant        none
// @description  Shortcuts for menu bar: Shift+Alt+(F|E|V|R|P|S|H)
// @include      https://script.google.com/*
// ==/UserScript==

(() => {
    let log = (...msg) => console.log('GoogleAppsScriptShortcuts:', msg.join(' '))
    let menuKeyToId = new Map([
        ['F', 'macros-file-menu'],
        ['E', 'macros-edit-menu'],
        ['V', 'macros-view-menu'],
        ['R', 'macros-run-menu'],
        ['P', 'macros-publis-menu'],
        ['S', 'macros-resources-menu'],
        ['H', 'macros-help-menu']
    ])
    function handler (event) {
        if (! (event.shiftKey == true && (event.altKey == true || event.metaKey == true) )) return
        let id = menuKeyToId.get(event.key)
        if (id == null) return
        let e = document.getElementById(id)
        e.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, button: 1 }))
        e.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, button: 1 }))
    }
    window.addEventListener('keydown', handler)
    log('shortcuts set')
})()