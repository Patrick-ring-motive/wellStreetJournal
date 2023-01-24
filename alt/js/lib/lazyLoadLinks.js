import './sleep.js';



async function main(){

  setInterval(async function() {
    await idle();
    lazyLoadLinks(); 
  }, 2505);

}
main();



function hasVisibleText(elm) {


  return !!elm.innerText.trim().length;


}

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}


function loadLink(anchor) {


  let l = document.createElement('link');
  l.rel = "prefetch";
  l.href = anchor.href;
  document.body.appendChild(l);
 /* if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {

    let s = document.createElement('script');
    s.defer = 'defer';
    s.src = anchor.href;
    s.setAttribute('lazyLinkLoader', 'lazyLinkLoader');
    document.body.appendChild(s);

  }*/



  anchor.setAttribute('lazyLoaded', 'lazyLoaded');




}

function lazyLoadLinks() {

  const article_links = document.querySelectorAll('a[href*="articles"]:not([lazyLoaded])');
  const article_links_length = article_links.length;
  for (let i = 0; i < article_links_length; i++) {
    try {
      let la = article_links[i];
      if (checkVisible(la) && (hasVisibleText(la))) {
        loadLink(la);
        return;
      }
    } catch (e) { continue; }
  }

  const links = document.querySelectorAll('a:not([lazyLoaded])');
  const links_length = links.length;
  for (let i = 0; i < links_length; i++) {
    try {
      let la = links[i];
      if (checkVisible(la) && (hasVisibleText(la))) {
        loadLink(la);
        return;
      }
    } catch (e) { continue; }
  }



}


