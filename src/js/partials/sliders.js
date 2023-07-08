$(document).ready(function() {
	let newsSlider = undefined;
	const newsSliderEl = $('.js-slider-news');
	const breakpoint = window.matchMedia( '(min-width: 1280px)' );

	const initSliders = () => {
		if (newsSliderEl.length > 0) {
			if (breakpoint.matches === true) {
				return enableSliders();
			} else if (breakpoint.matches === false) {
				destroySliders(newsSlider);
				return;
			}
		}
	}

	const enableSliders = () => {
		if (newsSlider == undefined || newsSlider.el == undefined) {
			newsSlider = new Swiper('.js-slider-news', {
				slidesPerView: 3.35,
				spaceBetween: 35,
				touchStartPreventDefault: false
			});
		}
	}

	const destroySliders = (sliderName) => {
		if (sliderName !== undefined) {
			if (sliderName.el !== undefined) {
				sliderName.el.querySelector('.swiper-wrapper').removeAttribute('style');
				sliderName.el.querySelector('.swiper-slide').removeAttribute('style');
			}

			sliderName.destroy();
			sliderName = undefined;
		}
	}

	initSliders();

	window.addEventListener('resize', function () {
		initSliders();
	});

	const eventsSlider = new Swiper('.js-slider-events', {
		slidesPerView: 'auto',
		spaceBetween: 35
	});

	const eventsSlider2 = new Swiper('.js-slider-events-2', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		navigation: false,
		breakpoints: {
			640: {
				navigation: {
					nextEl: '.events-page__slider-next',
					prevEl: '.events-page__slider-prev',
				}
			},
			1280: {
				spaceBetween: 35
			}
		}
	});

	const photoSlider = new Swiper('.js-slider-photo', {
		slidesPerView: 1.27,
		spaceBetween: 10,
		breakpoints: {
			640: {
				slidesPerView: 1.5
			},
			1280: {
				slidesPerView: 2.2,
				spaceBetween: 20
			}
		}
	});

	Fancybox.bind('[data-fancybox="gallery"]', {
		Toolbar: {
			items: {
				close: {
					type: "button",
					label: "CLOSE",
					class: "fancybox__button--close",
					html: '<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
						'<rect width="31.5254" height="1.00115" transform="matrix(0.7071 0.707113 -0.7071 0.707113 0.708008 0)" fill="#F7F8FC"/>\n' +
						'<rect width="31.5254" height="1.00115" transform="matrix(0.7071 0.707113 -0.7071 0.707113 0.708008 0)" fill="#F7F8FC"/>\n' +
						'<rect width="31.5254" height="1.00115" transform="matrix(-0.7071 0.707113 -0.7071 -0.707113 23 0.707764)" fill="#F7F8FC"/>\n' +
						'<rect width="31.5254" height="1.00115" transform="matrix(-0.7071 0.707113 -0.7071 -0.707113 23 0.707764)" fill="#F7F8FC"/>\n' +
						'</svg>\n',
					tabindex: 1,
					click: function (event) {
						event.stopPropagation();
						event.preventDefault();

						this.fancybox.close();
					},
				},
				prev: {
					type: "button",
					class: "fancybox__button--prev",
					label: "PREV",
					html: '<svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
						'<path d="M8 18L1 9.5L8 1" stroke="#F7F8FC"/>\n' +
						'</svg>\n',
					click: function (event) {
						event.preventDefault();

						this.fancybox.prev();
					},
				},
				next: {
					type: "button",
					class: "fancybox__button--next",
					label: "NEXT",
					html: '<svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
						'<path d="M1 1L8 9.5L1 18" stroke="#F7F8FC"/>\n' +
						'</svg>\n',
					click: function (event) {
						event.preventDefault();

						this.fancybox.next();
					},
				}
			}
		},
		Image: {
			Panzoom: {
				zoom: false,
				maxScale: 1,
				touch: false
			},
		}
	});

	const historySlider = new Swiper('.js-slider-history', {
		slidesPerView: 1.27,
		spaceBetween: 0,
		freeMode: true,
		breakpoints: {
			640: {
				slidesPerView: 1.5
			},
			1280: {
				slidesPerView: 3.74
			}
		}
	});
})