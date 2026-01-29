const initSite = () => {
	// SMOOTH SCROLLING
	const anchorlinks = document.querySelectorAll('a[href^="#"]');

	for (const item of anchorlinks) {
		item.addEventListener('click', (e) => {
			const hashval = item.getAttribute('href');
			if (!hashval || hashval === '#') {
				return;
			}
			const target = document.querySelector(hashval);
			if (!target) {
				return;
			}
			target.scrollIntoView({
				behavior: 'smooth',
			});
			history.pushState(null, null, hashval);
			e.preventDefault();
		});
	}

	// ADD ID TO BODY
	const body = document.querySelector('body');
	const currentPath = window.location.pathname;

	const paths = [
		{ path: '/', id: 'home' },
		{ path: '/about/', id: 'about' },
		{ path: '/services/', id: 'services' },
	];

	const exactMatch = paths.find(({ path }) => currentPath === path || currentPath === path.slice(0, -1));

	if (exactMatch) {
		body.setAttribute('id', exactMatch.id);
	} else if (currentPath.startsWith('/posts/')) {
		body.setAttribute('id', 'news');
	} else if (currentPath !== '/' && currentPath.length > 1 && !currentPath.startsWith('/news/') && !currentPath.startsWith('/about/')) {
		body.setAttribute('id', 'project');
	} else {
		body.setAttribute('id', 'home');
	}

	// MOBILE MENU
	const burger = document.querySelector('.navbar-burger');
	const targetId = burger?.dataset?.target;
	const menu = targetId ? document.getElementById(targetId) : document.querySelector('.navbar-menu');

	if (burger && menu && burger.dataset.menuBound !== 'true') {
		burger.dataset.menuBound = 'true';

		const setExpanded = (isOpen) => {
			burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
			burger.classList.toggle('is-active', isOpen);
			menu.classList.toggle('is-active', isOpen);
			document.body.classList.toggle('nav-open', isOpen);
		};

		const closeMenu = () => setExpanded(false);
		const toggleMenu = () => setExpanded(!burger.classList.contains('is-active'));

		burger.addEventListener('click', (event) => {
			event.preventDefault();
			toggleMenu();
		});

		menu.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', () => closeMenu());
		});

		document.addEventListener('click', (event) => {
			if (!menu.contains(event.target) && !burger.contains(event.target)) {
				closeMenu();
			}
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				closeMenu();
			}
		});

		window.addEventListener('resize', () => {
			if (window.innerWidth > 1023) {
				closeMenu();
			}
		});
	}
};

document.addEventListener('DOMContentLoaded', initSite);
document.addEventListener('astro:page-load', initSite);

//  lazyload images fade-in
import './trig.js';

document.addEventListener('astro:page-load', () => {
	const lazyImages = document.querySelectorAll('img[loading="lazy"]');

	lazyImages.forEach((img) => {
		if (img.complete && img.naturalHeight !== 0) {
			img.classList.add('loaded');
		} else {
			img.addEventListener('load', () => {
				img.classList.add('loaded');
			});
		}
	});
});
