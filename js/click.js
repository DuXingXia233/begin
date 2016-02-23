function CreateSquare(obj) {
	this.obj = obj;
	this.num = 0;
	

}

CreateSquare.prototype = {

	// 检测数位
	checkNum: function (num) {
		return (num +'').length;
	},

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

	randomNum: function (min, max) {
		return	Math.floor((max-min)*Math.random()) + min;
	},

	setColor: function () {
		var color = this.randomNum(0, 0xF0F0F0).toString(16);
		while(color.length < 6) {
			color = '0'+ color;
		}

		return '#' + color;
	},

	setContent: function(target) {
		var totall = Math.pow(this.num,2);
		var Length = this.checkNum(totall);
		
		// 设置方块内容
		target.innerHTML = this.fixUpNum(Length,this.randomNum(0,totall));


		// 设置方块背景色
		target.style.backgroundColor = this.setColor();

		// 设置方块的字体
		target.style.fontSize = this.obj.offsetWidth / (this.num*4)   +'px';
	},

	init: function(num) {
		var i, j, len;
		var temp, uls, lis;

		if(typeof num !== 'number') {
			console.log(num + " 不是数字\n"	);
			return;
		}
		this.num = num;
		var totall = Math.pow(num,2);
		var Length = this.checkNum(totall);
		this.obj.innerHTML = '';
		
		temp = document.createDocumentFragment();
		for (i=0, len=num; i<len; i++){
			uls = document.createElement('ul');
			for (j=0; j<len; j++) {
				lis = document.createElement('li');

				// 保存方块当前顺序
				lis.info = i*num + j+1;

				this.setContent(lis);
				
				uls.appendChild(lis);
			}
			temp.appendChild(uls);
		}
		
		this.obj.appendChild(temp);
	}
	
};


window.onload = function() {
	
	(function(){
		var te = document.getElementById('text'),
			button = document.getElementById('btn'),
			message = document.getElementById('message'),
			square = new CreateSquare(document.getElementById('square'));

		var num;


		te.onkeydown = function(event) {
			event = event|| window.event;
			var code = event.keyCode || event.which;
			if (code == 13) {
				button.onclick();
			}
		};

		button.onclick = function () {
			var num,
				reg = /^(?!0)(\d{1,2})$/,
				arr = te.value.match(reg);

			// 输入为空则 arr 为 null
			num = arr ? parseInt(arr[0]) : null;

			// 每次点击按钮后清空 message
			message.innerHTML = '';
			message.style.display = 'none';

			if ( !num) {
				message.innerHTML = "<h3>要求不高，就两位数以内的正整数</h3>";
				message.style.display = 'block';
				te.select();

				return ;
			} else if(num > 20) {
				message.innerHTML = "<h4>温馨提示： "+ num +"超过20了</h4>";
				message.style.display = 'block';
				te.select();
				return ;
			}

			

			square.init(num);

			square.obj.onclick = function(event) {
				event = event || window.event;
				var target = event.target || event.srcElement;
				if (target.nodeName === 'LI') {
					message.innerHTML = '<p>当前小方块的是第'+target.info+'块，数值是<span>'+target.innerHTML+'</span>，背景色调是<span style =\"color:' +target.style.backgroundColor +'\">'+target.style.backgroundColor+'</span></p>';
					message.style.display = 'block';
					console.log('当前小方块的是第'+target.info+'块，数值是'+target.innerHTML+'，背景色调是'+target.style.backgroundColor + '\n');
				}
			};

		};
		
		
	})();
};