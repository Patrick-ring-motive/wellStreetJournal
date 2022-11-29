
fixScriptTags();
setInterval(async function(){fixScriptTags();},1002);



async function fixScriptTags(){
  
const scripts = document.getElementsByTagName('script');
const scripts_length = scripts.length;
  
for(let i=0;i!=scripts_length;i++){try{
let script_content = scripts[i].innerHTML.toString();
  if(script_content.length > 0){
  
  let script_rewrite=replaceEscapes(script_content);
    if(script_content.length>script_rewrite.length){
    
    
    
    }
  }
}catch(e){continue;}}



}


function replaceEscapes(str){

return str.replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>');

}
