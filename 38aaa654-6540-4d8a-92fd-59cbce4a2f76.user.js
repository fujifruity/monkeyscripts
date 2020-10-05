// ==UserScript==
// @name         SublikescriptTweeks
// @namespace    com.gmail.fujifruity.greasemonkey
// @version      0.1
// @description  try to take over the world!
// @author       fujifruity
// @include      https://subslikescript.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // maximize transcript pane vertically
    const e = document.getElementsByClassName('full-script')[0]
    e.style.setProperty('height', 'unset')
})();