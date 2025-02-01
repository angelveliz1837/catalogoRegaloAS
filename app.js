document.addEventListener("DOMContentLoaded", () => {
    // ✅ MANEJO DE LA PORTADA
    const imagenPortada = document.querySelector(".portada_imagen img");
    const btnAnterior = document.querySelector(".portada_antes img");
    const btnSiguiente = document.querySelector(".portada_despues img");

    // Función para obtener imágenes según el tamaño de la pantalla
    function obtenerImagenes() {
        return window.innerWidth < 600 
            ? ["images/portadap1.jpg", "images/portadap2.jpg", "images/portadap3.jpg"]
            : ["images/portada1.jpg", "images/portada2.jpg", "images/portada3.jpg"];
    }

    // Inicializar imágenes según la pantalla
    let imagenes = obtenerImagenes();
    let indiceActual = 0;

    function cambiarImagen(direccion) {
        if (direccion === "siguiente") {
            indiceActual = (indiceActual + 1) % imagenes.length;
        } else {
            indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        }
        imagenPortada.src = imagenes[indiceActual];
    }

    // Agregar eventos a los botones
    if (btnSiguiente) btnSiguiente.addEventListener("click", () => cambiarImagen("siguiente"));
    if (btnAnterior) btnAnterior.addEventListener("click", () => cambiarImagen("anterior"));

    // Cambiar automáticamente cada 10 segundos
    setInterval(() => cambiarImagen("siguiente"), 10000);

    // Detectar cambio de tamaño de pantalla y actualizar imágenes
    window.addEventListener("resize", () => {
        imagenes = obtenerImagenes();
        cambiarImagen("siguiente"); // Actualizar la imagen al redimensionar
    });

    // ✅ MANEJO DE LOS PRODUCTOS
    let productos = [];
    let indiceInicio = 0;
    const productosElementos = document.querySelectorAll(".lista_regalo");

    if (productosElementos.length > 0) {
        // Cargar productos desde el archivo data.json
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                productos = data;
                actualizarProductos();
                setInterval(() => {
                    // Aumentar el índice de inicio para hacer la rotación
                    indiceInicio = (indiceInicio + 1) % productos.length;
                    actualizarProductos();
                }, 8000);
            })
            .catch(error => console.error("Error cargando productos:", error));
    }

    function actualizarProductos() {
        productosElementos.forEach((elemento, i) => {
            const producto = productos[(indiceInicio + i) % productos.length];
            const imagenElemento = elemento.querySelector(".lista_regalo_foto img");
            const precioElemento = elemento.querySelector(".lista_regalo_precio");

            if (producto) {
                imagenElemento.src = `images/${producto.imagen}.jpg`;
                precioElemento.textContent = `Precio: S/ ${producto.precio.toFixed(2)}`;
            }
        });
    }

    function toggleSocialIcons() {
        const icons = document.querySelector(".social-icons");
        if (icons) {
            icons.classList.toggle("open");
        } else {
            console.error("No se encontró el contenedor de iconos sociales.");
        }
    }

    // Agregar evento al botón de menú
    const socialToggle = document.querySelector(".social-toggle");
    if (socialToggle) {
        socialToggle.addEventListener("click", toggleSocialIcons);
    }
    
});
