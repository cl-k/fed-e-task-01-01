const fp = require('lodash/fp')
const {
  flowRight
} = require('lodash');

// 数据 horsepower 马力, dollar_value 价格, in_stock 库存
const cars = [{
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true
  },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false
  },
  {
    name: 'Audi R8',
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false
  },
  {
    name: 'Aston Martin One-77',
    horsepower: 759,
    dollar_value: 1850000,
    in_stock: true
  },
  {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false
  }
]

// 1：使用函数组合 fp.flowRight() 重新实现下面这个函数
// let isLastInStock = function(cars) {
//   // 获取最后一天数据
//   let last_car = fp.last(cars)
//   // 获取最后一条数据的 in_stock 属性值
//   return fp.prop('in_stock', last_car)
// }
let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last);
console.log(isLastInStock(cars));

// 2. 使用fp.flowRight()、fp.prop() 和 fp.first() 获取第一个 car 的 name
let firstName = fp.flowRight(fp.prop('name'), fp.first);
console.log(firstName(cars));

// 3. 使用帮助函数 _average 重构 averageDollarValue， 使用函数组合的方式实现
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}

// let averageDollarValue = function (cars) {
//   let dollar_value = fp.map(function (car) {
//     return car.dollar_value
//   }, cars)
//   return _average(dollar_value)
// }

let averageDollarValue = fp.flowRight(_average, fp.map(car => {
  return car.dollar_value
}))
console.log(averageDollarValue(cars));

// 4. 使用 flowRight 写一个 sanitizenames() 函数，返回一个下划线连接的小写字符串
// 把数组中的name 转换为如下形式，e.g.: sanitizenames(['Hello World']) => ['hello_world']
let _underscore = fp.replace(/\W+/g, '_')
let sanitizenames = fp.map(fp.flowRight(_underscore, fp.toLower))
console.log(sanitizenames(['A b']))