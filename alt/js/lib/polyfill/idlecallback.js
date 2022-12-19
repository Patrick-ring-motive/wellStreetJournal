
var wandow = window || self || this;

wandow.clearStub = function() { return; };


/*
This function is designed to execute a provided function as soon as possible, depending on the environment it is running in. It checks for the presence of the setTimeout and queueMicrotask functions, which are commonly used to schedule a function to be executed at a later time. If either of those functions is available, the provided function is passed to it with a 10ms delay. Otherwise, the function is executed immediately.
*/
function doSoon(fun) {

  if (wandow.setTimeout) {
    return wandow.setTimeout(fun, 10);
  } else if (wandow.queueMicrotask) {
    return wandow.queueMicrotask(fun);
  } else {
    return fun();
  }

}



/*
This function is similar to the previous one, but it schedules the provided function to be executed with a delay of 0ms. This means that the function will be executed as soon as possible, but it may not be executed immediately if the JavaScript runtime is currently busy with other tasks. If the setTimeout function is not available, the provided function is executed immediately.
*/
function doNow(fun) {

  if (wandow.setTimeout) {
    return wandow.setTimeout(fun, 0);
  } else {
    return fun();
  }

}

wandow.setImmediate = wandow.setImmediate || doNow;
wandow.clearImmediate = wandow.clearImmediate || wandow.clearTimeout;

wandow.requestAnimationFrame = wandow.requestAnimationFrame || wandow.mozRequestAnimationFrame ||
  wandow.webkitRequestAnimationFrame || wandow.msRequestAnimationFrame
wandow.requestIdleCallback || wandow.setImmediate || wandow.queueMicrotask;

wandow.mozRequestAnimationFrame = wandow.requestAnimationFrame;
wandow.webkitRequestAnimationFrame = wandow.requestAnimationFrame;
wandow.msRequestAnimationFrame = wandow.requestAnimationFrame;
wandow.oRequestAnimationFrame = wandow.requestAnimationFrame;

wandow.cancelAnimationFrame = wandow.cancelAnimationFrame || wandow.mozCancelAnimationFrame || wandow.cancelIdleCallback || wandow.clearTimeout || wandow.clearImmediate || wandow.clearStub;

wandow.mozCancelAnimationFrame = wandow.cancelAnimationFrame;
wandow.webkitCancelAnimationFrame = wandow.cancelAnimationFrame;
wandow.msCancelAnimationFrame = wandow.cancelAnimationFrame;
wandow.oCancelAnimationFrame = wandow.cancelAnimationFrame;

wandow.requestIdleCallback = wandow.requestIdleCallback || wandow.requestAnimationFrame;

wandow.cancelIdleCallback = wandow.cancelIdleCallback || wandow.cancelAnimationFrame || wandow.clearTimeout || wandow.clearImmediate || wandow.clearStub;


wandow.queueMicrotask = wandow.queueMicrotask || doNow;
wandow.nextTick = wandow.nextTick || wandow.queueMicrotask || wandow.requestIdleCallback || wandow.setImmediate;


/*

requestIdleCallback and queueMicrotask are both functions that can be used to schedule a function to be executed at a later time. However, there are some key differences between these two functions.

requestIdleCallback is designed to schedule a function to be executed during idle periods, when the browser is not busy with other tasks. This can be useful for performing background tasks, such as preloading images or updating data, without impacting the performance of the user interface.

queueMicrotask, on the other hand, is designed to schedule a function to be executed as soon as possible, but not necessarily immediately. This can be useful for tasks that need to be executed in a specific order, but do not need to be executed immediately.

Both requestIdleCallback and queueMicrotask can be used to improve the performance and responsiveness of a web application. However, the appropriate function to use depends on the specific requirements of the task being scheduled.

For example, if you have a background task that updates data in a database, you may want to use requestIdleCallback to schedule this task to be executed during idle periods, so that it does not interfere with the user interface. On the other hand, if you have a task that needs to be executed in a specific order, but does not need to be executed immediately, you may want to use queueMicrotask to ensure that the task is executed as soon as possible, but not necessarily immediately.

In general, it's important to carefully consider the requirements of the tasks you are scheduling, and to choose the appropriate function based on those requirements. This can help to ensure that your web application performs well and provides a smooth user experience.

*/















