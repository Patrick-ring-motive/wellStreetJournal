


function replaceEscapes(str){

return str.replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>');

}

function recreateScript(elem,str){
  
  let new_script = elem.cloneNode(false);
  let script_parent=elem.parentNode;

  new_script.innerHTML = str;
  script_parent.removeChild(elem);
  new_script.setAttribute('rewritten','rewritten');
  script_parent.appendChild(new_script);
  
}


function recreateStyle(elem,str){
  
  let new_style = elem.cloneNode(false);
  let style_parent=elem.parentNode;

  new_style.innerHTML = str;
  style_parent.removeChild(elem);
  new_style.setAttribute('rewritten','rewritten');
  style_parent.appendChild(new_style);
  
}


async function fixScriptTags(){
  
const scripts = document.getElementsByTagName('script');
const scripts_length = scripts.length;
  
for(let i=0;i!=scripts_length;i++){try{
let script_content = scripts[i].innerText;
let old_script = scripts[i].innerHTML;
 // console.log('original: '+script_content.length);
  if(script_content.length > 0){
  
  let script_rewrite=replaceEscapes(script_content);
   // console.log('rewrite: '+script_rewrite.length);
    if(old_script.length>script_rewrite.length){
    
    recreateScript(scripts[i],script_rewrite);
    
    }
  }
}catch(e){
  //console.log(e);
  continue;}}



}


async function fixStyleTags(){
  
const styles = document.getElementsByTagName('style');
const styles_length = styles.length;
  
for(let i=0;i!=styles_length;i++){try{
let style_content = styles[i].innerText;
let old_style = styles[i].innerHTML;
  if(style_content.length > 0){
  
  let style_rewrite=replaceEscapes(style_content);
    if(old_style.length>style_rewrite.length){
    
    recreateStyle(styles[i],style_rewrite);
    
    }
  }
}catch(e){continue;}}



}



fixScriptTags();
fixStyleTags();
//setInterval(async function(){fixScriptTags();},1002);
//setInterval(async function(){fixStyleTags();},1003);
