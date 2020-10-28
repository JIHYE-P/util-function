import data from '../data.json'
/**
 * BFS 방식 - 너비우선탐색
 * 우선순위가 너비=층 이 된다는 것이 핵심이다.
 */
const domtourFunc = (root) => {
  const stack = [root];
  let target;
  while ((target = stack.shift())) {
    console.log(stack)
    if (target.childNodes && target.childNodes.length) {
      stack.push(...target.childNodes);
      console.log(target)
    }else console.log(target)
  }
};

const domtourIterator = function * (root) { //제네레이터 
  const stack = [root];
  let target;
  while ((target = stack.shift())) {
    if (target.childNodes && target.childNodes.length) {
      stack.push(...target.childNodes);
      for(const el of [target]){
        yield el;
      }
    } else yield target;
  }
};

/**
 * DFS 방식 - 깊이우선탐색
 */
const domtourDFS = root => {
  const stack = [root];
  let target;
  while(target = stack.shift()){
    if(target.childNodes && target.childNodes.length){
      stack.unshift(...target.childNodes);
      for(const el of [target]){
        console.log(el);
      }
    }else{
      console.log(target);
    }
  }
}

//
const jsonBFS = (root) => {
  const stack = [root];
  let target;
  debugger;
  while(target = stack.shift() || stack.length){
    stack.push(...(typeof target === 'object' ? Object.values(target) : []));
    debugger;
    console.log(target);
  }
};

const jsonDFS = (root) => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(...(typeof target === 'object' ? Object.values(target) : []));
    console.log(target)
  }
};

const traversalBFSIterator = function * (root){
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.push(...yield target);
  }
}

const traversalDFSIterator = function * (root){
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(...yield target);
  }
}

const tour = (generator, f)  => {
  let result = generator.next();
  while(!result.done){
    result = generator.next(f(result.value));
  }
}

const jsontour = (root, f) => {
  tour(traversalDFSIterator(root), parentNode => {
    f(parentNode);
    return typeof parentNode === 'object' ? Object.values(parentNode) : []
  });
}

const domtour = (root, f) => {
  tour(traversalDFSIterator(root), parentNode => {
    f(parentNode);
    return parentNode.childNodes
  });
}


const dfs = function* (root){
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(...yield target);
    console.log('dfs', target);
  }
}

const runIterator = (iterator, nextFunc) => {
  let result;
  let nextProps;  
  while(!(result = iterator.next(nextProps)).done){
    const {value} = result;
    nextProps = nextFunc(value);
  }
}

const createIteratorRunner = (iterator, nextFunc) => (root, f) => runIterator(iterator(root), target => {
  f(target);
  return nextFunc(target);
});

const dom = createIteratorRunner(dfs, el => el.childNodes);
dom(document.body, value => console.log(value));
