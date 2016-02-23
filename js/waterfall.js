function Waterfall(obj) {
	var self = this;
	
	self.obj = obj;
	self.boxes = getByClass(self.obj, 'box');

	
	self.picW = self.boxes[0].offsetWidth;
	self.colums = Math.floor(self.obj.parentNode.clientWidth/self.picW);

	self.obj.style.width = self.picW * self.colums +'px';
	self.obj.style.margin = '0 auto';
	
	self.topsArr = [];


	self.begin();
	self.onmove();


}

Waterfall.prototype = {
	constructor: Waterfall,

	getIndex: function(value, arr){
		var i,len;

		for (i=0,len=arr.length; i<len; i++) {
			if(value === arr[i]) {
				return i;
			}
		}
		alert("NO Found");
	},

	setPos: function(obj, tArr) {
		var _obj = obj;

		var min, Index;

		min = Math.min.apply(null, tArr);
		Index = this.getIndex(min, tArr);

		_obj.style.left = this.picW * Index + 'px';
		_obj.style.top = tArr[Index] + 'px';
		tArr[Index] += _obj.offsetHeight;
		
	},

	begin: function(){
		var i,len;
		
		this.topsArr = [];
		for(i=0, len=this.boxes.length; i<len; i++) {
			
			if(i<this.colums) {
				this.topsArr.push(this.boxes[i].offsetHeight);
				this.boxes[i].style.left = this.picW * i + 'px';
			} else {

				this.setPos(this.boxes[i], this.topsArr);
			}
		}
		console.log(self);
	
	},

	onmove: function (colums) {
		var that = this;

		var oParent = that.obj.parentNode;

		var Height;
		var scrollTop;

		var currH, data;
		var i, len;
		oParent.onscroll = function() {
			currH = Math.min.apply(null, that.topsArr);

			// 调取父元素或页面的视口高度及滑动高度
			Height = this.clientHeight || document.body.clientHeight|| document.documentElement.clientHeight;
			scrollTop = this.scrollTop || document.body.scrollTop|| document.documentElement.scrollTop;

			if(currH/2 < Height + scrollTop) {

				// 保存相关'box'类元素的地址，为后续设置top值
				var NewP =[];

				// 后台调取相关资源
				data ={info:[{src: '00.jpg'}, {src: '01.jpg'}, {src: '02.jpg'}, {src: '03.jpg'}, {src: '04.jpg'}, {src: '05.jpg'}, {src: '06.jpg'}]};
				

				var tempDoc = document.createDocumentFragment();
				for (i=0, len= data.info.length; i<len; i++) {
					var tempBox = document.createElement('div');
					tempBox.className = that.boxes[0].className;
					var tempPic = document.createElement('div');
					tempPic.className = 'pic';
					var tempImg = document.createElement('img');
					tempImg.setAttribute('src', 'img/' + data.info[i].src);

					NewP.push(tempBox);

					tempPic.appendChild(tempImg);
					tempBox.appendChild(tempPic);
					tempDoc.appendChild(tempBox);

				}
				that.obj.appendChild(tempDoc);

				//  加入文档前 clientHeight 恒为〇,setPos函数失效
				for (i=0, len=NewP.length; i<len; i++) {
					that.setPos(NewP[i], that.topsArr);
				}
			}
		};

	},

	end: function() {
		var I_have_no_idea_now;
	}
};


window.onload = function() {
	init(getByClass(document, 'waterfall'), Waterfall);
};