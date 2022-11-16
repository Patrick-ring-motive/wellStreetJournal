/* <![CDATA[/* */

async function forceLink(link_element,URL){
 
link_element.src=URL;
link_element.setAttribute('src',URL); 
link_element.href=URL;
link_element.setAttribute('href',URL); 
link_element.setAttribute('xlink:href',URL); 

return link_element;

}


async function replaceLinkByQuery(qwry,xdom,cdom,xxdomxx){
  
let lnks=document.querySelectorAll(qwry);
const lnks_length=lnks.length;
for(let i=0;i<lnks_length;i++){try{
let newLink = lnks[i].href.replace(xdom,cdom)+xxdomxx;
forceLink(lnks[i],newLink);
}catch(e){continue;}}



}

async function replaceSrcByQuery(qwry,xdom,cdom,xxdomxx){
  
let lnks=document.querySelectorAll(qwry);
const lnks_length=lnks.length;
for(let i=0;i<lnks_length;i++){try{
let newLink = lnks[i].src.replace(xdom,cdom)+xxdomxx;
forceLink(lnks[i],newLink);
}catch(e){continue;}}



}


async function fixDomainLinks(){

  
const dlnks=document.querySelectorAll('a[href*="deloitte.wsj.com"]');
const dlnks_length=dlnks.length;
for(let i=0;i<dlnks_length;i++){try{

dlnks[i].href=dlnks[i].href.replace('deloitte.wsj.com','dwsj.webserve.workers.dev');

}catch(e){continue;}}
  
let xdomain=window.location.href.split('xxdomainxx')[1];
let xxdomainxx='';
if(xdomain){
xxdomainxx='?xxdomainxx'+xdomain+'xxdomainxx';
}else{
xdomain='';
}  
  
let cdomain='wsj.webserve.workers.dev';
if(document.domain=='wsq.webserve.workers.dev'){
'wsq.webserve.workers.dev';
}


  
replaceLinkByQuery('[href^="www.wsj.com"],[href^="https://www.wsj.com"],[href^="http://www.wsj.com"]','www.wsj.com',cdomain,xxdomainxx);
  
replaceSrcByQuery('[src^="www.wsj.com"],[src^="https://www.wsj.com"],[src^="http://www.wsj.com"]','www.wsj.com',cdomain,xxdomainxx);

if(xdomain){
replaceLinkByQuery('[href^="/"],[href^="./"],[href^="'+xdomain+'"],[href^="https://'+xdomain+'"],[href^="http://'+xdomain+'"]',xdomain,cdomain,xxdomainxx);
  
replaceSrcByQuery('[src^="/"],[src^="./"],[src^="https://'+xdomain+'"],[src^="http://'+xdomain+'"]',xdomain,cdomain,xxdomainxx);
}



}
///////////*start script execution*///////////////////
fixDomainLinks();
setInterval(async function(){fixDomainLinks();});
setInterval(async function(){fixDomainLinks();},1000);

setInterval(async function(){
  
  if(document.querySelector('a[href*="wsjshop.com/"]')){

   let dswj = document.querySelector('a[href*="wsjshop.com/"]');
   dswj.innerText='Consulting';
   dswj.href="https://dwsj.webserve.workers.dev/";
  
}
 
  let spans=document.querySelectorAll('h2>span');
  const spans_length=spans.length;
  for(let i=0;i<spans_length;i++){
    try{
      
      if(spans[i].innerText=='Global Calendar'){
      spans[i].innerText='';
      }
      
      if(spans[i].innerText.indexOf('NEWSLETTER')>-1){
      spans[i].innerText='';
      }
  
    }catch(e){continue;}
  }
  
  
  let wsj=document.querySelectorAll('a[title="WSJ.COM"]');
  const wsj_length=wsj.length;
  
    for(let i=0;i<wsj_length;i++){try{
      
      wsj[i].innerText = 'WELL STREET HOME';
      wsj[i].title = 'Wellstreet';
  
    }catch(e){continue;}}
    
 
  
  },100);

/* ]]>/* */
