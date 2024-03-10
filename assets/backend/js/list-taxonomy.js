(function ($) {

    $(function () {
      $submit = $('#submit');
      $tagName = $('#tag-name');
      $tagDesc = $('#tag-description');
      $tagSlug = $('#tag-slug');
      $theList = $('#the-list');
	$("#ajax-response").before('<div>(Only one list available in the Free version)<div>');
	function toggleAddForm(action = 'hide') {
		if ( action !== 'hide' ) {
			  setTimeout(function(){$('#col-left').css('width', '35%').fadeIn()}, 300);
			  $('#col-right').css('width', '65%');
              $submit.attr('disabled', false);
              $tagName.attr('disabled', false);
              $tagSlug.attr('disabled', false);
              $tagDesc.attr('disabled', false);
			  return;
		}
			$('#col-right').css({'transition':'width 0.3s ease', 'width': '100%'});
			$('#col-left').css({'transition':'width 0.5s ease', 'width': '0'}).hide();
          $submit.attr('disabled', true);
          $tagName.attr('disabled', true);
          $tagSlug.attr('disabled', true);
          $tagDesc.attr('disabled', true);
	}
        $(document).ajaxSuccess(function(e, request, settings){
            var result = {};
            settings.data.split('&').forEach(function(x){
                var arr = x.split('=');
                arr[1] && (result[arr[0]] = arr[1]);
            });

            if (result.action == 'delete-tag') {
				toggleAddForm('show');
            }
            if (result.action == 'add-tag' && count == 1) {
				toggleAddForm('hide');
			}
        });
        var count = $theList.children().length;
        if (count == 1 && $theList.not(':has(.no-items)').length == 1) {
			toggleAddForm('hide');
        }
    });
})(jQuery);
