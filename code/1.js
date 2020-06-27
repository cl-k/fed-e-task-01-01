// 将下面异步代码使用 Promise 的方式改进
// setTimeout(function () {
//   var a = 'hello'
//   setTimeout(function () {
//     var b = 'world'
//     setTimeout(function () {
//       var c = 'I love U'
//       console.log(a + b + c)
//     }, 10)
//   }, 10)
// }, 10)

let p = new Promise((resolve, reject) => {
  var a = 'hello'
  resolve(a);
})

p.then(value => {
  return value
}).then(value => {
  var b = 'world'
  return value + b;
}).then(value => {
  var c = 'I love U'
  console.log(value + c);
})