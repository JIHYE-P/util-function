const curry = f => (...args) => args.length >= f.length ? f(...args) : (...args2) => curry(f)(...args.concat(args2));
const curried = curry((a, b, c) => console.log('curry', a+b+c));
curried(5)(10)(15);

const __ = Symbol();
const placeCurry = f => (...args) => {
  if(args.length >= f.length && !args.includes(__)){
    return f(...args);
  }else{
    return (...args2) => {
      const replaceArgs = args2.reduce((acc, val) => {
        const index = acc.indexOf(__);
        if(index === -1){
          return [...acc, val]
        }else{
          acc.splice(index, 1, val);
          return acc;
        }
      }, args);
      return placeCurry(f)(...replaceArgs)
    }
  }
}
const placeCurried = placeCurry((a, b, c) => console.log('placeholder', a+b+c));
placeCurried(__)(5)(10, 50);
