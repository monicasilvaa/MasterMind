let parrafoActual = 0;
const flechaIzquierda= document.getElementById("flechaIzquierda");
const flechaDerecha= document.getElementById("flechaDerecha");

flechaIzquierda.addEventListener("click",()=>moverFlechas(-1));
flechaDerecha.addEventListener("click",()=>moverFlechas(1));

function moverFlechas(direccion){
    
    let parrafos = document.querySelectorAll('[id*="parrafo"]');

    parrafos[parrafoActual].classList.add("oculto");
    parrafoActual+=direccion;
    parrafos[parrafoActual].classList.remove("oculto");

    if(parrafoActual===0){
        flechaIzquierda.classList.add("oculto");
    } else if(parrafoActual===1){
        flechaIzquierda.classList.remove("oculto");
    }

    if(parrafoActual===parrafos.length-1){
        flechaDerecha.classList.add("oculto");
    }  else if(parrafoActual===parrafos.length-2){
        flechaDerecha.classList.remove("oculto");
    }
}
