/**
 * 1) generare casella in base ad un numero
 * 3) aggiungere valore difficolta
 * 4) fare tutto al click del button
 */

function difficultGame (choise) {
    //console.log (choise)
    if (choise == "Easy") {
        document.documentElement.style.setProperty('--square-size', '10');
        return 100; 
    } else if (choise == "Medium") {
        document.documentElement.style.setProperty('--square-size', '9');
        return 81;
    } else if (choise == "Hard") {
        document.documentElement.style.setProperty('--square-size', '7');
        return 49;
    }
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
    //console.log (level.value);
    let numberSquare = difficultGame (level.value);
    //console.log (numberSquare);
    for (let i=1; i<=numberSquare; i++) {
        const grid = document.createElement("div");
        grid.classList.add("square");
        grid.append (i);
        gridsGame.append(grid);
    }
    
    const singleSquare = document.querySelectorAll ("div.square");

    for (i=0; i<=numberSquare; i++) {
        singleSquare[i].addEventListener('click', function () {
            this.classList.add ("square-win-clicked");
        });
    }
});

