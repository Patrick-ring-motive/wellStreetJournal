import './polyfill/idlecallback.js';

var globalObject = window || self || global || globalThis || frames || this;
globalObject.globalObject = globalObject;

globalObject.sleep = function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


globalObject.block = function() {
  return new Promise((resolve) => {
    queueMicroTask(resolve);
  });
}

globalObject.doWork = function() {
  return new Promise((resolve) => {
    setTimeout(resolve,0);
  });
}

globalObject.taskRace = function() {
  if('scheduler' in globalObject){
  return scheduler.postTask(function(){return '';}, { priority: 'user-visible' });
  }
}

globalObject.taskAll = function() {
  if('scheduler' in globalObject){
  return scheduler.postTask(function(){return '';}, { priority: 'background' });
  }else{
  return '';
  }
}

globalObject.unblock = function() {
  return Promise.race([
    new Promise((resolve) => requestIdleCallback(resolve, { timeout: 100 })),
    new Promise((resolve) => requestAnimationFrame(resolve)),
    taskRace()
  ]);
}




globalObject.idleCheck = async function(resolve) {

  while (document.readyState !== "complete") {
    await sleep(50);
    await unblock();
  }
  requestIdleCallback(resolve);
}

globalObject.idle = function() {
  return new Promise((resolve) => {
    idleCheck(resolve);
  });
}

globalObject.delayWork = function() {
return Promise.all([
    new Promise((resolve) => requestIdleCallback(resolve)),
    new Promise((resolve) => requestAnimationFrame(resolve)),
    new Promise((resolve) => setTimeout(resolve,100)),
    taskAll()
  ]);
  
}

globalObject.defer = async function() {

  while (document.readyState !== "complete") {
    await delayWork();
  }
  return delayWork();
}

globalObject.threadPriority = function(level){

switch (level) {
  case 1:
  case 'critical':
    return;
  case 2:
  case 'very high':
    return globalObject.block();
  case 3:
  case 'high':
    return globalObject.doWork();
  default:
  case 4:
  case 'medium':
    return globalObject.unblock();
  case 5:
  case 'low':
    return globalObject.idle();
  case 6:
  case 'very low':
    return globalObject.defer();
}
}

/*
  The sleep function uses the setTimeout function to delay the execution of a function for a specified number of milliseconds. The unblock function uses the requestIdleCallback and requestAnimationFrame functions to schedule a callback to be executed during a period of idle time or at the next animation frame. The idleCheck function uses the unblock function to pause execution until the page has finished loading, and the idle function combines these functions to create a promise that resolves when the page has finished loading.

These functions can be useful for scheduling tasks to be executed during idle time or after the page has finished loading, in order to improve the performance and responsiveness of your applications.

*/