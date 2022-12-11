// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];  

let nombre = document.querySelector('input[name="nombre"]');  
let partidas = document.querySelector('input[name="partidas"]'); 
var contador = 0;  

document.querySelectorAll("button")[0].addEventListener("click", validarJugar, false); 
document.querySelectorAll("button")[1].addEventListener("click", function(){ jugarYa()},false);
document.querySelectorAll("button")[2].addEventListener("click", reset, false);

function validarJugar() {
  const validacion = /^[a-zA-Zs]{4,}/;
  
  if (partidas.value > 0 && validacion.test(nombre.value)) {
    nombre.disabled = true;
    partidas.disabled = true;
	  nombre.classList.remove("fondoRojo");
	  partidas.classList.remove("fondoRojo");
	  document.getElementById("total").innerHTML = "<span>" + partidas.value + "</span>";    
    document.querySelectorAll("button")[1].disabled = false; 

  } else {
    if (validacion.test(nombre.value)) {
      nombre.classList.remove("fondoRojo");
    } else {
      nombre.classList.add("fondoRojo");
    }
    if (partidas.value > 0) {
      partidas.classList.remove("fondoRojo");
    } else {
      partidas.classList.add("fondoRojo");
    }
  }
}
// carga de imágenes
let img = document.querySelectorAll("#jugador>img");
let piedraHum = img[0]; 
let papelHum = img[1];
let tijeraHum = img[2];
piedraHum.src = "img/" + posibilidades[0] + "Jugador.png"; 
papelHum.src = "img/" + posibilidades[1] + "Jugador.png";
tijeraHum.src = "img/" + posibilidades[2] + "Jugador.png";

// selección 
piedraHum.addEventListener("click",function(){ piedraRoja(posibilidades[0])},false);  
papelHum.addEventListener("click", function(){ papelRojo(posibilidades[1])},false);
tijeraHum.addEventListener("click",function(){ tijeraRoja(posibilidades[2])}, false);

function piedraRoja(){
	
  piedraHum.classList.replace("noSeleccionado","seleccionado");
	papelHum.classList.replace("seleccionado","noSeleccionado");
	tijeraHum.classList.replace("seleccionado","noSeleccionado");
}
function papelRojo(){
papelHum.classList.replace("noSeleccionado","seleccionado");
piedraHum.classList.replace("seleccionado","noSeleccionado");
tijeraHum.classList.replace("seleccionado","noSeleccionado");

}
function tijeraRoja(){
	tijeraHum.classList.replace("noSeleccionado","seleccionado");
	papelHum.classList.replace("seleccionado","noSeleccionado");
	piedraHum.classList.replace("seleccionado","noSeleccionado");

}

let imgPC = document.querySelector("#maquina>img");

function jugarYa(opcionPC) {  
    
  var opcionHumano = document.querySelector(".seleccionado").getAttribute("src");
  var opcionHumanoIndex;  

  posibilidades.forEach(function(value, index){
    if (opcionHumano.includes(value)){ 
      opcionHumanoIndex = index;        
    } 
  });

  var opcionPC = posibilidades[Math.floor(Math.random()*posibilidades.length)];
  var opcionPCIndex = posibilidades.indexOf(opcionPC);
  imgPC.src ="img/" + opcionPC + "Ordenador.png"; 
  
  contador += 1;

  document.getElementsByTagName("span")[0].innerHTML = contador;

  var posibilidadesCount = posibilidades.length - 1;
  var historialHtml;
  
  if(opcionHumanoIndex == opcionPCIndex){
    historialHtml = "Empate";    
  }      
  else if ((opcionHumanoIndex == 0)  && (opcionPCIndex == posibilidadesCount)){
    historialHtml = "Gana " + nombre.value;
  }
  else if ( (opcionPCIndex == 0) && (opcionHumanoIndex == posibilidadesCount)){
    historialHtml = "Gana la máquina"
  }
  else if (opcionHumanoIndex > opcionPCIndex){
    historialHtml = "Gana " + nombre.value;
  }
  else if (opcionHumanoIndex < opcionPCIndex){
    historialHtml = "Gana la máquina";
  }

  const node = document.createElement("li");
  const textNode = document.createTextNode(historialHtml);
  node.appendChild(textNode);
  document.getElementById("historial").appendChild(node);

  if(contador == partidas.value){
    document.querySelectorAll("button")[1].disabled = true; 
  } 
 }

function reset(){
  nombre.disabled = false;
  partidas.disabled = false;
  partidas.value = 0;
  contador = 0;
  imgPC.src ="img/defecto.png"; 
  const node = document.createElement("p");
  const textNode = document.createTextNode("Nueva Partida");  
  node.appendChild(textNode);
  document.getElementById("historial").appendChild(node);
  
  document.getElementById("total").innerHTML = "<span>" + (partidas.value) + "</span>";
  document.getElementById("actual").innerHTML = "<span>" + (contador) + "</span>";
}



