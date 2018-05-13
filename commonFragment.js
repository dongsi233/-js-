//数组删除指定项
Array.prototype.remove = function (from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
}

//获取image的base64
var reader = new FileReader();
reader.onload = function(e){
	var url = e.target.result
}
reader.readAsDataURL(files);


