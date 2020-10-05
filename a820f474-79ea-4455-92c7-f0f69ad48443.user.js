// ==UserScript==
// @name     GoogleNoHistory
// @match    https://www.google.com/search*
// @match    https://www.google.co.jp/search*
// @version  1
// @grant    none
// @description  Filters google search suggestions.
// ==/UserScript==

(function() {
    'use strict';
    let log = (...msg)=>console.log("GoogleNoHistory:", msg.join(' '))

    let observer = new window.MutationObserver((mutationRecords) => {
        mutationRecords.forEach((mutationRecord) => {
            for(let s of mutationRecord.target.children){
                let isHistorySuggestion = s.firstChild.firstChild.className.includes('sb27')
                if(isHistorySuggestion){
                    log('removed:', s.getElementsByTagName('span')[0].innerText)
                    s.remove()
                }
            }
        })
    })
    let config = { childList: true }
    let suggestionList=document.getElementsByClassName('erkvQe')[0]
    observer.observe(suggestionList, config)

    log('observing...')
})();