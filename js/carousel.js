function getStyle (obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        // 兼容FireFox, Chrome， getComputedStyle(DOM元素, 伪类名称)
        return getComputedStyle(obj, null)[name];
    }
}

// 获取oParent DOM元素下所有 类名包含 cName 的标签
function getByClass  (oParent, Name) {
    var Elems = oParent.getElementsByTagName("*");
    var Result = [];
    var check = false;
    var pattern = new RegExp("\\s\*"+Name+"\\s\*"); //正则查找
    for (var i=0; i< Elems.length; i++) {
        
        check = pattern.test(Elems[i].className);
       
        if (check === true) {
            Result.push(Elems[i]);
        }
    }
    return Result;
}

// 计算方法
var Animation = {

    //t:时间间隔, c:变化量, d:持续时间, b:初始值

    Linear: function(t,b,c,d){ return c*t/d + b; },

    Quad: {//二次方的缓动（t^2）；

        easeIn: function(t,b,c,d){

            return c*(t/=d)*t + b;

        },

        easeOut: function(t,b,c,d){

            return -c *(t/=d)*(t-2) + b;

        },

        easeInOut: function(t,b,c,d){

            if ((t/=d/2) < 1) return c/2*t*t + b;

            return -c/2 * ((--t)*(t-2) - 1) + b;

        }

    },

    Cubic: {//三次方的缓动（t^3）

        easeIn: function(t,b,c,d){

            return c*(t/=d)*t*t + b;

        },

        easeOut: function(t,b,c,d){

            return c*((t=t/d-1)*t*t + 1) + b;

        },

        easeInOut: function(t,b,c,d){

            if ((t/=d/2) < 1) return c/2*t*t*t + b;

            return c/2*((t-=2)*t*t + 2) + b;

        }

    },

    Quart: {//四次方的缓动（t^4）；

        easeIn: function(t,b,c,d){

            return c*(t/=d)*t*t*t + b;

        },

        easeOut: function(t,b,c,d){

            return -c * ((t=t/d-1)*t*t*t - 1) + b;

        },

        easeInOut: function(t,b,c,d){

            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;

            return -c/2 * ((t-=2)*t*t*t - 2) + b;

        }

    },

    Quint: {//5次方的缓动（t^5）；

        easeIn: function(t,b,c,d){

            return c*(t/=d)*t*t*t*t + b;

        },

        easeOut: function(t,b,c,d){

            return c*((t=t/d-1)*t*t*t*t + 1) + b;

        },

        easeInOut: function(t,b,c,d){

            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;

            return c/2*((t-=2)*t*t*t*t + 2) + b;

        }

    },

    Sine: {//正弦曲线的缓动（sin(t)）

        easeIn: function(t,b,c,d){

            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;

        },

        easeOut: function(t,b,c,d){

            return c * Math.sin(t/d * (Math.PI/2)) + b;

        },

        easeInOut: function(t,b,c,d){

            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;

        }

    },

    Expo: {//指数曲线的缓动（2^t）；

        easeIn: function(t,b,c,d){

            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;

        },

        easeOut: function(t,b,c,d){

            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;

        },

        easeInOut: function(t,b,c,d){

            if (t==0) return b;

            if (t==d) return b+c;

            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;

            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;

        }

    },

    Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；

        easeIn: function(t,b,c,d){

            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;

        },

        easeOut: function(t,b,c,d){

            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;

        },

        easeInOut: function(t,b,c,d){

            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;

            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;

        }

    },

    Elastic: {//指数衰减的正弦曲线缓动；

        easeIn: function(t,b,c,d,a,p){
            var s;

            if (t === 0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;

            if (!a || a < Math.abs(c)) { a=c; s=p/4; }

            else s = p/(2*Math.PI) * Math.asin (c/a);

            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;

        },

        easeOut: function(t,b,c,d,a,p){
            var s;

            if (t===0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;

            if (!a || a < Math.abs(c)) { a=c; s=p/4; }

            else s = p/(2*Math.PI) * Math.asin (c/a);

            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);

        },

        easeInOut: function(t,b,c,d,a,p){
            var s;

            if (t===0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(0.3*1.5);

            if (!a || a < Math.abs(c)) { a=c; s=p/4; }

            else s = p/(2*Math.PI) * Math.asin (c/a);

            if (t < 1) return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;

            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;

        }

    },

    Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；

        easeIn: function(t,b,c,d,s){

            if (s == undefined) s = 1.70158;

            return c*(t/=d)*t*((s+1)*t - s) + b;

        },

        easeOut: function(t,b,c,d,s){

            if (s == undefined) s = 1.70158;

            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;

        },

        easeInOut: function(t,b,c,d,s){

            if (s == undefined) s = 1.70158;

            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;

            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;

        }

    },

    Bounce: {//指数衰减的反弹缓动。

        easeIn: function(t,b,c,d){

            return c - Animation.Bounce.easeOut(d-t, 0, c, d) + b;

        },

        easeOut: function(t,b,c,d){

            if ((t/=d) < (1/2.75)) {

                return c*(7.5625*t*t) + b;

            } else if (t < (2/2.75)) {

                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;

            } else if (t < (2.5/2.75)) {

                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;

            } else {

                return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;

            }

        },

        easeInOut: function(t,b,c,d){

            if (t < d/2) return Animation.Bounce.easeIn(t*2, 0, c, d) * 0.5 + b;

            else return Animation.Bounce.easeOut(t*2-d, 0, c, d) * 0.5 + c*0.5 + b;

        }

    }

};
//动画
function myAnimate(ele,Style,nDuration,effectType,fnCallback){

    var fn;

    if(!(ele&&ele.nodeType==1)){

        alert('第一个参数'+ele+'错误！');

        throw new Error('第一个参数'+ele+'错误！');

    }

    if(typeof Style !='object'){

        alert('第二个参数'+Style+'错误！');

        throw new Error('参数'+Style+'错误！');   

    }

    var reg=/^\d+$/ ;

    if(reg.test(nDuration)){

         

    }else if(typeof nDuration =='undefined'){

        nDuration=700;

    }else{

        alert('第三个参数'+nDuration+'错误！');

        throw new Error('第三个参数'+nDuration+'错误！');

    }

    //effectType 1,2,3,4
    
    if(!effectType){

        fn=Animation.Linear;//直线，匀速的 1

    }else if(typeof effectType =='number'){

        switch(effectType){

            case 1:

                fn=Animation.Linear;//直线，匀速的 1

                break;

            case 2:

                fn=Animation.Quart.easeInOut;//直线，匀速的 1

                break;

            case 3:

                fn=Animation.Elastic.easeOut;//直线，匀速的 1

                break;

            case 4:

                fn=Animation.Bounce.easeOut;//直线，匀速的 1

                break;

            default:

                alert('目前不支持此数字类型的运动效果！');

                throw new Error('目前不支持此数字类型的运动效果！');

        }

    }else if(effectType instanceof Array){

        if(effectType[0]=='Linear'){

        fn=Animation.Linear; 

        }else{         

            fn=Animation[effectType[0]][effectType[1]];    

        }      

    }else if(typeof effectType=='function'){

        fn=Animation.Linear;     

        fnCallback=effectType;

    }

    var d=nDuration;//总的时间

    var oBegin={};

    var oChange={};

    oChange.length=0;   

     

    for(var attr in Style){
        var b,c;
        if(attr=='opacity'){
             

            if(Style.opacity>1||Style.opacity<0){

                alert('opacity的值不在范围！(0~~1)');

                throw new Error('opacity的值超过范围！(0~~1)');

            }

            ele.opacityValue = parseFloat(getStyle(ele, attr));
            if(ele.currentStyle){

                ele.opacityValue = ele.currentStyle.opacity;//IE

             }else{

                ele.opacityValue = window.getComputedStyle(ele,null).opacity;//标准浏览器

             }

             //以上是取opacityValue的值，如果没有写CSS样式的opacity的值，则取不到

            //console.log('opacityValue:'+ele.opacityValue);

            // console.log('type:'+typeof ele.opacityValue);

             if(typeof ele.opacityValue !='undefined'){//当取不到

                 ele.style.opacity=ele.opacityValue;

                 ele.style.filter='alpha(opacity='+ele.opacityValue*100+')';

             }else{

                  ele.style.opacity=1;

                 ele.style.filter='alpha(opacity=100)';

             }

             //以上这些是初始化不透明度

            b=ele.style.opacity;

            c=Style.opacity-b;

            //处理不透明度的  

        }else{


            b=parseFloat(getStyle(ele, attr));//起点  

            //需要一个总的移动距离

            c=Style[attr]-b;//总的移动距离=目的地-起始的位置

                 

        }

        if(c){//如果移动的距离不是0，则把各个方向的起始位置和移动的距离存到这两个对象上

                oChange[attr]=c;//在这个方向上移动的总距离

                oBegin[attr]=b;//在这个方向上开始的位置   

                oChange.length++;//如果这个方向上需要运动，则让length大于0;只要length大于0，则运动的一个条件成立。

            }

    }

    var t=0;
    var nInterval;
    if(document.all)

        nInterval=15;//IE里用15ms为间隔时间。nInterval可以随意设。

    else

        nInterval=13;

    _move();//执行动画

     

    function _move(){

        window.clearTimeout(ele.timer);//防止动画积累

        if(t<d&&oChange.length){//运动的条件

            t+=nInterval;

            if(t/d>=1){

                t=d;

            }

            for(var attr in oBegin){

                if(attr=='opacity'){

                    var v=fn(t,parseFloat(oBegin[attr]),parseFloat(oChange[attr]),d);

                    ele.style[attr]=v;

                    ele.style.filter='alpha(opacity='+v*100+')';

                }else{

                    ele.style[attr]=(fn(t,oBegin[attr],oChange[attr],d))+'px';

                }

            }

            ele.timer=window.setTimeout(_move,nInterval);

        }else{

            ele.timer=null;

            if(fnCallback){//如果回调方法存在，则执行      

                fnCallback.call(ele);  

            }
        }           
    }    
}
// ————————分割线————————————
// 对元素群执行 fn 方法
function init(DOMs, fn) {
    var i,len;
    for(i=0,len= DOMs.length; i< len; i++) {
        new fn(DOMs[i]);
    }
}


function Carousel(post) {
	var self = this;
	
	// 保存当前对象
	self.post = post;

	self.prev = getByClass(self.post, 'prev')[0];
	self.next = getByClass(self.post, 'next')[0];

	self.list = getByClass(self.post, 'play-list')[0];
	self.items = getByClass(self.list, 'play-item');

	self.carouselFlag = true;

	// 默认参数
	self.setting = {
		"width": 1000,
		"height": 270,
		"pictureW": 640,
		"pictureH": 270,
		"scale": 0.9,
		"speed": 500,
		"autoPlay": false,
		"delay": 5000,
		"verticalAlign": "middle"
		};

	self.init();
	
}

Carousel.prototype = {
	init: function() {
		var self = this;
		self.modifySetting();
		self.setValueBySetting();
		self.setPicturePos();

		
		self.prev.onclick = function() {

			if (self.carouselFlag){
				self.carouselFlag = false;
				self.carouselRoate('right');
			}

			if (this.preventDefault) {
				this.preventDefault();
			} else {
				this.returnValue = false;
			}
			
		};
		self.next.onclick = function() {

			if (self.carouselFlag){
				self.carouselFlag = false;
				self.carouselRoate('left');
			}

			if (this.preventDefault) {
				this.preventDefault();
			} else {
				this.returnValue = false;
			}
		};
		if(self.setting.autoPlay) {

			self.autoPlay();
		}


	},

	// 修改参数的方法
	modifySetting: function() {
		var setting = this.post.getAttribute('data-setting');
		var key;

		if (setting && setting !== '') {
			setting = JSON.parse(setting);
			for(key in setting) {
				this.setting[key] = setting[key];
			}
			
		}
		
	},

	// 设置相关对象css的方法
	setValueBySetting: function() {
		this.post.style.height = this.setting.height + 'px';
		this.post.style.width = this.setting.width + 'px';

		this.list.style.height = this.setting.height + 'px';
		this.list.style.width = this.setting.width + 'px';

		var width = (this.setting.width - this.setting.pictureW)/2;

		this.prev.style.height = this.setting.height + 'px';
		this.prev.style.width = width + 'px';
		this.prev.style.zIndex = Math.ceil(this.items.length/2);

		this.next.style.height = this.setting.height + 'px';
		this.next.style.width = width + 'px';
		this.next.style.zIndex = Math.ceil(this.items.length/2);

	},

	// 设置图片位置的方法
	setPicturePos: function() {
		var first = this.items[0];
		var sliceItems = this.items.slice(1);
		var sliceSize = sliceItems.length/2;

		var rightSize = sliceItems.slice(0,sliceSize);
		var leftSize =  sliceItems.slice(sliceSize);

		var level = Math.floor(this.items.length/2);

		var Scale = this.setting.scale,
			Width = this.setting.pictureW,
			Height = this.setting.pictureH,
			FirstLeft = (this.setting.width-Width)/2;
			Distance = FirstLeft/level;

		var that = this;

		function VerticalAlign(height) {
			var type = that.setting.verticalAlign.toUpperCase();
			var top;
			switch (type) {
				case 'BOTTOM' :
					top = Height - height ;
					break;

				case 'TOP':
					top = 0;
					break;

				default:
					top = (Height - height)/2 ;
			}
			return top;

		}

		first.style.zIndex = level;
		first.style.width = Width + 'px';
		first.style.height = Height + 'px';
		first.style.left = FirstLeft + 'px';
		first.style.filter = 'alpha(opacity:' + 100 + ')';
		first.style.opacity = 1;
		(function(){
			var i,len;

			// 设置右边位置关系
			var rw = Width,
				rh = Height;
	
			for(i=0,len=rightSize.length;i<len;i++) {
				level--;
				rw = rw * Scale;
				rh = rh * Scale;

				rightSize[i].style.zIndex = level;
				rightSize[i].style.width = rw +'px';
				rightSize[i].style.height = rh + 'px';
				rightSize[i].style.opacity = 1 * Math.pow(Scale,i+1);
				rightSize[i].style.filter = 'alpha(opacity:' + 100* Math.pow(Scale,i+1) + ')';
				rightSize[i].style.left = FirstLeft + Width + Distance*(i+1) - rw + 'px';
				rightSize[i].style.top = VerticalAlign(rh) + 'px';
			}

			// 设置左边的位置关系
			var lw = rw,
				lh = rh;

			for(i=0,len=leftSize.length; i<len; i++) {


				leftSize[i].style.zIndex = level;
				leftSize[i].style.width = lw +'px';
				leftSize[i].style.height = lh + 'px';
				leftSize[i].style.opacity = 1 * Math.pow(Scale,(len-i));
				leftSize[i].style.filter = 'alpha(opacity:' + 100* Math.pow(Scale,(len-i)) + ')';
				leftSize[i].style.left = Distance*i + 'px';
				leftSize[i].style.top = VerticalAlign(lh) + 'px';

				level++;
				lw = lw / Scale;
				lh = lh / Scale;
			}
		})();

	},

	// 帧切换的方法 
	// 核心： 遍历，交换css
	carouselRoate: function(dir) {
		var i,len;
		var that = this;

		var items = this.items;
		var prev, next;

		var Width, Height, ZIndex, Opacity, Left, Top;

		var temp = {};
		var zTemp;

		temp.width = parseInt(getStyle(items[0], 'width'));
		temp.height = parseInt(getStyle(items[0], 'height'));
		temp.opacity = getStyle(items[0], 'opacity');
		temp.left = parseInt(getStyle(items[0], 'left'));
		temp.top = parseInt(getStyle(items[0], 'top'));

		zTemp = getStyle(items[0], 'zIndex');

		if(dir === 'right') {

			for(len= items.length, i=len-1; i>-1; i--) {
				if (i) {
					prev = items[i-1];
				} else {
					prev = items[len-1];
				}

				Width = parseInt(getStyle(items[i], 'width'));
				Height = parseInt(getStyle(items[i], 'height'));
				Opacity = getStyle(items[i], 'opacity');
				ZIndex = getStyle(items[i], 'zIndex');
				Left = parseInt(getStyle(items[i], 'left'));
				Top = parseInt(getStyle(items[i], 'top'));

				myAnimate(items[i], temp, that.setting.speed, function(){that.carouselFlag = true;});
				items[i].style.zIndex = zTemp;
				

				temp.width = Width;
				temp.height = Height;
				temp.opacity = Opacity;
				zTemp = ZIndex;
				temp.left = Left;
				temp.top = Top;
			}
		} else if (dir === 'left') {

			for(i=0, len= items.length; i<len; i++) {
				if(i+1 === len) {
					next = items[0];
				} else {
					next = items[i+1];
				}

				Width = parseInt(getStyle(next, 'width'));
				Height = parseInt(getStyle(next, 'height'));
				Opacity =getStyle(next, 'opacity');
				ZIndex = getStyle(next, 'zIndex');
				Left = parseInt(getStyle(next, 'left'));
				Top = parseInt(getStyle(next, 'top'));

				
				myAnimate(next, temp, that.setting.speed, function(){that.carouselFlag = true;});
				next.style.zIndex = zTemp;
				

				temp.width = Width;
				temp.height = Height;
				temp.opacity = Opacity;
				zTemp = ZIndex;
				temp.left = Left;
				temp.top = Top;
			}
		}
	},

	autoPlay: function() {
		var that = this;
		that.timer = setInterval(that.next.onclick, that.setting.delay);
		that.post.onmouseover = function(){
			clearInterval(that.timer);
		};
		that.post.onmouseout = function() {that.autoPlay();};
	}
};


window.onload = function  () {
	init(getByClass(document, 'carousel'), Carousel);
};