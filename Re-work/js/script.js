// Consegna:
// Dato un array di oggetti letterali con:
//  - url dell’immagine
//  - titolo
//  - descrizione
// Creare un carosello come nella foto allegata.

// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico:
// costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
// 
//Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
// Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
// 
//Milestone 2: 
// Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima
// e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
//
// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
// 
//BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
// 
//BONUS 3:
// Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.

//!----------------------------------------------------------------------------------------------


// Da consegna ho un array di 5 oggetti:
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    },
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    },
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    },
    {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    },
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

// ?creo lo slider-items di destra
const sliderContainerRight = document.querySelector(".slider-items");
// ?carico esclusivamente le nuove immagini a destra, come concatenazione di stringhe usando template literal
for (let i = 0; i < images.length; i++) {
    const currentImage = images[i];
    const sliderItem = `<div class="item"><img src="${currentImage.image}" alt=""></div>`;
    sliderContainerRight.innerHTML += sliderItem;
    // console.log(sliderContainerRight.innerHTML);
}


//? creiamo dinamicamente il contenitore di sx con all'interno 3 fratelli ( img + h3 + h5) addando a loro determinate classi di css
//? li inserisco successivamente con al padre, ovvero il div container
//? dove compariranno dinamicamente ingrandita l'img selezionata di dx con titolo e subtitolo

const container = document.querySelector(".container");
const containerLeft = document.createElement("div");
containerLeft.classList.add("actual-image", "actual", "text-white", "col-9");
container.prepend(containerLeft);   //inserisco il container left come primo figlio del main container
containerLeft.innerHTML = `<div class="actual-image actual text-white col-9">               
                            <img src="${images[0].image}" alt="">
                            <h3 class="title">${images[0].title}</h3>
                            <h5 class="text">${images[0].text}</h5>
                            </div> `
//? Setto il senso di marcia che per mio default è avanti e sia il primo stato di non opacità alla prima immagine

let sensoMarciaAvanti = true;
let cardRight = document.getElementsByClassName("item");

// IMPOSTO PRIMO SLIDE OPACITA' 1
cardRight[0].classList.add("active");
let currentIndex = 0;
let start;
console.log(cardRight);



// !                                PROVIAMO A SPIEGARE LOGICA E FUNZIONI


autoplay();          //fa partire l'autoplay al caricamento pagina, in avanti per mia scelta          



const next = document.querySelector(".next");          // richiamo 2 buttoni presenti in html nello sliderContainerRight, l'avanti e l'indietro
const prev = document.querySelector(".prev");


next.addEventListener("click", function(){
    go();
});                                                     //sono 2 eventi tali per cui richiamando funzioni, fanno girare all'istante il carosello in avanti e dietro
                          
// e di conseguenza farà vedere all'istante a sx l'immagine corrispondente
prev.addEventListener("click", function(){
    sensoMarciaAvanti=false;
    go();
});





//*                                        **************



//! FUNZIONI



function go(){                      //?racchiude il succo delle altre 2 macro funzioni e vengono richiamate al click dei button nello slider
    clearInterval(start);                           
    sensoMarcia();    
    autoplay();
}


//?serve a far scorrere automaticamente le immagini della galleria ad intervalli di tempo regolari e a gestire l'evento click su ciascuna immagine
//? per permettere all'utente di passare manualmente all'immagine desiderata

function autoplay() {
    start = setInterval(() => {
        sensoMarcia();
        // Aggiungo l'event listener di click ad ogni immagine
        for (let i = 0; i < cardRight.length; i++) {
            cardRight[i].addEventListener("click", function() {
            clearInterval(start);                                                       // clear interval al click dell'immagine
            cardRight[currentIndex].classList.remove("active");                         // rimuovo la classe active dalla vecchia immagine
            currentIndex = i;                                                           // imposto il nuovo indice corrispondente all'immagine cliccata
            cardRight[currentIndex].classList.add("active");                            // aggiungo la classe active alla nuova immagine
            containerLeft.innerHTML = `<div class="actual-image actual text-white col-9">               
                                            <img src="${images[currentIndex].image}" alt="">
                                            <h3 class="title">${images[currentIndex].title}</h3>
                                            <h5 class="text">${images[currentIndex].text}</h5>
                                        </div>`;
            autoplay(); // riprendo l'autoplay
        });
        }

    },3000)
}




//? E' responsabile dello scorrimento effettivo delle immagini, in avanti o indietro a seconda della direzione di scorrimento impostata
//? tramite la variabile sensoMarciaAvanti. Questa funzione rimuove la classe .active dall'immagine precedente e la aggiunge all'immagine corrente,
//? e aggiorna anche il contenuto del container sinistro della galleria con le informazioni dell'immagine corrente.

function sensoMarcia (){
    if (sensoMarciaAvanti) {
        cardRight[currentIndex].classList.remove("active");                 
        currentIndex++;                                                     
        if (currentIndex === images.length) {                                 
            currentIndex = 0;
        }
        cardRight[currentIndex].classList.add("active");
    } else {
        cardRight[currentIndex].classList.remove("active");                 
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }
        cardRight[currentIndex].classList.add("active");
    }
         containerLeft.innerHTML = `<div class="actual-image actual text-white col-9">               
                                    <img src="${images[currentIndex].image}" alt="">
                                    <h3 class="title">${images[currentIndex].title}</h3>
                                    <h5 class="text">${images[currentIndex].text}</h5>
                                    </div> `

}



