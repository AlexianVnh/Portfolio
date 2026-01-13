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



fetch('data/projets.json')
  .then(res => res.json())
  .then(projetsData => {
    const container = document.getElementById('projetsContent');

    projetsData.sort((a, b) => b.year - a.year);

    projetsData.forEach(projet => {
      const card = document.createElement('div');
      card.className = 'projets-card';
      card.dataset.type = projet.type;

      // image depuis le JSON
      card.style.backgroundImage = `url(${projet.image})`;

      card.innerHTML = `
        <div class="projets-card-overlay">
          <div class="exp-date">${projet.year}</div>
          <div class="projets-card-text">
            <h3>${projet.title}</h3>
            <a href="projet.html?slug=${projet.slug}" class="button">
              Voir le projet
            </a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });


    // Récupérer les cartes **après leur ajout**
    const projets = document.querySelectorAll('.projets-card');

    // Boutons pour filtrer
    const buttons = document.querySelectorAll('.projets-button');
    buttons.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        buttons.forEach(btn => btn.classList.replace('active', 'inactive'));
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
  })
  .catch(err => console.error('Erreur lors du chargement des projets:', err));


