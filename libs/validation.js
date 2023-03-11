function initValidation(re) {
	$('#validate').bind('click', function() {
		var url = $('#iri').val();
		var cls = RegExp("^" + re + "$", "i").test(url) ? 'valid' : 'invalid';
		$('#results').prepend('<div class="'+ cls + '">' + url + '</div>');
	});	
	$('#iri').bind('keypress', function(e) {
		if (e.keyCode == 13) {
			$('#validate').click();
		}
	});
}