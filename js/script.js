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

//!òòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòòò


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


// ?carico esclusivamente le nuove immagini a destra
for (let i = 0; i < images.length; i++) {
    const imageS = images[i];
    const sliderItem = `<div class="item"><img src="${imageS.image}" alt=""></div>`;    
    sliderContainerRight.innerHTML += sliderItem;
    console.log(sliderContainerRight)
}

// ?creo un array contenente solo i title degli oggetti dell array principale

// ?creo un array contenente solo i text degli oggetti dell array principale


//Creo un ulteriore variabile che lego all'elemento o elementi html, in questo caso i div che conterranno le img, specificando
// con l'etichetta 0 in questo caso, che il primo elemento, oltre la classe di defaul .item gli si debba aggiungere anche
//la classe .active che nello specifico la faccia apparire anziche restare hidden come le altre

// IMPOSTO PRIMO SLIDE OPACITA' 1

let rowItemRight = document.getElementsByClassName("item");
let index = 0;
rowItemRight[index].classList.add("active");



// BONUS 2 

// creazione variabili legate ai 2 button

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
console.log(prev, next);


// ?creo variabile in cui nell'html conterrà a sinistra la card con l'attuale img + h2 + p
let card = document.querySelector(".actual-image");
console.log(card, typeof card);


// !#############################################################################

let autoPlay = 0;
let reverseAutoPlay = 0;
let sensoMarciaAvanti = true;
let contatore = 0;

// RICHIAMO IL PRIMO AUTOPLAY
generalAutoPlay();

// QUESTA E' LA FUNZIONE DI DEFAUL CHE ATTIVA L'AUTOPLAY IN AVANTI AL SEMPLICE CARICAMENTO DELLA PAGINA COMPRENDENDO ANCHE I CLICK E GLI HOVER
function generalAutoPlay() {
    firstAutoPlay = setInterval(() => {
        resetMouse();
        if (sensoMarciaAvanti === true) {
            // tolgo lo stato di opacita 1 all'img attuale sulla dx                 
            rowItemRight[index].classList.remove("active");
            // incremento l'indice
            index++;
            // Controllo per cominciare da capo
            if (index === images.length) {
                // rowItemRight[index].classList.remove("active");
                index = 0;
                // rowItemRight[index].classList.add("active");        
            }
            // ingrandisco a sx l'immagine selezionata
            card.innerHTML = `<img src="${images[index].image}" alt="Card">`;
            card.innerHTML += `<h3 class="title text-center">${images[index].title}</h3>`;
            card.innerHTML += `<h5 class="text text-center">${images[index].text}</h5>`;
            // aggiungo lo stato di opacità 1 all img successiva sulla dx
            rowItemRight[index].classList.add("active");
            contatore++;
            console.log(contatore, "lo slider gira in avanti dato che la variabile senso di marcia è: ", sensoMarciaAvanti);
        } else {
            // tolgo lo stato di non opacità all'img attuale
            rowItemRight[index].classList.remove("active");
            // decremento l'indice
            index--;
            // eseguo un HTMLFormControlsCollection, se l'indice diventa negativo, lo resetto alla max lunghezza
            if (index < 0) {
                index = images.length - 1;
            }
            // aggiungo lo stato di opacità all img successiva, o quella retro per meglio dire
            rowItemRight[index].classList.add("active");
            card.innerHTML = rowItemRight[index].innerHTML;

            contatore++;
            console.log(contatore, "lo slider gira all'indietro dato che la variabile senso di marcia è: ", sensoMarciaAvanti);
        }


        // Alla pressione del tasto next........
        next.addEventListener("click", nextBtn);

        // Alla pressione del tasto prev........
        prev.addEventListener("click", prevBtn);

        // BONUS 2

        // al passaggio dell'hover....
        document.querySelector(".actual-image").addEventListener("mouseover", () => {
            clearInterval(firstAutoPlay);
            resetMouse();
        });

        //al togliere dell'hover
        document.querySelector(".actual-image").addEventListener("mouseout", () => {
            clearInterval(firstAutoPlay);
            result();

        });

    }, 3000);
}

// Function del primo autoplay

function result() {
    generalAutoPlay();
}

// Function btns
function nextBtn() {
    contatore = 0;
    sensoMarciaAvanti = true;
    // BONUS 1 , SI TIENE CONTO DEL CLICK DEL MOUSE RESETTANDO I TIMER
    // resetto l'eventuale presenza del reverse autoplay    
    // clearInterval(reverseAutoPlay);
    // e resetto anche l'intervallo dell'autoplay affinche ad ogni click dell utente non si sovrapponi o si crei intervalli paralleli che creino caos
    // clearInterval(autoPlay);
    clearInterval(firstAutoPlay);
    generalAutoPlay();
}

// Function btns
function prevBtn() {
    contatore = 0;
    sensoMarciaAvanti = false;
    // BONUS 1 , SI TIENE CONTO DEL CLICK DEL MOUSE RESETTANDO I TIMER
    // resetto l'eventuale presenza dell autoplay standard
    // clearInterval(autoPlay);
    // e resetto anche l'intervallo del reverseautoplay affinche ad ogni click dell utente non si sovrapponi o si crei intervalli paralleli che creino caos
    // clearInterval(reverseAutoPlay);
    clearInterval(firstAutoPlay);
    generalAutoPlay();
}

// RESET DEI CONTATORI DEI TIMER 
function resetMouse() {
    clearInterval(reverseAutoPlay);
    clearInterval(autoPlay);
}
