## DOM Tree 순회

DOM 엘리먼트, Json 등 부모-자식 계층 순회 함수
#### **BFS(Breadth Frist Search) 방식**
BFS 방식은 너비우선 탐색이다. 너비=층
```html
<div class="a">
  <div class="aa"></div>
  <div class="aaa"></div>
</div>
<div class="b">
  <div class="bb"></div>
  <div class="bbb"></div>
</div>
```
결과 ```[a, b, aa, bb, aaa, bbb]```

#### **DFS(Breadth Frist Search) 방식**
DFS 방식은 깊이우선 탐색이다. 
```html
<div class="a">
  <div class="aa"></div>
  <div class="aaa"></div>
</div>
<div class="b">
  <div class="bb"></div>
  <div class="bbb"></div>
</div>
```
결과 ```[a, aa, aaa, b, bb, bbb]```

-----
### BFS 방식으로 순회
```js
// dom
const domBFS = root => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.push(...target.childNodes);
    console.log(target);
  }
}
// json
const jsonBFS = root => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.push(typeof target === 'object' ? Object.values(target) : []);
    console.log(target);
  }
}
```

### DFS 방식으로 순회
```js
// dom
const domDFS = root => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(...target.childNodes);
    console.log(target);
  }
}
// json
const jsonDFS = root => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(typeof target === 'object' ? Object.values(target) : []);
    console.log(target);
  }
}
```

위 코드를 보면 BFS, DFS 방식의 함수를 보면 자식들을 스택 배열에 맨 앞에 추가하는지 `(unshift())`, 맨 뒤에 추가하는지`(push())`의 차이인걸 알 수 있다. 그리고 dom, json을 순회할 때의 차이점은 스택 배열에 추가되는 대상자만 다른걸 확인 할 수 있다.   

----
## Generator 
제너레이터를 만들려면 제너레이터 함수 `function* (){}`을 사용하여 `yield` 하나의 값을 반환할 수 있다. 제너레이터 함수는 일반 함수과 다르게 호출하면 코드가 실행되지 않고 실행을 처리하는 `제너레이터 객체`가 반환된다.   
`next()`는 제너레이터의 주요 메서드, `next()`를 호출하면 가장 가까운 `yield <value>`문을 만날 때 까지 실행이 지속된다. (value를 생략할 수 있지만 이경우엔 `undefind`가 된다) 이후, `yield <value>`문을 만나면 실행이 멈추고 산출하고자 하는 값인 `<value>`가 바깥 코드에서 반환된다. (yield는 산출된다 생산한다라는 뜻)    

`next()`는 항상 아래 두 프로퍼티를 가진 객체를 반환한다   
- `value` : 산출값
- `done:`: 함수 코드 실행이 끝났으면 `true`, 아니면 `false`   

`yield`는 결과를 바깥으로 전달할 뿐만 아니라 값을 제네레이터 안으로 전달할 수 있다. 값을 안,밖으로 전달하려면 `generator.next(arg)`를 호출해야 한다. 이때 `arg`는 `yield`의 결과가 된다. `generator.next()`를 처음 호출할 땐 항상 인수가 없어야한다. 인수가 넘어오더라고 무시한다.

## yield 표현식과 양방향 통신
제너레이터 양방향 통신은 `yield`를 통해서 이뤄진다. `next()`의 인자로 value를 전달 할 수 있다.
```js
const gen = function* (){
  const name = yield '이름';
  const age = yield '나이';
  return `${name}님 (${age}) 안녕하세요`;
}
const i = gen();
i.next(); // {value: "이름", done: false}
i.next('jihye'); // {value: "나이", done: false}
i.next('30'); // {value: "jihye님 (30) 안녕하세요", done: true}
```

----
## 일반화 하기
조금 더 일반화 할수 있도록 총 3가지 기능을 하는 함수를 만든다.   
```
1. 순회(dfs, bfs)하는 제너레이터 함수 / 이터레이터 (`next()`가 있는 객체)
2. generator runner 함수 만들기
3. generator runner 함수를 이용해서 root 대상자와, callback 함수 만들기
```

**1. 순회(dfs, bfs)하는 제너레이터 함수 - 이터레이터(`next()`가 있는 객체)**
```js
const dfs = function* (root){
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(...yield target);
  }
}
const bfs = function* (root){
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.push(...yield target);
  }
}
```
**2. generator runner 함수 만들기**
```js
const runIterator = (iterator, f) => {
  let result;
  let nextProps;
  while(!(result = iterator.next(nextProps)).done){
    const {value} = result;
    nextProps = f(value);
  }
}
```
**3. generator runner 함수를 이용해서 root 대상자와, callback 함수 만들기**
```js
const createGeneratorRunner = (iterator, nextFunc) => (root, f) => runIterator(iterator(root), target => {
  f(target);
  return nextFunc(target);
});
```

위 3개의 함수로 순회하고 싶은 대상자와, 결과값으로 커스텀 함수를 각각 설정할 수 있다.
```js
const domDFS = createGeneratorRunner(dfs, el => el.childNodes);
const domBFS = createGeneratorRunner(bfs, el => el.childNodes);
const jsonDFS = createGeneratorRunner(dfs, obj => typeof obj === 'object' ? Object.values(obj) : []);
const jsonBFS = createGeneratorRunner(bfs, obj => typeof obj === 'object' ? Object.values(obj) : []);

domDFS(document.body, console.log);
jsonBFS({a: 123, b: [0, 1, 2, {한글: '한글', 영어: '영어'},345], c: 'abc'}, console.log);
```