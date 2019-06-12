/*A jQuery function to display pictures on hover*/
$(function() {
    $('.copy').hover(
      function() {
        $('#copy').fadeIn();
      },
      function() {
        $('#copy').fadeOut();
      }
    );
});
