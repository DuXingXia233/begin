// 事件的添加（兼容）
var EventUtil = {

    addHandler: function(element, type, handler)    {
        if (element.addEventListener)   {

            element.addEventListener(type, handler, false);

        } else if (element.attachEvent) {

            element.attachEvent("on" + type, handler);

        } else {

            element["on" + type] = handler;
        }
    },

    getEvent: function(event)   {

        return event ? event : window.event;
    },
    //获取事件触发对象
    getTarget: function(event)  {

        return event.target || event.srcElement;
    },
    // 阻止浏览器默认动作
    preventDefault: function(event) {

        if (event.preventDefault)   {

            event.preventDefault();

        } else {

            event.returnValue = false;
        }
    },

    removeHandler: function(element, type, handler) {

        if (element.removeEventListener)    {

            element.removeEventListener(type, handler, false);

        } else if (element.detachEvent)     {

            element.detachEvent("on" + type, handler);
        
        } else {
        
            element["on" + type] = null;
        
        }
    },
    // 阻止事件传递
    stopPropagation: function(event)    {

        if (event.stopPropagation)  {

            event.stopPropagation();
        
        } else {
        
            event.cancelBubble = true;
        }
    }
};

//—————————————————分割线———————————————————
// 检测target是否在parent的DOM树内
function contain(parent, target) {
    if(parent.contains) {
        return parent.contains(target);

    } else if (parent.compareDocumentPosition) {

        return !!parent.compareDocumentPosition(target) & 16;
    }
} 

// 检测DOM 元素的class包含Name与否
function hasClass(target, Name) {
    
    
    var pattern = new RegExp("\\s\*"+Name+"\\s\*"); 
    
    return pattern.test(target.className);
       
    
}

// 移除DOM元素的class
function removeClass(target, name) {
    
    var pattern = new RegExp("\\s\*"+name+"\\s\*");

    hasClass(target, name) ? (target.className = target.className.replace(pattern, '')) : true;
}

// 向DOM元素添加class
function addClass(target, name) {

    (!hasClass(target, name)) ? (target.className += " "+name) : true;
}
// switch DOM's class
function toggleClass(target, name) {

    hasClass(target, name) ? removeClass(target, name) : addClass(target, name);

}
// 获得 DOM元素oparent下 所有className 包含 name 的DOM元素
function getByClass(oParent, name) {
    var Elems = oParent.getElementsByTagName("*");
    var Result = [];

    
    for (var i=0; i< Elems.length; i++) {
       
        if (hasClass(Elems[i], name) === true) {
            Result.push(Elems[i]);
        }
    }
    return Result;
}

// 获得元素的当前样式
function getStyle(obj, name) {

    // IE
    if (obj.currentStyle) {
        return obj.currentStyle[name];

    } else if(window.getComputedStyle){

        
        return getComputedStyle(obj, null)[name];

    }
    console.log("无法获取 "+obj+" 的样式");
}

var math = {

    // 填充数位
    fixUpNum: function (targetNum, orginalNum) {
        var i, len;

        var Zero =[],
            temp = orginalNum +'';


        for (i=0, len=targetNum; i<len; i++) {
            Zero.push(0);
        }

        return Zero.slice(0,Zero.length-temp.length).join('')+temp;

    },
    // 产生一个 min~max 之间随机数
    randomNum: function (min, max) {
        return  Math.floor((max-min)*Math.random()) + min;
    },

};
//——————————————分割线————————————————
//
// DOM元素 stlye （长宽， 上下左右位置，透明度等数值）变化以及链式运动
function move(obj, Style, fn) {
    
    clearInterval(obj.timer);
    obj.timer = setInterval(function  () {
        var stop = true;

        for(var attr in Style)  {
            var curr = 0;
            if (attr === 'opacity') {
    
                curr = Math.round(parseFloat(getStyle(obj, attr))*100);
            } else {
    
                curr = parseInt(getStyle(obj, attr));
            }
            var speed = (Style[attr] - curr)/5;
            speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
        
            if (Style[attr] != curr) {
                stop = false;
            }

            if (attr === 'opacity'){
                obj.alpha += speed;
                obj.style.filter = 'aplha(opacity:'+ (curr+speed) + ')';
                obj.style.opacity = (curr + speed)/100;
            } else if (attr === 'zIndex'){
                obj.style[attr] = curr + speed;
            } else{
                obj.style[attr] = curr + speed + "px";
                console.log('a');
            }
            
        }

        if(stop) {
            clearInterval(obj.timer);
            if(fn) {
                fn();
            }
        }

    }, 30);
}

// 同上 匀速

// —————————————————分割线———————————————————

//  JQ animate方法 模拟
var zhufengEffect = {

    //t:时间间隔, c:变化量, d:持续时间, b:初始值

    zfLinear: function(t,b,c,d){ return c*t/d + b; },

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

    zfBounce: {//指数衰减的反弹缓动。

        easeIn: function(t,b,c,d){

            return c - zhufengEffect.zfBounce.easeOut(d-t, 0, c, d) + b;

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

            if (t < d/2) return zhufengEffect.zfBounce.easeIn(t*2, 0, c, d) * 0.5 + b;

            else return zhufengEffect.zfBounce.easeOut(t*2-d, 0, c, d) * 0.5 + c*0.5 + b;

        }

    }

};

////////////////////以上都是算法


   
function animate(ele, obj, nDuration, effectType, fnCallback){

    var fn;

    if(!(ele&&ele.nodeType==1)){

        alert('第一个参数ele错误！');

        throw new Error('第一个参数ele错误！');

    }

    if(typeof obj !='object'){

        alert('第二个参数obj错误！');

        throw new Error('参数obj错误！');   

    }

    var reg=/^\d+$/ ;

    if(reg.test(nDuration)){

         

    }else if(typeof nDuration =='undefined'){

        nDuration=700;

    }else{

        alert('第三个参数nDuration错误！');

        throw new Error('第三个参数nDuration错误！');

    }

    //effectType 1,2,3,4
    
    if(!effectType){

        fn=zhufengEffect.zfLinear;//直线，匀速的 1

    }else if(typeof effectType =='number'){

        switch(effectType){

            case 1:

                fn=zhufengEffect.zfLinear;//直线，匀速的 1

                break;

            case 2:

                fn=zhufengEffect.Quart.easeInOut;//直线，匀速的 1

                break;

            case 3:

                fn=zhufengEffect.Elastic.easeOut;//直线，匀速的 1

                break;

            case 4:

                fn=zhufengEffect.zfBounce.easeOut;//直线，匀速的 1

                break;

            default:

                alert('目前不支持此数字类型的运动效果！');

                throw new Error('目前不支持此数字类型的运动效果！');

        }

    }else if(effectType instanceof Array){

        if(effectType[0]=='zfLinear'){

        fn=zhufengEffect.zfLinear; 

        }else{         

            fn=zhufengEffect[effectType[0]][effectType[1]];    

        }      

    }else if(typeof effectType=='function'){

        fn=zhufengEffect.zfLinear;     

        fnCallback=effectType;

    }

    var d=nDuration;//总的时间

    var oBegin={};

    var oChange={};

    oChange.length=0;   

     

    for(var attr in obj){
        var b,c;
        if(attr=='opacity'){
            var opacityValue;
            // functio  1、ele.style.opacity;//0--1

            //         ele.style.filter='alpha(opacity=50)'//1-100

            //     2、不存在offsetOpacity

            //         ele.currentStyle.opacity

            //         computedStyle(ele,null).opacity

            //         var opcityValue=ele.cureentStyle?ele.currentStyle.opacity:getComputedStyle(ele,null).opacity

            //         可以获取到写在css里的opacity的值，

            //     3、根本就没有写css中的opacity的值

            //         if(typeof opacityValue!='number'){

            //          ele.style.opacity=1;

            //          ele.style.filter='alpha(opacity=100)'

            //         }else{

            //              ele.style.opacity=opacityValue;

            //              ele.style.filter='alpha(opacity='+opacityValue*100+')'

            //         }     

            //     */ 

            if(obj.opacity>1||obj.opacity<0){

                alert('opacity的值超过范围！');

                throw new Error('opacity的值超过范围！');

            }

            if(ele.currentStyle){

                opacityValue = ele.currentStyle.opacity;//IE

             }else{

                opacityValue = window.getComputedStyle(ele,null).opacity;//标准浏览器

             }

             //以上是取opacityValue的值，如果没有写CSS样式的opacity的值，则取不到

            //console.log('opacityValue:'+opacityValue);

            // console.log('type:'+typeof opacityValue);

             if(typeof opacityValue !='undefined'){//当取不到

                 ele.style.opacity=opacityValue;

                 ele.style.filter='alpha(opacity='+opacityValue*100+')';

             }else{

                  ele.style.opacity=1;

                 ele.style.filter='alpha(opacity=100)';

             }

             //以上这些是初始化不透明度

            b=ele.style.opacity;

            c=obj.opacity-b;

            //处理不透明度的  

        }else{

            var direction=toOffset(attr);

            b=ele[direction];//起点  

            //需要一个总的移动距离

            c=obj[attr]-b;//总的移动距离=目的地-起始的位置

                 

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
