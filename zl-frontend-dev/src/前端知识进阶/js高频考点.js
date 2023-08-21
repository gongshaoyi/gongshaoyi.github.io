/* eslint-disable no-inner-declarations */

const instanceofMock = (L, R) => {
  if (typeof L !== 'object') {
    return false;
  }

  while (true) {
    if (L === null) {
      return false;
    }

    if (L.__proto__ === R.prototype) {
      return true;
    }

    L = L.__proto__;
  }
};

{
  Object.prototype.toString.call(new Date());
}

{
  // lodash get
  const get = (object, path, defaultValue) => {
    let result = object === null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  };

  const baseGet = (object, path) => {
    path = castPath(path);

    let index = 0;
    let length = path.length;
    while (object !== null && index < length) {
      object = object[path[index++]];
    }

    return index && index === length ? object : undefined;
  };

  const get2 = (path, object) =>
    path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), object);
}

{
  const target = document.querySelectorAll('#main');
  target.style.cssText = `position: absolute;left:0px;top:0px;`;

  const walk = (direction, distance) =>
    new Promise((resolve, reject) => {
      const innerWalk = () => {
        setTimeout(() => {
          let currentLeft = parseInt(target.style.left, 10);
          let currentTop = parseInt(target.style.top, 10);

          const shouldFinish =
            (direction === 'left' && currentLeft === -distance) ||
            direction === 'top' ||
            (direction === 'top' && currentTop === -distance);
          if (shouldFinish) {
            resolve();
          } else {
            if (direction === 'left') {
              currentLeft--;
              target.style.left = `${currentLeft}px`;
            } else {
              currentTop--;
              target.style.top = `${currentTop}px`;
            }
            innerWalk();
          }
        }, 20);
      };

      innerWalk();
    });
}

{
  // 红绿灯
  const red = () => {
    console.log('red');
  };
  const green = () => {
    console.log('green');
  };
  const yellow = () => {
    console.log('yellow');
  };

  const task = (timer, light) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (light === 'red') {
          red();
        } else if (light === 'green') {
          green();
        } else {
          yellow();
        }

        resolve();
      }, timer);
    });

  const step = () => {
    task(3000, 'red')
      .then(task(1000, 'green'))
      .then(task(2000, 'yellow'))
      .then(step());
  };

  step();

  // async await
  const taskRunner = async () => {
    await task(3000, 'red');
    await task(1000, 'green');
    await task(2000, 'yellow');

    taskRunner();
  };
}

{
  const loadImage = (urlId) => {
    const url = `https://www.image.com/${urlId}`;
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onerror = function () {
        reject(urlId);
      };
      img.onload = function () {
        resolve(urlId);
      };
      img.url = url;
    });
  };

  // 依次加载图片
  const urlIds = [1, 2, 3, 4, 5];
  urlIds.reduce(
    (prePromise, urlId) => prePromise.then(loadImage(urlId)),
    Promise.resolve()
  );

  // 面向过程的实现
  const loadImageOneByOne = (index) => {
    const length = urlIds.length;

    loadImage(urlIds[index]).then(() => {
      if (index === length - 1) {
        return;
      } else {
        loadImageOneByOne(index + 1);
      }
    });
  };
  loadImageOneByOne(0);

  // async await
  const loadImageOneByOne2 = async () => {
    for (let i of urlIds) {
      await loadImage(i);
    }
  };

  loadImageOneByOne2();
}
{
  // 同时发出
  const loadImage = (urlIds) => {
    let url = `https://www.image.com/${urlIds}`;
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onerror = function () {
        reject();
      };
      img.onload = function () {
        resolve();
      };
      img.url = url;
    });
  };
  const urlIds = [1, 2, 3, 4];
  const promiseArray = urlIds.map((id) => loadImage(id));
  Promise.all(promiseArray)
    .then(() => {
      console.log('finish load all');
    })
    .catch((e) => {
      console.log(e);
    });
}

{
  // 控制最大并发数
  const loadImage = (urlId) => {
    let url = `https://www.xxx.xx.cn/${urlId}`;
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = resolve;
      img.url = url;
    });
  };

  const loadBylimit = (urlIds, loadImage, limit) => {
    const urlIdsCopy = [...urlIds];
    if (urlIdsCopy <= limit) {
      // 数组长度小于最大并发数，直接发出全部请求
      const promiseArr = urlIds.map((item) => loadImage(item));
      Promise.all(promiseArr);
    }

    const promiseArr = urlIds.splice(0, limit).map((id) => loadImage(id));
    urlIdsCopy
      .reduce((prePromise, urlId) => {
        prePromise
          .then(() => Promise.race(promiseArr))
          .catch((err) => {
            console.log(err);
          })
          .then((resolveId) => {
            let index = promiseArr.findIndex((id) => resolveId === id);
            promiseArr.splice(index, 1);
            promiseArr.push(loadImage(urlId));
          });
      }, Promise.resolve())
      .then(() => Promise.all(promiseArr));
  };
}

{
  setTimeout(() => console.log('11111'), 1);
  setTimeout(() => console.log('22222'), 0);
}

// 手写promise
{
  // 骨架
  function Promise(executor) {}
  Promise.prototype.then = function (onfulfilled, onrejected) {};
}

{
  function Promise(executor) {
    this.status = 'pending';
    this.value = null;
    this.reason = null;

    const resolve = (value) => {
      this.value = value;
    };

    const reject = (reason) => {
      this.reason = reason;
    };

    executor(resolve, reject);
  }

  Promise.prototype.then = function (onfulfilled, onrejected) {
    onfulfilled(this.value);
    onrejected(this.value);
  };
}

{
  function Promise(executor) {
    this.status = 'pending';
    this.value = null;
    this.reason = null;

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.value = value;
        this.status = 'fulfilled';
      }
    };

    const reject = (reason) => {
      if (this.status === 'pending') {
        this.reason = reason;
        this.status = 'rejected';
      }
    };

    executor(resolve, reject);
  }

  Promise.prototype.then = function (onfulfilled, onrejected) {
    onfulfilled =
      typeof onfulfilled === 'function' ? onfulfilled : (data) => data;
    onrejected =
      typeof onrejected === 'function'
        ? onrejected
        : (error) => {
            throw error;
          };

    if (this.status === 'fulfilled') {
      onfulfilled(this.value);
    }
    if (this.status === 'rejected') {
      onrejected(this.reason);
    }
  };
}
{
  function Promise(executor) {
    this.status = 'pending';
    this.value = null;
    this.reason = null;
    this.onFulfilledFunc = Function.prototype;
    this.onRejectedFunc = Function.prototype;

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.value = value;
        this.status = 'fulfilled';
        this.onFulfilledFunc(this.value);
      }
    };

    const reject = (reason) => {
      if (this.status === 'pending') {
        this.reason = reason;
        this.status = 'rejected';
        this.onRejectedFunc(this.reason);
      }
    };

    executor(resolve, reject);
  }

  Promise.prototype.then = function (onfulfilled, onrejected) {
    onfulfilled =
      typeof onfulfilled === 'function' ? onfulfilled : (data) => data;
    onrejected =
      typeof onrejected === 'function'
        ? onrejected
        : (reason) => {
            throw reason;
          };

    if (this.status === 'fulfilled') {
      onfulfilled(this.value);
    }
    if (this.status === 'rejected') {
      onrejected(this.reason);
    }

    if (this.status === 'pending') {
      this.onFulfilledFunc = onfulfilled;
      this.onRejectedFunc = onrejected;
    }
  };
}

{
  function Promise(executor) {
    this.status = 'pending';
    this.value = null;
    this.reason = null;
    this.onFulfilledFunc = [];
    this.onRejectedFunc = [];

    const resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      setTimeout(() => {
        if (this.status === 'pending') {
          this.value = value;
          this.status = 'fulfilled';
          this.onFulfilledFunc.forEach((fn) => {
            fn(this.value);
          });
        }
      });
    };

    const reject = (reason) => {
      setTimeout(() => {
        this.reason = reason;
        this.status = 'rejected';
        this.onRejectedFunc.forEach((fn) => {
          fn(this.reason);
        });
      });
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  Promise.prototype.then = function (onfulfilled, onrejected) {
    onfulfilled =
      typeof onfulfilled === 'function' ? onfulfilled : (data) => data;

    onrejected =
      typeof onrejected === 'function'
        ? onrejected
        : (reason) => {
            throw reason;
          };

    if (this.status === 'fulfilled') {
      onfulfilled(this.value);
    }
    if (this.status === 'rejected') {
      onrejected(this.reason);
    }

    if (this.status === 'pending') {
      this.onFulfilledFunc.push(onfulfilled);
      this.onRejectedFunc.push(onrejected);
    }
  };
}

{
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('lucas');
    }, 500);
  });
  promise
    .then((data) => {
      console.log('===>>1', data);
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve(`${data} next then`);
      //   }, 1000);
      // });
      return 123;
    })
    .then((data) => {
      console.log('===>2', data);
    });
}

{
  function Promise(executor) {
    this.status = 'pending';
    this.value = null;
    this.reason = null;
    this.onFulfilledFunc = [];
    this.onRejectedFunc = [];

    const resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      setTimeout(() => {
        if (this.status === 'pending') {
          this.value = value;
          this.status = 'fulfilled';
          this.onFulfilledFunc.forEach((fn) => fn(value));
        }
      });
    };

    const reject = (reason) => {
      setTimeout(() => {
        if (this.status === 'pending') {
          this.reason = reason;
          this.status = 'rejected';
          this.onRejectedFunc.forEach((fn) => fn(reason));
        }
      });
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  Promise.prototype.then = function (onfulfilled, onrejected) {
    onfulfilled =
      typeof onfulfilled === 'function' ? onfulfilled : (data) => data;
    onrejected =
      typeof onrejected === 'function'
        ? onrejected
        : (reason) => {
            throw reason;
          };

    if (this.status === 'fulfilled') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let result = onfulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      });
    }

    if (this.status === 'rejected') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let reason = onrejected(this.reason);
            resolve(reason);
          } catch (error) {
            reject(error);
          }
        });
      });
    }

    if (this.status === 'pending') {
      return new Promise((resolve, reject) => {
        this.onFulfilledFunc.push(() => {
          try {
            let result = onfulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });

        this.onRejectedFunc.push(() => {
          try {
            let reason = onrejected(this.reason);
            resolve(reason);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
  };
}

{
  function Promise(executor) {
    this.status = 'pending';
    this.value = null;
    this.reason = null;
    this.onFulfilledFunc = [];
    this.onRejectedFunc = [];

    const resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }

      setTimeout(() => {
        if (this.status === 'pending') {
          this.value = value;
          this.status = 'fulfilled';
          this.onFulfilledFunc.forEach((fn) => fn(value));
        }
      });
    };

    const reject = (reason) => {
      setTimeout(() => {
        this.reason = reason;
        this.status = 'rejected';
        this.onRejectedFunc.forEach((fn) => fn(reason));
      });
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  const resolvePromise = (promise2, result, resolve, reject) => {
    if (result === promise2) {
      reject(new TypeError('error due to circular reference'));
    }

    let consumed = false;
    let thenable;

    if (result instanceof Promise) {
      if (result.status === 'pending') {
        result.then((data) => {
          resolvePromise(promise2, data, resolve, reject);
        }, reject);
      } else {
        result.then(resolve, reject);
      }

      return;
    }

    let isComplexResult = (target) =>
      (typeof target === 'function' || typeof target === 'object') &&
      target !== null;

    if (isComplexResult(result)) {
      try {
        thenable = result.then;
        if (typeof thenable === 'function') {
          thenable.call(
            result,
            (data) => {
              if (consumed) {
                return;
              }
              consumed = true;
              return resolvePromise(promise2, data, resolve, reject);
            },
            (error) => {
              if (consumed) {
                return;
              }
              consumed = true;
              return reject(error);
            }
          );
        } else {
          resolve(result);
        }
      } catch (e) {
        if (consumed) {
          return;
        }
        consumed = true;
        return reject(e);
      }
    } else {
      resolve(result);
    }
  };

  Promise.prototype.then = function (onfulfilled, onrejected) {
    onfulfilled =
      typeof onfulfilled === 'function' ? onfulfilled : (data) => data;
    onrejected =
      typeof onrejected === 'function'
        ? onrejected
        : (reason) => {
            throw reason;
          };

    let promise2;

    if (this.status === 'fulfilled') {
      return (promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let result = onfulfilled(this.value);
            resolvePromise(promise2, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }));
    }

    if (this.status === 'rejected') {
      return (promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let result = onrejected(this.reason);
            resolvePromise(promise2, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }));
    }

    if (this.status === 'pending') {
      return (promise2 = new Promise((resolve, reject) => {
        this.onFulfilledFunc.push(() => {
          try {
            let result = onfulfilled(this.value);
            resolvePromise(promise2, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });

        this.onRejectedFunc.push(() => {
          try {
            let result = onrejected(this.reason);
            resolvePromise(promise2, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }));
    }
  };
}

{
  // promise catch
  Promise.prototype.catch = function (catchFun) {
    return this.then(null, catchFun);
  };
}

{
  Promise.resolve = function (data) {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  };
}

{
  Promise.reject = function (data) {
    return new Promise((resolve, reject) => {
      reject(data);
    });
  };
}

{
  Promise.all = function (promiseArray) {
    if (!Array.isArray(promiseArray)) {
      throw new TypeError('the arguments should be an array');
    }

    return new Promise((resolve, reject) => {
      try {
        let resultArray = [];
        let length = promiseArray.length;
        for (let i = 0; i < length; i++) {
          promiseArray[i].then((data) => {
            resultArray.push(data);
            if (resultArray.length === length) {
              resolve(resultArray);
            }
          }, reject);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
}
{
  Promise.race = function (promiseArray) {
    if (!Array.isArray(promiseArray)) {
      throw new TypeError('the arguments should be an array');
    }

    return new Promise((resolve, reject) => {
      try {
        let length = promiseArray.length;
        for (let i = 0; i < length; i++) {
          promiseArray[i].then(resolve, reject);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
}

{
  function newFunc(constructor, ...args) {
    const obj = Object.create(constructor.prototype);
    const result = constructor.apply(obj, args);
    return typeof result === 'object' && result !== null ? result : obj;
  }
}

{
  function Parent() {
    this.parent = 'parent';
  }
  Parent.prototype.name = '0000';
  function Child() {
    this.child = 'child';
  }

  Child.prototype = new Parent();

  let c = new Child();
}

{
  function Child(args) {
    Parent.call(this, args);
  }
}

{
  function Child(args1, args2) {
    this.args2 = args2;
    Parent.call(this, args1);
  }
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;
}

{
  // 继承原型链上的属性
  Child.prototype = Object.create(Parent.parent);
  // 存储超类
  Child.super = Parent;
  // 继承静态属性
  // Child.__proto__ = Parent;
  Object.setPrototypeOf(Child, Parent);
}

{
  function inherit(Child, Parent) {
    // 继承原型链上的属性
    Child.prototype = Object.create(Parent.prototype);
    // 修复constructor
    Child.prototype.constructor = Child;
    //存储超类
    Child.super = Parent;
    // 静态属性继承；
    Object.setPrototypeOf(Child, Parent);
  }

  function DateConstructor(args) {
    Date.apply(this, args);
    this.foo = 'bar';
  }
  inherit(DateConstructor, Date);
  DateConstructor.prototype.getMyTime = function () {
    return this.getTime();
  };

  let date = new DateConstructor();
  console.log('====>', date.getMyTime());
}

{
  // 并发请求
  const concurrencyRequest = (urls, limit) => {
    let len = urls.length;
    if (len < limit) {
      const promiseArr = urls.map((url) => load(url));
      Promise.all(promiseArr);
    }

    let index = 0;
    let count = 0;

    const request = async () => {
      if (index === len) return;

      let url = urls[index];
      try {
        let res = await load(url);
      } catch (error) {
        return error;
      } finally {
        count++;
        request();
      }
    };

    for (let i = 0; i < limit; i++) {
      request();
    }
  };
}
