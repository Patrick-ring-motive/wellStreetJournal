
if(document.domain.indexOf('dwsj')>-1){
   if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/dsw.js?wellStreetJournalAlt');
  } 
}else{
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js?wellStreetJournalAlt');
  }
}
