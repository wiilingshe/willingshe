const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
  
}
const formatTime3 = date => {
  const minute = date.getMinutes()
  const hour = date.getHours()
  return [hour, minute].map(formatNumber).join(':')
}


const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-') 
}
const timeChange = data =>{
  var theTime = parseInt(data);// 秒

  var theTime1 = 0;// 分

  if (theTime > 60) {

    theTime1 = parseInt(theTime / 60);

    theTime = parseInt(theTime % 60);


  }

  var result = "" + parseInt(theTime) + "秒";

  if (theTime1 > 0) {

    result = "" + parseInt(theTime1) + "分" + result;

  }

  return result;
}
module.exports = { 
  formatTime2: formatTime2,
  formatTime3: formatTime3,
  timeChange: timeChange
}

