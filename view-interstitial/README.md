## View Interstitial 
티비에서 여러 광고들이 순차적으로 보이는 것처럼 특정 엘리먼트를 순서대로 정해진 시간만큼 보였다가 사라지는 애니메이션 유틸리티 함수

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




