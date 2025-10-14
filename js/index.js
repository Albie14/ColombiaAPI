// disminuir la velocidad del video

const video = document.getElementById('video-main');
video.playbackRate = 0.5; // Cambia el valor a la velocidad deseada (0.5 es la mitad de la velocidad normal)

//btn abrir y cerrar menu nav

const btnCerrarMenuNav = document.getElementById('btn-cerrar')
const btnAbrirMenuNav = document.getElementById('btn-abrir')
const menuNav = document.querySelector('.plegable');

btnAbrirMenuNav.addEventListener('click', ()=>{
    menuNav.style.display = 'block';
    btnAbrirMenuNav.style.display = 'none';
    btnCerrarMenuNav.style.display = 'flex';
})

menuNav.addEventListener('mouseleave', ()=>{
    menuNav.style.display = 'none';
    btnAbrirMenuNav.style.display = 'flex';
    btnCerrarMenuNav.style.display = 'none';
})
btnCerrarMenuNav.addEventListener('click', ()=>{
    menuNav.style.display = 'none';
    btnAbrirMenuNav.style.display = 'flex';
    btnCerrarMenuNav.style.display = 'none';

}) 

//ampliar menu en responsive
const btnMenuHamburguesa = document.getElementById('btn-abrir-menu');
const btnCerrarMenuHamburguesa = document.getElementById('btn-cerrar-menu');
const navMenuResponsive = document.querySelector('.nav');


btnMenuHamburguesa.addEventListener('click', ()=>{
    navMenuResponsive.style.display = 'flex';
    btnMenuHamburguesa.style.display = 'none';
    btnCerrarMenuHamburguesa.style.display = 'flex';
})

btnCerrarMenuHamburguesa.addEventListener('click', ()=>{
    navMenuResponsive.style.display = 'none';
    btnMenuHamburguesa.style.display = 'flex';
    btnCerrarMenuHamburguesa.style.display = 'none';
    menuNav.style.display = 'none';
    btnAbrirMenuNav.style.display = 'flex';
    btnCerrarMenuNav.style.display = 'none'
})