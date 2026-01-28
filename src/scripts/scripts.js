document.addEventListener('astro:page-load', () => {
	// SMOOTH SCROLLING
	let anchorlinks = document.querySelectorAll('a[href^="#"]');

	for (let item of anchorlinks) {
		item.addEventListener('click', (e) => {
			let hashval = item.getAttribute('href');
			let target = document.querySelector(hashval);
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
		{ path: '/news/', id: 'news' },
		{ path: '/images/', id: 'images' },
	];

	// Check for exact path matches first
	const exactMatch = paths.find(({ path }) => currentPath === path || currentPath === path.slice(0, -1));

	if (exactMatch) {
		body.setAttribute('id', exactMatch.id);
	} else if (currentPath.startsWith('/posts/')) {
		// Blog post pages
		body.setAttribute('id', 'news');
	} else if (currentPath !== '/' && currentPath.length > 1 && !currentPath.startsWith('/news/') && !currentPath.startsWith('/about/')) {
		// Project pages (any other path that's not a known section)
		body.setAttribute('id', 'project');
	} else {
		// Default to home for root path
		body.setAttribute('id', 'home');
	}
});

//  lazyload images fade-in
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
