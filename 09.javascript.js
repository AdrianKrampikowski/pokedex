let allPokemon = [];
let allMatchedPokemon = [];
let counter = 20;
let i = 1;
let matchedCounter = 0;

async function init() {
  let loadingTimeout;

  // Funktion, um den Timeout aufzurufen
  function setLoadingTimeout() {
    document.getElementById("loader").style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Überwacht das Laden der Daten und ruft den Timeout auf, wenn fertig
  async function watchDataLoading() {
    while (allPokemon.length < 50) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Kurze Pause
    }
    clearTimeout(loadingTimeout); // Abbricht den ursprünglichen Timeout
    setLoadingTimeout(); // Ruft den Timeout manuell auf
  }

  // Startet das Überwachen des Datenladens
  watchDataLoading();

  await getPokemon();
}

async function getPokemon() {
  await new Promise(resolve => setTimeout(resolve, 5000));
  for (let i = 1; i < 51; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + i;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    allPokemon.push(currentPokemon);
  }
  createPokemonContainer();
}

function createPokemonContainer() {
  for (let i = 0; i < allPokemon.length; i++) {

    let primary1 = allPokemon[i]["types"][0]["type"]["name"];
    let primary2 = allPokemon[i]["types"][1] ? allPokemon[i]["types"][1]["type"]["name"] : null;
    let pokemonNameForGif = allPokemon[i]['name'];
    pokemonNameForGif = pokemonNameForGif.replace("-", "_");
    document.getElementById('pokemonContainer').innerHTML += createPokemonContainerHTML(i, primary1, primary2, pokemonNameForGif);
    changeBackgroundColor(i);
    changeBackgroundColorButton(i);
  }
}

function createPokemonContainerHTML(i, primary1, primary2, pokemonNameForGif) {
  return `
    <div class="col">
    <div class="card" data-bs-toggle="modal" data-bs-target="#exampleModal" id="card${i}" onclick="createPokemonInfoCard(${i})">
    <div class="card-body">
    <div class="pokemonCardHeader">
    <h5 class="card-title">${allPokemon[i]['name']}</h5>
    <div class="pokemonId" id="pokemon${i}">#${allPokemon[i]['id']}</div>
    </div>        
    <img src="https://projectpokemon.org/images/normal-sprite/${pokemonNameForGif}.gif" class="card-img-top pokemonGif" alt=" ">
    <div class="pokemonImgAndButton">
    <div class="buttonContainer">
    <button type="button" class="btn btn-primary" id="primary1${i}">${primary1}</button>
    <button type="button" class="btn btn-primary" id="primary2${i}">${primary2}</button>  
    </div>
    <img src="${allPokemon[i]['sprites']['other']['dream_world']['front_default']}" class="card-img-top pokemonImg  figure" alt="...">
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
  let primary1 = allPokemon[i]["types"][0]["type"]["name"];
  let primary2 = allPokemon[i]["types"][1] ? allPokemon[i]["types"][1]["type"]["name"] : null;
  document.getElementById('exampleModal').innerHTML = createPokemonInfoCardHTML(i, primary1, primary2);
  pokemonCarfInfoStyle(primary2);
  let primaryButton = document.getElementById('primary2' + i);
  if (primary2 == null) {
    primaryButton.style.display = 'none';
  }
  changePokemonInfoBackgroundColor(i);
  changeBackgroundColorButton(i);


  function pokemonCarfInfoStyle(primary2) {
  }
}

function createPokemonInfoCardHTML(i, primary1, primary2) {
  return `
  <div class="modal-content" id="modalContent${i}">
    <div class="modal-header">
    <div class="pokemonInfoTitelAndCloseButton">
    <img class="pokeballPokemonInfoImg" src="img/pokeball.jpg"> 
      <h1 class="modal-title fs-5" id="exampleModalLabel">${allPokemon[i]['name']}</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="pokemonInfoAttributeAndImg">
    <div class="pokemonInfoAttributeButton">
      <button type="button" class="btn btn-primary" id="primary1${i}">${primary1}</button>
      <button type="button" class="btn btn-primary" id="primary2${i}">${primary2}</button> 
      </div>
      <div class="modal-body">
      <img src="${allPokemon[i]['sprites']['other']['dream_world']['front_default']}" class="card-img-top pokemonImg" alt="...">
      </div>
      </div>

    <div class="aboutContainer">
      <div class="aboutContainerInner">
          <div class="frontStats">
            <div>
            <h2>About</h2> 
            </div>
            <div>
              <div class="aboutStats">
                <div class="aboutStatsName">Name</div><div>${allPokemon[i]['name']}</div>
              </div>
              <div class="aboutStats">
                <div class="aboutStatsName">Height</div><div>0.${allPokemon[i]['height']}m</div>
              </div>
              <div class="aboutStats">
                <div class="aboutStatsName">Weight</div><div>${allPokemon[i]['weight']}kg</div>
              </div>
              <div class="aboutStats">
                <div class="aboutStatsName">Abilities</div><div>${allPokemon[i]['abilities'][0]['ability']['name']}, ${allPokemon[i]['abilities'][1]['ability']['name']}</div>
            </div>
          </div>
        </div>

        <!--BackCard-->
        <div class="backStats">
          <h2>Base Stats </h2>
          <div class="aboutStats">
            <div class="aboutBaseStatsName">${allPokemon[i]['stats'][0]['stat']['name']}</div>
            <div>${allPokemon[i]['stats'][0]['base_stat']}</div>
          </div>
          <div class="aboutStats">
            <div class="aboutBaseStatsName">${allPokemon[i]['stats'][1]['stat']['name']}</div>
            <div>${allPokemon[i]['stats'][1]['base_stat']}</div>
          </div>
          <div class="aboutStats">
            <div class="aboutBaseStatsName">${allPokemon[i]['stats'][2]['stat']['name']}</div>
            <div>${allPokemon[i]['stats'][2]['base_stat']}</div>
          </div>
          <div class="aboutStats">
            <div class="aboutBaseStatsName">${allPokemon[i]['stats'][3]['stat']['name']}</div>
            <div>${allPokemon[i]['stats'][3]['base_stat']}</div>
          </div>
          <div class="aboutStats">
            <div class="aboutBaseStatsName">${allPokemon[i]['stats'][4]['stat']['name']}</div>
            <div>${allPokemon[i]['stats'][4]['base_stat']}</div>
          </div>
        </div>
      </div>
    </div>
    `;
}

function changeBackgroundColorButton(i) {
  changeBackgroundColorButtonPrimary1(i);
  changeBackgroundColorButtonPrimary2(i);
}

function changeBackgroundColor(i) {
  let cardColor = document.getElementById('card' + i);
  let primary2 = document.getElementById('primary2' + i);

  if (primary2.innerHTML == "null") {
    primary2.style.display = 'none';
  }
  let pokemonType = allPokemon[i]["types"][0]["type"]["name"];
  if (pokemonType == "grass") {
    cardColor.style.backgroundColor = "rgba(0, 125, 0, 0.8)"
  } else if (pokemonType == "fire") {
    cardColor.style.backgroundColor = "rgba(125, 0, 0, 0.8)"
  }
  else if (pokemonType == "water") {
    cardColor.style.backgroundColor = "rgba(0, 0, 225, 0.7)"
  }
  else if (pokemonType == "bug") {
    cardColor.style.backgroundColor = "rgba(150, 150, 50, 0.8)"
  }
  else if (pokemonType == "normal") {
    cardColor.style.backgroundColor = "rgba(225, 250, 225, 0.8)"
  }
  else if (pokemonType == "poison") {
    cardColor.style.backgroundColor = "rgba(150, 0, 150, 0.8)"
  }
  else if (pokemonType == "electric") {
    cardColor.style.backgroundColor = "rgba(255, 255, 100, 0.8)"
  }
  else if (pokemonType == "ground") {
    cardColor.style.backgroundColor = "rgba(150, 100, 0, 0.8)"
  }
  else if (pokemonType == "fairy") {
    cardColor.style.backgroundColor = "rgba(255, 100, 100, 0.8)"
  }
  else if (pokemonType == "fighting") {
    cardColor.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
  }
  else if (pokemonType == "psychic") {
    cardColor.style.backgroundColor = "rgba(150, 0, 150, 0.8)"
  }
  else if (pokemonType == "rock") {
    cardColor.style.backgroundColor = "rgba(100, 100, 100, 0.8)"
  }
  else { //Ghost
    cardColor.style.backgroundColor = "rgba(50, 25, 50, 0.8)"
  }
}

function changeBackgroundColorButtonPrimary1(i) {
  let primary1 = document.getElementById('primary1' + i);

  let pokemonAttribute1 = allPokemon[i]["types"][0]["type"]["name"];
  if (pokemonAttribute1 == "grass") {
    primary1.style.backgroundColor = "rgba(0, 125, 0, 0.8)";
  } else if (pokemonAttribute1 == "fire") {
    primary1.style.backgroundColor = "rgba(125, 0, 0, 0.8)";
  }
  else if (pokemonAttribute1 == "fire") {
    primary1.style.backgroundColor = "rgba(125, 0, 0, 0.8)";
  }
  else if (pokemonAttribute1 == "water") {
    primary1.style.backgroundColor = "rgba(0, 0, 225, 0.7)";
  }
  else if (pokemonAttribute1 == "bug") {
    primary1.style.backgroundColor = "rgba(150, 150, 50, 0.8)";
  }
  else if (pokemonAttribute1 == "normal") {
    primary1.style.backgroundColor = "rgba(225, 250, 225, 0.8)";
    primary1.style.color = "black";
  }
  else if (pokemonAttribute1 == "poison") {
    primary1.style.backgroundColor = "rgba(150, 0, 150, 0.8)";
  }
  else if (pokemonAttribute1 == "electric") {
    primary1.style.backgroundColor = "rgba(255, 255, 100, 0.8)";
    primary1.style.color = "black";
  }
  else if (pokemonAttribute1 == "ground") {
    primary1.style.backgroundColor = "rgba(150, 100, 0, 0.8)";
  }
  else if (pokemonAttribute1 == "fairy") {
    primary1.style.backgroundColor = "rgba(255, 100, 100, 0.8)";
  }
  else if (pokemonAttribute1 == "fighting") {
    primary1.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    primary1.style.color = "black";
  }
  else if (pokemonAttribute1 == "psychic") {
    primary1.style.backgroundColor = "rgba(150, 0, 150, 0.8)";
  }
  else if (pokemonAttribute1 == "rock") {
    primary1.style.backgroundColor = "rgba(100, 100, 100, 0.8)";
  }
  else if (pokemonAttribute1 == "ice") {
    primary1.style.backgroundColor = "rgba(125, 155, 255, 0.8)";
  }
  else { //Ghost
    primary1.style.backgroundColor = "rgba(50, 25, 50, 0.8)";
  }
}

function changeBackgroundColorButtonPrimary2(i) {
  let primary2 = document.getElementById('primary2' + i);

  let pokemonAttribute1 = allPokemon[i]["types"][1] ? allPokemon[i]["types"][1]["type"]["name"] : null;
  if (pokemonAttribute1 != null) {
    if (pokemonAttribute1 == "grass") {
      primary2.style.backgroundColor = "rgba(0, 125, 0, 0.8)";
    }
    else if (pokemonAttribute1 == "fire") {
      primary2.style.backgroundColor = "rgba(125, 0, 0, 0.8)";
    }
    else if (pokemonAttribute1 == "fire") {
      primary2.style.backgroundColor = "rgba(125, 0, 0, 0.8)";
    }
    else if (pokemonAttribute1 == "water") {
      primary2.style.backgroundColor = "rgba(0, 0, 225, 0.7)";
    }
    else if (pokemonAttribute1 == "bug") {
      primary2.style.backgroundColor = "rgba(150, 150, 50, 0.8)";
    }
    else if (pokemonAttribute1 == "normal") {
      primary2.style.backgroundColor = "rgba(225, 250, 225, 0.8)";
    }
    else if (pokemonAttribute1 == "poison") {
      primary2.style.backgroundColor = "rgba(150, 0, 150, 0.8)";
    }
    else if (pokemonAttribute1 == "electric") {
      primary2.style.backgroundColor = "rgba(255, 255, 100, 0.8)";
    }
    else if (pokemonAttribute1 == "ground") {
      primary2.style.backgroundColor = "rgba(150, 100, 0, 0.8)";
    }
    else if (pokemonAttribute1 == "fairy") {
      primary2.style.backgroundColor = "rgba(255, 100, 100, 0.8)";
    }
    else if (pokemonAttribute1 == "fighting") {
      primary2.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    }
    else if (pokemonAttribute1 == "psychic") {
      primary2.style.backgroundColor = "rgba(150, 0, 150, 0.8)";
    }
    else if (pokemonAttribute1 == "rock") {
      primary2.style.backgroundColor = "rgba(100, 100, 100, 0.8)";
    }
    else if (pokemonAttribute1 == "ice") {
      primary2.style.backgroundColor = "rgba(125, 155, 255, 0.8)";
    }
    else { //Ghost
      primary2.style.backgroundColor = "rgba(50, 25, 50, 0.8)";
    }
  }
}

function changePokemonInfoBackgroundColor(i) {

  let cardColor = document.getElementById('modalContent' + i);

  let pokemonType = allPokemon[i]["types"][0]["type"]["name"];
  if (pokemonType == "grass") {
    cardColor.style.backgroundColor = "rgba(0, 125, 0, 0.8)"
  } else if (pokemonType == "fire") {
    cardColor.style.backgroundColor = "rgba(125, 0, 0, 0.8)"
  }
  else if (pokemonType == "water") {
    cardColor.style.backgroundColor = "rgba(0, 0, 225, 0.7)"
  }
  else if (pokemonType == "bug") {
    cardColor.style.backgroundColor = "rgba(150, 150, 50, 0.8)"
  }
  else if (pokemonType == "normal") {
    cardColor.style.backgroundColor = "rgba(225, 250, 225, 0.8)"
  }
  else if (pokemonType == "poison") {
    cardColor.style.backgroundColor = "rgba(150, 0, 150, 0.8)"
  }
  else if (pokemonType == "electric") {
    cardColor.style.backgroundColor = "rgba(255, 255, 100, 0.8)"
  }
  else if (pokemonType == "ground") {
    cardColor.style.backgroundColor = "rgba(150, 100, 0, 0.8)"
  }
  else if (pokemonType == "fairy") {
    cardColor.style.backgroundColor = "rgba(255, 100, 100, 0.8)"
  }
  else if (pokemonType == "fighting") {
    cardColor.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
  }
  else if (pokemonType == "psychic") {
    cardColor.style.backgroundColor = "rgba(150, 0, 150, 0.8)"
  }
  else if (pokemonType == "rock") {
    cardColor.style.backgroundColor = "rgba(100, 100, 100, 0.8)"
  }
  else { //Ghost
    cardColor.style.backgroundColor = "rgba(50, 25, 50, 0.8)"
  }
}

function searchPokemon(value) {
  let input = value;
  for (let j = 0; j < allPokemon.length; j++) {
    let pokemonNames = allPokemon[j]['name'];
    let matchedName = ''
    if (pokemonNames.toLowerCase().includes(input)) {
      matchedName = pokemonNames
      // allPokemon.push(pokemonNames);
      // createPokemonContainer2(allPokemon);
      createMatchedPokemon(matchedName)
    }
  }
  matchedCounter = 0;
}

function createMatchedPokemon(pokemonName) {
  if (matchedCounter == 0) {
    document.getElementById('pokemonContainer').innerHTML = ``;
    matchedCounter++;
  }

  allPokemon.forEach((data, index) => {
    if (data['name'] == pokemonName) {
      createMatchedPokemonContainer(index);
    }
  })
}

function createMatchedPokemonContainer(i) {
  let primary1 = allPokemon[i]["types"][0]["type"]["name"];
  let primary2 = allPokemon[i]["types"][1] ? allPokemon[i]["types"][1]["type"]["name"] : null;
  let pokemonNameForGif = allPokemon[i]['name'];
  pokemonNameForGif = pokemonNameForGif.replace("-", "_");
  document.getElementById('pokemonContainer').innerHTML += createPokemonContainerHTML(i, primary1, primary2, pokemonNameForGif);
  changeBackgroundColor(i);
  changeBackgroundColorButton(i);
}
