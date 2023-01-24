
void async function RegisterServiceWorker(){
if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
return 0;
}
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js?wellStreetJournalAlt');
  }

}();