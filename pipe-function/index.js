const pipe = (...fs) => props => fs.reduce((acc, f) => f(acc), props);
pipe(
  (v) => {
    console.log(v)
    return v+10
  },
  (v) => {
    console.log(v)
    return v+100
  },
  (v) => {
    console.log(v)
    return v+1000
  },
)(100);
  
const sleep = ms => new Promise(res => setTimeout(res, ms));
const pipeAsync = (...fs) => async(props) => fs.reduce(async(acc, f) => f(await acc), Promise.resolve(props));
await pipeAsync(
  v => {
    console.log(v);
    return v*10
  },
  v => {
    console.log(v);
    return v-5;
  },
  async v => {
    await sleep(3000);
    console.log(v);
    return v;
  },
  v => {
    console.log(v + 15)
  }
)(10);

/*
const getHours = d => d.getHours() % 12;
const getMinutes = d => d.getMinutes();
const getSeconds = d => d.getSeconds();
const getMilliseconds = d => d.getMilliseconds();

const map = f => arr => arr.map(f);
const emitMap = (...fns) => p => fns.map(f => f(p));
const arrayMap = (...fns) => arr => arr.map((c, i) => fns[i](c));
const divide = a => b => b / a;
const multiple = a => b => a * b;

t = () => pipe(
  emitMap(getHours, getMinutes, getSeconds, d => [getMilliseconds(d) / 1000]),
  p => p.reduceRight((acc, val, i) => {
    acc.unshift((val + acc[0]) / (i === 0 ? 12 : 60));
    return acc;
  }),
  map(i => i * 360),
)(new Date);

pipe(
  ((...fns) => d => fns.map(fn => fn(d)))(getHours, getMinutes, getSeconds, getMilliseconds),
  p => {
    const [h, m, s, ms] = p;
    const msp = ms / 1000;
    const smsp = (s + msp)/ 60;
    const msmsp = (m + smsp) / 60;
    const hmsmsp = (h + msmsp) / 60;
    return [hmsmsp, msmsp, smsp];
  },
  p => p.map(i => i * 360),
)(new Date);


t = () => pipe(
  ((...fns) => d => fns.map(fn => fn(d)))(getHours, getMinutes, getSeconds, getMilliseconds),
  p => p.reduceRight((acc, val) => {
    (acc.length === 0) ? acc.unshift(val / 1000) : acc.unshift((val + acc[0]) / 60);
    return acc;
  }, []),
  p => p.map(i => i * 360),
)(new Date);


t = () => pipe(
  emitMap(getHours, getMinutes, getSeconds, d => [getMilliseconds(d) / 1000]),
  p => p.reduceRight((acc, val) => {
    acc.unshift((val + acc[0]) / 60);
    return acc;
  }),
  p => p.map(i => i * 360),
)(new Date);

t = () => pipe(
  emitMap(
    getHours, 
    getMinutes, 
    getSeconds, 
    d => [getMilliseconds(d)]
  ),
  p => p.reduceRight((acc, val, i) => {
    acc.unshift(val + acc[0] / (acc.length === 1 ? 1000 : 60));
    return acc;
  }),
  arrayMap(
    pipe(multiple(360), divide(12)),
    pipe(multiple(360), divide(60)),
    pipe(multiple(360), divide(60)),
    pipe(multiple(360), divide(1000))
  ),
)(new Date);
*/