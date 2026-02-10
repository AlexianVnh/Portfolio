document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const btnSeeMore = document.getElementById('projectSeeMore');

    // On cache le bouton par défaut par sécurité
    if (btnSeeMore) btnSeeMore.style.display = "none";

    fetch('data/projets.json')
        .then(res => {
            if (!res.ok) throw new Error("Erreur lors du chargement du JSON");
            return res.json();
        })
        .then(projets => {
            const projet = projets.find(p => p.slug === slug);

            if (!projet) {
                document.querySelector('main').innerHTML = '<div class="width-responsive"><h2>Projet introuvable</h2><a href="index.html">Retour à l\'accueil</a></div>';
                return;
            }

            // Remplissage des textes
            document.getElementById('projectTitle').textContent = projet.title;
            document.getElementById('projectTags').textContent = projet.tags.map(tag => `#${tag}`).join(' ');
            document.getElementById('projectYear').textContent = projet.year;
            
            const mainImg = document.getElementById('projectImage');
            mainImg.src = projet.image;
            mainImg.alt = projet.alt || projet.title;
            
            document.getElementById('projectContent').innerHTML = projet.content.replace(/\n/g, "<br>");

            // Gestion du bouton "En voir +"
            if (projet.seeMore && projet.seeMore.length > 0 && projet.seeMore[0] !== "") {
                btnSeeMore.href = projet.seeMore[0];
                btnSeeMore.style.display = "flex";
            }

            // Galerie d'images
            const gallery = document.getElementById('projectGallery');
            if (projet.gallery && gallery) {
                projet.gallery.forEach(imgSrc => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imgSrc;
                    imgElement.alt = `Galerie ${projet.title}`;
                    gallery.appendChild(imgElement);
                });
            }

            // Fil d'Ariane
            const breadcrumb = document.getElementById('breadcrumbProject');
            if (breadcrumb) {
                breadcrumb.textContent = ` / ${projet.title}`;
            }
        })
        .catch(err => {
            console.error("Erreur :", err);
        });
});