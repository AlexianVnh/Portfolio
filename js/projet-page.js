const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');

fetch('data/projets.json')
  .then(res => res.json())
  .then(projets => {
    const projet = projets.find(p => p.slug === slug);

    if (!projet) {
      document.querySelector('main').innerHTML = '<h2>Projet introuvable</h2>';
      return;
    }

    document.getElementById('projectTitle').textContent = projet.title;
    document.getElementById('projectTags').textContent =
      projet.tags.map(tag => `#${tag}`).join(' ');
    document.getElementById('projectYear').textContent = projet.year;
    document.getElementById('projectImage').src = projet.image;
    document.getElementById('projectImage').alt = projet.alt;
    document.getElementById('projectContent').innerHTML = projet.content.replace(/\n/g, "<br>");

    const gallery = document.getElementById('projectGallery');
    projet.gallery?.forEach(img => {
      const image = document.createElement('img');
      image.src = img;
      gallery.appendChild(image);
    });

    // Fil d'Ariane
    const categoryMap = {
      webdesigner: "Webdesigner",
      graphiste: "Graphiste",
      communicant: "Communicant",
      "3d": "3D"
    };

    const categoryLabel = categoryMap[projet.type] || projet.type;

    document.getElementById('breadcrumbProject').textContent =
      ` / ${projet.title}`;

  });