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
  .then(response => response.json())
  .then(projetsData => {
    const container = document.getElementById('projetsContent');

    projetsData.sort((a, b) => b.year - a.year);

    projetsData.forEach(projet => {
      const card = document.createElement('div');
      card.className = 'projets-card';
      card.dataset.type = projet.type;

      // Vérifie si le JSON a un lien "seeMore"
      const seeMoreHTML = projet.seeMore ? `<a href="${projet.seeMore}" class="voir-plus button" target="_blank">Voir +</a>` : '';

      card.innerHTML = `
        <div class="projets-card-text">
          <h3>${projet.title}</h3>
          <p class="exp-grey">${projet.tags.map(tag => `#${tag}`).join(' ')}</p>
          <p>${projet.description}</p>
          <div class="exp-date">${projet.year}</div>
          ${seeMoreHTML}
        </div>
        <div>
          <img src="${projet.image}" alt="${projet.alt}" width="150px">
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
