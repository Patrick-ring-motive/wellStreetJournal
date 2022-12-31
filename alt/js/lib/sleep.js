import './polyfill/idlecallback.js'

var wandow = window || self || this;
wandow.sleep = function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

wandow.block = function() {
  return new Promise((resolve) => {
    queueMicroTask(resolve);
  });
}

wandow.doWork = function() {
  return new Promise((resolve) => {
    setTimeout(resolve,0);
  });
}

wandow.unblock = function() {
  return Promise.race([
    new Promise((resolve) => requestIdleCallback(resolve, { timeout: 100 })),
    new Promise((resolve) => requestAnimationFrame(resolve))
  ]);
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

wandow.delayWork = function() {
  return 
    Promise.all([requestIdleCallback(),
    requestAnimationFrame()]);
  
}

wandow.defer = async function() {

  while (document.readyState !== "complete") {
    await unblock();
  }
  return delayWork();
}



/*
  The sleep function uses the setTimeout function to delay the execution of a function for a specified number of milliseconds. The unblock function uses the requestIdleCallback and requestAnimationFrame functions to schedule a callback to be executed during a period of idle time or at the next animation frame. The idleCheck function uses the unblock function to pause execution until the page has finished loading, and the idle function combines these functions to create a promise that resolves when the page has finished loading.

These functions can be useful for scheduling tasks to be executed during idle time or after the page has finished loading, in order to improve the performance and responsiveness of your applications.

*/