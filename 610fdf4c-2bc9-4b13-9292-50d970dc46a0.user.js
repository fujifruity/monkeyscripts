// ==UserScript==
// @name     JrChores
// @version  1
// @grant    none
// @match    https://time.jr-odekake.net/cgi-bin/mydia.cgi
// @description Checks some checkboxes.
// ==/UserScript==

document.getElementsByTagName('input')[14].checked = false
document.getElementsByTagName('input')[20].checked = true
document.getElementsByTagName('input')[32].checked = true