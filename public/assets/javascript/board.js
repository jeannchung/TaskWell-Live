
$(document).ready(function () {
  $('.collapsible').collapsible();
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false
  });
});
$(document).ready(function () {
  $('.sidenav').sidenav();
});

$(document).ready(function () {
  $('.datepicker').datepicker();
});


