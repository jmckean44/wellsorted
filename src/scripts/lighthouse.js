document.addEventListener('astro:page-load', () => {
	const lighthouseSvgs = document.querySelectorAll('.lighthouse-bg');

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('in-view');
					// Animate the number
					const text = entry.target.querySelector('#lighthouse-score');
					if (text && !text.dataset.animated) {
						animateScore(text, 100); // Set your target score here
						text.dataset.animated = 'true';
					}
				} else {
					entry.target.classList.remove('in-view');
					// Optionally reset the number
					const text = entry.target.querySelector('#lighthouse-score');
					if (text) {
						text.textContent = '0%';
						delete text.dataset.animated;
					}
				}
			});
		},
		{ threshold: 0.3 }
	);

	lighthouseSvgs.forEach((svg) => observer.observe(svg));

	function animateScore(element, target) {
		let current = 0;
		const duration = 2000;
		const start = performance.now();
		const svg = element.closest('svg');

		function update(now) {
			const progress = Math.min((now - start) / duration, 1);
			const value = Math.floor(progress * target);
			element.textContent = value + '%';

			// Update aria-label dynamically
			if (svg) {
				svg.setAttribute('aria-label', `Lighthouse performance score: ${value}%`);
			}

			if (progress < 1) {
				requestAnimationFrame(update);
			} else {
				element.textContent = target + '%';
				if (svg) {
					svg.setAttribute('aria-label', `Lighthouse performance score: ${target}%`);
				}
			}
		}
		requestAnimationFrame(update);
	}

	// Usage:
	animateScore(document.getElementById('lighthouse-score'), 100);
});
