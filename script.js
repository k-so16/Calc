$(function() {
  var expr = $('input');

  $("button").click(function() {
    var ans = calc(expr.val());
    $('#ans').text((ans != null) ? ans : "Can't calclate.");
  });
});


function calc(e)
{
  var oprSt = [];  // operator stack
  var opdSt = [];  // operand stack

  var lastOp = '';
  var expr   = e;
  while(expr) {
    // get token
    var token = expr.match(/^(\d+|\s+|[+-\/\*])/)[0];
    if(token.match(/\d+/)) {
      // push operand if token is number
      opdSt.push(parseInt(token));
    } else if(token.match(/[+-\/\*]/)) {
      if(isReducible(lastOp, token)) {
	var v2 = opdSt.pop();
	var v1 = opdSt.pop();
	opdSt.push(arith(oprSt.pop(), v1, v2));
      }
      oprSt.push(token);
      lastOp = token;
    } else if(!token.match(/\s+/)) {
      return null;
    }
    // console.log(opdSt);
    // console.log(oprSt);
    expr = expr.replace(token, '');
  }

  while(oprSt.length) {
    var v2 = opdSt.pop();
    var v1 = opdSt.pop();
    opdSt.push(arith(oprSt.pop(), v1, v2));
  }

  return opdSt.pop();
}

function isReducible(leftOp, rightOp)
{
  switch(leftOp) {
    case '':
      return false;
    case '+':
    case '-':
      return !rightOp.match(/^[\/\*]$/);
    case '*':
    case '/':
      return true;
    default:
      return null;
  }
}

function arith(op, v1, v2)
{
  switch(op) {
    case '+':
      return v1 + v2;
    case '-':
      return v1 - v2;
    case '*':
      return v1 * v2;
    case '/':
      return Math.floor(v1 / v2);
  }
}
