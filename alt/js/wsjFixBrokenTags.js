/* <![CDATA[/* */

import './lib/sleep.js';


async function main() {

  fixScriptTags();
  fixStyleTags();
  setInterval(async function() { await idle(); fixScriptTags(); }, 1002);
  setInterval(async function() { await idle(); fixStyleTags(); }, 1003);

}
main();

function copyAttributes(source, target) {
  const source_attributes = Array.from(source.attributes);
  const source_attributes_length = source_attributes.length;
  for (let i = 0; i < source_attributes_length; i++) {
    try {

      target.setAttribute(source_attributes[i].nodeName, source_attributes[i].nodeValue);

    } catch (e) { continue; }
  }
}


function replaceEscapes(str) {

  return str.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>');

}

function recreateScript(elem, str) {

  let new_script = document.createElement('script');
  copyAttributes(elem, new_script);
  let script_parent = elem.parentNode;

  new_script.innerHTML = str;
  script_parent.removeChild(elem);
  new_script.setAttribute('rewritten', 'rewritten');
  script_parent.appendChild(new_script);

}


function recreateStyle(elem, str) {

  let new_style = document.createElement('style');
  copyAttributes(elem, new_style);
  let style_parent = elem.parentNode;

  new_style.innerHTML = str;
  style_parent.removeChild(elem);
  new_style.setAttribute('rewritten', 'rewritten');
  style_parent.appendChild(new_style);

}


async function fixScriptTags() {

  const scripts = document.querySelectorAll('script:not([rewritten])');
  const scripts_length = scripts.length;

  for (let i = 0; i != scripts_length; i++) {
    try {
      let script_content = scripts[i].textContent;
      let old_script = scripts[i].innerHTML;

      if (script_content.length > 0) {

        let script_rewrite = replaceEscapes(script_content);

        if (old_script.length > script_rewrite.length) {
          if (script_rewrite.indexOf('/* <![CDATA[/* */') == -1) { script_rewrite = '/* <![CDATA[/* */' + script_rewrite + '/* ]]>/* */'; }
          recreateScript(scripts[i], script_rewrite);

        }
      }
    } catch (e) {
      //console.log(e);
      continue;
    }
  }



}


async function fixStyleTags() {

  const styles = document.querySelectorAll('style:not([rewritten])');
  const styles_length = styles.length;

  for (let i = 0; i != styles_length; i++) {
    try {
      let style_content = styles[i].textContent;
      let old_style = styles[i].innerHTML;
      if (style_content.length > 0) {

        let style_rewrite = replaceEscapes(style_content);
        if (old_style.length > style_rewrite.length) {
          if (style_rewrite.indexOf('/* <![CDATA[/* */') == -1) { style_rewrite = '/* <![CDATA[/* */' + style_rewrite + '/* ]]>/* */'; }
          recreateStyle(styles[i], style_rewrite);

        }
      }
    } catch (e) { continue; }
  }



}



/* ]]>/* */
