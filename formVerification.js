//FUNCTION THAT USES REGEX TO CHECK IF EMAIL IS PROVIDED AND FORMATTED CORRECTLY

function validateEmail(providedEmail) {
  var regexEmailCheck = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (regexEmailCheck.test(providedEmail)) {
    return true;
  }
  else {
    return false;
  }
}
console.log($(".jumbotron").outerHeight(true));
console.log($(".jumbotron").outerWidth(true));



$('#emailFormInput').on('keydown keyup', function(e){
  var providedEmail = $("#emailFormInput").val();

  if ($.trim(providedEmail)==0) {
    $('.btn').attr('disabled', true);
    console.log('it checks if no input');
  }
  if (validateEmail(providedEmail)) {
    $('.btn').removeAttr('disabled');
  }
  else {
    console.log('it checks for alternate input');
    $('.btn').attr('disabled',true);
  }
});

/*$('#commentFormInput').on('keydown keyup', function(e){
  var providedComment = $('#commentFormInput').val();
  if ($.trim(providedEmail==0)) {
    $('.btn').attr('disabled',true);
  }

});*/
