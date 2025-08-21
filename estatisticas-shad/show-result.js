// show-result.js (corrigido)
// Corrigido os redirects que antes usavam http://127.0.0.1:8080

function goToPokemonResult(infoType, pokemonName) {
    window.location.href = window.location.pathname.replace(
        "show-result.html",
        `pokemon-result.html?id=${infoType}&pokemon=${pokemonName}`
    );
}

function goToSynergiesResult(id, pokemonName) {
    window.location.href = window.location.pathname.replace(
        "show-result.html",
        `synergies-result.html?id=${id}&pokemon=${pokemonName}`
    );
}

function goToAnotherResult(id, pokemonName) {
    window.location.href = window.location.pathname.replace(
        "show-result.html",
        `another-result.html?id=${id}&pokemon=${pokemonName}`
    );
}
