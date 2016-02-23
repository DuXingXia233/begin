function getByClass  (oParent, Name) {
    var Elems = oParent.getElementsByTagName("*");
    var Result = [];
    var check;
    var temp; // 缓存所有类名
    for (var i=0; i< Elems.length; i++) {
        tem =[];
        check = false;
        temp = Elems[i].className.split(' ');

        for(var j =0; j< temp.length; j++) {
            if (temp[j] === Name) {
                check = true;
            }
        }

        if (check === true) {
            Result.push(Elems[i]);
        }
    }
    return Result;
}

function getStyle(obj, name) {
	if(obj.currentSyle) {
		return obj.currentSyle[name];
	} else {
		return getComputedStyle(obj, null)[name];
	}
}

function move(obj, Style, fn) {
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function  () {
		var stop = true;

		for(var attr in Style)	{
			var curr = 0;
			if (attr === 'opacity') {
	
				curr = Math.round(parseFloat(getStyle(obj, attr))*100);
			} else {
	
				curr = parseInt(getStyle(obj, attr));
			}
			var speed = (Style[attr] - curr)/6;
			speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
		
			if (Style[attr] != curr) {
				stop = false;
			}

			if (attr === 'opacity'){
				obj.alpha += speed;
				obj.style.filter = 'aplha(opacity:'+ (curr+speed) + ')';
				obj.style.opacity = (curr + speed)/100;
			} else {
				obj.style[attr] = curr + speed + "px";
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
