$(function() {
  var expr = $('input');

  $("button").click(function() {
    var ans = calc(expr.val());
    $('#ans').text((ans != null) ? ans : "Can't calculate.");
  });
});


function calc(e)
{
  if(parenCheck(e)) {
    return expr({expr : e.replace(/\s+/g, '')});
  }
  return null;
}


function expr(data)
{
  // term ::= term ( (+|=) term )*
  /* 
  data.E++;
  console.log("E.count: " + data.E);
   */

  var val = term(data);
  // console.log("after v1: " + data.expr);
  while(data.expr.charAt(0).match(/^[+\-]$/)) {
    var op = data.expr.charAt(0);
    data.expr = data.expr.replace(/^[+\-]/, '');
    // console.log("e: " + data.expr);

    var v = term(data);
    if(op == '+') {
      val += v;
    } else if(op == '-') {
      val -= v;
    }
  }

  return val;
}

function term(data)
{
  // term ::= term ( (+|=) term )*
  /*
  data.T++;
  console.log("T.count: " + data.T);
   */

  var val = factor(data);
  // console.log("after v1: " + data.expr);
  while(data.expr.charAt(0).match(/^[/*]$/)) {
    var op = data.expr.charAt(0);
    data.expr = data.expr.replace(/^[/*]/, '');
    // console.log("e: " + data.expr);

    var v = factor(data);
    if(op == '*') {
      val *= v;
    } else if(op == '/') {
      val /= v;
    }
  }

  return val;
}

function factor(data)
{
  // factor ::= NUMBER | (E)
  /*
  data.F++;
  console.log("F.count: " + data.F);
   */

  if(data.expr.match(/^\d+/)) {
    var num = RegExp.lastMatch;
    data.expr = data.expr.substr(num.length);

    return parseInt(num);
  }

  if(data.expr.charAt(0) == '(') {
    data.expr = data.expr.substr(1);
    console.log(data.expr);
    var result = expr(data);
    if(data.expr.charAt(0) != ')') {
      return null;
    }
    data.expr = data.expr.substr(1);
    return result;
  }

/*  if(data.expr.match(/^\(/)) {
    var res = data.expr.match(/^\((.+)\)/);
    var e = res[1];
    data.expr = data.expr.replace(/^\((.+)\)/, '');
    console.log("(E)->E: " + e);
    return expr({expr: e});
  } */
  return null;
}

function parenCheck(e)
{
  return e.match(/\(/g).length == e.match(/\)/g).length;
}
