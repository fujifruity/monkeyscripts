// ==UserScript==
// @name     		ChangeLogger
// @version  		1
// @run-at          document-idle
// @include         https://*/*
// ==/UserScript==

let log = (...msg)=>console.log("Change Logger",msg);

(()=> {
  // https://developer.mozilla.org/ja/docs/Web/API/MutationObserver
  let observer = new window.MutationObserver((mutationRecords) => {
    mutationRecords.forEach((mutationRecord) => {
      // https://developer.mozilla.org/ja/docs/Web/API/MutationRecord
      let mr = mutationRecord
      log('type:', mr.type)
      log('target:', mr.target)
      if (mr.addedNodes.length > 0) {
        log('addedNodes:', mr.addedNodes)
      }
    });
  });
  let config = { attributes: true, /*childList*/ subtree: true, characterData: true };
  observer.observe(document.body, config);
  log('observing...');
})()
