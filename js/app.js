
//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");

let tweets = [];

//EventListener
eventListeners();

function eventListeners() {
    formulario.addEventListener("submit", agregarTweet);
}

//Funciones
function agregarTweet(e) {
    e.preventDefault();

    //Textarea 
    const tweet = document.querySelector("#tweet").value;

    //Validacion
    if(tweet.trim() === "") {
        mostrarError("Debes ingresar un mensaje");
        return; //evita que se ejecutan mas lineas de codigo
    }
    
    //Añadir al arreglo de tweets
}

//Mostrar Mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");

    //Insertar error en contenido
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
}