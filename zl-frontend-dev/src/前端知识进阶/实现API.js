/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
{
  const offset = (ele) => {
    let result = {
      top: 0,
      left: 0,
    };

    const getOffset = (node, init) => {
      if (node.nodeType !== 1) {
        return;
      }
      let positon = window.getComputedStyle(node)['position'];
      if (typeof init === 'undefined' && positon === 'static') {
        getOffset(node.parentNode);
        return;
      }
    };
  };
}

{
  function downLoadImage(urlArr, limit) {
    let len = urlArr.length;
    let urlCopyArr = urlArr;
    if (len < limit) {
      let promiseArray = urlArr.map((urlId) => loadImage(urlId));
      return Promise.all(promiseArray);
    }

    for (let i = 0; i < limit; i++) {
      run();
    }

    const run = async () => {
      let id = urlCopyArr.pop();
      try {
        await loadImage(id);
      } catch (e) {
        return e;
      } finally {
        run();
      }
    };
  }
}

{
  const loadImage = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log('====>>>setTimeout');
      }, 2000);
    });
  };
  const run = async () => {
    try {
      await loadImage();
      console.log('====>>>run');
    } catch (e) {
      return e;
    } finally {
      console.log('====>>>runfinally');
    }
  };
  run();
}

{
  const runPromiseSequence = (arrays, value) =>
    arrays.reduce(
      (promiseChain, currentFun) => promiseChain.then(currentFun),
      Promise.resolve(value)
    );

  const pipe =
    (...functions) =>
    (input) =>
      functions.reduce((acc, fn) => fn(acc), input);
}

{
  Array.prototype.reduce =
    Array.prototype.reduce ||
    function (fun, initialValve) {
      let arr = this; // 保存this
      let base = typeof initialValve === 'undefined' ? arr[0] : initialValve;
      let startPoint = typeof initialValve === 'undefined' ? 1 : 0;

      arr.slice(startPoint).forEach((val, index) => {
        base = fun(base, val, index + startPoint, arr);
      });

      return base;
    };
}

{
  const compose = function (...args) {
    let length = args.length;
    let count = length - 1;
    let result;
    return function f1(...args1) {
      result = args[current].apply(this, args1);
      if (current <= 0) {
        current = length - 1;
        return result;
      }
      count--;

      return f1.call(null, result);
    };
  };
}

{
  Function.prototype.bind = function (context, ...args1) {
    let fn = this;
    const Fn = function (...args2) {
      return fn.apply(this instanceof Fn ? this : context, [
        ...args1,
        ...args2,
      ]);
    };

    return Fn;
  };
}
