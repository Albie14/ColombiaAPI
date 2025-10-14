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

fetch('https://api-colombia.com/api/v1/TouristicAttraction')
    .then(response => {
        if (!response.ok){
            throw new Error('ocurrio un error al obtener los datos');
        }
        return response.json()
    })

    .then(data=>{
        console.log(data)

        const contenedorGeneralTurismo = document.querySelector('.contenedor-general');

          // Crear elementos dinámicamente con información de la API
          data.forEach((dato, index) => {
            const contenedorTurismo = document.createElement('div');
            contenedorTurismo.className = 'contenedor-individual';
            contenedorTurismo.innerHTML = `
                <div class="img-contenedor">
                    <img src="${dato.images[0]}" alt="${dato.name}" class="ampliar-pantalla-completa" data-index="${index}">
                </div>
                <div class="txt-contenedor">
                    <h2>${dato.name}</h2>
                </div>
            `;
            contenedorGeneralTurismo.appendChild(contenedorTurismo);
        });

        contenedorGeneralTurismo.addEventListener('click', (event) => {
            const target = event.target;

            // Verificar si el clic es sobre una imagen
            if (target.tagName === 'IMG' && target.classList.contains('ampliar-pantalla-completa')) {
                const index = target.getAttribute('data-index');
        
                const info = data[index]; // Obtener la información relacionada al objeto clickeado
                // const nombreCiudad = info.city?.name;
                
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
                                <img src="${info.images[0]}" alt="${info.name}">
                            </div>
                            <div class="txt-ampliada">
                                <h2>Nombre: ${info.name}</h2>
                                <h5>Ubicacion: ${info.city?.name || "No disponibles"}</h5>
                                <h6>Descripción: ${info.description || "No disponible"}</h6>
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