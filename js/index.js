// Toggle Function
$('.toggle').click(function(){
  $(".form-module").toggleClass("maxim");
  // Switches the Icon
  $(this).children('i').toggleClass('fa-pencil');
    // Switches the forms  
  $('.form').animate({
    height: "toggle",
    'padding-top': 'toggle',
    'padding-bottom': 'toggle',
    opacity: "toggle"
  }, "slow");
});