// ==UserScript==
// @name     KeyEventLogger
// @version  1
// @grant    none
// @include  https://*/*
// ==/UserScript==

(()=>{

    function handleEvent(event) {
      console.log('event:', event.target.getRootNode(), event)
    }

    window.addEventListener('keydown', handleEvent)
    // window.addEventListener('keypress', handleEvent)
    // window.addEventListener('keyup', handleEvent)

})()