$(document).ready(function() {
	var burger = $('.header-m__burger-wrapper');
	var closeMenu = $('.header-menu__close');
	var header = $('.header');
	var headerOffset = header.offset().top;
	var headerHeight = header.outerHeight();
	var scroll = $(window).scrollTop();
	var isScroll = false;
	var toggledMenu = $('.header-menu nav li span');

	toggledMenu.click(function () {
		$(this).next().slideToggle(300);
	});

	burger.click(function () {
		if (!header.hasClass('open')) {
			header.addClass('open');
			$('body').addClass('body-scroll-lock');
		}
	});

	closeMenu.click(function () {
		header.removeClass('open');
		$('body').removeClass('body-scroll-lock');
	});

	$(window).on('scroll', function () {
		if (window.matchMedia('(min-width: 1280px)').matches) {
			scroll = $(window).scrollTop();

			if (scroll >= headerOffset + headerHeight) {
				isScroll = true;

				headerHeight = isScroll ? header.outerHeight() : null;
				header.addClass('header--fixed');

				if (!header.hasClass('is-fixed')) {
					header.css({'top': -headerHeight + 'px', 'transform': 'translateY(' + headerHeight + 'px)'}).addClass('is-fixed');
					//$('body').css('padding-top', headerHeight + 'px');
				}
			} else {
				isScroll = false;
				header.removeClass('header--fixed' + ' ' + 'is-fixed').removeAttr('style');
				//$('body').css('padding-top', 0);
			}
		}
	});

	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
})