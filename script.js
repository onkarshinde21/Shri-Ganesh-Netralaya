document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsNav = carousel.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    let index = 0;
    const totalSlides = slides.length;

    // Function to determine visible cards based on screen size
    function getVisibleSlides() {
      if (window.innerWidth < 768) return 1;   // Mobile
      if (window.innerWidth < 1024) return 2;  // Tablet
      return 3;                                // Desktop
    }

    function updateCarousel() {
      const visibleSlides = getVisibleSlides();
      const slideWidth = carousel.offsetWidth / visibleSlides;

      slides.forEach(slide => {
        slide.style.minWidth = `${slideWidth}px`;
      });

      // prevent overflow / blank space
      if (index > totalSlides - visibleSlides) {
        index = totalSlides - visibleSlides;
      }

      const offset = -index * slideWidth;
      track.style.transform = `translateX(${offset}px)`;
    }

    // Button events
    prevBtn.addEventListener("click", () => {
      if (index > 0) {
        index--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (index < totalSlides - getVisibleSlides()) {
        index++;
        updateCarousel();
      }
    });

    // Window resize
    window.addEventListener("resize", updateCarousel);

    // Initial setup
    updateCarousel();
  });
});