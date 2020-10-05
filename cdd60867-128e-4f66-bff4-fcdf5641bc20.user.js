// ==UserScript==
// @name         YouTubeNoOverlay
// @version      0.1
// @include      https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict'
    let log = (...msg)=>console.log("YouTube:",msg)

    document.getElementsByClassName('ytp-pause-overlay')[0].remove()
    // let observer = new window.MutationObserver(mutationRecords => {
    //     mutationRecords.forEach(mr => {
    //         if(mr.target.classList.contains('ytp-pause-overlay')){
    //             mr.target.remove()
    //             log('removed')
    //         }
    //     })
    // })
    // let config = { attributes: true, subtree: true }
    // observer.observe(document.body, config)
    // log('observing...')
})()