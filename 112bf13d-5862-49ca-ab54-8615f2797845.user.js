// ==UserScript==
// @name         SelectAndGo
// @description  Search with selected text on pressing g(Google), t(Translate) or d(Oxford) within 2 seconds.
// @version      1
// @grant        GM.openInTab
// @include      http://*/*
// @include      https://*/*
// @exclude      https://keep.google.com/*
// ==/UserScript==

(() => {
    const log = (...msg) => console.log('SelectAndGo:', ...msg)

    function handleKeydown(event) {
        if (event.target.tagName == "INPUT" || event.ctrlKey==true || event.altKey==true) return
        const selection = window.getSelection().toString()
        switch (event.key) {
            case 'i':
                GM.openInTab("https://www.google.com/search?tbm=isch&q=" + selection, false)
                break
            case 'm':
                GM.openInTab("https://www.google.co.jp/maps/?q=" + selection, false)
                break
            case 't':
                GM.openInTab("https://translate.google.com/#en/ja/" + selection, false)
                break
            case 's':
                GM.openInTab("https://www.google.com/search?client=firefox-b-ab&q=" + selection, false)
                break
            case 'o':{
                let url = "https://www.oxfordlearnersdictionaries.com/search/english/?q="
                // the website requires hyphen-separated words
                let query = selection.replace(/\s+/g, '-')
                GM.openInTab(url + query, false)
                break
            }
            case 'c':
                alert(window.getSelection().toString().length + ' characters')
                break
        }
    }

    function setShortcut() {
        window.addEventListener('keydown', handleKeydown)
        log('handleKeydown set')
    }
    function unsetShortcut() {
        window.removeEventListener('keydown', handleKeydown)
        log('handleKeydown unset')
    }

    // An event handler which sets shortcuts on selectStart, unset the shortcuts in seconds.
    function handleSelectStart() {
        setShortcut()

        // unset shortcuts in seconds.
        var timeoutMillis = 2000
        window.onmouseup = () => {
            setTimeout(unsetShortcut, timeoutMillis)
            window.onmouseup = null
        }

        // unset shortcuts when selection is triggerd by ctrl+a
        window.onkeypress = () => {
            setTimeout(unsetShortcut, timeoutMillis)
            window.onkeypress = null
        }
    }

    window.addEventListener('selectstart', handleSelectStart)
    log('selectstart listener is set')
})()
