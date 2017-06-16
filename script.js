$(function() {
  var expr = $('input');

  $("button").click(function() {
    $('#ans').text(eval(expr.val()));
  });
});
