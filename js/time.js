	function getT(n) {

		if (n < 10) {
			return "0" + n;
		} else {
			return  n + "";
		}
	}

function displayT(tab) {

		var Now = new Date();
		var str = getT(Now.getHours()) + getT(Now.getMinutes()) + getT(Now.getSeconds());
		var id = document.getElementById(tab);
		var spans = document.createDocumentFragment();
		var tem;
		var i = 0;
		for ( ; i<3; i++) {
		  tem = document.createElement("span");
		  tem.appendChild(document.createTextNode(str[2*i]+str[2*i+1]));
		  spans.appendChild(tem);
		  if (i<2) {
		      spans.appendChild(document.createTextNode(" : "));
		  }
		}
		id.innerHTML = "";
		id.appendChild(spans);

	}
