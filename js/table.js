function Table(element, add, check, setL) {
	var elm = document.getElementById(element);
	var form = document.getElementById(add);
	var sc = document.getElementById(check);
	var cl = document.getElementById(setL);

	var lenEvent = elm.tBodies[0].rows.length;

	var inputs = form.children || form.childNodes;
	var checks = search.children || form.childNodes;
	var cls = cl.children || cl.childNodes;

	var inputL = inputs.length;


	var confirmEvent = [];
	var oldClass = "";

	// 删除本行
	function del(num) {
		var As = elm.getElementsByTagName("a");			
			EventUtil.addHandler(As[num], "click", function() {
				var parent= this.parentNode.parentNode;
				elm.tBodies[0].removeChild(parent);
				confirmEvent.pop();
			});
	}

	// 鼠标经过改变样式
	function over(obj) {
		EventUtil.addHandler(obj, "mouseover", function() {	
			oldClass = this.className;
			this.className += " over";
		});
		EventUtil.addHandler(obj, "mouseout", function() {
			this.className = oldClass;
		});
	}

	// 高亮相关内容
	function see() {

		var arr = [];
		var rows = elm.tBodies[0].rows;
		var len = rows.length;
		arr = checks[1].value.toUpperCase().split(' ');
		var str;

		for (var i=0; i<len; i++) {
			str = rows[i].cells[2].innerHTML.toUpperCase();
			rows[i].removeAttribute('style');
			for (var j=0; j<arr.length; j++) {
				if ( str.search(arr[j]) !== -1 && arr[j] !=='') {
					rows[i].style.background='yellow';
					rows[i].style.color='green';
				}
			}
		}

	}
	// 降序排序
	function order() {

		var rows = elm.tBodies[0].rows;
		var len = rows.length;
		var arr = [];
		for (var j=0; j<len; j++) {
			arr[j] = rows[j];
		}

		arr.sort(function(a1, a2) {
			var n1 = a1.cells[0].innerHTML - 0;
			var n2 = a2.cells[0].innerHTML - 0;
			return n2-n1;
		});

		for (j=0; j<len; j++) {
			elm.tBodies[0].appendChild(arr[j]);
		}
	}
	// 添加表格内容
	function addTr() {	
				
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		td.innerHTML=lenEvent+1;

		tr.appendChild(td);
		for(var j=0; j<inputL-1; j++) {
			if( (j%2) ) {
			 	td = document.createElement("td");
				td.innerHTML=inputs[j].value;
				tr.appendChild(td);
			}
		}
		td = document.createElement("td");
		td.innerHTML='<a href="#">删除</a>';
		tr.appendChild(td);
		elm.tBodies[0].appendChild(tr);
		lenEvent++;
		Default();
	}
	// 表格初始化
	function Default() {
		var rows = elm.tBodies[0].rows;
		var len = rows.length;

		for (var i=0; i<len; i++) {

			if( i%2 ) {
				rows[i].className="even";

			} else {
				rows[i].className="odd";
			}
			//阻止事件重复添加
			if (!confirmEvent[i]) {
				
				over(rows[i]);
				del(i);
				confirmEvent.push(true);
			} 
		}
	}

	Default();

	EventUtil.addHandler(inputs[inputL-1], "click", addTr);

	EventUtil.addHandler(checks[2], 'click', see);

	EventUtil.addHandler(cls[1], 'click', order);
	
	
		



}