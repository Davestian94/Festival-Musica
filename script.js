document.addEventListener('DOMContentLoaded', function() {
    navegacionFija();
    crearGaleria();
    resaltarenlace();
    scrollnav();
});

function navegacionFija() {
    const header= document.querySelector('.header');
    const video = document.querySelector('.video');

    window.addEventListener ('scroll', function() {
        if(video.getBoundingClientRect().bottom < 0) {
            header.classList.add('fijo');
        } else{
            header.classList.remove('fijo');
        }
    })
}

function crearGaleria() {

    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i=1; i<=CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
        `;

        //event handler
        imagen.onclick = function() {
            mostrarImagen(i)
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
`;
    //generar modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarmodal
    modal.appendChild(imagen)

    //boton cerrar modal
    const btnclose = document.createElement('BUTTON');
    btnclose.textContent = 'X';
    btnclose.classList.add('btn-close');
    btnclose.onclick = cerrarmodal;

    modal.appendChild(btnclose);

    //agregar al html
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}


function cerrarmodal() {
    const modal= document.querySelector('.modal');
    modal.classList.add('fadeOut');
    const body = document.querySelector('body');
    body.classList.remove('overflow-hidden');
    setTimeout(() => {
        modal?.remove();
    },500);
    
}

function resaltarenlace() {
    document.addEventListener('scroll', function() {
        const sections= document.querySelectorAll('section');
        const navlinks = document.querySelectorAll('.navegacion a');
        let actual ='';
        sections.forEach (section => {
            const sectiontop = section.offsetTop;
            const sectionheight = section.clientHeight;
            
            if(window.scrollY >= sectiontop - sectionheight /3) {
                actual = section.id
            }
        })
        navlinks.forEach (link => {
            link.classList.remove('activo');
            if(link.getAttribute('href') === `#${actual}` ) {
                link.classList.add('activo');
            }
        })
    })
}

function scrollnav() {
    const navlinks = document.querySelectorAll('.navegacion a');
    navlinks.forEach (link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionscroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionscroll);

            section.scrollIntoView({behavior: "smooth"})
            });
        });
}