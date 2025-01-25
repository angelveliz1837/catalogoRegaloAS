document.addEventListener('DOMContentLoaded', function(){
    const contenedor1 = document.querySelector('.contenedor1');
    const contenedor2 = document.querySelector('.contenedor2');
    const idContenedor2 = document.getElementById("contenedor2");
    const contenedor3 = document.querySelector('.contenedor3');
    const idContenedor3 = document.getElementById('contenedor3');
    const regresoLista = document.querySelector('.regreso_lista h2');
    const contenedor4 = document.querySelector('.contenedor4');
    const cerrarFoto = document.querySelector('.cerrar');
    const divImagenPrincipal = document.getElementById('imagenPrincipal');
    //Funcion para avanzar y retroceder foto
    const botonAtras = document.querySelector('.atras');
    const botonAdelante = document.querySelector('.adelante');
    const contenedor5 = document.querySelector('.contenedor5');
    const contenedor6 = document.querySelector('.contenedor6');
    let imagenes = [];
    let indiceActual = 0;

    //Crear un media query si es menor a 375px
    const mediaQuery = window.matchMedia("(max-width: 400px)");

    //Botones para el mobil
    const iconoMenu = document.querySelector('.icono_menu');
    const aspaNuevo = document.querySelector('.cerrar_nuevo');

    // Cargar datos desde el archivo JSON
    fetch('datae.json')
        .then(response => response.json())
        .then(datae => {
            imagenes = datae.map(item => `images/${item.imagen}.jpg`);
            // Llamamos a la función para generar imágenes usando los datos
            generarImagenes(datae);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });

//Funcion para generar imagenes
    function generarImagenes(datae) {
        idContenedor2.innerHTML = '';
        
        datae.forEach(item => {
            // Crear div con clase "regalo"
            let divRegalo = document.createElement("div");
            divRegalo.classList.add("regalo");

            //Crear Oferta
            let divOferta = document.createElement('div');
            divOferta.classList.add('oferta');

            //Crear parrafo dentro de oferta
            let pOferta = document.createElement('p');
            pOferta.textContent = `s/. ${item.precio}`;

            // Crear imagen
            let img = document.createElement('img');
            img.src = `images/${item.imagen}.jpg`;  // Usamos el nombre de imagen del JSON
            img.alt = `product ${item.id}`;
            img.setAttribute('data-id', item.id);

            // Crear div con clase "detalle"
            let divDetalle = document.createElement('div');
            divDetalle.classList.add('detalle');

            // Crear párrafo dentro de detalle
            let pDetalle = document.createElement('p');
            pDetalle.textContent = `${item.detalle}`;

            divImagenPrincipal.addEventListener("click", function() {
                mostrarImagen(item.id, datae);
            });

            // Añadir elementos en su jerarquía
            divOferta.appendChild(pOferta);
            divRegalo.appendChild(divOferta);
            divDetalle.appendChild(pDetalle);
            divRegalo.appendChild(img);
            divRegalo.appendChild(divDetalle);
            idContenedor2.appendChild(divRegalo);

             // Mostrar el contenedor4 al hacer clic en la imagen
             img.addEventListener('click', () => {
                contenedor4.style.display = 'block';
                divImagenPrincipal.src = img.src;
                contenedor1.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    function mostrarImagen(id, datae) {
        contenedor4.style.display = 'block';

        // Buscar el producto en los datos
        let producto = datae.find(item => item.id === id);

        // Cambiar la imagen en el contenedor3 según el ID seleccionado
        divImagenPrincipal.src = `images/${producto.imagen}.jpg`;
        divImagenPrincipal.alt = `Detalle de producto ${producto.id}`;
    }

    botonAtras.addEventListener("click", () => {
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        divImagenPrincipal.src = imagenes[indiceActual];
    });

    botonAdelante.addEventListener("click", () => {
        indiceActual = (indiceActual + 1) % imagenes.length;
        divImagenPrincipal.src = imagenes[indiceActual];
    });

    // Ajustar columnas según el tamaño de la pantalla
    function ajustarColumnas() {
        let anchoPantalla = window.innerWidth;

        if (anchoPantalla <= 600) {
            contenedor2.style.gridTemplateColumns = '100%';
        } else if (anchoPantalla <= 1024) {
            contenedor2.style.gridTemplateColumns = '50% 50%';
        } else {
            contenedor2.style.gridTemplateColumns = '33.3% 33.3% 33.3%';
        }
    }

    ajustarColumnas();
    window.onresize = ajustarColumnas;
    idContenedor3.style.display = 'none';
    contenedor4.style.display = 'none';

    // Función para cerrar el detalle y volver al contenedor2
    function cerrarDetalle() {
        contenedor2.style.display = 'grid';
        idContenedor3.style.display = 'none'; 
        contenedor4.style.display = 'none';
    }

    // Asegúrate de que el elemento "regreso_lista" exista en el HTML
    regresoLista.addEventListener("click", cerrarDetalle); 

    // Cerrar el contenedor4 al hacer clic en el botón de cerrar
    cerrarFoto.addEventListener('click', () => {
        contenedor4.style.display = 'none';
    });

    //PARTE MOBIL
    //Funcion para mobil
    mediaQuery.addEventListener("change", function(){
        if(mediaQuery.matches){
            contenedor2.style.display = "grid";
            contenedor3.style.display = "none";
            contenedor4.style.display = "none";
            iconoMenu.style.display = "block";
        }else{
            contenedor2.style.display = "grid";
            contenedor3.style.display = "flex";
            contenedor4.style.display = "none";
            iconoMenu.style.display = "none"
        }
    });

    if(mediaQuery.matches){
        contenedor2.style.display = "grid";
        contenedor3.style.display = "none";
        contenedor4.style.display = "none";
        iconoMenu.style.display = "block";
    }else{
        contenedor2.style.display = "grid";
        contenedor3.style.display = "flex";
        contenedor4.style.display = "none";
        iconoMenu.style.display = "none"
    }

    //Funcion para ver menu
    const verMenu = function(){
            contenedor3.style.display = "flex";
            contenedor6.style.display = "block";
            contenedor5.style.display = "block";
            iconoMenu.style.display = "none";
            aspaNuevo.style.display = "block";
    }
    iconoMenu.addEventListener("click", verMenu);

    const cerrarMenu = function(){
            contenedor3.style.display = "flex";
            contenedor6.style.display = "none";
            contenedor5.style.display = "none";
            iconoMenu.style.display = "block";
            aspaNuevo.style.display = "none";
    }
    aspaNuevo.addEventListener("click", cerrarMenu)


});