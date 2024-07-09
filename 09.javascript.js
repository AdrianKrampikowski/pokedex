let allPokemon = [];
let matchedCounter = 0;

async function init() {
  const loadingTimeout = setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.body.style.overflow = "auto";
  }, 20000);

  await getPokemon();
  clearTimeout(loadingTimeout);
  document.getElementById("loader").style.display = "none";
  document.body.style.overflow = "auto";
}

async function getPokemon() {
  const fetchPromises = [];
  for (let i = 1; i <= 50; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    fetchPromises.push(fetch(url).then(response => response.json()));
  }

  allPokemon = await Promise.all(fetchPromises);
  createPokemonContainer();
}

function createPokemonContainer() {
  const container = document.getElementById('pokemonContainer');
  container.innerHTML = '';

  allPokemon.forEach((pokemon, index) => {
    const primary1 = pokemon.types[0].type.name;
    const primary2 = pokemon.types[1] ? pokemon.types[1].type.name : null;
    const pokemonNameForGif = pokemon.name.replace("-", "_");

    container.innerHTML += createPokemonContainerHTML(index, primary1, primary2, pokemonNameForGif);
    changeBackgroundColor(index);
    changeBackgroundColorButton(index);
  });
}

function createPokemonContainerHTML(i, primary1, primary2, pokemonNameForGif) {
  return `
    <div class="col">
      <div class="card" data-bs-toggle="modal" data-bs-target="#exampleModal" id="card${i}" onclick="createPokemonInfoCard(${i})">
        <div class="card-body">
          <div class="pokemonCardHeader">
            <h5 class="card-title">${allPokemon[i].name}</h5>
            <div class="pokemonId" id="pokemon${i}">#${allPokemon[i].id}</div>
          </div>        
          <img src="https://projectpokemon.org/images/normal-sprite/${pokemonNameForGif}.gif" class="card-img-top pokemonGif" alt=" ">
          <div class="pokemonImgAndButton">
            <div class="buttonContainer">
              <button type="button" class="btn btn-primary" id="primary1${i}">${primary1}</button>
              <button type="button" class="btn btn-primary" id="primary2${i}">${primary2}</button>  
            </div>
            <img src="${allPokemon[i].sprites.other.dream_world.front_default}" class="card-img-top pokemonImg figure" alt="...">
          </div>
          <img class="pokeballImg" src="img/pokeball.jpg"> 
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered"></div>
    </div>
  `;
}

function createPokemonInfoCard(i) {
  const primary1 = allPokemon[i].types[0].type.name;
  const primary2 = allPokemon[i].types[1] ? allPokemon[i].types[1].type.name : null;
  document.getElementById('exampleModal').innerHTML = createPokemonInfoCardHTML(i, primary1, primary2);

  const primaryButton = document.getElementById('primary2' + i);
  if (!primary2) {
    primaryButton.style.display = 'none';
  }

  changePokemonInfoBackgroundColor(i);
  changeBackgroundColorButton(i);
}

function createPokemonInfoCardHTML(i, primary1, primary2) {
  const pokemon = allPokemon[i];
  return `
    <div class="modal-content" id="modalContent${i}">
      <div class="modal-header">
        <div class="pokemonInfoTitelAndCloseButton">
          <img class="pokeballPokemonInfoImg" src="img/pokeball.jpg"> 
          <h1 class="modal-title fs-5" id="exampleModalLabel">${pokemon.name}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="pokemonInfoAttributeAndImg">
          <div class="pokemonInfoAttributeButton">
            <button type="button" class="btn btn-primary" id="primary1${i}">${primary1}</button>
            <button type="button" class="btn btn-primary" id="primary2${i}">${primary2}</button> 
          </div>
          <div class="modal-body">
            <img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top pokemonImg" alt="...">
          </div>
        </div>
        <div class="aboutContainer">
          <div class="aboutContainerInner">
            <div class="frontStats">
              <div><h2>About</h2></div>
              <div>
                <div class="aboutStats"><div class="aboutStatsName">Name</div><div>${pokemon.name}</div></div>
                <div class="aboutStats"><div class="aboutStatsName">Height</div><div>0.${pokemon.height}m</div></div>
                <div class="aboutStats"><div class="aboutStatsName">Weight</div><div>${pokemon.weight}kg</div></div>
                <div class="aboutStats"><div class="aboutStatsName">Abilities</div><div>${pokemon.abilities.map(a => a.ability.name).join(', ')}</div></div>
              </div>
            </div>
            <div class="backStats">
              <h2>Base Stats</h2>
              ${pokemon.stats.map(stat => `
                <div class="aboutStats">
                  <div class="aboutBaseStatsName">${stat.stat.name}</div>
                  <div>${stat.base_stat}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function changeBackgroundColorButton(i) {
  changeBackgroundColorButtonPrimary(i, 0);
  changeBackgroundColorButtonPrimary(i, 1);
}

function changeBackgroundColorButtonPrimary(i, typeIndex) {
  const primary = document.getElementById(`primary${typeIndex + 1}${i}`);
  const pokemonAttribute = allPokemon[i].types[typeIndex] ? allPokemon[i].types[typeIndex].type.name : null;

  if (pokemonAttribute) {
    primary.style.backgroundColor = getBackgroundColor(pokemonAttribute);
    if (pokemonAttribute === "normal" || pokemonAttribute === "electric" || pokemonAttribute === "fighting") {
      primary.style.color = "black";
    }
  }
}

function getBackgroundColor(pokemonType) {
  const colors = {
    grass: "rgba(0, 125, 0, 0.8)",
    fire: "rgba(125, 0, 0, 0.8)",
    water: "rgba(0, 0, 225, 0.7)",
    bug: "rgba(150, 150, 50, 0.8)",
    normal: "rgba(225, 250, 225, 0.8)",
    poison: "rgba(150, 0, 150, 0.8)",
    electric: "rgba(255, 255, 100, 0.8)",
    ground: "rgba(150, 100, 0, 0.8)",
    fairy: "rgba(255, 100, 100, 0.8)",
    fighting: "rgba(255, 255, 255, 0.8)",
    psychic: "rgba(150, 0, 150, 0.8)",
    rock: "rgba(100, 100, 100, 0.8)",
    ice: "rgba(125, 155, 255, 0.8)",
    ghost: "rgba(50, 25, 50, 0.8)"
  };

  return colors[pokemonType] || "rgba(255, 255, 255, 0.8)";
}

function changeBackgroundColor(i) {
  const cardColor = document.getElementById('card' + i);
  cardColor.style.backgroundColor = getBackgroundColor(allPokemon[i].types[0].type.name);
}

function changePokemonInfoBackgroundColor(i) {
  const cardColor = document.getElementById('modalContent' + i);
  cardColor.style.backgroundColor = getBackgroundColor(allPokemon[i].types[0].type.name);
}

function searchPokemon(value) {
  const input = value.toLowerCase();
  const matchedPokemon = allPokemon.filter(pokemon => pokemon.name.includes(input));

  document.getElementById('pokemonContainer').innerHTML = '';
  matchedCounter = 0;
  matchedPokemon.forEach((pokemon, index) => createMatchedPokemonContainer(index));
}

function createMatchedPokemonContainer(i) {
  const primary1 = allPokemon[i].types[0].type.name;
  const primary2 = allPokemon[i].types[1] ? allPokemon[i].types[1].type.name : null;
  const pokemonNameForGif = allPokemon[i].name.replace("-", "_");

  document.getElementById('pokemonContainer').innerHTML += createPokemonContainerHTML(i, primary1, primary2, pokemonNameForGif);
  changeBackgroundColor(i);
  changeBackgroundColorButton(i);
}