let datos={
    usuario:"",
    nivel:"principiante",
    colores: [],
    intentos:4
}

const niveles = {
    principiante:{
        intentos:10,
        colores:4
    },
    intermedio:{
        intentos:8,
        colores:5
    },
    avanzado:{
        intentos:6,
        colores:6
    }
}

function obtenerDatos() {
    datos = JSON.parse(sessionStorage.getItem("datosPartida"));
}

function guardarDatos(){
    let camposColores = Array.from(document.getElementsByClassName("color"));
    let coloresEscogidos = camposColores.map((colorEscogido) => colorEscogido.value);
    
    datos.colores = coloresEscogidos;  

    sessionStorage.setItem("datosPartida", JSON.stringify(datos));
    window.location.href = "juego.html";
}

function actualizarNumeroColores(){
    const contenedorColores = document.getElementById("contenedorColores");

    let nivel = datos.nivel;
    let numeroColores = niveles[nivel].colores;
    let coloresHtml = "";

    for(i=0; i<numeroColores; i++){
        let color = generarColorMuestraAleatorio();
        coloresHtml += `<input type = "color" class = "color" value = "${color}" />`
    }

    contenedorColores.innerHTML = coloresHtml; 
}

function generarColorMuestraAleatorio(){
    const valoresHexadecimales = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']; 
    let colorHexadecimal = '#';

    for(let i = 0; i < 6; i++){
        const indice = Math.floor(Math.random() * valoresHexadecimales.length)
        colorHexadecimal += valoresHexadecimales[indice];
    }

    return colorHexadecimal;
}

obtenerDatos();

document.getElementById("botonIniciarpartida").addEventListener("click", guardarDatos);

actualizarNumeroColores();
