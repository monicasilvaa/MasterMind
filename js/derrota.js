let datos = {};

function obtenerDatos() {
    datos = JSON.parse(sessionStorage.getItem("datosPartida"));
}

function mostrarMensajeVictoria(){
    const titulo = document.getElementById("textoPerdedor");
    let html = `¡${datos.usuario} has perdido!`;

    titulo.innerHTML = html;
}

function mostrarColores() {
    const contenedorColores = document.getElementById("contenedorColores");
    
    for(let color of datos.combinacionGanadora){
        let divColor = document.createElement("div");

        divColor.classList = "bola huevo";
        divColor.style.backgroundColor = color;

        contenedorColores.append(divColor);
    }
}

obtenerDatos();
mostrarMensajeVictoria();
mostrarColores();

