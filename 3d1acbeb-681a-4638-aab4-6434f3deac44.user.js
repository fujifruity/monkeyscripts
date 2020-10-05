// ==UserScript==
// @name     TheEndOfFlash
// @version  1
// @grant    none
// @match    http*://*/*
// ==/UserScript==

// Any <object> element will have a Flash content.
var objs = Array.from(document.getElementsByTagName("object"));

function toVideo(obj) { // ObjectTag -> ()
  var video = document.createElement("video");
  video.id = 'myVideo';
  var mp3url = obj.data.match("https?:\\/\\/[^:]*?\\.mp3")[0];
  video.src = mp3url;
  video.controls = true;
  video.setAttribute("height","40px");
  video.setAttribute("width", obj.parentNode.clientWidth);
  obj.replaceWith(video);
}

if (objs.length > 0) {
	objs.forEach(o => toVideo(o));
  console.log("The End of Flash!");
}
