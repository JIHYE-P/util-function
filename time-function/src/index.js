// timer
const timeDivder = time => {
  const hr = Math.floor(time / (1000*60*60));
  const min = Math.floor(time / (1000*60)) - hr*60;
  const sec = Math.floor(time / 1000) - hr*60*60 - min*60;
  const ms = time % 1000;
  return {hr, min, sec, ms}
}
const format = ({hr,min,sec,ms}) => [`${min}`.padStart(2, '0'), `${sec}`.padStart(2, '0')].join(':');

let timeRemained = 1000*60*3;
const timer = setInterval(() => {
  const time = format(timeDivder(timeRemained));
  if(timeRemained - 1000 <= 0){
    timeRemained = 0;
    clearInterval(timer);
  }else timeRemained = timeRemained - 1000;
  Object.assign(document.getElementById('root'), {innerText: time});
}, 1000);





