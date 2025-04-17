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

fetch('https://api-colombia.com/api/v1/Department')
    .then(response=>{
        if(!response.ok){
            throw new Error ('Ocurrió un error al obtener los datos');
        }
        return response.json();
    })
    .then(data=>{
        console.log(data);
        const contenedorGeneral = document.querySelector('.contenedor-general');
        const contenedorMapa = document.createElement('div');
        contenedorMapa.className = 'contenedor-individual mapa';
        let marcadoresHTML = `<img src="/multimedia/mapa.gif" alt="mapa">`

        data.forEach((dato, index)=>{

            //para modificar los espacios y mayusculas de los nombres a la pasarlos como dato valido para un id
            const nombres = (dato.name).replace(/\s+/g, "-").toLowerCase();
            
            

            marcadoresHTML += `<div class="marcadores" id="marcador-${nombres}">
                                    <span class="nombre-departamento">${dato.name}</span>
                                </div>`;
        });

        contenedorMapa.innerHTML = marcadoresHTML;
        contenedorGeneral.appendChild(contenedorMapa);
    
        const puntosDeReferencia = document.querySelectorAll('.marcadores');
        puntosDeReferencia.forEach(punto=>{
            punto.addEventListener('click', (event)=>{
                //para obtener el ID del elemento clickeado
                const idClickeado = event.currentTarget.id;
                const nombreId = idClickeado.replace("marcador-", "");

                //se busca el dato correspondiente en el array de datos
                const datos = data.find(dato=> dato.name.replace(/\s+/g, "-").toLowerCase() === nombreId);

                const body = document.querySelector('body');
                body.style.overflow = 'hidden';
                const section = document.querySelector('section');
                const divPantallaCompleta = document.createElement('div');
                divPantallaCompleta.className = 'pantalla-completa';
                divPantallaCompleta.style.display = 'flex';

                divPantallaCompleta.innerHTML = `
                    <div class="x-icon">
                        <p id="btn-cerrar-pantalla">x</p>
                    </div>
                    
                    <div class="contenedor-informacion">
                            <div class="txt-ampliada">
                                <h2>Nombre: ${datos.name}</h2>
                                <h5>Capital: ${datos.cityCapital?.name}</h5>
                                <h5>Superficie: ${datos.surface} Km2</h5>
                                <h5>Poblacion: ${datos.population} personas</h5>
                                <h6>Descripcion: ${datos.description}</h6>
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
            })
        })
    })

    .catch(error=>{
        console.error('Error:', error);

    })