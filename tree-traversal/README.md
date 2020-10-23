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

위 코드를 보면 BFS, DFS 방식의 함수를 보면 자식들을 스택 배열에 맨 앞에 추가하는지 `(unshift())`, 맨 뒤에 추가하는지`(push())`의 차이인걸 알 수 있다.   
그리고 dom, json을 순회할 때의 차이점은 스택 배열에 추가되는 대상자만 다른걸 확인 할 수 있다.

----
## Generator 
제너레이터를 만들려면 제너레이터 함수 `function *(){}`을 사용하여 `yield` 하나의 값을 반환할 수 있다. 제너레이터 함수는 일반 함수과 다르게 호출하면 코드가 실행되지 않고 실행을 처리하는 `제너레이터 객체`가 반환된다.   


----
## Iterator 반복사용하기
```js
const dfsIterator = function* (root){
  const stack = [root];
  let target;
  while(target = stack.shift()){
    stack.unshift(...target.childNodes);
    for(const el of [target]){
      yield el;
    }
  }
}
```


