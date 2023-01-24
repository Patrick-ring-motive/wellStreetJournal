async function handleRequest(request) {

    let url = new URL(request.url);


if((url.search.indexOf('wellStreetJournalAlt')>-1)||(url.pathname.toLowerCase().indexOf('robots.txt')>-1)||(url.pathname.indexOf('google9b9ccfe85609fdf9.html')>-1)){
            url.hostname='wellstreetjournal.pages.dev';
            return fetch(url);
}else{
            url.hostname = 'www.wsj.com';
}
      /*  if(url.pathname.toLowerCase().indexOf('partytown')>-1){

                url.hostname = 'partytown.builder.io';


        }    */    

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
        bdy = bdy.replace('type="image/svg+xml" href="https://s.wsj.net/img/meta/wsj_favicon.svg"','type="image/png" href="https://raw.githubusercontent.com/Patrick-ring-motive/wellStreetJournal/wsj/alt/ico/icons8-water-well-96.png"');
        bdy = bdy.replace('https://www.wsj.com/favicon.ico','https://raw.githubusercontent.com/Patrick-ring-motive/wellStreetJournal/wsj/alt/ico/favicon.ico');
        bdy = bdy.replace("https://s.wsj.net/media/wsj_apple-touch-icon-180x180.png",'https://raw.githubusercontent.com/Patrick-ring-motive/wellStreetJournal/wsj/alt/ico/icons8-water-well-96.png');
        bdy = bdy.replaceAll("wsjstream.wsj.net","dev-null.webserve.workers.dev");
        bdy = bdy.replaceAll("api.wsj.net","dev-null.webserve.workers.dev");
        bdy = bdy.replaceAll("accounts.wsj.com","dev-null.webserve.workers.dev");
        bdy = bdy.replaceAll("sso.accounts.dowjones.com","dev-null.webserve.workers.dev"); 
        bdy = bdy.replaceAll("cdn.privacy-mgmt.com","dev-null.webserve.workers.dev");  
        bdy = bdy.replaceAll("news.google.com","dev-null.webserve.workers.dev");  
        bdy = bdy.replaceAll("follow-api.wsj.com","dev-null.webserve.workers.dev");  
bdy = bdy.replaceAll("wsj.webserve.workers.dev/static_html_files/bluegrass","dev-null.webserve.workers.dev");         
        bdy = bdy.replaceAll('content="wsj.com','content="wsj.webserve.workers.dev');
        bdy = bdy.replaceAll('WSJ online','Well Street Journal');
        bdy = bdy.replaceAll('Wall Street Journal','Well Street Journal');
        bdy = bdy.replaceAll('www.wsj.com','wsj.webserve.workers.dev');
        bdy = bdy.replaceAll('deloitte.wsj.com','dwsj.webserve.workers.dev');
       // bdy = bdy.replaceAll('https://wsj.webserve.workers.dev/fonts/woffs/','https://raw.githubusercontent.com/Patrick-ring-motive/wellStreetJournal/wsj/fonts/woffs/');
       // bdy = bdy.replaceAll('"/fonts/woffs/','raw.githubusercontent.com/Patrick-ring-motive/wellStreetJournal/wsj/fonts/woffs/');
      //  bdy = bdy.replaceAll("'/fonts/woffs/",'raw.githubusercontent.com/Patrick-ring-motive/wellStreetJournal/wsj/fonts/woffs/');
        bdy = bdy.replaceAll("<script async",'<script defer="defer" ');
        bdy = bdy.replaceAll("<script ",'<script defer="defer" ');
        const re = /(<script[^>]*wsj.webserve.workers.dev[^>]*)(text\/javascript)([^>]*>)/gi;
       // bdy = bdy.replaceAll(re,`$1text/partytown$3`);
        let moatads = /(<script[^>]*moatads[^>]*>)/gi;
       //bdy=bdy.replace(moatads,'<script type="text/ignore">');
       let  moatads2 = /(<link[^>]*moatads[^>]*>)/gi;
      // bdy=bdy.replace(moatads2,'');
        if(ct.indexOf('html')>-1){
    bdy = bdy.replace('<head>',`
        <head>
        <link rel="stylesheet" href="/alt/css/wellstreet.css?wellStreetJournalAlt">
        <script src="https://polyfill.io/v3/polyfill.js?features=es5,es6,es7&flags=gated">     
        </script>
       <!-- <script src="/alt/js/customAjax.js?wellStreetJournalAlt"></script>-->
    `);
        bdy = bdy.replace('</body>','<script defer="defer"  src="/dist/allIndex.min.js?wellStreetJournalAlt" href="/dist/allIndex.min.js?wellStreetJournalAlt" xlink:href="/dist/allIndex.min.js?wellStreetJournalAlt"></script><a href="https://www.reddit.com/r/wellstreetjournal">​</a></body>');
        }
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


