$(document).ready(function() {
	$('.datepicker-from').datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'dd.mm.yy',
		yearRange: '2000:2040',
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		beforeShow: function(input, inst) {
			inst.dpDiv.css({
				transform: 'translateX(0)'
			});
		}
	}).inputmask({
		alias: 'datetime',
		inputFormat: 'dd.mm.yyyy',
		prefillYear: false,
		placeholder: '_',
		min: '01.01.2000',
		max: '12.31.2040',
		oncomplete: function() {
			var arr = $(this).val().split('/'),
				date = new Date(arr[2] + '-' + arr[1] + '-' + arr[0] + ' ' + '00:00:00');

			$(this).datepicker( "setDate",  date);
		}
	});

	$('.datepicker-to').datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'dd.mm.yy',
		yearRange: '2000:2040',
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		beforeShow: function(input, inst) {
			inst.dpDiv.css({
				transform: 'translateX(-10px)'
			});
		}
	}).inputmask({
		alias: 'datetime',
		inputFormat: 'dd.mm.yyyy',
		prefillYear: false,
		placeholder: '_',
		min: '01.01.2000',
		max: '12.31.2040',
		oncomplete: function() {
			var arr = $(this).val().split('/'),
				date = new Date(arr[2] + '-' + arr[1] + '-' + arr[0] + ' ' + '00:00:00');

			$(this).datepicker( "setDate",  date);
		}
	});

	$(document).on('mouseup', function(e) {
		const langSwitcher = $('.lang-switcher');

		if (!langSwitcher.is(e.target) && langSwitcher.has(e.target).length === 0) {
			langSwitcher.removeClass('open');
		}
	});

	const langSwitcher = $('.lang-switcher');
	const langSwitcherLinks = $('.lang-switcher a');

	langSwitcher.on('click', function () {
		$(this).addClass('open');
	});

	langSwitcherLinks.on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		langSwitcherLinks.removeAttr('style');

		if (!$(this).closest('.lang-switcher').hasClass('lang-switcher--reverse')) {
			$(this).css('order', '-1');
		} else {
			$(this).css('order', '1');
		}
		$(this).closest('.lang-switcher').removeClass('open');
	});

	$('.key-words select').select2({
		dropdownParent: $('.key-words')
	});

	if (window.matchMedia('(max-width: 639px)').matches) {
		$('.events-single .events-single__caption .caption__type').on('click', function () {
			const content = $(this).next();

			if (!$(this).hasClass('open')) {
				content.slideDown(300);
				$(this).addClass('open');
			} else {
				content.slideUp(300);
				$(this).removeClass('open');
			}
		});
	}

	/* Add clear button on opening dropdown */
	$('.key-words select').on('select2:open', function () {
		setTimeout(() => {
			$('.key-words .select2-results').append('<li class="select2-results__option select2-results__option--another select2-results__option--selectable">ANOTHER TAG<div class="key-words__close"><svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">' +
				'<path d="M1 1L6 6"/>' +
				'<path d="M1 6L6 1"/>' +
				'</svg></div></li>');
		}, 0);
	});

	/* Remove clear button on closing dropdown */
	$('.key-words select').on('select2:closing', function () {
		$('.key-words .select2-results .select2-results__option--another ').remove();
	});

	/* Partners marquee */
	const marqueePartners = new Swiper('.js-marquee-partners', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		loop: true,
		freeMode: true,
		autoplay: {
			delay: 1,
			disableOnInteraction: false,
			//pauseOnMouseEnter: true
		},
		speed: 6000
	});

	/* Content toggle button */
	$('.js-content-toggle').on('click', function () {
		const content = $(this).parent().next();

		if (content.is(':hidden')) {
			content.slideDown(300);
			$(this).text('CLOSE');
		} else {
			content.slideUp(300);
			$(this).text('OPEN');
		}
	});

	/* Attachments toggle button */
	$('.js-attachments-toggle').on('click', function () {
		const content = $(this).prev().find('ul');

		if (content.is(':hidden')) {
			content.slideDown(300);
			$(this).addClass('open');
			$(this).find('span').text('Show less');
		} else {
			content.slideUp(300);
			$(this).removeClass('open');
			$(this).find('span').text('Show more');
		}
	});

	/* Partners switcher */
	$('.filter-switcher__btn').click(function () {
		$(this).toggleClass('active');
	});
})