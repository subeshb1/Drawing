let checker = new DFAChecker(a);
$(document).ready(function() {

  $('#check').on('click',function() {
    checker.resetColor();
    checker.check($('#dfaInput').val());
    $('#modal-2').modal('hide');
  });


});
