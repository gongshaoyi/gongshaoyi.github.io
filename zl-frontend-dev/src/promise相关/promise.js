const loadByLimit = (urlIds, loadImage, limit) => {
  const urlIdsCopy = [...urlIds];
  if (urlIdsCopy <= limit) {
    const promiseArray = urlIdsCopy.map((id) => loadImage(id));

    return Promise.all(promiseArray);
  }

  const promiseArray = urlIdsCopy.splice(0, limit).map((id) => loadImage(id));

  urlIdsCopy.reduce((prePromise, urlId) => {
    prePromise
      .then(() => Promise.race(promiseArray))
      .then((resolvedId) => {
        let resolvedIdPosition = promiseArray.findIndex(
          (id) => id === resolvedId
        );

        promiseArray.splice(resolvedIdPosition, 1);
        promiseArray.push(loadImage(urlId));
      });
  }, Promise.resolve());
};

{
  Promise.all = function (promises) {
    let result = [];
    let count = 0;
    let length = promises.length;

    return new Promise((resolve, reject) => {
      for (let p of promises) {
        Promise.resolve(p).then(
          (res) => {
            count++;
            result.push(res);
            if (count === length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  };

  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((p) => {
        Promise.resolve(p).then(resolve, reject);
      });
    });
  };
}
