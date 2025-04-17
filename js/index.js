// disminuir la velocidad del video

const video = document.getElementById('video-main');
video.playbackRate = 0.5; // Cambia el valor a la velocidad deseada (0.5 es la mitad de la velocidad normal)

//btn abrir y cerrar menu

const btnCerrar = document.getElementById('btn-cerrar')
const btnAbrir = document.getElementById('btn-abrir')
const menu = document.querySelector('.plegable');

btnAbrir.addEventListener('click', ()=>{
    menu.style.display = 'block';
    btnAbrir.style.display = 'none';
    btnCerrar.style.display = 'flex';
})

menu.addEventListener('mouseleave', ()=>{
    menu.style.display = 'none';
    btnAbrir.style.display = 'flex';
    btnCerrar.style.display = 'none';
})
btnCerrar.addEventListener('click', ()=>{
    menu.style.display = 'none';
    btnAbrir.style.display = 'flex';
    btnCerrar.style.display = 'none';

}) 
