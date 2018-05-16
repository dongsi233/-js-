//数组删除指定项
Array.prototype.remove = function (from, to) {
	let rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
}

//获取image的base64
var reader = new FileReader();
reader.onload = function(e){
	let url = e.target.result
}
reader.readAsDataURL(files);

//时间格式化
function formateDate (now) {
	let y = now.getFullYear(),
			m = now.getFullMonth() + 1,
			d = now.getDate(),
			h = now.getHours(),
			m = now.getMinutes(),
			s = now.getSeconds();
	return y + "-" + m + "-" + d + "-" + h + "-" + m + "-" + s;
}

//数组去重（利用set的唯一性）
let arr = [1,1,2,2,4,5,6,3,4,5];
let deduped = [...new Set(arr)]; //[1,2,4,5,6,3]
//用reduce进行去重
let resutl = arr.sort().reduce((init, current) => {
	if(init.length === 0 || init[init.length - 1] !== current){
		init.push(current);
	}
	return init;
}, []);
console.log(result);

//数值交换
let param1 = 1,param2 = 2;
[param1, param2] = [param2, param1];

//删除对象中某些不需要的值
let {_internal, tooBig, ...cleanObject} = {el1: '1', _internal: 'secret', tooBig: {}, el2: '2'}
console.log(cleanObject); //{el1: '1', el2: '2'}

//在函数参数中解构嵌套对象
var car = {
	model: 'bmw 2019',
	engine: {
		v6: true,
		turbo: true,
		vin: 1234
	}
}
const modelAndVIN = ({model, engine: {vin}}) => {
	console.log(`model: ${model} vin: ${vin}`);
}
modelAndVIN(car); // model: bmw 2019 vin: 1234

//运用扩展运算符合并对象
let object1 = {a: 1, b: 2};
let object2 = {b: 30, c: 40, d: 50}
let merged = {...object1, ...object2};
console.log(merged); //{a:1, b:30, c:40, d:50}

//计算数组中每个元素出现的次数
var names = ['a', 'a', 'b', 'c', 'c', 'd', 'a'];
var countName = names.reduce((allNames, name) => {
	allNames[name] = allNames[name] ? ++allNames[name] : 1;
	return allNames;
}, {})	//{"a": 3, "b": 1, "c": 2, "d": 1}




