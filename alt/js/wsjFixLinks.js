
setInterval(async function(){
  
  
let dlnks=document.querySelectorAll('a[href*="deloitte.wsj.com"]');
for(let i=0;i<dlnks.length;i++){

dlnks[i].href=dlnks[i].href.replace('deloitte.wsj.com','dwsj.webserve.workers.dev');

}

let lnks=document.querySelectorAll('a[href*="wsj.com"]');
for(let i=0;i<lnks.length;i++){

lnks[i].href=lnks[i].href.replace('www.wsj.com','wsj.webserve.workers.dev');

}


},1000);

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
  
    for(let i=0;i<wsj_length;i++){
    try{
      
      wsj[i].innerText = 'WELL STREET HOME';
      wsj[i].title = 'Wellstreet';
  
    }catch(e){continue;}
  }
    
 
  
  },100);
