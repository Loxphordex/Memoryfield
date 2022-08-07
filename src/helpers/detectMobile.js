export default function detectMobile() {
  var result = (navigator.userAgent.match(/(iphone)|(ipod)|(ipad)|(android)|(blackberry)|(windows phone)|(symbian)/i));

  if(result !== null) {
    return "mobile";
  } else {
    return "desktop";
  }
}