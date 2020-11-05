const createElement = (tagname, props) => Object.assign(document.createElement(tagname), {...props});

const createVideo = async(url, props = {}) => {
  const src = await fetch(url).then(function(response) {
    if(response.ok){
      return response.blob();
    }
    throw new Error('Network response was not ok.');
  }).then(function(myBlob) { 
    const objectURL = URL.createObjectURL(myBlob);  
    return objectURL;
  }).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ', error.message);
  });
  return Object.assign(document.createElement('video'), {...props, src, muted: true});
}

const getVideoElement = async() => {
  const videos = [
    createVideo('https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/views/201030_IKEA_views/web_down.mp4'),
    createVideo('https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/views/201030_IKEA_views/tiktok_down.mp4'),
    createVideo('https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/views/201030_IKEA_views/video.mp4')
  ]
  const [web, tiktok, tvc] = await Promise.all(videos);
  console.log(web, tiktok, tvc);
}
// getVideoElement();

const url2objURL = async (url) => {
  const response = await fetch(url);
  if(!response.ok) return;
  const reader = response.body.getReader();

  const contentLength = response.headers.get('Content-Length');
  let receivedLength = 0;
  let chunks = [];
  while(true){
    const {done, value} = await reader.read();
    if(done) break;
    chunks.push(value);
    receivedLength += value.length;
    console.log(`${receivedLength}/${contentLength}`);
  }
  const blob = new Blob(chunks, {type: 'video/mp4'});
  return URL.createObjectURL(blob);
}
// url2objURL('https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/views/201030_IKEA_views/video.mp4');

const url2objURLIter = async function* (url){
  const response = await fetch(url);
  if(!response.ok) return;
  const reader = response.body.getReader();
  const contentLength = response.headers.get('Content-Length');
  yield contentLength;

  let chunks = [];
  while(true){
    const {done, value} = await reader.read();
    if(done) break;
    chunks.push(value);
    yield value.length;
  }
  const blob = new Blob(chunks, {type: 'video/mp4'});
  return URL.createObjectURL(blob);
}

const fetchIters = [
  'https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/views/201030_IKEA_views/video.mp4',
  'https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/views/201030_IKEA_views/tiktok_down.mp4',
  'https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/views/201030_IKEA_views/web_down.mp4'
].map(url2objURLIter);

const fetchProgress = async() => {
  const contentLength = await Promise.all(fetchIters.map((iter) => iter.next().then(({value}) => Number(value))));
  const totalContentLength = contentLength.reduce((acc, val) => acc+val);
  
  let currentLength = 0;
  const iteratorLoop = async(iter) => {
    while(true){
      const {value, done} =  await iter.next();
      if(done) return value;
      currentLength += value;
      progress();
    }
  }
  const progressEl = createElement('section', {style: `text-align:center; color:#fff; font-size:40px; background:#000;`});
  const progress = () => {
    progressEl.innerText = Math.floor((currentLength/totalContentLength)*100)+'%';
    document.body.appendChild(progressEl);
  }
  const videoSrc = await Promise.all(fetchIters.map(iter => iteratorLoop(iter)));
  const [tvc, tiktok, web] = videoSrc.map(src => Object.assign(document.createElement('video'), {src, muted: true}));
  progressEl.style.opacity = 0;
  console.log(tvc, tiktok, web);
}
fetchProgress();
