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
// domtourFunc(document.body);

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
// domtourDFS(document.body);

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
// jsonBFS(data);

const jsonDFS = (root) => {
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(...(typeof target === 'object' ? Object.values(target) : []));
    console.log(target)
  }
};
// jsonDFS(data);

//BFS
const traversalBFSIterator = function * (root){
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.push(...yield target);
  }
}
//이터레이터 생성함수 DFS
const traversalDFSIterator = function * (root){
  const stack = [root];
  let target;
  while(target = stack.shift() || stack.length){
    stack.unshift(...yield target);
  }
}
//이터레이터 실행함수
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
// jsontour(data, v => console.log(v));

const domtour = (root, f) => {
  tour(traversalDFSIterator(root), parentNode => {
    f(parentNode);
    return parentNode.childNodes
  });
}
// domtour(document.body, v => console.log(v));


/**
 * secure: https 에서만 쿠키 사용
 * expires/max-age: 쿠키의 만료 시간 설정
 * expires date 객체
 * max-age 초 (3600 1시간)
 */

// const setCookie = (name, value, options={}) => {
//   options = {
//     path: '/',
//     ...options
//   }
//   const cookie = encodeURIComponent(name)+'='+encodeURIComponent(value)+';';
//   const optionsValue = Object.keys(options).map(key => `${key}=${options[key]}`).join(';');
//   const updatedCookie = cookie+optionsValue;

//   document.cookie = updatedCookie;
// }

// setCookie('popup', 'close', {
//   secure: true, 
//   'max-age': 3600
// });

const setCookie = ({name, value, days}) => {
  let expires = '';
  if(days){
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = date.toUTCString();
  }else expires = '';

  const cookie = encodeURIComponent(name)+'='+encodeURIComponent(value)+';';
  const updatedCookie = cookie+'expires='+expires+';path=/;';
  console.log(updatedCookie) 
  document.cookie = updatedCookie;
}

setCookie({
  name: 'popupClose',
  value: 'today',
  days: 1
});

const checkCookie = elementId => {
  const cookiedata = document.cookie;
  if(cookiedata.indexOf("popupClose=today") < 0){
    document.getElementById(elementId).style.display = "block";
  }else{
    document.getElementById(elementId).style.display = "none";
  }
}


