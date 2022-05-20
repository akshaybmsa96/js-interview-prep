//solution 1
function sum() {
  //console.log("args",...arguments)
  let args = [...arguments];

  function returnSum() {
    let args1 = [...arguments];
    return sum(...args, ...args1);
  }

  let total = args.reduce((accum, current) => accum + current);
  returnSum.done = function () {
    return total;
  };

  return returnSum;
}

//solution 2

const sum = (...params) => {
  const total = params.reduce((a, b) => {
    return a + b;
  }, 0);

  const fnToReturn = sum.bind(null, total);

  fnToReturn.done = (_) => total;

  return fnToReturn;
};

console.log("total sum", sum()(4)(5, 6, 8)(1, 2, 3, 4).done());

console.log(sum(1, 1)(2, 5, 3, 2)(3, 4).done());

//solution 3

const sum = (...a) => {
  const param1 = Array.from(a).reduce((a, c) => a + c, 0);
  return function (...b) {
    if (b.length) {
      const param2 = Array.from(b).reduce((a, c) => a + c, 0);
      return sum(param1 + param2);
    } else {
      return param1;
    }
  };
};

console.log(sum(1, 1)(2, 5, 3, 2)(3, 4)());

//solution 4
//without adding done at the end

function sum(...args) {
  return Object.assign(sum.bind(null, ...args), {
    valueOf: () => args.reduce((a, c) => a + c, 0),
  });
}

console.log(+sum(1, 2, 3)(5, 6, 8));
