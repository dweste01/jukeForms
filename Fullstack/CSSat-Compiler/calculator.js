function Calculator(inputString) {

	this.tokenStream = [],

	this.lexer = function() {

		  var tokenTypes = [['+', 'ADD'],
							  ['-', 'SUB'],
							  ['*', 'MUL'],
							  ['/', 'DIV'],
							  ['(', 'LPAREN'],
							  [')', 'RPAREN']];

		  //1+(2*3)+4
		  for (var i = 0; i < inputString.length; i++) {
		  	var term = inputString[i];
		  	var number = true;
		  	tokenTypes.forEach(token => {
		  		if (token[0]=== inputString[i]) {
		  			number = false;
		  			this.tokenStream.push({name: token[1], value: token[0]});
		  		}
		  	});
		  	if (number) {
		  		this.tokenStream.push({name: "NUMBER", value: inputString[i]});
		  	}

		  }

	}	
}




var c = new Calculator("1+2+3/4*5");
c.lexer();
console.log(c.tokenStream);