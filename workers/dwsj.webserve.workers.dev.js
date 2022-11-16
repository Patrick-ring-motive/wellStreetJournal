
            
async function handleRequest(request) {

    let url = new URL(request.url);


        if(url.search.indexOf('wellStreetJournalAlt')>-1){
            url.hostname='wellstreetjournal.pages.dev';
            return fetch(url);
        }else{
            url.hostname = 'deloitte.wsj.com';
        }
        
        

        let modifiedRequest = new Request(url, {
            authority: url.hostname,
            body: request.body,
            headers: request.headers,
            method: request.method,
            redirect: request.redirect
        });

        modifiedRequest.headers.delete("authority");
   
        modifiedRequest.headers.delete("host");

        modifiedRequest.headers.delete("referer");

        modifiedRequest.headers.delete("x-forwarded-proto");
        modifiedRequest.headers.delete("user-agent");
        modifiedRequest.headers.set("user-agent",'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.1 Mobile/15E148 Safari/604.1');

        let res =  await fetch(modifiedRequest);
      


        var ct=res.headers.get('Content-Type');

        var bdy=null;
        var response = null;

   if((ct)&&(ct.indexOf('image')==-1)){

        bdy=await res.text();
        
        bdy = bdy.replaceAll('content="wsj.com','content="wsj.webserve.workers.dev');
        bdy = bdy.replaceAll('WSJ online','Well Street Journal');
        bdy = bdy.replaceAll('Wall Street Journal','Well Street Journal');
        bdy = bdy.replaceAll('www.wsj.com','wsj.webserve.workers.dev');
        bdy = bdy.replaceAll('deloitte.wsj.com','dwsj.webserve.workers.dev');
        bdy = bdy.replace('<head>','<head><link rel="stylesheet" href="/alt/css/wellstreet.css?wellStreetJournalAlt">');
        bdy = bdy.replace('</body>','<script async="async" type="text/javascript" src="/alt/js/wsjImports.js?wellStreetJournalAlt" href="/alt/js/wsjImports.js?wellStreetJournalAlt" xlink:href="/alt/js/wsjImports.js?wellStreetJournalAlt"></script><a href="https://www.reddit.com/r/wellstreetjournal">⠀</a></body>');

        response = new Response(bdy, res);

    }else{

      response = new Response(res.body, res);

    }

return response;

}

async function streamBody(readable, writable) {

    return readable.pipeTo(writable);
}

addEventListener('fetch', event => {

    event.respondWith(handleRequest(event.request))

});


