import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
Swiper.use([Autoplay]);

document.addEventListener('DOMContentLoaded', () => {
		const swiper = new Swiper('.swiper', {
		modules: [Pagination, Autoplay],
		spaceBetween: 25,
		speed: 1000,
		 autoHeight: true,
		watchSlidesProgress: true,
		watchSlidesVisibility: true,
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		freeMode: true,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		autoplay: {
			delay: 6000,
			disableOnInteraction: true,
		},
		breakpoints: {
			1500: {
				slidesPerView: 2,
			},
			800: {
				slidesPerView: 2,
			},
			500: {
				slidesPerView: 1,
			},
		},
	});
	document.querySelector('.swiper').swiper = swiper;
});
