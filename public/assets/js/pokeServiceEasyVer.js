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

let bestScore = localStorage.getItem("bestScore") ? localStorage.getItem("bestScore") : 0; // Best score
let score = 0; // Current score
let pokeName = "";   // Name of the pokemon to guess

/**
 * Selects a random set of Pokemon and updates the UI accordingly.
 * @returns {Promise<void>} A promise that resolves when the Pokemon selection is complete.
 */
async function selectPokemon() {
    document.getElementById("surrend").onclick = null;
    document.getElementById("poke1").value = "";
    document.getElementById("poke2").value = "";
    document.getElementById("poke3").value = "";
    document.getElementById("poke4").value = "";
    document.getElementById("poke1").style.backgroundColor = "#313131";
    document.getElementById("poke2").style.backgroundColor = "#313131";
    document.getElementById("poke3").style.backgroundColor = "#313131";
    document.getElementById("poke4").style.backgroundColor = "#313131";
    document.getElementById("poke1").setAttribute("disabled", "true");
    document.getElementById("poke2").setAttribute("disabled", "true");
    document.getElementById("poke3").setAttribute("disabled", "true");
    document.getElementById("poke4").setAttribute("disabled", "true");
    document.getElementById("pokemonImg").style.display = "none";
    document.getElementById("pokemonImg").style.filter = "grayscale(100%) brightness(0%) drop-shadow(0 0 5px white)";
    document.getElementById("loading").style.display = "block";
    const generation = Object.keys(generationsNames)[Math.floor(Math.random() * Object.keys(generationsNames).length)];
    generationName = generationsNames[generation];
    let start = parseInt(generationName.start);
    let end = parseInt(generationName.end);
    const pokemonId = Math.floor(Math.random() * (end - start + 1)) + start;
    const pokemonPromise = getPokemonById(pokemonId);

    let pokemonChoise2 = getRandomPokemonId(pokemonId, start, end);
    let pokemonChoise3 = getRandomPokemonId(pokemonId, start, end);
    let pokemonChoise4 = getRandomPokemonId(pokemonId, start, end);

    const [pokemon, pokemon2, pokemon3, pokemon4] = await Promise.all([
        pokemonPromise,
        getPokemonById(pokemonChoise2),
        getPokemonById(pokemonChoise3),
        getPokemonById(pokemonChoise4),
    ]);

    const pokemons = [pokemon, pokemon2, pokemon3, pokemon4];
    pokemons.sort(() => Math.random() - 0.5);

    document.getElementById("poke1").value = pokemons[0].name;
    document.getElementById("poke2").value = pokemons[1].name;
    document.getElementById("poke3").value = pokemons[2].name;
    document.getElementById("poke4").value = pokemons[3].name;

    pokeName = pokemon.name;
    document.getElementById("pokemonImg").style.backgroundImage = "url(" + pokemon.image + ")";
    document.getElementById("pokemonImg").style.display = "block";
    document.getElementById("loading").style.display = "none";
    document.getElementById("poke1").removeAttribute("disabled");
    document.getElementById("poke2").removeAttribute("disabled");
    document.getElementById("poke3").removeAttribute("disabled");
    document.getElementById("poke4").removeAttribute("disabled");
    document.getElementById("surrend").onclick = surrend;
}

/**
 * Generates a random Pokemon ID within a specified range, excluding a specific ID.
 * @param {number} excludeId - The ID to exclude from the random generation.
 * @param {number} start - The starting ID of the range.
 * @param {number} end - The ending ID of the range.
 * @returns {number} - The randomly generated Pokemon ID.
 */
function getRandomPokemonId(excludeId, start, end) {
    let randomId;
    do {
        randomId = Math.floor(Math.random() * (end - start + 1)) + start;
    } while (randomId === excludeId);

    return randomId;
}


/**
 * Checks if the input value matches the pokeName value.
 * If the values match, it updates the score, changes the background color of the input to green,
 * disables the input, and calls the selectPokemon function after a delay of 2000 milliseconds.
 */
function check(event) {
    const input = event.target.value;
    if (input.toLowerCase() === pokeName.toLowerCase()) {
        updateScore("correct");
        document.getElementById("poke1").setAttribute("disabled", "true");
        document.getElementById("poke2").setAttribute("disabled", "true");
        document.getElementById("poke3").setAttribute("disabled", "true");
        document.getElementById("poke4").setAttribute("disabled", "true");
        event.target.style.backgroundColor = "green";
        document.getElementById("pokemonImg").style.filter = "none";
        setTimeout(selectPokemon, 2000);
    } else {
        updateScore("surrend");
        document.getElementById("poke1").setAttribute("disabled", "true");
        document.getElementById("poke2").setAttribute("disabled", "true");
        document.getElementById("poke3").setAttribute("disabled", "true");
        document.getElementById("poke4").setAttribute("disabled", "true");
        event.target.style.backgroundColor = "red";
        for (let i = 0; i < 4; i++) {
            if (document.getElementById("poke" + (i + 1)).value.toLowerCase() === pokeName.toLowerCase()) {
                document.getElementById("poke" + (i + 1)).style.backgroundColor = "green";
            }
        }
        document.getElementById("pokemonImg").style.filter = "none";
        setTimeout(selectPokemon, 2000);
    }
}

/**
 * Surrend function disables the pokeName input field, changes its background color to red,
 * sets its value to pokeName, and calls the selectPokemon function after a delay of 2000 milliseconds.
 */
function surrend() {
    updateScore("surrend");
    document.getElementById("poke1").setAttribute("disabled", "true");
    document.getElementById("poke2").setAttribute("disabled", "true");
    document.getElementById("poke3").setAttribute("disabled", "true");
    document.getElementById("poke4").setAttribute("disabled", "true");
    for (let i = 0; i < 4; i++) {
        if (document.getElementById("poke" + (i + 1)).value.toLowerCase() === pokeName.toLowerCase()) {
            document.getElementById("poke" + (i + 1)).style.backgroundColor = "green";
        }
    }
    document.getElementById("pokemonImg").style.filter = "none";
    setTimeout(selectPokemon, 2000);
}

/**
 * Updates the generation list based on the selected generation.
 * @param {string} gen - The selected generation.
 */
function updateGenerationList(gen) {
    if (Object.keys(generationsNames).length === 1 && Object.keys(generationsNames).includes(gen)) {
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
function updateScore(action) {
    if (action === "correct")
        score++;
    else if (action === "surrend") {
        score = 0;
    }
    if (score > bestScore) {
        localStorage.setItem("bestScore", score);
        bestScore = score;
    }
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("bestScore").innerHTML = "Best Score: " + bestScore
}

/**
 * Changes the mode by redirecting the user to the index.html page.
 */
function changeMode(){
    window.location.href = "./index.html";
}
