// script.js

// Handle Tab Switching and Image Filtering
const tabs = document.querySelectorAll('.tab');
const slides = document.querySelectorAll('.slide');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove 'active' class from all tabs and add it to the clicked tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Get the selected filter category
        const filter = tab.getAttribute('data-filter');

        // Show or hide images based on the selected filter
        slides.forEach(slide => {
            const category = slide.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    });
});

// ... your existing Swiper initialization ...

// Get all slides
const slidesOverlay = document.querySelectorAll('.swiper-slide');

// Get overlay elements
const overlay = document.getElementById('overlay');
const overlayImage = overlay.querySelector('.overlay-image img');
const overlayTitle = overlay.querySelector('.overlay-text h2');
const overlayDescription = overlay.querySelector('.overlay-text p');
const closeBtn = overlay.querySelector('.close-btn');

// Add click event to each slide
slidesOverlay.forEach(slide => {
  slide.addEventListener('click', () => {
    // Get data from slide (you'll need to add these data attributes to your slides)
    const imageSrc = slide.getAttribute('data-image');
    const title = slide.getAttribute('data-title');
    const description = slide.getAttribute('data-description');

    // Set overlay content
    overlayImage.src = imageSrc;
    overlayTitle.textContent = title;
    overlayDescription.textContent = description;

    // Show overlay
    overlay.classList.add('visible');
  });
});

// Close overlay when close button is clicked
closeBtn.addEventListener('click', () => {
  overlay.classList.remove('visible');
});

// Close overlay when clicking outside the content
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.remove('visible');
  }
});

// Slider Navigation inside Overlay
overlay.addEventListener('click', () => {
    // Logic for navigating to the next image in the overlay slider
});

let swiper;

function initSwiper() {
    swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        speed: 400,
        spaceBetween: 0,
        slidesPerView: 1, // Start with 1 and adjust as needed
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });
}

function filterSlides(category) {
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
        if (category === 'all' || slide.dataset.category === category) {
            slide.classList.remove('hidden');
        } else {
            slide.classList.add('hidden');
        }
    });
    
    swiper.destroy();
    initSwiper();
    swiper.update();
}

document.addEventListener('DOMContentLoaded', () => {
    initSwiper();

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterSlides(tab.dataset.filter);
        });
    });
});

