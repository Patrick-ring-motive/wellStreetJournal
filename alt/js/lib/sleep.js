import './polyfill/idlecallback.js'

var wandow = window || self || this;
wandow.sleep = function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}



wandow.unblock = function() {
  return new Promise((resolve) => {
    requestIdleCallback(resolve, { timeout: 100 });
    requestAnimationFrame(resolve);
  });
}


wandow.idleCheck = async function(resolve) {

  while (document.readyState !== "complete") {
    await unblock();
  }
  requestIdleCallback(resolve);
}

wandow.idle = function() {
  return new Promise((resolve) => {
    idleCheck(resolve);
  });
}