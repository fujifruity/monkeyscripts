// ==UserScript==
// @name         GoogleCacheMouseHover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Works in Google search results. Show cache modals on mouse over.
// @author       fuji
// @match        https://www.google.com/search*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let cacheButtons = document.getElementsByClassName("action-menu ab_ctl")
    for (let cacheButton of cacheButtons) {
        let cacheModal = cacheButton.children[1]
        cacheButton.onmouseover = () => { cacheModal.style.visibility = 'visible' }
        cacheButton.onmouseout = () => { cacheModal.style.visibility = 'hidden' }
    }
})();