$(document).ready(function() {
	const selects = $('.pdf__select-wrapper');
	const closeBtn = $('.pdf__close');

	selects.on('click', function () {
		$(this).addClass('open');
		$(this).siblings('.pdf__quantity').hide();
		$(this).siblings('.pdf__close').css('display', 'flex');

		$(this).closest('.card').children('.link-inset').hide();
	});

	closeBtn.on('click', function () {
		$(this).siblings('.pdf__select-wrapper').removeClass('open');
		$(this).siblings('.pdf__quantity').css('display', 'flex');
		$(this).hide();
		$(this).siblings('.pdf__select-wrapper').find('.pdf__select-scroll').animate({
			scrollTop: 0
		}, 0);

		$(this).closest('.card').children('.link-inset').show();
	});

	$(document).on('mouseup', function(e) {
		const target = $('.pdf__select-wrapper.open');

		if (target && !target.is(e.target) && target.has(e.target).length === 0) {
			target.removeClass('open');
			target.siblings('.pdf__quantity').css('display', 'flex');
			target.siblings('.pdf__close').hide();

			target.closest('.card').children('.link-inset').show();
		}
	});
})