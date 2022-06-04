const clearAllTimeout = () => {
  window.setTimeoutIds.forEach((ids) => {
    clearTimeout(ids);
  });
};

let originalSetTimeout = setTimeout;

window.setTimeoutIds = [];

window.setTimeout = function (callBack, timer) {
  let timerId = originalSetTimeout(callBack, timer);
  window.setTimeoutIds.push(timerId);
};

setTimeout(() => console.log("hello"));
setTimeout(() => console.log("hi"));
setTimeout(() => console.log("bye"));
setTimeout(() => console.log("lol"));
setTimeout(() => console.log("hihi"));

clearAllTimeout();
