let datos={
    usuario:"",
    nivel:"principiante",
    colores: [],
    intentos:4
}

function obtenerDatos() {
    datos = JSON.parse(sessionStorage.getItem("datosPartida"));
}

function crearFilas() {
    const tablero = document.getElementById("tablero");

    for(let i = 0; i < datos.intentos;i++) {
        let filas = document.createElement("div");
        let filaVerificacion = document.createElement("div");
        let filaIntentos = document.createElement("div");
        let fila = document.createElement("div");
        let filab = document.createElement("div");
        
        filas.classList.add("filas");
        filaVerificacion.classList.add("filasVerificacion")
        filaIntentos.classList.add("filasIntentos")

        fila.classList.add("fila");
        filab.classList.add("fila");


        for(let bola = 0; bola < datos.colores.length; bola++) {
            let bolaElemento = document.createElement("div");
            let bolaElementob = document.createElement("div");
            
            bolaElemento.classList.add("bola");
            bolaElemento.classList.add("hueco");

            bolaElementob.classList.add("bola");
            bolaElementob.classList.add("hueco");

            fila.append(bolaElemento);
            filab.append(bolaElementob);
        }

        filaVerificacion.append(fila);
        filaIntentos.append(filab);
        
        filas.append(filaVerificacion);
        filas.append(filaIntentos);

        tablero.append(filas);
    }
}

function mostrarColores() {
    const contenedorColores = document.getElementById("contenedorColores");
    
    for(let color of datos.colores){
        let divColor = document.createElement("div");

        divColor.classList.add("caja-color");
        divColor.style.backgroundColor = color;
        divColor.addEventListener("click", (evento) => seleccionarColor(evento));

        contenedorColores.append(divColor);
    }
}

function seleccionarColor(evento) {
    const elementoColor = evento.currentTarget;
    const cajasColor = Array.from(document.getElementsByClassName("caja-color"));
    const filasIntentos = document.getElementsByClassName("filasIntentos");
    const indice = datos.intentos - intentoActual;
    const bolaIntento = filasIntentos[indice].querySelector(".bola.hueco:not(.relleno)");
    const indiceColor = cajasColor.indexOf(elementoColor);
    
    if(bolaIntento !== null){
        bolaIntento.style.backgroundColor = elementoColor.style.backgroundColor;
        bolaIntento.classList.add("relleno");
        combinacionUsuario.push(datos.colores[indiceColor]);
    }

}

function generarCombinacionGanadora() {
    let combinacion = [];
    let coloresDisponibles = [...datos.colores];

    while(combinacion.length < datos.colores.length) {
        let indiceAleatorio = Math.floor(Math.random()*coloresDisponibles.length);
        combinacion.push(coloresDisponibles[indiceAleatorio]);
        coloresDisponibles.splice(indiceAleatorio,1);
    }

    return combinacion;
}

function comprobarResultado() {
    const coloresVerificacion = ['#FFFFFF', '#490CB5'];
    const filasVerificacion = document.getElementsByClassName("filasVerificacion");
    const indice = datos.intentos - intentoActual;
    const bolasVerificacion = filasVerificacion[indice].querySelectorAll(".bola.hueco:not(.relleno)");
    const coloresComprobados = [];

    let ganador = true;

    if(intentoActual > datos.intentos || (combinacionUsuario.length == 0 || combinacionUsuario.length < datos.colores.length)){
        return false;
    }

    for(let i = 0; i < combinacionGanadora.length;i++) {
        let color = combinacionGanadora[i];

        //1 - comprobamos si coincide color y posición en la combinación
        correcto = (combinacionUsuario[i] === color);
        //2 - Si la comprobación anterior es false, ya no es posible que sea ganador
        if(!correcto){
            ganador = false;
        }

        //3 - Comprobamos si el color se habia verificado, en caso de que no se haya verificado comprobamos si existe en la combinación
        if(!coloresComprobados.includes(combinacionUsuario[i]))
        {
            bolasVerificacion[i].style.backgroundColor = coloresVerificacion[Number(correcto)];
            coloresComprobados.push(combinacionUsuario[i]);
        }
    }

    if(ganador) {
        window.location.href = "ganador.html";
    }
    else if(intentoActual == datos.intentos && !ganador) {
        datos.combinacionGanadora = combinacionGanadora;
        sessionStorage.setItem("datosPartida", JSON.stringify(datos));

        window.location.href = "derrota.html";
    }

    intentoActual++;
    combinacionUsuario = [];
}

obtenerDatos();

if(datos.usuario == "") {
    window.location.href = "iniciarPartida.html";
}

if(datos.colores.length == 0) {
    window.location.href = "seleccionColores.html";
}

const btnValidar = document.getElementById("botonValidar");

let combinacionUsuario = [];
let intentoActual = 1;


const combinacionGanadora = generarCombinacionGanadora();

crearFilas();

mostrarColores();

btnValidar.addEventListener("click", comprobarResultado);


