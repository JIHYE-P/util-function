const $ = document.querySelector.bind(document);
const sleep = ms => new Promise(res => setTimeout(res, ms));
const transitionScene = scene => scene.el.style.transition = 'opacity 1s';
const hideScene = scene => scene.el.style.opacity = 0;
const showScene = scene => scene.el.style.opacity = 1;

const loop = async({el, duration, video}) => {
  showScene({el});
  if(video) {
    video.currentTime = 0;
    video.play();
  }
  await sleep(duration);
  setTimeout(() => {
    hideScene({el});
  }, 500);
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
    current.el && await loop(current);
  }
}

const url2ObjectUrl = async function* (url) {
  const response = await fetch(url);
  if(!response.ok) return;
  const reader  = response.body.getReader();
  const contentLength = response.headers.get('Content-Length');
  yield contentLength;
  // let receivedLength = 0;
  let chunks = [];
  while(true){
    const {value, done} = await reader.read();
    if(done) break;
    chunks.push(value);
    yield value.length;
    // receivedLength += value.length;
    // console.log(`Received ${receivedLength} of ${contentLength}`);
  }
  const blob = new Blob(chunks, {type: 'video/mp4'});
  return URL.createObjectURL(blob);
}

const iteratorAsync = [
'https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/views/201030_IKEA_views/video.mp4',
'https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/views/201030_IKEA_views/web_down.mp4'
].map(url2ObjectUrl);

const progress = Object.assign(document.createElement('div'), {className: 'progress', style: `
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 18px;
  z-index: 5;
  background: #fff;
`});
document.body.appendChild(progress);

const videoObjectURL = async() => {
  const contentLength = await Promise.all(iteratorAsync.map(iter => iter.next().then(({value}) => Number(value))));
  const totalContentLength = contentLength.reduce((acc, val) => acc+=val);
  let receivedLength = 0; 
  const iteratorRunner = async(iter) => {
    while(true){
      const {value, done} = await iter.next();
      if(done) return value;
      receivedLength += Number(value);
      downloadProgress();
      console.log(`${receivedLength}/${totalContentLength}`)
    }
  }
  const downloadProgress = () => {
    progress.innerText = `${Math.floor((receivedLength/totalContentLength)*100)} / 100`;
  }
  const objectURL = await Promise.all(iteratorAsync.map(iter => iteratorRunner(iter)));
  const [video1, video2] = objectURL.map(src => Object.assign(document.createElement('video'), {src, muted: true, loop: true}));
  document.body.removeChild(progress);
  $('.video1').appendChild(video1);
  $('.video2').appendChild(video2);
}

const main = async() => {
  await videoObjectURL();
  interstitial([
    {el: $('.video1'), duration: 15000, video: $('.video1 video')},
    {el: $('.video2'), duration: 15000, video: $('.video2 video')},
    {el: $('.title'), duration: 15000}
  ])
}
main();

/** 
 * 재귀함수
 * 
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
*/
