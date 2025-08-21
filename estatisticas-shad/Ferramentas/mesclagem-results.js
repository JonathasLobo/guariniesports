// Variáveis globais
let file1Data = null;
let file2Data = null;
let mergedData = null;

// Inicialização após carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('file1').addEventListener('change', function (e) {
        loadFile(e.target.files[0], 'preview1', data => file1Data = data);
    });

    document.getElementById('file2').addEventListener('change', function (e) {
        loadFile(e.target.files[0], 'preview2', data => file2Data = data);
    });

    document.getElementById('mergeBtn').addEventListener('click', mergeFiles);
    document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
    document.getElementById('downloadBtn').addEventListener('click', downloadFile);
});

// Carrega um arquivo JSON
function loadFile(file, previewId, callback) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            document.getElementById(previewId).textContent = `✅ ${file.name} carregado (${formatDate(data.lastMatchDate)})`;
            callback(deepClone(data));
        } catch (error) {
            document.getElementById(previewId).textContent = `❌ Erro ao ler arquivo: ${error.message}`;
            callback(null);
        }
    };
    reader.readAsText(file);
}

// Função principal de mesclagem
function mergeFiles() {
    if (!file1Data || !file2Data) {
        alert('Por favor, carregue ambos os arquivos primeiro!');
        return;
    }

    try {
        file1Data = ensureDataStructure(file1Data);
        file2Data = ensureDataStructure(file2Data);

        mergedData = {
            rayquazaSelect: mergeCountObjects(file1Data.rayquazaSelect, file2Data.rayquazaSelect),
            lastMatchDate: getNewerDate(file1Data.lastMatchDate, file2Data.lastMatchDate),
            matchTypeSummary: mergeCountObjects(file1Data.matchTypeSummary, file2Data.matchTypeSummary),
            totalKillsSummary: {
                allyTeam: (file1Data.totalKillsSummary?.allyTeam || 0) + (file2Data.totalKillsSummary?.allyTeam || 0),
                enemyTeam: (file1Data.totalKillsSummary?.enemyTeam || 0) + (file2Data.totalKillsSummary?.enemyTeam || 0)
            },
            teamStreak: {
                allyTeam: mergeStreaks(file1Data.teamStreak.allyTeam, file2Data.teamStreak.allyTeam),
                enemyTeam: mergeStreaks(file1Data.teamStreak.enemyTeam, file2Data.teamStreak.enemyTeam)
            },
            mvpStats: {
                playersWinner: mergeCountObjects(file1Data.mvpStats.playersWinner, file2Data.mvpStats.playersWinner),
                playersDefeated: mergeCountObjects(file1Data.mvpStats.playersDefeated, file2Data.mvpStats.playersDefeated)
            },
            bans: {
                BansWinnerTeam: mergeCountObjects(file1Data.bans.BansWinnerTeam, file2Data.bans.BansWinnerTeam),
                BansLoserTeam: mergeCountObjects(file1Data.bans.BansLoserTeam, file2Data.bans.BansLoserTeam)
            },
            allyTeam: mergeTeamData(file1Data.allyTeam, file2Data.allyTeam),
            enemyTeam: mergeTeamData(file1Data.enemyTeam, file2Data.enemyTeam),
            matchups: mergeMatchups(file1Data.matchups || {}, file2Data.matchups || {}),
            synergies: mergeSynergies(file1Data.synergies || {}, file2Data.synergies || {})
        };

        document.getElementById('mergedResult').textContent = JSON.stringify(mergedData, null, 2);
    } catch (error) {
        console.error("Erro:", error);
        document.getElementById('mergedResult').textContent = `❌ Erro ao mesclar: ${error.message}`;
    }
}

// =========================
// Funções de Estrutura
// =========================
function ensureDataStructure(data) {
    return {
        rayquazaSelect: data.rayquazaSelect || {},
        lastMatchDate: data.lastMatchDate || '',
        matchTypeSummary: data.matchTypeSummary || {},
        totalKillsSummary: data.totalKillsSummary || { allyTeam: 0, enemyTeam: 0 },
        teamStreak: {
            allyTeam: data.teamStreak?.allyTeam || createEmptyStreak(),
            enemyTeam: data.teamStreak?.enemyTeam || createEmptyStreak()
        },
        mvpStats: data.mvpStats || { playersWinner: {}, playersDefeated: {} },
        bans: data.bans || { BansWinnerTeam: {}, BansLoserTeam: {} },
        allyTeam: ensureTeamStructure(data.allyTeam),
        enemyTeam: ensureTeamStructure(data.enemyTeam),
        matchups: data.matchups || {},
        synergies: data.synergies || {}
    };
}

function ensureTeamStructure(team = {}) {
    const ensured = {
        overall: {},
        wins: team.wins || 0,
        losses: team.losses || 0
    };

    for (const [key, val] of Object.entries(team.overall || {})) {
        ensured.overall[key] = { ...createEmptyPokemonData(), ...val };
    }

    for (const [player, pokemons] of Object.entries(team)) {
        if (['overall', 'wins', 'losses'].includes(player)) continue;
        ensured[player] = {};
        for (const [pokemon, stats] of Object.entries(pokemons)) {
            ensured[player][pokemon] = { ...createEmptyPokemonData(), ...stats };
        }
    }

    return ensured;
}

function createEmptyStreak() {
    return { currentStreak: 0, maxWinStreak: 0, maxLoseStreak: 0 };
}

function createEmptyPokemonData() {
    return {
        lastMatch: '',
        matchTypes: {},
        pickRate: 0,
        wins: 0,
        losses: 0,
        currentWinStreak: 0,
        currentLoseStreak: 0,
        maxWinStreak: 0,
        maxLoseStreak: 0,
        winRate: 0,
        isUp: false,
        matches: [],
        alliedPokemons: {},
        enemyPokemons: {},
        roles: {},
        skills: {},
        battleItems: {},
        lanes: {},
        matchups: {},
        synergies: {},
        killsRate: 0,
        assistsRate: 0,
        interruptsRate: 0,
        damageDoneRate: 0,
        damageTakenRate: 0,
        damageHealedRate: 0,
        scoreRate: 0
    };
}

// =========================
// Funções de Merge
// =========================
function mergeTeamData(t1, t2) {
    const result = {
        overall: {},
        wins: (t1.wins || 0) + (t2.wins || 0),
        losses: (t1.losses || 0) + (t2.losses || 0)
    };

    const allPokemons = new Set([...Object.keys(t1.overall || {}), ...Object.keys(t2.overall || {})]);
    for (const pokemon of allPokemons) {
        result.overall[pokemon] = mergePokemonData(
            t1.overall?.[pokemon] || createEmptyPokemonData(),
            t2.overall?.[pokemon] || createEmptyPokemonData()
        );
    }

    const allPlayers = new Set([...Object.keys(t1), ...Object.keys(t2)]);
    for (const player of allPlayers) {
        if (['overall', 'wins', 'losses'].includes(player)) continue;
        result[player] = {};
        const pokemons = new Set([...Object.keys(t1[player] || {}), ...Object.keys(t2[player] || {})]);
        for (const pkm of pokemons) {
            result[player][pkm] = mergePokemonData(
                t1[player]?.[pkm] || createEmptyPokemonData(),
                t2[player]?.[pkm] || createEmptyPokemonData()
            );
        }
    }

    return result;
}

function mergePokemonData(p1, p2) {
    const wins = (p1.wins || 0) + (p2.wins || 0);
    const losses = (p1.losses || 0) + (p2.losses || 0);
    const matches = wins + losses;
    const pickRate = (p1.pickRate || 0) + (p2.pickRate || 0);

    return {
        lastMatch: getNewerDate(p1.lastMatch, p2.lastMatch),
        matchTypes: mergeCountObjects(p1.matchTypes, p2.matchTypes),
        pickRate,
        wins,
        losses,
        currentWinStreak: p2.currentWinStreak ?? p1.currentWinStreak,
        currentLoseStreak: p2.currentLoseStreak ?? p1.currentLoseStreak,
        maxWinStreak: Math.max(p1.maxWinStreak || 0, p2.maxWinStreak || 0),
        maxLoseStreak: Math.max(p1.maxLoseStreak || 0, p2.maxLoseStreak || 0),
        winRate: matches > 0 ? roundToTwoDecimals((wins / matches) * 100) : 0,
        isUp: p2.isUp ?? p1.isUp,
        matches: [...(p1.matches || []), ...(p2.matches || [])],
        alliedPokemons: mergeEnemyAllies(p1.alliedPokemons, p2.alliedPokemons),
        enemyPokemons: mergeEnemyAllies(p1.enemyPokemons, p2.enemyPokemons),
        roles: mergeCountObjects(p1.roles, p2.roles),
        skills: mergeCountObjects(p1.skills, p2.skills),
        battleItems: mergeCountObjects(p1.battleItems, p2.battleItems),
        lanes: mergeCountObjects(p1.lanes, p2.lanes),
        matchups: mergeMatchups(p1.matchups, p2.matchups),
        synergies: mergeSynergies(p1.synergies, p2.synergies),
        killsRate: calculateWeightedRate(p1.killsRate, p1.pickRate, p2.killsRate, p2.pickRate),
        assistsRate: calculateWeightedRate(p1.assistsRate, p1.pickRate, p2.assistsRate, p2.pickRate),
        interruptsRate: calculateWeightedRate(p1.interruptsRate, p1.pickRate, p2.interruptsRate, p2.pickRate),
        damageDoneRate: calculateWeightedRate(p1.damageDoneRate, p1.pickRate, p2.damageDoneRate, p2.pickRate),
        damageTakenRate: calculateWeightedRate(p1.damageTakenRate, p1.pickRate, p2.damageTakenRate, p2.pickRate),
        damageHealedRate: calculateWeightedRate(p1.damageHealedRate, p1.pickRate, p2.damageHealedRate, p2.pickRate),
        scoreRate: calculateWeightedRate(p1.scoreRate, p1.pickRate, p2.scoreRate, p2.pickRate)
    };
}

function mergeEnemyAllies(p1 = {}, p2 = {}) {
    const result = {};
    const all = new Set([...Object.keys(p1), ...Object.keys(p2)]);
    for (const key of all) {
        const a = p1[key] || {};
        const b = p2[key] || {};
        const wins = (a.wins || 0) + (b.wins || 0);
        const losses = (a.losses || 0) + (b.losses || 0);
        const pickRate = (a.pickRate || 0) + (b.pickRate || 0);
        const total = wins + losses;
        const winRate = total > 0 ? roundToTwoDecimals((wins / total) * 100) : 0;

        result[key] = {
            wins,
            losses,
            pickRate,
            winRate,
            isUp: b.isUp ?? a.isUp
        };
    }
    return result;
}

function mergeMatchups(m1 = {}, m2 = {}) {
    const result = {};
    const allKeys = new Set([...Object.keys(m1), ...Object.keys(m2)]);
    for (const key of allKeys) {
        const wins = (m1[key]?.wins || 0) + (m2[key]?.wins || 0);
        const matches = (m1[key]?.matches || 0) + (m2[key]?.matches || 0);
        result[key] = {
            wins,
            matches,
            winRate: matches > 0 ? roundToTwoDecimals((wins / matches) * 100) : 0
        };
    }
    return result;
}

function mergeSynergies(s1 = {}, s2 = {}) {
    return mergeMatchups(s1, s2);
}

function mergeStreaks(s1 = {}, s2 = {}) {
    return {
        currentStreak: s2.currentStreak ?? s1.currentStreak,
        maxWinStreak: Math.max(s1.maxWinStreak || 0, s2.maxWinStreak || 0),
        maxLoseStreak: Math.max(s1.maxLoseStreak || 0, s2.maxLoseStreak || 0)
    };
}

function mergeCountObjects(obj1 = {}, obj2 = {}) {
    const result = { ...obj1 };
    for (const [key, value] of Object.entries(obj2)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
            result[key] = mergeCountObjects(result[key] || {}, value);
        } else {
            result[key] = (result[key] || 0) + value;
        }
    }
    return result;
}

// =========================
// Utilitários
// =========================
function roundToTwoDecimals(num) {
    return Math.round((num || 0) * 100) / 100;
}

function calculateWeightedRate(rate1, weight1, rate2, weight2) {
    const totalWeight = (weight1 || 0) + (weight2 || 0);
    return totalWeight > 0 ? roundToTwoDecimals(((rate1 * weight1) + (rate2 * weight2)) / totalWeight) : 0;
}

function formatDate(dateStr) {
    if (!dateStr) return 'Sem data';
    return dateStr;
}

function getNewerDate(dateStr1, dateStr2) {
    if (!dateStr1) return dateStr2;
    if (!dateStr2) return dateStr1;
    const [d1, h1] = dateStr1.split(' ');
    const [d2, h2] = dateStr2.split(' ');
    const date1 = new Date(d1.split('/').reverse().join('-') + 'T' + h1);
    const date2 = new Date(d2.split('/').reverse().join('-') + 'T' + h2);
    return date1 > date2 ? dateStr1 : dateStr2;
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// =========================
// Botões: copiar e download
// =========================
function copyToClipboard() {
    if (!mergedData) return alert("Nada para copiar.");
    navigator.clipboard.writeText(JSON.stringify(mergedData, null, 2)).then(() => {
        alert("JSON copiado para a área de transferência!");
    });
}

function downloadFile() {
    if (!mergedData) return alert("Nada para baixar.");
    const blob = new Blob([JSON.stringify(mergedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged_results.json";
    a.click();
    URL.revokeObjectURL(url);
}
