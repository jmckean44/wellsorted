import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
register();

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../styles/swiper.css';

export const MyComponent = () => {
	const swiperElRef = useRef(null);

	useEffect(() => {
		// listen for Swiper events using addEventListener
		swiperElRef.current.addEventListener('swiperprogress', (e) => {
			const [swiper, progress] = e.detail;
			console.log(progress);
		});

		swiperElRef.current.addEventListener('swiperslidechange', (e) => {
			console.log('slide changed');
		});
	}, []);

	return (
		<swiper-container
			ref={swiperElRef}
			slides-per-view="1"
			navigation="true"
			pagination="true"
			effect={'fade'}
			speed={1000}
			slidesPerView={1}
			loop={true}
			onInit={(swiper) => {
				swiper.params.navigation.prev = swiperNavPrev.current;
				swiper.params.navigation.next = swiperNavNext.current;
				swiper.navigation.init();
				swiper.navigation.update();
			}}
		>
			<swiper-slide>Slide 1</swiper-slide>
			<swiper-slide>Slide 2</swiper-slide>
			<swiper-slide>Slide 3</swiper-slide>
		</swiper-container>
	);
};
