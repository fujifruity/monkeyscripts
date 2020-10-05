// ==UserScript==
// @name         GoogleBlacklist
// @namespace    com.gmail.fujifruity.greasemonkey
// @version      0.1
// @description  Filters google search results. Filtered results will get collapsed and faded out.
// @author       fujifruity
// @match        https://www.google.*/search*
// @grant        none
// ==/UserScript==

(() => {
    let log=(...msg)=>console.log("Google Blacklist:", msg.join(' '))

    let blacklist = [
        'https://www.sejuku.net',
        'https://codeday.me',
        'https://code-examples.net',
      	'https://techacademy.jp',
        'https://matome.naver.jp',
        'https://kotaeta.com',
        'https://enzaemul.cf',
        'https://qiita.com',
        'https://www.it-swarm.dev',
        'https://android.developreference.com',
        'http://second11cod1e.blogspot.com',
    ]
    let rcElems = Array.from(document.getElementsByClassName("rc"))
    let blackElems = rcElems.filter(e =>
        blacklist.some(blackHref =>
            e.getElementsByTagName("a")[0].href.startsWith(blackHref)
        )
    )
    log('detected:', blackElems.map(e=>e.getElementsByTagName('a')[0].href))

    // remove its description and fade it out
    for (let e of blackElems) {
        e.getElementsByClassName('s')[0].remove()
        e.getElementsByTagName('h3')[0].remove()
        e.style.opacity = 0.5
    }

})()
