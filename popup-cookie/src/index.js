/**
 * secure: https 에서만 쿠키 사용
 * expires/max-age: 쿠키의 만료 시간 설정
 * expires는 date 객체
 * max-age는 초 단위(3600 1시간)
 */

export const setCookie = ({name, value, days}) => {
  const date = new Date();
  date.setTime(date.getTime() + (days*24*60*60*1000));
  const expires = date.toUTCString();

  const cookie = encodeURIComponent(name)+'='+encodeURIComponent(value)+';';
  const updatedCookie = days ? cookie+'expires='+expires+';path=/;' : cookie+'path=/;'
  document.cookie = updatedCookie;
  console.log('cookie:', updatedCookie);
  return {name, value}
}

const cookie = setCookie({
  name: 'popupClose',
  value: 'today',
  days: 1
});

export const checkCookie = popupId => {
  const cookieData = Object.values(cookie).join('=');
  if(document.cookie.indexOf(cookieData) < 0){
    document.getElementById(popupId).style.display = "block";
  }else{
    document.getElementById(popupId).style.display = "none";
  }
}


