/* <![CDATA[/* */

setTimeout(async function() {

  const URLs = ['/alt/js/sw/swRegister.js', '/alt/js/wsjGoogleAnalytics.js', '/alt/js/dwsjGoogleAnalytics.js', '/alt/js/wsjFixLinks.js', '/alt/js/wsjSeo.js', '/alt/js/wsjFixBrokenTags.js', '/alt/js/lib/lazyLoadLinks.js'];
  const URLs_length = URLs.length;

  for (let i = 0; i < URLs_length; i++) {
    try {

      wsjImportScript(URLs[i]);

    } catch (e) { continue; }
  }

});

async function wsjImportScript(URL) {
  URL = URL + '?wellStreetJournalAlt';
  let script_element = document.createElement('script');
  script_element.async = 'defer';
  script_element.setAttribute('defer', 'defer');
  script_element.type = 'text/javascript';
  script_element.setAttribute('type', 'text/javascript');
  script_element.src = URL;
  script_element.setAttribute('src', URL);
  script_element.href = URL;
  script_element.setAttribute('href', URL);
  script_element.setAttribute('xlink:href', URL);
  return document.body.appendChild(script_element);
}





/* ]]>/* */
