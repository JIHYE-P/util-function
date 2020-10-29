/**
 * cookie 옵션 
 * secure: https 에서만 쿠키 사용
 * expires/max-age: 쿠키의 만료 시간 설정
 * expires는 date 객체
 * max-age는 초 단위(3600 1시간)
 */
// const timeParser = (strs, ...props) => strs.reduce((acc, val, idx) => acc += (props.shift() ?? '') + val).split(' ');
export const timeParser = (strs, ...props) => strs.reduce((acc, val) => acc += (props.shift() ?? '') + val).split(' ').map(str => {
  const value = Number(str.slice(0, -1));
  switch (str.slice(-1)) {
  case 'D':
  case 'd': return value * 24 * 60 * 60 * 1000;
  case 'h': return value * 60 * 60 * 1000;
  case 'm': return value * 60 * 1000;
  case 's': return value * 1000;
  }
}).reduce((acc, val) => acc += val);

export const setCookie = (name, value, time) => {
  const now = new Date();
  now.setTime(now.getTime() + timeParser`${time}`);
  const expires = now.toUTCString();

  const cookie = encodeURIComponent(name)+'='+encodeURIComponent(value)+';';
  const updatedCookie = time ? cookie+'expires='+expires+';path=/;' : cookie+'path=/;'
  document.cookie = updatedCookie;
  console.log('cookie:', updatedCookie);

  return {name, value}
}
export const checkCookie = (cookie, element) => {
  const cookieData = Object.values(cookie).join('=');
  if(document.cookie.indexOf(cookieData) < 0){
    element.style.display = "block";
  }else{
    element.style.display = "none";
  }
}
const cookie = setCookie('popupClose', 'today', '1d 2h');
checkCookie(cookie, document.getElementById('app'))
