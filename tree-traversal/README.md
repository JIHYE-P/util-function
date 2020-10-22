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
    stack.push(...target.childNodes); // 자식 배열 맨 뒤 추가
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
    stack.unshift(...target.childNodes); //자식 배열 맨 앞 추가
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





