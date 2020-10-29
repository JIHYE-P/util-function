const log = (a, b, c) => console.log(a+b+c);

const curry = f => (...args) => args.length >= f.length ? f(...args) : (...args2) => curry(f)(...args.concat(args2));
const curried = curry(log);
curried(5)(10)(15);
