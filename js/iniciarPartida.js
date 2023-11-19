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

function guardarDatos(evento){    
    evento.preventDefault();

    datos.usuario = document.getElementById("nombreUsuario").value; 

    if(datos.usuario !== "") {
        datos.nivel = document.getElementById("nivel").value;
        datos.intentos = niveles[datos.nivel].intentos;  
    
        sessionStorage.setItem("datosPartida", JSON.stringify(datos));
    
        window.location.href = "seleccionColores.html";
    }
}

sessionStorage.setItem("datosPartida", JSON.stringify(datos));

document.getElementById("botonAceptar").addEventListener("click", (evento) => guardarDatos(evento));
