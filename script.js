$(function() {
  var expr = $('input');

  $("button").click(function() {
    var ans = calc(expr.val());
    $('#ans').text((ans != null) ? ans : "Can't calculate.");
  });
});


var pattern = /^(\d+|\s+|[()+\-*/])/;
function calc(e)
{
  return expr(e.replace(/\s+/g, ''));
}

function expr(e)
{
  var val = term(e);
  e = e.substr(val.toString().length);

  var head = e.charAt(0);
  while(head.match(/[+\-]/)) {
    e = e.substr(1);
    var v = term(e);
    e = e.substr(v.toString().length);

    if(head == '+') {
      val += v;
    } else if(head == '-') {
      val -= v;
    }

    head = e.charAt(0);
  }

  return val;
}

function term(e)
{
  var val = factor(e);
  e = e.substr(val.toString().length);

  var head = e.charAt(0);
  while(head.match(/[*/]/)) {
    e = e.substr(1);
    var v = factor(e);
    e = e.substr(v.toString().length);

    if(head == '*') {
      val *= v;
    } else if(head == '/') {
      val /= v;
    }

    head = e.charAt(0);
  }

  return val;
}

function factor(e)
{
  if(e.match(/^\d+/)) {
    return parseInt(RegExp.lastMatch);
  }

  return expr(e.replace(/^\(?(.+)\)?/, "$1"));
}

function number(e)
{
  return parseInt(e);
}
