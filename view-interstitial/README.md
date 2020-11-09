## View Interstitial 
티비에서 여러 광고들이 순차적으로 나오는것 처럼 특정 엘리먼트를 순서대로 정해진 시간만큼 보였다가 사라지는 애니메이션 유틸리티 함수

### html 구조잡기
화면에 보여질 텍스트, 비디오, 이미지, iframe 등 엘리먼트들을 각각 하나의 `wrapper`로 감싼다.   
```html
<section class="video">
  <video src="" autoplay muted loop></video>
</section>
<section class="image">
  <img src="" alt="" />
</section>
<section class="title">
  <h1>Hello</h1>
</section>
```
-----
### CSS 적용하기
각 `wrapper` 엘리먼트을 동일한 위치에 겹쳐있어야한다. `z-index`는 중요하지 않다. 
애니메이션을 적용할 때 `opacity`로 속성을 이용해서 숨김/보임 처리를 하고, `transition` 속성을 이용해서 자연스러운 전환 애니메이션을 적용한다.

-----
### 애니메이션 준비
화면 광고를 돌릴 때 필요한 정보들은 화면대상과, 재생시간이 필요하다. 화면 정보를 `object`로 만들어서 배열 리스트에 순서대로 추가하는 형태로 한다.   
화면 `object`의 `key`로는 1. **element** (현 화면 엘리먼트), 2. **duration** (재생시간), 3. **video** (현 화면 비디오 엘리먼트)로 정리할 수 있다.   
**key** `video`가 필요한 이유는 화면에 비디오가 보였다가 다음 화면으로 넘어갔을 때 전 화면 비디오를 정지했다가, 다시 제차례가 왔을 때 비디오를 처음부터 재생 할 수 있도록 제어해야한다. `{el: wrapperElement, duration: 재생시간(밀리초단위), video: videoElement}`     

애니메이션 함수 인수로 아래 배열처럼 적용해서 화면을 순서대로 보여지게끔 한다.
```
[
  {el: wrapperElement, duration: 재생시간(밀리초단위), video: videoElement},
  {el: wrapperElement, duration: 재생시간(밀리초단위)},
  {el: wrapperElement, duration: 재생시간(밀리초단위), video: videoElement},
  ...
]
```
-----
### 애니메이션 함수 구현하기
1. 처음 로딩 했을 때 모든 화면은 숨김처리 한다.
2. 배열 리스트에서 순차적으로 오브젝트를 가져와 보임처리를 한다.

먼저 `wrapper`엘리먼트를 숨김/보임 처리 할 수 있는 style `opacity`를 적용하는 함수와, 자연스러운 전환 효과를 주기 위해 `transition`속성도 적용하는 함수를 만든다.
```js
const transitionScene = scene => scene.el.style.transition = 'opacity 0.5s';
const hideScene = scene => scene.el.style.opacity = 0;
const showScene = scene => scene.el.style.opacity = 1;
```

배열에 있는 오브젝트의 정해진 시간(`duration`)만큼 동안 순차적으로 오브젝트를 읽어올 수 있는 무한루프 함수를 먼저 만들어본다.
```js
const sleep = ms => new Promise(res => setTimeout(res, ms));
const interstitial = async(scenes = []) => {
  let i = 0;
  while(true){
    const currentScene = scenes[i++ % scenes.length];
    console.log(currentScene)
    await sleep(currentScene.duration);
  }
}
interstitial([...]);
```
`interstitial`함수를 실행하면 배열에 있는 오브젝트가 순서대로 콘솔에 찍히는걸 확인할 수 있다. while문이 무한루프에 빠지지 않도록 입력한 시간만큼 코드의 실행을 멈춰주는 유틸리티 `sleep`함수를 사용한다. `interstitial`함수를 통해 현재 `object`를 구할 수 있고, `duration`만큼 시간이 경과되면 다음 `object`를 구할 수 있게 되었고, 변수 `currentScene`을 이용하여 현재 화면에 애니메이션 기능을 추가한다.

-----
보여질 화면의 오브젝트를 구하였으니 애니메이션 효과를 적용하는 함수를 만든다.
```js
const showSceneLoop = async({el, duration, video}) => {
  showScene({el});
  if(video) video.play();
  await sleep(duration);
  hideScene({el});
  if(video){
    video.pause();
    video.currentTime = 0;
  }
}
const interstitial = async(scenes) => {
  scenes.filter(({el}) => el).forEach(transitionScene);
  scenes.filter(({el}) => el).forEach(hideScene);
  let i = 0;
  while(true){
    const current = scenes[i++ % scenes.length];
    current && await showSceneLoop(current);
  }
}
``` 

> 비디오 크기가 너무 커서 송출하면 버벅거리는 현상발견.

비디오가 최초에 로드가 끝나면 다음 재생될 때 캐시가 되어 불러들이면 안되는데, 비디오가 실행될 때마다 캐시를 지우고 다시 불러들이는 문제점 발생.     
비디오 링크를 Object URL (Blob url)로 만들어서 적용하면 캐시를 지우지 않고 계속 갖고있는다.     

## 비디오 파일 Object URL로 적용
> 링크 참고
* [Using Fetch 사용법](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Fetch%EC%9D%98_%EC%82%AC%EC%9A%A9%EB%B2%95)
* [Fetch: Download progress 사용법](https://ko.javascript.info/fetch-progress)


















