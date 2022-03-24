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