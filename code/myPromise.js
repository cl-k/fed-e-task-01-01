const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'reject' // 失败

// promise 是一个类
class MyPromise {
  // 需要一个执行器在初始化时执行
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  status = PENDING; // promise 状态
  value = undefined; // 成功值
  reason = undefined; // 失败原因
  successCallback = []; // 成功回调
  failCallback = []; // 失败回调

  // 提供 resolve 方法，状态变为 fulfilled ,调用存在的成功回调函数
  resolve = value => {
    // 判断状态，如果不是等待，则阻止程序向下执行
    if (this.status !== PENDING) return;
    // 更改状态为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value

    // 判断是否存在成功回调函数，存在则调用，为了满足链式调用，所以i这里使用的是循环数组进行调用
    while (this.successCallback.length) this.successCallback.shift()()
  }

  // reject 方法，状态变为 REJECT，调用存在的失败回调
  reject = reason => {
    // 判断状态，如果不是等待，则阻止程序向下执行
    if (this.status !== PENDING) return
    // 更改状态为失败
    this.status = REJECTED
    // 保存失败后的原因
    this.reason = reason

    // 判断是否存在失败回调，存在则调用
    while (this.failCallback.length) this.failCallback.shift()()
  }

  // then 方法，接收一个成功回调函数，一个失败回调函数
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback ? failCallback : reason => {
      throw reason
    };
    let promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            // 判断 x 的值是普通值还是 promise 对象
            // 如果是普通值 直接调用 resolve
            // 如果是 promise 对象 查看 promise 对象返回的结果
            // 再根据 promise 对象返回的结果 决定调用 resolve 还是 rejected
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            // 判断 x 的值是普通值还是 promise 对象
            // 如果是普通值 直接调用 resolve
            // 如果是 promise 对象 查看 promise 对象返回的结果
            // 再根据 promise 对象返回的结果 决定调用 resolve 还是 rejected
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else {
        // 等待状态
        // 将成功回调和失败回调存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value);
              // 判断 x 的值是普通值还是 promise 对象
              // 如果是普通值 直接调用 resolve
              // 如果是 promise 对象 查看 promise 对象返回的结果
              // 再根据 promise 对象返回的结果 决定调用 resolve 还是 rejected
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          }, 0)
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          }, 0)
        });
      }
    });
    return promise2;
  }

  finally(callback) {
    return this.then(value => {
      return MyPromise.reslove(callback()).then(() => value)
    }, reason => {
      return MyPromise.reslove(callback()).then(() => {
        throw reason
      })
    })
  } catch (failCallback) {
    return this.then(undefined, failCallback)
  }

  static all(array) {
    let result = [];
    let index = 0;
    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        if (index === array.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (current instanceof MyPromise) {
          // promise 对象
          current.then(value => addData(i, value), reason => reject(reason))
        } else {
          // 普通值
          addData(i, array[i]);
        }
      }
    })
  }

  static reslove(value) {
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise(resolve => resolve(value))
    }
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    // promise 对象
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}