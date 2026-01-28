// HEADROOM
import Headroom from 'headroom.js';

document.addEventListener('astro:page-load', () => {
	// Main header
	const header = document.querySelector('#header');
	if (header) {
		// Set dynamic header height for CSS custom property
		const updateHeaderHeight = () => {
			const height = header.offsetHeight;
			document.documentElement.style.setProperty('--header-height', `${height}px`);
		};

		// Set initial height and update on resize
		updateHeaderHeight();
		window.addEventListener('resize', updateHeaderHeight);

		// Destroy existing instance if it exists
		if (header._headroom) {
			header._headroom.destroy();
		}

		if (window.location.hash) {
			header.classList.add('headroom--unpinned');
		}

		const headroomDesktop = new Headroom(header, {
			tolerance: {
				down: 20,
				up: 20,
			},
			offset: 300,
		});
		headroomDesktop.init();

		// Store instance for cleanup
		header._headroom = headroomDesktop;
	}

	// HEADROOM.JS MOBILE SLIDE UP ON SCROLL
	const logoMobile = document.querySelector('.moveUp');
	if (logoMobile) {
		if (window.location.hash) {
			logoMobile.classList.add('headroom--unpinned');
		}
		const headroomMobile = new Headroom(logoMobile, {
			tolerance: {
				down: 20,
				up: 20,
			},
			offset: 100,
		});
		headroomMobile.init();
	}

	// HEADROOM.JS IMG SLIDE UP ON SCROLL
	// Get element's distance from the top of the page
	const getElemDistance = (elem) => {
		let location = 0;
		if (elem.offsetParent) {
			let currentElem = elem;
			do {
				location += currentElem.offsetTop;
				currentElem = currentElem.offsetParent;
			} while (currentElem);
		}
		return Math.max(location, 0);
	};

	const revealElements = document.querySelectorAll('.reveal');
	const revealOffset = 40;

	revealElements.forEach((element) => {
		const elemDistance = getElemDistance(element);
		const elemPos = elemDistance > window.innerHeight ? elemDistance - window.innerHeight + revealOffset : -1;

		const hr = new Headroom(element, {
			offset: elemPos,
			tolerance: 5,
			classes: {
				initial: 'revealer',
				pinned: 'revealer--pinned',
				unpinned: 'revealer--unpinned',
				top: 'revealer--hide',
				notTop: 'revealer--show',
			},
		});

		hr.init();
	});
});
