async function handleRequest(request) {

    let url = new URL(request.url);

//        console.log(url);
        if(url.pathname.indexOf('google9b9ccfe85609fdf9.html')>-1){
            let css = await fetch('https://github.com/Patrick-ring-motive/wellStreetJournal/blob/main/alt/verify/google9b9ccfe85609fdf9.html');
            let cssBdy = await css.text();
            let cssRes = new Response(cssBdy,css);
                cssRes.headers.delete('Content-Type');
                cssRes.headers.set('Content-Type','text/html');
            return cssRes;
        }
        if(url.pathname.toLowerCase().indexOf('wsjseo.js')>-1){
            let css = await fetch('https://raw.githubusercontent.com/Patrick-ring-motive/mobileScripts/main/userScripts/iphone/wsj.com/wsjSeo.js?'+new Date().getTime());
            let cssBdy = await css.text();
            let cssRes = new Response(cssBdy,css);
                cssRes.headers.delete('Content-Type');
                cssRes.headers.set('Content-Type','application/javascript');
            return cssRes;
        }
        if(url.pathname.toLowerCase().indexOf('robots.txt')>-1){
            let css = await fetch('https://raw.githubusercontent.com/Patrick-ring-motive/wellStreetJournal/main/alt/robots/drobots.txt?'+new Date().getTime());
            let cssBdy = await css.text();
            let cssRes = new Response(cssBdy,css);
                cssRes.headers.delete('Content-Type');
                cssRes.headers.set('Content-Type','application/javascript');
            return cssRes;
        }
        if(url.pathname.toLowerCase().indexOf('wsjfixlinks.js')>-1){
            let css = await fetch('https://raw.githubusercontent.com/Patrick-ring-motive/wellStreetJournal/main/alt/js/wsjFixLinks.js?'+new Date().getTime());
            let cssBdy = await css.text();
            let cssRes = new Response(cssBdy,css);
                cssRes.headers.delete('Content-Type');
                cssRes.headers.set('Content-Type','application/javascript');
            return cssRes;
        }
        if(url.pathname.toLowerCase().indexOf('wsjmain.css')>-1){
            let css = await fetch('ttps://raw.githubusercontent.com/Patrick-ring-motive/wellStreetJournal/main/alt/css/wellstreet.css?'+new Date().getTime());
            let cssBdy = await css.text();
            let cssRes = new Response(cssBdy,css);
                cssRes.headers.delete('Content-Type');
                cssRes.headers.set('Content-Type','text/css');
            return cssRes;
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

   if(ct.indexOf('image')==-1){

        bdy=await res.text();

        bdy = bdy.replaceAll('content="https://deloitte.wsj.com','content="https://dwsj.webserve.workers.dev');
        bdy = bdy.replaceAll('content="wsj.com','content="wsj.webserve.workers.dev');

        bdy = bdy.replaceAll('WSJ online','Well Street Journal');
        bdy = bdy.replaceAll('Wall Street Journal','Well Street Journal');
        

        bdy = bdy.replaceAll('www.wsj.com','wsj.webserve.workers.dev');

        bdy = bdy.replace('<head>','<head><link rel="stylesheet" href="https://wsj.webserve.workers.dev/wsjMain.css?'+new Date().getTime()+'">');

        bdy = bdy.replace('</body>','<script type="text/javascript" src="https://wsj.webserve.workers.dev/wsjFixLinks.js?'+new Date().getTime()+'"></script><script type="text/javascript" src="https://wsj.webserve.workers.dev/wsjSeo.js?'+new Date().getTime()+'"></script><a href="https://www.reddit.com/r/wellstreetjournal">⠀</a></body>');
bdy=bdy.replace('<head>',`
<head>
<!-- Google Analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'G-NG36NZHJ4X', 'auto');
  ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NG36NZHJ4X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NG36NZHJ4X');
</script>
`);
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


