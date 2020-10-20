const domBFS = root => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.push(...target.childNodes);
    console.log(target);
  }
}
const domDFS = root => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(...target.childNodes);
    console.log(target);
  }
}
const jsonBFS = root => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.push(...(typeof target === 'object' ? Object.values(target) : []));
    console.log(target);
  }
}
const jsonDFS = root => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(...(typeof target === 'object' ? Object.values(target) : []));
    console.log(target);
  }
}

// domBFS = (root, f) => {
//   const i = bfs(root);
//   let value = {childNodes: []};
//   let done = false;
//   while (!({value, done} = i.next(value.childNodes)).done) f(value);
// };
// domDFS = (root, f) => {
//   const i = dfs(root);
//   let value = {childNodes: []};
//   let done = false;
//   while (!({value, done} = i.next(value.childNodes)).done) f(value);
// };
// jsonBFS = (root, f) => {
//   const i = bfs(root);
//   let value;
//   let done = false;
//   while (!({value, done} = i.next(typeof value === 'object' ? Object.values(value) : [])).done) f(value);
// };
// jsonDFS = (root, f) => {
//   const i = dfs(root);
//   let value = [];
//   let done = false;
//   while (!({value, done} = i.next(typeof value === 'object' ? Object.values(value) : [])).done) f(value);
// };
// domBFS(document.body, console.log)

​bfs = function * (root) {
  const stack = [root];
  let target;
  while (target = stack.shift() || stack.length) stack.push(...yield target);
};
dfs = function * (root) {
  const stack = [root];
  let target;
  while (target = stack.shift() || stack.length) stack.unshift(...yield target);
};

runIterator = (i, f) => {
  let result;
  let nextProps;
  while (!(result = i.next(nextProps)).done) {
    const {value} = result;
    nextProps = f(value);
  }
};
​
createIteratorRunner = (iterator, fn) => (root, f) => runIterator(iterator(root), target => {
  f(target);
  return fn(target);
});
​
domBFS = createIteratorRunner(bfs, el => el.childNodes);
domDFS = createIteratorRunner(dfs, el => el.childNodes);
jsonBFS = createIteratorRunner(bfs, obj => typeof obj === 'object' ? Object.values(obj) : []);
jsonDFS = createIteratorRunner(dfs, obj => typeof obj === 'object' ? Object.values(obj) : []);
​
jsonDFS({a: 123, b: [0, 1, 2, {한글: '한글', 영어: '영어'},345], c: 'abc'}, console.log)