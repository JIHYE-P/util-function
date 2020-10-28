const domBfs = root => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.push(...target.childNodes);
    console.log(target);
  }
}
const domDfs = root => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(...target.childNodes);
    console.log(target);
  }
} 
const jsonBfs = root => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.push(typeof target === 'object' ? Object.values(target) : []);
    console.log(target);
  }
}
const jsonDfs = root => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(typeof target === 'object' ? Object.values(target) : []);
    console.log(target);
  }
}
// DFS, BFS의 차이는 순회하는 상대를 배열 맨 앞에 저장하느냐 맨 뒤에 저장하느냐의 차이
// DOM, JSON의 차이는 배열에 추가되는 대상이 자식 엘리먼트 배열인지, 오브젝트 값의 배열인지의 차이이다

// 제너레이터
const bfs = function* (root){
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.push(...yield target);
  }
}
const dfs = function* (root){
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(...yield target);
  }
}
const runIterator = (iterator, f) => {
  let result;
  let nextProps;
  while(!(result = iterator.next(nextProps)).done){
    const {value} = result;
    nextProps = f(value);
  }
}
const createIteratorRunner = (iterator, nextFunc) => (root, f) => runIterator(iterator(root), target => {
  f(target);
  return nextFunc(target);
});

const domdfs = createIteratorRunner(dfs, el => el.childNodes);
const jsonbfs = createIteratorRunner(bfs, obj => typeof obj === 'object' ? Object.values(obj) : []);
domBfs(document.body, console.log);
jsonbfs({name: 'jihye', age: '0', family: {one: 'a', two: 'b', three: 'c'}}, console.log);


