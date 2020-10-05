// ==UserScript==
// @name         StackOverflowStyling
// @version      0.1
// @author       fuji
// @match        https://stackoverflow.com/questions/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let times = Array.from(document.getElementsByClassName('relativetime'))
    for(let e of times) {
        e.innerText = e.innerText.replace(/(.*?) '(\d+) (.*)/, '20$2 $1 $3')
        e.style.fontSize = '110%'
        e.style.fontWeight = 'bold'
    }

})();