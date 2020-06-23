function validateEmail(providedEmail) {
  var regexEmailCheck = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (regexEmailCheck.test(providedEmail)) {
    return true;
  }
  else {
    return false;
  }
}

function validateComment(providedComment){
  var comment = $("#commentFormInput").val();
  if(comment.length <= 255 && comment.length >= 10 ){
    return true;
  }
  else {
    return false;
  }
}


$('#emailFormInput').on('keydown keyup', function(e){
  var providedEmail = $("#emailFormInput").val();
  if ($.trim(providedEmail)==0) {
    $('.btn').attr('disabled', true);
    console.log('it checks if no input');
  }
  if (validateEmail(providedEmail)) {
    $('.btn').removeAttr('disabled');
  }

});

$('#commentFormInput').on('keydown keyup', function(e){
  var providedComment = $('#commentFormInput').val();
  if ($.trim(providedComment==0)) {
    $('.btn').attr('disabled',true);
    console.log("it removed the attribute in email");
  }
  if (validateComment(providedComment)){
    $('.btn').removeAttr('disabled');
    console.log("it removed the attribute in comment");
  }

});

$(function(){
    $('.contactForm').submit(function(event){
        event.preventDefault();
        $.ajax({
          url: '/',
          type: 'post',
          data: $('.contactForm').serialize(),
          success: function(){
            console.log('worked');
            $('.btn').attr('disabled', true);
            $('#emailFormInput').val('');
            $('#commentFormInput').val('');
          }
        });
    });
  });
