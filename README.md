# Util Functions
```
1. view-interstital - 화면 전환 애니메이션 무한루프
2. tree-traversal - 트리구조 (dom, json) 순회
3. time-function - 타이머 기능
4. popup-cookie - 팝업 오늘하루그만보기 구현
5. pipe-function
6. currying
```

-----

## Tagged Template Literals
자바스크립트에서 문자열을 다룰 때 `Template Literals` ``(백틱)을 사용하여 문자열에 변수 값을 손쉽게 합칠 수 있다. 
```js
const temp1 = 'Hello World';

console.log(`Welcome ~ ${temp1}`);
```

### _Tagged Template Literals_ 란     
먼저 `styled-components` 라이브러리 사용 코드를 보면 아래 문법처럼 ``(백틱)을 이용하여 CSS 코드 적용해준다.
```
// styled-components
const Styled = styled.div`
  width: 100px;
  height: 100px;
  background: red;
`
```
_Tagged Template Literals_ 도 _Template Literals_ 를 이용하여 함수의 인자를 파싱하여 넘겨준다. 
```js
const templateLiterals = (string, ...props) => {
  console.log(string); // ["My favorite color is ", " and ", "", raw: Array(3)]
  console.log(...props) // black white
}
const temp1 = 'black';
const temp2 = 'white';
templateLiterals`My favorite color is ${temp1} and ${temp2}`;
```
위 코드를 실행하여 `templateLiterals` 함수 파라미터를 확인하면, 첫번째는 문자열이 배열로 들어가고, 나머지 파라미터에는 변수값들이 들어오는 것을 확인할 수 있다. (`...props`는 _Rest Parameters_ 사용)     

### Custom function
1. _Tagged Template Literals_ 를 이용하여 문자열의 띄어쓰기 기준으로 배열로 반환되는 함수 만들기
```js
const stringParser = (string, ...props) => string.reduce((acc, val) => acc += (props.shift() ?? '') + val).split(' ');

stringParser`1d 2h 10m 30s` // [1d, 2h, 10m, 30s]
```

2. `1d 2h 10m 30s` 시간(d: 일, h: 시, m: 분, s: 초) 문자열을 파싱하여 밀리초 숫자값으로 반환
```js
const timeParser = (string, ...props) => string.reduce((acc, val) => acc += (props.shift() ?? '') + val).split(' ').map(str => {
  const value = Number(str.slice(0, -1));
  const time = str.slice(-1);
  switch(time){
  case 'd': return value*1000*60*60*24;
  case 'h': return value*1000*60*60;
  case 'm': return value*1000*60;
  case 's': return value*1000;
  }
}).reduce((acc, val) => acc+=val);
timeParser`1d 2h 10m 30s` //1일 2시간 10분 30초를 밀리초단위 숫자 값으로 반환된다.
```






