const racas = document.querySelectorAll('.raca');
const overlay = document.getElementById('overlay');
const overlayImg = document.getElementById('overlay-img');

racas.forEach(raca => {
    raca.addEventListener('mouseenter', function(e) {
        const tipo = this.getAttribute('data-raca');
        let imgSrc = '';

        if (tipo === 'domestico') {
            const n = Math.floor(Math.random() * 20) + 1;
            imgSrc = `img/imagensTeste/gatoDomestico/gatoDomestico (${n}).jpg`;
        } else if (tipo === 'selvagem') {
            const n = Math.floor(Math.random() * 10) + 1;  // Ajuste conforme número de imagens
            imgSrc = `img/imagensTeste/gatoSelvagem/gatoSelvagem (${n}).jpg`;
        }

        overlayImg.src = imgSrc;
        overlay.style.display = 'block';
        overlay.style.top = (e.pageY + 10) + 'px';
        overlay.style.left = (e.pageX + 10) + 'px';
    });

    raca.addEventListener('mousemove', function(e) {
        overlay.style.top = (e.pageY + 10) + 'px';
        overlay.style.left = (e.pageX + 10) + 'px';
    });

    raca.addEventListener('mouseleave', function() {
        overlay.style.display = 'none';
    });
});
