window.onload = function () {
    document.getElementById("bestScore").innerHTML = "Best Score: " + bestScore;
    selectPokemon();
}

const pokedexData = json;
const gen1 = pokedexData.gen1;
const gen2 = pokedexData.gen2;
const gen3 = pokedexData.gen3;
const gen4 = pokedexData.gen4;
const gen5 = pokedexData.gen5;
const gen6 = pokedexData.gen6;
const gen7 = pokedexData.gen7;
const gen8 = pokedexData.gen8;
const gen9 = pokedexData.gen9;
const past = pokedexData.past;
const generationsNames = { gen1, gen2, gen3, gen4, gen5, gen6, gen7, gen8, gen9, past }; // List of generations
const backup = { gen1, gen2, gen3, gen4, gen5, gen6, gen7, gen8, gen9, past }; // Backup of generations

let bestScore = localStorage.getItem("bestScore")? localStorage.getItem("bestScore") : 0; // Best score
let score = 0; // Current score
let pokeName = "";   // Name of the pokemon to guess


/**
 * Selects a random Pokemon and updates the UI accordingly.
 * @returns {Promise<void>} A promise that resolves once the Pokemon is selected and the UI is updated.
 */
async function selectPokemon() {
    console.log(bestScore)
    document.getElementById("pokeName").style.backgroundColor = "#313131";
    document.getElementById("pokeName").value = "";
    document.getElementById("pokemonImg").style.display = "none";
    document.getElementById("loading").style.display = "block";
    const generation = Object.keys(generationsNames)[Math.floor(Math.random() * Object.keys(generationsNames).length)];
    generationName = generationsNames[generation];
    let start = parseInt(generationName.start);
    let end = parseInt(generationName.end);
    const pokemonId = Math.floor(Math.random() * (end - start + 1)) + start;
    const pokemon = await getPokemonById(pokemonId);
    document.getElementById("pokeName").removeAttribute("disabled");
    pokeName = pokemon.name;
    document.getElementById("pokemonImg").style.backgroundImage = "url(" + pokemon.image + ")";

    document.getElementById("pokemonImg").style.display = "block";
    document.getElementById("loading").style.display = "none";
}

/**
 * Checks if the input value matches the pokeName value.
 * If the values match, it updates the score, changes the background color of the input to green,
 * disables the input, and calls the selectPokemon function after a delay of 2000 milliseconds.
 */
function check() {
    const input = document.getElementById("pokeName").value;
    if (input.toLowerCase() === pokeName.toLowerCase()) {
        updateScore();
        document.getElementById("pokeName").style.backgroundColor = "green";
        document.getElementById("pokeName").setAttribute("disabled", "true");
        setTimeout(selectPokemon, 2000);
    }
}

/**
 * Surrend function disables the pokeName input field, changes its background color to red,
 * sets its value to pokeName, and calls the selectPokemon function after a delay of 2000 milliseconds.
 */
function surrend() {
    document.getElementById("pokeName").setAttribute("disabled", "true");
    document.getElementById("pokeName").style.backgroundColor = "red";
    document.getElementById("pokeName").value = pokeName;
    setTimeout(selectPokemon, 2000);
}

/**
 * Updates the generation list based on the selected generation.
 * @param {string} gen - The selected generation.
 */
function updateGenerationList(gen) {
    if(Object.keys(generationsNames).length === 1 && Object.keys(generationsNames).includes(gen)) {
        return;
    }
    const index = Object.keys(generationsNames).indexOf(gen);
    let formattedGen = "";
    if (gen == "past") {
        formattedGen = "Past";
    } else {
        formattedGen = gen.charAt(0).toUpperCase() + gen.slice(1, gen.length - 1) + " " + gen.charAt(gen.length - 1);
    }
    if (index === -1) {
        document.getElementById(gen).innerHTML = formattedGen + " &nbsp;&nbsp;&nbsp; ✓";
        generationsNames[gen] = backup[gen];
    }
    else {
        document.getElementById(gen).innerHTML = formattedGen + " &nbsp;&nbsp;&nbsp; ✗"; 
        delete generationsNames[gen];
    }
}

/**
 * Updates the score and best score in the game.
 */
function updateScore() {
    score++;
    if(score > bestScore) {
        localStorage.setItem("bestScore", score);
        bestScore = score;
    }
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("bestScore").innerHTML = "Best Score: " + bestScore
}
