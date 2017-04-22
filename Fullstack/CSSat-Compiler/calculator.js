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


Calculator.prototype.peek = function() {
	return this.tokenStream.slice(0, 1);
};

Calculator.prototype.get = function() {
	return this.tokenStream.shift();
}

Calculator.prototype.parseExpression = function() {
	var term = this.parseTerm();
	var a = this.parseA();

	return new TreeNode('Expression', term, a);

}

Calculator.prototype.parseTerm = function() {
	var factor = this.parseFactor();
	var b = this.parseB();

	return new TreeNode('Term', factor, b);
	
}

Calculator.prototype.parseA = function() {
	var firstOperator = this.peek();
	firstOperator = firstOperator[0];
	if (firstOperator && firstOperator.value == '+') {
		this.get();
		return new TreeNode('A', '+', this.parseTerm(), this.parseA());

	}
	if (firstOperator && firstOperator.value == '-') {
		this.get();
		return new TreeNode('A', '-', this.parseTerm(), this.parseA());

	}
	// epsilon
	else {
		return new TreeNode('A');
	}
}

Calculator.prototype.parseFactor = function() {
	var firstOperator = this.peek();
	firstOperator = firstOperator[0];
	if (firstOperator && firstOperator.value == '(') {
		this.get();	 // left paren
		var exp = this.parseExpression();
		this.get(); // right paren
		return new TreeNode("Factor", "(", exp, ")");

	}
	else if (firstOperator && firstOperator.value == '-') {
		this.get();
		var factor = this.parseFactor();
		return new TreeNode("Factor", "-", factor);

	}
	else if (firstOperator && firstOperator.name == 'NUMBER') {
		this.get();
		return new TreeNode("Factor", firstOperator.value);
	}

}

Calculator.prototype.parseB = function() {
	var firstOperator = this.peek();
	firstOperator = firstOperator[0];
	if (firstOperator && firstOperator.value == '*') {
		this.get();
		return new TreeNode('B', '*', this.parseFactor(), this.parseB());

	}
	if (firstOperator && firstOperator.value == '/') {
		this.get();
		return new TreeNode('B', '/', this.parseFactor(), this.parseB());

	}
	// epsilon
	else {
		return new TreeNode('B');
	}
}



var c = new Calculator("1+2");
c.lexer();
c.parseExpression();
// var calculator = new Calculator("(3)");
// var fakeExpressionTreeNode = new TreeNode("Expression", "3");
// calculator.parseExpression = function() {
//   this.get(); // remove the 3 when parseFactor runs
//   return fakeExpressionTreeNode;
// }    

// var output = calculator.parseFactor();
// console.log(output.name);
// console.log(output.children);


function TreeNode(name, ...children) {
	this.name = name;
	this.children = children
	console.log(this.name, this.children);
}


















