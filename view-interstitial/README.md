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
### 스크립트 적용
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




