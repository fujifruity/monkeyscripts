// ==UserScript==
// @name         OxfordDictionaryTweaks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Tweaks for www.oxfordlearnersdictionaries.com
// @author       fuji
// @match        https://www.oxfordlearnersdictionaries.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    const log = (...msg) => console.log('OxfordDictionaryTweaks', ...msg)

    log('mark every keyword occurance')
    const word = location.pathname.split('/').pop().split('_').shift()
    const regexp = new RegExp(`\\b${word}`, 'i')
    const spans = document.getElementsByClassName('x')
    for (const span of spans){
        span.outerHTML = span.outerHTML.replace(regexp, match=>`</span><mark>${match}</mark><span class="x">`)
    }
    log('unfocus text input')
    document.getElementById('q').blur()
})();