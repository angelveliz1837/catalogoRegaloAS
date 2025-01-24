document.addEventListener('DOMContentLoaded', function(){
    const contenedor1 = document.querySelector('.contenedor1');
    const contenedor2 = document.querySelector('.contenedor2');
    const idContenedor2 = document.getElementById("contenedor2");
    const contenedor3 = document.querySelector('.contenedor3');
    const idContenedor3 = document.getElementById('contenedor3');
    const imagenDetalle = document.getElementById('imagenDetalle');
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
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            imagenes = data.map(item => `images/${item.imagen}.jpg`);
            // Llamamos a la función para generar imágenes usando los datos
            generarImagenes(data);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });

//Funcion para generar imagenes
    function generarImagenes(data) {
        idContenedor2.innerHTML = '';
        
        data.forEach(item => {
            // Crear div con clase "regalo"
            let divRegalo = document.createElement("div");
            divRegalo.classList.add("regalo");

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
            pDetalle.textContent = 'Detalle';

            // Asignar el evento de clic
            divDetalle.addEventListener("click", function() {
                mostrarDetalle(item.id, data);
            });

            divImagenPrincipal.addEventListener("click", function() {
                mostrarImagen(item.id, data);
            });

            // Añadir elementos en su jerarquía
            divDetalle.appendChild(pDetalle);
            divRegalo.appendChild(img);
            divRegalo.appendChild(divDetalle);
            idContenedor2.appendChild(divRegalo);

             // Mostrar el contenedor4 al hacer clic en la imagen
             img.addEventListener('click', () => {
                contenedor4.style.display = 'block';
                divImagenPrincipal.src = img.src;
            });
        });
    }

    function mostrarDetalle(id, data) {
        // Ocultar contenedor2 y mostrar contenedor3
        contenedor2.style.display = 'none';
        idContenedor3.style.display = 'flex';
        contenedor4.style.display = 'none';

        // Buscar el producto en los datos
        let producto = data.find(item => item.id === id);

        // Cambiar la imagen en el contenedor3 según el ID seleccionado
        imagenDetalle.src = `images/${producto.imagen}.jpg`;
        imagenDetalle.alt = `Detalle de producto ${producto.id}`;

        // Aquí puedes agregar detalles adicionales en contenedor3 si es necesario
        // Ejemplo de mostrar detalles del producto
        const detalles = `
        <div class="texto">
          <h3>Emprendimiento AS</h3>
          <h1>Detalles</h1>
          <p class="detalle1">${producto.detalle1}</p>
          <p class="detalle2">${producto.detalle2}</p>
          <p class="detalle3">${producto.detalle3}</p>
          <p class="detalle4">${producto.detalle4}</p>
        </div>
        <div class="cuenta">
          <div class="precio_descuento">s/. <span class="precio">${producto.precio}</span>.00</div>
        </div>
        `;
        document.getElementById('detallesProducto').innerHTML = detalles;
    }

    function mostrarImagen(id, data) {
        contenedor4.style.display = 'block';

        // Buscar el producto en los datos
        let producto = data.find(item => item.id === id);

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
        contenedor6.style.display = "block";
        contenedor5.style.display = "block";
        iconoMenu.style.display = "none";
        aspaNuevo.style.display = "block";
    }
    iconoMenu.addEventListener("click", verMenu);

    const cerrarMenu = function(){
        contenedor6.style.display = "none";
        contenedor5.style.display = "none";
        iconoMenu.style.display = "block";
        aspaNuevo.style.display = "none";
    }
    aspaNuevo.addEventListener("click", cerrarMenu)


});