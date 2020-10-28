const sleep = ms => new Promise(res => setTimeout(res, ms));
const initScene = scene => scene.el.style.transition = 'opacity 1s';
const hideScene = scene => scene.el.style.opacity = 0;
const showScene = scene => scene.el.style.opacity = 1;

const sceneLoop = async({el, duration, video}) => {
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
  scenes.filter(({el}) => el).forEach(initScene);
  scenes.filter(({el}) => el).forEach(hideScene);
  let i = 0;
  while(true){
    const current = scenes[i++ % scenes.length];
    current.el && await sceneLoop(current);
  }
}

const $ = document.querySelector.bind(document);
const scenes = [
  {el: $('.video1'), duration: 5000, video: $('.video1 video')},
  {el: $('.video2'), duration: 5000, video: $('.video2 video')},
  {el: $('.title'), duration: 5000}
]
interstitial(scenes);


//재귀함수
/*
let i = 0;
const loop = async() => {
  const current = scenes[i++ % scenes.length];
  if(current.el){
    if(current.video) current.video.play();
    showScene(current);
    await sleep(current.duration);
    loop();
    await sleep(500);
    hideScene(current);
    if(current.video){
      current.video.pause();
      current.video.currentTime = 0;
    }
  }
}
loop();
*/

