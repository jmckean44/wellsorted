// GSAP Pinned Scroll Animation
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Make ScrollTrigger available globally for other scripts
window.ScrollTrigger = ScrollTrigger;

// Configuration
const totalFrames = 11; // Adjust based on your sequence
const frameUrls = Array.from({ length: totalFrames }, (_, i) => `../img/image-${i + 1}.webp`);

// Elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const frameCounter = document.getElementById('frame-counter');
const loading = document.getElementById('loading');
const container = document.getElementById('animation-container');

// State
let images = [];
let currentFrame = 0;
let imagesLoaded = false;

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Preload images
async function loadImages() {
	const imagePromises = frameUrls.map((url) => {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = url;
		});
	});

	try {
		images = await Promise.all(imagePromises);
		imagesLoaded = true;
		loading.style.display = 'none';
		drawFrame(0);
	} catch (error) {
		console.error('Error loading images:', error);
		loading.textContent = 'Error loading frames';
		loading.classList.add('text-red-400');
	}
}

// Draw a specific frame
function drawFrame(index) {
	if (!imagesLoaded || index < 0 || index >= images.length) return;

	const img = images[index];
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	frameCounter.textContent = `Frame ${index + 1} / ${totalFrames}`;
}

// Handle scroll
function handleScroll() {
	if (!imagesLoaded) return;

	const scrollTop = window.scrollY;
	const containerTop = container.offsetTop;
	const containerHeight = container.offsetHeight;
	const windowHeight = window.innerHeight;

	// Calculate scroll progress through the container
	const scrollProgress = (scrollTop - containerTop + windowHeight / 2) / containerHeight;
	const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

	// Calculate which frame to show
	const frameIndex = Math.floor(clampedProgress * (totalFrames - 1));

	if (frameIndex !== currentFrame && frameIndex >= 0 && frameIndex < totalFrames) {
		currentFrame = frameIndex;
		drawFrame(frameIndex);
	}
}

// Initialize
loadImages();
window.addEventListener('scroll', handleScroll);
handleScroll(); // Initial call
