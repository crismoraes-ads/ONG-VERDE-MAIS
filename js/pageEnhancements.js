document.addEventListener('DOMContentLoaded', function(){
  const heroImgs = document.querySelectorAll('.hero-img, .card img');
  heroImgs.forEach(img => {
    if(img.complete) {
      img.style.height = 'auto';
    } else {
      img.addEventListener('load', () => {
        img.style.height = 'auto';
      });
    }
  });
});
