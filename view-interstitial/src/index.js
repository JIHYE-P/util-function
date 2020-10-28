const sleep = ms => new Promise(res => setTimeout(res, ms));
const hideScene = el => el.style.opacity = 0;
const showScene = el => el.style.opacity = 1;

const interstitial = (scenes) => {
  scenes.forEach(({el}) => hideScene(el));
  
}

const $ = document.querySelector.bind(document);
interstitial([
  {el: $('.title'), duration: 5000},
  {el: $('.video'), duration: 15000, video: $('.video video')},
  {el: $('.iframe'), duration: 15000}
]);


