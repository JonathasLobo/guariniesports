const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
    
const input = document.getElementById("uploadFile");
input.classList.add("hover:scale-105", "transition-transform", "duration-200", "ease-in-out", "inline-block")
const text = document.getElementById("upload-result");
let name;

if (!window.location.href.endsWith('indexStat.html')) {
    window.location.href = window.location.pathname.replace('/', 'indexStat.html');
}

input.onchange = function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        window.localStorage.pokemonTempUploadResult = event.target.result;
        window.location.href = window.location.pathname.replace('indexStat.html', 'upload-result.html');
    }
    name = e.target.files[0].name;
    reader.readAsText(new Blob([e.target.files[0]], {
        "type": "application/json"
    }));
}

const mainBox = document.getElementById("imageBox");
mainBox.classList.add("flex", "relative");

const sectionImages = {
    "upload-file": "./images/indexPokemons/gyarados-pb.png",
    "player-profile-section": "./images/indexPokemons/blaziken-pb.png",
    "ban-section": "./images/indexPokemons/blastoise-pb.png",
    "ally-section": "./images/indexPokemons/mamoswine-pb.png",
    "enemy-section": "./images/indexPokemons/clefable-pb.png",
    "rayquaza-section": "./images/indexPokemons/darkrai-pb.png",
    "scrims-section": "./images/indexPokemons/glaceon-pb.png"
};

const sectionTexts = {
    "upload-file": "Carregue um arquivo JSON para iniciar a análise.",
    "player-profile-section": "Selecione o jogador acima e veja o perfil do jogador.",
    "ban-section": "Ranking de banimentos das partidas partidas.",
    "ally-section": "Ranking do picks e winrates do time aliado.",
    "enemy-section": "Ranking dos recordes dos atributos de cada jogador.",
    "rayquaza-section": "Ranking dos smites do Rayquaza.",
    "scrims-section": "Acesse os resultados detalhados das scrims realizadas."
};

Object.keys(sectionImages).forEach(sectionId => {
    const section = document.getElementById(sectionId);

    section.addEventListener("mouseover", () => {
        // Criar ou reutilizar a imagem
        let image = mainBox.querySelector(".pokemon-img");
        if (!image) {
            image = document.createElement("img");
            image.classList.add("pokemon-img", "transition-all", "duration-500", "ease-in-out", "opacity-0");
            mainBox.appendChild(image);
        }
        image.src = sectionImages[sectionId];
        image.style.opacity = "1";
        image.style.transform = "scale(1)";

        // Criar ou reutilizar o texto
        let textSection = mainBox.querySelector(".description-text");
        if (!textSection) {
            textSection = document.createElement("p");
            textSection.classList.add("description-text", "text-white", "transition-all", "duration-500", "ease-in-out", "opacity-0");
            mainBox.appendChild(textSection);
        }
        textSection.textContent = sectionTexts[sectionId];
        textSection.style.opacity = "1";
    });

    section.addEventListener("mouseout", () => {
        const image = mainBox.querySelector(".pokemon-img");
        if (image) {
            image.style.opacity = "0";
            image.style.transform = "scale(0.9)";
        }

        const textSection = mainBox.querySelector(".description-text");
        if (textSection) {
            textSection.style.opacity = "0";
        }
    });
});

// Obter o container para os controles
const controlsContainer = document.getElementById("controls-container");

fetch('./results.json')
.then((response) => response.json())
.then((results) => {
    if (results && Object.keys(results).length > 0) {
        // Remove the filters section entirely since we now have clickable headers
        
        const playerProfileSection = document.getElementById("player-profile-section");

        const playerButton = document.createElement("div");
        playerButton.classList.add("text-xl", "text-black", "font-serif", "cursor-pointer", "transition-colors", "duration-200", "ease-in-out", "group-hover:text-white");
        playerButton.innerText = "Profile";

        playerButton.onclick = () => {
            const currentPath = window.location.pathname;
            const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
            window.location.href = `${basePath}player-profile.html`;
        };

        playerProfileSection.appendChild(playerButton);

        const banSection = document.getElementById("ban-section");
        const banButton = document.createElement("div");
        banButton.classList.add("text-xl", "text-black", "font-serif", "cursor-pointer", "transition-colors", "duration-200", "ease-in-out", "group-hover:text-white");
        banButton.innerText = "Banimentos"
        banButton.onclick = () => {
            window.location.href = window.location.pathname.replace('indexStat.html', `bans-result.html`);
        }
        banSection.appendChild(banButton)
        
        const allySectionDiv = document.getElementById("ally-section")
        
        const addButton = (playerName) => {
            const newButton = document.createElement("div");
            newButton.classList.add("text-xl", "text-black", "font-serif", "cursor-pointer", "transition-colors", "duration-200", "ease-in-out", "group-hover:text-white");
            newButton.innerText = `${playerName || 'Time aliado'}`
            newButton.onclick = () => {
                const urlId = playerName || 'allyTeam'
                window.location.href = window.location.pathname.replace('indexStat.html', `show-result.html?id=${urlId}`);
            }
            allySectionDiv.appendChild(newButton)
        }
        addButton()
        
        const playerSectionDiv = document.getElementById("enemy-section")
        const newButton = document.createElement("div");
        newButton.classList.add("text-xl", "text-black", "font-serif", "cursor-pointer", "transition-colors", "duration-200", "ease-in-out", "group-hover:text-white");
        newButton.innerText = 'Players'
        newButton.onclick = () => {
            window.location.href = window.location.pathname.replace('indexStat.html', `playerRanking-result.html`);
        }
        playerSectionDiv.appendChild(newButton)

        const rayquazaSectionDiv = document.getElementById("rayquaza-section")
        const rayquazaButton = document.createElement("div");
        rayquazaButton.classList.add("text-xl", "text-black", "font-serif", "cursor-pointer", "transition-colors", "duration-200", "ease-in-out", "group-hover:text-white");
        rayquazaButton.innerText = 'Rayquaza'
        rayquazaButton.onclick = () => {
            window.location.href = window.location.pathname.replace('indexStat.html', `rayquaza-result.html`);
        }
        rayquazaSectionDiv.appendChild(rayquazaButton)

        const scrimsSectionDiv = document.getElementById("scrims-section");
        const scrimsButton = document.createElement("div");
        scrimsButton.classList.add("text-xl", "text-black", "font-serif", "cursor-pointer", "transition-colors", "duration-200", "ease-in-out", "group-hover:text-white");
        scrimsButton.innerText = 'Scrims';
        scrimsButton.onclick = () => {
            window.location.href = window.location.pathname.replace('indexStat.html', 'scrims-result.html');
        };
        scrimsSectionDiv.appendChild(scrimsButton);
    }
})