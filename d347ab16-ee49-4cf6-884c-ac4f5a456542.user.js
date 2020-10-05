// ==UserScript==
// @name     5chSeeThrough
// @version  1
// @match    http://*.5ch.net/*
// @match    https://*.5ch.net/*
// @description Embeds picture below every hyperlink. Treats text which starts with "ttp://" as hyperlink.
// ==/UserScript==

(()=>{
const log = (...msg)=>console.log('5chSeeThrough',...msg)

var spans = Array.from(
  document.getElementsByClassName('escaped')
);

function toUrls(span) { // SpanTag -> Array<String>
  var urlTails = span.innerText.match(/ttps?:.*?\.(jpeg|jpg|png|gif)/ig); // maybe null
  var urls = urlTails == null ? [] : urlTails.map(url => 'h'+url);
  return urls;
}

function toImg(url) { // String -> ImgTag
  var img = document.createElement('img');
  img.setAttribute('src', url);
  img.style.maxWidth = "100%";
  img.style.display = "block";
  return img;
}

function appendImg(span) { // SpanTag -> ()
  toUrls(span).forEach(url => {
      span.parentNode.appendChild(toImg(url))
  });
}

spans.forEach(appendImg);
})()