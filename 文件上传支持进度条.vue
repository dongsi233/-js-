<template>
	<div>
		<router-view></router-view>
		<router-link to='/grid'>grid</router-link>

		<input type="file" multiple name="upload" @change="getFiles">
		<div id="dragBox" @dragover="onDragover" @dragleave="onDragleave" @drop="getFiles"></div>
		<button @click="uploadfile">上传</button>
		<div id="resMsg"></div>
		<div id="showImg" v-if="imgContent.length > 0">
			<div class="item" v-for="(image, key) in imgContent">
				<!-- <p>{{ image.name }}</p> -->
				<input type="text" v-model="image.name" name="">
				<span @click="delImg(key)">删除{{ key }}</span>
				<img :src="image.imgUrl">
			</div>
		</div>
		<div class="box"></div>
	</div>
</template>
<script>
	//数组根据下标删除元素
	Array.prototype.remove = function(from, to) {
		let rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	}
	export default {
		data () {
			return {
				fileInput: document.querySelector('input'),
				btn:document.querySelector('button'),
				box:document.querySelector('.box'),
				showImg: document.querySelector('#showImg'),
				resMsg: document.querySelector('#resMsg'),
				dragBox: document.querySelector('#dragBox'),
				arrFiles: [],
				fileFilter: [],
				imgContent: [],
				images: [],
				html: ""
			}
		},
		methods: {
			uploadfile () {
				var self = this;
				for(var i = 0; i < this.arrFiles.length; i++) {
					let file = this.arrFiles[i];
					(function(file){
						let xhr = new XMLHttpRequest();
						if(xhr.upload) {
							xhr.upload.addEventListener('progress', function(e){
								self.box.innerHTML = e.load/e.total;
							}, false);

							xhr.onreadystatechange = function (e) {
								if (xhr.readyState == 4) {
									if (xhr.status == 200) {
										// console.log(xhr.responseText);
										self.onSuccess(file,xhr.responseText)
										if(!self.arrFiles.length) {
											self.onComplete();
										}
									}
								} else {
									self.onFailure(file);
								}
							};
							xhr.open('post', './static/upload.php', true);
							// xhr.open('POST', './static/upload.php', true);
							// xhr.setRequestHeader("X_FILENAME", encodeURIComponent(file.name));
							xhr.send(file);
						};

					})(file);
				}
			},
			filter (files) {
				this.arrFiles = [];
				for(let i = 0;i < files.length; i++) {
					let file = files[i];
					if(file.type.indexOf('image') == 0) {
						if (file.size > 51200) {
							alert("您这张" + file.name + "图片大于500k");
						} else {
							this.arrFiles.push(file);
						}
					} else {
						alert(`it's no a image!`);
					}
				}
				
			},
			getFiles (e) {
				e.preventDefault();
				e.stopPropagation();

				let file = e.target.files || e.dataTransfer.files;
				// this.fileFilter = this.fileFilter.concat(file);
				this.fileFilter.push(...file);
				console.log(this.fileFilter);
				this.delfiles();
				// this.fileInput.value = "";
			},
			delfiles () {
				this.filter(this.fileFilter);
				console.log(this.arrFiles);
				this.onshowImg(this.arrFiles);
				console.log(this.imgContent);
			},
			onshowImg (files) {
				this.imgContent = [];
				if (typeof FileReader == undefined) {
					alert('your browser do not support FileReader');
					return false;
				}
				var self = this;
				for (let i = 0; i < files.length; i++) {
					var reader = new FileReader();
					let o = {};
					o.name = files[i].name;
					reader.onload = function (e) {
						o.imgUrl = this.result;
						self.imgContent.push(o);
						// self.images.push(e.target.result);
					}
					reader.readAsDataURL(files[i]);
					// this.imgContent.push(o);
					
				}
			},
			onComplete () {
				this.fileFilter = [];
				this.arrFiles = [];
				this.fileInput.value = "";
			},	
			onSuccess (file, res) {
				let name = file.name;
				var p = document.createElement('p');
				p.textContent = `${name}upload success`;
				this.resMsg.appendChild(p);
			},
			onFailure (file) {
				let name = file.name;
				var p = document.createElement('p');
				p.textContent = `${name}upload success`;
				this.resMsg.appendChild(p);
			},
			onDragover (e) {
				e.stopPropagation();
				e.preventDefault();
			},
			onDragleave (e) {
				e.stopPropagation();
				e.preventDefault();
			},
			delImg (idx) {
				this.imgContent.remove(idx);
				this.arrFiles.remove(idx);
				this.fileFilter.remove(idx);
			}
		}
	}
</script>
<style lang="scss">
	#dragBox {
		width:200px;
		height:100px;
		border:1px solid #ddd;
	}
	#showImg {
		width: 100ww;
		display: flex;
		.item {
			width:100px;height: 100px;
			img {
				max-width:100%;
			}
		}
	}
</style>