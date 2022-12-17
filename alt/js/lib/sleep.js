var wandow = window || self || this;
wandow.sleep = function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

wandow.idle = function() {
  return new Promise((resolve) => {
    requestIdleCallback(resolve);
  });
}

wandow.unblock = function() {
  return new Promise((resolve) => {
    requestIdleCallback(resolve, 100);
    requestAnimationFrame(resolve);
  });
}