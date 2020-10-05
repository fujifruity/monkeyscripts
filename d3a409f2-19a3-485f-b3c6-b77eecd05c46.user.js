// ==UserScript==
// @name         SimpleShortcuts
// @version      0.1
// @include      http://*/*
// @include      https://*/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    let log = (...msg) => console.log("SimpleShortcuts:", ...msg)

    let urlToMap = new Map([
        [
            "https://mozilla.github.io/pdf.js/web/viewer.html",
            new Map([
                ['m', () =>{
                    document.getElementById('sidebarToggle').click()
                    document.getElementById('viewOutline').click()
                }]
            ])
        ], [
            "https://www.mercari.com",
            new Map([
                ['/', () => document.getElementsByClassName('input-default')[1].focus()]
            ])
        ], [
            "https://www.amazon.co.jp",
            new Map([
                ['/', () => document.getElementById('twotabsearchtextbox').focus()]
            ])
        ], [
            "http://asciiflow.com",
            new Map([
                ['1', () => document.getElementById('box-button').click()],
                ['2', () => document.getElementById('line-button').click()],
                ['3', () => document.getElementById('arrow-button').click()],
                ['4', () => document.getElementById('freeform-button').click()],
                ['5', () => document.getElementById('erase-button').click()],
                ['6', () => document.getElementById('move-button').click()],
                ['7', () => document.getElementById('text-button').click()],
                ['8', () => document.getElementById('select-button').click()]
            ])
        ], [
            "https://www.jango.com",
            new Map([
                ['u', () => document.getElementById('player_thumbs_up').click()],
                ['d', () => document.getElementById('player_thumbs_down').click()],
                [' ', () => document.getElementById('player_pp').click()],
                ['/', () => document.getElementById('playerfind-input').focus()]
            ])
        ], [
            "https://www.bbc.co.uk/sounds/play/",
            new Map([
                [' ', () => {
                    let iframe = document.getElementById('smphtml5iframesmp-wrapper')
                    iframe.contentWindow.document.getElementById('p_audioui_playpause').click()
                }]
            ])
        ], [
            "http://www.w3.org/", // 123movies
            new Map([
                ['k', () => { log('hi') ; window.dispatchEvent(new KeyboardEvent("keydown", {keyCode : 32})) }],
                ['j', () => { log('hi') ; document.dispatchEvent(new KeyboardEvent("keydown", {keyCode : 37})) }],
                ['l', () => { log('hi') ; document.body.dispatchEvent(new KeyboardEvent("keydown", {keyCode : 39})) }]
            ])
        ], [
            "https://www.google.com",
            new Map([
                ['/', () => { document.getElementsByClassName('gLFyf gsfi')[0].focus() }]
            ])
        ], [
            "https://jobtalk.jp/",
            new Map([
                ['/', () => { document.getElementsByClassName('input___8Py4f')[0].focus() }]
            ])
        ], [
            "https://en-hyouban.com/",
            new Map([
                ['/', () => { document.getElementsByClassName("form-control h-35")[0].focus() }]
            ])
        ]
    ])

    function handleGeneralShortcut(event) {
        // switch (event.key) {
        //     case 'b': {
        //         window.setTimeout(() => window.scrollBy(0, -3), 0)
        //         window.setTimeout(() => window.scrollByLines(-1), 20)
        //         window.setTimeout(() => window.scrollByPages(-1), 40)
        //         break
        //     }
        // }
    }

    function handleSpecificShortcut(event) {
        if (event.target.tagName != "BODY") return
        // (headOfUrl: String) -> `(shortcutKey: String) -> (shortcutHandler: ()->())`
        let knownUrls = Array.from(urlToMap.keys())
        let targetUrl = knownUrls.find(key => location.href.startsWith(key))
        if (targetUrl == undefined) return
        let keyToHandler = urlToMap.get(targetUrl)
        if (keyToHandler == undefined) return
        let handler = keyToHandler.get(event.key)
        if (handler == undefined) return
        log(targetUrl, event)
        handler()
        event.preventDefault()
    }

    window.addEventListener('keydown', event => {
        if (event.target.tagName != "INPUT") {
            handleGeneralShortcut(event)
            handleSpecificShortcut(event)
        }
    })
    log("set shortcuts")
})();