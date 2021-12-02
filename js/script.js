/**
 * 1) generare casella in base ad un numero
 * 3) aggiungere valore difficolta
 * 4) fare tutto al click del button
 */

//in base al valore della difficoltà creare tot caselle
function difficultGame (choise) {
    //console.log (choise)
    if (choise == "Easy") {
        document.documentElement.style.setProperty('--square-size', '7');
        return 100; 
    } else if (choise == "Medium") {
        document.documentElement.style.setProperty('--square-size', '9');
        return 81;
    } else if (choise == "Hard") {
        document.documentElement.style.setProperty('--square-size', '10');
        return 49;
    }
}

//generazione numeri delle caselle bomba
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const button = document.querySelector (".header-dx button");
const level = document.getElementById ("difficolta");

button.addEventListener('click', function () {
    //creazione delle celle con numero in ordine crescente
    const element = this;
    let gridsGame = document.querySelector (".grids-game");
    gridsGame.innerHTML = "";
    let container = document.querySelector (".container h1");
    container.innerHTML = "";
    let numberSquare = difficultGame (level.value);

    //creazione delle celle im base alla difficoltà
    for (let i=1; i<=numberSquare; i++) {
        const grid = document.createElement("div");
        grid.classList.add("square");
        grid.append (i);
        gridsGame.append(grid);
    }

    //generazione numeri casuali unici
    let numeriCasuali = [];
    for (let i=0; i<=15; i++) {
        numeroCasuale = getRndInteger(0, numberSquare);
        while (numeriCasuali.includes(numeroCasuale)) { //controllo se e incluso in array, e ne genero uno nuovo finche e presente
            numeroCasuale = getRndInteger(0, numberSquare);
        }
        numeriCasuali.push(numeroCasuale);
    }
    
    const singleSquare = document.querySelectorAll ("div.square");

    //generazione classi none che diventeranno rosse quando perdi
    for (let i=0; i<=numberSquare; i++) {
        for (let y=0; y<=numberSquare; y++) {
            if (i == numeriCasuali[y]) {
                //console.log (i, numeriCasuali[y]);
                singleSquare[numeriCasuali[y]].classList.add("square-lose-none");
            }
        }
    }
    //console.log (numeriCasuali);

    //conta del punti 
    let conta = 0;

    for (i=0; i<numberSquare; i++) {
        //se non c'è classe none colora la cella di blu e aumenta il punteggio
        singleSquare[i].addEventListener('click', function () {
            this.classList.add ("square-win-clicked");
            conta = conta + 1;
            
            //se presente la classe none togliere la classe ed aggiungere quella rossa
            if (this.classList.contains ("square-lose-none")) {
                alert ("HAI PERSO, PUNTI: " + (conta-1));
                for (let y=0; y<=numberSquare; y++) {
                    if (singleSquare[y].classList.contains ("square-lose-none")) {
                            singleSquare[y].classList.remove ("square-lose-none");
                            singleSquare[y].classList.add ("square-lose-clicked");
                            setTimeout(function(){
                                window.location.reload(1);
                            }, 1000);
                    } 
                }
            }

            //coso della vittoria
            if (conta == (numberSquare-16)) {
                alert ("HAI VINTO");
            }
        });
    }
});


