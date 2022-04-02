export function barTimeUtil(dateTimeStamp) { //字符串形式
  let result;
  const minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const halfamonth = day * 15;
  const month = day * 30;
  const now = new Date().getTime();   //获取当前时间毫秒
  const old = new Date(dateTimeStamp);
  const diffValue = now - old;//时间差

  if (diffValue < 0) {
    return;
  }
  const minC = diffValue / minute;  //计算时间差的分，时，天，周，月
  const hourC = diffValue / hour;
  const dayC = diffValue / day;
  const weekC = diffValue / week;
  const monthC = diffValue / month;
  if (monthC >= 1 && monthC < 4) {
    result = " " + parseInt(monthC) + "个月前"
  } else if (weekC >= 1 && weekC < 4) {
    result = " " + parseInt(weekC) + "周前"
  } else if (dayC >= 1 && dayC < 7) {
    result = " " + parseInt(dayC) + "天前"
  } else if (hourC >= 1 && hourC < 24) {
    result = " " + parseInt(hourC) + "小时前"
  } else if (minC >= 1 && minC < 60) {
    result = " " + parseInt(minC) + "分钟前"
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚"
  } else {
    const Nyear = old.getFullYear();
    const Nmonth = old.getMonth() + 1 < 10 ? "0" + (old.getMonth() + 1) : old.getMonth() + 1;
    const Ndate = old.getDate() < 10 ? "0" + old.getDate() : old.getDate();
    const Nhour = old.getHours() < 10 ? "0" + old.getHours() : old.getHours();
    const Nminute = old.getMinutes() < 10 ? "0" + old.getMinutes() : old.getMinutes();
    const Nsecond = old.getSeconds() < 10 ? "0" + old.getSeconds() : old.getSeconds();
    result = Nyear + "-" + Nmonth + "-" + Ndate + " " + Nhour + ":" + Nminute + ":" + Nsecond
  }
  return result;
}

export function numberHandle(num) {
  let a = num / 1000;
  if (a > 1) {
    return a.toFixed(1) + 'k'
  } else {
    return num
  }
}

export function getBirthStar(val) {
  var date = new Date(val)
  console.log(date)
  const month = parseInt(date.getMonth() + 1);
  const day = parseInt(date.getDate());
  var birth_star = "";
  if (month == 1 && day >= 20 || month == 2 && day <= 18) {
    birth_star = "水瓶座";
  } else if (month == 2 && day >= 19 || month == 3 && day <= 20) {
    birth_star = "双鱼座";
  } else if (month == 3 && day >= 21 || month == 4 && day <= 19) {
    birth_star = "白羊座";
  } else if (month == 4 && day >= 20 || month == 5 && day <= 20) {
    birth_star = "金牛座";
  } else if (month == 5 && day >= 21 || month == 6 && day <= 21) {
    birth_star = "双子座";
  } else if (month == 6 && day >= 22 || month == 7 && day <= 22) {
    birth_star = "巨蟹座";
  } else if (month == 7 && day >= 23 || month == 8 && day <= 22) {
    birth_star = "狮子座";
  } else if (month == 8 && day >= 23 || month == 9 && day <= 22) {
    birth_star = "室女座";
  } else if (month == 9 && day >= 23 || month == 10 && day <= 22) {
    birth_star = "天秤座";
  } else if (month == 10 && day >= 23 || month == 11 && day <= 21) {
    birth_star = "天蝎座";
  } else if (month == 11 && day >= 22 || month == 12 && day <= 21) {
    birth_star = "人马座";
  } else if (month == 12 && day >= 22 || month == 1 && day <= 19) {
    birth_star = "摩羯座";
  } else if (date == "" || data == null) {
    birth_star = ""
  }
  return birth_star;
}