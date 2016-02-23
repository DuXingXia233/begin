function fixedPoint(fx, first) {
	var toLerance = 0.00001;

	function closeEnough(x, y) {
		return less( abs( sub(x, y)), toLerance);
	}
	function Try(guess) {
		var next = fx( guess );
		console.log(next + "\t" + guess + "\n");
		if( closeEnough( next, guess )  ) {
			return next;
		} else {
			return Try(next);
		}
	}

	return Try(first);
}

function sqrt(x) {
	return fixedPoint(
		function (y) {
			return function (a, b) {
				return div( add(a, b), 2);
			} (y, div(x, y) );
		};
	, 1.0);
}