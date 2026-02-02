const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  burger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  if(navLinks.classList.contains('active')) {
    burger.style.color = 'black'; // X is always black
  } else {
    burger.style.color = ''; // resets to original color
  }
});
