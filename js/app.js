
//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");

let tweets = [];

//EventListener
eventListeners();

function eventListeners() {
    //Usuario agrega nuevo tweet
    formulario.addEventListener("submit", agregarTweet);

    //Documento esta listo
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];

        console.log(tweets);

        crearHTML();
    });
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

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    
    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    
    //Una vez agregado, creamos el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
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

//Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            //Agregar boton de eliminar
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.innerHTML = "X";

            //Añadir funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear HTML
            const li = document.createElement('li');

            //Añadir texto
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//Agregar tweets actuales a localStorage
function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

//borrar tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    
    crearHTML();
}

//Limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}