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
		return new TreeNode('A', '+', parseTerm(), parseA());

	}
	if (firstOperator && firstOperator.value == '-') {
		this.get();
		return new TreeNode('A', '-', parseTerm(), parseA());

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
		var exp = parseExpression();
		this.get(); // right paren
		return new TreeNode("Factor", "(", exp, ")");

	}
	if (firstOperator && firstOperator.value == '-') {
		this.get();
		var factor = parseFactor();
		return new TreeNode("Factor", "-", factor);

	}
	if (firstOperator && firstOperator.name == 'NUMBER') {
		console.log("NUMBER!!!!!!")
		return new TreeNode('Factor', this.get());
	}

}

Calculator.prototype.parseB = function() {
	var firstOperator = this.peek();
	firstOperator = firstOperator[0];
	if (firstOperator && firstOperator.value == '*') {
		this.get();
		return new TreeNode('B', '*', parseFactor(), parseB());

	}
	if (firstOperator && firstOperator.value == '/') {
		this.get();
		return new TreeNode('B', '/', parseFactor(), parseB());

	}
	// epsilon
	else {
		return new TreeNode('B');
	}
}


function TreeNode(name, ...children) {
	this.name = name;
	this.children = children
	console.log(this.name, this.children);
}

TreeNode.prototype.accept = function(visitor) {
  return visitor.visit(this);
}

function PrintOriginalVisitor() {
	this.visit = function(node) {
		console.log(node.name);
	}
}

var c = new Calculator("(3+2)/8+1");
// c.lexer();
var tree = c.parseExpression();
var print = new PrintOriginalVisitor();
tree.accept(print);




















