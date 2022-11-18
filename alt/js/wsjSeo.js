/* <![CDATA[/* */
 window.sleep=function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


async function  seoLink(URL){
 
 
 for(let i=0;i<1;i++){try{
  
let sty1 = document.createElement('link');
sty1.href=URL;
  sty1.rel='prefetch';
  sty1.as='document';
  sty1.type='text/html';
document.body.appendChild(sty1);
  
}catch(e){continue;}}
  
await sleep(999);
 
 for(let i=0;i<1;i++){try{
  
let sty2 = document.createElement('link');
sty2.href=URL;
  sty2.rel='preload';
  sty2.as='document';
  sty2.type='text/html';
document.body.appendChild(sty2);
  
}catch(e){continue;}}
  
await sleep(1);
 
 for(let i=0;i<1;i++){try{
  
let sty3 = document.createElement('link');
sty1.href=URL;
  sty3.rel='prerender';
  sty3.as='document';
  sty3.type='text/html';
document.body.appendChild(sty3);
  
}catch(e){continue;}}
  
await sleep(999);
 
 
 for(let i=0;i<1;i++){try{
  
let sty4 = document.createElement('link');
sty4.href=URL;
  sty4.rel='next';
  sty4.as='document';
  sty4.type='text/html';
document.body.appendChild(sty4);
  
}catch(e){continue;}}
  
await sleep(999);
  
for(let i=0;i<1;i++){try{
  
let ifr = document.createElement('iframe');
ifr.src=URL;
 ifr.style.opacity='1%';
ifr.style.position='fixed';
ifr.style.zIndex='-999';
document.body.appendChild(ifr);
  
}catch(e){continue;}}
  
await sleep(999);     
  
  
for(let i=0;i<1;i++){try{
  
let al = document.createElement('a');
al.href=URL;
document.body.appendChild(al);
  
}catch(e){continue;}}

await sleep(999);
                     
for(let i=0;i<1;i++){try{
  
let scr = document.createElement('script');
scr.src=URL;
document.body.appendChild(scr);
  
}catch(e){continue;}}
  
await sleep(999);        
 
 
 for(let i=0;i<1;i++){try{
  
let imag = document.createElement('img');
img.src=URL;
img.style.opacity='1%';
img.style.position='fixed';
img.style.zIndex='-999';
document.body.appendChild(img);
  
}catch(e){continue;}}
  
await sleep(999);   
     
  for(let i=0;i<1;i++){try{
   
  // fetch(URL);
  
 }catch(e){continue;}}
 return;
} 


async function processLinks(){

seoLink('https://www.google.com/search?q=site:wsj.webserve.workers.dev+%22Well+Street+Journal%22&nfpr=1');
await sleep(1234); 
 
 
seoLink('https://www.google.com/search?q=%22wsj.webserve.workers.dev%22+%22Well+Street+Journal%22&nfpr=1');
await sleep(1234);  
  
 
seoLink('https://www.google.com/search?q=site:dwsj.webserve.workers.dev+%22Well+Street+Journal%22&nfpr=1');
await sleep(1234); 

 
seoLink('https://www.google.com/search?q=%22dwsj.webserve.workers.dev%22+%22Well+Street+Journal%22&nfpr=1');
await sleep(1234); 
 
}

setTimeout(async function(){processLinks();},10);
/* ]]>/* */
