// Catégories Scrollable sur PC

const scrollable = document.querySelector('.scrollable');
let isDown = false, startX, scrollLeft;

scrollable.addEventListener('mousedown', e => {
  isDown = true;
  scrollable.classList.add('cursor-grabbing');
  startX = e.pageX - scrollable.offsetLeft;
  scrollLeft = scrollable.scrollLeft;
});
scrollable.addEventListener('mouseleave', () => {
  isDown = false;
  scrollable.classList.remove('cursor-grabbing');
});
scrollable.addEventListener('mouseup', () => {
  isDown = false;
  scrollable.classList.remove('cursor-grabbing');
});
scrollable.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollable.offsetLeft;
  scrollable.scrollLeft = scrollLeft - (x - startX);
});



const buttons = document.querySelectorAll('.projets-button');
const projets = document.querySelectorAll('.projets-card');

buttons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();

    // Remplacement des classes
    buttons.forEach(btn => {
      btn.classList.replace('active', 'inactive');
    });

    button.classList.replace('inactive', 'active');

    const filter = button.dataset.filter;

    projets.forEach(projet => {
      if (filter === 'all' || projet.dataset.type === filter) {
        projet.style.display = 'flex';
      } else {
        projet.style.display = 'none';
      }
    });
  });
});

