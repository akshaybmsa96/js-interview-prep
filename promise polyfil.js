class myPromise {
  constructor(callback) {
    this.val = null;
    this.resolved = false;
    this.rejected = false;
    this.thenHandler = null;
    this.rejectHandler = null;

    callback(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(resolvedValue) {
    this.resolved = true;
    this.val = resolvedValue;

    if (this.thenHandler) {
      this.thenHandler(resolvedValue);
    }
  }
  reject(rejectedValue) {
    this.rejected = true;
    this.val = rejectedValue;

    if (this.rejectHandler) {
      this.rejectHandler(rejectedValue);
    }
  }

  then(thenCallBack) {
    if (this.resolved) {
      thenCallBack(this.val);
    } else {
      this.thenHandler = thenCallBack;
    }
    return this;
  }

  catch(catchCallBack) {
    if (this.rejected) {
      catchCallBack(this.val);
    } else {
      this.rejectHandler = catchCallBack;
    }

    return this;
  }
}

myPromise.resolve = function (value) {
  return new myPromise((res, rej) => {
    res(value);
  });
};

myPromise.reject = function (value) {
  return new myPromise((res, rej) => {
    rej(value);
  });
};

myPromise.all = function (promises) {
  return new myPromise((res, rej) => {
    let count = 0;
    const result = [];

    if (promises.length === 0) {
      res(promises);
      return;
    }

    const completed = (value, index) => {
      result[index] = value;
      ++count;

      if (count === promises.length) {
        res(result);
      }
    };

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((val) => {
          completed(val, i);
        })
        .catch((err) => {
          rej(err);
        });
    }
  });
};

myPromise.race = function (promises) {
  return new Promise((res) => {
    if (promises.length === 0) {
      res(promises);
      return;
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((x) => {
          res(x);
        })
        .catch((err) => {
          res(err);
        });
    }
  });
};

myPromise.any = function (promises) {
  return new Promise((res, rej) => {
    if (promises.length === 0) {
      return res(promises);
    }

    for (let i = 0; i < promises.length; i++) {
      promises[i].then((val) => {
        res(val);
      });
    }
  });
};

myPromise.isAllSettled = function (promises) {
  return new myPromise((res) => {
    if (promises.length === 0) {
      res(promises);
    }
    const result = [];
    let count = 0;

    const done = (value, index, status) => {
      ++count;
      result[index] = { status, value };

      if (count === promises.length) {
        res(result);
      }
    };

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((val) => {
          done(val, i, "fullfilled");
        })
        .catch((err) => {
          done(err, i, "rejected");
        });
    }
  });
};

new myPromise((res, rej) => {
  res("56");
}).then((x) => {
  console.log(x);
});

myPromise
  .reject("x")
  .then((sd) => {
    console.log(sd);
  })
  .catch((s) => {
    console.log(s);
  });

const p1 = new myPromise((res, rej) => {
  rej(4);
});

const p2 = new myPromise((res, rej) => {
  setTimeout(() => {
    res(5);
  }, 10000);
});

const p3 = new myPromise((res, rej) => {
  setTimeout(() => {
    rej(6);
  }, 1000);
});

myPromise.any([p1, p2, p3]).then((values) => {
  console.log(values);
});
