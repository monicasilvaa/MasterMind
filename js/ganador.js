let datos = {};

function obtenerDatos() {
    datos = JSON.parse(sessionStorage.getItem("datosPartida"));
}

function mostrarMensajeVictoria(){
    const titulo = document.getElementById("textoGanador");
    let html = `¡${datos.usuario} has ganado!`;

    titulo.innerHTML = html;
}

obtenerDatos();
mostrarMensajeVictoria();

