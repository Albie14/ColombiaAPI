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
fetch('https://api-colombia.com/api/v1/President')
    .then(response => {
        if(!response.ok){
            throw new Error('Ocurrió un error al obtener los datos');
        }
        return response.json();
    })
    .then(data =>{
        const contenedorGeneral = document.querySelector('.contenedor-general');

        // Crear elementos dinámicamente con información de la API
        data.forEach((dato, index) => {
            const contenedorPresindete = document.createElement('div');
            contenedorPresindete.className = 'contenedor-individual';
            contenedorPresindete.innerHTML = `
                <div class="img-contenedor">
                    <img src="${dato.image}" alt="${dato.name}" class="ampliar-pantalla-completa" data-index="${index}">
                </div>
                <div class="txt-contenedor">
                    <h2>${dato.name} ${dato.lastName}</h2>
                </div>
            `;
            contenedorGeneral.appendChild(contenedorPresindete);
        });
          // Delegar eventos para manejar clics en las imágenes
          contenedorGeneral.addEventListener('click', (event) => {
            const target = event.target;

            // Verificar si el clic es sobre una imagen
            if (target.tagName === 'IMG' && target.classList.contains('ampliar-pantalla-completa')) {
                const index = target.getAttribute('data-index');
                const info = data[index]; // Obtener la información relacionada al objeto clickeado

                // // Crear un contenedor para la vista ampliada
                const body = document.querySelector('body');
                body.style.overflow = 'hidden';
                const section = document.querySelector('section');
                const divPantallaCompleta = document.createElement('div');
                divPantallaCompleta.className = 'pantalla-completa';
                divPantallaCompleta.style.display = 'flex';

                // Agregar contenido dinámico al modal
                divPantallaCompleta.innerHTML = `
                    <div class="x-icon">
                        <p id="btn-cerrar-pantalla">x</p>
                    </div>
                    
                    <div class="contenedor-informacion">
                            <div class="img-apliada">
                                <img src="${info.image}" alt="${info.name}">
                            </div>
                            <div class="txt-ampliada">
                                <h2>Nombre: ${info.name} ${info.lastName}</h2>
                                <h5>Periodo Presindencial: </h5>
                                <h6>Desde: ${info.startPeriodDate}  /  Hasta: ${info.endPeriodDate}</h6>
                                <h5>Partido Politico: ${info.politicalParty || "No disponibles"}</h5>
                                <h6>Biografia: ${info.description || "No disponible"}</h6>
                            </div>
                    </div>
                `;
                section.appendChild(divPantallaCompleta);

                // Cerrar el modal al hacer clic en el botón de cerrar
                const btnCerrar = divPantallaCompleta.querySelector('#btn-cerrar-pantalla');
                btnCerrar.addEventListener('click', () => {
                    divPantallaCompleta.remove();
                    body.style.overflow = 'auto';
                });
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
   