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
const overlayTitle = overlay.querySelector('.overlay-text h2');
const overlayDescription = overlay.querySelector('.overlay-text p');
const closeBtn = overlay.querySelector('.close-btn');

let overlaySwiper;

// Add click event to each slide
slidesOverlay.forEach(slide => {
  slide.addEventListener('click', () => {
    openOverlay(slide);
  });
});

function openOverlay(slide) {
    const title = slide.getAttribute('data-title');
    const problem = slide.getAttribute('data-problem');
    const solution = slide.getAttribute('data-solution');
    const team = slide.getAttribute('data-team');
    const images = JSON.parse(slide.getAttribute('data-images'));

    const swiperWrapper = overlay.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = ''; // Clear existing slides

    // Add slides for each image
    images.forEach(imageSrc => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `<img src="${imageSrc}" alt="${title}">`;
        swiperWrapper.appendChild(slide);
    });

   // Update overlay text
   overlayTitle.textContent = title;
   overlay.querySelector('.problem').textContent = problem;
   overlay.querySelector('.solution').textContent = solution;
   overlay.querySelector('.team').textContent = team;

    overlay.classList.add('visible');

    // Initialize or update Swiper
    if (overlaySwiper) {
        overlaySwiper.update();
    } else {
        overlaySwiper = new Swiper('.overlay-swiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
}

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

// Remove the old Slider Navigation inside Overlay
// The navigation is now handled by Swiper

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

function downloadCV() {
    // Replace 'path/to/your/cv.pdf' with the actual path to your PDF file
    const pdfUrl = './CV - Felipe Lourenço.pdf';

     // Open the PDF in a new tab
     window.open(pdfUrl, '_blank');
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = pdfUrl;
    
    // Set the download attribute with the desired file name
    link.download = 'CV - Felipe Lourenço.pdf';
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Programmatically click the link to trigger the download
    link.click();
    
    // Remove the link from the body
    document.body.removeChild(link);
}