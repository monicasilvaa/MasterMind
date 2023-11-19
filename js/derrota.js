let datos = {};

function obtenerDatos() {
    datos = JSON.parse(sessionStorage.getItem("datosPartida"));
}

function mostrarMensajeVictoria(){
    const titulo = document.getElementById("textoPerdedor");
    let html = `¡${datos.usuario} has perdido!`;

    titulo.innerHTML = html;
}

obtenerDatos();
mostrarMensajeVictoria();

