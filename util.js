function capitalize(value) {
    if (value) {
        const trimmedValue = value.trim()
        return trimmedValue.length > 0
            ? trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1)
            : ''
    }
    return ''
}
const pokemonBaseImages = {
    absol: 'absol-left-bg',
    aegislash: 'aegislash-left-bg',
	alcremie: 'alcremie-left-bg',
	raichu: 'raichu-left-bg',
	armarouge: 'armarouge-left-bg',
    azumarill: 'azumarill-left-bg',
    blastoise: 'blastoise-left-bg',
	blaziken: 'blaziken-left-bg',
    blissey: 'blissey-left-bg',
    buzzwole: 'buzzwole-left-bg',
    chandelure: 'chandelure-left-bg',
    charizard: 'charizard-left-bg',
    megacharizardx: 'megacharizardx-left-bg',
	ceruledge: 'ceruledge-left-bg',
    cinderace: 'cinderace-left-bg',
    clefable: 'clefable-left-bg',
    comfey: 'comfey-left-bg',
    cramorant: 'cramorant-left-bg',
    crustle: 'crustle-left-bg',
	darkrai: 'darkrai-left-bg',
    decidueye: 'decidueye-left-bg',
    delphox: 'delphox-left-bg',
    dodrio: 'dodrio-left-bg',
    dragapult: 'dragapult-left-bg',
    dragonite: 'dragonite-left-bg',
    duraludon: 'duraludon-left-bg',
    eldegoss: 'eldegoss-left-bg',
    empoleon: 'empoleon-left-bg',
    espeon: 'espeon-left-bg',
	falinks: 'falinks-left-bg',
    garchomp: 'garchomp-left-bg',
    gardevoir: 'gardevoir-left-bg',
    gengar: 'gengar-left-bg',
    glaceon: 'glaceon-left-bg',
    goodra: 'goodra-left-bg',
    greninja: 'greninja-left-bg',
	gyarados: 'gyarados-left-bg',
	hooh: 'hooh-left-bg',
    hoopa: 'hoopa-left-bg',
    inteleon: 'inteleon-left-bg',
    lapras: 'lapras-left-bg',
	latias: 'latias-left-bg',
	latios: 'latios-left-bg',
    leafeon: 'leafeon-left-bg',
    lucario: 'lucario-left-bg',
    machamp: 'machamp-left-bg',
    mamoswine: 'mamoswine-left-bg',
    megalucario: 'megalucario-left-bg',
	meowscara: 'meowscara-left-bg',
	metagross: 'metagross-left-bg',
    mew: 'mew-left-bg',
	mewtwox: 'mewtwox-left-bg',
	mewtwoy: 'mewtwoy-left-bg',
	mimikyu: 'mimikyu-left-bg',
	miraidon: 'miraidon-left-bg',
    mrmime: 'mrmime-left-bg',
    ninetales: 'ninetales-left-bg',
	pawmot: 'pawmot-left-bg',
    pikachu: 'pikachu-left-bg',
	psyduck: 'psyduck-left-bg',
	rapidash: 'rapidash-left-bg',
    sableye: 'sableye-left-bg',
    scizor: 'scizor-left-bg',
    scyther: 'scyther-left-bg',
    slowbro: 'slowbro-left-bg',
    snorlax: 'snorlax-left-bg',
	suicune: 'suicune-left-bg',
    sylveon: 'sylveon-left-bg',
    talonflame: 'talonflame-left-bg',
	tinkaton: 'tinkaton-left-bg',
    trevenant: 'trevenant-left-bg',
    tsareena: 'tsareena-left-bg',
    tyranitar: 'tyranitar-left-bg',
    umbreon: 'umbreon-left-bg',
    urshifu: 'urshifu-left-bg',
    venusaur: 'venusaur-left-bg',
    wigglytuff: 'wigglytuff-left-bg',
    zacian: 'zacian-left-bg',
    zeraora: 'zeraora-left-bg',
    zoroark: 'zoroark-left-bg'
}

const pokemonRoles = {
    absol: 'Speedster',
    aegislash: 'All Rounder',
	alcremie: 'Support',
	armarouge: 'Attacker',
    azumarill: 'All Rounder',
    blastoise: 'Defender',
	blaziken: 'All Rounder',
    blissey: 'Support',
    buzzwole: 'All Rounder',
    chandelure: 'Attacker',
    charizard: 'All Rounder',
    megacharizardx: 'All Rounder',
	ceruledge: 'All Rounder',
    cinderace: 'Attacker',
    clefable: 'Support',
    comfey: 'Support',
    cramorant: 'Attacker',
    crustle: 'Defender',
	darkrai: 'Speedster',
    decidueye: 'Attacker',
    delphox: 'Attacker',
    dodrio: 'Speedster',
    dragapult: 'Attacker',
    dragonite: 'All Rounder',
    duraludon: 'Attacker',
    eldegoss: 'Support',
    empoleon: 'All Rounder',
    espeon: 'Attacker',
	falinks: 'All Rounder',
    garchomp: 'All Rounder',
    gardevoir: 'Attacker',
    gengar: 'Speedster',
    glaceon: 'Attacker',
    goodra: 'Defender',
    greedent: 'Defender',
    greninja: 'Attacker',
	gyarados: 'All Rounder',
	hooh: 'Defender',
    hoopa: 'Support',
    inteleon: 'Attacker',
    lapras: 'Defender',
	latias: 'Support',
	latios: 'Attacker',
    leafeon: 'Speedster',
    lucario: 'All Rounder',
    machamp: 'All Rounder',
    mamoswine: 'Defender',
    megalucario: 'All Rounder',
	meowscara: 'Speedster',
	metagross: 'All Rounder',
    mew: 'Attacker',
	mewtwox: 'All Rounder',
	mewtwoy: 'Attacker',
	mimikyu: 'All Rounder',
	miraidon: 'Attacker',
    mrmime: 'Support',
    ninetales: 'Attacker',
	pawmot: 'All Rounder',
    pikachu: 'Attacker',
	psyduck: 'Support',
  raichu: 'Attacker',
	rapidash: 'Speedster',
    sableye: 'Support',
    scizor: 'All Rounder',
    scyther: 'Speedster',
    slowbro: 'Defender',
    snorlax: 'Defender',
	suicune: 'All Rounder',
    sylveon: 'Attacker',
    talonflame: 'Speedster',
	tinkaton: 'All Rounder',
    trevenant: 'Defender',
    tsareena: 'All Rounder',
    tyranitar: 'All Rounder',
    umbreon: 'Defender',
    urshifu: 'All Rounder',
    venusaur: 'Attacker',
    wigglytuff: 'Support',
    zacian: 'All Rounder',
    zeraora: 'Speedster',
    zoroark: 'Speedster'
}

const pokemonLanes = {
    absol: 'Jungle',
    aegislash: 'Top',
	alcremie: 'Top',
	raichu: 'Bot',
	armarouge: 'Bot',
    azumarill: 'Top',
    blastoise: 'Top',
	blaziken: 'Top',
    blissey: 'Top',
    buzzwole: 'Top',
    chandelure: 'Bot',
    charizard: 'Jungle',
    megacharizardx: 'Jungle',
	ceruledge: 'Jungle',
    cinderace: 'Jungle',
    clefable: 'Top',
    comfey: 'Top',
    cramorant: 'Bot',
    crustle: 'Bot',
	darkrai: 'Jungle',
    decidueye: 'Bot',
    delphox: 'Bot',
    dodrio: 'Jungle',
    dragapult: 'Bot',
    dragonite: 'Jungle',
    duraludon: 'Bot',
    eldegoss: 'Top',
    empoleon: 'Top',
    espeon: 'Bot',
	falinks: 'Top',
    garchomp: 'Top',
    gardevoir: 'Bot',
    gengar: 'Jungle',
    glaceon: 'Bot',
    goodra: 'Top',
    greedent: 'Top',
    greninja: 'Jungle',
	gyarados: 'Top',
	hooh: 'Top',
    hoopa: 'Top',
    inteleon: 'Bot',
    lapras: 'Bot',
	latias: 'Top',
	latios: 'Bot',
    leafeon: 'Jungle',
    lucario: 'Top',
    machamp: 'Top',
    mamoswine: 'Bot',
    megalucario: 'Top',
	meowscara: 'Jungle',
	metagross: 'Top',
    mew: 'Bot',
	mewtwox: 'Top',
	mewtwoy: 'Bot',
	mimikyu: 'Top',
	miraidon: 'Bot',
    mrmime: 'Top',
    ninetales: 'Bot',
	pawmot: 'Top',
    pikachu: 'Bot',
	psyduck: 'Bot',
	rapidash: 'Jungle',
    sableye: 'Top',
    scizor: 'Top',
    scyther: 'Jungle',
    slowbro: 'Bot',
    snorlax: 'Bot',
	suicune: 'Top',
    sylveon: 'Bot',
    talonflame: 'Jungle',
	tinkaton: 'Top',
    trevenant: 'Top',
    tsareena: 'Top',
    tyranitar: 'Top',
    umbreon: 'Bot',
    urshifu: 'Jungle',
    venusaur: 'Bot',
    wigglytuff: 'Top',
    zacian: 'Top',
    zeraora: 'Jungle',
    zoroark: 'Jungle'
}

const pokemonBasedType  = {
    absol: 'ATK',
    aegislash: 'ATK',
	alcremie: 'SpATK',
	raichu: 'SpATK',
	armarouge: 'SpATK',
    azumarill: 'ATK',
    blastoise: 'SpATK',
	blaziken: 'ATK',
    blissey: 'SpATK',
    buzzwole: 'ATK',
    chandelure: 'SpATK',
    charizard: 'ATK',
    megacharizardx: 'ATK',
	ceruledge: 'ATK',
    cinderace: 'ATK',
    clefable: 'SpATK',
    comfey: 'SpATK',
    cramorant: 'SpATK',
    crustle: 'ATK',
	darkrai: 'SpATK',
    decidueye: 'ATK',
    delphox: 'SpATK',
    dodrio: 'ATK',
    dragapult: 'ATK',
    dragonite: 'ATK',
    duraludon: 'ATK',
    eldegoss: 'SpATK',
    empoleon: 'SpATK',
    espeon: 'SpATK',
	falinks: 'ATK',
    garchomp: 'ATK',
    gardevoir: 'SpATK',
    gengar: 'SpATK',
    glaceon: 'SpATK',
    goodra: 'SpATK',
    greedent: 'ATK',
    greninja: 'ATK',
	gyarados: 'ATK',
	hooh: 'ATK',
    hoopa: 'SpATK',
    inteleon: 'SpATK',
    lapras: 'SpATK',
	latias: 'SpATK',
	latios: 'SpATK',
    leafeon: 'ATK',
    lucario: 'ATK',
    machamp: 'ATK',
    mamoswine: 'ATK',
    megalucario: 'ATK',
	meowscara: 'ATK',
	metagross: 'ATK',
    mew: 'SpATK',
	mewtwox: 'ATK',
	mewtwoy: 'SpATK',
	mimikyu: 'ATK',
	miraidon: 'SpATK',
    mrmime: 'SpATK',
    ninetales: 'SpATK',
	pawmot: 'ATK',
    pikachu: 'SpATK',
	psyduck: 'SpATK',
	rapidash: 'SpATK',
    sableye: 'ATK',
    scizor: 'ATK',
    scyther: 'ATK',
    slowbro: 'SpATK',
    snorlax: 'ATK',
	suicune: 'SpATK',
    sylveon: 'SpATK',
    talonflame: 'ATK',
	tinkaton: 'ATK',
    trevenant: 'ATK',
    tsareena: 'ATK',
    tyranitar: 'ATK',
    umbreon: 'ATK',
    urshifu: 'ATK',
    venusaur: 'SpATK',
    wigglytuff: 'SpATK',
    zacian: 'ATK',
    zeraora: 'ATK',
    zoroark: 'ATK'
}

const rolesColor = {
    'Speedster': '#2492c9',
    'All Rounder': '#ce5fd3',
    'Support': '#e1b448',
    'Defender': '#9bd652',
    'Attacker': '#f16c38'
}

const pokemonSkills = {
	"lapras": {
		"s11": "Water Pulse",
		"s12": "Perish Song",
		"s21": "Bubble Beam",
		"s22": "Ice Beam"
	},
	"urshifu": {
		"s11": "Wicked Blow",
		"s12": "Surging Strikes",
		"s21": "Throat Chop",
		"s22": "Liquidation"
	},
	"absol": {
		"s21": "Night Slash",
		"s12": "Pursuit",
		"s11": "Psycho Cut",
		"s22": "Sucker Punch"
	},
    "aegislash": {
		"s11": "Sacred Sword",
		"s12": "Shadow Claw",
		"s21": "Wide Guard",
		"s22": "Iron Head"
	},
	"alcremie": {
		"s11": "Recover",
		"s12": "Sweet Scent",
		"s21": "Decorate",
		"s22": "Dazzling Gleam"
	},
	"raichu": {
		"s11": "Stored Power",
		"s12": "Electro Ball",
		"s21": "Thunderbolt",
		"s22": "Psychic"
	},
	"armarouge": {
		"s21": "Flame Charge",
		"s22": "Psychock",
		"s11": "Fire Spin",
		"s12": "Armor Cannon"
	},
    "azumarill": {
		"s21": "Whirlpool",
		"s22": "Aqua Tail",
		"s11": "Play Rough",
		"s12": "Water Pulse"
	},
    "blastoise": {
		"s12": "Hydro Pump",
		"s11": "Water Spout",
		"s21": "Surf",
		"s22": "Rapid Spin"
	},
	"blaziken": {
		"s11": "Fire Punch",
		"s12": "Overheat",
		"s21": "Focus Blast",
		"s22": "Blaze Kick"
	},
    "blissey": {
		"s21": "Soft-Boiled",
		"s22": "Safeguard",
		"s11": "Egg Bomb",
		"s12": "Helping Hand"
	},
    "buzzwole": {
		"s21": "Leech Life",
		"s22": "Superpower",
		"s11": "Lunge",
		"s12": "Smack Down"
	},
    "chandelure": {
		"s11": "Flamethrower",
		"s12": "Overheat",
		"s21": "Poltergeist",
		"s22": "Imprison"
    },
    "charizard": {
		"s11": "Flamethrower",
		"s12": "Fire Punch",
		"u11": "Fire Blast",
		"u12": "Fire Blitz"
    },
    "megacharizardx": {
		"s12": "Fire Punch",
		"u12": "Fire Blitz"
    },
	"ceruledge": {
		"s11": "Bitter Blade",
		"s12": "Psycho Cut",
		"s21": "Phantom Force",
		"s22": "Flame Charge"
	},
    "cinderace": {
		"s11": "Pyro Ball",
		"s12": "Blaze Kick",
		"s21": "Flame Charge",
		"s22": "Feint"
    },
    "clefable": {
		"s11": "Moonlight",
		"s12": "Draining Kiss",
		"s21": "Gravity",
		"s22": "Follow Me"
    },
    "comfey": {
		"s111": "Floral Healing",
		"s12": "Sweet Kiss",
		"s211": "Magical Leaf",
		"s221": "Grass Knot"
    },
    "cramorant": {
		"s21": "Hurricane",
		"s22": "Air Slash",
		"s11": "Surf",
		"s12": "Dive"
    },
    "crustle": {
		"s11": "Rock Tomb",
		"s12": "Shell Smash",
		"s21": "Stealth Rock",
		"s22": "X-Scissor"
    },
	"darkrai": {
		"s11": "Dark Void",
		"s21": "Shadow Claw",
		"s12": "Nasty Plot",
		"s22": "Dark Pulse"
    },
    "decidueye": {
		"s11": "Razor Leaf",
		"s12": "Spirit Schackle",
		"s21": "Leaf Storm",
		"s22": "Shadow Sneak"
    },
    "delphox": {
		"s11": "Fire Blast",
		"s12": "Mystical Fire",
		"s21": "Fire Spin",
		"s22": "Flame Charge"
    },
    "dodrio": {
		"s11": "Tri Attack",
		"s12": "Drill Peck",
		"s21": "Agility",
		"s22": "Jump Kick"
    },
    "dragapult": {
		"s21": "Dragon Dance",
		"s22": "Phantom Force",
		"s11": "Dragon Breath",
		"s12": "Shadow Ball"
    },
    "dragonite": {
		"s11": "Dragon Dance",
		"s12": "Extreme Speed",
		"s21": "Hyper Beam",
		"s22": "Outrage"
    },
    "duraludon": {
		"s11": "Flash Cannon",
		"s12": "Dragon Pulse",
		"s21": "Dragon Tail",
		"s22": "Stealth Rock"
    },
    "eldegoss": {
		"s11": "Pollen Puff",
		"s12": "Leaf Tornado",
		"s21": "Cotton Guard",
		"s22": "Cotton Spore"
    },
    "empoleon": {
		"s11": "Hydro Cannon",
		"s12": "Whirlpool",
		"s21": "Metal Claw",
		"s22": "Aqua Jet"
    },
    "espeon": {
		"s11": "Psyshock",
		"s12": "Stored Power",
		"s21": "Psybeam",
		"s22": "Future Sight"
    },
	"falinks": {
		"s11": "Megahorn",
		"s12": "Iron Head",
		"s21": "No Retreat",
		"s22": "Beat Up"
	},	
    "garchomp": {
		"s21": "Dig",
		"s12": "Dragon Rush",
		"s11": "Earthquake",
		"s22": "Dragon Claw"
    },
    "gardevoir": {
		"s21": "Psyshock",
		"s22": "Future Sight",
		"s11": "Psychic",
		"s12": "Moonblast"
    },
    "gengar": {
		"s11": "Dream Eater",
		"s22": "Hex",
		"s21": "Shadow Ball",
		"s12": "Sludge Bomb"
    },
    "glaceon": {
		"s11": "Icicle Spear",
		"s12": "Icy Wind",
		"s21": "Ice Shard",
		"s22": "Freezy Dry"
    },
    "goodra": {
		"s11": "Muddy Water",
		"s12": "Dragon Pulse",
		"s21": "Power Whip",
		"s22": "Acid Spray"
    },
    "greedent": {
		"2a": "Stuff Cheeks",
		"2b": "Covet",
		"1a": "Bullet Seed",
		"1b": "Belch"
    },
    "greninja": {
		"s21": "Double Team",
		"s22": "Smokescreen",
		"s11": "Water Shuriken",
		"s12": "Surf"
    },
	"gyarados": {
		"s11": "Dragon Breath",
		"s12": "Aqua Tail",
		"s21": "Waterfall",
		"s22": "Bounce"
    },
	"hooh": {
		"s11": "Fly",
		"s12": "Fire Spin",
		"s21": "Flamethrower",
		"s22": "Sky Attack"
    },
    "hoopa": {
		"s21": "Hyperspace Hole",
		"s22": "Trick",
		"s11": "Phantom Force",
		"s12": "Shadow Ball"
    },
    "inteleon": {
		"s11": "Fell Stinger",
		"s12": "Acrobatics",
		"s21": "Snipe Shot",
		"s22": "Liquidation"
    },
	"latias": {
		"s11": "Mist Ball",
		"s12": "Dragon Cheer",
		"s21": "Dragon Pulse",
		"s22": "Dragon Breath"
    },
	"latios": {
		"s11": "Luster Purge",
		"s12": "Telekinesis",
		"s21": "Dragon Pulse",
		"s22": "Draco Meteor"
    },
    "leafeon": {
		"s11": "Razor Leaf",
		"s12": "Solar Blade",
		"s21": "Aerial Ace",
		"s22": "Leaf Blade"
    },
    "lucario": {
		"s12": "Extreme Speed",
		"s11": "Power-Up Punch",
		"u12": "Bone Rush",
		"u11": "Close Combat"
    },
    "machamp": {
		"s21": "Dynamic Punch",
		"s22": "Submission",
		"s11": "Close Combat",
		"s12": "Cross Chop"
    },
    "mamoswine": {
		"s11": "Icicle Crash",
		"s12": "Ice Fang",
		"s21": "High Horsepower",
		"s22": "Earthquake"
    },
    "megalucario": {
		"s11": "Power Up Punch",
		"U11": "Close Combat"
    },
	"meowscara": {
		"s11": "Flower Trick",
		"s12": "Night Slash",
		"s21": "Double Team",
		"s22": "Trailblaze"
    },
	"metagross": {
		"s11": "Meteor Mash",
		"s12": "Gyro Ball",
		"s21": "Zen Headbutt",
		"s22": "Magnet Rise"
    },
    "mew": {
		"s1a": "Electro Ball",
		"s1b": "Solar Beam",
		"s1c": "Surf",
		"s2a": "Coaching",
		"s2b": "Light Screen",
		"s2c": "Agility",
    },
	"mewtwox": {
		"s11": "Future Sight",
		"s12": "Psystrike",
		"s21": "Recover",
		"s22": "Teleport",
	},
	"mewtwoy": {
		"s11": "Future Sight",
		"s12": "Psystrike",
		"s211": "Recover",
		"s221": "Teleport",
	},
	"mimikyu": {
		"s11": "Play Rough",
		"s12": "Shadow Claw",
		"s21": "Shadow Sneak",
		"s22": "Trick Room",
	},
	"miraidon": {
		"s11": "Charge Beam",
		"s12": "Electro Drift",
		"s21": "Thunder",
		"s22": "Parabolic Charge",
	},
    "mrmime": {
		"s21": "Confusion",
		"s12": "Psychic",
		"s11": "Barrier",
		"s22": "Power Swap"
    },
    "ninetales": {
		"s11": "Avalanche",
		"s12": "Dazzling Gleam",
		"s21": "Blizzard",
		"s22": "Aurora Veil"
    },
	"pawmot": {
		"s11": "Thunder Punch",
		"s12": "Supercell Slam",
		"s21": "Volt Switch",
		"s22": "Mach Punch"
    },
    "pikachu": {
		"s12": "Electro Ball",
		"u11": "Thunder",
		"u12": "Volt Tackle",
		"s11": "Thunderbolt"
    },
	"psyduck": {
		"s12": "Bubble Beam",
		"s11": "Surf",
		"s21": "Disable",
		"s22": "Psychic"
    },
	"rapidash": {
		"s12": "Fairy Wind",
		"s11": "Dazzling Gleam",
		"s21": "Smart Strike",
		"s22": "Agility"
    },
    "sableye": {
		"s11": "Knock Off",
		"s12": "Shadow Sneak",
		"s21": "Feint Attack",
		"s22": "Confuse Ray"
    },
    "scizor": {
		"scythers11": "Dual Wingbeat",
		"scythers121":"Bullet Punch",
		"s21": "Double Hit",
		"s22": "Swords Dance",
		"scythers21": "Double Hit",
		"scythers22": "Swords Dance"
    },
    "scyther": {
		"scythers11": "Dual Wingbeat",
		"scythers121":"Bullet Punch",
		"s21": "Double Hit",
		"s22": "Swords Dance",
		"scythers21": "Double Hit",
		"scythers22": "Swords Dance"
    },
    "slowbro": {
		"s11": "Scald",
		"s12": "Surf",
		"s21": "Amnesia",
		"s22": "Telekinesis"
    },
    "snorlax": {
		"s12": "Heavy Slam",
		"s11": "Flail",
		"s22": "Block",
		"s2": "Yawn"
    },
	"suicune": {
		"s11": "Whirlpool",
		"s12": "Surf",
		"s21": "Ice Beam",
		"s22": "Icy Wind"
	},
    "sylveon": {
		"s11": "Mystical Fire",
		"s12": "Hyper Voice",
		"s21": "Draining Kiss",
		"s22": "Calm Mind"
    },
    "talonflame": {
		"s12": "Flame Charge",
		"s11": "Aerial Ace",
		"s21": "Fly",
		"s22": "Brave Bird"
    },
	"tinkaton": {
		"s11": "Gigaton Hammer",
		"s12": "Smack Down",
		"s21": "Ice Hammer",
		"s22": "Thief"
    },
    "trevenant": {
		"s11": "Wood Hammer",
		"s12": "Curse",
		"s21": "Horn Leech",
		"s22": "Pain Split"
    },
    "tsareena": {
		"s11": "Triple Axel",
		"s12": "Stomp",
		"s21": "Trop Kick",
		"s22": "Grassy Glide"
    },
    "tyranitar": {
		"s11": "Dark Pulse",
		"s12": "Stone Edge",
		"s21": "Ancient Power",
		"s22": "Sand Tomb"
    },
    "umbreon": {
		"s11": "Mean Look",
		"s12": "Foul Play",
		"s21": "Wish",
		"s22": "Snarl"
    },
    "venusaur": {
		"s11": "Sludge Bomb",
		"s12": "Giga Drain",
		"u11": "Solar Beam",
		"u12": "Petal Dance"
    },
    "wigglytuff": {
		"s21": "Rollout",
		"s22": "Sing",
		"s11": "Double Slap",
		"s12": "Dazzling Gleam"
    },
    "zacian": {
		"s11": "Metal Claw",
		"s12": "Sacred Sword",	
		"s21": "Agility",
		"s22": "Play Rough"
    },
    "zeraora": {
		"s11": "Volt Switch",
		"s12": "Spark",
		"s21": "Discharge",
		"s22": "Wild Charge"
    },
    "zoroark": {
		"s21": "Night Slash",
		"s22": "Feint Attack",
		"s11": "Shadow Claw",
		"s12": "Cut"
    }
}

const gameLanes = ['Top', 'Jungle', 'Bot']

const gameBattleItems = {
	"ejectbutton": 'Eject Button',
	"tail": 'Fluffy Tail',
	"purify": 'Full Heal',
	"shedinjadoll": 'Shedinja Doll',
	"gear": 'Smoke',
	"xattack": 'X-Attack',
	"xspeed": 'X-Speed',
	"potion": 'Potion',
	"ganrao": 'Goal Getter',
	"controller": 'Goal Hacker',
}

const gameHeldItens = {
	"accelbracer": 'Accel Bracer',
	"aeoscookie": 'Aeos Cookie',
	"amuletcoin": 'Amulet Coin',
	"assaultvest": 'Assault Vest',
	"attackweight": 'Attack Weight',
  "bigroot": 'Big Root',
	"buddybarrier": 'Buddy Barrier',
	"chargingcharm": 'Charging Charm',
  "charizarditex": 'Charizardite X',
	"choicescarf": 'Choice Scarf',
	"choicespecs": 'Choice Specs',
	"curseincense": 'Curse Incense',
	"cursebangle": 'Curse Bangle',
	"draincrown": 'Drain Crown',
	"drivelens": 'Drive Lens',
	"energyamplifier": 'Energy Amplifier',
	"expshare": 'Exp. Share',
	"floatstone": 'Float Stone',
	"focusband": 'Focus Band',
	"leftovers": 'Leftovers',
  "lucarionite": 'Lucarionite',
  "mewtwonitex": 'Mewtwonite X',
  "mewtwonitey": 'Mewtwonite Y',
	"muscleband": 'Muscle Band',
	"rapidscarf": 'Rapid Scarf',
	"razorclaw": 'Razor Claw',
	"rescuehood": 'Rescue Hood',
	"resonantguard": 'Resonant Guard',
	"rockyhelmet": 'Rocky Helmet',
	"rustedsword": 'Rusted Sword',
	"scopelens": 'Scope Lens',
	"scoreshield": 'Score Shield',
	"shellbell": 'Shell Bell',
	"slickspoon": 'Slick Spoon',
	"spatkspecs": 'Sp. Atk Specs',
  "tenacitybelt": 'Tenacity Belt', 
	"weaknesspolice": 'Weakness Police',
	"wiseglasses": 'Wise Glasses',
}

const gameHeldItensStatus = {
	"accelbracer": ['ATK +15','CDR +4.5%'],
	"aeoscookie": ['HP +240'],
	"amuletcoin": ['HP +240','Speed +150'],
	"assaultvest": ['HP +270','SpDEF +51'],
	"attackweight": ['ATK +18'],
  "bigroot": ['HP +450'],
	"buddybarrier": ['HP +450'],
	"chargingcharm": ['ATK +15','Speed +120'],
  "charizarditex": [],
	"choicescarf": ['AtkSPD +7.5%','Speed +150'],
	"choicespecs": ['SpATK +39'],
	"curseincense": ['SpATK +39'],
	"cursebangle": ['ATK +24'],
	"draincrown": ['HP +120','ATK +18'],
	"drivelens": ['SpATK +24','CDR +4.5%'],
	"energyamplifier": ['EnergyRate +6%','CDR +4.5%'],
	"expshare": ['HP +240','Speed +150'],
	"floatstone": ['ATK +24','Speed +150'],
	"focusband": ['DEF +30','SpDEF +30'],
	"leftovers": ['HP +360','HPRegen +9'],
  "lucarionite": [],
  "mewtwonitex": [],
  "mewtwonitey": [],
	"muscleband": ['ATK +15','AtkSPD +7.5%'],
	"rapidscarf": ['ATK +12','AtkSPD +9%'],
	"razorclaw": ['ATK +15','CritRate +2.1%'],
	"rescuehood": ['DEF +30','SpDEF +30'],
	"resonantguard": ['HP +450','HPRegen +18'],
	"rockyhelmet": ['HP +270','Def +51'],
	"rustedsword": [],
	"scopelens": ['CritRate +6%','CritDmg +12%'],
	"scoreshield": ['HP +450'],
	"shellbell": ['SpATK +24','CDR +4.5%'],
	"slickspoon": ['HP +210','SpATK +30'],
	"spatkspecs": ['SpATK +24'],
  "tenacitybelt": ['DEF +30','SpDEF +30'],
	"weaknesspolice": ['HP +210','ATK +15'],
	"wiseglasses": ['SpATK +39'],
}

const gameHeldItensPassive = {
  "wiseglasses": { SpATK: "+7%" },
  "scopelens": { ATK: "+75%" },
  "muscleband": { ATK: "+3%" },
  "leftovers": { HPRegen: "+4%"}, 
  "focusband": { HPRegen: "+12%"},
  "choicespecs": { formula: (stats) => 60 + (stats.SpATK * 0.4), target: "SpATK" },
  "draincrown": { Lifesteal: "+15%"},
  "energyamplifier": { ATK: "+21%", SpATK: "+21%"},
  "floatstone": { Speed: "+20%"},
  "razorclaw": { formula: (stats) => 20 + (stats.ATK * 0.5), target: "ATK" },
  "scoreshield": { Shield: "+10%"},
  "rapidscarf": { AtkSPD: "+25%"},
  "rescuehood": { Shield: "+17%", HPRegen: "+17%"},
  "resonantguard": { Shield: "+6%"},
  "choicescarf": { Speed: "+40%" },
  "assaultvest": { Shield: "+20%" },
  "buddybarrier": { Shield: "+25%"},
  "rockyhelmet": { ATK: "+1.8%" },
  "shellbell": { formula: (stats) => 80 + (stats.SpATK * 0.6), target: "HPRegen" },
  "slickspoon": { SpDEFPen: "+15%"},
  "bigroot": { HPRegen: "+20%" },
  "tenacitybelt": { DEF: "+28%" , SpDEF: "+28%"}
};


const defaultHeldItems = {
	absol: ['razorclaw','scopelens','chargingcharm'],
    aegislash: ['attackweight','razorclaw','scopelens'],
	alcremie: ['buddybarrier','expshare','wiseglasses'],
	armarouge: ['shellbell','wiseglasses','slickspoon'],
    azumarill: ['attackweight','scopelens','weaknesspolice'],
    blastoise: ['slickspoon','energyamplifier','focusband'],
	blaziken: ['weaknesspolice','attackweight','razorclaw'],
    blissey: ['expshare','buddybarrier','rescuehood'],
    buzzwole: ['muscleband','attackweight','focusband'],
    chandelure: ['slickspoon','choicespecs','drivelens'],
    charizard: ['muscleband','attackweight','accelbracer'],
    megacharizardx: ['charizarditex','attackweight','accelbracer'],
	ceruledge: ['muscleband','attackweight','razorclaw'],
    cinderace: ['muscleband','rapidscarf','scopelens'],
    clefable: ['resonantguard','buddybarrier','expshare'],
    comfey: ['expshare','rescuehood','buddybarrier'],
    cramorant: ['wiseglasses','slickspoon','choicespecs'],
    crustle: ['choicescarf','aeoscookie','expshare'],
	darkrai: ['curseincense','shellbell','choicespecs'],
    decidueye: ['muscleband','attackweight','floatstone'],
    delphox: ['curseincense','energyamplifier','drivelens'],
    dodrio: ['amuletcoin','attackweight','razorclaw'],
    dragapult: ['muscleband','rapidscarf','scopelens'],
    dragonite: ['muscleband','focusband','weaknesspolice'],
    duraludon: ['muscleband','rapidscarf','accelbracer'],
    eldegoss: ['expshare','buddybarrier','curseincense'],
    empoleon: ['wiseglasses','choicespecs','slickspoon'],
    espeon: ['wiseglasses','choicespecs','slickspoon'],
	falinks: ['muscleband','attackweight','razorclaw'],
    garchomp: ['muscleband','rapidscarf','razorclaw'],
    gardevoir: ['curseincense','energyamplifier','choicespecs'],
    gengar: ['slickspoon','wiseglasses','choicespecs'],
    glaceon: ['rapidscarf','slickspoon','curseincense'],
    goodra: ['muscleband','rapidscarf','slickspoon'],
    greedent: ['floatstone','attackweight','assaultvest'],
    greninja: ['muscleband','rapidscarf','razorclaw'],
	gyarados: ['muscleband','attackweight','razorclaw'],
	hooh: ['cursebangle','expshare','focusband'],
    hoopa: ['muscleband','expshare','buddybarrier'],
    inteleon: ['wiseglasses','choicespecs','slickspoon'],
    lapras: ['expshare','curseincense','aeoscookie'],
	latias: ['expshare','buddybarrier','slickspoon'],
	latios: ['wiseglasses','shellbell','slickspoon'],
    leafeon: ['floatstone','attackweight','razorclaw'],
    lucario: ['muscleband','attackweight','weaknesspolice'],
    machamp: ['muscleband','attackweight','razorclaw'],
    mamoswine: ['focusband','expshare','weaknesspolice'],
    megalucario: ['lucarionite','attackweight','weaknesspolice'],
	meowscara: ['scopelens','attackweight','razorclaw'],
	metagross: ['muscleband','attackweight','weaknesspolice'],
    mew: ['slickspoon','wiseglasses','choicespecs'],
	mewtwox: ['mewtwonitex','rapidscarf','razorclaw'],
	mewtwoy: ['mewtwonitey','rapidscarf','slickspoon'],
	mimikyu: ['muscleband','attackweight','razorclaw'],
	miraidon: ['wiseglasses','choicespecs','slickspoon'],
    mrmime: ['buddybarrier','aeoscookie','expshare'],
    ninetales: ['curseincense','slickspoon','choicespecs'],
	pawmot: ['weaknesspolice','focusband','attackweight'],
    pikachu: ['energyamplifier','curseincense','slickspoon'],
	psyduck: ['expshare','focusband','resonantguard'],
	raichu: ['wiseglasses','shellbell','choicespecs'],
	rapidash: ['wiseglasses','shellbell','choicespecs'],
    sableye: ['expshare','floatstone','razorclaw'],
    scizor: ['muscleband','attackweight','razorclaw'],
    slowbro: ['buddybarrier','expshare','focusband'],
    snorlax: ['focusband','expshare','buddybarrier'],
	suicune: ['slickspoon','spatkspecs','expshare'],
    sylveon: ['wiseglasses','spatkspecs','curseincense'],
    talonflame: ['amuletcoin','attackweight','floatstone'],
	tinkaton: ['muscleband','attackweight','razorclaw'],
    trevenant: ['rockyhelmet','cursebangle','expshare'],
    tsareena: ['muscleband','attackweight','weaknesspolice'],
    tyranitar: ['muscleband','weaknesspolice','razorclaw'],
    umbreon: ['focusband','expshare','buddybarrier'],
    urshifu: ['muscleband','attackweight','razorclaw'],
    venusaur: ['slickspoon','curseincense','choicespecs'],
    wigglytuff: ['resonantguard','buddybarrier','expshare'],
    zacian: ['rustedsword','razorclaw','muscleband'],
    zeraora: ['muscleband','weaknesspolice','floatstone'],
    zoroark: ['muscleband','rapidscarf','razorclaw'],
}

const baseStats = {
	"absol": {
		"HP": 6000,
		"ATK": 670,
		"DEF": 259,
		"SpATK": 118,
		"SpDEF": 180,
		"CritRate": 10,
		"CDR": 20,
		"AtkSPD": 30,
		"HPRegen": 10,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"aegislash": {
		"HP": 7302,
		"ATK": 357,
		"DEF": 250,
		"SpATK": 115,
		"SpDEF": 174,
		"CritRate": 10,
		"CDR": 20,
		"AtkSPD": 45,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4200,
		"CritDmg": 0,
	},
	"alcremie": {
		"HP": 7800,
		"ATK": 280,
		"DEF": 230,
		"SpATK": 696,
		"SpDEF": 280,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 20,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4400,
		"CritDmg": 0,
	},
	"raichu": {
		"HP": 6854,
		"ATK": 116,
		"DEF": 250,
		"SpATK": 750,
		"SpDEF": 220,
		"CritRate": 0,
		"CDR": 25,
		"AtkSPD": 60,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4200,
		"CritDmg": 0,
	},
	"armarouge": {
		"HP": 7200,
		"ATK": 350,
		"DEF": 300,
		"SpATK": 700,
		"SpDEF": 240,
		"CritRate": 0,
		"CDR": 20,
		"AtkSPD": 50,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4200,
		"CritDmg": 0,
	},
	"azumarill": {
		"HP": 7850,
		"ATK": 461,
		"DEF": 399,
		"SpATK": 115,
		"SpDEF": 399,
		"CritRate": 0,
		"CDR": 0,
		"AtkSPD": 40,
		"HPRegen": 10,
		"EnergyRate": 0,
		"Speed": 4200,
		"CritDmg": 0,
	},
	"blastoise": {
		"HP": 9800,
		"ATK": 292,
		"DEF": 650,
		"SpATK": 412,
		"SpDEF": 455,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"blaziken": {
		"HP": 7800,
		"ATK": 490,
		"DEF": 458,
		"SpATK": 115,
		"SpDEF": 351,
		"CritRate": 10,
		"CDR": 0,
		"AtkSPD": 30,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"blissey": {
		"HP": 10000,
		"ATK": 310,
		"DEF": 200,
		"SpATK": 600,
		"SpDEF": 300,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 20,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"buzzwole": {
		"HP": 7800,
		"ATK": 452,
		"DEF": 500,
		"SpATK": 115,
		"SpDEF": 380,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 30,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"ceruledge": {
		"HP": 7850,
		"ATK": 430,
		"DEF": 320,
		"SpATK": 116,
		"SpDEF": 380,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 50,
		"HPRegen": 10,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"chandelure": {
		"HP": 6300,
		"ATK": 295,
		"DEF": 175,
		"SpATK": 1005,
		"SpDEF": 140,
		"CritRate": 0,
		"CDR": 25,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"charizard": {
		"HP": 7700,
		"ATK": 462,
		"DEF": 350,
		"SpATK": 115,
		"SpDEF": 268,
		"CritRate": 30,
		"CDR": 0,
		"AtkSPD": 0,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
  "megacharizardx": {
		"HP": 7700,
		"ATK": 462,
		"DEF": 400,
		"SpATK": 115,
		"SpDEF": 320,
		"CritRate": 30,
		"CDR": 0,
		"AtkSPD": 0,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"cinderace": {
		"HP": 5399,
		"ATK": 418,
		"DEF": 268,
		"SpATK": 119,
		"SpDEF": 232,
		"CritRate": 30,
		"CDR": 0,
		"AtkSPD": 140,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"clefable": {
		"HP": 8000,
		"ATK": 300,
		"DEF": 260,
		"SpATK": 670,
		"SpDEF": 200,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 20,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"comfey": {
		"HP": 5500,
		"ATK": 290,
		"DEF": 190,
		"SpATK": 650,
		"SpDEF": 160,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 20,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"cramorant": {
		"HP": 6301,
		"ATK": 286,
		"DEF": 300,
		"SpATK": 739,
		"SpDEF": 200,
		"CritRate": 0,
		"CDR": 25,
		"AtkSPD": 50,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"crustle": {
		"HP": 9900,
		"ATK": 344,
		"DEF": 580,
		"SpATK": 116,
		"SpDEF": 400,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4200,
		"CritDmg": 0,
	},
	"darkrai": {
		"HP": 7500,
		"ATK": 360,
		"DEF": 350,
		"SpATK": 720,
		"SpDEF": 260,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4400,
		"CritDmg": 0,
	},
	"decidueye": {
		"HP": 5152,
		"ATK": 450,
		"DEF": 250,
		"SpATK": 150,
		"SpDEF": 150,
		"CritRate": 30,
		"CDR": 0,
		"AtkSPD": 120,
		"HPRegen": 25,
		"EnergyRate": 0,
		"Speed": 4200,
		"CritDmg": 0,
	},
	"delphox": {
		"HP": 6290,
		"ATK": 292,
		"DEF": 174,
		"SpATK": 950,
		"SpDEF": 139,
		"CritRate": 0,
		"CDR": 25,
		"AtkSPD": 25,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"dodrio": {
		"HP": 6300,
		"ATK": 625,
		"DEF": 298,
		"SpATK": 118,
		"SpDEF": 200,
		"CritRate": 10,
		"CDR": 0,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"dragapult": {
		"HP": 5500,
		"ATK": 500,
		"DEF": 240,
		"SpATK": 114,
		"SpDEF": 160,
		"CritRate": 25,
		"CDR": 0,
		"AtkSPD": 80,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"dragonite": {
		"HP": 7750,
		"ATK": 550,
		"DEF": 415,
		"SpATK": 115,
		"SpDEF": 315,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 50,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"duraludon": {
		"HP": 5397,
		"ATK": 500,
		"DEF": 301,
		"SpATK": 119,
		"SpDEF": 200,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 60,
		"HPRegen": 25,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"eldegoss": {
		"HP": 8002,
		"ATK": 310,
		"DEF": 200,
		"SpATK": 670,
		"SpDEF": 149,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 20,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4400,
		"CritDmg": 0,
	},
  "empoleon": {
		"HP": 8500,
		"ATK": 115,
		"DEF": 520,
		"SpATK": 670,
		"SpDEF": 400,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 45,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"espeon": {
		"HP": 6320,
		"ATK": 289,
		"DEF": 225,
		"SpATK": 999,
		"SpDEF": 180,
		"CritRate": 0,
		"CDR": 25,
		"AtkSPD": 10,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"falinks": {
		"HP": 8000,
		"ATK": 430,
		"DEF": 460,
		"SpATK": 115,
		"SpDEF": 360,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 30,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"garchomp": {
		"HP": 7750,
		"ATK": 516,
		"DEF": 472,
		"SpATK": 114,
		"SpDEF": 367,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 55,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4400,
		"CritDmg": 0,
	},
	"gardevoir": {
		"HP": 6320,
		"ATK": 291,
		"DEF": 225,
		"SpATK": 1050,
		"SpDEF": 175,
		"CritRate": 0,
		"CDR": 25,
		"AtkSPD": 10,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"gengar": {
		"HP": 7200,
		"ATK": 364,
		"DEF": 290,
		"SpATK": 690,
		"SpDEF": 210,
		"CritRate": 0,
		"CDR": 25,
		"AtkSPD": 40,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"glaceon": {
		"HP": 6350,
		"ATK": 116,
		"DEF": 225,
		"SpATK": 880,
		"SpDEF": 180,
		"CritRate": 20,
		"CDR": 10,
		"AtkSPD": 100,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"goodra": {
		"HP": 9800,
		"ATK": 300,
		"DEF": 600,
		"SpATK": 450,
		"SpDEF": 500,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"greedent": {
		"HP": 9099,
		"ATK": 345,
		"DEF": 433,
		"SpATK": 117,
		"SpDEF": 360,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4200,
		"CritDmg": 0,
	},
	"greninja": {
		"HP": 5152,
		"ATK": 500,
		"DEF": 250,
		"SpATK": 119,
		"SpDEF": 149,
		"CritRate": 30,
		"CDR": 0,
		"AtkSPD": 120,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4200,
		"CritDmg": 0,
	},
	"gyarados": {
		"HP": 7000,
		"ATK": 400,
		"DEF": 400,
		"SpATK": 115,
		"SpDEF": 300,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 10,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"gyarados": {
		"HP": 7000,
		"ATK": 400,
		"DEF": 400,
		"SpATK": 115,
		"SpDEF": 300,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 0,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"hooh": {
		"HP": 9900,
		"ATK": 380,
		"DEF": 480,
		"SpATK": 116,
		"SpDEF": 385,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"hoopa": {
		"HP": 7902,
		"ATK": 309,
		"DEF": 299,
		"SpATK": 619,
		"SpDEF": 200,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 40,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"inteleon": {
		"HP": 6300,
		"ATK": 115,
		"DEF": 170,
		"SpATK": 900,
		"SpDEF": 140,
		"CritRate": 10,
		"CDR": 10,
		"AtkSPD": 80,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"lapras": {
		"HP": 9800,
		"ATK": 310,
		"DEF": 625,
		"SpATK": 430,
		"SpDEF": 512,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
  "latias": {
		"HP": 8600,
		"ATK": 330,
		"DEF": 300,
		"SpATK": 850,
		"SpDEF": 320,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 20,
		"HPRegen": 0,
    "Lifesteal": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
  "latios": {
		"HP": 6200,
		"ATK": 310,
		"DEF": 260,
		"SpATK": 900,
		"SpDEF": 291,
		"CritRate": 0,
		"CDR": 25,
		"AtkSPD": 20,
		"HPRegen": 0,
    "Lifesteal": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"leafeon": {
		"HP": 6250,
		"ATK": 660,
		"DEF": 290,
		"SpATK": 116,
		"SpDEF": 210,
		"CritRate": 10,
		"CDR": 20,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"lucario": {
		"HP": 7249,
		"ATK": 429,
		"DEF": 390,
		"SpATK": 115,
		"SpDEF": 300,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 40,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"machamp": {
		"HP": 7650,
		"ATK": 479,
		"DEF": 510,
		"SpATK": 114,
		"SpDEF": 350,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 30,
		"HPRegen": 20,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"mamoswine": {
		"HP": 9648,
		"ATK": 325,
		"DEF": 510,
		"SpATK": 116,
		"SpDEF": 379,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4200,
		"CritDmg": 0,
	},
  "megalucario": {
		"HP": 7249,
		"ATK": 429,
		"DEF": 390,
		"SpATK": 115,
		"SpDEF": 300,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 40,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"meowscara": {
		"HP": 6300,
		"ATK": 630,
		"DEF": 290,
		"SpATK": 114,
		"SpDEF": 200,
		"CritRate": 10,
		"CDR": 20,
		"AtkSPD": 40,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"metagross": {
		"HP": 8150,
		"ATK": 530,
		"DEF": 550,
		"SpATK": 114,
		"SpDEF": 410,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 30,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"mew": {
		"HP": 6500,
		"ATK": 300,
		"DEF": 230,
		"SpATK": 900,
		"SpDEF": 180,
		"CritRate": 0,
		"CDR": 25,
		"AtkSPD": 20,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"mewtwox": {
		"HP": 7800,
		"ATK": 500,
		"DEF": 430,
		"SpATK": 115,
		"SpDEF": 340,
		"CritRate": 10,
		"CDR": 0,
		"AtkSPD": 40,
		"HPRegen": 10,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"mewtwoy": {
		"HP": 6500,
		"ATK": 116,
		"DEF": 200,
		"SpATK": 780,
		"SpDEF": 180,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 50,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"mimikyu": {
		"HP": 7400,
		"ATK": 420,
		"DEF": 400,
		"SpATK": 115,
		"SpDEF": 360,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 30,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"miraidon": {
		"HP": 7000,
		"ATK": 330,
		"DEF": 280,
		"SpATK": 1000,
		"SpDEF": 240,
		"CritRate": 0,
		"CDR": 20,
		"AtkSPD": 20,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"mrmime": {
		"HP": 8800,
		"ATK": 293,
		"DEF": 420,
		"SpATK": 450,
		"SpDEF": 360,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4400,
		"CritDmg": 0,
	},
	"ninetales": {
		"HP": 6299,
		"ATK": 289,
		"DEF": 225,
		"SpATK": 1002,
		"SpDEF": 175,
		"CritRate": 0,
		"CDR": 25,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"pawmot": {
		"HP": 9000,
		"ATK": 475,
		"DEF": 560,
		"SpATK": 115,
		"SpDEF": 400,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 40,
		"HPRegen": 0,
		"Lifesteal": 20,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"pikachu": {
		"HP": 6300,
		"ATK": 290,
		"DEF": 175,
		"SpATK": 954,
		"SpDEF": 135,
		"CritRate": 0,
		"CDR": 25,
		"AtkSPD": 10,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"psyduck": {
		"HP": 9000,
		"ATK": 320,
		"DEF": 370,
		"SpATK": 650,
		"SpDEF": 310,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 20,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"rapidash": {
		"HP": 7800,
		"ATK": 320,
		"DEF": 330,
		"SpATK": 720,
		"SpDEF": 361,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 40,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"sableye": {
		"HP": 6900,
		"ATK": 300,
		"DEF": 200,
		"SpATK": 120,
		"SpDEF": 150,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 20,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
  "scyther": {
		"HP": 6450,
		"ATK": 630,
		"DEF": 300,
		"SpATK": 115,
		"SpDEF": 200,
		"CritRate": 10,
		"CDR": 20,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"slowbro": {
		"HP": 8900,
		"ATK": 292,
		"DEF": 480,
		"SpATK": 411,
		"SpDEF": 420,
		"CritRate": 0,
		"CDR": 0,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"snorlax": {
		"HP": 9899,
		"ATK": 345,
		"DEF": 580,
		"SpATK": 116,
		"SpDEF": 440,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 40,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"suicune": {
		"HP": 7400,
		"ATK": 290,
		"DEF": 340,
		"SpATK": 780,
		"SpDEF": 275,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"sylveon": {
		"HP": 7148,
		"ATK": 363,
		"DEF": 260,
		"SpATK": 720,
		"SpDEF": 191,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 40,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"talonflame": {
		"HP": 6300,
		"ATK": 710,
		"DEF": 290,
		"SpATK": 117,
		"SpDEF": 200,
		"CritRate": 10,
		"CDR": 20,
		"AtkSPD": 40,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"tinkaton": {
		"HP": 8200,
		"ATK": 460,
		"DEF": 330,
		"SpATK": 115,
		"SpDEF": 430,
		"CritRate": 0,
		"CDR": 0,
		"AtkSPD": 30,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"trevenant": {
		"HP": 9599,
		"ATK": 330,
		"DEF": 520,
		"SpATK": 117,
		"SpDEF": 421,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4400,
		"CritDmg": 0,
	},
	"tsareena": {
		"HP": 7298,
		"ATK": 460,
		"DEF": 410,
		"SpATK": 115,
		"SpDEF": 340,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 50,
		"HPRegen": 20,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"tyranitar": {
		"HP": 8950,
		"ATK": 450,
		"DEF": 520,
		"SpATK": 114,
		"SpDEF": 395,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 30,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4400,
		"CritDmg": 0,
	},
	"umbreon": {
		"HP": 9550,
		"ATK": 350,
		"DEF": 500,
		"SpATK": 114,
		"SpDEF": 400,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"urshifu": {
		"HP": 7900,
		"ATK": 480,
		"DEF": 430,
		"SpATK": 115,
		"SpDEF": 340,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 30,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"venusaur": {
		"HP": 6500,
		"ATK": 292,
		"DEF": 225,
		"SpATK": 962,
		"SpDEF": 169,
		"CritRate": 0,
		"CDR": 25,
		"AtkSPD": 20,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"wigglytuff": {
		"HP": 9452,
		"ATK": 310,
		"DEF": 539,
		"SpATK": 552,
		"SpDEF": 482,
		"CritRate": 0,
		"CDR": 10,
		"AtkSPD": 20,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4300,
		"CritDmg": 0,
	},
	"zacian": {
		"HP": 8000,
		"ATK": 580,
		"DEF": 440,
		"SpATK": 115,
		"SpDEF": 350,
		"CritRate": 10,
		"CDR": 0,
		"AtkSPD": 40,
		"HPRegen": 15,
		"EnergyRate": 0,
		"Speed": 4400,
		"CritDmg": 0,
	},
	"zeraora": {
		"HP": 6319,
		"ATK": 649,
		"DEF": 300,
		"SpATK": 118,
		"SpDEF": 200,
		"CritRate": 10,
		"CDR": 20,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
	"zoroark": {
		"HP": 6200,
		"ATK": 660,
		"DEF": 260,
		"SpATK": 120,
		"SpDEF": 180,
		"CritRate": 10,
		"CDR": 20,
		"AtkSPD": 30,
		"HPRegen": 0,
		"EnergyRate": 0,
		"Speed": 4250,
		"CritDmg": 0,
	},
}

const currentStats = {
    HP: 0,
    ATK: 0,
    DEF: 0,
    SpATK: 0,
    SpDEF: 0,
    CritRate: 0,
    CDR: 0,
    AtkSPD: 0,
	HPRegen: 0,
	EnergyRate: 0,
	Speed: 0,
	CritDmg: 0,
};

const maxStats = {
	HP: 12000,
    ATK: 1000,
    DEF: 1000,
    SpATK: 1400,
    SpDEF: 1000,
    CritRate: 50,
    CDR: 50,
    AtkSPD: 160,
	HPRegen: 50,
	EnergyRate: 50,
	Speed: 7000,
	CritDmg: 50,
}

const pokemonKillsRate = {
	"absol": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"aegislash": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"alcremie": { inferior: { min: 0, max: 2 }, media: { min: 2.1, max: 4 }, acima: { min: 4.1, max: Infinity } },
	"raichu": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"armarouge": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"azumarill": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"blastoise": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"blaziken": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"blissey": { inferior: { min: 0, max: 2 }, media: { min: 2.1, max: 4 }, acima: { min: 4.1, max: Infinity } },
	"buzzwole": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"ceruledge": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"chandelure": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"charizard": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
  "megacharizardx": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"cinderace": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"clefable": { inferior: { min: 0, max: 2 }, media: { min: 2.1, max: 4 }, acima: { min: 4.1, max: Infinity } },
	"comfey": { inferior: { min: 0, max: 2 }, media: { min: 2.1, max: 4 }, acima: { min: 4.1, max: Infinity } },
	"cramorant": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"crustle": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"darkrai": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"decidueye": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"delphox": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"dodrio": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"dragapult": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"dragonite": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"duraludon": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"eldegoss": { inferior: { min: 0, max: 2 }, media: { min: 2.1, max: 4 }, acima: { min: 4.1, max: Infinity } },
  "empoleon": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"espeon": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"falinks": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"garchomp": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"gardevoir": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"gengar": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"glaceon": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"goodra": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"greedent": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"greninja": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"gyarados": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"hooh": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"hoopa": { inferior: { min: 0, max: 2 }, media: { min: 2.1, max: 4 }, acima: { min: 4.1, max: Infinity } },
	"inteleon": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"lapras": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"latias": { inferior: { min: 0, max: 2 }, media: { min: 2.1, max: 4 }, acima: { min: 4.1, max: Infinity } },
	"latios": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"leafeon": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"lucario": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"machamp": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"mamoswine": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
  "megalucario": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"meowscara": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"metagross": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"mew": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"mewtwox": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"mewtwoy": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"mimikyu": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"miraidon": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"mrmime": { inferior: { min: 0, max: 2 }, media: { min: 2.1, max: 4 }, acima: { min: 4.1, max: Infinity } },
	"ninetales": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"pawmot": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
    "pikachu": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"psyduck": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"rapidash": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"sableye": { inferior: { min: 0, max: 2 }, media: { min: 2.1, max: 4 }, acima: { min: 5, max: Infinity } },
	"scizor": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"slowbro": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"snorlax": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"suicune": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"sylveon": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"talonflame": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"tinkaton": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"trevenant": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"tsareena": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"tyranitar": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"umbreon": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"urshifu": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"venusaur": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"wigglytuff": { inferior: { min: 0, max: 2 }, media: { min: 2.1, max: 4 }, acima: { min: 4.1, max: Infinity } },
	"zacian": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"zeraora": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"zoroark": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
};

const pokemonAssistRate = {
	"absol": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"aegislash": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"alcremie": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"raichu": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"armarouge": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"azumarill": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"blastoise": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"blaziken": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"blissey": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"buzzwole": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"ceruledge": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"chandelure": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"charizard": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
  "megacharizardx": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"cinderace": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"clefable": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"comfey": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"cramorant": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"crustle": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"darkrai": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"decidueye": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"delphox": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"dodrio": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"dragapult": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"dragonite": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"duraludon": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"eldegoss": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
  "empoleon": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"espeon": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"falinks": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"garchomp": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"gardevoir": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"gengar": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"glaceon": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"goodra": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"greedent": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"greninja": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"gyarados": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"hooh": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"hoopa": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"inteleon": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"lapras": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"latias": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"latios": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"leafeon": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"lucario": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"machamp": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"mamoswine": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
  "megalucario": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"meowscara": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"metagross": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"mew": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"mewtwox": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"mewtwoy": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"mimikyu": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"miraidon": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"mrmime": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"ninetales": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"pawmot": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
    "pikachu": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"psyduck": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"rapidash": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"sableye": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"scizor": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"slowbro": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"snorlax": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"suicune": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"sylveon": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"talonflame": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"tinkaton": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"trevenant": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"tsareena": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"tyranitar": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"umbreon": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 6 }, acima: { min: 6.1, max: Infinity } },
	"urshifu": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"venusaur": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"wigglytuff": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"zacian": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"zeraora": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"zoroark": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
};

const pokemonDamageDoneRate = {
	"absol": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"aegislash": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"alcremie": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"raichu": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"armarouge": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"azumarill": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"blastoise": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"blaziken": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"blissey": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"buzzwole": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"ceruledge": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"chandelure": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"charizard": {inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
  "megacharizardx": {inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"cinderace": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"clefable": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"comfey": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"cramorant": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"crustle": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"darkrai": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"decidueye": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"delphox": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"dodrio": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"dragapult": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"dragonite": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"duraludon": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"eldegoss": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
  "empoleon": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"espeon": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"falinks": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"garchomp": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"gardevoir": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"gengar": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"glaceon": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"goodra": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"greedent": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"greninja": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"gyarados": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"hooh": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"hoopa": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"inteleon": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"lapras": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"latias": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"latios": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"leafeon": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"lucario": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"machamp": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"mamoswine": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
  "megalucario": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"meowscara": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"metagross": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"mew": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"mewtwox": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"mewtwoy": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"mimikyu": { inferior: { min: 0, max: 40000 }, media: { min: 40001, max: 70000 }, acima: { min: 70001, max: Infinity } },
	"miraidon": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"mrmime": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"ninetales": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"pawmot": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
    "pikachu": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"psyduck": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"rapidash": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"sableye": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"scizor": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"slowbro": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"snorlax": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"suicune": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"sylveon": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"talonflame": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"tinkaton": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"trevenant": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"tsareena": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"tyranitar": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"umbreon": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"urshifu": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"venusaur": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"wigglytuff": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"zacian": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"zeraora": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"zoroark": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
};

const pokemonDamageTakenRate = {
	"absol": { inferior: { min: 70001, max: Infinity }, media: { min: 45000, max: 70000 }, acima: { min: 0, max: 44999 } },
	"aegislash": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"alcremie": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"raichu": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"armarouge": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"azumarill": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"blastoise": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"blaziken": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"blissey": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"buzzwole": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"ceruledge": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"chandelure": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"charizard": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
  "megacharizardx": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"cinderace": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"clefable": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"comfey": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"cramorant": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"crustle": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"darkrai": { inferior: { min: 70001, max: Infinity }, media: { min: 45000, max: 70000 }, acima: { min: 0, max: 44999 } },
	"decidueye": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"delphox": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"dodrio": { inferior: { min: 70001, max: Infinity }, media: { min: 45000, max: 70000 }, acima: { min: 0, max: 44999 } },
	"dragapult": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"dragonite": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"duraludon": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"eldegoss": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
  "empoleon": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"espeon": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"falinks": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"garchomp": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"gardevoir": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"gengar": { inferior: { min: 70001, max: Infinity }, media: { min: 45000, max: 70000 }, acima: { min: 0, max: 44999 } },
	"glaceon": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"goodra": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"greedent": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"greninja": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"gyarados": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"hooh": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"hoopa": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"inteleon": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"lapras": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"latias": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"latios": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"leafeon": { inferior: { min: 70001, max: Infinity }, media: { min: 45000, max: 70000 }, acima: { min: 0, max: 44999 } },
	"lucario": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"machamp": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"mamoswine": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
  "megalucario": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"meowscara": { inferior: { min: 70001, max: Infinity }, media: { min: 45000, max: 70000 }, acima: { min: 0, max: 44999 } },
	"metagross": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"mew": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"mewtwox": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"mewtwoy": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"mimikyu": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"miraidon": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"mrmime": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"ninetales": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"pawmot": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
    "pikachu": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"psyduck": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"rapidash": { inferior: { min: 70001, max: Infinity }, media: { min: 45000, max: 70000 }, acima: { min: 0, max: 44999 } },
	"sableye": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"scizor": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"slowbro": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"snorlax": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"suicune": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"sylveon": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"talonflame": { inferior: { min: 70001, max: Infinity }, media: { min: 45000, max: 70000 }, acima: { min: 0, max: 44999 } },
	"tinkaton": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"trevenant": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"tsareena": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"tyranitar": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"umbreon": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"urshifu": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"venusaur": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"wigglytuff": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"zacian": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"zeraora": { inferior: { min: 70001, max: Infinity }, media: { min: 45000, max: 70000 }, acima: { min: 0, max: 44999 } },
	"zoroark": { inferior: { min: 70001, max: Infinity }, media: { min: 45000, max: 70000 }, acima: { min: 0, max: 44999 } },
};

const pokemonDamageHealedRate = {
	"absol": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"aegislash": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"alcremie": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"raichu": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"armarouge": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"azumarill": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"blastoise": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"blaziken": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"blissey": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"buzzwole": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"ceruledge": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"chandelure": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"charizard": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
  "megacharizardx": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"cinderace": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"clefable": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"comfey": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"cramorant": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"crustle": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"darkrai": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"decidueye": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"delphox": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"dodrio": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"dragapult": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"dragonite": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"duraludon": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"eldegoss": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
  "empoleon": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"espeon": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"falinks": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"garchomp": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"gardevoir": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"gengar": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"glaceon": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"goodra": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"greedent": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"greninja": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"gyarados": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"hooh": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"hoopa": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"inteleon": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"lapras": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"latias": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"latios": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"leafeon": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"lucario": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"machamp": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"mamoswine": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
  "megalucario": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"meowscara": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"metagross": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"mew": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"mewtwox": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"mewtwoy": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"mimikyu": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"miraidon": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"mrmime": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"ninetales": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"pawmot": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
    "pikachu": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"psyduck": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"rapidash": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"sableye": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"scizor": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"slowbro": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"snorlax": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"suicune": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"sylveon": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"talonflame": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"tinkaton": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"trevenant": { inferior: { min: 0, max: 30000 }, media: { min: 30001, max: 60000 }, acima: { min: 60001, max: Infinity } },
	"tsareena": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"tyranitar": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"umbreon": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"urshifu": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"venusaur": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"wigglytuff": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"zacian": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"zeraora": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"zoroark": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
};

const pokemonTierListUDB = {
	absol: 'A',
    aegislash: 'B+',
	alcremie: 'A+',
	raichu: 'A',
	armarouge: 'A',
    azumarill: 'C',
    blastoise: 'B+',
	blaziken: 'S',
    blissey: 'S',
    buzzwole: 'A',
    chandelure: 'C',
    charizard: 'A+',
    megacharizardx: 'TBD',
	ceruledge: 'B+',
    cinderace: 'B',
    clefable: 'A',
    comfey: 'A',
    cramorant: 'C',
    crustle: 'A',
	darkrai: 'B+',
    decidueye: 'B',
    delphox: 'C',
    dodrio: 'A+',
    dragapult: 'C',
    dragonite: 'B',
    duraludon: 'C',
    eldegoss: 'A+',
    empoleon: 'TBD',
    espeon: 'B+',
	falinks: 'C',
    garchomp: 'A',
    gardevoir: 'C',
    gengar: 'B',
    glaceon: 'B',
    goodra: 'D',
    greedent: 'C',
    greninja: 'B+',
	gyarados: 'D',
	hooh: 'A',
    hoopa: 'A+',
    inteleon: 'A',
    lapras: 'B',
	latias: 'B',
	latios: 'A',
    leafeon: 'A+',
    lucario: 'B+',
    machamp: 'C',
    mamoswine: 'B+',
    megalucario: 'TBD',
	meowscara: 'B',
	metagross: 'B+',
    mew: 'A+',
	mewtwox: 'D',
	mewtwoy: 'A',
	mimikyu: 'B+',
	miraidon: 'B+',
    mrmime: 'B',
    ninetales: 'B',
	pawmot: 'TBD',
    pikachu: 'B+',
	psyduck: 'A',
	rapidash: 'A',
    sableye: 'B+',
    scizor: 'A+',
    slowbro: 'B+',
    snorlax: 'S',
	suicune: 'S',
    sylveon: 'C',
    talonflame: 'B+',
	tinkaton: 'D',
    trevenant: 'B+',
    tsareena: 'S',
    tyranitar: 'C',
    umbreon: 'A',
    urshifu: 'A',
    venusaur: 'C',
    wigglytuff: 'C',
    zacian: 'A',
    zeraora: 'B+',
    zoroark: 'A'
}

const levelStats = {
  "absol": {
    1: { HP: 3000, ATK: 140, DEF: 52, SpATK: 20, SpDEF: 36, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3114, ATK: 159, DEF: 61, SpATK: 23, SpDEF: 42, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.71 , Speed: 3650 },
    3: { HP: 3239, ATK: 180, DEF: 71, SpATK: 27, SpDEF: 48, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.49 , Speed: 3650 },
    4: { HP: 3377, ATK: 203, DEF: 82, SpATK: 31, SpDEF: 55, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.35 , Speed: 3650 },
    5: { HP: 3528, ATK: 228, DEF: 94, SpATK: 36, SpDEF: 63, CritRate: 5 , CDR: 10 , Lifesteal: 5 , AtkSPD: 13.29 , Speed: 3800 },
    6: { HP: 3695, ATK: 256, DEF: 107, SpATK: 41, SpDEF: 72, CritRate: 5 , CDR: 10 , Lifesteal: 5 , AtkSPD: 14.33 , Speed: 3800 },
    7: { HP: 3878, ATK: 286, DEF: 121, SpATK: 47, SpDEF: 81, CritRate: 5 , CDR: 10 , Lifesteal: 5 , AtkSPD: 15.48 , Speed: 3950 },
    8: { HP: 4080, ATK: 319, DEF: 137, SpATK: 53, SpDEF: 91, CritRate: 5 , CDR: 10 , Lifesteal: 5 , AtkSPD: 16.74 , Speed: 3950 },
    9: { HP: 4303, ATK: 356, DEF: 154, SpATK: 60, SpDEF: 102, CritRate: 10 , CDR: 20 , Lifesteal: 10 , AtkSPD: 18.13 , Speed: 4100 },
    10: { HP: 4549, ATK: 397, DEF: 173, SpATK: 68, SpDEF: 115, CritRate: 10 , CDR: 20 , Lifesteal: 10 , AtkSPD: 19.66 , Speed: 4100 },
    11: { HP: 4819, ATK: 442, DEF: 194, SpATK: 76, SpDEF: 129, CritRate: 10 , CDR: 20 , Lifesteal: 10 , AtkSPD: 21.35 , Speed: 4250 },
    12: { HP: 5116, ATK: 491, DEF: 217, SpATK: 85, SpDEF: 144, CritRate: 10 , CDR: 20 , Lifesteal: 10 , AtkSPD: 23.21 , Speed: 4250 },
    13: { HP: 5443, ATK: 545, DEF: 242, SpATK: 95, SpDEF: 161, CritRate: 10 , CDR: 20 , Lifesteal: 10 , AtkSPD: 25.26 , Speed: 4250 },
    14: { HP: 5803, ATK: 605, DEF: 270, SpATK: 106, SpDEF: 180, CritRate: 10 , CDR: 20 , Lifesteal: 10 , AtkSPD: 27.51 , Speed: 4250 },
    15: { HP: 6200, ATK: 670, DEF: 300, SpATK: 118, SpDEF: 200, CritRate: 10 , CDR: 20 , Lifesteal: 10 , AtkSPD: 29.99 , Speed: 4250 }
  },
  "aegislash": {
    1: { HP: 3000, ATK: 168, DEF: 80, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 15.00 , Speed: 3600 },
    2: { HP: 3062, ATK: 171, DEF: 83, SpATK: 21, SpDEF: 62, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 15.98 , Speed: 3600 },
    3: { HP: 3136, ATK: 174, DEF: 86, SpATK: 23, SpDEF: 64, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 17.16 , Speed: 3600 },
    4: { HP: 3225, ATK: 178, DEF: 90, SpATK: 25, SpDEF: 67, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 18.57 , Speed: 3600 },
    5: { HP: 3547, ATK: 192, DEF: 105, SpATK: 32, SpDEF: 77, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 21.77 , Speed: 3750 },
    6: { HP: 3675, ATK: 198, DEF: 111, SpATK: 35, SpDEF: 81, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 23.81 , Speed: 3750 },
    7: { HP: 4259, ATK: 223, DEF: 138, SpATK: 48, SpDEF: 100, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 29.25 , Speed: 3900 },
    8: { HP: 4444, ATK: 231, DEF: 147, SpATK: 52, SpDEF: 106, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 35.18 , Speed: 3900 },
    9: { HP: 4665, ATK: 241, DEF: 157, SpATK: 57, SpDEF: 113, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 35.7 , Speed: 4050 },
    10: { HP: 4931, ATK: 253, DEF: 169, SpATK: 63, SpDEF: 122, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 39.92 , Speed: 4050 },
    11: { HP: 5250, ATK: 267, DEF: 184, SpATK: 70, SpDEF: 132, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 44.99 , Speed: 4200 },
    12: { HP: 5632, ATK: 284, DEF: 202, SpATK: 78, SpDEF: 144, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 44.99 , Speed: 4200 },
    13: { HP: 6091, ATK: 304, DEF: 223, SpATK: 88, SpDEF: 159, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 44.99 , Speed: 4200 },
    14: { HP: 6641, ATK: 328, DEF: 249, SpATK: 100, SpDEF: 177, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 44.99 , Speed: 4200 },
    15: { HP: 7302, ATK: 357, DEF: 280, SpATK: 115, SpDEF: 200, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 44.99 , Speed: 4200 }
  },
  "alcremie": {
    1: { HP: 3100, ATK: 120, DEF: 40, SpATK: 50, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3231, ATK: 124, DEF: 46, SpATK: 64, SpDEF: 38, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.22 , Speed: 3800 },
    3: { HP: 3381, ATK: 128, DEF: 53, SpATK: 80, SpDEF: 47, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.47 , Speed: 3800 },
    4: { HP: 4144, ATK: 149, DEF: 89, SpATK: 164, SpDEF: 91, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.76 , Speed: 3800 },
    5: { HP: 4343, ATK: 154, DEF: 99, SpATK: 186, SpDEF: 102, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.1 , Speed: 3950 },
    6: { HP: 4572, ATK: 160, DEF: 110, SpATK: 211, SpDEF: 115, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.49 , Speed: 3950 },
    7: { HP: 4835, ATK: 167, DEF: 123, SpATK: 240, SpDEF: 130, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.94 , Speed: 4100 },
    8: { HP: 5138, ATK: 175, DEF: 137, SpATK: 273, SpDEF: 147, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.45 , Speed: 4100 },
    9: { HP: 5487, ATK: 184, DEF: 154, SpATK: 311, SpDEF: 167, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.04 , Speed: 4250 },
    10: { HP: 5888, ATK: 195, DEF: 173, SpATK: 355, SpDEF: 190, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.72 , Speed: 4250 },
    11: { HP: 6349, ATK: 208, DEF: 195, SpATK: 406, SpDEF: 217, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.5 , Speed: 4400 },
    12: { HP: 6880, ATK: 222, DEF: 220, SpATK: 464, SpDEF: 248, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.4 , Speed: 4400 },
    13: { HP: 7491, ATK: 239, DEF: 249, SpATK: 531, SpDEF: 283, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.43 , Speed: 4400 },
    14: { HP: 8193, ATK: 258, DEF: 282, SpATK: 608, SpDEF: 323, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.62 , Speed: 4400 },
    15: { HP: 9000, ATK: 280, DEF: 320, SpATK: 696, SpDEF: 370, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 19.99 , Speed: 4400 }
  },
    "armarouge": {
	1: { HP: 3300, ATK: 150, DEF: 60, SpATK: 80, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3387, ATK: 154, DEF: 65, SpATK: 94, SpDEF: 44, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.89 , Speed: 3600 },
    3: { HP: 3486, ATK: 159, DEF: 71, SpATK: 110, SpDEF: 49, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.91 , Speed: 3600 },
    4: { HP: 3600, ATK: 165, DEF: 78, SpATK: 128, SpDEF: 55, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.08 , Speed: 3750 },
    5: { HP: 4122, ATK: 192, DEF: 110, SpATK: 211, SpDEF: 82, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 18.43 , Speed: 3750 },
    6: { HP: 4273, ATK: 200, DEF: 119, SpATK: 235, SpDEF: 90, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 19.98 , Speed: 3900 },
    7: { HP: 4447, ATK: 209, DEF: 130, SpATK: 263, SpDEF: 99, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 21.76 , Speed: 3900 },
    8: { HP: 4647, ATK: 219, DEF: 142, SpATK: 295, SpDEF: 109, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 23.82 , Speed: 4050 },
    9: { HP: 4878, ATK: 231, DEF: 156, SpATK: 332, SpDEF: 121, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 26.18 , Speed: 4050 },
    10: { HP: 5143, ATK: 244, DEF: 172, SpATK: 374, SpDEF: 134, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 28.9 , Speed: 4200 },
    11: { HP: 5448, ATK: 260, DEF: 191, SpATK: 422, SpDEF: 150, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 32.03 , Speed: 4200 },
    12: { HP: 5799, ATK: 278, DEF: 213, SpATK: 478, SpDEF: 168, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 35.63 , Speed: 4200 },
    13: { HP: 6203, ATK: 299, DEF: 238, SpATK: 542, SpDEF: 189, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 39.77 , Speed: 4200 },
    14: { HP: 6667, ATK: 323, DEF: 267, SpATK: 616, SpDEF: 213, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 44.53 , Speed: 4200 },
    15: { HP: 7200, ATK: 350, DEF: 300, SpATK: 700, SpDEF: 240, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 50.00 , Speed: 4200 }
  },
    "azumarill": {
    1: { HP: 3250, ATK: 125, DEF: 80, SpATK: 20, SpDEF: 80, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3352, ATK: 132, DEF: 87, SpATK: 22, SpDEF: 87, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.67 , Speed: 3600 },
    3: { HP: 3469, ATK: 141, DEF: 95, SpATK: 24, SpDEF: 95, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.43 , Speed: 3600 },
    4: { HP: 4064, ATK: 185, DEF: 136, SpATK: 36, SpDEF: 136, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.31 , Speed: 3600 },
    5: { HP: 4219, ATK: 196, DEF: 147, SpATK: 40, SpDEF: 147, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 16.32 , Speed: 3750 },
    6: { HP: 4398, ATK: 209, DEF: 159, SpATK: 44, SpDEF: 159, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 17.48 , Speed: 3750 },
    7: { HP: 4603, ATK: 224, DEF: 173, SpATK: 48, SpDEF: 173, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 18.82 , Speed: 3900 },
    8: { HP: 4839, ATK: 241, DEF: 189, SpATK: 53, SpDEF: 189, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 20.36 , Speed: 3900 },
    9: { HP: 5111, ATK: 261, DEF: 208, SpATK: 59, SpDEF: 208, CritRate: 0 , CDR: 0 , Lifesteal: 10 , AtkSPD: 22.13 , Speed: 4050 },
    10: { HP: 5424, ATK: 284, DEF: 230, SpATK: 65, SpDEF: 230, CritRate: 0 , CDR: 0 , Lifesteal: 10 , AtkSPD: 24.17 , Speed: 4050 },
    11: { HP: 5784, ATK: 310, DEF: 255, SpATK: 72, SpDEF: 255, CritRate: 0 , CDR: 0 , Lifesteal: 10 , AtkSPD: 26.52 , Speed: 4200 },
    12: { HP: 6198, ATK: 340, DEF: 284, SpATK: 81, SpDEF: 284, CritRate: 0 , CDR: 0 , Lifesteal: 10 , AtkSPD: 29.22 , Speed: 4200 },
    13: { HP: 6674, ATK: 375, DEF: 317, SpATK: 91, SpDEF: 317, CritRate: 0 , CDR: 0 , Lifesteal: 10 , AtkSPD: 32.33 , Speed: 4200 },
    14: { HP: 7221, ATK: 415, DEF: 355, SpATK: 102, SpDEF: 355, CritRate: 0 , CDR: 0 , Lifesteal: 10 , AtkSPD: 35.9 , Speed: 4200 },
    15: { HP: 7850, ATK: 461, DEF: 399, SpATK: 115, SpDEF: 399, CritRate: 0 , CDR: 0 , Lifesteal: 10 , AtkSPD: 40.00 , Speed: 4200 }
  },
    "blastoise": {
    1: { HP: 3225, ATK: 150, DEF: 100, SpATK: 50, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3326, ATK: 152, DEF: 108, SpATK: 55, SpDEF: 75, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3447, ATK: 154, DEF: 117, SpATK: 61, SpDEF: 82, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3593, ATK: 157, DEF: 128, SpATK: 68, SpDEF: 90, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 4122, ATK: 168, DEF: 169, SpATK: 95, SpDEF: 119, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 4333, ATK: 172, DEF: 185, SpATK: 106, SpDEF: 130, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 5293, ATK: 191, DEF: 205, SpATK: 155, SpDEF: 144, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.86 , Speed: 4000 },
    8: { HP: 5597, ATK: 197, DEF: 229, SpATK: 171, SpDEF: 160, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.72 , Speed: 4000 },
    9: { HP: 5961, ATK: 204, DEF: 312, SpATK: 190, SpDEF: 218, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 6398, ATK: 213, DEF: 346, SpATK: 212, SpDEF: 242, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 6923, ATK: 224, DEF: 387, SpATK: 239, SpDEF: 271, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 7552, ATK: 237, DEF: 436, SpATK: 271, SpDEF: 305, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 8307, ATK: 252, DEF: 495, SpATK: 310, SpDEF: 346, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 9213, ATK: 270, DEF: 565, SpATK: 356, SpDEF: 395, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 10300, ATK: 292, DEF: 650, SpATK: 412, SpDEF: 455, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },
    "blaziken": {
    1: { HP: 3250, ATK: 160, DEF: 80, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3315, ATK: 165, DEF: 85, SpATK: 21, SpDEF: 64, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3393, ATK: 171, DEF: 92, SpATK: 23, SpDEF: 69, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3487, ATK: 178, DEF: 100, SpATK: 25, SpDEF: 75, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 3827, ATK: 203, DEF: 128, SpATK: 32, SpDEF: 97, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 3963, ATK: 213, DEF: 139, SpATK: 35, SpDEF: 106, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 4581, ATK: 258, DEF: 190, SpATK: 48, SpDEF: 145, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.86 , Speed: 4000 },
    8: { HP: 4776, ATK: 272, DEF: 206, SpATK: 52, SpDEF: 157, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 16.72 , Speed: 4000 },
    9: { HP: 5010, ATK: 289, DEF: 226, SpATK: 57, SpDEF: 172, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 5291, ATK: 309, DEF: 249, SpATK: 63, SpDEF: 190, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 5628, ATK: 333, DEF: 277, SpATK: 70, SpDEF: 212, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 6033, ATK: 362, DEF: 311, SpATK: 78, SpDEF: 238, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 6518, ATK: 397, DEF: 351, SpATK: 88, SpDEF: 269, CritRate: 10 , CDR: 0 , Lifesteal: 15 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 7101, ATK: 439, DEF: 400, SpATK: 100, SpDEF: 306, CritRate: 10 , CDR: 0 , Lifesteal: 15 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 7800, ATK: 490, DEF: 458, SpATK: 115, SpDEF: 351, CritRate: 10 , CDR: 0 , Lifesteal: 15 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "blissey": {
    1: { HP: 3278, ATK: 130, DEF: 40, SpATK: 40, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3427, ATK: 134, DEF: 44, SpATK: 52, SpDEF: 65, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.22 , Speed: 3700 },
    3: { HP: 3598, ATK: 139, DEF: 48, SpATK: 66, SpDEF: 71, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.47 , Speed: 3700 },
    4: { HP: 4467, ATK: 162, DEF: 69, SpATK: 138, SpDEF: 102, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.76 , Speed: 3700 },
    5: { HP: 4694, ATK: 168, DEF: 74, SpATK: 157, SpDEF: 110, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.1 , Speed: 3850 },
    6: { HP: 4955, ATK: 175, DEF: 80, SpATK: 179, SpDEF: 119, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.49 , Speed: 3850 },
    7: { HP: 5255, ATK: 183, DEF: 87, SpATK: 204, SpDEF: 130, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.94 , Speed: 4000 },
    8: { HP: 5600, ATK: 192, DEF: 95, SpATK: 233, SpDEF: 142, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.45 , Speed: 4000 },
    9: { HP: 5997, ATK: 203, DEF: 104, SpATK: 266, SpDEF: 156, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.04 , Speed: 4150 },
    10: { HP: 6454, ATK: 215, DEF: 115, SpATK: 304, SpDEF: 172, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.72 , Speed: 4150 },
    11: { HP: 6980, ATK: 229, DEF: 128, SpATK: 348, SpDEF: 191, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.5 , Speed: 4300 },
    12: { HP: 7585, ATK: 245, DEF: 142, SpATK: 398, SpDEF: 213, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.4 , Speed: 4300 },
    13: { HP: 8281, ATK: 264, DEF: 159, SpATK: 456, SpDEF: 238, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.43 , Speed: 4300 },
    14: { HP: 9081, ATK: 285, DEF: 178, SpATK: 523, SpDEF: 267, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.62 , Speed: 4300 },
    15: { HP: 10000, ATK: 310, DEF: 200, SpATK: 600, SpDEF: 300, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 19.99 , Speed: 4300 },
  },

    "buzzwole": {
    1: { HP: 3250, ATK: 170, DEF: 120, SpATK: 20, SpDEF: 80, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3412, ATK: 180, DEF: 134, SpATK: 23, SpDEF: 91, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.71 , Speed: 3700 },
    3: { HP: 3590, ATK: 191, DEF: 149, SpATK: 27, SpDEF: 103, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.49 , Speed: 3700 },
    4: { HP: 3786, ATK: 203, DEF: 165, SpATK: 31, SpDEF: 116, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.35 , Speed: 3700 },
    5: { HP: 4001, ATK: 216, DEF: 183, SpATK: 35, SpDEF: 130, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 13.29 , Speed: 3850 },
    6: { HP: 4238, ATK: 231, DEF: 203, SpATK: 40, SpDEF: 146, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 14.33 , Speed: 3850 },
    7: { HP: 4499, ATK: 247, DEF: 225, SpATK: 45, SpDEF: 163, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.48 , Speed: 4000 },
    8: { HP: 4786, ATK: 265, DEF: 249, SpATK: 51, SpDEF: 182, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 16.74 , Speed: 4000 },
    9: { HP: 5103, ATK: 285, DEF: 275, SpATK: 58, SpDEF: 203, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 18.13 , Speed: 4150 },
    10: { HP: 5452, ATK: 306, DEF: 304, SpATK: 65, SpDEF: 226, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 19.66 , Speed: 4150 },
    11: { HP: 5836, ATK: 330, DEF: 336, SpATK: 73, SpDEF: 251, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 21.35 , Speed: 4300 },
    12: { HP: 6259, ATK: 356, DEF: 371, SpATK: 82, SpDEF: 279, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 23.21 , Speed: 4300 },
    13: { HP: 6724, ATK: 385, DEF: 410, SpATK: 92, SpDEF: 309, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 25.26 , Speed: 4300 },
    14: { HP: 7236, ATK: 417, DEF: 453, SpATK: 103, SpDEF: 343, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 27.51 , Speed: 4300 },
    15: { HP: 7800, ATK: 452, DEF: 500, SpATK: 115, SpDEF: 380, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 29.99 , Speed: 4300 },
  },

    "ceruledge": {
    1: { HP: 3250, ATK: 125, DEF: 80, SpATK: 20, SpDEF: 64, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3352, ATK: 132, DEF: 85, SpATK: 22, SpDEF: 71, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.89 , Speed: 3700 },
    3: { HP: 3469, ATK: 140, DEF: 91, SpATK: 24, SpDEF: 79, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.91 , Speed: 3700 },
    4: { HP: 3604, ATK: 149, DEF: 98, SpATK: 27, SpDEF: 88, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.08 , Speed: 3700 },
    5: { HP: 4219, ATK: 190, DEF: 130, SpATK: 40, SpDEF: 130, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 18.43 , Speed: 3850 },
    6: { HP: 4398, ATK: 202, DEF: 139, SpATK: 44, SpDEF: 142, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 19.98 , Speed: 3850 },
    7: { HP: 4603, ATK: 216, DEF: 150, SpATK: 48, SpDEF: 156, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 21.76 , Speed: 4000 },
    8: { HP: 4839, ATK: 232, DEF: 162, SpATK: 53, SpDEF: 172, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 23.82 , Speed: 4000 },
    9: { HP: 5111, ATK: 250, DEF: 176, SpATK: 59, SpDEF: 191, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 26.18 , Speed: 4150 },
    10: { HP: 5424, ATK: 271, DEF: 192, SpATK: 66, SpDEF: 213, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 28.9 , Speed: 4150 },
    11: { HP: 5784, ATK: 295, DEF: 211, SpATK: 73, SpDEF: 238, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 32.03 , Speed: 4300 },
    12: { HP: 6198, ATK: 322, DEF: 233, SpATK: 82, SpDEF: 266, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 35.63 , Speed: 4300 },
    13: { HP: 6674, ATK: 353, DEF: 258, SpATK: 92, SpDEF: 299, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 39.77 , Speed: 4300 },
    14: { HP: 7221, ATK: 389, DEF: 287, SpATK: 103, SpDEF: 337, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 44.53 , Speed: 4300 },
    15: { HP: 7850, ATK: 430, DEF: 320, SpATK: 116, SpDEF: 380, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 50.00 , Speed: 4300 },
  },

    "chandelure": {
    1: { HP: 3200, ATK: 135, DEF: 35, SpATK: 50, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3244, ATK: 137, DEF: 37, SpATK: 64, SpDEF: 32, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3297, ATK: 140, DEF: 40, SpATK: 80, SpDEF: 35, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3361, ATK: 143, DEF: 43, SpATK: 100, SpDEF: 39, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 3593, ATK: 155, DEF: 55, SpATK: 171, SpDEF: 52, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 3685, ATK: 160, DEF: 60, SpATK: 199, SpDEF: 57, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 4106, ATK: 181, DEF: 82, SpATK: 328, SpDEF: 80, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.86 , Speed: 4000 },
    8: { HP: 4239, ATK: 188, DEF: 89, SpATK: 369, SpDEF: 87, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.72 , Speed: 4000 },
    9: { HP: 4399, ATK: 196, DEF: 97, SpATK: 418, SpDEF: 96, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 4591, ATK: 206, DEF: 107, SpATK: 477, SpDEF: 107, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 4821, ATK: 218, DEF: 119, SpATK: 548, SpDEF: 120, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 5097, ATK: 232, DEF: 124, SpATK: 633, SpDEF: 135, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 5428, ATK: 249, DEF: 152, SpATK: 735, SpDEF: 153, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 5825, ATK: 269, DEF: 173, SpATK: 857, SpDEF: 175, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 6300, ATK: 295, DEF: 200, SpATK: 1005, SpDEF: 203, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4300 },
  },

    "charizard": {
    1: { HP: 3200, ATK: 161, DEF: 70, SpATK: 20, SpDEF: 54, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 0.00 , Speed: 3700 },
    2: { HP: 3264, ATK: 165, DEF: 75, SpATK: 21, SpDEF: 58, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 0.00 , Speed: 3700 },
    3: { HP: 3341, ATK: 170, DEF: 81, SpATK: 23, SpDEF: 63, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 0.00 , Speed: 3700 },
    4: { HP: 3434, ATK: 176, DEF: 88, SpATK: 25, SpDEF: 68, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 0.00 , Speed: 3700 },
    5: { HP: 3771, ATK: 199, DEF: 121, SpATK: 32, SpDEF: 95, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 0.00 , Speed: 3850 },
    6: { HP: 3905, ATK: 208, DEF: 131, SpATK: 35, SpDEF: 103, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 0.00 , Speed: 3850 },
    7: { HP: 4516, ATK: 249, DEF: 168, SpATK: 48, SpDEF: 132, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 0.00 , Speed: 4000 },
    8: { HP: 4709, ATK: 262, DEF: 182, SpATK: 52, SpDEF: 143, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 0.00 , Speed: 4000 },
    9: { HP: 4941, ATK: 277, DEF: 199, SpATK: 57, SpDEF: 157, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 0.00 , Speed: 4150 },
    10: { HP: 5219, ATK: 296, DEF: 219, SpATK: 63, SpDEF: 173, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 0.00 , Speed: 4150 },
    11: { HP: 5553, ATK: 318, DEF: 243, SpATK: 70, SpDEF: 193, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 0.00 , Speed: 4300 },
    12: { HP: 5953, ATK: 345, DEF: 272, SpATK: 78, SpDEF: 217, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 0.00 , Speed: 4300 },
    13: { HP: 6433, ATK: 377, DEF: 307, SpATK: 88, SpDEF: 245, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 0.00 , Speed: 4300 },
    14: { HP: 7009, ATK: 416, DEF: 349, SpATK: 100, SpDEF: 279, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 0.00 , Speed: 4300 },
    15: { HP: 7700, ATK: 462, DEF: 400, SpATK: 115, SpDEF: 320, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 0.00 , Speed: 4300 },
  },

  "megacharizardx": {
    1: { HP: 3200, ATK: 161, DEF: 70, SpATK: 20, SpDEF: 54, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 0.00 , Speed: 3700 },
    2: { HP: 3264, ATK: 165, DEF: 75, SpATK: 21, SpDEF: 58, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 0.00 , Speed: 3700 },
    3: { HP: 3341, ATK: 170, DEF: 81, SpATK: 23, SpDEF: 63, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 0.00 , Speed: 3700 },
    4: { HP: 3434, ATK: 176, DEF: 88, SpATK: 25, SpDEF: 68, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 0.00 , Speed: 3700 },
    5: { HP: 3771, ATK: 199, DEF: 121, SpATK: 32, SpDEF: 95, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 0.00 , Speed: 3850 },
    6: { HP: 3905, ATK: 208, DEF: 131, SpATK: 35, SpDEF: 103, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 0.00 , Speed: 3850 },
    7: { HP: 4516, ATK: 249, DEF: 168, SpATK: 48, SpDEF: 132, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 0.00 , Speed: 4000 },
    8: { HP: 4709, ATK: 262, DEF: 182, SpATK: 52, SpDEF: 143, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 0.00 , Speed: 4000 },
    9: { HP: 4941, ATK: 277, DEF: 199, SpATK: 57, SpDEF: 157, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 0.00 , Speed: 4150 },
    10: { HP: 5219, ATK: 296, DEF: 219, SpATK: 63, SpDEF: 173, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 0.00 , Speed: 4150 },
    11: { HP: 5553, ATK: 318, DEF: 243, SpATK: 70, SpDEF: 193, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 0.00 , Speed: 4300 },
    12: { HP: 5953, ATK: 345, DEF: 272, SpATK: 78, SpDEF: 217, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 0.00 , Speed: 4300 },
    13: { HP: 6433, ATK: 377, DEF: 307, SpATK: 88, SpDEF: 245, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 0.00 , Speed: 4300 },
    14: { HP: 7009, ATK: 416, DEF: 349, SpATK: 100, SpDEF: 279, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 0.00 , Speed: 4300 },
    15: { HP: 7700, ATK: 462, DEF: 400, SpATK: 115, SpDEF: 320, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 0.00 , Speed: 4300 },
  },

    "cinderace": {
    1: { HP: 3000, ATK: 135, DEF: 50, SpATK: 20, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3043, ATK: 140, DEF: 53, SpATK: 21, SpDEF: 33, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.87 , Speed: 3650 },
    3: { HP: 3095, ATK: 145, DEF: 57, SpATK: 23, SpDEF: 36, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 14.11 , Speed: 3650 },
    4: { HP: 3157, ATK: 151, DEF: 62, SpATK: 25, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 16.8 , Speed: 3650 },
    5: { HP: 3382, ATK: 174, DEF: 78, SpATK: 32, SpDEF: 55, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 26.53 , Speed: 3800 },
    6: { HP: 3471, ATK: 183, DEF: 84, SpATK: 35, SpDEF: 61, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 30.4 , Speed: 3800 },
    7: { HP: 3878, ATK: 221, DEF: 114, SpATK: 49, SpDEF: 88, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 48.04 , Speed: 3950 },
    8: { HP: 4007, ATK: 233, DEF: 123, SpATK: 53, SpDEF: 97, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 53.61 , Speed: 3950 },
    9: { HP: 4161, ATK: 247, DEF: 134, SpATK: 58, SpDEF: 107, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 60.3 , Speed: 4100 },
    10: { HP: 4346, ATK: 264, DEF: 147, SpATK: 64, SpDEF: 119, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 68.33 , Speed: 4100 },
    11: { HP: 4568, ATK: 284, DEF: 163, SpATK: 71, SpDEF: 134, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 77.96 , Speed: 4250 },
    12: { HP: 4835, ATK: 309, DEF: 182, SpATK: 80, SpDEF: 152, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 89.52 , Speed: 4250 },
    13: { HP: 5155, ATK: 339, DEF: 206, SpATK: 91, SpDEF: 175, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 103.39 , Speed: 4250 },
    14: { HP: 5539, ATK: 375, DEF: 235, SpATK: 104, SpDEF: 201, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 120.03 , Speed: 4250 },
    15: { HP: 6000, ATK: 418, DEF: 268, SpATK: 119, SpDEF: 232, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 140.00 , Speed: 4250 },
  },

    "clefable": {
    1: { HP: 3300, ATK: 130, DEF: 40, SpATK: 40, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3427, ATK: 134, DEF: 46, SpATK: 54, SpDEF: 37, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.22 , Speed: 3700 },
    3: { HP: 3527, ATK: 138, DEF: 53, SpATK: 70, SpDEF: 45, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.47 , Speed: 3700 },
    4: { HP: 4309, ATK: 160, DEF: 87, SpATK: 152, SpDEF: 84, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.76 , Speed: 3700 },
    5: { HP: 4502, ATK: 166, DEF: 96, SpATK: 173, SpDEF: 94, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.1 , Speed: 3850 },
    6: { HP: 4723, ATK: 173, DEF: 106, SpATK: 198, SpDEF: 106, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.49 , Speed: 3850 },
    7: { HP: 4977, ATK: 181, DEF: 118, SpATK: 226, SpDEF: 119, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.94 , Speed: 4000 },
    8: { HP: 5270, ATK: 190, DEF: 131, SpATK: 258, SpDEF: 134, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.45 , Speed: 4000 },
    9: { HP: 5607, ATK: 200, DEF: 146, SpATK: 295, SpDEF: 152, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.04 , Speed: 4150 },
    10: { HP: 5994, ATK: 211, DEF: 164, SpATK: 338, SpDEF: 172, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.72 , Speed: 4150 },
    11: { HP: 6440, ATK: 224, DEF: 184, SpATK: 387, SpDEF: 195, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.5 , Speed: 4300 },
    12: { HP: 6953, ATK: 239, DEF: 207, SpATK: 444, SpDEF: 222, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.4 , Speed: 4300 },
    13: { HP: 7543, ATK: 257, DEF: 234, SpATK: 509, SpDEF: 253, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.44 , Speed: 4300 },
    14: { HP: 8221, ATK: 277, DEF: 265, SpATK: 584, SpDEF: 289, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.63 , Speed: 4300 },
    15: { HP: 9000, ATK: 300, DEF: 300, SpATK: 670, SpDEF: 330, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 20.00 , Speed: 4300 },
  },

    "comfey":{
    1: { HP: 3000, ATK: 120, DEF: 40, SpATK: 50, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3103, ATK: 126, DEF: 47, SpATK: 71, SpDEF: 37, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.36 , Speed: 3700 },
    3: { HP: 3217, ATK: 133, DEF: 55, SpATK: 95, SpDEF: 44, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.75 , Speed: 3700 },
    4: { HP: 3342, ATK: 140, DEF: 64, SpATK: 121, SpDEF: 52, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.18 , Speed: 3700 },
    5: { HP: 3479, ATK: 148, DEF: 74, SpATK: 149, SpDEF: 61, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 11.65 , Speed: 3850 },
    6: { HP: 3630, ATK: 157, DEF: 85, SpATK: 180, SpDEF: 71, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.17 , Speed: 3850 },
    7: { HP: 3796, ATK: 167, DEF: 97, SpATK: 214, SpDEF: 82, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.74 , Speed: 4000 },
    8: { HP: 3979, ATK: 178, DEF: 110, SpATK: 252, SpDEF: 94, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.37 , Speed: 4000 },
    9: { HP: 4181, ATK: 190, DEF: 125, SpATK: 294, SpDEF: 107, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.07 , Speed: 4150 },
    10: { HP: 4403, ATK: 203, DEF: 141, SpATK: 340, SpDEF: 122, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.84 , Speed: 4150 },
    11: { HP: 4648, ATK: 217, DEF: 159, SpATK: 391, SpDEF: 138, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.68 , Speed: 4300 },
    12: { HP: 4917, ATK: 233, DEF: 179, SpATK: 447, SpDEF: 156, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.61 , Speed: 4300 },
    13: { HP: 5214, ATK: 250, DEF: 200, SpATK: 508, SpDEF: 175, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.63 , Speed: 4300 },
    14: { HP: 5541, ATK: 269, DEF: 224, SpATK: 576, SpDEF: 196, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.76 , Speed: 4300 },
    15: { HP: 5900, ATK: 290, DEF: 250, SpATK: 650, SpDEF: 220, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 20.00 , Speed: 4300 }
  },

    "cramorant": {
    1: { HP: 3292, ATK: 134, DEF: 60, SpATK: 50, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3399, ATK: 139, DEF: 69, SpATK: 75, SpDEF: 46, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.78 , Speed: 3700 },
    3: { HP: 3517, ATK: 145, DEF: 78, SpATK: 102, SpDEF: 52, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.74 , Speed: 3700 },
    4: { HP: 3647, ATK: 151, DEF: 88, SpATK: 132, SpDEF: 59, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 15.89 , Speed: 3700 },
    5: { HP: 3789, ATK: 158, DEF: 99, SpATK: 165, SpDEF: 67, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 18.25 , Speed: 3850 },
    6: { HP: 3946, ATK: 166, DEF: 112, SpATK: 201, SpDEF: 75, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 20.86 , Speed: 3850 },
    7: { HP: 4118, ATK: 175, DEF: 126, SpATK: 240, SpDEF: 84, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 23.72 , Speed: 4000 },
    8: { HP: 4308, ATK: 185, DEF: 141, SpATK: 283, SpDEF: 94, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 26.88 , Speed: 4000 },
    9: { HP: 4517, ATK: 196, DEF: 158, SpATK: 331, SpDEF: 105, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 30.36 , Speed: 4150 },
    10: { HP: 4748, ATK: 208, DEF: 176, SpATK: 384, SpDEF: 117, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 34.19 , Speed: 4150 },
    11: { HP: 5002, ATK: 221, DEF: 196, SpATK: 442, SpDEF: 131, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 38.41 , Speed: 4300 },
    12: { HP: 5281, ATK: 235, DEF: 218, SpATK: 506, SpDEF: 146, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 43.05 , Speed: 4300 },
    13: { HP: 5589, ATK: 250, DEF: 243, SpATK: 576, SpDEF: 162, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 48.16 , Speed: 4300 },
    14: { HP: 5928, ATK: 267, DEF: 270, SpATK: 654, SpDEF: 180, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 53.79 , Speed: 4300 },
    15: { HP: 6301, ATK: 286, DEF: 300, SpATK: 739, SpDEF: 200, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 60.00 , Speed: 4300 },
  },

    "crustle": {
    1: { HP: 3300, ATK: 175, DEF: 97, SpATK: 20, SpDEF: 67, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3447, ATK: 179, DEF: 109, SpATK: 22, SpDEF: 76, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.44 , Speed: 3600 },
    3: { HP: 3615, ATK: 183, DEF: 123, SpATK: 24, SpDEF: 86, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3600 },
    4: { HP: 4469, ATK: 205, DEF: 193, SpATK: 36, SpDEF: 137, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.54 , Speed: 3600 },
    5: { HP: 4692, ATK: 211, DEF: 211, SpATK: 39, SpDEF: 150, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.22 , Speed: 3750 },
    6: { HP: 4948, ATK: 218, DEF: 232, SpATK: 43, SpDEF: 165, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.00 , Speed: 3750 },
    7: { HP: 5242, ATK: 226, DEF: 256, SpATK: 47, SpDEF: 182, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.89 , Speed: 3900 },
    8: { HP: 5581, ATK: 235, DEF: 284, SpATK: 52, SpDEF: 202, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.92 , Speed: 3900 },
    9: { HP: 5971, ATK: 245, DEF: 316, SpATK: 58, SpDEF: 225, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.1 , Speed: 4050 },
    10: { HP: 6420, ATK: 256, DEF: 353, SpATK: 65, SpDEF: 252, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 19.46 , Speed: 4050 },
    11: { HP: 6936, ATK: 269, DEF: 396, SpATK: 73, SpDEF: 283, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 21.02 , Speed: 4200 },
    12: { HP: 7530, ATK: 284, DEF: 445, SpATK: 82, SpDEF: 318, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 22.82 , Speed: 4200 },
    13: { HP: 8213, ATK: 301, DEF: 501, SpATK: 92, SpDEF: 359, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 24.89 , Speed: 4200 },
    14: { HP: 8998, ATK: 321, DEF: 566, SpATK: 103, SpDEF: 406, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 27.27 , Speed: 4200 },
    15: { HP: 9900, ATK: 344, DEF: 640, SpATK: 116, SpDEF: 460, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4200 }
  },

    "darkrai": {
    1: { HP: 3600, ATK: 160, DEF: 80, SpATK: 90, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3739, ATK: 167, DEF: 90, SpATK: 112, SpDEF: 67, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.71 , Speed: 3800 },
    3: { HP: 3892, ATK: 175, DEF: 101, SpATK: 137, SpDEF: 75, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.49 , Speed: 3800 },
    4: { HP: 4060, ATK: 184, DEF: 113, SpATK: 164, SpDEF: 84, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.35 , Speed: 3800 },
    5: { HP: 4244, ATK: 193, DEF: 126, SpATK: 194, SpDEF: 93, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 13.3 , Speed: 3950 },
    6: { HP: 4447, ATK: 203, DEF: 140, SpATK: 227, SpDEF: 103, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.34 , Speed: 3950 },
    7: { HP: 4670, ATK: 214, DEF: 155, SpATK: 263, SpDEF: 114, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.49 , Speed: 4100 },
    8: { HP: 4916, ATK: 227, DEF: 172, SpATK: 303, SpDEF: 127, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.75 , Speed: 4100 },
    9: { HP: 5187, ATK: 241, DEF: 191, SpATK: 347, SpDEF: 141, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 18.14 , Speed: 4250 },
    10: { HP: 5486, ATK: 256, DEF: 212, SpATK: 395, SpDEF: 156, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 19.67 , Speed: 4250 },
    11: { HP: 5816, ATK: 273, DEF: 235, SpATK: 448, SpDEF: 173, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 21.36 , Speed: 4400 },
    12: { HP: 6178, ATK: 292, DEF: 260, SpATK: 507, SpDEF: 192, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 23.22 , Speed: 4400 },
    13: { HP: 6577, ATK: 312, DEF: 287, SpATK: 571, SpDEF: 212, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 25.27 , Speed: 4400 },
    14: { HP: 7016, ATK: 335, DEF: 317, SpATK: 642, SpDEF: 235, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 27.52 , Speed: 4400 },
    15: { HP: 7500, ATK: 360, DEF: 350, SpATK: 720, SpDEF: 260, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4400 },
  },

    "decidueye": {
    1: { HP: 3000, ATK: 125, DEF: 50, SpATK: 20, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3031, ATK: 130, DEF: 53, SpATK: 22, SpDEF: 33, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.57 , Speed: 3600 },
    3: { HP: 3068, ATK: 136, DEF: 57, SpATK: 24, SpDEF: 36, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.46 , Speed: 3600 },
    4: { HP: 3112, ATK: 143, DEF: 62, SpATK: 27, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 15.73 , Speed: 3600 },
    5: { HP: 3273, ATK: 167, DEF: 78, SpATK: 37, SpDEF: 55, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 23.96 , Speed: 3750 },
    6: { HP: 3337, ATK: 177, DEF: 85, SpATK: 41, SpDEF: 61, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 27.24 , Speed: 3750 },
    7: { HP: 3629, ATK: 221, DEF: 115, SpATK: 58, SpDEF: 88, CritRate: 15 , CDR: 0 , Lifesteal: 10 , AtkSPD: 42.17 , Speed: 3900 },
    8: { HP: 3721, ATK: 235, DEF: 124, SpATK: 64, SpDEF: 97, CritRate: 15 , CDR: 0 , Lifesteal: 10 , AtkSPD: 46.89 , Speed: 3900 },
    9: { HP: 3832, ATK: 252, DEF: 135, SpATK: 71, SpDEF: 107, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 52.55 , Speed: 4050 },
    10: { HP: 3965, ATK: 272, DEF: 149, SpATK: 79, SpDEF: 119, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 59.34 , Speed: 4050 },
    11: { HP: 4125, ATK: 296, DEF: 165, SpATK: 89, SpDEF: 134, CritRate: 30 , CDR: 0 , Lifesteal: 20 , AtkSPD: 67.5 , Speed: 4200 },
    12: { HP: 4316, ATK: 325, DEF: 185, SpATK: 100, SpDEF: 152, CritRate: 30 , CDR: 0 , Lifesteal: 20 , AtkSPD: 77.28 , Speed: 4200 },
    13: { HP: 4546, ATK: 359, DEF: 208, SpATK: 114, SpDEF: 173, CritRate: 30 , CDR: 0 , Lifesteal: 25 , AtkSPD: 89.02 , Speed: 4200 },
    14: { HP: 4821, ATK: 400, DEF: 236, SpATK: 130, SpDEF: 199, CritRate: 30 , CDR: 0 , Lifesteal: 25 , AtkSPD: 103.1 , Speed: 4200 },
    15: { HP: 5152, ATK: 450, DEF: 270, SpATK: 150, SpDEF: 230, CritRate: 30 , CDR: 0 , Lifesteal: 25 , AtkSPD: 120.00 , Speed: 4200 },
  },

    "delphox": {
    1: { HP: 3300, ATK: 134, DEF: 35, SpATK: 80, SpDEF: 27, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3343, ATK: 136, DEF: 37, SpATK: 92, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.21 , Speed: 3700 },
    3: { HP: 3394, ATK: 139, DEF: 39, SpATK: 107, SpDEF: 33, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.47 , Speed: 3700 },
    4: { HP: 3605, ATK: 150, DEF: 49, SpATK: 168, SpDEF: 47, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.53 , Speed: 3700 },
    5: { HP: 3679, ATK: 154, DEF: 52, SpATK: 190, SpDEF: 52, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 11.9 , Speed: 3850 },
    6: { HP: 4067, ATK: 174, DEF: 70, SpATK: 303, SpDEF: 78, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.85 , Speed: 3850 },
    7: { HP: 4174, ATK: 180, DEF: 75, SpATK: 334, SpDEF: 85, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.39 , Speed: 4000 },
    8: { HP: 4302, ATK: 187, DEF: 81, SpATK: 371, SpDEF: 93, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.03 , Speed: 4000 },
    9: { HP: 4456, ATK: 195, DEF: 88, SpATK: 416, SpDEF: 103, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 15.8 , Speed: 4150 },
    10: { HP: 4641, ATK: 205, DEF: 97, SpATK: 470, SpDEF: 115, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 16.73 , Speed: 4150 },
    11: { HP: 4863, ATK: 217, DEF: 107, SpATK: 535, SpDEF: 130, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 17.84 , Speed: 4300 },
    12: { HP: 5129, ATK: 231, DEF: 119, SpATK: 612, SpDEF: 148, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 19.17 , Speed: 4300 },
    13: { HP: 5448, ATK: 248, DEF: 134, SpATK: 705, SpDEF: 169, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 20.77 , Speed: 4300 },
    14: { HP: 5831, ATK: 268, DEF: 152, SpATK: 816, SpDEF: 194, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 22.69 , Speed: 4300 },
    15: { HP: 6290, ATK: 292, DEF: 175, SpATK: 950, SpDEF: 225, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 24.99 , Speed: 4300 },
  },

    "dodrio": {
    1: { HP: 3050, ATK: 150, DEF: 45, SpATK: 20, SpDEF: 35, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3122, ATK: 161, DEF: 51, SpATK: 22, SpDEF: 39, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.44 , Speed: 3700 },
    3: { HP: 3205, ATK: 173, DEF: 57, SpATK: 24, SpDEF: 43, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3700 },
    4: { HP: 3300, ATK: 187, DEF: 64, SpATK: 26, SpDEF: 48, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.54 , Speed: 3700 },
    5: { HP: 3735, ATK: 251, DEF: 98, SpATK: 40, SpDEF: 70, CritRate: 5 , CDR: 0 , Lifesteal: 0 , AtkSPD: 14.22 , Speed: 3850 },
    6: { HP: 3861, ATK: 269, DEF: 108, SpATK: 44, SpDEF: 76, CritRate: 5 , CDR: 0 , Lifesteal: 0 , AtkSPD: 15.00 , Speed: 3850 },
    7: { HP: 4006, ATK: 290, DEF: 119, SpATK: 48, SpDEF: 83, CritRate: 5 , CDR: 0 , Lifesteal: 0 , AtkSPD: 15.89 , Speed: 4000 },
    8: { HP: 4173, ATK: 314, DEF: 132, SpATK: 53, SpDEF: 91, CritRate: 5 , CDR: 0 , Lifesteal: 0 , AtkSPD: 16.92 , Speed: 4000 },
    9: { HP: 4365, ATK: 342, DEF: 147, SpATK: 59, SpDEF: 101, CritRate: 10 , CDR: 0 , Lifesteal: 0 , AtkSPD: 18.1 , Speed: 4150 },
    10: { HP: 4586, ATK: 374, DEF: 164, SpATK: 66, SpDEF: 112, CritRate: 10 , CDR: 0 , Lifesteal: 0 , AtkSPD: 19.46 , Speed: 4150 },
    11: { HP: 4840, ATK: 411, DEF: 184, SpATK: 74, SpDEF: 125, CritRate: 10 , CDR: 0 , Lifesteal: 0 , AtkSPD: 21.02 , Speed: 4300 },
    12: { HP: 5133, ATK: 454, DEF: 207, SpATK: 83, SpDEF: 140, CritRate: 10 , CDR: 0 , Lifesteal: 0 , AtkSPD: 22.82 , Speed: 4300 },
    13: { HP: 5469, ATK: 503, DEF: 233, SpATK: 93, SpDEF: 157, CritRate: 10 , CDR: 0 , Lifesteal: 0 , AtkSPD: 24.89 , Speed: 4300 },
    14: { HP: 5856, ATK: 560, DEF: 263, SpATK: 105, SpDEF: 177, CritRate: 10 , CDR: 0 , Lifesteal: 0 , AtkSPD: 27.27 , Speed: 4300 },
    15: { HP: 6300, ATK: 625, DEF: 298, SpATK: 118, SpDEF: 200, CritRate: 10 , CDR: 0 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "dragapult": {
    1: { HP: 3000, ATK: 140, DEF: 50, SpATK: 20, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3043, ATK: 145, DEF: 53, SpATK: 21, SpDEF: 42, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.01 , Speed: 3650 },
    3: { HP: 3095, ATK: 151, DEF: 56, SpATK: 23, SpDEF: 44, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.22 , Speed: 3650 },
    4: { HP: 3157, ATK: 158, DEF: 60, SpATK: 25, SpDEF: 46, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.67 , Speed: 3650 },
    5: { HP: 3382, ATK: 185, DEF: 74, SpATK: 32, SpDEF: 55, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 18.91 , Speed: 3800 },
    6: { HP: 3471, ATK: 196, DEF: 80, SpATK: 35, SpDEF: 59, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 20.99 , Speed: 3800 },
    7: { HP: 3578, ATK: 209, DEF: 87, SpATK: 38, SpDEF: 63, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 23.49 , Speed: 3950 },
    8: { HP: 3707, ATK: 224, DEF: 95, SpATK: 42, SpDEF: 68, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 26.49 , Speed: 3950 },
    9: { HP: 4161, ATK: 279, DEF: 124, SpATK: 56, SpDEF: 86, CritRate: 25 , CDR: 0 , Lifesteal: 10 , AtkSPD: 37.09 , Speed: 4100 },
    10: { HP: 4346, ATK: 301, DEF: 136, SpATK: 62, SpDEF: 93, CritRate: 25 , CDR: 0 , Lifesteal: 10 , AtkSPD: 41.41 , Speed: 4100 },
    11: { HP: 4568, ATK: 328, DEF: 150, SpATK: 69, SpDEF: 102, CritRate: 25 , CDR: 0 , Lifesteal: 10 , AtkSPD: 46.6 , Speed: 4250 },
    12: { HP: 4835, ATK: 360, DEF: 167, SpATK: 77, SpDEF: 113, CritRate: 25 , CDR: 0 , Lifesteal: 10 , AtkSPD: 52.82 , Speed: 4250 },
    13: { HP: 5155, ATK: 399, DEF: 187, SpATK: 87, SpDEF: 126, CritRate: 25 , CDR: 0 , Lifesteal: 15 , AtkSPD: 60.29 , Speed: 4250 },
    14: { HP: 5539, ATK: 445, DEF: 211, SpATK: 99, SpDEF: 141, CritRate: 25 , CDR: 0 , Lifesteal: 15 , AtkSPD: 69.25 , Speed: 4250 },
    15: { HP: 6000, ATK: 500, DEF: 240, SpATK: 114, SpDEF: 160, CritRate: 25 , CDR: 0 , Lifesteal: 15 , AtkSPD: 80.00 , Speed: 4250 },
  },

    "dragonite": {
    1: { HP: 3050, ATK: 165, DEF: 78, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3117, ATK: 170, DEF: 84, SpATK: 21, SpDEF: 64, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.57 , Speed: 3700 },
    3: { HP: 3198, ATK: 177, DEF: 91, SpATK: 23, SpDEF: 69, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.26 , Speed: 3700 },
    4: { HP: 3295, ATK: 185, DEF: 99, SpATK: 25, SpDEF: 75, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.08 , Speed: 3700 },
    5: { HP: 3647, ATK: 214, DEF: 128, SpATK: 32, SpDEF: 97, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.07 , Speed: 3850 },
    6: { HP: 3787, ATK: 225, DEF: 140, SpATK: 35, SpDEF: 106, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 16.26 , Speed: 3850 },
    7: { HP: 3955, ATK: 239, DEF: 154, SpATK: 38, SpDEF: 117, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 17.69 , Speed: 4000 },
    8: { HP: 4627, ATK: 294, DEF: 209, SpATK: 52, SpDEF: 160, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 23.41 , Speed: 4000 },
    9: { HP: 4869, ATK: 314, DEF: 229, SpATK: 57, SpDEF: 175, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 25.47 , Speed: 4150 },
    10: { HP: 5159, ATK: 338, DEF: 253, SpATK: 63, SpDEF: 194, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 27.94 , Speed: 4150 },
    11: { HP: 5507, ATK: 367, DEF: 282, SpATK: 70, SpDEF: 216, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 30.91 , Speed: 4300 },
    12: { HP: 5925, ATK: 401, DEF: 316, SpATK: 78, SpDEF: 243, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 34.47 , Speed: 4300 },
    13: { HP: 6426, ATK: 442, DEF: 357, SpATK: 88, SpDEF: 275, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 38.74 , Speed: 4300 },
    14: { HP: 7028, ATK: 491, DEF: 406, SpATK: 100, SpDEF: 314, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 43.86 , Speed: 4300 },
    15: { HP: 7750, ATK: 550, DEF: 465, SpATK: 115, SpDEF: 360, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 50.00 , Speed: 4300 }
  },

    "duraludon": {
    1: { HP: 3000, ATK: 135, DEF: 70, SpATK: 20, SpDEF: 50, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3085, ATK: 148, DEF: 78, SpATK: 24, SpDEF: 55, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.14 , Speed: 3650 },
    3: { HP: 3179, ATK: 162, DEF: 87, SpATK: 28, SpDEF: 61, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 16.59 , Speed: 3650 },
    4: { HP: 3282, ATK: 178, DEF: 97, SpATK: 32, SpDEF: 67, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 20.39 , Speed: 3650 },
    5: { HP: 3395, ATK: 195, DEF: 108, SpATK: 37, SpDEF: 74, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 24.57 , Speed: 3800 },
    6: { HP: 3520, ATK: 214, DEF: 120, SpATK: 42, SpDEF: 82, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 29.16 , Speed: 3800 },
    7: { HP: 3657, ATK: 235, DEF: 133, SpATK: 48, SpDEF: 91, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 34.21 , Speed: 3950 },
    8: { HP: 3808, ATK: 258, DEF: 148, SpATK: 54, SpDEF: 100, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 39.77 , Speed: 3950 },
    9: { HP: 3975, ATK: 284, DEF: 164, SpATK: 61, SpDEF: 110, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 45.88 , Speed: 4100 },
    10: { HP: 4159, ATK: 312, DEF: 182, SpATK: 69, SpDEF: 122, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 52.6 , Speed: 4100 },
    11: { HP: 4362, ATK: 343, DEF: 201, SpATK: 77, SpDEF: 135, CritRate: 20 , CDR: 0 , Lifesteal: 20 , AtkSPD: 60.00 , Speed: 4250 },
    12: { HP: 4585, ATK: 377, DEF: 222, SpATK: 86, SpDEF: 149, CritRate: 20 , CDR: 0 , Lifesteal: 20 , AtkSPD: 60.00 , Speed: 4250 },
    13: { HP: 4830, ATK: 414, DEF: 246, SpATK: 96, SpDEF: 164, CritRate: 20 , CDR: 0 , Lifesteal: 25 , AtkSPD: 60.00 , Speed: 4250 },
    14: { HP: 5100, ATK: 455, DEF: 272, SpATK: 107, SpDEF: 181, CritRate: 20 , CDR: 0 , Lifesteal: 25 , AtkSPD: 60.00 , Speed: 4250 },
    15: { HP: 5397, ATK: 500, DEF: 301, SpATK: 119, SpDEF: 200, CritRate: 20 , CDR: 0 , Lifesteal: 25 , AtkSPD: 60.00 , Speed: 4250 }
  },

    "eldegoss": {
    1: { HP: 3278, ATK: 130, DEF: 40, SpATK: 40, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3383, ATK: 134, DEF: 44, SpATK: 54, SpDEF: 33, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.22 , Speed: 3800 },
    3: { HP: 3503, ATK: 139, DEF: 48, SpATK: 70, SpDEF: 36, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.47 , Speed: 3800 },
    4: { HP: 4114, ATK: 162, DEF: 69, SpATK: 152, SpDEF: 52, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.76 , Speed: 3800 },
    5: { HP: 4274, ATK: 168, DEF: 74, SpATK: 173, SpDEF: 56, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.1 , Speed: 3950 },
    6: { HP: 4457, ATK: 175, DEF: 80, SpATK: 198, SpDEF: 61, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.49 , Speed: 3950 },
    7: { HP: 4668, ATK: 183, DEF: 87, SpATK: 226, SpDEF: 66, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.94 , Speed: 4100 },
    8: { HP: 4911, ATK: 192, DEF: 95, SpATK: 258, SpDEF: 72, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.45 , Speed: 4100 },
    9: { HP: 5190, ATK: 203, DEF: 104, SpATK: 295, SpDEF: 79, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.04 , Speed: 4250 },
    10: { HP: 5511, ATK: 215, DEF: 115, SpATK: 338, SpDEF: 87, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.72 , Speed: 4250 },
    11: { HP: 5880, ATK: 229, DEF: 128, SpATK: 387, SpDEF: 96, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.5 , Speed: 4400 },
    12: { HP: 6305, ATK: 245, DEF: 142, SpATK: 444, SpDEF: 107, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.4 , Speed: 4400 },
    13: { HP: 6794, ATK: 264, DEF: 159, SpATK: 509, SpDEF: 119, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.43 , Speed: 4400 },
    14: { HP: 7356, ATK: 285, DEF: 178, SpATK: 584, SpDEF: 133, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.62 , Speed: 4400 },
    15: { HP: 8002, ATK: 310, DEF: 200, SpATK: 670, SpDEF: 149, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 19.99 , Speed: 4400 }
  },

    "empoleon": {
    1: { HP: 3250, ATK: 20, DEF: 80, SpATK: 80, SpDEF: 65, CritRate: 0 , CDR: 0 , Lifesteal: 25 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3325, ATK: 21, DEF: 86, SpATK: 88, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 25 , AtkSPD: 10.5 , Speed: 3700 },
    3: { HP: 3415, ATK: 23, DEF: 94, SpATK: 98, SpDEF: 76, CritRate: 0 , CDR: 0 , Lifesteal: 25 , AtkSPD: 11.1 , Speed: 3700 },
    4: { HP: 3523, ATK: 25, DEF: 103, SpATK: 110, SpDEF: 83, CritRate: 0 , CDR: 0 , Lifesteal: 25 , AtkSPD: 11.82 , Speed: 3700 },
    5: { HP: 4047, ATK: 34, DEF: 147, SpATK: 169, SpDEF: 116, CritRate: 10 , CDR: 0 , Lifesteal: 25 , AtkSPD: 15.31 , Speed: 3850 },
    6: { HP: 4204, ATK: 37, DEF: 160, SpATK: 187, SpDEF: 126, CritRate: 10 , CDR: 0 , Lifesteal: 25 , AtkSPD: 16.35 , Speed: 3850 },
    7: { HP: 4786, ATK: 48, DEF: 209, SpATK: 252, SpDEF: 163, CritRate: 10 , CDR: 0 , Lifesteal: 25 , AtkSPD: 20.23 , Speed: 4000 },
    8: { HP: 5011, ATK: 52, DEF: 228, SpATK: 277, SpDEF: 177, CritRate: 10 , CDR: 0 , Lifesteal: 25 , AtkSPD: 21.73 , Speed: 4000 },
    9: { HP: 5281, ATK: 57, DEF: 251, SpATK: 307, SpDEF: 194, CritRate: 20 , CDR: 0 , Lifesteal: 25 , AtkSPD: 23.53 , Speed: 4150 },
    10: { HP: 5605, ATK: 63, DEF: 278, SpATK: 343, SpDEF: 215, CritRate: 20 , CDR: 0 , Lifesteal: 25 , AtkSPD: 25.69 , Speed: 4150 },
    11: { HP: 5994, ATK: 70, DEF: 311, SpATK: 387, SpDEF: 240, CritRate: 20 , CDR: 0 , Lifesteal: 25 , AtkSPD: 28.29 , Speed: 4300 },
    12: { HP: 6461, ATK: 78, DEF: 350, SpATK: 440, SpDEF: 270, CritRate: 20 , CDR: 0 , Lifesteal: 25 , AtkSPD: 31.4 , Speed: 4300 },
    13: { HP: 7021, ATK: 88, DEF: 397, SpATK: 503, SpDEF: 306, CritRate: 20 , CDR: 0 , Lifesteal: 25 , AtkSPD: 35.14 , Speed: 4300 },
    14: { HP: 7693, ATK: 100, DEF: 453, SpATK: 579, SpDEF: 349, CritRate: 20 , CDR: 0 , Lifesteal: 25 , AtkSPD: 39.62 , Speed: 4300 },
    15: { HP: 8500, ATK: 115, DEF: 520, SpATK: 670, SpDEF: 400, CritRate: 20 , CDR: 0 , Lifesteal: 25 , AtkSPD: 45.00 , Speed: 4300 },
  },

    "espeon": {
    1: { HP: 3200, ATK: 134, DEF: 35, SpATK: 50, SpDEF: 27, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3269, ATK: 137, DEF: 39, SpATK: 71, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    3: { HP: 3349, ATK: 141, DEF: 44, SpATK: 95, SpDEF: 34, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    4: { HP: 3753, ATK: 161, DEF: 69, SpATK: 218, SpDEF: 54, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    5: { HP: 3858, ATK: 166, DEF: 75, SpATK: 250, SpDEF: 59, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3850 },
    6: { HP: 3979, ATK: 172, DEF: 82, SpATK: 287, SpDEF: 65, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3850 },
    7: { HP: 4118, ATK: 179, DEF: 90, SpATK: 329, SpDEF: 72, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4000 },
    8: { HP: 4278, ATK: 187, DEF: 100, SpATK: 378, SpDEF: 80, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4000 },
    9: { HP: 4462, ATK: 196, DEF: 111, SpATK: 434, SpDEF: 89, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4150 },
    10: { HP: 4674, ATK: 207, DEF: 124, SpATK: 499, SpDEF: 99, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4150 },
    11: { HP: 4918, ATK: 219, DEF: 139, SpATK: 573, SpDEF: 111, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
    12: { HP: 5199, ATK: 233, DEF: 156, SpATK: 658, SpDEF: 125, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
    13: { HP: 5522, ATK: 249, DEF: 176, SpATK: 756, SpDEF: 141, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
    14: { HP: 5893, ATK: 268, DEF: 199, SpATK: 869, SpDEF: 159, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
    15: { HP: 6320, ATK: 289, DEF: 225, SpATK: 999, SpDEF: 180, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 }
  },

    "falinks": {
    1: { HP: 3200, ATK: 150, DEF: 90, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3371, ATK: 160, DEF: 103, SpATK: 23, SpDEF: 80, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.71 , Speed: 3700 },
    3: { HP: 3559, ATK: 171, DEF: 118, SpATK: 27, SpDEF: 91, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.49 , Speed: 3700 },
    4: { HP: 3766, ATK: 183, DEF: 134, SpATK: 31, SpDEF: 103, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.35 , Speed: 3700 },
    5: { HP: 3993, ATK: 196, DEF: 152, SpATK: 35, SpDEF: 117, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 13.3 , Speed: 3850 },
    6: { HP: 4243, ATK: 211, DEF: 171, SpATK: 40, SpDEF: 132, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 14.34 , Speed: 3850 },
    7: { HP: 4518, ATK: 227, DEF: 192, SpATK: 45, SpDEF: 149, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.49 , Speed: 4000 },
    8: { HP: 4821, ATK: 245, DEF: 215, SpATK: 51, SpDEF: 167, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 16.75 , Speed: 4000 },
    9: { HP: 5155, ATK: 264, DEF: 241, SpATK: 58, SpDEF: 187, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 18.14 , Speed: 4150 },
    10: { HP: 5523, ATK: 285, DEF: 269, SpATK: 65, SpDEF: 209, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 19.67 , Speed: 4150 },
    11: { HP: 5928, ATK: 309, DEF: 300, SpATK: 73, SpDEF: 234, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 21.36 , Speed: 4300 },
    12: { HP: 6374, ATK: 335, DEF: 334, SpATK: 82, SpDEF: 261, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 23.22 , Speed: 4300 },
    13: { HP: 6865, ATK: 364, DEF: 372, SpATK: 92, SpDEF: 291, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 25.27 , Speed: 4300 },
    14: { HP: 7405, ATK: 395, DEF: 414, SpATK: 103, SpDEF: 324, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 27.52 , Speed: 4300 },
    15: { HP: 8000, ATK: 430, DEF: 460, SpATK: 115, SpDEF: 360, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "garchomp": {
    1: { HP: 3050, ATK: 165, DEF: 90, SpATK: 20, SpDEF: 67, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3117, ATK: 170, DEF: 95, SpATK: 21, SpDEF: 71, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.5 , Speed: 3800 },
    3: { HP: 3198, ATK: 176, DEF: 102, SpATK: 23, SpDEF: 76, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.1 , Speed: 3800 },
    4: { HP: 3295, ATK: 183, DEF: 110, SpATK: 25, SpDEF: 82, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.82 , Speed: 3800 },
    5: { HP: 3647, ATK: 209, DEF: 138, SpATK: 32, SpDEF: 104, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 14.44 , Speed: 3950 },
    6: { HP: 3787, ATK: 219, DEF: 149, SpATK: 35, SpDEF: 113, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.48 , Speed: 3950 },
    7: { HP: 3955, ATK: 232, DEF: 163, SpATK: 38, SpDEF: 124, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 16.73 , Speed: 4100 },
    8: { HP: 4157, ATK: 247, DEF: 179, SpATK: 42, SpDEF: 137, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 18.23 , Speed: 4100 },
    9: { HP: 4869, ATK: 300, DEF: 237, SpATK: 56, SpDEF: 183, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 23.53 , Speed: 4250 },
    10: { HP: 5159, ATK: 322, DEF: 261, SpATK: 62, SpDEF: 202, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 25.69 , Speed: 4250 },
    11: { HP: 5507, ATK: 348, DEF: 289, SpATK: 69, SpDEF: 224, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 28.28 , Speed: 4400 },
    12: { HP: 5925, ATK: 379, DEF: 323, SpATK: 77, SpDEF: 251, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 31.39 , Speed: 4400 },
    13: { HP: 6426, ATK: 417, DEF: 364, SpATK: 87, SpDEF: 283, CritRate: 10 , CDR: 0 , Lifesteal: 15 , AtkSPD: 35.12 , Speed: 4400 },
    14: { HP: 7028, ATK: 462, DEF: 413, SpATK: 99, SpDEF: 321, CritRate: 10 , CDR: 0 , Lifesteal: 15 , AtkSPD: 39.6 , Speed: 4400 },
    15: { HP: 7750, ATK: 516, DEF: 472, SpATK: 114, SpDEF: 367, CritRate: 10 , CDR: 0 , Lifesteal: 15 , AtkSPD: 45.00 , Speed: 4400 },
  },

    "gardevoir": {
    1: { HP: 3200, ATK: 134, DEF: 35, SpATK: 65, SpDEF: 27, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3250, ATK: 136, DEF: 39, SpATK: 79, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    3: { HP: 3310, ATK: 139, DEF: 43, SpATK: 96, SpDEF: 33, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    4: { HP: 3382, ATK: 142, DEF: 48, SpATK: 116, SpDEF: 37, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    5: { HP: 3644, ATK: 154, DEF: 66, SpATK: 190, SpDEF: 52, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3850 },
    6: { HP: 3748, ATK: 159, DEF: 73, SpATK: 219, SpDEF: 58, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3850 },
    7: { HP: 4223, ATK: 180, DEF: 106, SpATK: 353, SpDEF: 86, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4000 },
    8: { HP: 4373, ATK: 187, DEF: 117, SpATK: 395, SpDEF: 95, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4000 },
    9: { HP: 4553, ATK: 195, DEF: 130, SpATK: 446, SpDEF: 105, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4150 },
    10: { HP: 4769, ATK: 205, DEF: 145, SpATK: 507, SpDEF: 118, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4150 },
    11: { HP: 5029, ATK: 216, DEF: 163, SpATK: 580, SpDEF: 133, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
    12: { HP: 5340, ATK: 230, DEF: 185, SpATK: 668, SpDEF: 151, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
    13: { HP: 5714, ATK: 247, DEF: 211, SpATK: 773, SpDEF: 173, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
    14: { HP: 6162, ATK: 267, DEF: 242, SpATK: 899, SpDEF: 199, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
    15: { HP: 6700, ATK: 291, DEF: 280, SpATK: 1050, SpDEF: 230, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 }
  },

    "gengar": {
    1: { HP: 3456, ATK: 20, DEF: 52, SpATK: 80, SpDEF: 38, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3510, ATK: 21, DEF: 56, SpATK: 89, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.43 , Speed: 3650 },
    3: { HP: 3574, ATK: 23, DEF: 61, SpATK: 99, SpDEF: 43, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.94 , Speed: 3650 },
    4: { HP: 3651, ATK: 25, DEF: 67, SpATK: 112, SpDEF: 47, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.56 , Speed: 3650 },
    5: { HP: 3931, ATK: 32, DEF: 87, SpATK: 158, SpDEF: 60, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.8 , Speed: 3800 },
    6: { HP: 4043, ATK: 35, DEF: 95, SpATK: 176, SpDEF: 65, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.69 , Speed: 3800 },
    7: { HP: 4177, ATK: 38, DEF: 105, SpATK: 198, SpDEF: 71, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.76 , Speed: 3950 },
    8: { HP: 4338, ATK: 42, DEF: 116, SpATK: 224, SpDEF: 78, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 17.05 , Speed: 3950 },
    9: { HP: 4905, ATK: 56, DEF: 156, SpATK: 316, SpDEF: 104, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 21.59 , Speed: 4100 },
    10: { HP: 5136, ATK: 62, DEF: 172, SpATK: 354, SpDEF: 115, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 23.44 , Speed: 4100 },
    11: { HP: 5414, ATK: 69, DEF: 192, SpATK: 399, SpDEF: 128, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 25.66 , Speed: 4250 },
    12: { HP: 5747, ATK: 78, DEF: 216, SpATK: 453, SpDEF: 143, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 28.33 , Speed: 4250 },
    13: { HP: 6146, ATK: 88, DEF: 245, SpATK: 518, SpDEF: 161, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 31.53 , Speed: 4250 },
    14: { HP: 6625, ATK: 100, DEF: 279, SpATK: 596, SpDEF: 183, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 35.37 , Speed: 4250 },
    15: { HP: 7200, ATK: 115, DEF: 320, SpATK: 690, SpDEF: 210, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 39.98 , Speed: 4250 }
  },

    "glaceon": {
    1: { HP: 3200, ATK: 20, DEF: 35, SpATK: 100, SpDEF: 25, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3270, ATK: 22, DEF: 39, SpATK: 117, SpDEF: 28, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.00 , Speed: 3700 },
    3: { HP: 3350, ATK: 24, DEF: 44, SpATK: 137, SpDEF: 32, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 14.29 , Speed: 3700 },
    4: { HP: 3758, ATK: 36, DEF: 69, SpATK: 238, SpDEF: 52, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 25.93 , Speed: 3700 },
    5: { HP: 3864, ATK: 39, DEF: 75, SpATK: 264, SpDEF: 57, CritRate: 10 , CDR: 5 , Lifesteal: 0 , AtkSPD: 28.97 , Speed: 3850 },
    6: { HP: 3986, ATK: 43, DEF: 82, SpATK: 294, SpDEF: 63, CritRate: 10 , CDR: 5 , Lifesteal: 0 , AtkSPD: 32.46 , Speed: 3850 },
    7: { HP: 4127, ATK: 47, DEF: 90, SpATK: 329, SpDEF: 70, CritRate: 10 , CDR: 5 , Lifesteal: 0 , AtkSPD: 36.47 , Speed: 4000 },
    8: { HP: 4289, ATK: 52, DEF: 100, SpATK: 369, SpDEF: 78, CritRate: 10 , CDR: 5 , Lifesteal: 0 , AtkSPD: 41.09 , Speed: 4000 },
    9: { HP: 4475, ATK: 58, DEF: 111, SpATK: 415, SpDEF: 87, CritRate: 20 , CDR: 5 , Lifesteal: 0 , AtkSPD: 46.41 , Speed: 4150 },
    10: { HP: 4689, ATK: 65, DEF: 124, SpATK: 468, SpDEF: 98, CritRate: 20 , CDR: 5 , Lifesteal: 0 , AtkSPD: 52.53 , Speed: 4150 },
    11: { HP: 4935, ATK: 73, DEF: 139, SpATK: 529, SpDEF: 110, CritRate: 20 , CDR: 10 , Lifesteal: 0 , AtkSPD: 59.57 , Speed: 4300 },
    12: { HP: 5218, ATK: 82, DEF: 156, SpATK: 599, SpDEF: 124, CritRate: 20 , CDR: 10 , Lifesteal: 0 , AtkSPD: 67.67 , Speed: 4300 },
    13: { HP: 5544, ATK: 92, DEF: 176, SpATK: 680, SpDEF: 140, CritRate: 20 , CDR: 10 , Lifesteal: 0 , AtkSPD: 76.99 , Speed: 4300 },
    14: { HP: 5919, ATK: 103, DEF: 199, SpATK: 773, SpDEF: 158, CritRate: 20 , CDR: 10 , Lifesteal: 0 , AtkSPD: 87.7 , Speed: 4300 },
    15: { HP: 6350, ATK: 116, DEF: 225, SpATK: 880, SpDEF: 180, CritRate: 20 , CDR: 10 , Lifesteal: 0 , AtkSPD: 100.00 , Speed: 4300 }
  },

	"goodra": {
    1: { HP: 3225, ATK: 150, DEF: 100, SpATK: 50, SpDEF: 100, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3326, ATK: 152, DEF: 107, SpATK: 56, SpDEF: 107, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3447, ATK: 155, DEF: 116, SpATK: 63, SpDEF: 115, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3593, ATK: 158, DEF: 127, SpATK: 71, SpDEF: 125, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 4122, ATK: 169, DEF: 166, SpATK: 101, SpDEF: 162, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 4333, ATK: 174, DEF: 181, SpATK: 113, SpDEF: 177, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 4586, ATK: 179, DEF: 200, SpATK: 127, SpDEF: 195, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.86 , Speed: 4000 },
    8: { HP: 5597, ATK: 201, DEF: 274, SpATK: 184, SpDEF: 265, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.72 , Speed: 4000 },
    9: { HP: 5961, ATK: 209, DEF: 301, SpATK: 205, SpDEF: 290, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 6398, ATK: 218, DEF: 333, SpATK: 230, SpDEF: 320, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 6923, ATK: 229, DEF: 372, SpATK: 260, SpDEF: 356, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 7552, ATK: 242, DEF: 418, SpATK: 295, SpDEF: 400, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 8307, ATK: 258, DEF: 473, SpATK: 338, SpDEF: 452, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 9213, ATK: 277, DEF: 540, SpATK: 389, SpDEF: 515, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 10300, ATK: 300, DEF: 620, SpATK: 450, SpDEF: 590, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "greedent": {
    1: { HP: 3000, ATK: 170, DEF: 75, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3135, ATK: 174, DEF: 85, SpATK: 22, SpDEF: 69, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.44 , Speed: 3600 },
    3: { HP: 3290, ATK: 178, DEF: 97, SpATK: 24, SpDEF: 79, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3600 },
    4: { HP: 3469, ATK: 183, DEF: 111, SpATK: 27, SpDEF: 91, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.54 , Speed: 3600 },
    5: { HP: 4285, ATK: 206, DEF: 173, SpATK: 40, SpDEF: 144, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.22 , Speed: 3750 },
    6: { HP: 4522, ATK: 213, DEF: 191, SpATK: 44, SpDEF: 159, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.00 , Speed: 3750 },
    7: { HP: 4794, ATK: 221, DEF: 212, SpATK: 48, SpDEF: 177, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.89 , Speed: 3900 },
    8: { HP: 5107, ATK: 230, DEF: 236, SpATK: 53, SpDEF: 198, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.92 , Speed: 3900 },
    9: { HP: 5467, ATK: 240, DEF: 263, SpATK: 59, SpDEF: 222, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.1 , Speed: 4050 },
    10: { HP: 5882, ATK: 252, DEF: 295, SpATK: 66, SpDEF: 249, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 19.46 , Speed: 4050 },
    11: { HP: 6359, ATK: 266, DEF: 331, SpATK: 74, SpDEF: 280, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 21.02 , Speed: 4200 },
    12: { HP: 6908, ATK: 282, DEF: 373, SpATK: 83, SpDEF: 316, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 22.82 , Speed: 4200 },
    13: { HP: 7539, ATK: 300, DEF: 421, SpATK: 93, SpDEF: 357, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 24.89 , Speed: 4200 },
    14: { HP: 8265, ATK: 321, DEF: 476, SpATK: 104, SpDEF: 405, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 27.27 , Speed: 4200 },
    15: { HP: 9099, ATK: 345, DEF: 540, SpATK: 117, SpDEF: 460, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4200 }
  },

    "greninja": {
    1: { HP: 3000, ATK: 146, DEF: 50, SpATK: 20, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3035, ATK: 151, DEF: 53, SpATK: 21, SpDEF: 32, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.57 , Speed: 3600 },
    3: { HP: 3077, ATK: 157, DEF: 56, SpATK: 23, SpDEF: 34, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.46 , Speed: 3600 },
    4: { HP: 3127, ATK: 164, DEF: 60, SpATK: 25, SpDEF: 36, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 15.73 , Speed: 3600 },
    5: { HP: 3308, ATK: 191, DEF: 75, SpATK: 32, SpDEF: 45, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 23.96 , Speed: 3750 },
    6: { HP: 3380, ATK: 202, DEF: 81, SpATK: 35, SpDEF: 49, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 27.24 , Speed: 3750 },
    7: { HP: 3708, ATK: 250, DEF: 108, SpATK: 49, SpDEF: 65, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 42.17 , Speed: 3900 },
    8: { HP: 3812, ATK: 265, DEF: 117, SpATK: 53, SpDEF: 70, CritRate: 15 , CDR: 0 , Lifesteal: 5 , AtkSPD: 46.89 , Speed: 3900 },
    9: { HP: 3937, ATK: 283, DEF: 127, SpATK: 58, SpDEF: 76, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 52.55 , Speed: 4050 },
    10: { HP: 4086, ATK: 305, DEF: 139, SpATK: 64, SpDEF: 83, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 59.34 , Speed: 4050 },
    11: { HP: 4265, ATK: 331, DEF: 154, SpATK: 71, SpDEF: 92, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 67.5 , Speed: 4200 },
    12: { HP: 4480, ATK: 363, DEF: 172, SpATK: 80, SpDEF: 103, CritRate: 30 , CDR: 0 , Lifesteal: 10 , AtkSPD: 77.28 , Speed: 4200 },
    13: { HP: 4738, ATK: 401, DEF: 193, SpATK: 91, SpDEF: 116, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 89.02 , Speed: 4200 },
    14: { HP: 5048, ATK: 446, DEF: 219, SpATK: 104, SpDEF: 131, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 103.1 , Speed: 4200 },
    15: { HP: 5420, ATK: 500, DEF: 250, SpATK: 119, SpDEF: 149, CritRate: 30 , CDR: 0 , Lifesteal: 15 , AtkSPD: 120.00 , Speed: 4200 },
  },

  "gyarados": {
    1: { HP: 3250, ATK: 140, DEF: 80, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3389, ATK: 149, DEF: 93, SpATK: 23, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    3: { HP: 3542, ATK: 159, DEF: 108, SpATK: 27, SpDEF: 81, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    4: { HP: 3710, ATK: 170, DEF: 124, SpATK: 31, SpDEF: 93, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    5: { HP: 3894, ATK: 182, DEF: 142, SpATK: 35, SpDEF: 107, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 10.00 , Speed: 3850 },
    6: { HP: 4097, ATK: 196, DEF: 161, SpATK: 40, SpDEF: 122, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 10.00 , Speed: 3850 },
    7: { HP: 4320, ATK: 211, DEF: 182, SpATK: 45, SpDEF: 138, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 10.00 , Speed: 4000 },
    8: { HP: 4566, ATK: 228, DEF: 205, SpATK: 51, SpDEF: 156, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 10.00 , Speed: 4000 },
    9: { HP: 4837, ATK: 246, DEF: 231, SpATK: 58, SpDEF: 176, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 10.00 , Speed: 4150 },
    10: { HP: 5136, ATK: 266, DEF: 259, SpATK: 65, SpDEF: 198, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 10.00 , Speed: 4150 },
    11: { HP: 5466, ATK: 288, DEF: 290, SpATK: 73, SpDEF: 222, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 10.00 , Speed: 4300 },
    12: { HP: 5828, ATK: 312, DEF: 324, SpATK: 82, SpDEF: 249, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 10.00 , Speed: 4300 },
    13: { HP: 6227, ATK: 339, DEF: 362, SpATK: 92, SpDEF: 278, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 10.00 , Speed: 4300 },
    14: { HP: 6666, ATK: 368, DEF: 404, SpATK: 103, SpDEF: 310, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 10.00 , Speed: 4300 },
    15: { HP: 7150, ATK: 400, DEF: 450, SpATK: 115, SpDEF: 345, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 10.00 , Speed: 4300 },
  },

  "hooh": {
    1: { HP: 3400, ATK: 170, DEF: 90, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3631, ATK: 177, DEF: 106, SpATK: 23, SpDEF: 82, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.71 , Speed: 3700 },
    3: { HP: 3886, ATK: 185, DEF: 124, SpATK: 27, SpDEF: 96, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.49 , Speed: 3700 },
    4: { HP: 4166, ATK: 194, DEF: 143, SpATK: 31, SpDEF: 111, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.35 , Speed: 3700 },
    5: { HP: 4473, ATK: 204, DEF: 164, SpATK: 36, SpDEF: 128, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.3 , Speed: 3850 },
    6: { HP: 4812, ATK: 215, DEF: 187, SpATK: 41, SpDEF: 146, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.34 , Speed: 3850 },
    7: { HP: 5184, ATK: 227, DEF: 213, SpATK: 46, SpDEF: 166, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.49 , Speed: 4000 },
    8: { HP: 5594, ATK: 240, DEF: 241, SpATK: 52, SpDEF: 188, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.75 , Speed: 4000 },
    9: { HP: 6046, ATK: 255, DEF: 272, SpATK: 59, SpDEF: 212, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.14 , Speed: 4150 },
    10: { HP: 6544, ATK: 271, DEF: 307, SpATK: 66, SpDEF: 239, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 19.67 , Speed: 4150 },
    11: { HP: 7093, ATK: 289, DEF: 345, SpATK: 74, SpDEF: 269, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 21.36 , Speed: 4300 },
    12: { HP: 7697, ATK: 309, DEF: 387, SpATK: 83, SpDEF: 302, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 23.22 , Speed: 4300 },
    13: { HP: 8362, ATK: 330, DEF: 433, SpATK: 93, SpDEF: 338, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 25.27 , Speed: 4300 },
    14: { HP: 9094, ATK: 354, DEF: 484, SpATK: 104, SpDEF: 377, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 27.52 , Speed: 4300 },
    15: { HP: 9900, ATK: 380, DEF: 540, SpATK: 116, SpDEF: 420, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

  "hoopa": {
    1: { HP: 3278, ATK: 130, DEF: 72, SpATK: 40, SpDEF: 50, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3443, ATK: 136, DEF: 80, SpATK: 61, SpDEF: 55, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.07 , Speed: 3700 },
    3: { HP: 3624, ATK: 143, DEF: 89, SpATK: 84, SpDEF: 61, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.24 , Speed: 3700 },
    4: { HP: 3823, ATK: 151, DEF: 99, SpATK: 109, SpDEF: 67, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.53 , Speed: 3700 },
    5: { HP: 4041, ATK: 160, DEF: 110, SpATK: 136, SpDEF: 74, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.95 , Speed: 3850 },
    6: { HP: 4282, ATK: 169, DEF: 122, SpATK: 166, SpDEF: 82, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.51 , Speed: 3850 },
    7: { HP: 4547, ATK: 179, DEF: 135, SpATK: 199, SpDEF: 91, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 18.23 , Speed: 4000 },
    8: { HP: 4839, ATK: 190, DEF: 149, SpATK: 236, SpDEF: 100, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 20.12 , Speed: 4000 },
    9: { HP: 5161, ATK: 203, DEF: 165, SpATK: 276, SpDEF: 110, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 22.21 , Speed: 4150 },
    10: { HP: 5516, ATK: 217, DEF: 182, SpATK: 320, SpDEF: 122, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 24.51 , Speed: 4150 },
    11: { HP: 5906, ATK: 232, DEF: 201, SpATK: 369, SpDEF: 135, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 27.04 , Speed: 4300 },
    12: { HP: 6335, ATK: 249, DEF: 222, SpATK: 423, SpDEF: 149, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 29.83 , Speed: 4300 },
    13: { HP: 6808, ATK: 267, DEF: 245, SpATK: 482, SpDEF: 164, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 32.9 , Speed: 4300 },
    14: { HP: 7329, ATK: 287, DEF: 271, SpATK: 547, SpDEF: 181, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 36.28 , Speed: 4300 },
    15: { HP: 7902, ATK: 309, DEF: 299, SpATK: 619, SpDEF: 200, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 40.00 , Speed: 4300 }
  },

  "inteleon": {
    1: { HP: 3200, ATK: 20, DEF: 35, SpATK: 100, SpDEF: 25, CritRate: 5 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3244, ATK: 21, DEF: 38, SpATK: 111, SpDEF: 28, CritRate: 5 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.00 , Speed: 3700 },
    3: { HP: 3297, ATK: 23, DEF: 41, SpATK: 125, SpDEF: 31, CritRate: 5 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.2 , Speed: 3700 },
    4: { HP: 3361, ATK: 25, DEF: 45, SpATK: 142, SpDEF: 35, CritRate: 5 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.64 , Speed: 3700 },
    5: { HP: 3593, ATK: 32, DEF: 59, SpATK: 202, SpDEF: 50, CritRate: 5 , CDR: 5 , Lifesteal: 0 , AtkSPD: 18.88 , Speed: 3850 },
    6: { HP: 3685, ATK: 35, DEF: 65, SpATK: 226, SpDEF: 56, CritRate: 5 , CDR: 5 , Lifesteal: 0 , AtkSPD: 20.97 , Speed: 3850 },
    7: { HP: 4106, ATK: 48, DEF: 91, SpATK: 335, SpDEF: 83, CritRate: 5 , CDR: 5 , Lifesteal: 0 , AtkSPD: 30.47 , Speed: 4000 },
    8: { HP: 4239, ATK: 52, DEF: 99, SpATK: 369, SpDEF: 92, CritRate: 5 , CDR: 5 , Lifesteal: 0 , AtkSPD: 33.47 , Speed: 4000 },
    9: { HP: 4399, ATK: 57, DEF: 109, SpATK: 410, SpDEF: 102, CritRate: 10 , CDR: 5 , Lifesteal: 0 , AtkSPD: 37.07 , Speed: 4150 },
    10: { HP: 4590, ATK: 63, DEF: 121, SpATK: 459, SpDEF: 114, CritRate: 10 , CDR: 5 , Lifesteal: 0 , AtkSPD: 41.39 , Speed: 4150 },
    11: { HP: 4820, ATK: 70, DEF: 135, SpATK: 518, SpDEF: 129, CritRate: 10 , CDR: 10 , Lifesteal: 0 , AtkSPD: 46.58 , Speed: 4300 },
    12: { HP: 5096, ATK: 78, DEF: 152, SpATK: 589, SpDEF: 147, CritRate: 10 , CDR: 10 , Lifesteal: 0 , AtkSPD: 52.81 , Speed: 4300 },
    13: { HP: 5427, ATK: 88, DEF: 172, SpATK: 674, SpDEF: 168, CritRate: 10 , CDR: 10 , Lifesteal: 0 , AtkSPD: 60.28 , Speed: 4300 },
    14: { HP: 5824, ATK: 100, DEF: 196, SpATK: 777, SpDEF: 194, CritRate: 10 , CDR: 10 , Lifesteal: 0 , AtkSPD: 69.24 , Speed: 4300 },
    15: { HP: 6300, ATK: 115, DEF: 225, SpATK: 900, SpDEF: 225, CritRate: 10 , CDR: 10 , Lifesteal: 0 , AtkSPD: 80.00 , Speed: 4300 }
  },

  "lapras": {
    1: { HP: 3300, ATK: 160, DEF: 90, SpATK: 90, SpDEF: 75, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3531, ATK: 165, DEF: 109, SpATK: 102, SpDEF: 91, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.71 , Speed: 3700 },
    3: { HP: 3786, ATK: 171, DEF: 130, SpATK: 115, SpDEF: 108, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.49 , Speed: 3700 },
    4: { HP: 4066, ATK: 177, DEF: 153, SpATK: 130, SpDEF: 127, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.35 , Speed: 3700 },
    5: { HP: 4373, ATK: 184, DEF: 178, SpATK: 146, SpDEF: 148, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.3 , Speed: 3850 },
    6: { HP: 4712, ATK: 192, DEF: 206, SpATK: 164, SpDEF: 171, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.34 , Speed: 3850 },
    7: { HP: 5084, ATK: 201, DEF: 237, SpATK: 183, SpDEF: 196, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.49 , Speed: 4000 },
    8: { HP: 5494, ATK: 210, DEF: 271, SpATK: 204, SpDEF: 224, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.75 , Speed: 4000 },
    9: { HP: 5946, ATK: 220, DEF: 308, SpATK: 228, SpDEF: 254, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.14 , Speed: 4150 },
    10: { HP: 6444, ATK: 232, DEF: 349, SpATK: 254, SpDEF: 288, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 19.67 , Speed: 4150 },
    11: { HP: 6993, ATK: 245, DEF: 394, SpATK: 283, SpDEF: 325, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 21.36 , Speed: 4300 },
    12: { HP: 7597, ATK: 259, DEF: 444, SpATK: 315, SpDEF: 366, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 23.22 , Speed: 4300 },
    13: { HP: 8262, ATK: 274, DEF: 499, SpATK: 350, SpDEF: 411, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 25.27 , Speed: 4300 },
    14: { HP: 8994, ATK: 291, DEF: 559, SpATK: 388, SpDEF: 460, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 27.52 , Speed: 4300 },
    15: { HP: 9800, ATK: 310, DEF: 625, SpATK: 430, SpDEF: 512, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

  "latias": {
    1: { HP: 3300, ATK: 120, DEF: 60, SpATK: 100, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3489, ATK: 127, DEF: 69, SpATK: 127, SpDEF: 69, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.36 , Speed: 3700 },
    3: { HP: 3697, ATK: 135, DEF: 78, SpATK: 156, SpDEF: 79, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.75 , Speed: 3700 },
    4: { HP: 3925, ATK: 144, DEF: 88, SpATK: 188, SpDEF: 90, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.18 , Speed: 3700 },
    5: { HP: 4175, ATK: 154, DEF: 99, SpATK: 223, SpDEF: 102, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 11.65 , Speed: 3850 },
    6: { HP: 4451, ATK: 165, DEF: 112, SpATK: 262, SpDEF: 116, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.17 , Speed: 3850 },
    7: { HP: 4755, ATK: 177, DEF: 126, SpATK: 305, SpDEF: 131, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.74 , Speed: 4000 },
    8: { HP: 5089, ATK: 190, DEF: 141, SpATK: 352, SpDEF: 148, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.37 , Speed: 4000 },
    9: { HP: 5458, ATK: 205, DEF: 158, SpATK: 404, SpDEF: 166, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.07 , Speed: 4150 },
    10: { HP: 5864, ATK: 221, DEF: 176, SpATK: 462, SpDEF: 186, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.84 , Speed: 4150 },
    11: { HP: 6312, ATK: 239, DEF: 196, SpATK: 525, SpDEF: 208, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.68 , Speed: 4300 },
    12: { HP: 6804, ATK: 259, DEF: 218, SpATK: 595, SpDEF: 232, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.61 , Speed: 4300 },
    13: { HP: 7346, ATK: 280, DEF: 243, SpATK: 672, SpDEF: 259, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.63 , Speed: 4300 },
    14: { HP: 7943, ATK: 304, DEF: 270, SpATK: 757, SpDEF: 288, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.76 , Speed: 4300 },
    15: { HP: 8600, ATK: 330, DEF: 300, SpATK: 850, SpDEF: 320, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 20.00 , Speed: 4300 }
  },

  "latios": {
    1: { HP: 3300, ATK: 120, DEF: 60, SpATK: 100, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3403, ATK: 127, DEF: 67, SpATK: 128, SpDEF: 68, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.36 , Speed: 3700 },
    3: { HP: 3517, ATK: 134, DEF: 75, SpATK: 159, SpDEF: 77, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.75 , Speed: 3700 },
    4: { HP: 3642, ATK: 142, DEF: 84, SpATK: 193, SpDEF: 87, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.18 , Speed: 3700 },
    5: { HP: 3779, ATK: 151, DEF: 93, SpATK: 231, SpDEF: 98, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 11.65 , Speed: 3850 },
    6: { HP: 3930, ATK: 161, DEF: 103, SpATK: 273, SpDEF: 110, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.17 , Speed: 3850 },
    7: { HP: 4096, ATK: 172, DEF: 114, SpATK: 319, SpDEF: 123, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.74 , Speed: 4000 },
    8: { HP: 4279, ATK: 184, DEF: 127, SpATK: 370, SpDEF: 138, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.37 , Speed: 4000 },
    9: { HP: 4481, ATK: 197, DEF: 141, SpATK: 426, SpDEF: 154, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 14.07 , Speed: 4150 },
    10: { HP: 4703, ATK: 212, DEF: 156, SpATK: 487, SpDEF: 172, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 14.84 , Speed: 4150 },
    11: { HP: 4948, ATK: 228, DEF: 173, SpATK: 555, SpDEF: 191, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 15.68 , Speed: 4300 },
    12: { HP: 5217, ATK: 246, DEF: 192, SpATK: 629, SpDEF: 212, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 16.61 , Speed: 4300 },
    13: { HP: 5514, ATK: 265, DEF: 212, SpATK: 711, SpDEF: 236, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 17.63 , Speed: 4300 },
    14: { HP: 5841, ATK: 286, DEF: 235, SpATK: 801, SpDEF: 262, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 18.76 , Speed: 4300 },
    15: { HP: 6200, ATK: 310, DEF: 260, SpATK: 900, SpDEF: 291, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 20.00 , Speed: 4300 },
  },

  "leafeon": {
    1: { HP: 3100, ATK: 160, DEF: 40, SpATK: 20, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3170, ATK: 171, DEF: 46, SpATK: 22, SpDEF: 34, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.44 , Speed: 3650 },
    3: { HP: 3250, ATK: 184, DEF: 52, SpATK: 24, SpDEF: 39, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3650 },
    4: { HP: 3658, ATK: 249, DEF: 84, SpATK: 36, SpDEF: 62, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.54 , Speed: 3650 },
    5: { HP: 3764, ATK: 266, DEF: 92, SpATK: 39, SpDEF: 68, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.22 , Speed: 3800 },
    6: { HP: 3886, ATK: 285, DEF: 102, SpATK: 43, SpDEF: 75, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.00 , Speed: 3800 },
    7: { HP: 4027, ATK: 307, DEF: 113, SpATK: 47, SpDEF: 83, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.89 , Speed: 3950 },
    8: { HP: 4189, ATK: 333, DEF: 126, SpATK: 52, SpDEF: 92, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.92 , Speed: 3950 },
    9: { HP: 4375, ATK: 363, DEF: 141, SpATK: 58, SpDEF: 103, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 18.1 , Speed: 4100 },
    10: { HP: 4589, ATK: 397, DEF: 158, SpATK: 65, SpDEF: 115, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 19.46 , Speed: 4100 },
    11: { HP: 4835, ATK: 436, DEF: 178, SpATK: 73, SpDEF: 129, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 21.02 , Speed: 4250 },
    12: { HP: 5118, ATK: 481, DEF: 200, SpATK: 82, SpDEF: 145, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 22.82 , Speed: 4250 },
    13: { HP: 5444, ATK: 533, DEF: 226, SpATK: 92, SpDEF: 164, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 24.89 , Speed: 4250 },
    14: { HP: 5819, ATK: 592, DEF: 256, SpATK: 103, SpDEF: 185, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 27.27 , Speed: 4250 },
    15: { HP: 6250, ATK: 660, DEF: 290, SpATK: 116, SpDEF: 210, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4250 }
  },

  "lucario": {
    1: { HP: 3250, ATK: 160, DEF: 78, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3392, ATK: 170, DEF: 89, SpATK: 23, SpDEF: 69, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.07 , Speed: 3700 },
    3: { HP: 3549, ATK: 180, DEF: 101, SpATK: 27, SpDEF: 78, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.24 , Speed: 3700 },
    4: { HP: 3721, ATK: 192, DEF: 114, SpATK: 31, SpDEF: 88, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.53 , Speed: 3700 },
    5: { HP: 3910, ATK: 205, DEF: 129, SpATK: 35, SpDEF: 99, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 14.95 , Speed: 3850 },
    6: { HP: 4118, ATK: 219, DEF: 145, SpATK: 40, SpDEF: 112, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 16.51 , Speed: 3850 },
    7: { HP: 4347, ATK: 234, DEF: 163, SpATK: 45, SpDEF: 126, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 18.23 , Speed: 4000 },
    8: { HP: 4599, ATK: 251, DEF: 183, SpATK: 51, SpDEF: 141, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 20.12 , Speed: 4000 },
    9: { HP: 4877, ATK: 270, DEF: 205, SpATK: 58, SpDEF: 158, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 22.21 , Speed: 4150 },
    10: { HP: 5184, ATK: 291, DEF: 229, SpATK: 65, SpDEF: 176, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 24.51 , Speed: 4150 },
    11: { HP: 5522, ATK: 314, DEF: 255, SpATK: 73, SpDEF: 196, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 27.04 , Speed: 4300 },
    12: { HP: 5894, ATK: 339, DEF: 284, SpATK: 82, SpDEF: 218, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 29.83 , Speed: 4300 },
    13: { HP: 6303, ATK: 366, DEF: 316, SpATK: 92, SpDEF: 243, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 32.9 , Speed: 4300 },
    14: { HP: 6753, ATK: 396, DEF: 351, SpATK: 103, SpDEF: 270, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 36.28 , Speed: 4300 },
    15: { HP: 7249, ATK: 429, DEF: 390, SpATK: 115, SpDEF: 300, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 40.00 , Speed: 4300 },
  },

  "machamp": {
    1: { HP: 3250, ATK: 165, DEF: 100, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3313, ATK: 170, DEF: 106, SpATK: 21, SpDEF: 74, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3389, ATK: 175, DEF: 113, SpATK: 23, SpDEF: 79, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3480, ATK: 181, DEF: 121, SpATK: 25, SpDEF: 85, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 3809, ATK: 205, DEF: 152, SpATK: 32, SpDEF: 106, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 3940, ATK: 214, DEF: 164, SpATK: 35, SpDEF: 114, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 4097, ATK: 225, DEF: 179, SpATK: 38, SpDEF: 124, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 13.86 , Speed: 4000 },
    8: { HP: 4286, ATK: 239, DEF: 197, SpATK: 42, SpDEF: 136, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 14.72 , Speed: 4000 },
    9: { HP: 4953, ATK: 287, DEF: 259, SpATK: 56, SpDEF: 178, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 5225, ATK: 306, DEF: 284, SpATK: 62, SpDEF: 195, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 5551, ATK: 329, DEF: 314, SpATK: 69, SpDEF: 216, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 5942, ATK: 357, DEF: 350, SpATK: 77, SpDEF: 241, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 6411, ATK: 391, DEF: 394, SpATK: 87, SpDEF: 271, CritRate: 20 , CDR: 0 , Lifesteal: 20 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 6974, ATK: 431, DEF: 447, SpATK: 99, SpDEF: 307, CritRate: 20 , CDR: 0 , Lifesteal: 20 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 7650, ATK: 479, DEF: 510, SpATK: 114, SpDEF: 350, CritRate: 20 , CDR: 0 , Lifesteal: 20 , AtkSPD: 30.00 , Speed: 4300 }
  },

  "mamoswine": {
    1: { HP: 3280, ATK: 170, DEF: 85, SpATK: 20, SpDEF: 65, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3371, ATK: 172, DEF: 91, SpATK: 21, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.29 , Speed: 3600 },
    3: { HP: 3480, ATK: 175, DEF: 98, SpATK: 23, SpDEF: 75, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.63 , Speed: 3600 },
    4: { HP: 3611, ATK: 178, DEF: 107, SpATK: 25, SpDEF: 81, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.04 , Speed: 3600 },
    5: { HP: 4087, ATK: 190, DEF: 139, SpATK: 32, SpDEF: 105, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.54 , Speed: 3750 },
    6: { HP: 4277, ATK: 195, DEF: 152, SpATK: 35, SpDEF: 114, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.14 , Speed: 3750 },
    7: { HP: 4505, ATK: 201, DEF: 167, SpATK: 38, SpDEF: 125, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.86 , Speed: 3900 },
    8: { HP: 4778, ATK: 208, DEF: 185, SpATK: 42, SpDEF: 139, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.72 , Speed: 3900 },
    9: { HP: 5743, ATK: 231, DEF: 249, SpATK: 57, SpDEF: 187, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.75 , Speed: 4050 },
    10: { HP: 6136, ATK: 240, DEF: 275, SpATK: 63, SpDEF: 206, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.98 , Speed: 4050 },
    11: { HP: 6608, ATK: 251, DEF: 307, SpATK: 70, SpDEF: 229, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 20.46 , Speed: 4200 },
    12: { HP: 7174, ATK: 265, DEF: 345, SpATK: 79, SpDEF: 257, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 22.24 , Speed: 4200 },
    13: { HP: 7854, ATK: 281, DEF: 390, SpATK: 89, SpDEF: 291, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 24.37 , Speed: 4200 },
    14: { HP: 8669, ATK: 301, DEF: 445, SpATK: 101, SpDEF: 331, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 26.93 , Speed: 4200 },
    15: { HP: 9648, ATK: 325, DEF: 510, SpATK: 116, SpDEF: 379, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4200 }
  },

  "megalucario": {
    1: { HP: 3250, ATK: 160, DEF: 78, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3392, ATK: 170, DEF: 89, SpATK: 23, SpDEF: 69, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.07 , Speed: 3700 },
    3: { HP: 3549, ATK: 180, DEF: 101, SpATK: 27, SpDEF: 78, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.24 , Speed: 3700 },
    4: { HP: 3721, ATK: 192, DEF: 114, SpATK: 31, SpDEF: 88, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.53 , Speed: 3700 },
    5: { HP: 3910, ATK: 205, DEF: 129, SpATK: 35, SpDEF: 99, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 14.95 , Speed: 3850 },
    6: { HP: 4118, ATK: 219, DEF: 145, SpATK: 40, SpDEF: 112, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 16.51 , Speed: 3850 },
    7: { HP: 4347, ATK: 234, DEF: 163, SpATK: 45, SpDEF: 126, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 18.23 , Speed: 4000 },
    8: { HP: 4599, ATK: 251, DEF: 183, SpATK: 51, SpDEF: 141, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 20.12 , Speed: 4000 },
    9: { HP: 4877, ATK: 270, DEF: 205, SpATK: 58, SpDEF: 158, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 22.21 , Speed: 4150 },
    10: { HP: 5184, ATK: 291, DEF: 229, SpATK: 65, SpDEF: 176, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 24.51 , Speed: 4150 },
    11: { HP: 5522, ATK: 314, DEF: 255, SpATK: 73, SpDEF: 196, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 27.04 , Speed: 4300 },
    12: { HP: 5894, ATK: 339, DEF: 284, SpATK: 82, SpDEF: 218, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 29.83 , Speed: 4300 },
    13: { HP: 6303, ATK: 366, DEF: 316, SpATK: 92, SpDEF: 243, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 32.9 , Speed: 4300 },
    14: { HP: 6753, ATK: 396, DEF: 351, SpATK: 103, SpDEF: 270, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 36.28 , Speed: 4300 },
    15: { HP: 7249, ATK: 429, DEF: 390, SpATK: 115, SpDEF: 300, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 40.00 , Speed: 4300 },
  },

  "meowscara": {
    1: { HP: 3100, ATK: 160, DEF: 50, SpATK: 20, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3149, ATK: 167, DEF: 54, SpATK: 21, SpDEF: 43, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.43 , Speed: 3650 },
    3: { HP: 3207, ATK: 175, DEF: 59, SpATK: 23, SpDEF: 46, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3650 },
    4: { HP: 3446, ATK: 208, DEF: 79, SpATK: 30, SpDEF: 59, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.07 , Speed: 3650 },
    5: { HP: 3530, ATK: 220, DEF: 86, SpATK: 32, SpDEF: 64, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 13.81 , Speed: 3800 },
    6: { HP: 3970, ATK: 281, DEF: 124, SpATK: 44, SpDEF: 89, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.7 , Speed: 3800 },
    7: { HP: 4091, ATK: 298, DEF: 134, SpATK: 47, SpDEF: 96, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.77 , Speed: 3950 },
    8: { HP: 4237, ATK: 318, DEF: 146, SpATK: 51, SpDEF: 104, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 20.06 , Speed: 3950 },
    9: { HP: 4412, ATK: 342, DEF: 161, SpATK: 56, SpDEF: 114, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 21.61 , Speed: 4100 },
    10: { HP: 4621, ATK: 371, DEF: 179, SpATK: 62, SpDEF: 126, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 23.46 , Speed: 4100 },
    11: { HP: 4872, ATK: 406, DEF: 201, SpATK: 69, SpDEF: 140, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 25.68 , Speed: 4250 },
    12: { HP: 5174, ATK: 448, DEF: 227, SpATK: 77, SpDEF: 157, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 28.35 , Speed: 4250 },
    13: { HP: 5536, ATK: 498, DEF: 258, SpATK: 87, SpDEF: 177, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 31.55 , Speed: 4250 },
    14: { HP: 5970, ATK: 558, DEF: 295, SpATK: 99, SpDEF: 201, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 35.39 , Speed: 4250 },
    15: { HP: 6490, ATK: 630, DEF: 340, SpATK: 114, SpDEF: 230, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 40.00 , Speed: 4250 },
  },

  "metagross": {
    1: { HP: 3100, ATK: 160, DEF: 85, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3172, ATK: 165, DEF: 92, SpATK: 21, SpDEF: 75, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3259, ATK: 171, DEF: 100, SpATK: 23, SpDEF: 81, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3363, ATK: 179, DEF: 110, SpATK: 25, SpDEF: 88, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 3741, ATK: 207, DEF: 145, SpATK: 32, SpDEF: 113, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 3891, ATK: 218, DEF: 159, SpATK: 35, SpDEF: 123, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 4072, ATK: 231, DEF: 176, SpATK: 38, SpDEF: 135, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 13.86 , Speed: 4000 },
    8: { HP: 4289, ATK: 247, DEF: 196, SpATK: 42, SpDEF: 150, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 14.72 , Speed: 4000 },
    9: { HP: 5054, ATK: 303, DEF: 266, SpATK: 56, SpDEF: 202, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 5366, ATK: 326, DEF: 295, SpATK: 62, SpDEF: 223, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 5740, ATK: 353, DEF: 329, SpATK: 69, SpDEF: 248, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 6189, ATK: 386, DEF: 370, SpATK: 77, SpDEF: 278, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 6728, ATK: 426, DEF: 420, SpATK: 87, SpDEF: 314, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 7374, ATK: 473, DEF: 479, SpATK: 99, SpDEF: 358, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 8150, ATK: 530, DEF: 550, SpATK: 114, SpDEF: 410, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 30.00 , Speed: 4300 }
  },

  "mew": {
    1: { HP: 3300, ATK: 130, DEF: 50, SpATK: 90, SpDEF: 50, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3414, ATK: 136, DEF: 56, SpATK: 119, SpDEF: 55, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.36 , Speed: 3700 },
    3: { HP: 3539, ATK: 143, DEF: 63, SpATK: 151, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.75 , Speed: 3700 },
    4: { HP: 3677, ATK: 150, DEF: 71, SpATK: 186, SpDEF: 66, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.18 , Speed: 3700 },
    5: { HP: 3828, ATK: 158, DEF: 80, SpATK: 224, SpDEF: 72, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 11.65 , Speed: 3850 },
    6: { HP: 3995, ATK: 167, DEF: 89, SpATK: 266, SpDEF: 79, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.17 , Speed: 3850 },
    7: { HP: 4178, ATK: 177, DEF: 99, SpATK: 312, SpDEF: 86, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.74 , Speed: 4000 },
    8: { HP: 4380, ATK: 188, DEF: 110, SpATK: 363, SpDEF: 94, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.37 , Speed: 4000 },
    9: { HP: 4603, ATK: 200, DEF: 123, SpATK: 419, SpDEF: 103, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 14.07 , Speed: 4150 },
    10: { HP: 4849, ATK: 213, DEF: 137, SpATK: 481, SpDEF: 113, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 14.84 , Speed: 4150 },
    11: { HP: 5119, ATK: 227, DEF: 152, SpATK: 550, SpDEF: 124, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 15.68 , Speed: 4300 },
    12: { HP: 5416, ATK: 243, DEF: 169, SpATK: 625, SpDEF: 136, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 16.61 , Speed: 4300 },
    13: { HP: 5743, ATK: 260, DEF: 188, SpATK: 708, SpDEF: 149, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 17.63 , Speed: 4300 },
    14: { HP: 6103, ATK: 279, DEF: 208, SpATK: 799, SpDEF: 164, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 18.76 , Speed: 4300 },
    15: { HP: 6500, ATK: 300, DEF: 230, SpATK: 900, SpDEF: 180, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 20.00 , Speed: 4300 }
  },

  "mewtwox": {
    1: { HP: 3500, ATK: 170, DEF: 90, SpATK: 20, SpDEF: 90, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3653, ATK: 182, DEF: 102, SpATK: 23, SpDEF: 99, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 11.07 , Speed: 3700 },
    3: { HP: 3821, ATK: 195, DEF: 115, SpATK: 27, SpDEF: 109, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 12.24 , Speed: 3700 },
    4: { HP: 4006, ATK: 209, DEF: 130, SpATK: 31, SpDEF: 120, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 13.53 , Speed: 3700 },
    5: { HP: 4209, ATK: 225, DEF: 146, SpATK: 35, SpDEF: 132, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 14.95 , Speed: 3850 },
    6: { HP: 4433, ATK: 242, DEF: 164, SpATK: 40, SpDEF: 145, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 16.51 , Speed: 3850 },
    7: { HP: 4679, ATK: 261, DEF: 183, SpATK: 45, SpDEF: 159, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 18.23 , Speed: 4000 },
    8: { HP: 4950, ATK: 282, DEF: 204, SpATK: 51, SpDEF: 175, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 20.12 , Speed: 4000 },
    9: { HP: 5249, ATK: 305, DEF: 228, SpATK: 58, SpDEF: 192, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 22.21 , Speed: 4150 },
    10: { HP: 5579, ATK: 330, DEF: 254, SpATK: 65, SpDEF: 211, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 24.51 , Speed: 4150 },
    11: { HP: 5942, ATK: 358, DEF: 283, SpATK: 73, SpDEF: 232, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 27.04 , Speed: 4300 },
    12: { HP: 6342, ATK: 388, DEF: 315, SpATK: 82, SpDEF: 255, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 29.83 , Speed: 4300 },
    13: { HP: 6782, ATK: 422, DEF: 350, SpATK: 92, SpDEF: 281, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 32.9 , Speed: 4300 },
    14: { HP: 7267, ATK: 459, DEF: 388, SpATK: 103, SpDEF: 309, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 36.28 , Speed: 4300 },
    15: { HP: 7800, ATK: 500, DEF: 430, SpATK: 115, SpDEF: 340, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 40.00 , Speed: 4300 }
  },

    "mewtwoy": {
    1: { HP: 3400, ATK: 20, DEF: 50, SpATK: 150, SpDEF: 50, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3510, ATK: 23, DEF: 55, SpATK: 172, SpDEF: 55, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.42 , Speed: 3650 },
    3: { HP: 3631, ATK: 27, DEF: 61, SpATK: 197, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.99 , Speed: 3650 },
    4: { HP: 3764, ATK: 31, DEF: 67, SpATK: 224, SpDEF: 66, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 14.71 , Speed: 3650 },
    5: { HP: 3910, ATK: 36, DEF: 74, SpATK: 254, SpDEF: 72, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.6 , Speed: 3800 },
    6: { HP: 4072, ATK: 41, DEF: 82, SpATK: 287, SpDEF: 79, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 18.68 , Speed: 3800 },
    7: { HP: 4250, ATK: 46, DEF: 91, SpATK: 323, SpDEF: 86, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 20.97 , Speed: 3950 },
    8: { HP: 4446, ATK: 52, DEF: 100, SpATK: 363, SpDEF: 94, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 23.49 , Speed: 3950 },
    9: { HP: 4662, ATK: 59, DEF: 110, SpATK: 407, SpDEF: 103, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 26.27 , Speed: 4100 },
    10: { HP: 4900, ATK: 66, DEF: 122, SpATK: 455, SpDEF: 113, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 29.34 , Speed: 4100 },
    11: { HP: 5162, ATK: 74, DEF: 135, SpATK: 508, SpDEF: 124, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 32.72 , Speed: 4250 },
    12: { HP: 5450, ATK: 83, DEF: 149, SpATK: 567, SpDEF: 136, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 36.44 , Speed: 4250 },
    13: { HP: 5767, ATK: 93, DEF: 164, SpATK: 631, SpDEF: 149, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 40.53 , Speed: 4250 },
    14: { HP: 6116, ATK: 104, DEF: 181, SpATK: 702, SpDEF: 164, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 45.03 , Speed: 4250 },
    15: { HP: 6500, ATK: 116, DEF: 200, SpATK: 780, SpDEF: 180, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 49.99 , Speed: 4250 },
  },

    "mimikyu": {
    1: { HP: 3150, ATK: 155, DEF: 80, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3301, ATK: 164, DEF: 91, SpATK: 23, SpDEF: 80, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.71 , Speed: 3700 },
    3: { HP: 3467, ATK: 174, DEF: 104, SpATK: 27, SpDEF: 91, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.49 , Speed: 3700 },
    4: { HP: 3650, ATK: 185, DEF: 118, SpATK: 31, SpDEF: 103, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.35 , Speed: 3700 },
    5: { HP: 3851, ATK: 198, DEF: 133, SpATK: 35, SpDEF: 117, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 13.3 , Speed: 3850 },
    6: { HP: 4072, ATK: 212, DEF: 150, SpATK: 40, SpDEF: 132, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 14.34 , Speed: 3850 },
    7: { HP: 4315, ATK: 227, DEF: 168, SpATK: 45, SpDEF: 149, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.49 , Speed: 4000 },
    8: { HP: 4583, ATK: 244, DEF: 188, SpATK: 51, SpDEF: 167, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 16.75 , Speed: 4000 },
    9: { HP: 4879, ATK: 263, DEF: 210, SpATK: 58, SpDEF: 187, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 18.14 , Speed: 4150 },
    10: { HP: 5205, ATK: 283, DEF: 234, SpATK: 65, SpDEF: 209, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 19.67 , Speed: 4150 },
    11: { HP: 5564, ATK: 305, DEF: 261, SpATK: 73, SpDEF: 234, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 21.36 , Speed: 4300 },
    12: { HP: 5959, ATK: 330, DEF: 291, SpATK: 82, SpDEF: 261, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 23.22 , Speed: 4300 },
    13: { HP: 6394, ATK: 357, DEF: 324, SpATK: 92, SpDEF: 291, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 25.27 , Speed: 4300 },
    14: { HP: 6873, ATK: 387, DEF: 360, SpATK: 103, SpDEF: 324, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 27.52 , Speed: 4300 },
    15: { HP: 7400, ATK: 420, DEF: 400, SpATK: 115, SpDEF: 360, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "miraidon": {
    1: { HP: 3300, ATK: 140, DEF: 70, SpATK: 100, SpDEF: 80, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3442, ATK: 147, DEF: 79, SpATK: 132, SpDEF: 87, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.36 , Speed: 3650 },
    3: { HP: 3599, ATK: 154, DEF: 89, SpATK: 167, SpDEF: 95, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.75 , Speed: 3650 },
    4: { HP: 3771, ATK: 162, DEF: 100, SpATK: 206, SpDEF: 104, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 11.18 , Speed: 3650 },
    5: { HP: 3960, ATK: 171, DEF: 112, SpATK: 248, SpDEF: 113, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 11.65 , Speed: 3800 },
    6: { HP: 4168, ATK: 181, DEF: 125, SpATK: 295, SpDEF: 123, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.17 , Speed: 3800 },
    7: { HP: 4397, ATK: 192, DEF: 139, SpATK: 347, SpDEF: 134, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.74 , Speed: 3950 },
    8: { HP: 4649, ATK: 204, DEF: 155, SpATK: 404, SpDEF: 147, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.37 , Speed: 3950 },
    9: { HP: 4927, ATK: 217, DEF: 172, SpATK: 467, SpDEF: 161, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.07 , Speed: 4100 },
    10: { HP: 5234, ATK: 232, DEF: 191, SpATK: 536, SpDEF: 176, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.84 , Speed: 4100 },
    11: { HP: 5572, ATK: 248, DEF: 212, SpATK: 612, SpDEF: 193, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.68 , Speed: 4250 },
    12: { HP: 5944, ATK: 266, DEF: 235, SpATK: 696, SpDEF: 212, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.61 , Speed: 4250 },
    13: { HP: 6353, ATK: 285, DEF: 261, SpATK: 788, SpDEF: 232, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 17.63 , Speed: 4250 },
    14: { HP: 6804, ATK: 306, DEF: 289, SpATK: 889, SpDEF: 255, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 18.76 , Speed: 4250 },
    15: { HP: 7300, ATK: 330, DEF: 320, SpATK: 1000, SpDEF: 280, CritRate: 0 , CDR: 20 , Lifesteal: 0 , AtkSPD: 20.00 , Speed: 4250 },
  },

    "mrmime": {
    1: { HP: 3150, ATK: 150, DEF: 70, SpATK: 50, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3351, ATK: 155, DEF: 82, SpATK: 64, SpDEF: 71, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.71 , Speed: 3800 },
    3: { HP: 3572, ATK: 161, DEF: 96, SpATK: 80, SpDEF: 83, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.49 , Speed: 3800 },
    4: { HP: 3815, ATK: 167, DEF: 111, SpATK: 97, SpDEF: 96, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.35 , Speed: 3800 },
    5: { HP: 4082, ATK: 174, DEF: 128, SpATK: 116, SpDEF: 110, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.29 , Speed: 3950 },
    6: { HP: 4376, ATK: 181, DEF: 146, SpATK: 137, SpDEF: 126, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.33 , Speed: 3950 },
    7: { HP: 4700, ATK: 189, DEF: 166, SpATK: 160, SpDEF: 143, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.48 , Speed: 4100 },
    8: { HP: 5057, ATK: 198, DEF: 188, SpATK: 185, SpDEF: 162, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.74 , Speed: 4100 },
    9: { HP: 5450, ATK: 208, DEF: 212, SpATK: 213, SpDEF: 183, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.13 , Speed: 4250 },
    10: { HP: 5883, ATK: 219, DEF: 239, SpATK: 244, SpDEF: 206, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 19.66 , Speed: 4250 },
    11: { HP: 6360, ATK: 231, DEF: 269, SpATK: 278, SpDEF: 231, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 21.35 , Speed: 4400 },
    12: { HP: 6885, ATK: 244, DEF: 302, SpATK: 315, SpDEF: 259, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 23.21 , Speed: 4400 },
    13: { HP: 7463, ATK: 259, DEF: 338, SpATK: 356, SpDEF: 290, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 25.26 , Speed: 4400 },
    14: { HP: 8099, ATK: 275, DEF: 377, SpATK: 401, SpDEF: 324, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 27.51 , Speed: 4400 },
    15: { HP: 8800, ATK: 293, DEF: 420, SpATK: 450, SpDEF: 361, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 29.99 , Speed: 4400 },
  },

    "ninetales": {
    1: { HP: 3197, ATK: 134, DEF: 35, SpATK: 51, SpDEF: 27, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3266, ATK: 137, DEF: 39, SpATK: 72, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.44 , Speed: 3700 },
    3: { HP: 3345, ATK: 141, DEF: 44, SpATK: 96, SpDEF: 34, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3700 },
    4: { HP: 3747, ATK: 161, DEF: 69, SpATK: 219, SpDEF: 53, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.54 , Speed: 3700 },
    5: { HP: 3852, ATK: 166, DEF: 75, SpATK: 251, SpDEF: 58, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.22 , Speed: 3850 },
    6: { HP: 3972, ATK: 172, DEF: 82, SpATK: 288, SpDEF: 64, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.00 , Speed: 3850 },
    7: { HP: 4110, ATK: 179, DEF: 90, SpATK: 330, SpDEF: 71, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.89 , Speed: 4000 },
    8: { HP: 4269, ATK: 187, DEF: 100, SpATK: 379, SpDEF: 79, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.92 , Speed: 4000 },
    9: { HP: 4452, ATK: 196, DEF: 111, SpATK: 435, SpDEF: 88, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 18.1 , Speed: 4150 },
    10: { HP: 4663, ATK: 207, DEF: 124, SpATK: 500, SpDEF: 98, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 19.46 , Speed: 4150 },
    11: { HP: 4906, ATK: 219, DEF: 139, SpATK: 574, SpDEF: 110, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 21.02 , Speed: 4300 },
    12: { HP: 5185, ATK: 233, DEF: 156, SpATK: 660, SpDEF: 123, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 22.82 , Speed: 4300 },
    13: { HP: 5506, ATK: 249, DEF: 176, SpATK: 759, SpDEF: 138, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 24.89 , Speed: 4300 },
    14: { HP: 5875, ATK: 268, DEF: 199, SpATK: 872, SpDEF: 155, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 27.27 , Speed: 4300 },
    15: { HP: 6299, ATK: 289, DEF: 225, SpATK: 1002, SpDEF: 175, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

  "pawmot": {
    1: { HP: 3250, ATK: 145, DEF: 90, SpATK: 20, SpDEF: 65, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3332, ATK: 150, DEF: 97, SpATK: 21, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.43 , Speed: 3700 },
    3: { HP: 3431, ATK: 156, DEF: 105, SpATK: 23, SpDEF: 76, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3700 },
    4: { HP: 3550, ATK: 163, DEF: 115, SpATK: 25, SpDEF: 83, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.57 , Speed: 3700 },
    5: { HP: 4124, ATK: 196, DEF: 162, SpATK: 34, SpDEF: 116, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 14.56 , Speed: 3850 },
    6: { HP: 4295, ATK: 206, DEF: 176, SpATK: 37, SpDEF: 126, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.45 , Speed: 3850 },
    7: { HP: 4932, ATK: 243, DEF: 228, SpATK: 48, SpDEF: 163, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 18.77 , Speed: 4000 },
    8: { HP: 5179, ATK: 257, DEF: 248, SpATK: 52, SpDEF: 177, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 20.06 , Speed: 4000 },
    9: { HP: 5475, ATK: 274, DEF: 272, SpATK: 57, SpDEF: 194, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 21.61 , Speed: 4150 },
    10: { HP: 5830, ATK: 294, DEF: 301, SpATK: 63, SpDEF: 215, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 23.46 , Speed: 4150 },
    11: { HP: 6256, ATK: 318, DEF: 336, SpATK: 70, SpDEF: 240, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 25.68 , Speed: 4300 },
    12: { HP: 6767, ATK: 347, DEF: 378, SpATK: 78, SpDEF: 270, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 28.35 , Speed: 4300 },
    13: { HP: 7380, ATK: 382, DEF: 428, SpATK: 88, SpDEF: 306, CritRate: 20 , CDR: 0 , Lifesteal: 20 , AtkSPD: 31.55 , Speed: 4300 },
    14: { HP: 8116, ATK: 424, DEF: 488, SpATK: 100, SpDEF: 349, CritRate: 20 , CDR: 0 , Lifesteal: 20 , AtkSPD: 35.39 , Speed: 4300 },
    15: { HP: 9000, ATK: 475, DEF: 560, SpATK: 115, SpDEF: 400, CritRate: 20 , CDR: 0 , Lifesteal: 20 , AtkSPD: 40.00 , Speed: 4300 },
  },

    "pikachu": {
    1: { HP: 3292, ATK: 134, DEF: 35, SpATK: 50, SpDEF: 27, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3399, ATK: 140, DEF: 42, SpATK: 82, SpDEF: 33, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    3: { HP: 3517, ATK: 146, DEF: 50, SpATK: 117, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    4: { HP: 3646, ATK: 153, DEF: 59, SpATK: 156, SpDEF: 47, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    5: { HP: 3788, ATK: 160, DEF: 69, SpATK: 199, SpDEF: 55, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3850 },
    6: { HP: 3945, ATK: 168, DEF: 80, SpATK: 246, SpDEF: 64, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3850 },
    7: { HP: 4117, ATK: 177, DEF: 92, SpATK: 298, SpDEF: 74, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4000 },
    8: { HP: 4307, ATK: 187, DEF: 105, SpATK: 355, SpDEF: 85, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4000 },
    9: { HP: 4516, ATK: 198, DEF: 119, SpATK: 418, SpDEF: 97, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4150 },
    10: { HP: 4747, ATK: 210, DEF: 135, SpATK: 487, SpDEF: 110, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4150 },
    11: { HP: 5001, ATK: 223, DEF: 152, SpATK: 563, SpDEF: 125, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
    12: { HP: 5280, ATK: 237, DEF: 171, SpATK: 647, SpDEF: 141, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
    13: { HP: 5588, ATK: 253, DEF: 192, SpATK: 740, SpDEF: 159, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
    14: { HP: 5927, ATK: 271, DEF: 215, SpATK: 842, SpDEF: 179, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
    15: { HP: 6300, ATK: 290, DEF: 240, SpATK: 954, SpDEF: 200, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 4300 },
  },

    "psyduck": {
    1: { HP: 3300, ATK: 130, DEF: 80, SpATK: 50, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3503, ATK: 137, DEF: 90, SpATK: 71, SpDEF: 79, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.36 , Speed: 3700 },
    3: { HP: 3726, ATK: 144, DEF: 101, SpATK: 95, SpDEF: 88, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.75 , Speed: 3700 },
    4: { HP: 3971, ATK: 152, DEF: 113, SpATK: 121, SpDEF: 98, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.18 , Speed: 3700 },
    5: { HP: 4240, ATK: 161, DEF: 127, SpATK: 149, SpDEF: 109, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 11.65 , Speed: 3850 },
    6: { HP: 4537, ATK: 171, DEF: 142, SpATK: 180, SpDEF: 122, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.17 , Speed: 3850 },
    7: { HP: 4864, ATK: 182, DEF: 159, SpATK: 214, SpDEF: 136, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.74 , Speed: 4000 },
    8: { HP: 5224, ATK: 194, DEF: 177, SpATK: 252, SpDEF: 151, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.37 , Speed: 4000 },
    9: { HP: 5621, ATK: 207, DEF: 197, SpATK: 294, SpDEF: 168, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.07 , Speed: 4150 },
    10: { HP: 6058, ATK: 222, DEF: 219, SpATK: 340, SpDEF: 186, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.84 , Speed: 4150 },
    11: { HP: 6539, ATK: 238, DEF: 244, SpATK: 391, SpDEF: 206, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.68 , Speed: 4300 },
    12: { HP: 7068, ATK: 256, DEF: 271, SpATK: 447, SpDEF: 228, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.61 , Speed: 4300 },
    13: { HP: 7651, ATK: 275, DEF: 301, SpATK: 508, SpDEF: 253, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.63 , Speed: 4300 },
    14: { HP: 8293, ATK: 296, DEF: 334, SpATK: 576, SpDEF: 280, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.76 , Speed: 4300 },
    15: { HP: 9000, ATK: 320, DEF: 370, SpATK: 650, SpDEF: 310, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 20.00 , Speed: 4300 }
  },

    "raichu": {
    1: { HP: 3400, ATK: 20, DEF: 50, SpATK: 150, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3500, ATK: 23, DEF: 57, SpATK: 171, SpDEF: 46, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.42 , Speed: 3600 },
    3: { HP: 3610, ATK: 27, DEF: 65, SpATK: 194, SpDEF: 53, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.99 , Speed: 3600 },
    4: { HP: 3731, ATK: 31, DEF: 74, SpATK: 220, SpDEF: 61, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 14.71 , Speed: 3600 },
    5: { HP: 3863, ATK: 36, DEF: 83, SpATK: 248, SpDEF: 70, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.6 , Speed: 3750 },
    6: { HP: 4009, ATK: 41, DEF: 93, SpATK: 279, SpDEF: 79, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 18.68 , Speed: 3750 },
    7: { HP: 4169, ATK: 46, DEF: 104, SpATK: 313, SpDEF: 89, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 20.97 , Speed: 3900 },
    8: { HP: 4346, ATK: 52, DEF: 117, SpATK: 351, SpDEF: 100, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 23.49 , Speed: 3900 },
    9: { HP: 4541, ATK: 59, DEF: 131, SpATK: 393, SpDEF: 113, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 26.27 , Speed: 4050 },
    10: { HP: 4756, ATK: 66, DEF: 146, SpATK: 439, SpDEF: 127, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 29.34 , Speed: 4050 },
    11: { HP: 4993, ATK: 74, DEF: 163, SpATK: 490, SpDEF: 142, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 32.72 , Speed: 4200 },
    12: { HP: 5253, ATK: 83, DEF: 182, SpATK: 546, SpDEF: 159, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 36.44 , Speed: 4200 },
    13: { HP: 5539, ATK: 93, DEF: 202, SpATK: 607, SpDEF: 177, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 40.53 , Speed: 4200 },
    14: { HP: 6200, ATK: 104, DEF: 225, SpATK: 675, SpDEF: 197, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 45.04 , Speed: 4200 },
    15: { HP: 6854, ATK: 116, DEF: 250, SpATK: 750, SpDEF: 220, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 50.00 , Speed: 4200 }
  },

    "rapidash": {
    1: { HP: 3300, ATK: 130, DEF: 60, SpATK: 90, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3364, ATK: 133, DEF: 64, SpATK: 99, SpDEF: 74, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.43 , Speed: 3800 },
    3: { HP: 3441, ATK: 136, DEF: 69, SpATK: 110, SpDEF: 79, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3800 },
    4: { HP: 3534, ATK: 140, DEF: 75, SpATK: 123, SpDEF: 85, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.57 , Speed: 3800 },
    5: { HP: 4321, ATK: 173, DEF: 122, SpATK: 233, SpDEF: 136, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.82 , Speed: 3950 },
    6: { HP: 4455, ATK: 179, DEF: 130, SpATK: 252, SpDEF: 145, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 17.71 , Speed: 3950 },
    7: { HP: 4616, ATK: 186, DEF: 140, SpATK: 274, SpDEF: 155, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 18.78 , Speed: 4100 },
    8: { HP: 4809, ATK: 194, DEF: 151, SpATK: 301, SpDEF: 167, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 20.07 , Speed: 4100 },
    9: { HP: 5041, ATK: 204, DEF: 165, SpATK: 333, SpDEF: 182, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 21.62 , Speed: 4250 },
    10: { HP: 5319, ATK: 216, DEF: 182, SpATK: 372, SpDEF: 200, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 23.47 , Speed: 4250 },
    11: { HP: 5653, ATK: 230, DEF: 202, SpATK: 419, SpDEF: 222, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 25.69 , Speed: 4400 },
    12: { HP: 6053, ATK: 247, DEF: 226, SpATK: 475, SpDEF: 248, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 28.36 , Speed: 4400 },
    13: { HP: 6533, ATK: 267, DEF: 255, SpATK: 542, SpDEF: 279, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 31.56 , Speed: 4400 },
    14: { HP: 7109, ATK: 291, DEF: 289, SpATK: 623, SpDEF: 316, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 35.4 , Speed: 4400 },
    15: { HP: 7800, ATK: 320, DEF: 330, SpATK: 720, SpDEF: 361, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 40.01 , Speed: 4400 },
  },

    "sableye": {
    1: { HP: 3000, ATK: 110, DEF: 40, SpATK: 20, SpDEF: 30, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3139, ATK: 117, DEF: 46, SpATK: 24, SpDEF: 34, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.36 , Speed: 3700 },
    3: { HP: 3292, ATK: 124, DEF: 52, SpATK: 28, SpDEF: 39, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.75 , Speed: 3700 },
    4: { HP: 3460, ATK: 132, DEF: 59, SpATK: 32, SpDEF: 44, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.18 , Speed: 3700 },
    5: { HP: 3644, ATK: 141, DEF: 67, SpATK: 37, SpDEF: 50, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 11.65 , Speed: 3850 },
    6: { HP: 3847, ATK: 151, DEF: 75, SpATK: 42, SpDEF: 56, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.17 , Speed: 3850 },
    7: { HP: 4070, ATK: 162, DEF: 84, SpATK: 48, SpDEF: 63, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.74 , Speed: 4000 },
    8: { HP: 4316, ATK: 174, DEF: 94, SpATK: 54, SpDEF: 71, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.37 , Speed: 4000 },
    9: { HP: 4587, ATK: 187, DEF: 105, SpATK: 61, SpDEF: 79, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.07 , Speed: 4150 },
    10: { HP: 4886, ATK: 202, DEF: 117, SpATK: 69, SpDEF: 88, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.84 , Speed: 4150 },
    11: { HP: 5216, ATK: 218, DEF: 131, SpATK: 78, SpDEF: 98, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.68 , Speed: 4300 },
    12: { HP: 5578, ATK: 236, DEF: 146, SpATK: 87, SpDEF: 109, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.61 , Speed: 4300 },
    13: { HP: 5977, ATK: 255, DEF: 162, SpATK: 97, SpDEF: 121, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.63 , Speed: 4300 },
    14: { HP: 6416, ATK: 276, DEF: 180, SpATK: 108, SpDEF: 135, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.76 , Speed: 4300 },
    15: { HP: 6900, ATK: 300, DEF: 200, SpATK: 120, SpDEF: 150, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 20.00 , Speed: 4300 },
  },

    "scizor": {
    1: { HP: 3100, ATK: 160, DEF: 45, SpATK: 20, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3174, ATK: 170, DEF: 51, SpATK: 22, SpDEF: 44, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.44 , Speed: 3650 },
    3: { HP: 3259, ATK: 182, DEF: 58, SpATK: 24, SpDEF: 48, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3650 },
    4: { HP: 3357, ATK: 196, DEF: 66, SpATK: 27, SpDEF: 53, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.54 , Speed: 3650 },
    5: { HP: 4154, ATK: 224, DEF: 143, SpATK: 40, SpDEF: 118, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 14.22 , Speed: 3800 },
    6: { HP: 4348, ATK: 236, DEF: 161, SpATK: 44, SpDEF: 132, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.00 , Speed: 3800 },
    7: { HP: 4571, ATK: 249, DEF: 182, SpATK: 48, SpDEF: 149, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.89 , Speed: 3950 },
    8: { HP: 4828, ATK: 264, DEF: 206, SpATK: 53, SpDEF: 168, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 16.92 , Speed: 3950 },
    9: { HP: 5123, ATK: 282, DEF: 233, SpATK: 59, SpDEF: 190, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 18.1 , Speed: 4100 },
    10: { HP: 5463, ATK: 302, DEF: 265, SpATK: 65, SpDEF: 215, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 19.46 , Speed: 4100 },
    11: { HP: 5854, ATK: 325, DEF: 301, SpATK: 72, SpDEF: 244, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 21.02 , Speed: 4250 },
    12: { HP: 6304, ATK: 352, DEF: 343, SpATK: 81, SpDEF: 277, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 22.82 , Speed: 4250 },
    13: { HP: 6821, ATK: 383, DEF: 391, SpATK: 91, SpDEF: 315, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 24.89 , Speed: 4250 },
    14: { HP: 7416, ATK: 419, DEF: 446, SpATK: 102, SpDEF: 359, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 27.27 , Speed: 4250 },
    15: { HP: 8100, ATK: 460, DEF: 510, SpATK: 115, SpDEF: 410, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 30.00 , Speed: 4250 },
  },

  	"scyther": {
    1: { HP: 3100, ATK: 160, DEF: 45, SpATK: 20, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3174, ATK: 170, DEF: 51, SpATK: 22, SpDEF: 44, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.44 , Speed: 3650 },
    3: { HP: 3259, ATK: 182, DEF: 58, SpATK: 24, SpDEF: 48, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3650 },
    4: { HP: 3357, ATK: 196, DEF: 66, SpATK: 27, SpDEF: 53, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.54 , Speed: 3650 },
    5: { HP: 3805, ATK: 259, DEF: 100, SpATK: 40, SpDEF: 74, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.22 , Speed: 3800 },
    6: { HP: 3935, ATK: 277, DEF: 110, SpATK: 44, SpDEF: 80, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.00 , Speed: 3800 },
    7: { HP: 4084, ATK: 298, DEF: 121, SpATK: 48, SpDEF: 87, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.89 , Speed: 3950 },
    8: { HP: 4256, ATK: 322, DEF: 134, SpATK: 53, SpDEF: 95, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.92 , Speed: 3950 },
    9: { HP: 4454, ATK: 350, DEF: 149, SpATK: 59, SpDEF: 104, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 18.1 , Speed: 4100 },
    10: { HP: 4682, ATK: 382, DEF: 166, SpATK: 65, SpDEF: 115, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 19.46 , Speed: 4100 },
    11: { HP: 4944, ATK: 419, DEF: 186, SpATK: 72, SpDEF: 128, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 21.02 , Speed: 4250 },
    12: { HP: 5246, ATK: 461, DEF: 209, SpATK: 81, SpDEF: 142, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 22.82 , Speed: 4250 },
    13: { HP: 5593, ATK: 510, DEF: 235, SpATK: 91, SpDEF: 159, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 24.89 , Speed: 4250 },
    14: { HP: 5992, ATK: 566, DEF: 265, SpATK: 102, SpDEF: 178, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 27.27 , Speed: 4250 },
    15: { HP: 6450, ATK: 630, DEF: 300, SpATK: 115, SpDEF: 200, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4250 }
  },

    "slowbro": {
    1: { HP: 3225, ATK: 150, DEF: 70, SpATK: 50, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3361, ATK: 153, DEF: 79, SpATK: 58, SpDEF: 68, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.44 , Speed: 3700 },
    3: { HP: 3517, ATK: 157, DEF: 89, SpATK: 67, SpDEF: 77, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3700 },
    4: { HP: 4309, ATK: 175, DEF: 142, SpATK: 114, SpDEF: 124, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.54 , Speed: 3700 },
    5: { HP: 4516, ATK: 180, DEF: 156, SpATK: 126, SpDEF: 136, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 14.22 , Speed: 3850 },
    6: { HP: 4754, ATK: 186, DEF: 172, SpATK: 140, SpDEF: 150, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 15.00 , Speed: 3850 },
    7: { HP: 5027, ATK: 192, DEF: 190, SpATK: 156, SpDEF: 166, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 15.89 , Speed: 4000 },
    8: { HP: 5342, ATK: 199, DEF: 211, SpATK: 175, SpDEF: 185, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 16.92 , Speed: 4000 },
    9: { HP: 5704, ATK: 207, DEF: 235, SpATK: 196, SpDEF: 206, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 18.1 , Speed: 4150 },
    10: { HP: 6120, ATK: 217, DEF: 263, SpATK: 221, SpDEF: 231, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 19.46 , Speed: 4150 },
    11: { HP: 6599, ATK: 228, DEF: 295, SpATK: 249, SpDEF: 259, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 21.02 , Speed: 4300 },
    12: { HP: 7150, ATK: 241, DEF: 332, SpATK: 282, SpDEF: 291, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 22.82 , Speed: 4300 },
    13: { HP: 7784, ATK: 256, DEF: 375, SpATK: 319, SpDEF: 328, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 24.89 , Speed: 4300 },
    14: { HP: 8513, ATK: 273, DEF: 424, SpATK: 362, SpDEF: 371, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 27.27 , Speed: 4300 },
    15: { HP: 9350, ATK: 292, DEF: 480, SpATK: 411, SpDEF: 420, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "snorlax": {
    1: { HP: 3300, ATK: 175, DEF: 97, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3553, ATK: 181, DEF: 116, SpATK: 23, SpDEF: 85, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.07 , Speed: 3650 },
    3: { HP: 3831, ATK: 188, DEF: 137, SpATK: 27, SpDEF: 101, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.24 , Speed: 3650 },
    4: { HP: 4137, ATK: 195, DEF: 160, SpATK: 31, SpDEF: 119, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.53 , Speed: 3650 },
    5: { HP: 4472, ATK: 203, DEF: 186, SpATK: 36, SpDEF: 139, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 14.95 , Speed: 3800 },
    6: { HP: 4842, ATK: 212, DEF: 214, SpATK: 41, SpDEF: 161, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.51 , Speed: 3800 },
    7: { HP: 5249, ATK: 222, DEF: 245, SpATK: 46, SpDEF: 185, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 18.23 , Speed: 3950 },
    8: { HP: 5697, ATK: 233, DEF: 279, SpATK: 52, SpDEF: 212, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 20.12 , Speed: 3950 },
    9: { HP: 6191, ATK: 245, DEF: 317, SpATK: 59, SpDEF: 241, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 22.21 , Speed: 4100 },
    10: { HP: 6735, ATK: 258, DEF: 359, SpATK: 66, SpDEF: 273, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 24.51 , Speed: 4100 },
    11: { HP: 7335, ATK: 272, DEF: 405, SpATK: 74, SpDEF: 309, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 27.04 , Speed: 4250 },
    12: { HP: 7994, ATK: 288, DEF: 456, SpATK: 83, SpDEF: 348, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 29.83 , Speed: 4250 },
    13: { HP: 8720, ATK: 305, DEF: 512, SpATK: 93, SpDEF: 391, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 32.9 , Speed: 4250 },
    14: { HP: 9520, ATK: 324, DEF: 573, SpATK: 104, SpDEF: 438, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 36.28 , Speed: 4250 },
    15: { HP: 10400, ATK: 345, DEF: 640, SpATK: 116, SpDEF: 490, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 40.00 , Speed: 4250 }
  },

    "suicune": {
    1: { HP: 3250, ATK: 134, DEF: 70, SpATK: 80, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3398, ATK: 140, DEF: 80, SpATK: 105, SpDEF: 68, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.71 , Speed: 3700 },
    3: { HP: 3561, ATK: 146, DEF: 91, SpATK: 132, SpDEF: 76, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.49 , Speed: 3700 },
    4: { HP: 3740, ATK: 153, DEF: 103, SpATK: 162, SpDEF: 85, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.35 , Speed: 3700 },
    5: { HP: 3936, ATK: 160, DEF: 116, SpATK: 195, SpDEF: 95, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.3 , Speed: 3850 },
    6: { HP: 4152, ATK: 168, DEF: 130, SpATK: 231, SpDEF: 106, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.34 , Speed: 3850 },
    7: { HP: 4390, ATK: 177, DEF: 145, SpATK: 271, SpDEF: 118, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.49 , Speed: 4000 },
    8: { HP: 4652, ATK: 187, DEF: 162, SpATK: 315, SpDEF: 132, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.75 , Speed: 4000 },
    9: { HP: 4941, ATK: 198, DEF: 181, SpATK: 364, SpDEF: 147, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.14 , Speed: 4150 },
    10: { HP: 5259, ATK: 210, DEF: 202, SpATK: 418, SpDEF: 164, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 19.67 , Speed: 4150 },
    11: { HP: 5610, ATK: 223, DEF: 225, SpATK: 477, SpDEF: 182, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 21.36 , Speed: 4300 },
    12: { HP: 5995, ATK: 237, DEF: 250, SpATK: 542, SpDEF: 202, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 23.22 , Speed: 4300 },
    13: { HP: 6419, ATK: 253, DEF: 277, SpATK: 614, SpDEF: 224, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 25.27 , Speed: 4300 },
    14: { HP: 6886, ATK: 271, DEF: 307, SpATK: 693, SpDEF: 248, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 27.52 , Speed: 4300 },
    15: { HP: 7400, ATK: 290, DEF: 340, SpATK: 780, SpDEF: 275, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "sylveon": {
    1: { HP: 3406, ATK: 167, DEF: 52, SpATK: 70, SpDEF: 38, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3494, ATK: 171, DEF: 57, SpATK: 84, SpDEF: 42, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.67 , Speed: 3700 },
    3: { HP: 3595, ATK: 176, DEF: 62, SpATK: 101, SpDEF: 47, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.43 , Speed: 3700 },
    4: { HP: 4105, ATK: 201, DEF: 89, SpATK: 185, SpDEF: 73, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 15.31 , Speed: 3700 },
    5: { HP: 4238, ATK: 208, DEF: 96, SpATK: 207, SpDEF: 80, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.32 , Speed: 3850 },
    6: { HP: 4391, ATK: 216, DEF: 104, SpATK: 232, SpDEF: 88, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 17.48 , Speed: 3850 },
    7: { HP: 4567, ATK: 225, DEF: 113, SpATK: 261, SpDEF: 97, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 18.82 , Speed: 4000 },
    8: { HP: 4770, ATK: 235, DEF: 124, SpATK: 294, SpDEF: 107, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 20.36 , Speed: 4000 },
    9: { HP: 5003, ATK: 247, DEF: 136, SpATK: 332, SpDEF: 119, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 22.13 , Speed: 4150 },
    10: { HP: 5271, ATK: 260, DEF: 150, SpATK: 376, SpDEF: 133, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 24.17 , Speed: 4150 },
    11: { HP: 5579, ATK: 275, DEF: 166, SpATK: 427, SpDEF: 149, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 26.52 , Speed: 4300 },
    12: { HP: 5934, ATK: 293, DEF: 185, SpATK: 486, SpDEF: 167, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 29.22 , Speed: 4300 },
    13: { HP: 6342, ATK: 313, DEF: 207, SpATK: 553, SpDEF: 188, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 32.32 , Speed: 4300 },
    14: { HP: 6811, ATK: 336, DEF: 232, SpATK: 631, SpDEF: 212, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 35.89 , Speed: 4300 },
    15: { HP: 7350, ATK: 363, DEF: 260, SpATK: 720, SpDEF: 240, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 39.99 , Speed: 4300 },
  },

    "talonflame": {
    1: { HP: 3024, ATK: 200, DEF: 58, SpATK: 20, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3072, ATK: 207, DEF: 62, SpATK: 21, SpDEF: 43, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.43 , Speed: 3650 },
    3: { HP: 3130, ATK: 216, DEF: 66, SpATK: 23, SpDEF: 46, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.94 , Speed: 3650 },
    4: { HP: 3200, ATK: 227, DEF: 71, SpATK: 25, SpDEF: 50, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.56 , Speed: 3650 },
    5: { HP: 3453, ATK: 265, DEF: 91, SpATK: 32, SpDEF: 63, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 13.8 , Speed: 3800 },
    6: { HP: 3554, ATK: 280, DEF: 99, SpATK: 35, SpDEF: 68, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.69 , Speed: 3800 },
    7: { HP: 4012, ATK: 349, DEF: 135, SpATK: 48, SpDEF: 92, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.76 , Speed: 3950 },
    8: { HP: 4157, ATK: 371, DEF: 146, SpATK: 52, SpDEF: 100, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 20.05 , Speed: 3950 },
    9: { HP: 4331, ATK: 397, DEF: 159, SpATK: 57, SpDEF: 109, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 21.59 , Speed: 4100 },
    10: { HP: 4539, ATK: 428, DEF: 175, SpATK: 63, SpDEF: 120, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 23.44 , Speed: 4100 },
    11: { HP: 4789, ATK: 466, DEF: 194, SpATK: 70, SpDEF: 133, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 25.66 , Speed: 4250 },
    12: { HP: 5089, ATK: 511, DEF: 217, SpATK: 79, SpDEF: 149, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 28.33 , Speed: 4250 },
    13: { HP: 5499, ATK: 565, DEF: 245, SpATK: 89, SpDEF: 168, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 31.53 , Speed: 4250 },
    14: { HP: 5881, ATK: 630, DEF: 279, SpATK: 102, SpDEF: 190, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 35.37 , Speed: 4250 },
    15: { HP: 6400, ATK: 710, DEF: 320, SpATK: 117, SpDEF: 215, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 39.98 , Speed: 4250 }
  },

    "tinkaton": {
    1: { HP: 3250, ATK: 100, DEF: 60, SpATK: 20, SpDEF: 80, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3324, ATK: 105, DEF: 64, SpATK: 21, SpDEF: 85, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3412, ATK: 111, DEF: 69, SpATK: 23, SpDEF: 91, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3518, ATK: 118, DEF: 75, SpATK: 25, SpDEF: 98, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 3903, ATK: 145, DEF: 95, SpATK: 32, SpDEF: 124, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 4057, ATK: 156, DEF: 103, SpATK: 35, SpDEF: 134, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 4756, ATK: 205, DEF: 139, SpATK: 48, SpDEF: 182, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.86 , Speed: 4000 },
    8: { HP: 4997, ATK: 220, DEF: 151, SpATK: 52, SpDEF: 197, CritRate: 0 , CDR: 0 , Lifesteal: 5 , AtkSPD: 16.72 , Speed: 4000 },
    9: { HP: 5242, ATK: 239, DEF: 165, SpATK: 57, SpDEF: 215, CritRate: 0 , CDR: 0 , Lifesteal: 10 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 5560, ATK: 261, DEF: 182, SpATK: 63, SpDEF: 237, CritRate: 0 , CDR: 0 , Lifesteal: 10 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 5942, ATK: 288, DEF: 202, SpATK: 70, SpDEF: 263, CritRate: 0 , CDR: 0 , Lifesteal: 10 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 6400, ATK: 320, DEF: 226, SpATK: 78, SpDEF: 294, CritRate: 0 , CDR: 0 , Lifesteal: 10 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 6950, ATK: 359, DEF: 255, SpATK: 88, SpDEF: 331, CritRate: 0 , CDR: 0 , Lifesteal: 15 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 7609, ATK: 405, DEF: 289, SpATK: 100, SpDEF: 376, CritRate: 0 , CDR: 0 , Lifesteal: 15 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 8400, ATK: 460, DEF: 330, SpATK: 115, SpDEF: 430, CritRate: 0 , CDR: 0 , Lifesteal: 15 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "trevenant": {
    1: { HP: 3250, ATK: 175, DEF: 100, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3391, ATK: 178, DEF: 109, SpATK: 22, SpDEF: 78, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.44 , Speed: 3800 },
    3: { HP: 3553, ATK: 182, DEF: 120, SpATK: 24, SpDEF: 87, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3800 },
    4: { HP: 3739, ATK: 187, DEF: 132, SpATK: 27, SpDEF: 97, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 11.54 , Speed: 3800 },
    5: { HP: 4589, ATK: 208, DEF: 188, SpATK: 40, SpDEF: 144, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.22 , Speed: 3950 },
    6: { HP: 4835, ATK: 214, DEF: 204, SpATK: 44, SpDEF: 158, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.00 , Speed: 3950 },
    7: { HP: 5118, ATK: 221, DEF: 223, SpATK: 48, SpDEF: 174, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.89 , Speed: 4100 },
    8: { HP: 5444, ATK: 229, DEF: 245, SpATK: 53, SpDEF: 192, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.92 , Speed: 4100 },
    9: { HP: 5819, ATK: 238, DEF: 270, SpATK: 59, SpDEF: 213, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.1 , Speed: 4250 },
    10: { HP: 6251, ATK: 249, DEF: 299, SpATK: 66, SpDEF: 237, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 19.46 , Speed: 4250 },
    11: { HP: 6748, ATK: 261, DEF: 332, SpATK: 74, SpDEF: 264, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 21.02 , Speed: 4400 },
    12: { HP: 7319, ATK: 275, DEF: 370, SpATK: 83, SpDEF: 295, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 22.82 , Speed: 4400 },
    13: { HP: 7976, ATK: 291, DEF: 413, SpATK: 93, SpDEF: 331, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 24.89 , Speed: 4400 },
    14: { HP: 8731, ATK: 309, DEF: 463, SpATK: 104, SpDEF: 373, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 27.27 , Speed: 4400 },
    15: { HP: 9599, ATK: 330, DEF: 520, SpATK: 117, SpDEF: 421, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4400 }
  },

    "tsareena": {
    1: { HP: 3100, ATK: 155, DEF: 70, SpATK: 20, SpDEF: 50, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3160, ATK: 159, DEF: 75, SpATK: 21, SpDEF: 54, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.57 , Speed: 3650 },
    3: { HP: 3232, ATK: 164, DEF: 81, SpATK: 23, SpDEF: 59, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.26 , Speed: 3650 },
    4: { HP: 3529, ATK: 185, DEF: 105, SpATK: 30, SpDEF: 79, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 14.08 , Speed: 3650 },
    5: { HP: 3633, ATK: 193, DEF: 113, SpATK: 32, SpDEF: 86, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.07 , Speed: 3800 },
    6: { HP: 4178, ATK: 233, DEF: 157, SpATK: 44, SpDEF: 124, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 20.26 , Speed: 3800 },
    7: { HP: 4328, ATK: 244, DEF: 169, SpATK: 47, SpDEF: 134, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 21.69 , Speed: 3950 },
    8: { HP: 4508, ATK: 257, DEF: 184, SpATK: 51, SpDEF: 146, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 23.41 , Speed: 3950 },
    9: { HP: 4724, ATK: 273, DEF: 202, SpATK: 56, SpDEF: 161, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 25.47 , Speed: 4100 },
    10: { HP: 4983, ATK: 292, DEF: 223, SpATK: 62, SpDEF: 179, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 27.94 , Speed: 4100 },
    11: { HP: 5294, ATK: 315, DEF: 248, SpATK: 69, SpDEF: 201, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 30.91 , Speed: 4250 },
    12: { HP: 5667, ATK: 342, DEF: 278, SpATK: 78, SpDEF: 227, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 34.47 , Speed: 4250 },
    13: { HP: 6115, ATK: 374, DEF: 314, SpATK: 88, SpDEF: 258, CritRate: 20 , CDR: 0 , Lifesteal: 20 , AtkSPD: 38.74 , Speed: 4250 },
    14: { HP: 6653, ATK: 413, DEF: 358, SpATK: 100, SpDEF: 295, CritRate: 20 , CDR: 0 , Lifesteal: 20 , AtkSPD: 43.86 , Speed: 4250 },
    15: { HP: 7298, ATK: 460, DEF: 410, SpATK: 115, SpDEF: 340, CritRate: 20 , CDR: 0 , Lifesteal: 20 , AtkSPD: 50.01 , Speed: 4250 },
  },

    "tyranitar": {
    1: { HP: 3300, ATK: 150, DEF: 110, SpATK: 20, SpDEF: 90, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3381, ATK: 154, DEF: 116, SpATK: 21, SpDEF: 94, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.29 , Speed: 3800 },
    3: { HP: 3478, ATK: 159, DEF: 123, SpATK: 23, SpDEF: 99, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.63 , Speed: 3800 },
    4: { HP: 3595, ATK: 165, DEF: 131, SpATK: 25, SpDEF: 105, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.04 , Speed: 3800 },
    5: { HP: 4018, ATK: 187, DEF: 162, SpATK: 32, SpDEF: 128, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 12.54 , Speed: 3950 },
    6: { HP: 4186, ATK: 196, DEF: 174, SpATK: 35, SpDEF: 137, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 13.14 , Speed: 3950 },
    7: { HP: 4388, ATK: 207, DEF: 189, SpATK: 38, SpDEF: 148, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 13.86 , Speed: 4100 },
    8: { HP: 4630, ATK: 220, DEF: 207, SpATK: 42, SpDEF: 161, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 14.72 , Speed: 4100 },
    9: { HP: 5486, ATK: 266, DEF: 269, SpATK: 56, SpDEF: 207, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 17.75 , Speed: 4250 },
    10: { HP: 5835, ATK: 285, DEF: 294, SpATK: 62, SpDEF: 226, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 18.98 , Speed: 4250 },
    11: { HP: 6254, ATK: 307, DEF: 324, SpATK: 69, SpDEF: 249, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 20.46 , Speed: 4400 },
    12: { HP: 6756, ATK: 334, DEF: 360, SpATK: 77, SpDEF: 276, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 22.24 , Speed: 4400 },
    13: { HP: 7359, ATK: 366, DEF: 404, SpATK: 87, SpDEF: 309, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 24.37 , Speed: 4400 },
    14: { HP: 8082, ATK: 404, DEF: 457, SpATK: 99, SpDEF: 348, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 26.93 , Speed: 4400 },
    15: { HP: 8950, ATK: 450, DEF: 520, SpATK: 114, SpDEF: 395, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 30.00 , Speed: 4400 }
  },

    "umbreon": {
    1: { HP: 3300, ATK: 170, DEF: 85, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3439, ATK: 174, DEF: 96, SpATK: 22, SpDEF: 69, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.44 , Speed: 3700 },
    3: { HP: 3598, ATK: 179, DEF: 108, SpATK: 24, SpDEF: 79, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3700 },
    4: { HP: 4407, ATK: 202, DEF: 170, SpATK: 36, SpDEF: 130, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.54 , Speed: 3700 },
    5: { HP: 4618, ATK: 208, DEF: 186, SpATK: 39, SpDEF: 143, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 14.22 , Speed: 3850 },
    6: { HP: 4861, ATK: 215, DEF: 204, SpATK: 43, SpDEF: 158, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.00 , Speed: 3850 },
    7: { HP: 5140, ATK: 223, DEF: 225, SpATK: 47, SpDEF: 175, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 15.89 , Speed: 4000 },
    8: { HP: 5461, ATK: 232, DEF: 249, SpATK: 52, SpDEF: 195, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 16.92 , Speed: 4000 },
    9: { HP: 5830, ATK: 243, DEF: 277, SpATK: 58, SpDEF: 218, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.1 , Speed: 4150 },
    10: { HP: 6255, ATK: 255, DEF: 309, SpATK: 64, SpDEF: 245, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 19.46 , Speed: 4150 },
    11: { HP: 6744, ATK: 269, DEF: 346, SpATK: 71, SpDEF: 276, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 21.02 , Speed: 4300 },
    12: { HP: 7306, ATK: 285, DEF: 389, SpATK: 80, SpDEF: 311, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 22.82 , Speed: 4300 },
    13: { HP: 7953, ATK: 304, DEF: 438, SpATK: 90, SpDEF: 351, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 24.89 , Speed: 4300 },
    14: { HP: 8696, ATK: 325, DEF: 495, SpATK: 101, SpDEF: 397, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 27.27 , Speed: 4300 },
    15: { HP: 9550, ATK: 350, DEF: 560, SpATK: 114, SpDEF: 450, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "urshifu": {
    1: { HP: 3200, ATK: 150, DEF: 80, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3304, ATK: 157, DEF: 88, SpATK: 22, SpDEF: 66, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.44 , Speed: 3700 },
    3: { HP: 3424, ATK: 165, DEF: 97, SpATK: 24, SpDEF: 73, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3700 },
    4: { HP: 3562, ATK: 175, DEF: 107, SpATK: 27, SpDEF: 81, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.54 , Speed: 3700 },
    5: { HP: 4191, ATK: 219, DEF: 154, SpATK: 40, SpDEF: 119, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 14.22 , Speed: 3850 },
    6: { HP: 4373, ATK: 232, DEF: 168, SpATK: 44, SpDEF: 130, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.00 , Speed: 3850 },
    7: { HP: 4583, ATK: 247, DEF: 184, SpATK: 48, SpDEF: 143, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 15.89 , Speed: 4000 },
    8: { HP: 4824, ATK: 264, DEF: 202, SpATK: 53, SpDEF: 157, CritRate: 10 , CDR: 0 , Lifesteal: 5 , AtkSPD: 16.92 , Speed: 4000 },
    9: { HP: 5102, ATK: 284, DEF: 223, SpATK: 59, SpDEF: 174, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 18.1 , Speed: 4150 },
    10: { HP: 5421, ATK: 306, DEF: 247, SpATK: 65, SpDEF: 193, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 19.46 , Speed: 4150 },
    11: { HP: 5789, ATK: 332, DEF: 274, SpATK: 72, SpDEF: 215, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 21.02 , Speed: 4300 },
    12: { HP: 6212, ATK: 362, DEF: 305, SpATK: 81, SpDEF: 240, CritRate: 20 , CDR: 0 , Lifesteal: 10 , AtkSPD: 22.82 , Speed: 4300 },
    13: { HP: 6698, ATK: 396, DEF: 341, SpATK: 91, SpDEF: 269, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 24.89 , Speed: 4300 },
    14: { HP: 7257, ATK: 435, DEF: 382, SpATK: 102, SpDEF: 302, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 27.27 , Speed: 4300 },
    15: { HP: 7900, ATK: 480, DEF: 430, SpATK: 115, SpDEF: 340, CritRate: 20 , CDR: 0 , Lifesteal: 15 , AtkSPD: 30.00 , Speed: 4300 },
  },

    "venusaur": {
    1: { HP: 3300, ATK: 134, DEF: 45, SpATK: 50, SpDEF: 35, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3346, ATK: 136, DEF: 48, SpATK: 63, SpDEF: 37, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.14 , Speed: 3700 },
    3: { HP: 3401, ATK: 139, DEF: 51, SpATK: 79, SpDEF: 39, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.31 , Speed: 3700 },
    4: { HP: 3467, ATK: 142, DEF: 55, SpATK: 98, SpDEF: 42, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.52 , Speed: 3700 },
    5: { HP: 3706, ATK: 154, DEF: 69, SpATK: 166, SpDEF: 52, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 11.27 , Speed: 3850 },
    6: { HP: 3801, ATK: 159, DEF: 74, SpATK: 193, SpDEF: 56, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 11.57 , Speed: 3850 },
    7: { HP: 4235, ATK: 180, DEF: 99, SpATK: 317, SpDEF: 74, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.93 , Speed: 4000 },
    8: { HP: 4372, ATK: 187, DEF: 107, SpATK: 356, SpDEF: 80, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.36 , Speed: 4000 },
    9: { HP: 4537, ATK: 195, DEF: 116, SpATK: 403, SpDEF: 87, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 13.87 , Speed: 4150 },
    10: { HP: 4735, ATK: 205, DEF: 127, SpATK: 459, SpDEF: 95, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 14.49 , Speed: 4150 },
    11: { HP: 4972, ATK: 217, DEF: 140, SpATK: 527, SpDEF: 105, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 15.23 , Speed: 4300 },
    12: { HP: 5257, ATK: 231, DEF: 156, SpATK: 608, SpDEF: 117, CritRate: 0 , CDR: 15 , Lifesteal: 0 , AtkSPD: 16.12 , Speed: 4300 },
    13: { HP: 5598, ATK: 248, DEF: 175, SpATK: 705, SpDEF: 131, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 17.19 , Speed: 4300 },
    14: { HP: 6008, ATK: 268, DEF: 198, SpATK: 822, SpDEF: 148, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 18.47 , Speed: 4300 },
    15: { HP: 6500, ATK: 292, DEF: 225, SpATK: 962, SpDEF: 169, CritRate: 0 , CDR: 25 , Lifesteal: 0 , AtkSPD: 20.01 , Speed: 4300 }
  },

    "wigglytuff": {
    1: { HP: 3278, ATK: 130, DEF: 90, SpATK: 40, SpDEF: 80, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3415, ATK: 134, DEF: 100, SpATK: 51, SpDEF: 89, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.22 , Speed: 3700 },
    3: { HP: 3573, ATK: 139, DEF: 111, SpATK: 64, SpDEF: 99, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.48 , Speed: 3700 },
    4: { HP: 4372, ATK: 162, DEF: 169, SpATK: 131, SpDEF: 151, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.77 , Speed: 3700 },
    5: { HP: 4581, ATK: 168, DEF: 184, SpATK: 148, SpDEF: 165, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.11 , Speed: 3850 },
    6: { HP: 4821, ATK: 175, DEF: 201, SpATK: 168, SpDEF: 181, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.5 , Speed: 3850 },
    7: { HP: 5097, ATK: 183, DEF: 221, SpATK: 191, SpDEF: 199, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 12.95 , Speed: 4000 },
    8: { HP: 5414, ATK: 192, DEF: 244, SpATK: 217, SpDEF: 220, CritRate: 0 , CDR: 5 , Lifesteal: 0 , AtkSPD: 13.46 , Speed: 4000 },
    9: { HP: 5779, ATK: 203, DEF: 271, SpATK: 247, SpDEF: 244, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.05 , Speed: 4150 },
    10: { HP: 6199, ATK: 215, DEF: 302, SpATK: 282, SpDEF: 271, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.73 , Speed: 4150 },
    11: { HP: 6681, ATK: 229, DEF: 337, SpATK: 322, SpDEF: 302, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.51 , Speed: 4300 },
    12: { HP: 7236, ATK: 245, DEF: 377, SpATK: 368, SpDEF: 338, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.41 , Speed: 4300 },
    13: { HP: 7874, ATK: 264, DEF: 424, SpATK: 421, SpDEF: 379, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 17.44 , Speed: 4300 },
    14: { HP: 8608, ATK: 285, DEF: 477, SpATK: 482, SpDEF: 427, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.63 , Speed: 4300 },
    15: { HP: 9452, ATK: 310, DEF: 539, SpATK: 552, SpDEF: 482, CritRate: 0 , CDR: 10 , Lifesteal: 0 , AtkSPD: 20.00 , Speed: 4300 }
  },

    "zacian": {
    1: { HP: 3600, ATK: 160, DEF: 100, SpATK: 20, SpDEF: 80, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 25.00 , Speed: 3800 },
    2: { HP: 3757, ATK: 175, DEF: 112, SpATK: 23, SpDEF: 90, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 25.53 , Speed: 3800 },
    3: { HP: 3929, ATK: 191, DEF: 125, SpATK: 27, SpDEF: 101, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 26.12 , Speed: 3800 },
    4: { HP: 4118, ATK: 209, DEF: 140, SpATK: 31, SpDEF: 113, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 26.77 , Speed: 3800 },
    5: { HP: 4326, ATK: 229, DEF: 156, SpATK: 35, SpDEF: 126, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 27.48 , Speed: 3950 },
    6: { HP: 4555, ATK: 251, DEF: 174, SpATK: 40, SpDEF: 140, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 28.26 , Speed: 3950 },
    7: { HP: 4807, ATK: 275, DEF: 193, SpATK: 45, SpDEF: 155, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 29.12 , Speed: 4100 },
    8: { HP: 5085, ATK: 302, DEF: 214, SpATK: 51, SpDEF: 172, CritRate: 5 , CDR: 0 , Lifesteal: 5 , AtkSPD: 30.07 , Speed: 4100 },
    9: { HP: 5391, ATK: 331, DEF: 238, SpATK: 58, SpDEF: 191, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 31.11 , Speed: 4250 },
    10: { HP: 5728, ATK: 363, DEF: 264, SpATK: 65, SpDEF: 212, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 32.26 , Speed: 4250 },
    11: { HP: 6100, ATK: 399, DEF: 293, SpATK: 73, SpDEF: 235, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 33.53 , Speed: 4400 },
    12: { HP: 6509, ATK: 438, DEF: 325, SpATK: 82, SpDEF: 260, CritRate: 10 , CDR: 0 , Lifesteal: 10 , AtkSPD: 34.92 , Speed: 4400 },
    13: { HP: 6959, ATK: 481, DEF: 360, SpATK: 92, SpDEF: 287, CritRate: 10 , CDR: 0 , Lifesteal: 15 , AtkSPD: 36.45 , Speed: 4400 },
    14: { HP: 7455, ATK: 528, DEF: 398, SpATK: 103, SpDEF: 317, CritRate: 10 , CDR: 0 , Lifesteal: 15 , AtkSPD: 38.14 , Speed: 4400 },
    15: { HP: 8000, ATK: 580, DEF: 440, SpATK: 115, SpDEF: 350, CritRate: 10 , CDR: 0 , Lifesteal: 15 , AtkSPD: 40.00 , Speed: 4400 }
  },

    "zeraora": {
    1: { HP: 3002, ATK: 159, DEF: 60, SpATK: 20, SpDEF: 40, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3120, ATK: 176, DEF: 69, SpATK: 23, SpDEF: 46, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.07 , Speed: 3650 },
    3: { HP: 3250, ATK: 195, DEF: 78, SpATK: 27, SpDEF: 52, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 12.24 , Speed: 3650 },
    4: { HP: 3393, ATK: 216, DEF: 88, SpATK: 31, SpDEF: 59, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 13.53 , Speed: 3650 },
    5: { HP: 3550, ATK: 239, DEF: 99, SpATK: 36, SpDEF: 67, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.95 , Speed: 3800 },
    6: { HP: 3723, ATK: 265, DEF: 112, SpATK: 41, SpDEF: 75, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.51 , Speed: 3800 },
    7: { HP: 3913, ATK: 293, DEF: 126, SpATK: 47, SpDEF: 84, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 18.23 , Speed: 3950 },
    8: { HP: 4122, ATK: 324, DEF: 141, SpATK: 53, SpDEF: 94, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 20.12 , Speed: 3950 },
    9: { HP: 4353, ATK: 358, DEF: 158, SpATK: 60, SpDEF: 105, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 22.21 , Speed: 4100 },
    10: { HP: 4607, ATK: 396, DEF: 176, SpATK: 68, SpDEF: 117, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 24.51 , Speed: 4100 },
    11: { HP: 4887, ATK: 437, DEF: 196, SpATK: 76, SpDEF: 131, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 27.04 , Speed: 4250 },
    12: { HP: 5195, ATK: 483, DEF: 218, SpATK: 85, SpDEF: 146, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 29.83 , Speed: 4250 },
    13: { HP: 5534, ATK: 533, DEF: 243, SpATK: 95, SpDEF: 162, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 32.9 , Speed: 4250 },
    14: { HP: 5908, ATK: 588, DEF: 270, SpATK: 106, SpDEF: 180, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 36.28 , Speed: 4250 },
    15: { HP: 6319, ATK: 649, DEF: 300, SpATK: 118, SpDEF: 200, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 40.00 , Speed: 4250 },
  },

    "zoroark": {
    1: { HP: 3030, ATK: 135, DEF: 55, SpATK: 20, SpDEF: 45, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3100, ATK: 147, DEF: 60, SpATK: 22, SpDEF: 48, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.44 , Speed: 3650 },
    3: { HP: 3181, ATK: 160, DEF: 65, SpATK: 25, SpDEF: 51, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 10.95 , Speed: 3650 },
    4: { HP: 3274, ATK: 175, DEF: 71, SpATK: 28, SpDEF: 55, CritRate: 0 , CDR: 0 , Lifesteal: 0 , AtkSPD: 11.54 , Speed: 3650 },
    5: { HP: 3698, ATK: 245, DEF: 99, SpATK: 41, SpDEF: 73, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 14.22 , Speed: 3800 },
    6: { HP: 3821, ATK: 265, DEF: 107, SpATK: 45, SpDEF: 78, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.00 , Speed: 3800 },
    7: { HP: 3962, ATK: 288, DEF: 116, SpATK: 49, SpDEF: 84, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 15.89 , Speed: 3950 },
    8: { HP: 4125, ATK: 315, DEF: 127, SpATK: 54, SpDEF: 91, CritRate: 5 , CDR: 10 , Lifesteal: 0 , AtkSPD: 16.92 , Speed: 3950 },
    9: { HP: 4312, ATK: 346, DEF: 139, SpATK: 60, SpDEF: 99, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 18.1 , Speed: 4100 },
    10: { HP: 4528, ATK: 382, DEF: 153, SpATK: 67, SpDEF: 108, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 19.46 , Speed: 4100 },
    11: { HP: 4776, ATK: 423, DEF: 169, SpATK: 75, SpDEF: 119, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 21.02 , Speed: 4250 },
    12: { HP: 5061, ATK: 470, DEF: 187, SpATK: 84, SpDEF: 131, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 22.82 , Speed: 4250 },
    13: { HP: 5389, ATK: 525, DEF: 208, SpATK: 94, SpDEF: 145, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 24.89 , Speed: 4250 },
    14: { HP: 5766, ATK: 588, DEF: 232, SpATK: 106, SpDEF: 161, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 27.27 , Speed: 4250 },
    15: { HP: 6200, ATK: 660, DEF: 260, SpATK: 120, SpDEF: 180, CritRate: 10 , CDR: 20 , Lifesteal: 0 , AtkSPD: 30.00 , Speed: 4250 }
  }
  // continue manualmente
}

const pokemonRatings = {
  absol: {
    Attack: 3.5,
    Endure: 2,
    Mobility: 4,
    Score: 2.5,
    Support: 0.5,
    Invade: 2,
    Farm: 3.5,
    Gank: 3.5,
    CC: 2,
    Smite: 2.5,
    Sweep: 1
  },
  aegislash: {
    Attack: 3.5,
    Endure: 2,
    Mobility: 4,
    Score: 2.5,
    Support: 0.5,
    Invade: 2,
    Farm: 3.5,
    Gank: 2,
    CC: 4,
    Smite: 4.5,
    Sweep: 0.5
  },
  alcremie: {
    Attack: 1.5,
    Endure: 2,
    Mobility: 2.5,
    Score: 2.5,
    Support: 4,
    Invade: 0.5,
    Farm: 1,
    Gank: 0.5,
    CC: 2,
    Smite: 0.5,
    Sweep: 3
  },
  armarouge: {
    Attack: 4,
    Endure: 2,
    Mobility: 2.5,
    Score: 2,
    Support: 0.5,
    Invade: 1,
    Farm: 3.5,
    Gank: 3,
    CC: 2.5,
    Smite: 4,
    Sweep: 4
  },
  azumarill: {
    Attack: 3,
    Endure: 3,
    Mobility: 2.5,
    Score: 2.5,
    Support: 0.5,
    Invade: 3,
    Farm: 3,
    Gank: 2.5,
    CC: 2.5,
    Smite: 1,
    Sweep: 1
  },
  blastoise: {
    Attack: 2,
    Endure: 3.5,
    Mobility: 2,
    Score: 2,
    Support: 3,
    Invade: 3,
    Farm: 3.5,
    Gank: 2.5,
    CC: 5,
    Smite: 3.5,
    Sweep: 3
  },
  blaziken: {
    Attack: 4,
    Endure: 2.5,
    Mobility: 4,
    Score: 1,
    Support: 0.5,
    Invade: 1.5,
    Farm: 3.5,
    Gank: 4,
    CC: 2.5,
    Smite: 5,
    Sweep: 2
  },
  blissey: {
    Attack: 1,
    Endure: 3.5,
    Mobility: 1.5,
    Score: 1.5,
    Support: 4.5,
    Invade: 2.5,
    Farm: 1.5,
    Gank: 0.5,
    CC: 0.5,
    Smite: 3,
    Sweep: 2.5
  },
  buzzwole: {
    Attack: 4,
    Endure: 3,
    Mobility: 2.5,
    Score: 2,
    Support: 2,
    Invade: 3,
    Farm: 3,
    Gank: 3.5,
    CC: 4.5,
    Smite: 2,
    Sweep: 0
  },
  ceruledge: {
    Attack: 4,
    Endure: 2.5,
    Mobility: 2.5,
    Score: 2,
    Support: 0.5,
    Invade: 1,
    Farm: 3.5,
    Gank: 3,
    CC: 2.5,
    Smite: 3,
    Sweep: 1.5
  },
  chandelure: {
    Attack: 5,
    Endure: 1,
    Mobility: 1,
    Score: 2,
    Support: 3,
    Invade: 1.5,
    Farm: 3.5,
    Gank: 2,
    CC: 2.5,
    Smite: 4,
    Sweep: 4
  },
  charizard: {
    Attack: 3.5,
    Endure: 3,
    Mobility: 2.5,
    Score: 3,
    Support: 0.5,
    Invade: 1,
    Farm: 2.5,
    Gank: 2.5,
    CC: 2,
    Smite: 2,
    Sweep: 3.5
  },
  megacharizardx: {
    Attack: 4,
    Endure: 3.5,
    Mobility: 2.5,
    Score: 3,
    Support: 0.5,
    Invade: 1,
    Farm: 2.5,
    Gank: 3,
    CC: 2,
    Smite: 2,
    Sweep: 1
  },
  cinderace: {
    Attack: 4,
    Endure: 1.5,
    Mobility: 3,
    Score: 2.5,
    Support: 0.5,
    Invade: 1,
    Farm: 4,
    Gank: 2.5,
    CC: 1,
    Smite: 5,
    Sweep: 3
  },
  clefable: {
    Attack: 2,
    Endure: 3,
    Mobility: 1.5,
    Score: 1.5,
    Support: 4.5,
    Invade: 2,
    Farm: 2.5,
    Gank: 0.5,
    CC: 3.5,
    Smite: 2,
    Sweep: 1
  },
  comfey: {
    Attack: 2,
    Endure: 2.5,
    Mobility: 3.5,
    Score: 2.5,
    Support: 5,
    Invade: 0,
    Farm: 1,
    Gank: 0,
    CC: 3,
    Smite: 0.5,
    Sweep: 3
  },
  cramorant: {
    Attack: 4,
    Endure: 3,
    Mobility: 3,
    Score: 1.5,
    Support: 1,
    Invade: 2.5,
    Farm: 4,
    Gank: 3,
    CC: 3.5,
    Smite: 2,
    Sweep: 3.5
  },
  crustle: {
    Attack: 1.5,
    Endure: 4,
    Mobility: 1.5,
    Score: 2,
    Support: 3,
    Invade: 3.5,
    Farm: 3.5,
    Gank: 4,
    CC: 3.5,
    Smite: 1.5,
    Sweep: 4
  },
  darkrai: {
    Attack: 4.5,
    Endure: 1.5,
    Mobility: 3,
    Score: 2,
    Support: 2,
    Invade: 2,
    Farm: 2.5,
    Gank: 3.5,
    CC: 4.5,
    Smite: 2,
    Sweep: 1
  },
  decidueye: {
    Attack: 3.5,
    Endure: 1.5,
    Mobility: 1.5,
    Score: 3.5,
    Support: 3.5,
    Invade: 0.5,
    Farm: 3.5,
    Gank: 2.5,
    CC: 2,
    Smite: 4,
    Sweep: 4.5
  },
  delphox: {
    Attack: 4,
    Endure: 1.5,
    Mobility: 3,
    Score: 2.5,
    Support: 0.5,
    Invade: 0.5,
    Farm: 3,
    Gank: 2,
    CC: 3.5,
    Smite: 3.5,
    Sweep: 4
  },
  dodrio: {
    Attack: 3,
    Endure: 2,
    Mobility: 4,
    Score: 4,
    Support: 0.5,
    Invade: 1.5,
    Farm: 4,
    Gank: 4,
    CC: 2,
    Smite: 2.5,
    Sweep: 2.5
  },
  dragapult: {
    Attack: 4,
    Endure: 1.5,
    Mobility: 4,
    Score: 2.5,
    Support: 0.5,
    Invade: 0.5,
    Farm: 3,
    Gank: 2,
    CC: 1.5,
    Smite: 2,
    Sweep: 3
  },
  dragonite: {
    Attack: 4,
    Endure: 2.5,
    Mobility: 2.5,
    Score: 3,
    Support: 0.5,
    Invade: 1,
    Farm: 3,
    Gank: 2.5,
    CC: 2.5,
    Smite: 5,
    Sweep: 0.5
  }, 
  duraludon: {
    Attack: 4.5,
    Endure: 2,
    Mobility: 2.5,
    Score: 2.5,
    Support: 1.5,
    Invade: 0,
    Farm: 2,
    Gank: 1,
    CC: 3.5,
    Smite: 2.5,
    Sweep: 1.5
  },  
  eldegoss: {
    Attack: 1.5,
    Endure: 2,
    Mobility: 2.5,
    Score: 2.5,
    Support: 4,
    Invade: 3,
    Farm: 1.5,
    Gank: 0.5,
    CC: 4,
    Smite: 2,
    Sweep: 4.5
  }, 
  empoleon: {
    Attack: 3.5,
    Endure: 3.5,
    Mobility: 2.5,
    Score: 2.5,
    Support: 1.5,
    Invade: 3,
    Farm: 4,
    Gank: 4,
    CC: 2,
    Smite: 3,
    Sweep: 1.5
  },
  espeon: {
    Attack: 4,
    Endure: 2,
    Mobility: 1.5,
    Score: 2,
    Support: 3,
    Invade: 1,
    Farm: 3,
    Gank: 3.5,
    CC: 4,
    Smite: 3.5,
    Sweep: 3
  },
  falinks: {
    Attack: 3.5,
    Endure: 4.5,
    Mobility: 2.5,
    Score: 2,
    Support: 1,
    Invade: 1.5,
    Farm: 4,
    Gank: 3,
    CC: 2.5,
    Smite: 4.5,
    Sweep: 1
  }, 
  garchomp: {
    Attack: 3.5,
    Endure: 3.5,
    Mobility: 2.5,
    Score: 2.5,
    Support: 0.5,
    Invade: 1,
    Farm: 3.5,
    Gank: 3.5,
    CC: 2,
    Smite: 2,
    Sweep: 1
  },
  gardevoir: {
    Attack: 4.5,
    Endure: 1.5,
    Mobility: 1.5,
    Score: 3,
    Support: 1.5,
    Invade: 0.5,
    Farm: 3.5,
    Gank: 3,
    CC: 2,
    Smite: 4,
    Sweep: 5
  },
  gengar: {
    Attack: 3.5,
    Endure: 2,
    Mobility: 4,
    Score: 3,
    Support: 0.5,
    Invade: 0.5,
    Farm: 4.5,
    Gank: 4.5,
    CC: 3,
    Smite: 3,
    Sweep: 2
  },
  glaceon: {
    Attack: 4,
    Endure: 2,
    Mobility: 3,
    Score: 1,
    Support: 0.5,
    Invade: 0.5,
    Farm: 3,
    Gank: 2.5,
    CC: 3,
    Smite: 2,
    Sweep: 1.5
  }, 
  goodra: {
    Attack: 2.5,
    Endure: 4,
    Mobility: 2.5,
    Score: 2.5,
    Support: 2,
    Invade: 3,
    Farm: 2.5,
    Gank: 2.5,
    CC: 4,
    Smite: 2,
    Sweep: 3
  }, 
  greedent: {
    Attack: 1.5,
    Endure: 5,
    Mobility: 2,
    Score: 1,
    Support: 3.5,
    Invade: 4,
    Farm: 2,
    Gank: 2,
    CC: 3.5,
    Smite: 3,
    Sweep: 3
  },
  greninja: {
    Attack: 4,
    Endure: 2,
    Mobility: 3,
    Score: 3,
    Support: 0.5,
    Invade: 0.5,
    Farm: 3,
    Gank: 3.5,
    CC: 2,
    Smite: 4,
    Sweep: 3.5
  },
  gyarados: {
    Attack: 4,
    Endure: 3,
    Mobility: 2.5,
    Score: 2,
    Support: 1,
    Invade: 0,
    Farm: 3,
    Gank: 4,
    CC: 3,
    Smite: 2.5,
    Sweep: 1.5
  },
  hooh: {
    Attack: 3,
    Endure: 4,
    Mobility: 2,
    Score: 1,
    Support: 3,
    Invade: 1.5,
    Farm: 2,
    Gank: 2,
    CC: 2,
    Smite: 1.5,
    Sweep: 4
  },
  hoopa: {
    Attack: 3,
    Endure: 2,
    Mobility: 3,
    Score: 2,
    Support: 3.5,
    Invade: 4,
    Farm: 2,
    Gank: 3,
    CC: 3,
    Smite: 2,
    Sweep: 3
  }, 
  inteleon: {
    Attack: 4.5,
    Endure: 1.5,
    Mobility: 3.5,
    Score: 1.5,
    Support: 0.5,
    Invade: 1,
    Farm: 3,
    Gank: 2.5,
    CC: 2,
    Smite: 4,
    Sweep: 4.5
  }, 
  lapras: {
    Attack: 3,
    Endure: 3.5,
    Mobility: 2,
    Score: 2,
    Support: 3,
    Invade: 2.5,
    Farm: 3,
    Gank: 2.5,
    CC: 4.5,
    Smite: 2,
    Sweep: 3.5
  },
  latias: {
    Attack: 3.5,
    Endure: 2.5,
    Mobility: 4,
    Score: 2.5,
    Support: 3,
    Invade: 1.5,
    Farm: 2.5,
    Gank: 2,
    CC: 3.5,
    Smite: 2.5,
    Sweep: 1.5
  },
  latios: {
    Attack: 4,
    Endure: 1.5,
    Mobility: 4,
    Score: 2.5,
    Support: 0.5,
    Invade: 1,
    Farm: 3,
    Gank: 3,
    CC: 2,
    Smite: 3,
    Sweep: 4
  },
  leafeon: {
    Attack: 3.5,
    Endure: 1.5,
    Mobility: 2.5,
    Score: 2.5,
    Support: 2.5,
    Invade: 3,
    Farm: 4.5,
    Gank: 5,
    CC: 2.5,
    Smite: 3.5,
    Sweep: 2
  },
  lucario: {
    Attack: 3,
    Endure: 2.5,
    Mobility: 3.5,
    Score: 3,
    Support: 0.5,
    Invade: 2,
    Farm: 3,
    Gank: 3.5,
    CC: 3,
    Smite: 3.5,
    Sweep: 1.5
  },
  megalucario: {
    Attack: 4.5,
    Endure: 2,
    Mobility: 3.5,
    Score: 3,
    Support: 0.5,
    Invade: 2,
    Farm: 4,
    Gank: 3,
    CC: 2.5,
    Smite: 4,
    Sweep: 1.5
  },
  machamp: {
    Attack: 4,
    Endure: 2.5,
    Mobility: 2.5,
    Score: 2.5,
    Support: 1,
    Invade: 2,
    Farm: 4,
    Gank: 3.5,
    CC: 3,
    Smite: 3,
    Sweep: 1.5
  },
  mamoswine: {
    Attack: 2.5,
    Endure: 4,
    Mobility: 2,
    Score: 1.5,
    Support: 2.5,
    Invade: 3.5,
    Farm: 3.5,
    Gank: 3,
    CC: 4.5,
    Smite: 1.5,
    Sweep: 1
  },
  meowscara: {
    Attack: 4.5,
    Endure: 1,
    Mobility: 3,
    Score: 2.5,
    Support: 0.5,
    Invade: 2,
    Farm: 4,
    Gank: 3,
    CC: 2,
    Smite: 3,
    Sweep: 1.5
  },
  metagross: {
    Attack: 3.5,
    Endure: 4,
    Mobility: 2.5,
    Score: 1,
    Support: 1,
    Invade: 1,
    Farm: 3,
    Gank: 3.5,
    CC: 3,
    Smite: 2.5,
    Sweep: 1.5
  },
  mew: {
    Attack: 4,
    Endure: 2,
    Mobility: 3,
    Score: 2,
    Support: 3,
    Invade: 2,
    Farm: 3,
    Gank: 3,
    CC: 2,
    Smite: 4,
    Sweep: 5
  },
  mewtwox: {
    Attack: 3,
    Endure: 3,
    Mobility: 2.5,
    Score: 2,
    Support: 2,
    Invade: 1,
    Farm: 2,
    Gank: 3,
    CC: 2,
    Smite: 1.5,
    Sweep: 4
  },
  mewtwoy: {
    Attack: 4,
    Endure: 2,
    Mobility: 3,
    Score: 2,
    Support: 2,
    Invade: 2,
    Farm: 2,
    Gank: 3,
    CC: 3,
    Smite: 1.5,
    Sweep: 4
  },
  mimikyu: {
    Attack: 4,
    Endure: 2.5,
    Mobility: 3.5,
    Score: 1,
    Support: 1,
    Invade: 1.5,
    Farm: 4,
    Gank: 3.5,
    CC: 3.5,
    Smite: 2,
    Sweep: 4.5
  },
  miraidon: {
    Attack: 4,
    Endure: 1.5,
    Mobility: 4,
    Score: 2,
    Support: 2,
    Invade: 0.5,
    Farm: 3,
    Gank: 3,
    CC: 2,
    Smite: 3,
    Sweep: 4
  },
  mrmime: {
    Attack: 1.5,
    Endure: 4,
    Mobility: 1,
    Score: 1.5,
    Support: 4,
    Invade: 3.5,
    Farm: 3,
    Gank: 2.5,
    CC: 5,
    Smite: 3,
    Sweep: 3.5
  },
  ninetales: {
    Attack: 4,
    Endure: 1.5,
    Mobility: 1.5,
    Score: 2.5,
    Support: 3,
    Invade: 2.5,
    Farm: 4,
    Gank: 2,
    CC: 4,
    Smite: 4,
    Sweep: 3.5
  },
  pawmot: {
    Attack: 3.5,
    Endure: 2,
    Mobility: 3,
    Score: 2,
    Support: 2,
    Invade: 0.5,
    Farm: 3,
    Gank: 3,
    CC: 2.5,
    Smite: 3,
    Sweep: 1
  },
  pikachu: {
    Attack: 4.5,
    Endure: 1.5,
    Mobility: 2.5,
    Score: 2,
    Support: 1.5,
    Invade: 1,
    Farm: 3,
    Gank: 3,
    CC: 4,
    Smite: 3.5,
    Sweep: 4.5
  },
  psyduck: {
    Attack: 4,
    Endure: 1,
    Mobility: 2,
    Score: 1,
    Support: 3,
    Invade: 3,
    Farm: 2.5,
    Gank: 3,
    CC: 3.5,
    Smite: 2,
    Sweep: 3
  },
  raichu: {
    Attack: 4,
    Endure: 1.5,
    Mobility: 3.5,
    Score: 3,
    Support: 1,
    Invade: 0.5,
    Farm: 4,
    Gank: 3,
    CC: 3,
    Smite: 4,
    Sweep: 4
  },
  rapidash: {
    Attack: 4,
    Endure: 4,
    Mobility: 4,
    Score: 2,
    Support: 1,
    Invade: 0.5,
    Farm: 3,
    Gank: 2.5,
    CC: 3,
    Smite: 1.5,
    Sweep: 1.5
  },
  sableye: {
    Attack: 1,
    Endure: 2.5,
    Mobility: 2.5,
    Score: 3.5,
    Support: 3.5,
    Invade: 5,
    Farm: 1.5,
    Gank: 1.5,
    CC: 3,
    Smite: 2,
    Sweep: 4
  },
  scizor: {
    Attack: 4,
    Endure: 2.5,
    Mobility: 4,
    Score: 2,
    Support: 1,
    Invade: 0.5,
    Farm: 3.5,
    Gank: 3,
    CC: 3,
    Smite: 3,
    Sweep: 1.5
  },
  scyther: {
    Attack: 4,
    Endure: 2.5,
    Mobility: 4,
    Score: 2,
    Support: 1,
    Invade: 1,
    Farm: 3.5,
    Gank: 3,
    CC: 3,
    Smite: 3,
    Sweep: 2
  },
  slowbro: {
    Attack: 1.5,
    Endure: 4,
    Mobility: 1.5,
    Score: 1.5,
    Support: 4,
    Invade: 2,
    Farm: 3,
    Gank: 3,
    CC: 4.5,
    Smite: 1.5,
    Sweep: 2.5
  },
  snorlax: {
    Attack: 1.5,
    Endure: 5,
    Mobility: 2,
    Score: 1.5,
    Support: 2.5,
    Invade: 4.5,
    Farm: 3,
    Gank: 2.5,
    CC: 4,
    Smite: 3,
    Sweep: 3.5
  },
  suicune: {
    Attack: 5,
    Endure: 2.5,
    Mobility: 2.5,
    Score: 2,
    Support: 2,
    Invade: 2,
    Farm: 3,
    Gank: 3.5,
    CC: 4.5,
    Smite: 2.5,
    Sweep: 3
  },
  sylveon: {
    Attack: 3.5,
    Endure: 1.5,
    Mobility: 1.5,
    Score: 3.5,
    Support: 3.5,
    Invade: 1,
    Farm: 3,
    Gank: 3,
    CC: 2.5,
    Smite: 1.5,
    Sweep: 1.5
  },
  talonflame: {
    Attack: 2.5,
    Endure: 1.5,
    Mobility: 5,
    Score: 3.5,
    Support: 0.5,
    Invade: 2,
    Farm: 4,
    Gank: 4,
    CC: 2.5,
    Smite: 4.5,
    Sweep: 3
  },
  tinkaton: {
    Attack: 4,
    Endure: 3.5,
    Mobility: 2.5,
    Score: 2,
    Support: 1,
    Invade: 1,
    Farm: 3.5,
    Gank: 3,
    CC: 4,
    Smite: 4,
    Sweep: 1.5
  },
  trevenant: {
    Attack: 2,
    Endure: 4,
    Mobility: 2,
    Score: 2.5,
    Support: 2.5,
    Invade: 2,
    Farm: 3,
    Gank: 3.5,
    CC: 4,
    Smite: 2,
    Sweep: 2.5
  },
  tsareena: {
    Attack: 3.5,
    Endure: 3,
    Mobility: 3,
    Score: 1.5,
    Support: 0.5,
    Invade: 2,
    Farm: 3.5,
    Gank: 4,
    CC: 3,
    Smite: 2.5,
    Sweep: 1.5
  },
  tyranitar: {
    Attack: 4,
    Endure: 4,
    Mobility: 2,
    Score: 1.5,
    Support: 1,
    Invade: 0,
    Farm: 3,
    Gank: 2,
    CC: 1,
    Smite: 3,
    Sweep: 1
  },
  umbreon: {
    Attack: 1.5,
    Endure: 4,
    Mobility: 1.5,
    Score: 1.5,
    Support: 4,
    Invade: 2,
    Farm: 1,
    Gank: 1,
    CC: 5,
    Smite: 2,
    Sweep: 2.5
  },
  urshifu: {
    Attack: 4.5,
    Endure: 3,
    Mobility: 2.5,
    Score: 2.5,
    Support: 1,
    Invade: 0,
    Farm: 3,
    Gank: 4,
    CC: 3.5,
    Smite: 5,
    Sweep: 1
  },
  venusaur: {
    Attack: 4.5,
    Endure: 2,
    Mobility: 2,
    Score: 2.5,
    Support: 1,
    Invade: 0.5,
    Farm: 4,
    Gank: 2,
    CC: 2,
    Smite: 4,
    Sweep: 4
  },
  wigglytuff: {
    Attack: 1,
    Endure: 2.5,
    Mobility: 2.5,
    Score: 2,
    Support: 4.5,
    Invade: 3,
    Farm: 2,
    Gank: 1.5,
    CC: 4.5,
    Smite: 2,
    Sweep: 3
  },
  zacian: {
    Attack: 5,
    Endure: 4,
    Mobility: 3,
    Score: 1,
    Support: 2,
    Invade: 0,
    Farm: 4.5,
    Gank: 3,
    CC: 2.5,
    Smite: 5,
    Sweep: 0.5
  },
  zeraora: {
    Attack: 3.5,
    Endure: 1.5,
    Mobility: 4,
    Score: 3,
    Support: 0.5,
    Invade: 1.5,
    Farm: 4,
    Gank: 4,
    CC: 3,
    Smite: 3.5,
    Sweep: 3
  },
  zoroark: {
    Attack: 3.5,
    Endure: 1.5,
    Mobility: 4,
    Score: 2,
    Support: 0.5,
    Invade: 0,
    Farm: 3.5,
    Gank: 4,
    CC: 1.5,
    Smite: 4,
    Sweep: 2.5
  },
}
const skillDamage = {
 "absol": {
  "passive": {
      name: "Super Luck",
      description: "Increases the Pokémon's critical-hit rate.",
      buff: {
        CritRate: 15
      },
      formulas: [
        {
          label: "Critical Rate Bonus",
          additionalText: "+15% Critical Rate",
          type: "text-only"
        }
      ]
    },
	"atkboosted": {
	  name: "Basic Attack",
      debuffs: {
        DEF: 15
      },
      debuffLabels: {
        DEF: "(DEBUFF) DEF Reduction"
      },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 0.51 * ATK + 5 * (Level - 1) + 100,
          type: "physical"
        },
        {
          label: "Damage - Single Target Bonus",
          formula: (ATK, Level) => 0.375 * ATK + 1 * (Level - 1) + 20,
          type: "physical"
        }
      ]
	},
    "s11": {
      name: "Psycho Cut",
      cooldown: 7,
      debuffs: {
        Speed: 90
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buff: {
        CritRate: 15
      },
      buffPlus: {
        levelRequired: 13,
        buffs: {
          Speed: "20%"
        },
      },
      formulas: [
        {
          label: "Damage - Initial Hit",
          formula: (ATK, Level) => 0.50 * ATK + 1 * (Level - 1) + 65,
          type: "physical"
        },
        {
          label: "Damage - First 2 markers",
          formula: (ATK, Level) => 0.60 * ATK + 4 * (Level - 1) + 40,
          type: "physical"
        },
        {
          label: "Damage - Last Marker",
          formula: (ATK, Level) => 0.90 * ATK + 6 * (Level - 1) + 60,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Pursuit",
      cooldown: 5.5,
      buff: {
      },
      selfBuff: {
        CooldownPercent: 70
      },
      buffPlus: {
        levelRequired: 11,
        buffs: {
          Speed: "35%"
        },
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.32 * ATK + 13 * (Level - 1) + 264,
          type: "physical"
        },
        {
          label: "Damage Backstab",
          formula: (ATK, Level) => 1.98 * ATK + 19 * (Level - 1) + 396,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Night Slash",
      cooldown: 5.5,
        buff: {
          AtkSPD: 60,
          CritRate: 30,
        },
        buffPlus: {
        levelRequired: 11,
        buffs: {
          HPRegen: 50
        },
      },
      formulas: [
        {
          label: "Damage First Hit",
          formula: (ATK, Level) => 0.69 * ATK + 6 * (Level - 1) + 140,
          type: "physical"
        },
        {
          label: "Damage Second Hit",
          formula: (ATK, Level) => 1.03 * ATK + 9 * (Level - 1) + 210,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Sucker Punch",
      cooldown: 5,
      debuffs: {
        Speed: 50
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buff: {
        Speed: "-50%",
      },
      effects: ["Unstoppable"],
      buffPlus: {
        levelRequired: 13,
        buffs: {
          AtkSPD: 40
        },
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.05 * ATK + 6 * (Level - 1) + 165,
          type: "physical"
        },
        {
          label: "Damage Interrupted Attack",
          formula: (ATK, Level) => 1.56 * ATK + 10 * (Level - 1) + 250,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Midnight Slash",
    cooldown: 100,
      buff: {
      },
      buffPlus: {
        levelRequired: 9,
        effects: ["Unstoppable"],
        buffs: {
          Speed: "80%",
          Shield: 20
        }
      },
		formulas: [
        {
          label: "Damage - Full (6 Hits)",
          formula: (ATK, Level) => 0.91 * ATK + 4 * (Level - 1) + 200,
          type: "physical"
        },
        {
          label: "Damage - Reduced (up to 3 Hits)",
          formula: (firstHitDamage, Level) => 0.3 * firstHitDamage,
		      type: "dependent",
		      dependsOn: 0
        },
	]
	}
  },

   "aegislash": {
      "passive": {
      name: "Stance Change - Sword Forme",
      description: "Switches to Sword Forme when using blade moves, boosting Attack, movement speed, and attack speed.",
      buff: {
        Speed: "5%",
        AtkSPD: "15%"

      },
      formulas: [
        {
          label: "Attack - Increase (Sword Stance)",
          formula: (ATK, level) => 0 * ATK + 15 * (level - 1) + 40,
          type: "physical",
          affects: "ATK"
        },
      ]
    },
    "passive1": {
    name: "Stance Change - Shield Forme",
    description: "Switches to Shield Forme when using shield moves, boosting defenses but reducing attack speed.",
    buff: {
      AtkSPD: "-20%"
    },
    formulas: [
        {
          label: "Defense - Increase (Shield Stance)",
          formula: (ATK, level) => 0 * ATK + 25 * (level - 1) + 80,
          type: "physical",
          affects: "DEF"
        },
        {
          label: "Special Defense - Increase (Shield Stance)",
          formula: (ATK, level) => 0 * ATK + 20 * (level - 1) + 40,
          type: "physical",
          affects: "SPDEF"
        }
    ]
  },

  "passive2": {
    name: "Stance Change - Switch",
    description: "Switching stances grants 15% increased movement and attack speed for 3.5s.",
    buff: {
      AtkSPD: "15%",
      Speed: "15%"
    },
    formulas: [
    ]
  },

	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (Shield Stance)",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Healing - Boosted (Shield Stance)",
          formula: (ATK, Level) => 1.5 * ATK + 12 * (Level - 1) + 72,
          type: "ATK",
        },
		    {
          label: "Damage - Boosted (Sword Stance)",
          formula: (ATK, Level) => 1.35 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (Additional) (Sword Stance)",
          type: "text-only",
          additionalText: "8.5% of the enemies Max HP as damage."
        }
      ]
	},

    "s11": {
      name: "Sacred Sword",
      cooldown: 6.5,
      buff: {
        DEFPen: 25
      },
      buffPlus: {
        levelRequired: 11,
        buffs: {
          ATK: 50
        }
      },
      formulas: [
        {
          label: "Damage - Triangle Attack",
          formula: (ATK, Level) => 0.96 * ATK + 3 * (Level - 1) + 120,
          type: "physical"
        },
        {
          label: "Damage - Slash Attack",
          formula: (ATK, Level) => 1.92 * ATK + 6 * (Level - 1) + 240,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Shadow Claw",
      cooldown: 5.5,
      buff: {
      },
      buffPlus: {
        levelRequired: 11,
        buffs: {
          CritRate: 20
        }
      },
      formulas: [
        {
          label: "Damage - First 2 Hits Damage",
          formula: (ATK, Level) => 0.68 * ATK + 3 * (Level - 1) + 70,
          type: "physical"
        },
        {
          label: "Damage - Third Hit",
          formula: (ATK, Level) => 1.36 * ATK + 6 * (Level - 1) + 140,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Wide Guard",
      cooldown: 8.5,
      buff:{
      },
      effects: ["Unstoppable"],
      debuffs: {
        Speed: 45
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      selfBuffPlus: {
        levelRequired: 13,
        buffs: {
          CooldownFlat: 1
        }
      },
      formulas: [
        {
          label: "Shield",
          formula: (ATK, Level) => 1.7 * ATK + 0 * (Level - 1) + 340,
          type: "physical"
        },
        {
          label: "Shield - Additional",
          formula: (HP) => 0.085 * HP,
          type: "hp"
        }
      ]
    },
    "s22": {
      name: "Iron Head",
      cooldown: 6,
      buff: {
      },
      selfBuff: {
        CooldownFlat: 3
      },
      buffPlus: {
        levelRequired: 13,
        buffs: {
          ATK: "10%"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.18 * ATK + 5 * (Level - 1) + 130,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Coup de Grace",
    cooldown: 100,
      buff: {
      },
      buffPlus: {
        levelRequired: 9,
        effects: ["Unstoppable"],
        buffs: {
          Speed: "30%",
          CDR: 30,
          Shield: 20
        }
      },
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.82 * ATK + 13 * (Level - 1) + 640,
          type: "physical"
        },
        {
          label: "Additional Damage",
          type: "text-only",
          additionalText: "12% of opponent's missing HP as additional damage"
        }
	]
	}
  },

    "armarouge": {
    "passive": {
          name: "Flash Fire",
          description: "Reduces Sp. Atk damage taken by 20% for 3s and empowers next basic attack. Cooldown: 10s.",
          buff: {
            DmgTaken: "20%"
          },
          formulas: [
            {
              label: "Damage",
              formula: (ATK, level) => 0.6 * ATK + 0 * (level - 1) + 120,
              type: "physical",
              affects: "nextBasicAttack"
            }
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (SPATK, Level) => 0.30 * SPATK + 5 * (Level - 1) + 150,
          type: "special"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.40 * SPATK + 5 * (Level - 1) + 220,
          type: "special"
        },
        {
          label: "Additional Damage - marked enemys",
          type: "text-only",
          additionalText: "10% of opponent's max HP as additional damage"
        }
      ]
	},

    "s11": {
      name: "Fire Spin",
      cooldown: 8,
      buff: {
        Speed: "30%"
      },
      formulas: [
        {
          label: "Damage - per Tick",
          formula: (SPATK, Level) => 0.252 * SPATK + 2 * (Level - 1) + 115,
          type: "special"
        },
        {
          label: "Shield (up to 6 total)",
          formula: (SPATK, Level) => 0.18 * SPATK + 0 * (Level - 1) + 22,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Armor Cannon",
      cooldown: 7,
      buff: {
        DEF: "-5%",
        SpDEF: "-5%"
      },
      formulas: [
        {
          label: "Damage - Explosion",
          formula: (SPATK, Level) => 2.142 * SPATK + 13 * (Level - 1) + 405,
          type: "special"
        },
        {
          label: "Damage - Shockwave",
          formula: (SPATK, Level) => 0.648 * SPATK + 4 * (Level - 1) + 121,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Flame Charge",
      cooldown: 8,
      buff:{},
      selfBuff: {
        CooldownPercent: 20
      },
      buffPlus:{
        levelRequired: 13,
        buffs: {
          DmgTaken: 20
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.65 * SPATK + 8 * (Level - 1) + 300,
          type: "special"
        },
		{
          label: "Shield",
          formula: (SPATK, Level) => 1.2 * SPATK + 0 * (Level - 1) + 150,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Psychock",
      cooldown: 7,
      buff: {
        SpDEFPen: 35
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.63 * SPATK + 8 * (Level - 1) + 360,
          type: "special"
        }
      ]
    },
	"ult": {
		name: "Psykaboom",
    cooldown: 112,
      buff: {
      },
      buffPlus: {
        levelRequired: 9,
        effects: ["Unstoppable", "Stun"],
        buffs: {
          Speed: "30%",
          CDR: 30,
          Shield: 20
        }
      },
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 2.5 * SPATK + 16 * (Level - 1) + 600,
          type: "special"
        }
	]
	}
  },

    "alcremie": {
      "passive": {
          name: "Aroma Veil",
          description: "Cleanses hindrances from allies (and itself) under its buffs/shields, and its Sweet Gauge empowers and resets its Recover and Decorate moves when full.",
          buff: {
            HindRed: "100%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (SPATK, Level) => 0.45 * SPATK + 7 * (Level - 1) + 135,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Recover",
      cooldown: 7,
      conditionalBuffs: {
        notFull: {
          Speed: "15%",
        },
        full: {
          Speed: "40%",
        }
      },
      formulas: [
        {
          label: "Healing - Basic",
          formula: (attribute, Level) => 2.6 * attribute + 16 * (Level - 1) + 330,
          type: "heal",
          healAttribute: "SpATK"
        },
        {
          label: "Healing - Empowered",
          formula: (attribute, Level) => 3.9 * attribute + 24 * (Level - 1) + 495,
          type: "heal",
          healAttribute: "SpATK"
        },
		{
          label: "Additional Healing (Ally Snorlax) - Basic",
          formula: (attribute, Level) => 0.192 * attribute + 1 * (Level - 1) + 24,
          type: "heal",
          healAttribute: "SpATK"
        },
		{
          label: "Additional Healing (Ally Snorlax) - Empowered",
          formula: (attribute, Level) => 0.288 * attribute + 2 * (Level - 1) + 36,
          type: "heal",
          healAttribute: "SpATK"
        },
      ]
    },
    "s12": {
      name: "Sweet Scent",
      cooldown: 8,
      buff:{},
      debuffs: {
        Speed: 30
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage - Explosion",
          formula: (SPATK, Level) => 0.74 * SPATK + 9 * (Level - 1) + 246,
          type: "special"
        },
        {
          label: "Damage - Outer Ring",
          formula: (SPATK, Level) => 1.05 * SPATK + 12 * (Level - 1) + 345,
          type: "special"
        },
        {
          label: "Outer Ring Area",
          type: "text-only",
          additionalText: "100% slow who touch the ring for 0.5s"
        }
      ]
    },
    "s21": {
      name: "Decorate",
      cooldown: 8.5,
      buff: {
      },
      formulas: [
        {
          label: "Shield",
          formula: (SPATK, Level) => 1.28 * SPATK + 16 * (Level - 1) + 400,
          type: "shield"
        },
		{
          label: "Additional Damage",
          formula: (SPATK, Level) => 0 * SPATK + 14 * (Level - 1) + 40,
          type: "special"
        },
		{
          label: "Additional Damage - Empowered",
          formula: (SPATK, Level) => 0 * SPATK + 17 * (Level - 1) + 50,
          type: "special"
        },
		{
          label: "Shield Skill Plus",
          formula: (SPATK, Level) => 1.52 * SPATK + 20 * (Level - 1) + 480,
          type: "shield"
        },
      ]
    },
    "s22": {
      name: "Dazzling Gleam",
      cooldown: 6,
      buff:{
        Speed: "-20%"
      },
      effects: ["Stun"],
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.51 * SPATK + 17 * (Level - 1) + 340,
          type: "special"
        },
		{
          label: "Damage Skill Plus",
          formula: (SPATK, Level) => 1.80 * SPATK + 21 * (Level - 1) + 410,
          type: "special"
        }
      ]
    },
	"ult": {
		name: "Fluffy Cream Supreme",
    cooldown: 100,
      buff: {
      },
      buffPlus: {
        levelRequired: 8,
        effects: ["Unstoppable"],
        buffs: {
          Speed: "40%",
          CDR: 30,
          Shield: 90
        }
      },
		formulas: [
        {
          label: "Healing - per Cream (48 max)",
          formula: (attribute, Level) => 0.19 * attribute + 3 * (Level - 1) + 45,
          type: "heal",
          healAttribute: "SpATK"
        },
		{
          label: "Max HP Increase - per Cream (48 max)",
          formula: (SPATK, Level) => 0 * SPATK + 10 * (Level - 1) + 0,
          type: "special"
        },
	]
	}
  },

    "azumarill": {
      "passive": {
          name: "Huge Power",
          description: "Always crits on single targets, but never on multiple targets. Critical hits deal increased damage at 170% instead of 200%.",
          buff: {
            CritDmg: 170
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.25 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Play Rough",
      cooldown: 5,
      effects: ["Stun"],
      buff: {
        Speed: "30%"
      },
      buffPlus: {
        levelRequired: 12,
        buffs: {
          Speed: "5%",
          CooldownFlat: 1
        }
      },
      formulas: [
        {
          label: "Damage - per Hit (3 hits)",
          formula: (ATK, Level) => 0.39 * ATK + 4 * (Level - 1) + 60,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Water Pulse",
      cooldown: 5,
      debuffs: {
        Speed: 40
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 0.87 * ATK + 7 * (Level - 1) + 120,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Whirlpool",
      cooldown: 9,
      buff:{},
      selfBuffPlus: {
        levelRequired: 10,
        buffs: {
          CooldownFlat: 2
        }
      },
      formulas: [
        {
          label: "Damage - per Hit",
          formula: (ATK, Level) => 0.34 * ATK + 2 * (Level - 1) + 60,
          type: "physical"
        },
		{
          label: "Healing - per Hit (Against Wilds)",
          formula: (ATK, Level) => 0.06 * ATK + 0 * (Level - 1) + 10,
          type: "physical"
        },
		{
          label: "Healing - per Hit (Against Players)",
          formula: (ATK, Level) => 0.18 * ATK + 0 * (Level - 1) + 30,
          type: "physical"
        },
		{
          label: "Healing - per Hit (Against Wilds) Skill Plus",
          formula: (ATK, Level) => 0.08 * ATK + 0 * (Level - 1) + 15,
          type: "physical"
        },
		{
          label: "Healing -per Hit (Against Players) Skill Plus",
          formula: (ATK, Level) => 0.24 * ATK + 0 * (Level - 1) + 45,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Aqua Tail",
      cooldown: 7,
      buff:{
        AtkSPD: 20
      },
      buffPlus: {
        levelRequired: 10,
        buffs: {
          CDR: 0.8
        }
      },
      formulas: [
        {
          label: "Damage - Basic (Close Range)",
          formula: (ATK, Level) => 0.68 * ATK + 2 * (Level - 1) + 50,
          type: "physical"
        },
		{
          label: "Damage - Basic (Long Range)",
          formula: (ATK, Level) => 1.224 * ATK + 3 * (Level - 1) + 90,
          type: "physical"
        },
		{
          label: "Damage - Boosted (Close Range)",
          formula: (ATK, Level) => 1.36 * ATK + 4 * (Level - 1) + 100,
          type: "physical"
        },
		{
          label: "Damage - Boosted (Long Range)",
          formula: (ATK, Level) => 2.448 * ATK + 6 * (Level - 1) + 180,
          type: "physical"
        },
		{
          label: "Healing",
          formula: (ATK, Level) => 1.10 * ATK + 0 * (Level - 1) + 220,
          type: "physical"
        },
      ]
    },
	"ult": {
		name: "Belly Bash",
    cooldown: 89,
      buff:{
      },
      buffPlus: {
        levelRequired: 8,
        effects: ["Unstoppable"],
        buffs: {
          HP: "-5%",
          ATK: 60,
          Speed: 30,
          CDR: 30,
          Shield: 26.5
        }
      },
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.08 * ATK + 9 * (Level - 1) + 260,
          type: "physical"
        },
		{
          label: "Attack - Increase",
          formula: (ATK, Level) => 0 * ATK + 5 * (Level - 1) + 60,
          type: "physical"
        },
	]
	}
  },

  "blastoise": {
      "passive": {
          name: "Torrent",
          description: "While at 50% max HP or below: increases Attack and Sp. Atk by 20%.",
          buff: {
            ATK: "20%",
            SpATK: "20%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff:{
      FlatCDR: 1
    },
    debuffs: {
      Speed: 50
    },
    debuffLabels: {
      Speed: "(DEBUFF) MoveSpeed Reduction"
    },
      formulas: [
        {
          label: "Damage - Basic/Rapid Spin Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Basic [Fully Evolved] (2x)",
          formula: (ATK, Level) => 0.5 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted/Rapid Spin Boosted (3x)",
          formula: (SPATK, Level) => 0.24 * SPATK + 6 * (Level - 1) + 110,
          type: "special"
        },
      ]
	},

    "s11": {
      name: "Water Spout",
      cooldown: 7.5,
      buff: {
        Speed: "30%"
      },
      debuffs: {
        Speed: 20
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction",
      },
      formulas: [
        {
          label: "Damage - Area (6 Hits)",
          formula: (SPATK, Level) => 0.31 * SPATK + 4 * (Level - 1) + 107,
          type: "special"
        },
        {
          label: "Damage - Area (17 Hits) During Rapid Spin",
          formula: (SPATK, Level) => 0.31 * SPATK + 4 * (Level - 1) + 107,
          type: "special"
        },
		{
          label: "Damage - Area (6 Hits) Skill Plus",
          formula: (SPATK, Level) => 0.36 * SPATK + 4 * (Level - 1) + 125,
          type: "special"
        },
		{
          label: "Damage - Area (17 Hits) During Rapid Spin Skill Plus",
          formula: (SPATK, Level) => 0.36 * SPATK + 4 * (Level - 1) + 125,
          type: "special"
        },
      ]
    },
    "s12": {
      name: "Hydro Pump",
      cooldown: 6,
      effects: ["Stun"],
      buff: {
        Speed: "30%"
      },
      formulas: [
        {
          label: "Damage (3 Hits)",
          formula: (SPATK, Level) => 0.39 * SPATK + 8 * (Level - 1) + 280,
          type: "special"
        },
        {
          label: "Damage - During Rapid Spin",
          formula: (SPATK, Level) => 0.78 * SPATK + 16 * (Level - 1) + 560,
          type: "special"
        },
		{
          label: "Damage (3 Hits) Skill Plus",
          formula: (SPATK, Level) => 0.49 * SPATK + 9 * (Level - 1) + 330,
          type: "special"
        },
		{
          label: "Damage - During Rapid Spin Skill Plus",
          formula: (SPATK, Level) => 1 * SPATK + 17 * (Level - 1) + 665,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Surf",
      cooldown: 7.5,
      effects: ["Unstoppable"],
      buff:{
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.25 * SPATK + 18 * (Level - 1) + 800,
          type: "special"
        },
		{
          label: "Shield Skill Plus",
          formula: (SPATK, Level) => 2.43 * SPATK + 14 * (Level - 1) + 243,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Rapid Spin",
      cooldown: 10,
      buff: {},
      formulas: [
        {
          label: "Damage (10 hits)",
          formula: (SPATK, Level) => 0.21 * SPATK + 3 * (Level - 1) + 140,
          type: "special"
        },
		{
          label: "Defense & Sp. Defense Skill Plus",
          formula: (SPATK, Level) => 0 * SPATK + 17 * (Level - 1) + 500,
          type: "special"
        }
      ]
    },
	"ult": {
		name: "Hydro Typhoon",
    cooldown: 89,
      buff: {
      },
      buffPlus: {
        levelRequired: 9,
        effects: ["Unstoppable"],
        buffs: { 
          Speed: "30%",
          Shield: 40
        }
      },
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.64 * SPATK + 22 * (Level - 1) + 1040,
          type: "special"
        },
		{
          label: "Shield",
          formula: (SPATK, Level) => 3.60 * SPATK + 0 * (Level - 1) + 180,
          type: "special"
        }
	]
	}
  },

    "blaziken": {
      "passive": {
          name: "Blaze",
          description: "Applying 5 Fire Fragment stacks to an enemy triggers bonus damage and HP steal. The HP restoration is increased when the user's HP is at half or below.",
          buff: {
          },
          formulas: [
          {
            label: "Damage",
            formula: (ATK, Level) => 1.2 * ATK + 0 * (Level - 1) + 0,
            type: "physical"
          },
          {
            label: "Healing",
            formula: (HP) => 0.10 * HP,
            type: "hp"
          },
          {
            label: "Healing (at or below 50% HP)",
            formula: (HP) => 0.15 * HP,
            type: "hp"
          },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff: {
      AtkSPD: 40
    },
      formulas: [
        {
          label: "Damage - Punch Style",
          formula: (ATK, Level) => 1.1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Kick Style",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Fire Punch",
      cooldown: 6,
      buff: {},
      formulas: [
        {
          label: "Damage - Per Punch (2x)",
          formula: (ATK, Level) => 0.63 * ATK + 4 * (Level - 1) + 114,
          type: "physical"
        },
		{
          label: "Damage - Per Punch (2x) Skill Plus",
          formula: (ATK, Level) => 0.74 * ATK + 5 * (Level - 1) + 138,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Overheat",
      cooldown: 7.5,
      effects: ["Unstoppable"],
      buff:{
        DmgTaken: 25
      },
      formulas: [
        {
          label: "Damage - Low Charge",
          formula: (ATK, Level) => 0.988 * ATK + 5 * (Level - 1) + 186,
          type: "physical"
        },
		{
          label: "Damage - Mid Charge",
          formula: (ATK, Level) => 2.01 * ATK + 9 * (Level - 1) + 371,
          type: "physical"
        },
		{
          label: "Damage - High Charge",
          formula: (ATK, Level) => 3.995 * ATK + 18 * (Level - 1) + 742,
          type: "physical"
        },
		{
          label: "Damage - High Charge Skill Plus",
          formula: (ATK, Level) => 1.085 * ATK + 6 * (Level - 1) + 215,
          type: "physical"
        },
		{
          label: "Damage - Mid Charge Skill Plus",
          formula: (ATK, Level) => 2.21 * ATK + 10 * (Level - 1) + 409,
          type: "physical"
        },
		{
          label: "Damage - High Charge Skill Plus",
          formula: (ATK, Level) => 4.385 * ATK + 20 * (Level - 1) + 818,
          type: "physical"
        },
      ]
    },
    "s21": {
      name: "Focus Blast",
      cooldown: 8,
      buff: {},
      debuffs: {
        Speed: 35
      },
      debuffLabels:{
        Speed: "(DEBUFF) MoveSpeed Reduction",
      },
      buffPlus:{
       levelRequired: 13,
        debuffs: {
          Speed: 25
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.94 * ATK + 10 * (Level - 1) + 440,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Blaze Kick",
      cooldown: 9.5,
      effects: ["Unstoppable", "Stun"],
      buff: {},
      debuffs: {
        Speed: 30
      },
      debuffLabels:{
        Speed: "(DEBUFF) MoveSpeed Reduction",
      },
      buffPlus:{
       levelRequired: 13,
        debuffs: {
          Speed: 25,
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.44 * ATK + 7 * (Level - 1) + 330,
          type: "physical"
        },
      ]
    },
	"ult": {
		name: "Spinning Flame Fist",
    cooldown: 4.7,
      buff: {
      },
      buffPlus:{
       levelRequired: 8,
        buffs: {
          Shield: 9,
          Speed: "20%"
        }
      },
		formulas: [
        {
          label: "Damage (2x)",
          formula: (ATK, Level) => 0.5 * ATK + 4 * (Level - 1) + 100,
          type: "physical"
        },
        {
          label: "Internal cooldowns",
          type: "text-only",
		      additionalText: "Energy Amplifier = 30s CD / Buddy Barrier = 60s CD"
        }
	 ]
	},
  	"ult1": {
		name: "Spinning Flame Kick",
    cooldown: 4.7,
      buff: { 
      },
      buffPlus:{
       levelRequired: 8,
        buffs: {
          ATK: "30%",
          Shield: 9
        }
      },
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1 * ATK + 7 * (Level - 1) + 200,
          type: "physical"
        },
        {
          label: "Internal cooldowns",
          type: "text-only",
		      additionalText: "Energy Amplifier = 30s CD / Buddy Barrier = 60s CD"
        }
	 ]
	}
  },

  "blissey": {
      "passive": {
          name: "Natural Cure",
          description: "Automatically cleanses this Pokémon every 6s, even if there are no effects to cleanse.",
          effects: ["Cleanses"],
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1.1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.38 * SPATK + 22 * (Level - 1) + 420,
          type: "special"
        },
      ]
	},

    "s11": {
      name: "Egg Bomb",
      cooldown: 9,
      buff: {},
      buffPlus:{
       levelRequired: 12,
        debuffs: {
          Speed: 40
        },
        debuffLabels: {
          Speed: "MoveSpeed Reduction"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.41 * SPATK + 21 * (Level - 1) + 460,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Helping Hand",
      cooldown: 9,
      buff: {
        AtkSPD: 30,
        Speed: "30%"
      },
      buffPlus: {
        levelRequired: 12,
        nextBasicAttackPercent: 15
      },
	  formulas: [
      ]
    },
    "s21": {
      name: "Soft-Boiled",
      cooldown: 12,
      buff:{},
      formulas: [
        {
          label: "Healing",
          formula: (attribute, Level) => 1.83 * attribute + 0 * (Level - 1) + 238,
          type: "heal",
          healAttribute: "SpATK"
        },
		{
          label: "Healing - HoT (2x)",
          formula: (attribute, Level) => 0.75 * attribute + 0 * (Level - 1) + 92,
          type: "heal",
          healAttribute: "SpATK"
        }
      ]
    },
    "s22": {
      name: "Safeguard",
      cooldown: 10,
      effects: ["Cleanses", "Unstoppable"],
      buff:{
      },
      formulas: [
        {
          label: "Shield",
          formula: (SPATK, Level) => 1.85 * SPATK + 13 * (Level - 1) + 620,
          type: "shield"
        },
		{
          label: "Shield Skill Plus",
          formula: (SPATK, Level) => 2.05 * SPATK + 14 * (Level - 1) + 690,
          type: "shield"
        }
      ]
    },
	"ult": {
		name: "Bliss Assistance",
    cooldown: 112,
    buff:{},
      buffPlus:{
       levelRequired: 8,
       effects: ["Unstoppable"],
       allyBuffs: {
          ATK: "20",
          SpATK: "20"
      },
       allyBuffLabels: {
          ATK: "(ALLY BUFF) Attack Increase",
          SpATK: "(ALLY BUFF) Special Attack Increase"
      },
        buffs: {
          Speed: "30%",
          CDR: 30,
          Shield: 20
        }
      },
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.944 * SPATK + 25 * (Level - 1) + 1190,
          type: "special"
        },
		{
          label: "Shield",
          formula: (SPATK, Level) => 2.4 * SPATK + 0 * (Level - 1) + 1200,
          type: "special"
        }
	]
	}
  },

    "buzzwole": {
        "passive": {
          name: "Beast Boost - Kill",
          description: "Gains massive move and attack speed on knockouts. Building its Muscle Gauge through combat enables its strengths, but the gauge decays when out of combat.",
          buff: {
            Speed: "100%",
            AtkSPD: "50%"
          },
          formulas: [
          ]
        },
        "passive1": {
          name: "Beast Boost - Assists",
          description: "Gains massive move and attack speed on assists. Building its Muscle Gauge through combat enables its strengths, but the gauge decays when out of combat.",
          buff: {
            Speed: "50%",
            AtkSPD: "25%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (per Hit - 2 Hits)",
          formula: (ATK, Level) => 0.8 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Healing - Boosted (per Hit - 2 Hits)",
          formula: (ATK, Level) => 0.78 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Lunge",
      cooldown: 6.5,
      buff:{
        AtkSPD: 30
      },
      debuffs: {
        ATK: "30%",
        Speed: "30%"
      },
      debuffLabels: {
        ATK: "(DEBUFF) Attack Reduction",
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buffPlus:{
       levelRequired: 13,
        buffs: {
          ATK: "10%"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 0.89 * ATK + 6 * (Level - 1) + 150,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Smack Down",
      cooldown: 6,
      formulas: [
        {
          label: "Damage - Initial Hit",
          formula: (ATK, Level) => 0.74 * ATK + 3 * (Level - 1) + 140,
          type: "physical"
        },
		{
          label: "Damage - Slam",
          formula: (ATK, Level) => 1.782 * ATK + 7 * (Level - 1) + 336,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Leech Life",
      cooldown: 5,
      effects: ["Unstoppable"],
      formulas: [
        {
          label: "Damage - per Tick",
          formula: (ATK, Level, HP, gauge) => {
          const baseDamage = 0.76 * ATK + 3 * (Level - 1) + 120;
          const muscleBoost = gauge ? (1 + (gauge * 0.015)) : 1; // 1.5% por stack
          return baseDamage * muscleBoost;
        },
        type: "physical",
        usesMuscleGauge: true
        },
		{
          label: "Damage - Unstoppable Target",
          formula: (ATK, Level) => 3.8 * ATK + 15 * (Level - 1) + 600,
          type: "physical"
        },
		{
          label: "Healing - Percentage of Damage Dealt (per hit)",
          formula: (ATK, Level) => 0 * ATK + 5 * (Level - 1) + 40,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Superpower",
      cooldown: 8,
      effects: ["Unstoppable"],
      buff: {},
      selfBuffPlus: {
          levelRequired: 11,
          conditionalGaugeBuffs: {
            6: {
              CooldownFlat: 3
            }
          }
        },
      formulas: [
        {
          label: "Damage - Initial",
          formula: (ATK, Level) => 0.69 * ATK + 2 * (Level - 1) + 105,
          type: "physical"
        },
		{
          label: "Damage - Slam",
          formula: (ATK, Level) => 2.3 * ATK + 8 * (Level - 1) + 350,
          type: "physical"
        },
        {
          label: "Damage - Additional (Muscle Gauge Bonus)",
          formula: (initialDamage, Level, HP, gauge) => {
            return gauge ? (initialDamage * 0.125 * gauge) : 0;
          },
          type: "dependent",
          dependsOn: 0,
          usesMuscleGauge: true
        },
        {
          label: "Shield",
          formula: (ATK, Level, HP, gauge) => {
            const baseShield = HP * 0.2; // 20% do HP base
            const muscleBonus = gauge ? (HP * 0.02 * gauge) : 0; // 2% HP por stack
            return baseShield + muscleBonus;
          },
          type: "physical",
          usesMuscleGauge: true
        },
      ]
    },
	"ult": {
		name: "Ultra Swole Slam",
    cooldown: 112,
    buff:{},
      buffPlus:{
       levelRequired: 9,
       effects: ["Unstoppable"],
        buffs: {
          Speed: "30%",
          CDR: 30,
          Shield: 20
        }
      },
		formulas: [
        {
          label: "Damage - Sweep",
          formula: (ATK, Level) => 2.13 * ATK + 4 * (Level - 1) + 210,
          type: "physical"
        },
		{
          label: "Damage - Seek",
          formula: (ATK, Level) => 2.13 * ATK + 4 * (Level - 1) + 210,
          type: "physical"
        },
        {
          label: "Damage - Execute",
          type: "text-only",
		      additionalText: "50% of enemy missing HP"
        }
        
	 ]
	}
  },

    "ceruledge": {
      "passive": {
          name: "Weak Armor",
          description: "Gains move speed when hit by Attack-based damage. Attacking applies a stacking damage-over-time wound; at max stacks, the target takes increased damage from Ceruledge.",
          buff: {
            Speed: "10%"
          },
          skillDamageMultiplier: 1.15, // 15% de aumento
          affectsBasicAttack: true,
          formulas: [
            {
              label: "Damage - First Stack",
              formula: (ATK, Level) => 0.075 * ATK + 0 * (Level - 1) + 0,
              type: "physical",
            },
            {
              label: "Damage - per Stack Value 2-6",
              formula: (firstHitDamage, Level) => 0.5 * firstHitDamage,
              type: "dependent",
              dependsOn: 0
            },
            {
              label: "Damage - Total 6 Stacks",
              formula: (firstHitDamage, Level) => {
                const first = Math.floor(firstHitDamage);
                const perStack = Math.floor(0.5 * first);
                return (first + (perStack * 5)) * 1.15;
              },
              type: "dependent",
              dependsOn: 0
            }
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff: {
      Lifesteal: 20
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (Charcadet)",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted (x2) (Ceruledge)",
          formula: (ATK, Level) => 0.75 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Bitter Blade",
      cooldown: 6,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.42 * ATK + 33 * (Level - 1) + 330,
          type: "physical"
        },
        {
          label: "Heal",
          formula: (firstHitDamage, Level) => 0.5 * firstHitDamage, // 50% do primeiro hit
		      type: "dependent",
		      dependsOn: 0
        },
        {
          label: "Heal Skill Plus",
          formula: (firstHitDamage, Level) => 0.7 * firstHitDamage, // 70% do primeiro hit
		      type: "dependent",
		      dependsOn: 0
        },
      ]
    },
    "s12": {
      name: "Psycho Cut",
      cooldown: 6.5,
      buff: {},
      selfBuff: {
        CooldownFlat: 0.5
      },
      debuffs:{
        Speed: 30
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.6 * ATK + 18 * (Level - 1) + 550,
          type: "physical"
        },
		{
          label: "Defense Reduction (Flat)",
          formula: (ATK, Level) => 0 * ATK + 2 * (Level - 1) + 20,
          type: "physical"
        },
		{
          label: "Defense Reduction Skill Plus",
          formula: (ATK, Level) => 0 * ATK + 3 * (Level - 1) + 30,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Phantom Force",
      cooldown: 10,
      effects: ["Invincible", "True Damage"],
      buff:{
        DEFPen: 100,
      },
      selfBuff:{
        CooldownPercent: 40
      },
      debuffs:{
        Speed: 60
      },
      debuffLabels:{
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
       selfBuffPlus: {
        levelRequired: 13,
        buffs: { 
          CooldownFlat: 2
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.25 * ATK + 8 * (Level - 1) + 312,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Flame Charge",
      cooldown: 8,
      buff:{
        AtkSPD: 30
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 0.65 * ATK + 5 * (Level - 1) + 250,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Revenant Rend",
    cooldown: 112,
    buff:{},
      buffPlus:{
       levelRequired: 9,
       effects: ["Unstoppable", "Stun"],
        buffs: {
          DmgTaken: 70,
          Speed: "30%",
          CDR: 30,
          Shield: 20
        }
      },
		formulas: [
        {
          label: "Damage (x3)",
          formula: (ATK, Level) => 1.2 * ATK + 8 * (Level - 1) + 500,
          type: "physical"
        }
	 ]
	}
  },

    "chandelure": {
      "passive": {
          name: "Infiltrator",
          description: "Gains stacks that ignore a portion of the target's Special Defense with each damage dealt, refreshing duration on new stacks. Max stacks ignore 20% Sp. Def.",
          buff: {
            SpDEFPen: "20%"
          },
          formulas: [
            {
            label: "Stacks",
            type: "text-only",
            additionalText: "2.5% for each stack, 8 total"
          },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff:{},
    debuffs: {
      Speed: 30
    },
    debuffLabels: {
      Speed: "(DEBUFF) MoveSpeed Reduction"
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.33 * SPATK + 13 * (Level - 1) + 140,
          type: "special"
        },
		{
          label: "Damage - Burn (5 Ticks)",
          formula: (SPATK, Level) => 0.06 * SPATK + 2 * (Level - 1) + 20,
          type: "special"
        },
      ]
	},

    "s11": {
      name: "Flamethrower",
      cooldown: 7,
      effects: ["Burn"],
      buff:{},
      selfBuff:{
        CooldownPercent: 65
      },
      buffPlus: {
       levelRequired: 11,
        buffs: {
        },
      skillDamageMultiplier: 1.20, // 20% de aumento
      affectsBasicAttack: true,
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.12 * SPATK + 7 * (Level - 1) + 535,
          type: "special"
        },
        {
          label: "Damage - Burn (5 Ticks)",
          formula: (SPATK, Level) => 0.06 * SPATK + 2 * (Level - 1) + 20,
          type: "special"
        },
		{
          label: "Damage (Explosion)",
          formula: (SPATK, Level) => 1.49 * SPATK + 24 * (Level - 1) + 700,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Overheat",
      cooldown: 7.5,
      effects: ["Burn"],
      buff: {},
      selfBuffPlus: {
        levelRequired: 11,
        buffs: {
          CooldownFlat: 1
        },
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.67 * SPATK + 29 * (Level - 1) + 280,
          type: "special"
        },
        {
          label: "Damage - Burn (5 Ticks)",
          formula: (SPATK, Level) => 0.06 * SPATK + 2 * (Level - 1) + 20,
          type: "special"
        },
		{
          label: "Exploding Flame level 0",
          formula: (SPATK, Level) => 0.33 * SPATK + 13 * (Level - 1) + 140,
          type: "special"
        },
		{
          label: "Exploding Flame level 1",
          formula: (SPATK, Level) => 0.66 * SPATK + 0 * (Level - 1) + 280,
          type: "special"
        },
		{
          label: "Exploding Flame level 2",
          formula: (SPATK, Level) => 0.99 * SPATK + 0 * (Level - 1) + 420,
          type: "special"
        },
		{
          label: "Exploding Flame level 3",
          formula: (SPATK, Level) => 1.32 * SPATK + 0 * (Level - 1) + 560,
          type: "special"
        },
          {
            label: "Heat Energy info",
            type: "text-only",
            additionalText: "0 = 75% CDR / 1 = 50% CDR / 2 = 30% CDR"
          },
      ]
    },
    "s21": {
      name: "Poltergeist",
      cooldown: 7.5,
      buff:{},
      debuffs: {
        Speed: 65
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buffPlus:{
        levelRequired: 13,
        debuffs: {
          Speed: 15
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.39 * SPATK + 6 * (Level - 1) + 180,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Imprison",
      cooldown: 9.5,
      effects: ["Immobilized"],
      buff:{},
      formulas: [
      ]
    },
	"ult": {
		name: "Ignite Midnight",
    cooldown: 100,
    buff: {},
    buffPlus: {
      levelRequired: 9,
      effects: ["Vision Reduction"],
    debuffs: {
      Vision: 30
    },
    debuffLabels: {
      Vision: "(DEBUFF) Vision Reduction"
    },
    buffs: {
      Speed: "30%",
      Shield: 40
    },
  },
		formulas: [
        {
          label: "Damage (6x)",
          formula: (SPATK, Level) => 0.56 * SPATK + 29 * (Level - 1) + 270,
          type: "special"
        },
		{
          label: "Final Blast Damage",
          formula: (SPATK, Level) => 0.84 * SPATK + 29 * (Level - 1) + 405,
          type: "special"
        }
	]
	}
  },
  
    "charizard": {
      "passive": {
          name: "Blaze",
          description: "While at 50% max HP or below, this Pokémon's critical-hit rate is increased by 20%.",
          buff: {
            CritRate: "20%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff: {
      Speed: "-5%"
    },
      formulas: [
        {
          label: "Damage - Basic (4x)",
          formula: (ATK, Level) => 0.308 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Additional to Charizard Burn targets (4x)",
          formula: (ATK, Level) => 0.32 * ATK + 2 * (Level - 1) + 10,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Flamethrower",
      cooldown: 6,
      effects: ["Burn"],
      buff: {
        Speed: "40%"
      },
      debuffs: {
        ATK: 5
      },
      debuffLabels: {
        ATK: "(DEBUFF) Attack Reduction"
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.45 * ATK + 7 * (Level - 1) + 160,
          type: "physical"
        },
		{
          label: "Damage - Burn (5 Ticks)",
          formula: (ATK, Level) => 0.2 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 1.7 * ATK + 8 * (Level - 1) + 190,
          type: "physical"
        },
		{
          label: "Damage - Burn (5 Ticks) Skill Plus",
          formula: (ATK, Level) => 0.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Fire Punch",
      cooldown: 5,
      effects: ["Burn"],
      buff: {
      },
      debuffs: {
        ATK: 5
      },
      debuffLabels: {
        ATK: "(DEBUFF) Attack Reduction"
      },
      selfBuffPlus: {
        levelRequired: 11,
        buffs: {
          CooldownFlat: 1.6
        },
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.46 * ATK + 11 * (Level - 1) + 264,
          type: "physical"
        },
		{
          label: "Damage - Burn (5 Ticks)",
          formula: (ATK, Level) => 0.2 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Fire Blast",
      cooldown: 6.5,
      buff: {
      },
      debuffs: {
        Speed: 30
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.5 * ATK + 4 * (Level - 1) + 180,
          type: "physical"
        },
		{
          label: "Damage - Area (10 Ticks)",
          formula: (ATK, Level) => 0.375 * ATK + 1 * (Level - 1) + 45,
          type: "physical"
        },
		{
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 1.61 * ATK + 5 * (Level - 1) + 210,
          type: "physical"
        },
		{
          label: "Damage - Area (10 Ticks) Skill Plus",
          formula: (ATK, Level) => 0.4025 * ATK + 1 * (Level - 1) + 53,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Flare Blitz",
      cooldown: 10,
      buff:{},
      buffPlus:{
        levelRequired: 13,
        debuffs: {
          Speed: 40
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.0 * ATK + 6 * (Level - 1) + 242,
          type: "physical"
        },
		{
          label: "Shield",
          formula: (ATK, Level) => 2.4 * ATK + 0 * (Level - 1) + 720,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Seismic Slam",
    cooldown: 134,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Unstoppable", "Bound", "Invincible", "Burn"],
      buffs: {
        HindRed: 100,
        Lifesteal: 80,
        Speed: "50%",
        Shield: 20
      },
      debuffs: {
        ATK: 5
      },
      debuffLabels: {
        ATK: "(DEBUFF) Attack Reduction"
      },
    },
		formulas: [
        {
          label: "Damage - Burning (2x)",
          formula: (ATK, Level) => 0.2 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Slam",
          formula: (ATK, Level) => 3.07 * ATK + 8 * (Level - 1) + 380,
          type: "physical"
        },
        {
          label: "Damage - Slam Additional",
          type: "text-only",
		      additionalText: "8% of enemy max HP"
        },
	 ]
	}
  },

  "megacharizardx": {
      "passive": {
          name: "Solar Power",
          description: "Moves deal bonus damage at the cost of 5% current HP (except in grass). Basic attacks on burned enemies heal 3% missing HP.",
          buff: {
            HP: "-5%",
            HPRegen: 3
          },
          formulas: [
          ]
        },
        "passive1": {
          name: "Tough Claws",
          description: "Mega Evolution grants Tough Claws, boosting defenses and move damage. Move hits build stacks for guaranteed crits, and basic attacks on burned enemies heal missing HP.",
          buff: {
            DEF: "50%",
            SpDEF: "50%",
            HPRegen: 8
          },
          formulas: [
          {
          label: "Damage - Added to Move",
          formula: (ATK, Level) => 1.4 * ATK + 6 * (Level - 1) + 160,
          type: "physical"
        },
        {
          label: "Damage - Added to Move (Mega)",
          formula: (ATK, Level) => 2.8 * ATK + 12 * (Level - 1) + 320,
          type: "physical"
        },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff: {
      Speed: "-5%"
    },
      formulas: [
        {
          label: "Damage - Basic (4x)",
          formula: (ATK, Level) => 0.308 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Additional to Charizard Burn targets (4x)",
          formula: (ATK, Level) => 0.32 * ATK + 2 * (Level - 1) + 10,
          type: "physical"
        }
      ]
	},
    "s12": {
      name: "Fire Punch",
      cooldown: 5,
      effects: ["Burn"],
      buff: {
      },
      debuffs: {
        ATK: 5
      },
      debuffLabels: {
        ATK: "(DEBUFF) Attack Reduction"
      },
      selfBuffPlus: {
        levelRequired: 11,
        buffs: {
          CooldownFlat: 1.6
        },
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.46 * ATK + 11 * (Level - 1) + 264,
          type: "physical"
        },
		{
          label: "Damage - Burn (5 Ticks)",
          formula: (ATK, Level) => 0.2 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
    },
    "U12": {
      name: "Flare Blitz",
      cooldown: 10,
      buff:{},
      selfBuff:{
        CooldownPercent: 40
      },
      buffPlus:{
        levelRequired: 13,
        debuffs: {
          Speed: 40
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.6 * ATK + 5 * (Level - 1) + 193,
          type: "physical"
        },
		{
          label: "Shield",
          formula: (ATK, Level) => 2.4 * ATK + 0 * (Level - 1) + 720,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Seismic Slam",
    cooldown: 89,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Unstoppable", "Bound", "Invincible"],
      buffs: {
        Speed: "50%",
        Shield: 20
      },
    },
		formulas: [
		{
          label: "Damage - Slam",
          formula: (ATK, Level) => 3.07 * ATK + 8 * (Level - 1) + 380,
          type: "physical"
        },
        {
          label: "Damage - Slam Additional",
          type: "text-only",
		      additionalText: "8% of enemy max HP"
        },
	 ]
	}
  },

    "cinderace": {
      "passive": {
          name: "Blaze",
          description: "Below 50% HP, gain crit rate and attack speed (30s CD). Attacks apply cinders; at 5 stacks, they explode for bonus damage.",
          buff: {
            CritRate: "10%",
            AtkSPD: "20%"
          },
          formulas: [
                    {
          label: "Damage - Flare",
          type: "text-only",
		      additionalText: "90% Atk + 0.6% Enemy Max HP x (Level - 1) + 25"
        },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Pyro Ball",
      cooldown: 5,
      buff:{},
      effects: ["Burn"],
      debuffs: {
        ATK: 5,
        SpATK: 5
      },
      debuffLabels: {
        ATK: "(DEBUFF) Attack Reduction",
        SpATK: "(DEBUFF) SpecialAttack Reduction"
      },
      buffPlus: {
        levelRequired: 11,
        buffs:{
      },
        otherSkillsCooldownReduction: {
          s21: 4,  // Flame Charge -4s
          s22: 4   // Feint -4s
        }
    },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 3.45 * ATK + 32 * (Level - 1) + 820,
          type: "physical"
        },
		{
          label: "Damage - Burn (3x)",
          formula: (ATK, Level) => 0.2 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Blaze Kick",
      cooldown: 9.5,
      effects: ["Unstoppable", "Burn"],
      buff: {
        CritRate: 100
      },
      debuffs: {
        ATK: 5,
        SpATK: 5
      },
      debuffLabels: {
        ATK: "(DEBUFF) Attack Reduction",
        SpATK: "(DEBUFF) SpecialAttack Reduction"
      },
      buffPlus: {
       levelRequired: 11,
        buffs: {
          AtkSPD: 45
        },
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 0.48 * ATK + 4 * (Level - 1) + 120,
          type: "physical"
        },
		{
          label: "Damage - Burn (3x)",
          formula: (ATK, Level) => 0.2 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Flame Charge",
      cooldown: 5,
      buff:{},
      buffPlus: {
       levelRequired: 13,
       buffs: {},
        debuffs: {
          Speed: 30
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        },
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 0.47 * ATK + 3 * (Level - 1) + 130,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Feint",
      cooldown: 9,
      effects: ["Invincible"],
      buff: {
        Speed: "40%"
      },
      formulas: [
         {
          label: "HP restoration after dodging",
          type: "text-only",
		      additionalText: "The next 3 auto attacks restore HP for 30% of damage dealt."
        },
      ]
    },
	"ult": {
		name: "Blazing Bicycle Kick",
    cooldown: 112,
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.47 * ATK + 14 * (Level - 1) + 670,
          type: "physical"
        }
	 ]
	}
  },

  "clefable": {
    "passive": {
          name: "Magic Guard",
          description: "Gains a shield when healing allies, with shield strength equal to 50% of the HP restored.",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.69 * SPATK + 17 * (Level - 1) + 320,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Moonlight",
      cooldown: 8.5,
      buff: {
        Speed: "20%"
      },
      formulas: [
        {
          label: "Heal - per Tick (per half second)",
          formula: (attribute, Level) => 0.64 * attribute + 0 * (Level - 1) + 58,
          type: "heal",
          healAttribute: "SpATK"
        }
      ]
    },
    "s12": {
      name: "Draining Kiss",
      cooldown: 4,
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.4 * SPATK + 20 * (Level - 1) + 350,
          type: "special"
        },
        {
          label: "HP restoration",
          type: "text-only",
		      additionalText: "Restores its HP for 140% of the damage dealt."
        },
        {
          label: "HP restoration Skill Plus",
          type: "text-only",
		      additionalText: "Restores its HP for 160% of the damage dealt."
        },
      ]
    },
    "s21": {
      name: "Gravity",
      cooldown: 8,
      effects: ["Stun"],
      buff:{},
      debuffs: {
        Speed: 15
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage - Auto Attacks",
          formula: (SPATK, Level) => 0.98 * SPATK + 10 * (Level - 1) + 410,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Follow Me",
      cooldown: 7.5,
      buff:{},
      buffPlus:{
        levelRequired: 13,
        buffs: {
          DEF: 150,
          SpDEF: 100
        }
      },
      formulas: [
		{
		  label: "Shield",
          formula: (SPATK, Level) => 2.6 * SPATK + 0 * (Level - 1) + 900,
          type: "special"
		}
      ]
    },
	"ult": {
		name: "Wonder Wish",
    cooldown: 100,
    buff:{
    },
    buffPlus: {
      levelRequired: 8,
      buffs: {
        Speed: "30%",
        CDR: 30,
        Shield: 20
      }
    },
		formulas: [
        {
          label: "Heal",
          type: "text-only",
		      additionalText: "25% missing HP"
        },
	  ]
	},
  "ult1": {
		name: "Splash",
    buff:{},
		formulas: [
        {
          label: "Effect",
          type: "text-only",
		      additionalText: "Notthing Happens - Ult 90% recharged"
        },
	  ]
	},
    "ult2": {
		name: "Explosion",
    buff:{},
    buffPlus: {
      levelRequired: 8,
      effects: ["Unstoppable"],
      buffs:{
      },
    },
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 4.86 * SPATK + 34 * (Level - 1) + 1640,
          type: "special"
        },
        {
          label: "Damage - Self",
          formula: (HP, Level) => 0.4 * HP,
          type: "hp"
        }
	  ]
	},
  "ult3": {
		name: "Hydro Pump",
    buff:{},
		formulas: [
        {
          label: "Damage - per Hit (3 Hits)",
          formula: (SPATK, Level) => 1.215 * SPATK + 9 * (Level - 1) + 410,
          type: "special"
        },
	  ]
	},
  "ult4": {
		name: "Hyper Beam",
    buff:{},
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 2.43 * SPATK + 17 * (Level - 1) + 820,
          type: "special"
        },
        {
          label: "Damage - Additional",
          type: "text-only",
		      additionalText: "15% of enemy max HP."
        },
	  ]
	},
  "ult5": {
		name: "Block",
    buff:{
    },
    buffPlus: {
      levelRequired: 8,
      effects: ["Unstoppable", "Stun"],
      buffs:{
        DmgTaken: 25
      },
    },
		formulas: [
        {
          label: "Shield",
          formula: (HP, Level) => 0.2 * HP + 0 * (Level - 1) + 500,
          type: "hp"
        },
	  ]
	},
  "ult6": {
		name: "Close Combat",
    buff:{},
    buffPlus: {
      levelRequired: 8,
      effects: ["Unstoppable"],
      buffs:{
      },
    },
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.5207 * SPATK + 4 * (Level - 1) + 176,
          type: "special"
        },
        {
          label: "Heal - per Hit, per Target",
          formula: (SPATK, Level) => 0.104 * SPATK + 1 * (Level - 1) + 35,
          type: "heal",
          affects: "SpATK"
        },
	  ]
	},
  "ult7": {
		name: "Fly",
    buff:{
    },
    buffPlus: {
      levelRequired: 8,
      effects: ["Invincible"],
      buffs: {
        Speed: "65%"
      }
    },
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 3.159 * SPATK + 22 * (Level - 1) + 1066,
          type: "special"
        }
	  ]
	},
  },

    "comfey": {
      "passive": {
          name: "Triage",
          description: "Gains movement speed near low-HP allies. Stores flowers to empower healing moves when attached, and provides shields and scoring support while untargetable.",
          effects: ["Untargetable", "Invincible"],
          buff: {
            Speed: "25%"
          },
          formulas: [
          {
          label: "Self Healing - Attached (per second)",
          formula: (HP) => 0.01 * HP,
          type: "hp"
          },
          {
          label: "Shield - Attach (Sweet Kiss)",
          formula: (HP) => 0.209 * HP,
          type: "hp"
          },
          {
          label: "Shield - Attach (Synthesis or Floral Healing)",
          formula: (HP) => 0.14 * HP,
          type: "hp"
          },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.45 * SPATK + 11 * (Level - 1) + 210,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Floral Healing",
      cooldown: 5,
      buff:{},
      buffPlus: {
        levelRequired: 10,
        allyBuffs: {
          Speed: 30
      },
       allyBuffLabels: {
          Speed: "(ALLY BUFF) MoveSpeed Increase"
      },
      },
      formulas: [
        {
          label: "Healing",
          formula: (attribute, Level) => 0.97 * attribute + 0 * (Level - 1) + 300,
          type: "heal",
          healAttribute: "SpATK"
        },
		{
          label: "Healing - Additional Per Flower",
          formula: (attribute, Level) => 0.15 * attribute + 0 * (Level - 1) + 45,
          type: "heal",
          healAttribute: "SpATK"
        },
		{
          label: "Overheal Shield",
          formula: (SPATK, Level) => 0.485 * SPATK + 0 * (Level - 1) + 150,
          type: "special"
        },
		{
          label: "Overheal Shield - Additional per Flower",
          formula: (SPATK, Level) => 0.075 * SPATK + 0 * (Level - 1) + 23,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Sweet Kiss",
      cooldown: 6,
      effects: ["Stun"],
      buff:{},
      buffPlus: {
        levelRequired: 10,
        allyBuffs: {
          Speed: 50
      },
       allyBuffLabels: {
          Speed: "(ALLY BUFF) MoveSpeed Increase"
      },
      },
      formulas: [
        {
          label: "Additional Shield",
          formula: (SPATK, Level) => 0.8045 * SPATK + 0 * (Level - 1) + 277,
          type: "shield"
        }
      ]
    },
    "s21": {
      name: "Magical Leaf",
      cooldown: 10,
      buff:{},
      effects: ["Stun"],
      formulas: [
        {
          label: "Damage - per leaf",
          formula: (SPATK, Level) => 0.16 * SPATK + 1 * (Level - 1) + 60,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Grass Knot",
      cooldown: 6,
      buff:{},
      effects: ["Immobilized"],
      formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 0.78 * SPATK + 10 * (Level - 1) + 410,
          type: "special"
		},
		{
		  label: "Damage - Additional",
          formula: (SPATK, Level) => 0.78 * SPATK + 10 * (Level - 1) + 410,
          type: "special"
		}
      ]
    },
	"ult": {
		name: "Flowery Fields Forever",
    cooldown: 89,
    buff:{},
    buffPlus: {
      levelRequired: 8,
      effects: ["Unstoppable", "Invisible"],
      buffs: {
        Speed: "30%",
        CDR: 30,
        Shield: 20
      }
    },
		formulas: [
        {
          label: "Heal - per tick",
          formula: (attribute, Level) => 0.225 * attribute + 0 * (Level - 1) + 120,
          type: "heal",
          healAttribute: "SpATK"
          
        },
		{
          label: "Empowered Floral Healing Healing - Additional Per Flower",
          formula: (SPATK, Level) => 0.195 * SPATK + 0 * (Level - 1) + 59,
          type: "special"
        },
		{
          label: "Empowered Floral Healing Overheal Shield - Additional Per Flower",
          formula: (SPATK, Level) => 0.0975 * SPATK + 0 * (Level - 1) + 30,
          type: "special"
        },
		{
          label: "Empowered Floral Healing Healing",
          formula: (SPATK, Level) => 1.261 * SPATK + 0 * (Level - 1) + 390,
          type: "special"
        },
		{
          label: "Empowered Floral Healing Overheal Shield",
          formula: (SPATK, Level) => 0.6305 * SPATK + 0 * (Level - 1) + 195,
          type: "special"
        }
	]
	}
  },

    "cramorant": {
      "passive": {
          name: "Gulp Missile",
          description: "Stores prey in mouth using moves, then spits it when hit to damage and debuff enemies. Prey type (Arrokuda or Pikachu) changes based on own HP.",
          buff: {
          },
          debuffs:{
            DEF: 20,
            SpDEF: 5,
            Speed: 50,
            AtkSPD: 10
          },
          debuffLabels: {
            DEF: "(DEBUFF) Defense Reduction",
            SpDEF: "(DEBUFF) SpecialDefense Reduction",
            Speed: "(DEBUFF) MoveSpeed Reduction",
            AtkSPD: "(DEBUFF) AttackSpeed Reduction"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.76 * SPATK + 16 * (Level - 1) + 290,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Surf",
      cooldown: 7.5,
      buff:{},
      effects: ["Stun"],
      buffPlus: {
        levelRequired: 13,
        debuffs:{
          Speed: 40
        }
      },
      formulas: [
        {
          label: "First Hit",
          formula: (SPATK, Level) => 0.75 * SPATK + 9 * (Level - 1) + 390,
          type: "special"
        },
		{
          label: "Damage - Second Hit",
          formula: (SPATK, Level) => 1.125 * SPATK + 14 * (Level - 1) + 585,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Dive",
      cooldown: 6,
      buff:{},
      effects: ["Unstoppable"],
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.45 * SPATK + 9 * (Level - 1) + 180,
          type: "special"
        },
		{
          label: "Damage - Additional (Next Boosted)",
          formula: (SPATK, Level) => 0.38 * SPATK + 8 * (Level - 1) + 145,
          type: "special"
        },
		{
          label: "Damage Skill Plus",
          formula: (SPATK, Level) => 0.50 * SPATK + 10 * (Level - 1) + 210,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Hurricane",
      cooldown: 7.5,
       buff:{},
        buffPlus: {
          levelRequired: 11,
          buffs: {
            Speed: "20%",
          }
        },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.2 * SPATK + 11 * (Level - 1) + 620,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Air Slash",
      cooldown: 8,
      formulas: [
		{
		  label: "Damage - per Blade (5 blades)",
          formula: (SPATK, Level) => 0.35 * SPATK + 6 * (Level - 1) + 150,
          type: "special"
		},
		{
		  label: "Healing - per Blade (5 blades) Skill Plus",
          formula: (SPATK, Level) => 0.30 * SPATK + 0 * (Level - 1) + 40,
          type: "special"
		},
    {
          label: "Cooldown",
          type: "text-only",
		      additionalText: "cooldown is reduced by 0.5s for each blade that hits (total 2.5s)."
        },
      ]
    },
	"ult": {
		name: "Gatling Gulp Missile",
    cooldown: 123,
      buff:{},
        buffPlus: {
          levelRequired: 9,
          effects: ["Unstoppable"],
          buffs: {
            Speed: "30%",
            Shield: 30
          }
        },
		formulas: [
        {
          label: "Damage (10x)",
          formula: (SPATK, Level) => 0.85 * SPATK + 8 * (Level - 1) + 330,
          type: "special"
        }
	]
	}
  },

  	"crustle": {
      "passive": {
          name: "Sturdy",
          description: "Gains increasing Defense and Sp. Def for every 7% missing HP, maxing out at 70% missing HP.",
          buff: {
          },
          formulas: [
          {
          label: "Def & Sp. Def - Increase (Stacks 10x)",
          formula: (ATK, Level) => 0 * ATK + 2 * (Level - 1) + 6,
          type: "physical"
          },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff: {},
    debuffs: {
      Speed: 40
    },
    debuffLabels: {
      Speed: "(DEBUFF) MoveSpeed Reduction"
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 0.96 * ATK + 7 * (Level - 1) + 130,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Rock Tomb",
      cooldown: 5.5,
      buff: {},
      debuffs: {
        Speed: 60
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buffPlus: {
        levelRequired: 11,
        debuffs: {
          Speed: 20
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
        {
          label: "Damage - Projectile",
          formula: (ATK, Level) => 0.81 * ATK + 7 * (Level - 1) + 260,
          type: "physical"
        },
		{
          label: "Damage - Barrier Spawn",
          formula: (ATK, Level) => 0.405 * ATK + 4 * (Level - 1) + 130,
          type: "physical"
        },
		{
          label: "Damage - Barrier De-Spawn",
          formula: (ATK, Level) => 0.405 * ATK + 4 * (Level - 1) + 130,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Shell Smash",
      cooldown: 7,
      buff: {
        Speed: "75%"
      },
      effects: ["Unstoppable"],
      buffPlus: {
        levelRequired: 11,
        debuffs: {
          Speed: 20
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
      ],
        // NOVO: Função especial para Shell Smash
        activeEffect: (modifiedStats, baseStats, currentLevel) => {
          // Determinar percentual baseado no nível
          const conversionRate = currentLevel >= 11 ? 0.50 : 0.40;
          
          // Somar DEF + SpDEF
          const totalDefense = modifiedStats.DEF + modifiedStats.SpDEF;
          
          // Calcular o percentual da soma
          const convertedValue = totalDefense * conversionRate;
          
          // Adicionar aos ataques
          modifiedStats.ATK += convertedValue;
          modifiedStats.SpATK += convertedValue;
          
          // IMPORTANTE: Armazenar o bônus para rastreamento
          if (!modifiedStats._shellSmashBonus) {
            modifiedStats._shellSmashBonus = {
              totalDefense: totalDefense,
              convertedValue: convertedValue,
              originalDEF: modifiedStats.DEF,
              originalSpDEF: modifiedStats.SpDEF,
              conversionRate: conversionRate // Armazenar para exibir na UI
            };
          }
          
          // Zerar as defesas
          modifiedStats.DEF = 0;
          modifiedStats.SpDEF = 0;
          
          return modifiedStats;
        }
    },
    "s21": {
      name: "Stealth Rock",
      cooldown: 5.5,
      buff: {},
      buffPlus: {
        levelRequired: 13,
        debuffs: {
          Speed: 35
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 0.207 * ATK + 7 * (Level - 1) + 175,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "X-Scissor",
      cooldown: 6.5,
      buff: {
      },
      effects: ["Stun"],
      selfBuffPlus: {
        levelRequired: 13,
        buffs: {
          CooldownFlat: 1
        }
      },
      formulas: [
		{
          label: "Damage - First Hit",
          formula: (ATK, Level) => 1.14 * ATK + 3 * (Level - 1) + 108,
          type: "physical"
        },
		{
          label: "Damage - Second Hit",
          formula: (ATK, Level) => 1.41 * ATK + 3 * (Level - 1) + 117,
          type: "physical"
        },
		{
          label: "Damage - Third Hit",
          formula: (ATK, Level) => 1.68 * ATK + 3 * (Level - 1) + 126,
          type: "physical"
        },
      ]
    },
	"ult": {
		name: "Rubble Rouser",
    cooldown: 134,
    buff: {
      },
      buffPlus: {
        levelRequired: 9,
        effects: ["Stun", "Unstoppable"],
        buffs: {
          Speed: "30%",
          Shield: 40
        }
      },
		formulas: [
      {
          label: "Shield",
          formula: (HP, Level) => 0.4 * HP + 600,
          type: "hp"
        },
        {
          label: "Damage - Revenge",
          formula: (ATK, Level) => 1.6 * ATK + 12 * (Level - 1) + 360,
          type: "physical"
        },
		{
          label: "Damage - Aura",
          formula: (ATK, Level) => 0.4 * ATK + 3 * (Level - 1) + 90,
          type: "physical"
        },
	 ]
	}
  },

  	"darkrai": {
      "passive": {
          name: "Bad Dreams",
          description: "Damages and marks sleeping enemies near Darkrai, empowering its boosted attack and dealing bonus damage over time without waking them.",
          buff: {
          },
          skillDamageMultiplier: 1.10, // 10% de aumento
          affectsBasicAttack: true,
          formulas: [
          {
          label: "Damage",
          formula: (SpATK, Level) => 0.5 * SpATK + 2 * (Level - 1) + 6,
          type: "special"
          },
          {
          label: "Damage - DoT",
          formula: (HP) => 0.02 * HP,
          type: "hp"
          },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 1.6 * SPATK + 0 * (Level - 1) + 336,
          type: "special"
        },
        {
          label: "Healing",
          type: "text-only",
		      additionalText: "20% damage dealt"
        },
      ]
	},

    "s11": {
      name: "Dark Void",
      cooldown: 4,
      buff: {
      },
      effects: ["Sleep"],
      buffPlus: {
        levelRequired: 11,
        debuffs: {
          Speed: 40,
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1 * SPATK + 11 * (Level - 1) + 300,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Nasty Plot",
      cooldown: 3,
      formulas: [
        {
          label: "Damage - Additional (Per Counter)",
          formula: (SPATK, Level) => 1.1 * SPATK + 8 * (Level - 1) + 290,
          type: "special"
        },
		{
          label: "Damage - Boosted & Additional (Per Counter)",
          formula: (SPATK, Level) => 0.96 * SPATK + 6 * (Level - 1) + 250,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Shadow Claw",
      cooldown: 6,
      buff: {
      },
      effects: ["Sleep"],
      debuffs: {
        Speed: 40
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.62 * SPATK + 12 * (Level - 1) + 432,
          type: "special"
        },
		{
          label: "Damage - Huge Claw",
          formula: (SPATK, Level) => 2.106 * SPATK + 16 * (Level - 1) + 562,
          type: "special"
        },
		{
          label: "Damage - Huge Claw (A Pokémon has Bad Dreams)",
          formula: (SPATK, Level) => 2.5272 * SPATK + 19 * (Level - 1) + 675,
          type: "special"
        },
		{
          label: "Damage - In Dark Pulse",
          formula: (SPATK, Level) => 1.134 * SPATK + 11 * (Level - 1) + 303,
          type: "special"
        },
		{
          label: "Damage - Huge Claw In Dark Pulse",
          formula: (SPATK, Level) => 1.474 * SPATK + 11 * (Level - 1) + 394,
          type: "special"
        },
		{
          label: "Damage - Huge Claw In Dark Pulse (A Pokémon has Bad Dreams)",
          formula: (SPATK, Level) => 1.769 * SPATK + 13 * (Level - 1) + 473,
          type: "special"
        },
		{
          label: "Damage Skill Plus",
          formula: (SPATK, Level) => 1.782 * SPATK + 13 * (Level - 1) + 476,
          type: "special"
        },
		{
          label: "Damage - Huge Claw Skill Plus",
          formula: (SPATK, Level) => 2.3166 * SPATK + 17 * (Level - 1) + 618,
          type: "special"
        },
		{
          label: "Damage - Huge Claw (A Pokémon has Bad Dreams) Skill Plus",
          formula: (SPATK, Level) => 2.78 * SPATK + 20 * (Level - 1) + 742,
          type: "special"
        },
		{
          label: "Damage - In Dark Pulse Skill Plus",
          formula: (SPATK, Level) => 1.2474 * SPATK + 10 * (Level - 1) + 333,
          type: "special"
        },
		{
          label: "Damage - Huge Claw In Dark Pulse Skill Plus",
          formula: (SPATK, Level) => 1.6216 * SPATK + 12 * (Level - 1) + 434,
          type: "special"
        },
		{
          label: "Damage - Huge Claw In Dark Pulse (A Pokémon has Bad Dreams) Skill Plus",
          formula: (SPATK, Level) => 1.946 * SPATK + 14 * (Level - 1) + 520,
          type: "special"
        },
      ]
    },
    "s22": {
      name: "Dark Pulse",
      cooldown: 7,
      formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 1.71 * SPATK + 8 * (Level - 1) + 411,
          type: "special"
		},
		{
		  label: "Shield Skill Plus",
          formula: (SPATK, Level) => 0.5 * SPATK + 0 * (Level - 1) + 300,
          type: "special"
		}
      ]
    },
	"ult": {
		name: "Worst Nightmare",
    cooldown: 112,
    buff: {
      },
      buffPlus: {
        levelRequired: 9,
        effects: ["Sleep", "Unstoppable"],
        buffs: {
          Speed: "80%",
          Shield: 20
        }
      },
		formulas: [
      {
		  label: "Damage - DoT (21 Ticks)",
          formula: (HP, Level) => 0.03 * HP,
          type: "hp"
		},
	]
	}
  },

  "decidueye": {
    "passive": {
          name: "Long Reach",
          description: "Increases Decidueye's auto attack and move damage by 20% to distant enemies.",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff: {
      AtkSPD: 12
    },

      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted(3x)",
          formula: (ATK, Level) => 0.38 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Razor Leaf",
      cooldown: 8,
      buff: {
        ATK: "10%",
        AtkSPD: 10
      },
      formulas: [
        {
          label: "Damage - Basic [Main Target]",
          formula: (ATK, Level) => 0.8 * ATK + 3 * (Level - 1) + 120,
          type: "physical"
        },
		{
          label: "Damage - Boosted [Main Target] (3 Hits)",
          formula: (ATK, Level) => 0.304 * ATK + 1 * (Level - 1) + 46,
          type: "physical"
        },
		{
          label: "Damage - Basic [Secondary Target]",
          formula: (ATK, Level) => 0.36 * ATK + 1 * (Level - 1) + 54,
          type: "physical"
        },
		{
          label: "Damage - Boosted [Secondary Target] (3 Hits)",
          formula: (ATK, Level) => 0.1368 * ATK + 1 * (Level - 1) + 21,
          type: "physical"
        },
		{
          label: "Attack Speed - % Increase",
          formula: (ATK, Level) => 0 * ATK + 1 * (Level - 1) + 40,
          type: "physical"
        },
        {
          label: "Level 11 buff",
          type: "text-only",
		      additionalText: "2% of the main target's remaining HP and 1% for secondary targets."
        },
      ]
    },
    "s12": {
      name: "Spirit Shackle",
      cooldown: 8.5,
      buff: {
        Speed: "-25%"
      },
      debuffs: {
        Speed: 80
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buffPlus: {
        levelRequired: 11,
        buffs:{},
        skillDamageMultiplier: 1.125
      },
      formulas: [
		{
          label: "Damage - Min Charge",
          formula: (ATK, Level) => 2.48 * ATK + 5 * (Level - 1) + 200,
          type: "physical"
        },
        {
          label: "Damage - Max Charge",
          formula: (ATK, Level) => 4.464 * ATK + 9 * (Level - 1) + 360,
          type: "physical"
        },
        {
          label: "Damage - Exiting Stitch Area",
          formula: (ATK, Level) => 0.496 * ATK + 1 * (Level - 1) + 40,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Leaf Tornado",
      cooldown: 8,
      effects: ["Stun"],
      buff: {
      },
      debuffs: {
        Speed: 60
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.48 * ATK + 6 * (Level - 1) + 215,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Shadow Sneak",
      cooldown: 12,
      effects: ["Invisible Reveal"],
      buff: {
        Speed: "70%"
      },
      debuff: {
        Speed: 30,
        DEF: 60
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction",
        DEF: "(DEBUFF) Defense Reduction"
      },
      buffPlus: {
        levelRequired: 13,
        debuff: {
          DEF: 20
        },
        debuffLabels: {
          DEF: "(DEBUFF) Defense Reduction"
        }
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 0.56 * ATK + 2 * (Level - 1) + 80,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Nock Nock",
    cooldown: 112,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Unstoppable"],
      skillDamageMultiplier: 1.3,
      buffs: {
        Shield: 30,
        Speed: "30%"
      }
    },
		formulas: [
        {
          label: "Damage - per Quill (30 Quills)",
          formula: (ATK, Level) => 0.7 * ATK + 2 * (Level - 1) + 100,
          type: "physical"
        },
		{
          label: "Damage - Large Arrow",
          formula: (ATK, Level) => 2.8 * ATK + 8 * (Level - 1) + 400,
          type: "physical"
        },
	 ]
	}
  },

    "delphox": {
      "passive": {
          name: "Blaze",
          description: "Below 50% HP, using a move fires an extra fireball for bonus damage (15s cooldown).",
          buff: {
          },
          formulas: [
          {
            label: "Damage - Fireball",
            formula: (SPATK, Level) => 0.81 * SPATK + 18 * (Level - 1) + 325,
            type: "special"
          }
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.34 * SPATK + 8 * (Level - 1) + 140,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Fire Blast",
      cooldown: 6.5,
      formulas: [
        {
          label: "Damage - Initial",
          formula: (SPATK, Level) => 0.853 * SPATK + 17 * (Level - 1) + 438,
          type: "special"
        },
		{
          label: "Damage - Explosion",
          formula: (SPATK, Level) => 0.853 * SPATK + 17 * (Level - 1) + 438,
          type: "special"
        },
		{
          label: "Damage - Initial Skill Plus",
          formula: (SPATK, Level) => 0.948 * SPATK + 19 * (Level - 1) + 486,
          type: "special"
        },
		{
          label: "Damage - Explosion Skill Plus",
          formula: (SPATK, Level) => 0.948 * SPATK + 19 * (Level - 1) + 486,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Mystical Fire",
      cooldown: 4.5,
      buff:{},
      buffPlus: {
        levelRequired: 11,
        buffs:{
        },
        otherSkillsCooldownReduction: {
          s11: 1.5,
          s21: 1.5,
          s12: 1.5,
          s22: 1.5
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.1 * SPATK + 20 * (Level - 1) + 630,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Fire Spin",
      cooldown: 6.5,
      buff:{},
      effects: ["Stun"],
      debuff: {
        Speed: 30
      },
      debuffLabels :{
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buffPlus: {
        levelRequired: 13,
        skillDamageMultiplier: 1.125, // 30% de aumento no dano das skills
        affectsBasicAttack: true,
      },
      formulas: [
        {
          label: "Damage - per Tick",
          formula: (SPATK, Level) => 0.16 * SPATK + 2 * (Level - 1) + 90,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Flame Charge",
      cooldown: 4.5,
      buff:{},
      debuff: {
        Speed: 30
      },
      debuffLabels :{
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buffPlus: {
        levelRequired: 13,
        buffs: {
          Speed: "30%"
        }
      },
      formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 0.46 * SPATK + 10 * (Level - 1) + 240,
          type: "special"
		},
		{
		  label: "Healing - per Blade (5 blades) Skill Plus",
          formula: (SPATK, Level) => 0.30 * SPATK + 0 * (Level - 1) + 40,
          type: "special"
		}
      ]
    },
	"ult": {
		name: "Fanciful Fireworks",
    cooldown: 84,
    buff:{},
      buffPlus: {
        levelRequired: 9,
        buffs: {
          Speed: "30%",
          CDR: 30,
          Shield: 20
        },
      debuffs: {
        Speed: 50,
        HPRegen: 50
      },
      debuffLabels :{
        Speed: "(DEBUFF) MoveSpeed Reduction",
        HPRegen: "(DEBUFF) HPRegeneration Reduction "
      },
      },
		formulas: [
        {
          label: "Damage - per Tick",
          formula: (SPATK, Level) => 0.25 * SPATK + 3 * (Level - 1) + 150,
          type: "special"
        }
	]
	}
  },

  "dodrio": {
    "passive": {
          name: "Run Away",
          description: "Gains movement speed near enemies and charges a sprint gauge while moving. Scores goals by splitting Aeos energy into multiple deposits.",
          buff: {
            Speed: "20%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff: {
    otherSkillsCooldownReduction: {
        s11: 1,
        s21: 1,
        s12: 1,
        s22: 1
      }
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (No Gauge)",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (Full Gauge)",
          formula: (ATK, Level) => 1.89 * ATK + 6 * (Level - 1) + 110,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Tri Attack",
      cooldown: 6,
      buff: {},
      effects: ["Burn", "Paralyze", "Freeze"],
      conditionalEffects: {
        options: ["Burn", "Paralyze", "Freeze"],
        debuffs: {
          "Burn": { ATK: 12 },
          "Paralyze": { AtkSPD: 12, Speed: 15 },
          "Freeze": { Speed: 40 }
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1 * ATK + 6 * (Level - 1) + 140,
          type: "physical"
        },
		{
          label: "Damage - Burn (per Tick)",
          formula: (ATK, Level) => 0.049 * ATK + 0 * (Level - 1) + 7,
          type: "physical"
        },
		{
          label: "Damage - per Projectile (Full Gauge)",
          formula: (ATK, Level) => 0.9 * ATK + 3 * (Level - 1) + 110,
          type: "physical"
        },
		{
          label: "Damage - Basic",
          formula: (ATK, Level) => 0.636 * ATK + 2 * (Level - 1) + 39,
          type: "physical",
          additionalText: "Heals for 7% max HP."
        },
                {
          label: "Damage - Basic Skill Plus",
          type: "text-only",
		      additionalText: "Additional heals 3% max HP."
        },
      ]
    },
    "s12": {
      name: "Drill Peck",
      cooldown: 6,
      buff: {
        DmgTaken: 20
      },
      selfBuffPlus: {
        levelRequired: 11,
        buffs: {
          CooldownFlat: 2
        }
      },
      formulas: [
		{
          label: "Damage - 3x (No Gauge)",
          formula: (ATK, Level) => 0.788 * ATK + 2 * (Level - 1) + 72,
          type: "physical"
        },
        {
          label: "Damage - 5x (Full Gauge)",
          formula: (ATK, Level) => 0.74 * ATK + 2 * (Level - 1) + 68,
          type: "physical"
        },
        {
          label: "Damage - 3x (Full Gauge)",
          type: "text-only",
		      additionalText: "3% of enemy max HP."
        },
        {
          label: "Damage - Heal",
          type: "text-only",
		      additionalText: "Restores 30% of the damage dealt by the flat damage."
        },
      ]
    },
    "s21": {
      name: "Agility",
      cooldown: 9,
      buff: {
        HindRed: 100,
        Speed: "20%"
      },
      formulas: [
      ]
    },
    "s22": {
      name: "Jump Kick",
      cooldown: 6.5,
      buff:{},
      debuffs: {
        Speed: 25
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      selfBuff: {
        CooldownFlat: 3
      },
      effects: ["Stun"],
      formulas: [
		{
          label: "Damage - Initial",
          formula: (ATK, Level) => 0.74 * ATK + 4 * (Level - 1) + 170,
          type: "physical"
        },
        {
          label: "Damage - Slam",
          formula: (ATK, Level) => 0.74 * ATK + 4 * (Level - 1) + 170,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Triple Trample",
    cooldown: 134,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Unstoppable"],
      buffs: {
        ATK: "25%",
        SpATK: "-5%",
        Shield: 30,
        Speed: "80%"
      }
    },
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.73 * ATK + 8 * (Level - 1) + 390,
          type: "physical"
        }
	 ]
	}
  },

    "dragapult": {
      "passive": {
          name: "Clear Body",
          description: "Reduces the duration of debuffs inflicted on this Pokémon.",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.15 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Dragon Breath",
      cooldown: 7.5,
      buff:{},
      debuffs: {
        Speed: 30
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buffPlus: {
        levelRequired: 13,
        debuffs: {
          Speed: 15
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 0.6 * ATK + 4 * (Level - 1) + 160,
          type: "physical"
        },
		{
          label: "Damage - Burn (7x)",
          formula: (ATK, Level) => 0.3 * ATK + 2 * (Level - 1) + 80,
          type: "physical"
        },
		{
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 0.66 * ATK + 4 * (Level - 1) + 176,
          type: "physical"
        },
		{
          label: "Damage - Burn (7x) Skill Plus",
          formula: (ATK, Level) => 0.33 * ATK + 2 * (Level - 1) + 88,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Shadow Ball",
      cooldown: 7.5,
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 1.1 * ATK + 5 * (Level - 1) + 265,
          type: "physical"
        },
        {
          label: "Damage - Mark Proc",
          formula: (ATK, Level) => 0.22 * ATK + 1 * (Level - 1) + 53,
          type: "physical"
        },
        {
          label: "Damage - Final Mark Proc Additional Damage",
          formula: (ATK, Level) => 1.1 * ATK + 5 * (Level - 1) + 265,
          type: "physical"
        },
        {
          label: "Damage - Full Mark Heal",
          formula: (HP, Level) => 0.15 * HP,
          type: "hp"
        },
		{
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 1.19 * ATK + 6 * (Level - 1) + 300,
          type: "physical"
        },
		{
          label: "Damage - Mark Proc Skill Plus",
          formula: (ATK, Level) => 0.238 * ATK + 1 * (Level - 1) + 60,
          type: "physical"
        },
		{
          label: "Damage - Final Mark Proc Additional Damage Skill Plus",
          formula: (ATK, Level) => 1.19 * ATK + 6 * (Level - 1) + 300,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Dragon Dance",
      cooldown: 11,
      effects: ["Invincible"],
      buff:{
        AtkSPD: 200,
      },
      nextBasicAttackPercent: -10,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 0.90 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage (Boosted)",
          formula: (ATK, Level) => 1.035 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
              label: "HP Restore Skill Plus",
              formula: (ATK, level) => 0.25 * ATK,
              type: "physical",
              affects: "nextBasicAttack"
          },
        {
          label: "Cooldown Reduction if assits",
          type: "text-only",
		  additionalText: "50% Reduction"
        },
      ]
    },
    "s22": {
      name: "Phantom Force",
      cooldown: 12,
      effects: ["Invisible"],
      buff:{
        Speed: "30%",
        AtkSPD: 85,
        ATK: 80
      },
      selfBuffPlus: {
        levelRequired: 11,
        buffs: {
          CooldownFlat: 0.5
        }
      },
      formulas: [
      ]
    },
	"ult": {
		name: "Dreep and Destroy",
    cooldown: 10,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      buffs:{
        Shield: 10,
        Speed: "10%"
      }
    },
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.01 * ATK + 4 * (Level - 1) + 180,
          type: "physical",
          additionalText: "Deals 10% of enemy missing HP."
        },
        {
          label: "Damage - Additional (Same Target)",
          formula: (firstHitDamage, Level) => 0.3 * firstHitDamage,
          type: "dependent",
          dependsOn: 0
        },
        {
          label: "Internal cooldowns",
          type: "text-only",
		      additionalText: "Energy Amplifier = 30s CD / Buddy Barrier = 60s CD"
        }
	 ]
	}
  },

    "dragonite": {
        "passive": {
          name: "Multiscale",
          description: "Taking damage grants a 30% damage reduction buff for 2.5s, with a 15s cooldown.",
          buff: {
            DmgTaken: "30%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff: {},
    conditionalEffects: {
        options: ["Water", "Electric", "Fire"],
        effectsByType: {
            "Water": [],
            "Electric": ["Stun"],
            "Fire": ["Stun"] 
        },
        buffs: {
            "Water": { CDR: 1, HPRegen: 5 }, 
            "Electric": { CDR: 1 },
            "Fire": {}
        },
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.35 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
                {
          label: "Damage - Additional Fire",
          type: "text-only",
		  additionalText: "10% of the enemy's remaining HP."
        },
      ]
	},

    "s11": {
      name: "Dragon Dance",
      cooldown: 5.5,
      buff:{
        AtkSPD: 80,
        ATK: "24%"
      },
      selfBuff: {
        CooldownFlat: 1
      },
      buffPlus: {
        levelRequired: 11,
        buffs:{
          Speed: "10%"
        }
      },
      formulas: [
      ]
    },
    "s12": {
      name: "Extreme Speed",
      cooldown: 7,
      buff:{},
      debuffs: {
        Speed: 50
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 0.82 * ATK + 4 * (Level - 1) + 150,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Hyper Beam",
      cooldown: 10.5,
      buff: {},
      buffPlus: {
        levelRequired: 13,
        buffs:{
          DmgTaken: 50
        }
      },
      formulas: [
        {
          label: "Damage - Stage 0",
          formula: (ATK, Level) => 1.87 * ATK + 8 * (Level - 1) + 350,
          type: "physical"
        },
		{
          label: "Damage - Stage 1",
          formula: (ATK, Level) => 2.244 * ATK + 10 * (Level - 1) + 420,
          type: "physical"
        },
		{
          label: "Damage - Stage 2",
          formula: (ATK, Level) => 2.618 * ATK + 11 * (Level - 1) + 490,
          type: "physical"
        },
		{
          label: "Damage - Stage 3",
          formula: (ATK, Level) => 2.992 * ATK + 13 * (Level - 1) + 560,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Outrage",
      cooldown: 8,
      buff:{
        AtkSPD: 35
      },
      buffPlus: {
        levelRequired: 13,
        buffs: {
          HindRed: 40
        }
      },
      formulas: [
		{
          label: "Damage - Stomp",
          formula: (ATK, Level) => 1.76 * ATK + 7 * (Level - 1) + 330,
          type: "physical"
        },
		{
          label: "Damage - Boosteds",
          formula: (ATK, Level) => 1.35 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
      ]
    },
	"ult": {
		name: "Draco Impact",
    cooldown: 112,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Untargetable", "Unstoppable"],
      buffs: {
        Speed: "30%",
        AtkSPD: 35,
        Shield: 20
      }
    },
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.03 * ATK + 18 * (Level - 1) + 860,
          type: "physical"
        }
	 ]
	}
  },

    "duraludon": {
      "passive": {
          name: "Heavy Metal",
          description: "Blocks the first throw or shove attempt against it, then goes on a 50-second cooldown.",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.35 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (Additional)",
          type: "text-only",
		  additionalText: "Deals 1.5% enemy max HP damage and can critically strike."
        },
      ]
	},

    "s11": {
      name: "Flash Cannon",
      cooldown: 5,
      buff:{
        Speed: "-50%",
        AtkSPD: 100
      },
      debuffs: {
        Speed: 60
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }, 
      buffPlus: {
        levelRequired: 11,
        effects: ["Stun"]
      },
      formulas: [
		{
          label: "Damage - Rupture",
          formula: (ATK, Level) => 0.525 * ATK + 2 * (Level - 1) + 60,
          type: "physical"
        },
		{
          label: "Damage - Cannon Basic",
          formula: (ATK, Level) => 1.05 * ATK + 3 * (Level - 1) + 120,
          type: "physical"
        },
        {
          label: "Damage - Cannon Boosted",
          formula: (firstHitDamage, Level, HP) => (firstHitDamage + (0.005 * HP)) * 3,
          type: "dependent",
          dependsOn: 0,
        },
      ]
    },
    "s12": {
      name: "Dragon Pulse",
      cooldown: 7.5,
      buff:{
        Speed: "-30%"
      },
      selfBuff: {
        CooldownPercent: 30
      },
      buffPlus: {
        levelRequired: 11,
        buffs:{
          HPRegen: 8
        }
      },
      formulas: [
		{
          label: "Damage - No Charge",
          formula: (ATK, Level) => 0.32 * ATK + 1 * (Level - 1) + 38,
          type: "physical"
        },
		{
          label: "Damage - No Charge (per Mark): (all charge levels cap at 400 dmg)",
          formula: (ATK, Level) => 0.45 * ATK + 1 * (Level - 1) + 54,
          type: "physical",
		  additionalText: "0.8% target missing HP"
        },
		{
          label: "Damage - No Charge (Final Ring): (all charge levels cap at 600 dmg)",
          formula: (ATK, Level) => 0.59 * ATK + 1 * (Level - 1) + 70,
          type: "physical",
		  additionalText: "1.6% target missing HP"
        },
		{
          label: "Damage - Bonus (After KO)",
          formula: (ATK, Level) => 0.15 * ATK + 1 * (Level - 1) + 27,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Dragon Tail",
      cooldown: 14,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.79 * ATK + 5 * (Level - 1) + 220,
          type: "physical"
        },
		{
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 0.5 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Stealth Rock",
      cooldown: 8.5,
      buff:{},
      effects: ["Stun"],
      debuffs: {
        Speed: 25
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
		{
          label: "Damage - per Tick (4 Ticks)",
          formula: (ATK, Level) => 0.28 * ATK + 2 * (Level - 1) + 80,
          type: "physical"
        },
		{
          label: "Shield - per Stealth Rock",
          formula: (ATK, Level) => 0.60 * ATK + 0 * (Level - 1) + 250,
          type: "physical"
        },
      ]
    },
	"ult": {
		name: "Revolving Ruin",
    cooldown: 134,
    buff: {},
    buffPlus:{
      levelRequired: 9,
      effects: ["Unstoppable"],
      buffs: {
        ATK: "8%",
        Shield: 28,
        Speed: "30%",
        AtkSPD: 35
      },
      debuffs: {
        Speed: 50
      },
      debuffLabels:{
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }
    },
		formulas: [
        {
          label: "Damage - per Hit",
          formula: (ATK, Level) => 1.63 * ATK + 6 * (Level - 1) + 350,
          type: "physical"
        },
		{
          label: "Damage - per Enemy",
          formula: (ATK, Level) => 0.68 * ATK + 0 * (Level - 1) + 68,
          type: "physical"
        },
		{
          label: "Damage - Burning Ring (per Tick)",
          formula: (ATK, Level) => 0.35 * ATK + 0 * (Level - 1) + 63,
          type: "physical"
        }
	 ]
	}
  },

  	"eldegoss": {
      "passive": {
          name: "Cotton Down",
          description: "Taking a large hit triggers HP recovery, a self-speed boost, and revenge damage with a slow to nearby enemies (10s cooldown).",
          buff: {
            Speed: "15%",
            HPRegen: 15
          },
          debuffs: {
            Speed: 30
          },
          debuffLabels: {
            Speed: "(DEBUFF) MoveSpeed Reduction"
          },
          formulas: [
          {
            label: "Damage - Revenge",
            formula: (SPATK, Level) => 0.35 * SPATK + 0 * (Level - 1) + 150,
            type: "special"
          },
          {
            label: "Healing - Revenge",
            formula: (SPATK, Level) => 0.65 * SPATK + 0 * (Level - 1) + 165,
            type: "special"
          },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff:{},
    debuffs: {
      Speed: 20
    },
    debuffLabels: {
      Speed: "(DEBUFF) MoveSpeed Reduction"
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.73 * SPATK + 6 * (Level - 1) + 120,
          type: "special"
        },
		{
          label: "Damage - Bonus",
          formula: (SPATK, Level) => 0.1825 * SPATK + 2 * (Level - 1) + 30,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Pollen Puff",
      cooldown: 5,
      buff:{},
      buffPlus: {
        levelRequired: 10,
        allyBuffs:{
          DmgTaken: 15
        },
        allyBuffLabels: {
          DmgTaken: "(ALLY BUFF) Damage Taken Reduction"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.80 * SPATK + 5 * (Level - 1) + 155,
          type: "special"
        },
		{
          label: "Healing",
          formula: (attribute, Level) => 1.5 * attribute + 13 * (Level - 1) + 300,
          type: "heal",
          healAttribute: "SpATK"
        },
		{
          label: "Damage - DoT (every 0.5s, up to 4 times) Skill Plus",
          formula: (SPATK, Level) => 0.09 * SPATK + 1 * (Level - 1) + 18,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Leaf Tornado",
      cooldown: 8,
      buff: {},
      allyBuffs: {
        Speed: 55
      },
      allyBuffLabels: {
        Speed: "(ALLY BUFF) MoveSpeed Increase"
      },
      buffPlus:{
        levelRequired: 10,
        effects: ["Blind"]
      },
      formulas: [
        {
          label: "Damage - First Hit",
          formula: (SPATK, Level) => 1.06 * SPATK + 6 * (Level - 1) + 240,
          type: "special"
        },
		{
          label: "Damage - Second Hit",
          formula: (firstHitDamage, Level) => 0.25 * firstHitDamage, // 25% do primeiro hit
		  type: "dependent",
		  dependsOn: 0
        },
      ]
    },
    "s21": {
      name: "Cotton Guard",
      cooldown: 10.5,
      buff:{},
      buffPlus: {
        levelRequired: 12,
        allyBuffs:{
          Speed: 30
        },
        allyBuffLabels: {
          Speed: "(ALLY BUFF) MoveSpeed Increase"
        }
      },
      formulas: [
        {
          label: "Shield",
          formula: (SPATK, Level) => 1.725 * SPATK + 23 * (Level - 1) + 290,
          type: "shield"
        },
        {
          label: "Heal - Shield",
          formula: (firstHitDamage, Level) => 0.15 * firstHitDamage,
          type: "dependent",
          dependsOn: 0
        },

      ]
    },
    "s22": {
      name: "Cotton Spore",
      cooldown: 6,
      buff: {
        Speed: "30%"
      },
      debuffs: {
        Speed: 40
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buffPlus: {
        levelRequired: 12,
        buffs: {
          DEF: "50%",
          SpDEF: "50%"
        }
      },  
      formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 1.48 * SPATK + 14 * (Level - 1) + 350,
          type: "special"
		}
      ]
    },
	"ult": {
		name: "Cotton Cloud Crash",
    cooldown: 100,
    buff: {},
    buffPlus:{
      levelRequired: 9,
      effects: ["Invincible"],
      buffs: {
        Speed: "40%",
        Shield: 30
      }
    },
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 2 * SPATK + 8 * (Level - 1) + 530,
          type: "special"
        },
		{
          label: "Healing",
          formula: (attribute, Level) => 3.06 * attribute + 13 * (Level - 1) + 636,
          type: "heal",
          healAttribute: "SpATK"
        }
	]
	}
  },

  	"empoleon": {
      "passive": {
          name: "Torrent",
          description: "Dealing damage or over time fills a Torrent gauge; using a move above 50% gauge consumes it to empower the move, with faster filling at lower HP.",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (SPATK, Level) => 0.6 * SPATK + 0 * (Level - 1) + 120,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.9 * SPATK + 0 * (Level - 1) + 180,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Hydro Cannon",
      cooldown: 5,
      buff:{},
      effects: ["Stun"],
      selfBuffPlus:{
        levelRequired: 13,
        buffs:{
          CooldownPercent: 30
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 2.332 * SPATK + 14 * (Level - 1) + 347,
          type: "special"
        },
		{
          label: "Damage - Whirlpool (Torrent) [6 hits]",
          formula: (SPATK, Level) => 0.459 * SPATK + 3 * (Level - 1) + 70,
          type: "special"
        },
		{
          label: "Healing - Whirlpool (Torrent)",
          formula: (attribute, Level) => 0.469 * attribute + 0 * (Level - 1) + 128,
          type: "heal",
          healAttribute: "SpATK"
        }
      ]
    },
    "s12": {
      name: "Whirlpool",
      cooldown: 5.5,
      buff:{
        HPRegen: 50
      },
      effects: ["Unstoppable"],
      formulas: [
        {
          label: "Damage (4 hits)",
          formula: (SPATK, Level) => 0.572 * SPATK + 6 * (Level - 1) + 88,
          type: "special"
        },
		{
          label: "Damage (Torrent) [4 hits]",
          formula: (SPATK, Level) => 0.692 * SPATK + 7 * (Level - 1) + 106,
          type: "special" 
        },
        	{
          label: "Damage - Slash (Torrent)",
          formula: (SPATK, Level) => 0.692 * SPATK + 7 * (Level - 1) + 106,
          type: "special" 
        },
                {
          label: "Damage (4 hits) Skill Plus",
          formula: (SPATK, Level) => 0.692 * SPATK + 7 * (Level - 1) + 106,
          type: "special"
        },
		{
          label: "Damage (Torrent) [4 hits] Skill Plus",
          formula: (SPATK, Level) => 0.88 * SPATK + 6 * (Level - 1) + 130,
          type: "special" 
        },
        	{
          label: "Damage - Slash (Torrent) Skill Plus",
          formula: (SPATK, Level) => 0.88 * SPATK + 6 * (Level - 1) + 130,
          type: "special" 
        },
      ]
    },
    "s21": {
      name: "Metal Claw",
      cooldown: 5.5,
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 2.069 * SPATK + 11 * (Level - 1) + 310,
          type: "special"
        },
        {
          label: "Shield (Torrent)",
          formula: (SPATK, Level) => 1.35 * SPATK + 14 * (Level - 1) + 353,
          type: "shield"
        },
                {
          label: "Shield (Torrent) Skill Plus",
          formula: (SPATK, Level) => 1.62 * SPATK + 17 * (Level - 1) + 423,
          type: "shield"
        },
      ]
    },
    "s22": {
      name: "Aqua Jet",
      cooldown: 6,
      buff: {
        AtkSPD: 40
      },
      debuffs: {
        SpDEF: 60
      },
      debuffLabels: {
        SpDEF: "(DEBUFF) SpecialDefense Reduction"
      },
      selfBuffPlus: {
        levelRequired: 11,
        buffs: {
          CooldownFlat: 1
        }
      },
      formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 2 * SPATK + 11 * (Level - 1) + 300,
          type: "special"
		}
      ]
    },
	"ult": {
		name: "Sovereign Slide",
    cooldown: 112,
    buff:{},
    buffPlus:{
      levelRequired: 9,
      effects: ["Unstoppable"],
      buffs: {
        Speed: "30%",
        CDR: 30,
        Shield: 20
      },
      debuffs: {
        Speed: 50
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }
    },
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 3.501 * SPATK + 20 * (Level - 1) + 525,
          type: "special"
        }
	]
	}
  },

    "espeon": {
      "passive": {
          name: "Magic Bounce",
          description: "Negates a hindrance and grants brief hindrance immunity, while damaging and slowing the attacker (35s cooldown).",
          buff: {
            HindRed: "100%"
          },
          debuffs: {
            Speed: 30
          },
          debuffLabels: {
            Speed: "(DEBUFF) MoveSpeed Reduction"
          },
          formulas: [
          {
            label: "Damage - Counter",
            formula: (SPATK, Level) => 0.34 * SPATK + 8 * (Level - 1) + 140,
            type: "special"
          },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
        buff: {
          },
          debuffs: {
            Speed: 30
          },
          debuffLabels: {
            Speed: "(DEBUFF) MoveSpeed Reduction"
          },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.54 * SPATK + 12 * (Level - 1) + 230,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Psyshock",
      cooldown: 5,
      effects: ["Stun"],
      buff: {},
      debuffs: {
        Speed: 75
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage - First Hit",
          formula: (SPATK, Level) => 0.726 * SPATK + 14 * (Level - 1) + 374,
          type: "special"
        },
		{
          label: "Damage - Subsequent Hits",
          formula: (SPATK, Level) => 0.22 * SPATK + 4 * (Level - 1) + 112,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Stored Power",
      cooldown: 5,
       buff: {
        Speed: "70%",
        HPRegen: 37.5
       },
      debuffs: {
        Speed: 50
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage - First Hit",
          formula: (SPATK, Level) => 0.6 * SPATK + 9 * (Level - 1) + 300,
          type: "special"
        },
		{
          label: "Damage - Subsequent Hits",
          formula: (SPATK, Level) => 0.196 * SPATK + 2 * (Level - 1) + 90, // 25% do primeiro hit
		  type: "special",
        },
		{
          label: "Damage - Additional",
          formula: (SPATK, Level) => 0.26 * SPATK + 5 * (Level - 1) + 135, // 25% do primeiro hit
		  type: "special",
        }
      ]
    },
    "s21": {
      name: "Psybeam",
      cooldown: 7.5,
      buff:{},
      effects: ["Stun"],
      formulas: [
        {
          label: "Damage - Initial",
          formula: (SPATK, Level) => 0.91 * SPATK + 13 * (Level - 1) + 540,
          type: "special",
        },
        {
          label: "Damage - Additional",
          type: "text-only",
		      additionalText: "6% max HP of the first enemy hit as additional damage."
        },
        {
          label: "Damage - Additional (Stunned) Skill Plus",
          type: "text-only",
		      additionalText: "5% max HP of the enemy hit as additional damage if the initial target was stunned and if the secondary target can be stunned"
        },
      ]
    },
    "s22": {
      name: "Future Sight",
      cooldown: 7,
      buff: {},
      selfBuff: {
        CooldownFlat: 0.8
      },
      buffPlus:{
        levelRequired: 12,
        skillDamageMultiplier: 1.10, // 10% de aumento
        affectsBasicAttack: true,
      },
      formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 0.576 * SPATK + 9 * (Level - 1) + 338,
          type: "special",
		},
      {
          label: "Damage - Execute",
          type: "text-only",
		      additionalText: "10% of enemy missing HP."
        },
      ]
    },
	"ult": {
		name: "Psychic Solare",
    cooldown: 100,
    buff: {},
    buffPlus: {
      levelRequired: 8,
      effects: ["Unstoppable"],
      buffs:{
        Speed: "30%",
        CDR: 30,
        Shield: 20
      }
    },
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.87 * SPATK + 11 * (Level - 1) + 520,
          type: "special"
        }
	]
	}
  },

    "falinks": {
      "passive": {
          name: "Battle Armor",
          description: "Reduces enemy crit damage by 50% and carries extra Aeos Energy. Its multiple units take reduced damage, and its moves change effects based on formation.",
          buff: {
            DmgTaken: "10%"
          },
          formulas: [
          {
            label: "Damage - Taken from a single move or attack ",
            type: "text-only",
            additionalText: "110% of that move or attack's damage"
          },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff: {
      otherSkillsCooldownReduction: {
          s11: 2.5,
          s12: 2.5  
      }
    },
    debuffs: {
      Speed: 50
    },
    debuffLabels: {
      Speed: "(DEBUFF) MoveSpeed Reduction"
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Megahorn",
      cooldown: 8,
      buff:{},
      formulas: [
		{
          label: "Shield",
          formula: (ATK, Level) => 0.40 * ATK + 0 * (Level - 1) + 200,
          type: "physical",
		  additionalText: "Shield - Additional: 6% Max HP"
        },
		{
          label: "Damage (Column group, x2)",
          formula: (ATK, Level) => 1.7 * ATK + 10 * (Level - 1) + 200,
          type: "physical"
        },
        	{
          label: "Damage (No Retreat Formation)",
          formula: (ATK, Level) => 2.7 * ATK + 100 * (Level - 1) + 400,
          type: "physical",
		  additionalText: "Deals additional damage equal to 3% of the enemies' max HP. This additional damage is capped at 1000."
        },
		{
          label: "Damage (Dispatch formation Trooper)",
          formula: (ATK, Level) => 0.595 * ATK + 4 * (Level - 1) + 95,
          type: "physical",
		  additionalText: "Damage (Dispatch formation Trooper): Trooper damage becomes additional to Column formation hitting the same target."
        },
		{
          label: "Shield Skill Plus",
          formula: (ATK, Level) => 0.8 * ATK + 0 * (Level - 1) + 400,
          type: "physical",
        },
        {
          label: "Shield - Additional Skill Plus",
          formula: (HP, Level) => 0.12 * HP,
          type: "hp",
        },
      ]
    },
    "s12": {
      name: "Iron Head",
      cooldown: 7.5,
      buff:{},
      debuffs: {
        Speed: 50
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buffPlus: {
        levelRequired: 10,
        buffs: {
          ATK: 400
        },
      },
      formulas: [
		{
          label: "Shield",
          formula: (ATK, Level) => 0.6 * ATK + 10 * (Level - 1) + 250,
          type: "physical"
        },
        {
          label: "Shield - Additional",
          formula: (HP, Level) => 0.1 * HP,
          type: "hp",
        },
		{
          label: "Damage",
          formula: (ATK, Level) => 1.5 * ATK + 8 * (Level - 1) + 150,
          type: "physical"
        },
		{
          label: "Damage (Dispatch formation per Trooper)",
          formula: (ATK, Level) => 0.9 * ATK + 2 * (Level - 1) + 100,
          type: "physical"
		}
      ]
    },
    "s21": {
      name: "No Retreat",
      cooldown: 5,
      effects: ["Unstoppable"],
      buff:{
        Speed: "-10%",
        ATK: "25%",
        DmgTaken: 20
      },
      buffPlus:{
        levelRequired: 12,
        buffs:{
          ATK: "15%",
          DmgTaken: 10
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2 * ATK + 10 * (Level - 1) + 300,
          type: "physical"
        },
		{
          label: "Damage - Brass basic attacks under Iron Head Buffs in No Retreat formation",
          formula: (ATK, Level) => 0.45 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Trooper basic attacks under Iron Head Buffs in No Retreat formation",
          formula: (ATK, Level) => 0.32 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Trooper boosted attacks under Iron Head Buffs in No Retreat formation",
          formula: (ATK, Level) => 0.40 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Beat Up",
      cooldown: 5,
      formulas: [
		{
          label: "Damage - Charge (x2)",
          formula: (ATK, Level) => 0.70 * ATK + 3 * (Level - 1) + 100,
          type: "physical"
        },
		{
          label: "Damage - Trooper attacks in Dispatch formation",
          formula: (ATK, Level) => 0.60 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "HP - Trooper in Dispatch formation",
          formula: (ATK, Level) => 0 * ATK + 150 * (Level - 1) + 900,
          type: "physical"
        },
		{
          label: "Healing Skill Plus",
          formula: (ATK, Level) => 1.2 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
      ]
    },
	"ult": {
		name: "Dust Devil Formation",
    cooldown: 112,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Unstoppable"],
      buffs:{
        DmgTaken: 30,
        Speed: "30%",
        Shield: 30
      },
      debuffs: {
        Speed: 20
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }
    },
		formulas: [
        {
          label: "Damage - per Hit",
          formula: (ATK, Level) => 0.9 * ATK + 10 * (Level - 1) + 110,
          type: "physical"
        }
	 ]
	}
  },
  
    "garchomp": {
      "passive": {
          name: "Rough Skin",
          description: "Reflects 30% of damage taken from nearby melee attackers back to them as physical damage (2s cooldown).",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff:{
      AtkSPD: 30,
      Lifesteal: 30,
    },
      skillDamageMultiplier: 1.10, // 10% de aumento
      affectsBasicAttack: true,
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.2 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Attack Speed - % Increase",
          formula: (ATK, Level) => 0 * ATK + 3 * (Level - 1) + 28,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Earthquake",
      cooldown: 6.5,
      buff:{},
      debuffs: {
        Speed: 20
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buffPlus: {
        levelRequired: 13,
        debuffs: {
          Speed: 20
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
		{
          label: "Damage - Initial",
          formula: (ATK, Level) => 1.13 * ATK + 7 * (Level - 1) + 175,
          type: "physical"
        },
		{
          label: "Damage - Aftershock (2x)",
          formula: (ATK, Level) => 0.58 * ATK + 6 * (Level - 1) + 88,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Dragon Rush",
      cooldown: 5.5,
      buff: {
        DmgTaken: 30
      },
      buffPlus: {
        levelRequired: 11,
        effects: ["Unstoppable"]
      },
       conditionalBuffs: {
        // Quando s22 (Dragon Claw) estiver ativa, adicionar Stun
        requiredSkill: "s22",
        effectsWhenActive: ["Stun"]
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 1.21 * ATK + 8 * (Level - 1) + 200,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Dig",
      cooldown: 7.5,
      effects: ["Untargetable"],
      buff:{},
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.3 * ATK + 8 * (Level - 1) + 240,
          type: "physical"
        },
		{
          label: "Defenses - Increase",
          formula: (ATK, Level) => 0 * ATK + 25 * (Level - 1) + 25,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Dragon Claw",
      cooldown: 4,
      buff:{},
      debuffs: {
        Speed: 45
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
        conditionalDebuffs: {
          // Quando s12 (Dragon Rush) estiver ativa, aumentar debuff
          requiredSkill: "s12",
          debuffsWhenActive: {
            Speed: 60 // Valor aumentado
          }
        },
      formulas: [
		{
          label: "Damage - First Hit",
          formula: (ATK, Level) => 0.8 * ATK + 5 * (Level - 1) + 140,
          type: "physical"
        },
		{
          label: "Damage - Second Hit",
          formula: (ATK, Level) => 0.98 * ATK + 6 * (Level - 1) + 170,
          type: "physical"
        },
		{
          label: "Damage - Initial Skill Plus",
          formula: (ATK, Level) => 0.96 * ATK + 5 * (Level - 1) + 153,
          type: "physical"
        },
		{
          label: "Damage - Second Skill Plus",
          formula: (ATK, Level) => 1.15 * ATK + 6 * (Level - 1) + 184,
          type: "physical"
        },
      ]
    },
	"ult": {
		name: "Livid Outrage",
    cooldown: 112,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Unstoppable"],
      buffs: {
        DmgTaken: 30,
        Speed: "30%",
        Shield: 30
      },
      debuff: {
        Speed: 30
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }
    },
		formulas: [
        {
          label: "Damage - First Hit",
          formula: (ATK, Level) => 2.27 * ATK + 10 * (Level - 1) + 330,
          type: "physical"
        },
		{
          label: "Damage - Second Hit",
          formula: (ATK, Level) => 2.67 * ATK + 11 * (Level - 1) + 450,
          type: "physical"
        },
		{
          label: "Damage - Third Hit",
          formula: (ATK, Level) => 3.07 * ATK + 12 * (Level - 1) + 570,
          type: "physical"
        },
		{
          label: "Damage - Fourth Hit",
          formula: (ATK, Level) => 3.07 * ATK + 13 * (Level - 1) + 920,
          type: "physical"
        },
		{
          label: "Damage - Fifth Hit",
          formula: (ATK, Level) => 3.07 * ATK + 14 * (Level - 1) + 1270,
          type: "physical"
        }
	 ]
	}
  },

  	"gardevoir": {
      "passive": {
          name: "Synchronize",
          description: "Reflects slows and damage-over-time effects back to the attacker for 3s (8s cooldown).",
          buff: {
          },
          debuffs: {
            Speed: 40
          },
          debuffLabels: {
            Speed: "(DEBUFF) MoveSpeed Reduction"
          },
          formulas: [
          {
            label: "Damage - DoT Applied (4x)",
            formula: (SPATK, Level) => 0.15 * SPATK + 0 * (Level - 1) + 15,
            type: "special"
          }
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff:{},
    debuffs: {
      SpDEF: 10
    },
    debuffLabels: {
      SpDEF: "(DEBUFF) SpecialDefense Reduction"
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.44 * SPATK + 10 * (Level - 1) + 180,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Psychic",
      cooldown: 7.5,
      buff:{},
      debuffs: {
        Speed: 50,
        SpDEF: 81
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction",
        SpDEF: "(DEBUFF) SpecialDefense Reduction"
      },
      selfBuffPlus: {
        levelRequired: 13,
        buffs: {
          CooldownFlat: 1
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.85 * SPATK + 16 * (Level - 1) + 440,
          type: "special"
        },
		{
          label: "Damage - DoT (5 Ticks)",
          formula: (SPATK, Level) => 0.085 * SPATK + 2 * (Level - 1) + 44,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Moonblast",
      cooldown: 7,
      buff:{},
      effects: ["Stun"],
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.66 * SPATK + 13 * (Level - 1) + 340,
          type: "special"
        },
		{
          label: "Shield",
          formula: (SPATK, Level) => 0.69 * SPATK + 0 * (Level - 1) + 345, // 25% do primeiro hit
    		  type: "special",
        }
      ]
    },
    "s21": {
      name: "Psyshock",
      cooldown: 11,
      buff:{
        CDR: 15
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.90 * SPATK + 10 * (Level - 1) + 430,
          type: "special"
        },
		{
          label: "Damage - First Hit Skill Plus",
          formula: (SPATK, Level) => 0.90 * SPATK + 10 * (Level - 1) + 430,
          type: "special"
        },
		{
          label: "Damage - Second Hit Skill Plus",
          formula: (SPATK, Level) => 0.95 * SPATK + 10 * (Level - 1) + 451,
          type: "special"
        },
		{
          label: "Damage - Third Hit Skill Plus",
          formula: (SPATK, Level) => 1 * SPATK + 10 * (Level - 1) + 475,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Future Sight",
      cooldown: 9,
      buff: {
        Speed: "40%"
      },
      selfBuff: {
        CooldownPercent: 75
      },
      selfBuffPlus: {
        levelRequired: 11,
        buffs:{
          CooldownPercent: 15
        }
      },
      formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 1.5645 * SPATK + 22 * (Level - 1) + 924,
          type: "special"
		}
      ]
    },
	"ult": {
		name: "Fairy Singularity",
    cooldown: 89,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      buffs: {
        Speed: "30%",
        CDR: 30,
        Shield: 20
      }
    },
		formulas: [
        {
          label: "Damage - Final Tick",
          formula: (SPATK, Level) => 0.66 * SPATK + 8 * (Level - 1) + 400,
          type: "special"
        },
		{
          label: "Damage - 4 Ticks",
          formula: (SPATK, Level) => 0.33 * SPATK + 4 * (Level - 1) + 200,
          type: "special"
        }
	]
	}
  },

  	"gengar": {
      "passive": {
          name: "Levitate",
          description: "Gains 20% movement speed after being out of combat for 5 seconds.",
          buff: {
            Speed: "20%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 0.40 * ATK + 0 * (Level - 1) + 1000,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.84 * SPATK + 8 * (Level - 1) + 160,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Dream Eater",
      cooldown: 7,
      effects: ["Sleep"],
      buff: {
      otherSkillsCooldownReduction: {
          s12: 2,
          s21: 2 
        },
      },
      selfBuff: {
        CooldownPercent: 100
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 2.6 * SPATK + 12 * (Level - 1) + 550,
          type: "special"
        },
		{
          label: "Healing",
          formula: (SPATK, Level) => 0.5 * SPATK + 8 * (Level - 1) + 300,
          type: "special"
        },
		{
          label: "Damage Skill Plus",
          formula: (SPATK, Level) => 2.93 * SPATK + 14 * (Level - 1) + 620,
          type: "special"
        },
		{
          label: "Healing Skill Plus",
          formula: (SPATK, Level) => 0.6 * SPATK + 10 * (Level - 1) + 360,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Sludge Bomb",
      cooldown: 8,
      effects: ["Poison"],
      buff:{},
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.06 * SPATK + 6 * (Level - 1) + 230,
          type: "special"
        },
        {
          label: "Damage - Poison (10 Ticks)",
          type: "text-only",
		      additionalText: "1% Enemy Max HP every 0.5s (as special damage)"
        },
      ]
    },
    "s21": {
      name: "Shadow Ball",
      cooldown: 4.5,
      buff: {},
      debuffs: {
        Speed: 90
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.152 * SPATK + 32 * (Level - 1) + 756,
          type: "special"
        },
		{
          label: "Sp. Defense Reduction",
          formula: (SPATK, Level) => 0 * SPATK + 5 * (Level - 1) + 80,
          type: "special"
        },
		{
          label: "Damage Skill Plus",
          formula: (SPATK, Level) => 1.28 * SPATK + 36 * (Level - 1) + 840,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Hex",
      cooldown: 7.5,
      effects: ["Invincible"],
      buff:{},
      selfBuff: {
        CooldownPercent: 90
      },
      formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 1.05 * SPATK + 3 * (Level - 1) + 150,
          type: "special"
		},
		{
		  label: "Damage Skill Plus",
          formula: (SPATK, Level) => 1.25 * SPATK + 4 * (Level - 1) + 200,
          type: "special"
		}
      ]
    },
	"ult": {
		name: "Phantom Ambush",
    cooldown: 112,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Unstoppable", "Invisible", "Invincible"],
      buffs: {
        Speed: "110%",
        Shield: 20
      },
      debuffs: {
        Speed: 50
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }
    },
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 2.63 * SPATK + 12 * (Level - 1) + 560,
          type: "special"
        }
	]
	}
  },

    "glaceon": {
      "passive": {
          name: "Snow Cloak",
          description: "Negates a hindrance, grants brief invincibility and stealth, with a long cooldown reset on respawn.",
          effects: ["Invisible", "Invincible"],
          buff: {
            HindRed: "100%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 0.39 * ATK + 4 * (Level - 1) + 70,
          type: "special"
        },
		{
          label: "Damage - Boosted (Eevee)",
          formula: (SPATK, Level) => 0.4485 * SPATK + 5 * (Level - 1) + 81,
          type: "special"
        },
		{
          label: "Damage - Boosted (Glaceon)",
          formula: (SPATK, Level) => 0.47 * SPATK + 5 * (Level - 1) + 90,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Icicle Spear",
      cooldown: 5,
      buff: {
        selfDamageMultiplier: 1.35,
        otherSkillsCooldownReduction: {
          s21: 2, 
          s22: 2.5
        }
      },
      formulas: [
        {
          label: "Damage - per Ice Crystal",
          formula: (SPATK, Level) => 0.37 * SPATK + 4 * (Level - 1) + 97,
          type: "special"
        },
        {
          label: "Damage - Additional Skill Plus",
          type: "text-only",
		      additionalText: "0.5% of their remaining HP."
        },
      ]
    },
    "s12": {
      name: "Icy Wind",
      cooldown: 6.5,
      buff:{},
      debuffs: {
        Speed: 8
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage - per Ice Crystal",
          formula: (SPATK, Level) => 0.20 * SPATK + 2 * (Level - 1) + 35,
          type: "special"
        },
        {
          label: "Damage - Additional Skill Plus",
          type: "text-only",
		      additionalText: "1.5% of their remaining HP."
        },
      ]
    },
    "s21": {
      name: "Ice Shard",
      cooldown: 8.5,
      buff:{
        Speed: "50%",
        AtkSPD: 60
      },
      debuffs: {
        Speed: 30
      },
      buffPlus:{
        levelRequired: 12,
        buffs: {
          AtkSPD: 40
        }
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (SPATK, Level) => 0.52 * SPATK + 6 * (Level - 1) + 100,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Freeze Dry",
      cooldown: 8.5,
      effects: ["Freeze"],
      buff:{
        SpATK: "50%",
      },
      debuffs: {
        Speed: 30
      },
      debuffLabels:{
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 0.71 * SPATK + 5 * (Level - 1) + 226,
          type: "special"
		}
      ]
    },
	"ult": {
		name: "Glacial Stage",
    cooldown: 100,
    buff: {},
    buffPlus: {
      levelRequired: 8,
      buffs: {
        Speed: "80%",
        AtkSPD: 35,
        Shield: 20
      },
      debuffs: {
        Speed: 50
      },
      debuffLabels:{
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }
    },
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1 * SPATK + 7 * (Level - 1) + 320,
          type: "special"
        }
	]
	}
  },

    "goodra": {
      "passive": {
          name: "Gooey",
          description: "When hit, may spread slime that damages, slows, and stacks a debuff on enemies. Also heals in tall grass while boosting its attack gauge.",
          buff: {
          },
          debuffs: {
            AtkSPD: 50,
            Speed: 10
          },
          debuffLabels: {
            AtkSPD: "(DEBUFF) AttackSpeed Reduction",
            Speed: "(DEBUFF) MoveSpeed Reduction"
          },
          formulas: [
          {
          label: "Damage (Slime)",
          formula: (SPATK, Level) => 0.6 * SPATK + 6 * (Level - 1) + 120,
          type: "special"
          },
          {
          label: "Healing (Per Tick)",
          formula: (SPATK, Level) => 0 * SPATK + 3 * (Level - 1) + 50,
          type: "special",
          additionalText: "Additional 1.2% Missing HP per tick"
          }
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff:{
        otherSkillsCooldownReduction: {
          s21: 1.5, 
          s22: 1.5,
          s11: 1.5,
          s12: 1.5 
        },
    },
    debuffs: {
      Speed: 50
    },
    debuffLabels :{
      Speed: "(DEBUFF) MoveSpeed Reduction"
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.57 * SPATK + 6 * (Level - 1) + 190,
          type: "special"
        },
        {
          label: "Damage - Additional (Melee)",
          formula: (HP, Level) => 0.03 * HP,
          type: "hp"
        },
      ]
	},

    "s11": {
      name: "Muddy Water",
      cooldown: 4.5,
      buff: {},
      debuffs: {
        ATK: 15,
        SpATK: 15
      },
      debuffLabels: {
        ATK: "(DEBUFF) Attack Reduction",
        SpATK: "(DEBUFF) SpecialAttack Reduction"
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.32 * SPATK + 10 * (Level - 1) + 250,
          type: "special"
        },
		{
          label: "Defense & Sp. Defense per Stack",
          formula: (SPATK, Level) => 0 * SPATK + 6 * (Level - 1) + 72,
          type: "special"
        },
		{
          label: "Defense & Sp. Defense per Stack Skill Plus",
          formula: (SPATK, Level) => 0 * SPATK + 10 * (Level - 1) + 108,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Dragon Pulse",
      cooldown: 6,
      formulas: [
        {
          label: "Damage (Center - per hit up to 4 hits)",
          formula: (SPATK, Level) => 0.68 * SPATK + 5 * (Level - 1) + 230,
          type: "special"
        },
		{
          label: "Damage (Side - per hit up to 4 hits)",
          formula: (SPATK, Level) => 0.408 * SPATK + 3 * (Level - 1) + 138,
          type: "special"
        },
		{
          label: "Healing (Per hit up to 4x based on number of Center hits)",
          formula: (SPATK, Level) => 0 * SPATK + 8 * (Level - 1) + 30,
          type: "special",
		  additionalText: "10% Missing HP"
        },
		{
          label: "Healing (Gooey Center- Per hit up to 4x based on number of Center hits)",
          formula: (SPATK, Level) => 0 * SPATK + 8 * (Level - 1) + 30,
          type: "special",
		  additionalText: "11% Missing HP"
        },
		{
          label: "Healing (Per hit up to 4x based on number of Center hits) Skill Plus",
          formula: (SPATK, Level) => 0 * SPATK + 8 * (Level - 1) + 30,
          type: "special",
		  additionalText: "12% Missing HP"
        },
		{
          label: "Healing (Gooey Center- Per hit up to 4x based on number of Center hits) Skill Plus",
          formula: (SPATK, Level) => 0 * SPATK + 8 * (Level - 1) + 30,
          type: "special",
		  additionalText: "13% Missing HP"
        }
      ]
    },
    "s21": {
      name: "Power Whip",
      cooldown: 7,
      buff: {},
      debuffs: {
        Speed: 80
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }, 
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.11 * SPATK + 9 * (Level - 1) + 370,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Acid Spray",
      cooldown: 7.5,
      buff: {},
      debuffs: {
        Speed: 80
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }, 
      formulas: [
		{
		  label: "Damage (Initial)",
          formula: (SPATK, Level) => 0.46 * SPATK + 4 * (Level - 1) + 150,
          type: "special"
		},
		{
		  label: "Damage (Dash 2x hits)",
          formula: (SPATK, Level) => 0.46 * SPATK + 4 * (Level - 1) + 150,
          type: "special"
		}
      ]
    },
	"ult": {
		name: "Right as Rain",
    cooldown: 89,
    buff: {},
    buffPlus: {
      levelRequired: 9,
      buffs: {
        Shield: 40,
        Speed: "50%"
      }
    },
		formulas: [
      		{
		  label: "Healing (13 ticks)",
          formula: (HP, Level) => 0.04 * HP,
          type: "hp"
		}
	]
	}
  },

  	"greedent": {
        "passive": {
          name: "Cheek Pouch",
          description: "Eating berries heals Greedent and stashes an Oran berry in its tail, which drops when hit and can be eaten by any player for healing.",
          buff: {
          },
          formulas: [
          {
          label: "Healing - Oran Berry",
          formula: (HP, Level) => 0.45 + 5 * (Level - 1) + 0.02 * HP,
          type: "hp"
          },
          {
          label: "Healing - After Eating Any Berry",
          formula: (HP, Level) => 0.23 + 3 * (Level - 1) + 0.01 * HP,
          type: "hp"
          }
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 0.75 * ATK + 4 * (Level - 1) + 80,
          type: "physical"
        }
      ]
	},

    "1a": {
      name: "Bullet Seed",
      cooldown: 4.5,
      buff: {},
      debuffs: {
        Speed: 30
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
		{
          label: "Damage - per Seed",
          formula: (ATK, Level) => 0.33 * ATK + 4 * (Level - 1) + 80,
          type: "physical"
        },
		{
          label: "Damage - per Seed Skill Plus",
          formula: (ATK, Level) => 0.35 * ATK + 4 * (Level - 1) + 90,
          type: "physical"
        }
      ]
    },
    "1b": {
      name: "Belch",
      cooldown: 5,
      buff: {},
      selfBuff: {
        CooldownFlat: 1
      },
      debuffs: {
        Speed: 40
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 1.7 * ATK + 30 * (Level - 1) + 650,
          type: "physical"
        },
		{
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 1.8 * ATK + 32 * (Level - 1) + 695,
          type: "physical"
        }
      ]
    },
    "2a": {
      name: "Stuff Cheeks",
      cooldown: 8,
      buff:{
        Speed: "70%"
      },
      formulas: [
      {
          label: "Shield - per Berry consumed",
          formula: (HP, Level) => 0.018 * HP,
          type: "hp"
        },
      ]
    },
    "2b": {
      name: "Covet",
      cooldown: 10,
      buff:{
        HindRed: 100,
        Speed: "110%",
        otherSkillsCooldownReduction: {
          "1b": 100
        },
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 0.55 * ATK + 4 * (Level - 1) + 180,
          type: "physical"
        },
		{
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 0.59 * ATK + 5 * (Level - 1) + 200,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Berry Belly Flop",
    cooldown: 100,
    buff: {},
    buffPlus: {
      levelRequired: 9,
      effects: ["Unstoppable"],
      buffs: {
        HPRegen: 15,
        Speed: "30%",
        Shield: 40,
      },
        otherSkillsCooldownReduction :{
          "1b": 4.5,
          "1b": 5,
          "2a": 8,
          "2b": 10
        }
    },
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.41 * ATK + 22 * (Level - 1) + 1050,
          type: "physical"
        }
	 ]
	}
  },

    "greninja": {
      "passive": {
          name: "Torrent",
          description: "While at 50% HP or below, increases Attack by 5% and movement speed by 12%.",
          buff: {
            Speed: "12%",
            ATK: "5%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff:{
      otherSkillsCooldownReduction:{
        s11: 0.5,
        s12: 0.5
      }
    },
    debuffs: {
      Speed: 25
    },
    debuffLabels: {
      Speed: "(DEBUFF) MoveSpeed Reduction"
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.2 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Water Shuriken",
      cooldown: 6,
      buff: {
        Speed: "25%"
      },
      debuffs: {
        Speed: 35
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Redutcion"
      },
      formulas: [
		{
          label: "Damage - per Shuriken",
          formula: (ATK, Level) => 1.35 * ATK + 8 * (Level - 1) + 210,
          type: "physical"
        },
		{
          label: "Healing (per Unique Enemy)",
          formula: (ATK, Level) => 0.15 * ATK + 2 * (Level - 1) + 25,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Surf",
      cooldown: 9,
      buff:{},
      selfBuff: {
        CooldownFlat: 9
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 2 * ATK + 8 * (Level - 1) + 370,
          type: "physical"
        },
		{
          label: "Damage - Bonus",
          formula: (ATK, Level) => 1 * ATK + 4 * (Level - 1) + 185,
          type: "physical"
        },
		{
          label: "Healing",
          formula: (ATK, Level) => 0.452 * ATK + 5 * (Level - 1) + 82,
          type: "physical"
        },
		{
          label: "Healing Skill Plus",
          formula: (ATK, Level) => 0.5424 * ATK + 6 * (Level - 1) + 150,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Double Team",
      cooldown: 8,
      effects: ["Unstoppable"],
      buff:{},
      selfBuffPlus: {
        levelRequired: 13,
        buffs: {
        CooldownFlat: 1
        }
      },
      formulas: [
      ]
    },
    "s22": {
      name: "Smokescreen",
      cooldown: 13,
      effects: ["Unstoppable", "Invisible", "Vision Reduced"],
      buff: {
        Speed: "10%"
      },
      buffPlus: {
        levelRequired: 13,
        buffs:{
          ATK: "20%"
        }
      },
      formulas: [
		{
          label: "Damage - Boosted (Replacement)",
          formula: (ATK, Level) => 1.4 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Waterburst Shuriken",
    cooldown: 100,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Unstoppable"],
      buffs: {
        Speed: "30%",
        AtkSPD: 35,
        Shield: 20
      },
      debuffs: {
        Speed: 50
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }
    },
		formulas: [
        {
          label: "Damage (2x)",
          formula: (ATK, Level) => 2.2 * ATK + 11 * (Level - 1) + 420,
          type: "physical"
        }
	 ]
	}
  },

  	"gyarados": {
      "passive": {
          name: "Moxie",
          description: "Knockouts or assists reduce move cooldowns by 30%. Passively gains bonus HP, Attack, and attack speed permanently.",
          buff: {
            CDR: 30,
            AtkSPD: "40%",
            ATK: 100,
            HP: 1200
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.4 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Dragon Breath",
      cooldown: 5,
      effects: ["Paralyze"],
      buff: {
        AtkSPD: 70
      },
      debuffs: {
        Speed: 30
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 1.93 * ATK + 22 * (Level - 1) + 325,
          type: "physical"
        },
		{
          label: "Damage - Basic",
          formula: (ATK, Level) => 1.2 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.6 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
				{
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 2.32 * ATK + 26 * (Level - 1) + 390,
          type: "physical"
        },
		{
          label: "Damage - Basic Skill Plus",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted Skill Plus",
          formula: (ATK, Level) => 1.7 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Aqua Tail",
      cooldown: 5,
      effects: ["Unstoppable"],
      buff:{},
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 2 * ATK + 16 * (Level - 1) + 405,
          type: "physical"
        },
		{
          label: "Damage - Bonus",
          formula: (ATK, Level) => 3.38 * ATK + 28 * (Level - 1) + 680,
          type: "physical"
        },
		{
          label: "Healing",
          formula: (ATK, Level) => 3.887 * ATK + 32 * (Level - 1) + 782,
          type: "physical"
        },
		{
          label: "Healing Skill Plus",
          formula: (ATK, Level) => 0.5424 * ATK + 6 * (Level - 1) + 150,
          type: "physical"
        },
        {
          label: "Damage - Additional Skill Plus",
          type: "text-only",
		      additionalText: "20% missing HP damage"
        },
      ]
    },
    "s21": {
      name: "Waterfall",
      cooldown: 6,
      buff: {},
      selfBuffPlus:{
        levelRequired: 12,
        buffs: {
        CooldownFlat: 1
        }
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 1.29 * ATK + 6 * (Level - 1) + 225,
          type: "physical",
        },
        	{
          label: "Shield",
          formula: (HP, Level) => 0.1 * HP + 200,
          type: "hp",
        }
      ]
    },
    "s22": {
      name: "Bounce",
      cooldown: 8.5,
      effects: ["Unstoppable"],
      buff: {},
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 1.78 * ATK + 14 * (Level - 1) + 350,
          type: "physical"
        },
		{
          label: "Shield",
          formula: (ATK, Level) => 2.34 * ATK + 0 * (Level - 1) + 520,
          type: "physical"
        },
		{
          label: "Shield Skill Plus",
          formula: (ATK, Level) => 3.042 * ATK + 0 * (Level - 1) + 676,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Dragon Current",
    cooldown: 112,
    buff: {},
    buffPlus: {
      levelRequired: 9,
      effects: ["Untargetable"],
      buffs: {
        Speed: "95%",
        CDR: 30,
        Shield: 20
      }
    },
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.62 * ATK + 12 * (Level - 1) + 325,
          type: "physical"
        },
		{
          label: "Damage - Whirlpool level",
          formula: (ATK, Level) => 2.43 * ATK + 17 * (Level - 1) + 488,
          type: "physical"
        },
		{
          label: "Damage - Whirlpool (5 Ticks)",
          formula: (ATK, Level) => 0.162 * ATK + 1 * (Level - 1) + 33,
          type: "physical"
        },
		{
          label: "Damage - Water Spout level",
          formula: (ATK, Level) => 3.24 * ATK + 23 * (Level - 1) + 650,
          type: "physical"
        }
	 ]
	}
  },

    "hooh": {
      "passive": {
          name: "Regenarator",
          description: "Recovers 3% max HP every 2s when not damaged by enemies for 3s. Ho-Oh gains additional healing, and shield damage doesn't interrupt this effect.",
          buff: {
            HPRegen: "3%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff: {
      Speed: "-30%"
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.5 * ATK + 0 * (Level - 1) + 0,
          type: "physical",
        },
        {
          label: "Heal",
          formula: (HP, Level) => 0.04 * HP,
          type: "hp",
        }
      ]
	},

    "s11": {
      name: "Sacred Fire",
      cooldown: 12,
      effects: ["Stun", "Burn"],
      buff:{
        ATK: "15%",
        Speed: "30%"
      },
      debuffs: {
        ATK: 10
      },
      debuffLabels: {
        ATK: "(DEBUFF) Attack Reduction"
      },
      buffPlus: {
        levelRequired: 13,
        debuffs: {
          ATK: 10
        },
        debuffLabels: {
          ATK: "(DEBUFF) Attack Reduction"
        }
      },
      formulas: [
		{
          label: "Damage - Fireball",
          formula: (ATK, Level) => 0.56 * ATK + 3 * (Level - 1) + 135,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Fire Spin",
      cooldown: 9,
      effects: ["Stun"],
      buff:{
        Speed: "-40%"
      },
      debuffs: {
        Speed: 80
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
		{
          label: "Damage (Vortex)",
          formula: (ATK, Level) => 0.41 * ATK + 1 * (Level - 1) + 40,
          type: "physical"
        },
		{
          label: "Damage (Heatwave)",
          formula: (ATK, Level) => 2.05 * ATK + 4 * (Level - 1) + 208,
          type: "physical",
        },
                {
          label: "Shield",
          formula: (HP, Level) => 0.3 * HP,
          type: "hp",
        }
      ]
    },
    "s21": {
      name: "Flamethrower",
      cooldown: 6,
      effects: ["Stun", "Burn"],
      buff:{
        Speed: "-15%"
      },
      debuffs: {
        Speed: 30,
        ATK: 20,
        SpATK: 20
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction",
        ATK: "(DEBUFF) Attack Reduction",
        SpATK: "(DEBUFF) SpecialAttack Reduction"
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 0.45 * ATK + 2 * (Level - 1) + 60,
          type: "physical",
        },
		{
          label: "Healing (per tick of flamethrower)",
          formula: (ATK, Level) => 0.24 * ATK + 0 * (Level - 1) + 24,
          type: "physical",
        },
		{
          label: "Burn Damage",
          formula: (ATK, Level) => 0.20 * ATK + 0 * (Level - 1) + 20,
          type: "physical",
        }
      ]
    },
    "s22": {
      name: "Sky Attack",
      cooldown: 9,
      buff:{
        DmgTaken: 30
      },
      debuffs: {
        Speed: 30,
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction",
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 1.5 * ATK + 19 * (Level - 1) + 500,
          type: "physical"
        },
		{
          label: "Damage (Ground)",
          formula: (ATK, Level) => 0.20 * ATK + 0 * (Level - 1) + 30,
          type: "physical"
        },
		{
          label: "Healing Skill Plus",
          formula: (ATK, Level) => 0.7 * ATK + 0 * (Level - 1) + 100,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Rekindling Flame",
    cooldown: 134,
    buff: {},
    buffPlus: {
      levelRequired: 9,
      buffs: {
        Speed: "80%",
        Shield: 20
      }
    },
		formulas: [
	 ]
	}
  },

  	"hoopa": {
      "passive": {
          name: "Magician",
          description: "Steals a berry or Aeos energy from the enemy side to warp in front of Hoopa, with a reduced cooldown if no berry is stolen.",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.53 * SPATK + 8 * (Level - 1) + 160,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Phantom Force",
      cooldown: 6.5,
      buff: {},
      debuffs: {
        Speed: 40
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      allyBuffs: {
        HPRegen: 15
      },
      allyBuffLabels: {
        HPRegen: "(ALLY BUFF) HPRegen Increase"
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.1 * SPATK + 14 * (Level - 1) + 320,
          type: "special"
        },
		{
          label: "Damage - per flame (2 flames)",
          formula: (SPATK, Level) => 0.55 * SPATK + 7 * (Level - 1) + 160,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Shadow Ball",
      cooldown: 4.5,
      effects: ["Stun"],
      buff: {},
      debuffs: {
        Speed: 50,
        SpDEF: "30%"
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction",
        SpDEF: "(DEBUFF) SpecialDefense Reduction"
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.90 * SPATK + 0 * (Level - 1) + 270,
          type: "special"
        },
		{
          label: "Damage - Additional",
          formula: (SPATK, Level) => 0.25 * SPATK + 0 * (Level - 1) + 75,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Hyperspace Hole",
      cooldown: 12,
      buff:{},
      buffPlus: {
        levelRequired: 10,
        buffs:{
          Speed: "70%"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.12 * SPATK + 9 * (Level - 1) + 370,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Trick",
      cooldown: 7.5,
      buff:{
        Speed: "60%"
      },
      buffPlus: {
        levelRequired: 10,
        buffs: {
          HPRegen: 10
        }
      },
      formulas: [
		{
		  label: "Shield",
          formula: (SPATK, Level) => 2 * SPATK + 30 * (Level - 1) + 600,
          type: "shield"
		},
		{
		  label: "Damage - Shadow Ball Bonus",
          formula: (SPATK, Level) => 0.09 * SPATK + 0 * (Level - 1) + 27,
          type: "special",
		  additionalText: "This can trigger multiple times."
		}
      ]
    },
	"ult": {
		name: "Rings Unbound",
    cooldown: 112,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Invincible", "Unstoppable"],
      buffs: {
        HP: "40%",
        Speed: "30%",
        CDR: 30,
        Shield: 20
      }
    },
		formulas: [
		{
          label: "Auto Attack Damage",
          formula: (SPATK, Level) => 0.5 * SPATK + 5 * (Level - 1) + 150,
          type: "special"
        },
	]
	},
  "ult1": {
		name: "Hyperspace Fury",
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Stun"],
      buffs: {
      }
    },
    formulas: [
		{
          label: "Hyperspace Fury - Damage (7x)",
          formula: (SPATK, Level) => 0.15 * SPATK + 2 * (Level - 1) + 40,
          type: "special"
        },
	  ]
  },
  "ult2": {
		name: "Psybeam",
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Stun"],
      buffs: {
        HindRed: 100
      }
    },
    formulas: [
		{
          label: "Psybeam - Damage",
          formula: (SPATK, Level) => 1.75 * SPATK + 12 * (Level - 1) + 590,
          type: "special"
        }
	  ]
  },
},

  	"inteleon": {
      "passive": {
          name: "Sniper",
          description: "Becomes camouflaged near walls, gaining guaranteed critical hit stacks over time. Higher evolutions can hold more stacks, and crits deal 250% damage.",
          effects: ["Untargetable"],
          buff: {
            CritDmg: "250%",
            Speed: "-10%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff:{
      CritRate: 20
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (SPATK, Level) => 0.482 * SPATK + 4 * (Level - 1) + 90,
          type: "special"
        },
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.548 * SPATK + 6 * (Level - 1) + 100,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Fell Stinger",
      cooldown: 6.5,
      effects: ["Untargetable"],
      buff: {},
      selfBuff: {
        CooldownPercent: 50
      },
      selfBuffPlus: {
        levelRequired: 11,
        buffs: {
          CooldownFlat: 1
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.63 * SPATK + 5 * (Level - 1) + 200,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Acrobatics",
      cooldown: 7,
      buff:{
        otherSkillsCooldownReduction: {
          s22: "40%"
        }
      },
      debuffs:{
        Speed: 30
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.62 * SPATK + 8 * (Level - 1) + 172,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Snipe Shot",
      cooldown: 7,
      buff: {
        SpDEFPen: 25
      },
      selfBuffPlus: {
        levelRequired: 13,
        buffs: {
          CooldownFlat: 1
        }
      },
      formulas: [
        {
          label: "Damage (Close)",
          formula: (SPATK, Level) => 0.58 * SPATK + 4 * (Level - 1) + 172,
          type: "special"
        },
		{
          label: "Damage (Mid)",
          formula: (SPATK, Level) => 0.85 * SPATK + 8 * (Level - 1) + 256,
          type: "special"
        },
		{
          label: "Damage (Far)",
          formula: (SPATK, Level) => 1.14 * SPATK + 10 * (Level - 1) + 344,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Liquidation",
      cooldown: 6,
      buff:{
        Speed: "-60%",
      },
      skillDamageMultiplier: 1.20,
      affectsBasicAttack: true,
      formulas: [
		{
		  label: "Damage (per bullet)",
          formula: (SPATK, Level) => 0.142 * SPATK + 1 * (Level - 1) + 4,
          type: "special"
		}
      ]
    },
	"ult": {
		name: "Azure Spy Vision",
    cooldown: 112,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Invisible Reveal"],
      buffs: {
        CritRate: 200,
        Shield: 20,
        Speed: "30%",
        AtkSPD: 35
      }
    },
		formulas: [
	]
	}
  },

	"lapras": {
    "passive": {
          name: "Shell Armor",
          description: "Reduces any single instance of damage exceeding 10% of max HP by 20%.",
          buff: {
            DmgTaken: "20%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted x3",
          formula: (SPATK, Level) => 0.20 * SPATK + 3 * (Level - 1) + 60,
          type: "special",
        },
        {
          label: "Healing",
          formula: (HP, Level) => 0.035 * HP,
          type: "hp"
        },
      ]
	},

    "s11": {
      name: "Water Pulse",
      cooldown: 4,
      buff: {},
      debuffs: {
        Speed: 30
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage (First Pulse)",
          formula: (SPATK, Level) => 0.74 * SPATK + 11 * (Level - 1) + 230,
          type: "special"
        },
		{
          label: "Damage (Subsequent pulses)",
          formula: (SPATK, Level) => 0.45 * SPATK + 6 * (Level - 1) + 130,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Perish Song",
      cooldown: 6.5,
      effects: ["True Damage"],
      buff:{},
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.828 * SPATK + 9 * (Level - 1) + 282,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Bubble Beam",
      cooldown: 9,
      effects: ["Stun"],
      buff: {},
      formulas: [
        {
          label: "Shield",
          formula: (SPATK, Level) => 1.725 * SPATK + 0 * (Level - 1) + 575,
          type: "special"
        },
		{
          label: "Damage",
          formula: (SPATK, Level) => 1.19 * SPATK + 9 * (Level - 1) + 400,
          type: "special"
        },
		{
          label: "Shield Skill Plus",
          formula: (SPATK, Level) => 2.07 * SPATK + 0 * (Level - 1) + 690,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Ice Beam",
      cooldown: 8,
      effects: ["Freeze"],
      buff: {
        Speed: "20%"
      },
      debuffs: {
        Speed: 15
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
		{
		  label: "Damage - Beam",
          formula: (SPATK, Level) => 0.36 * SPATK + 3 * (Level - 1) + 120,
          type: "special"
		},
		{
		  label: "Damage - Frozen Ground",
          formula: (SPATK, Level) => 0.27 * SPATK + 3 * (Level - 1) + 95,
          type: "special"
		}
      ]
    },
	"ult": {
		name: "Lapras Express",
    cooldown: 100,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Unstoppable"],
      buffs:{
        Shield: 60,
        Speed: "30%"

      }
    },
		formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 1.72 * SPATK + 12 * (Level - 1) + 580,
          type: "special"
		}
	]
	}
  },

  	"latias": {
      "passive": {
          name: "Levitate",
          description: "Gains burst of speed after using a move. Can fly to an allied Latios when out of combat, increase 10% move speed becoming unstoppable during the flight (90s cooldown for both).",
          buff: {
            Speed: "50%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
		{
          label: "Damage - Basic",
          formula: (SPATK, Level) => 0.25 * SPATK + 5 * (Level - 1) + 100,
          type: "special",
        }
      ]
	},

    "s11": {
      name: "Mist Ball",
      cooldown: 8,
      buff: {},
      debuffs: {
        Speed: 40,
        ATK: 25,
        SpATK: 25
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction",
        ATK: "(DEBUFF) Attack Reduction",
        SpATK: "(DEBUFF) SpecialAttack Reduction"
      },
      formulas: [
        {
          label: "Damage - Projectile",
          formula: (SPATK, Level) => 0.60 * SPATK + 12 * (Level - 1) + 330,
          type: "special"
        },
		{
          label: "Damage - Mist Zone (x2 hits)",
          formula: (SPATK, Level) => 0.20 * SPATK + 4 * (Level - 1) + 110,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Dragon Cheer",
      cooldown: 8,
      formulas: [
        {
          label: "Extra Damage",
          formula: (SPATK, Level) => 0 * SPATK + 50 * (Level - 1) + 150,
          type: "special"
        },
		{
          label: "Shield",
          formula: (SPATK, Level) => 1.5 * SPATK + 0 * (Level - 1) + 400,
          type: "shield"
        },
		{
          label: "Shield Skill Plus",
          formula: (SPATK, Level) => 1.8 * SPATK + 0 * (Level - 1) + 480,
          type: "shield"
        },
          {
            label: "If Latios Duo",
            type: "text-only",
            additionalText: "Increase 20% movement speed"
        },
      ]
    },
    "s21": {
      name: "Dragon Pulse",
      cooldown: 6,
      buff:{
        Speed: "-60%"
      },
      buffPlus: {
        levelRequired: 10,
        debuffs: {
          Speed: 30
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.2 * SPATK + 0 * (Level - 1) + 420,
          type: "special"
        },
    {
      label: "Damage - Projectile (per Projectile)",
      formula: (SPATK, Level, HP, eonPower) => {
        const baseDamage = 0.44 * SPATK + 6 * (Level - 1) + 130;
        
        // Se Eon Power <= 100, retorna dano base
        if (eonPower <= 100) {
          return baseDamage;
        }
        
        // A partir de 101, adiciona 0.5% por unidade acima de 100
        const bonusPercent = (eonPower - 100) * 0.5;
        const multiplier = 1 + (bonusPercent / 100);
        
        return baseDamage * multiplier;
      },
      type: "special",
      usesEonPower: true // Flag para indicar que usa Eon Power
    },
		{
          label: "Healing",
          formula: (SPATK, Level) => 1.6 * SPATK + 18 * (Level - 1) + 250,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Dragon Breath",
      cooldown: 6,
      buff:{},
      debuffs:{
        Speed: 30,
        SpDEF: 30
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction",
        SpDEF: "(DEBUFF) SpecialDefense Reduction",
      },
      buffPlus: {
        levelRequired: 10,
        debuffs: {
          Speed: 10
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction",
        }
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level, HP, eonPower2) => {
            const baseDamage = 1.4 * SPATK + 20 * (Level - 1) + 400;
            
            // ✅ NOVA LÓGICA: Base 60 ao invés de 100
            if (eonPower2 <= 60) {
              return baseDamage;
            }
            
            // A partir de 61, adiciona 0.5% por unidade acima de 60
            const bonusPercent = (eonPower2 - 60) * 0.5;
            const multiplier = 1 + (bonusPercent / 100);
            
            return baseDamage * multiplier;
          },
          type: "special",
          usesEonPower: true,
          usesEonPower2: true
        }
      ]
    },
	"ult": {
		name: "Mist Blast",
    cooldown: 112,
    buff:{},
    buffPlus: {
      levelRequired: 8,
      buffs: {
        CDR: 20,
        Speed: "30%",
        Shield: 20
      },
        otherSkillsCooldownReduction: {
          s21: 6, 
          s22: 6,
          s11: 8,
          s12: 8 
        },
    },
		formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 2.5 * SPATK + 15 * (Level - 1) + 460,
          type: "special"
		},
		{
		  label: "Damage - Area (If Mist Blast hit last)",
          formula: (SPATK, Level) => 1.25 * SPATK + 7 * (Level - 1) + 230,
          type: "special"
		}
	]
	}
  },

    "latios": {
      "passive": {
          name: "Levitate",
          description: "Gains burst of speed after using a move. Can fly to an allied Latias when out of combat and incriese 10% move speed, becoming unstoppable during the flight (90s cooldown for both).",
          buff: {
            Speed: "50%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
		{
          label: "Damage - Basic",
          formula: (SPATK, Level) => 0.25 * SPATK + 5 * (Level - 1) + 100,
          type: "special",
        }
      ]
	},

    "s11": {
      name: "Luster Purge",
      cooldown: 7,
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.7 * SPATK + 15 * (Level - 1) + 400,
          type: "special"
        },
        		{
          label: "Damage - Latias ally and marked enemy",
          formula: (firstHitDamage, Level) => 0.2 * firstHitDamage, // 25% do primeiro hit
          type: "dependent",
          dependsOn: 0
        },
      ]
    },
    "s12": {
      name: "Telekinesis",
      cooldown: 7.5,
      effects: ["Stun"],
      buff: {},
      debuffs: {
        Speed: 30
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.98 * SPATK + 10 * (Level - 1) + 260,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Dragon Pulse",
      cooldown: 6,
      formulas: [
        {
          label: "Damage - Boosted Attack",
          formula: (SPATK, Level) => 1.28 * SPATK + 4 * (Level - 1) + 340,
          type: "special"
        },
{
      label: "Damage - Projectile (per Projectile)",
      formula: (SPATK, Level, HP, eonPowerlatios) => {
        const baseDamage = 0.357 * SPATK + 5 * (Level - 1) + 108;
        
        // Se Eon Power <= 100, retorna dano base
        if (eonPowerlatios <= 100) {
          return baseDamage;
        }
        
        // A partir de 101, adiciona 0.5% por unidade acima de 100
        const bonusPercent = (eonPowerlatios - 100) * 0.5;
        const multiplier = 1 + (bonusPercent / 100);
        
        return baseDamage * multiplier;
      },
      type: "special",
      usesEonPower: true,
      usesEonPowerlatios: true // Flag para indicar que usa Eon Power
    },
            {
          label: "Damage - Projectile (per Projectile) Skill Plus",
          type: "text-only",
          additionalText: "3% missing HP increase damage"
        },
      ]
    },
    "s22": {
      name: "Draco Meteor",
      cooldown: 7.5,
      formulas: [
		{
		 formula: (SPATK, Level, HP, eonPowerlatios) => {
        const baseDamage = 1.09 * SPATK + 24 * (Level - 1) + 364;
        
        // Se Eon Power <= 100, retorna dano base
        if (eonPowerlatios <= 100) {
          return baseDamage;
        }
        
        // A partir de 101, adiciona 0.5% por unidade acima de 100
        const bonusPercent = (eonPowerlatios - 100) * 0.5;
        const multiplier = 1 + (bonusPercent / 100);
        
        return baseDamage * multiplier;
      },
      type: "special",
      usesEonPower: true,
      usesEonPowerlatios: true // Flag para indicar que usa Eon Power
    },
        {
          label: "Damage - per Comet Skill Plus",
          type: "text-only",
          additionalText: "3% missing HP increase damage"
        },
      ]
    },
	"ult": {
		name: "Eon Blast",
    cooldown: 112,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      buffs: {
        CDR: 90,
        Speed: "30%",
        Shield: 20
      },
        otherSkillsCooldownReduction: {
          s21: 6, 
          s22: 7.5,
          s11: 7,
          s12: 7.5 
        },
    },
		formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 2.5 * SPATK + 15 * (Level - 1) + 460,
          type: "special"
		},
		{
		  label: "Damage - Area (If Eon Blast hit last)",
          formula: (SPATK, Level) => 1.25 * SPATK + 7 * (Level - 1) + 230,
          type: "special"
		}
	]
	}
  },

  	"leafeon": {
      "passive": {
          name: "Chlorophyll",
          description: "Charges a gauge while out of tall grass; when full, grants 15% increased movement speed.",
          buff: {
          },
          conditionalBuffs: {
            notFull: {
            },
            full: {
              Speed: "15%",
            }
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff:{},
    conditionalDebuffs: {
      notFull: {},
      full: {
        Speed: 30
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.5 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Additional Damage (Boosted by Chlorophyll)",
          formula: (ATK, Level) => 0.40 * ATK + 0 * (Level - 1) + 0,
          type: "physical",
		  additionalText: "This damage cannot crit."
        }
      ]
	},
    "s11": {
      name: "Razor Leaf",
      cooldown: 6,
      buff: {
        Speed: "20%",
        DmgTaken: 70
      },
      formulas: [
		{
          label: "Damage (Outgoing - First Leaf)",
          formula: (ATK, Level) => 0.8 * ATK + 8 * (Level - 1) + 190,
          type: "physical"
        },
		{
          label: "Damage (Manual return first Leaf if <1s)",
          formula: (ATK, Level) => 0.8 * ATK + 8 * (Level - 1) + 190,
          type: "physical"
        },
		{
          label: "Damage (Automatic return first Leaf or Manual return first Leaf if after 1s)",
          formula: (ATK, Level) => 1.32 * ATK + 13 * (Level - 1) + 315,
          type: "physical"
        },
		{
          label: "Shield",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 300,
          type: "physical"
        },
		{
          label: "Shield Skill Plus",
          formula: (ATK, Level) => 1.5 * ATK + 0 * (Level - 1) + 450,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Solar Blade",
      cooldown: 8,
      buff: {},
      selfBuff: {
        CooldownPercent: 50
      },
      conditionalBuffs: {
        notFull: {},
        full: {
          CooldownPercent: 50
        }
      },
      buffPlus: {
        levelRequired: 10,
        buffs: {
          DmgTaken: 40
        }
      },
      formulas: [
		{
          label: "Damage (1st Level Charge)",
          formula: (ATK, Level) => 2.2 * ATK + 11 * (Level - 1) + 462,
          type: "physical"
        },
		{
          label: "Damage (2nd Level Charge)",
          formula: (ATK, Level) => 2.54 * ATK + 12 * (Level - 1) + 540,
          type: "physical"
        },
		{
          label: "Damage (3rd Level Charge)",
          formula: (ATK, Level) => 2.87 * ATK + 14 * (Level - 1) + 600,
          type: "physical"
        },
		{
          label: "Damage (Max Charge)",
          formula: (ATK, Level) => 3.2 * ATK + 16 * (Level - 1) + 672,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Aerial Ace",
      cooldown: 5,
      buff:{},
      selfBuffPlus: {
        levelRequired: 12,
        buffs: {
          CooldownFlat: 0.5
        }
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 1.32 * ATK + 9 * (Level - 1) + 360,
          type: "physical",
        }
      ]
    },
    "s22": {
      name: "Leaf Blade",
      cooldown: 8.5,
      buff:{},
      debuffs: {
        Speed: 40
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      selfBuffPlus: {
        levelRequired: 12,
        buffs:{
          CooldownFlat: 1.2
        }
      },
      formulas: [
		{
          label: "Damage (Inner Ring x3)",
          formula: (ATK, Level) => 0.185 * ATK + 2 * (Level - 1) + 125,
          type: "physical"
        },
		{
          label: "Damage (Outer Ring x3)",
          formula: (ATK, Level) => 0.37 * ATK + 3 * (Level - 1) + 250,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Emerald Two-Step",
    cooldown: 100,
    buff: {},
    buffPlus: {
      levelRequired: 8,
      effects: ["Unstoppable"], 
      buffs:{
        Speed: "80%",
        Shield: 20
      },
      debuffs: {
        Speed: 50
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }
    },
		formulas: [
		{
          label: "Damage (Initial leap)",
          formula: (ATK, Level) => 1.26 * ATK + 7 * (Level - 1) + 300,
          type: "physical"
        },
		{
          label: "Damage (Second Leap - Closest)",
          formula: (ATK, Level) => 2.52 * ATK + 14 * (Level - 1) + 600,
          type: "physical"
        },
		{
          label: "Damage (Second Leap - Mid range)",
          formula: (ATK, Level) => 1.92 * ATK + 11 * (Level - 1) + 420,
          type: "physical"
        },
		{
          label: "Damage (Second Leap - Furthest range)",
          formula: (ATK, Level) => 1.26 * ATK + 7 * (Level - 1) + 300,
          type: "physical"
        }
	 ]
	}
  },

  	"lucario": {
      "passive": {
          name: "Steadfast",
          description: "At 50% HP or below, grants a shield and 20% movement speed for 5s (45s cooldown).",
          buff: {
            Speed: "20%"
          },
          formulas: [
          {
          label: "Shield",
          formula: (ATK, Level) => 2.5 * ATK + 50 * (Level - 1) + 50,
          type: "physical"
          }
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (2nd Hit)",
          formula: (ATK, Level) => 0.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Power-Up Punch",
      cooldown: 7,
      buff: {
        DmgTaken: 30,
        Speed: "-15%"
      },
      selfBuff: {
        CooldownFlat: 1
      },
      buffPlus:{
        levelRequired: 11,
        effects: ["Unstoppable"],
        buffs:{},
      },
      formulas: [
		{
          label: "Damage - Uncharged",
          formula: (ATK, Level) => 2.0916 * ATK + 3 * (Level - 1) + 88,
          type: "physical"
        },
		{
          label: "Damage - Fully Charged",
          formula: (ATK, Level) => 3.818 * ATK + 5 * (Level - 1) + 161,
          type: "physical"
        },
        {
          label: "Damage - Execute",
          type: "text-only",
          additionalText: "12% of Enemy Missing HP"
        }
      ]
    },
    "s12": {
      name: "Extreme Speed",
      cooldown: 7.5,
      buff: {},
      buffPlus: {
        levelRequired: 11,
        buffs:{
          ATK: "7.5%"
        }
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 2.08 * ATK + 6 * (Level - 1) + 280,
          type: "physical"
        },
		{
          label: "Healing",
          formula: (ATK, Level) => 0.3375 * ATK + 1 * (Level - 1) + 42,
          type: "physical"
        },
		{
          label: "Damage - Unique Attack",
          formula: (ATK, Level) => 0.75 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Bone Rush",
      cooldown: 9,
      effects: ["Stun"],
      buff:{},
      buffPlus: {
        levelRequired: 13,
        buffs:{
      },
        otherSkillsCooldownReduction: {
          s12: 7.5, 
          s11: 7 
        }
    },
      formulas: [
		{
          label: "Damage - per Hit (4-7 Hits)",
          formula: (ATK, Level) => 0.625 * ATK + 1 * (Level - 1) + 50,
          type: "physical",
        }
      ]
    },
    "s22": {
      name: "Close Combat",
      cooldown: 7.5,
      effects: ["Unstoppable"],
      buff:{},
      formulas: [
		{
          label: "Damage - per Hit (11 Hits)",
          formula: (ATK, Level) => 0.5 * ATK + 2 * (Level - 1) + 60,
          type: "physical"
        },
		{
          label: "Heal - per Hit",
          formula: (ATK, Level) => 0.115 * ATK + 0 * (Level - 1) + 23,
          type: "physical"
        },
		{
          label: "Damage - per Hit (11 Hits) Skill Plus",
          formula: (ATK, Level) => 0.56 * ATK + 2 * (Level - 1) + 69,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Aura Cannon",
    cooldown: 100,
    buff: {},
    buffPlus:{
      levelRequired: 9,
      effects: ["Unstoppable"],
      buffs: {
        Speed: "30%",
        CDR: 30,
        Shield: 20
      },
    },
    conditionalBuffs: {
      requiredSkill: "s11",
      buffs: {
        ATK: "20%"
      }
    },
		formulas: [
		{
          label: "Damage - per Tick",
          formula: (ATK, Level) => 1.74 * ATK + 4 * (Level - 1) + 210,
          type: "physical"
        }
	 ]
	}
  },

    "machamp": {
      "passive": {
          name: "Guts",
          description: "Gains 10% Attack for 5s when afflicted by any debuff.",
          buff: {
            ATK: "10%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff: {},
    debuffs: {
      Speed: 50
    },
    debuffLabels :{
      Speed: "(DEBUFF) MoveSpeed Reduction"
    },
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.5 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Close Combat",
      cooldown: 6,
      buff: {},
      effects: ["Unstoppable"],
      buffPlus: {
        levelRequired: 13,
        buffs: {},
        selfDamageMultiplier: 1.25
      },
      formulas: [
		{
          label: "Damage - per Hit (4 hits)",
          formula: (ATK, Level) => 0.65 * ATK + 2 * (Level - 1) + 55,
          type: "physical"
        },
		{
          label: "Damage - Final Hit",
          formula: (ATK, Level) => 1.95 * ATK + 6 * (Level - 1) + 165,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Cross Chop",
      cooldown: 6,
      buff:{
        CritRate: 10
      },
      buffPlus: {
        levelRequired: 13,
        buffs: {
          ATK: 40
        }
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 0.98 * ATK + 13 * (Level - 1) + 290,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Dynamic Punch",
      cooldown: 8,
      buff:{
        ATK: "15%",
        Speed: "40%"
      },
      effects: ["Unstoppable", "Stun"],
      debuffs: {
        Speed: 40
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      buffPlus: {
        levelRequired: 11,
        buffs: {
          ATK: "5%",
          Speed: "30%"
        },
        debuffs: {
          Speed: 20
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
		{
          label: "Damage - per Tick (4 Ticks)",
          formula: (ATK, Level) => 0.28 * ATK + 1 * (Level - 1) + 50,
          type: "physical",
        }
      ]
    },
    "s22": {
      name: "Submission",
      cooldown: 9,
      effects: ["Unstoppable"],
      buff: {
        Speed: "70%",
        CritRate: 5,
        AtkSPD: 40
      },
      buffPlus: {
        levelRequired: 11,
        buffs: {
          CritRate: 5,
          AtkSPD: 10
        }
      },
      formulas: [
		{
          label: "Damage (2x)",
          formula: (ATK, Level) => 1.15 * ATK + 4 * (Level - 1) + 210,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Barrage Blow",
    cooldown: 134,
    buff:{},
    buffPlus: {
      levelRequired: 9,
      effects: ["Unstoppable"],
      buffs: {
        Speed: "40%",
        ATK: "25%",
        DEF: 250,
        SpDEF: 250,
        AtkSPD: 35,
        Shield: 20
      }
    },
		formulas: [
		{
          label: "Damage (6x)",
          formula: (ATK, Level) => 1 * ATK + 2 * (Level - 1) + 100,
          type: "physical"
        },
		{
          label: "Damage - Final Hit",
          formula: (ATK, Level) => 2 * ATK + 4 * (Level - 1) + 200,
          type: "physical"
        }
	 ]
	}
  },

    "mamoswine": {
    "passive": {
          name: "Thick Fat",
          description: "Gains Defense and Sp. Def stacks when dealing damage. Ice moves empower the next basic attack and slow enemy scoring if used on allied goals.",
          buff: {
          },
          formulas: [
          {
          label: "Defense & Sp. Defense",
          formula: (ATK, Level) => 0 * ATK + 10 * (Level - 1) + 20,
          type: "physical"
          },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
    buff: {},
    effects: ["Freeze"],
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 0.57 * ATK + 8 * (Level - 1) + 150,
          type: "physical"
        },
		{
          label: "Damage - Frozen Bonus",
          formula: (ATK, Level) => 0.19 * ATK + 3 * (Level - 1) + 50,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Icicle Crash",
      cooldown: 8,
      buff: {},
      effects: ["Freeze"],
      debuffs: {
        Speed: 35
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      },
      allyBuffs: {
        Speed: 50
      },
      allyBuffLabels: {
        Speed: "(ALLY BUFF) MoveSpeed Increase"
      },
      buffPlus: {
        levelRequired: 11,
        effects: ["Stun"]
      },
      formulas: [
		{
          label: "Damage - Small Icicles (3x)",
          formula: (ATK, Level) => 0.35 * ATK + 3 * (Level - 1) + 110,
          type: "physical"
        },
		{
          label: "Damage - Large Icicle",
          formula: (ATK, Level) => 0.60 * ATK + 5 * (Level - 1) + 180,
          type: "physical"
        },
		{
          label: "Damage - Shatter",
          formula: (ATK, Level) => 0.80 * ATK + 6 * (Level - 1) + 240,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Ice Fang",
      cooldown: 6,
      buff:{},
      effects: ["Stun", "Freeze"],
      formulas: [
		{
          label: "Damage - First Hit",
          formula: (ATK, Level) => 0.75 * ATK + 8 * (Level - 1) + 180,
          type: "physical"
        },
		{
          label: "Damage - Second Hit",
          formula: (ATK, Level) => 2.25 * ATK + 24 * (Level - 1) + 540,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "High Horsepower",
      cooldown: 8,
      buff: {},
      effects: ["Stun"],
      formulas: [
		{
          label: "Damage - Charge",
          formula: (ATK, Level) => 0.61 * ATK + 4 * (Level - 1) + 170,
          type: "physical",
        },
		{
          label: "Damage - Stomp",
          formula: (ATK, Level) => 1.22 * ATK + 8 * (Level - 1) + 340,
          type: "physical",
        },
		{
          label: "Damage - Frozen Stomp Bonus",
          formula: (ATK, Level) => 0.915 * ATK + 6 * (Level - 1) + 255,
          type: "physical",
        }
      ]
    },
    "s22": {
      name: "Earthquake",
      cooldown: 9,
      buff: {},
      effects: ["Stun"],
      buffPlus: {
        levelRequired: 13,
        debuffs: {
          Speed: 30
        },
        debuffLabels: {
          Speed: "(DEBUFF) MoveSpeed Reduction"
        }
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 1.89 * ATK + 13 * (Level - 1) + 530,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Mammoth Mash",
    cooldown: 112,
    buff: {},
    buffPlus: {
      levelRequired: 9,
      effects: ["Unstoppable"],
      buffs:{
        Speed: "30%",
        Shield: 40
      },
      debuffs:{
        Speed: 90
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction"
      }
    },
		formulas: [
		{
          label: "Damage - First Stomp",
          formula: (ATK, Level) => 1.53 * ATK + 9 * (Level - 1) + 420,
          type: "physical"
        },
		{
          label: "Damage - Mini Stomps (2 stomps)",
          formula: (ATK, Level) => 1.02 * ATK + 6 * (Level - 1) + 280,
          type: "physical"
        },
		{
          label: "Damage - Final Stomp",
          formula: (ATK, Level) => 2.04 * ATK + 12 * (Level - 1) + 560,
          type: "physical"
        }
	 ]
	}
  },

  "megalucario": {
    "passive": {
          name: "Justified",
          description: "When damaged, Attack increases by 12.5% for 4s, stacking up to 4 times.",
          buff: {
            ATK: "12.5%",
          },
          formulas: [
          ]
        },
        "passive1": {
          name: "Adaptability",
          description: "Mega Evolution grants Adaptability, stacking Attack by 7% per move hit (up to 10 times).",
          buff: {
            ATK: "7%",
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (2nd Hit)",
          formula: (ATK, Level) => 0.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Power Up Punch",
      cooldown: 7,
      buff: {
        DmgTaken: 30,
        Speed: "-15%",
        CooldownFlat: 1
      },
      formulas: [
        {
          label: "Damage - Uncharged",
          formula: (ATK, Level) => 2.0916 * ATK + 3 * (Level - 1) + 88,
          type: "physical"
        },
		{
          label: "Damage - Fully Charged",
          formula: (ATK, Level) => 3.818 * ATK + 5 * (Level - 1) + 161,
          type: "physical"
        }
      ]
    },
    "U11": {
      name: "Close Combat",
      cooldown: 6.5,
      formulas: [
		{
          label: "Damage - per Hit (11 Hits)",
          formula: (ATK, Level) => 0.5 * ATK + 2 * (Level - 1) + 60,
          type: "physical"
        },
        {
          label: "Heal - First Hit",
          formula: (ATK, Level) => 1.38 * ATK + 0 * (Level - 1) + 276,
          type: "physical"
        },
        {
          label: "Heal - per Hit (Subsequent Hits)",
          formula: (ATK, Level) => 0.115 * ATK + 0 * (Level - 1) + 23,
          type: "physical"
        },
        {
          label: "Damage - per Hit (11 Hits) Skill Plus",
          formula: (ATK, Level) => 0.56 * ATK + 2 * (Level - 1) + 69,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Aura Cannon",
    cooldown: 112,
      buff: { 
      },
      buffPlus:{
       levelRequired: 9,
        buffs: {
          Speed: "30%",
          CDR: 30,
          Shield: 20
        }
      },
		formulas: [
        {
          label: "Damage - per Tick",
          formula: (ATK, Level) => 1.74 * ATK + 4 * (Level - 1) + 210,
          type: "physical"
        }
	 ]
	}
  },

  	"meowscara": {
    "passive": {
          name: "Overgrow",
          description: "At 50% HP or below, taking damage triggers invisibility, a speed boost, and enhanced damage with lifesteal for 4s (60s cooldown).",
          effects: ["Invisible"],
          buff: {
            Speed: "15%",
            HPRegen: "15%"
          },
          skillDamageMultiplier: 1.15,
          affectsBasicAttack: true,
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted ",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Flower Trick",
      cooldown: 5,
      buff: {},
      buffPlus: {
        levelRequired: 11,
        buffs: {
          Speed: "30%"
        }
      },  
      formulas: [
        {
          label: "Damage - Explosion Base",
          formula: (ATK, Level) => 1.5 * ATK + 15 * (Level - 1) + 400,
          type: "physical"
        },
		{
          label: "Damage - Increased Explosion",
          formula: (ATK, Level) => 2.4 * ATK + 24 * (Level - 1) + 640,
          type: "physical"
        },
        {
          label: "Damage - Execute",
          type: "text-only",
          additionalText: "18% of missing HP"
        }
      ]
    },
    "s12": {
      name: "Night Slash",
      cooldown: 6.5,
      buff: {
        CritRate: 50
      },
      selfBuff: {
        CooldownFlat: 0.5
      },
      buffPlus: {
        levelRequired: 11,
        buffs: {
          CritRate: 15
        }
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 0.73 * ATK + 6 * (Level - 1) + 250,
          type: "physical"
        },
        	{
          label: "Damage - Subsequent Waves",
          formula: (firstHitDamage, Level) => 0.5 * firstHitDamage, // 25% do primeiro hit
          type: "dependent",
          dependsOn: 0
        },
        {
          label: "Healing",
          formula: (ATK, Level) => 0.37 * ATK + 2 * (Level - 1) + 110,
          type: "physical"
        },
        {
          label: "Healing(plus)",
          formula: (ATK, Level) => 0.444 * ATK + 2 * (Level - 1) + 132,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Double Team",
      cooldown: 8,
      effects: ["Stun"],
      buff:{
        Speed: "70%"
      },
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.42 * ATK + 10 * (Level - 1) + 470,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Trailblaze",
      cooldown: 6.5,
      effects: ["Paralyze"],
      buff: {
        AtkSPD: 100,
        Speed: "60%"
      },
      selfBuff: {
        CooldownFlat: 6.5
      },
      debuffs: {
        Speed: 40,
        AtkSPD: 40
      },
      debuffLabels: {
        Speed: "(DEBUFF) MoveSpeed Reduction",
        AtkSPD: "(DEBUFF) AttackSpeed Reduction"
      },
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 0.81 * ATK + 6 * (Level - 1) + 270,
          type: "physical"
        },
        {
          label: "Shield",
          formula: (HP, Level) => (0.20 + 0.005 * (Level - 1)) * HP,
          type: "hp"
        }
      ]
    },
	"ult": {
		name: "Floral Flourish",
    cooldown: 112,
    buff: {},
    buffPlus: {
      levelRequired: 9,
      effects: ["Invicible"],
      buffs:{
        Speed: "80%",
        Shield: 20
      },
      otherSkillsCooldownReduction: {
        s11: 1,
        s12: 1
      }
    },
		formulas: [
        {
          label: "Damage - per tick (max 13)",
          formula: (ATK, Level) => 0.7 * ATK + 3 * (Level - 1) + 187,
          type: "physical"
        }
	 ]
	}
  },

  	"metagross": {
    "passive": {
          name: "Clear Body",
          description: "Reduces hindrance duration by up to 50% based on the number of nearby enemy players (max 5 enemies).",
          buff: {
            HindRed: "50%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted ",
          formula: (ATK, Level) => 1.4 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Meteor Mash",
      cooldown: 7,
      formulas: [
        {
          label: "Shield (per charge stack)",
          formula: (ATK, Level) => 0.3 * ATK + 0 * (Level - 1) + 100,
          type: "physical"
        },
		  {
          label: "Charging Damage",
          formula: (ATK, Level) => 0.55 * ATK + 2 * (Level - 1) + 100,
          type: "physical"
        },
		  {
          label: "Punch Damage (1-2 Charges)",
          formula: (ATK, Level) => 1.5 * ATK + 2 * (Level - 1) + 400,
          type: "physical"
        },
		  {
          label: "Punch Damage (3-4 Charges)",
          formula: (ATK, Level) => 1.75 * ATK + 2 * (Level - 1) + 430,
          type: "physical"
        },
		  {
          label: "Punch Damage (5-6 Charges)",
          formula: (ATK, Level) => 2 * ATK + 2 * (Level - 1) + 460,
          type: "physical"
        },
		  {
          label: "Punch Damage (7-8 Charges)",
          formula: (ATK, Level) => 2.25 * ATK + 2 * (Level - 1) + 500,
          type: "physical"
        },
		  {
          label: "Punch Healing (1-2 Charges) Skill Plus",
          formula: (HP) => 0.09 * HP,
          type: "hp"
        },
		  {
          label: "Punch Healing (3-4 Charges) Skill Plus",
          formula: (HP) => 0.1 * HP,
          type: "hp"
        },
		  {
          label: "Punch Healing (5-6 Charges) Skill Plus",
          formula: (HP) => 0.11 * HP,
          type: "hp"
        },
		  {
          label: "Punch Healing (7-8 Charges) Skill Plus",
          formula: (HP) => 0.12 * HP,
          type: "hp"
        }
      ]
    },
    "s12": {
      name: "Gyro Ball",
      cooldown: 4,
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 2.37 * ATK + 11 * (Level - 1) + 615,
          type: "physical"
        },
        {
          label: "Shield - per stack(max 6)",
          formula: (ATK, Level) => 0.78 * ATK + 2 * (Level - 1) + 120,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Zen Headbutt",
      cooldown: 5,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.72 * ATK + 6 * (Level - 1) + 225,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Magnet Rise",
      cooldown: 9,
      formulas: [
		  {
          label: "Damage - Grounding",
          formula: (ATK, Level) => 1.4 * ATK + 5 * (Level - 1) + 250,
          type: "physical"
        }
      ]
    },
	"ult": {
		name: "Compute and Crush",
    cooldown: 112,
		formulas: [
        {
          label: "Damage (2 punches)",
          formula: (ATK, Level) => 1.34 * ATK + 2 * (Level - 1) + 400,
          type: "physical"
        },
        {
          label: "Damage - Wall Creation",
          formula: (ATK, Level) => 2.28 * ATK + 7 * (Level - 1) + 460,
          type: "physical"
        },
        {
          label: "Shield - Per Enemy",
          formula: (ATK, Level) => 0.6 * ATK + 0 * (Level - 1) + 150,
          type: "physical"
        }
	 ]
	}
  },

  	"mew": {
    "passive1": {
          name: "Synchronize",
          description: "Using a move grants Mew and nearby allies 15% increased movement speed for 2s.",
          buff: {
          Speed: "15%"
          },
          formulas: [
          ]
        },
        "passive2": {
          name: "Move Reset",
          description: "Can reset and change moves every 25s, with cooldown reduced by KOs, assists, or scoring. Using it also charges the Unite Move.",
          buff: {
          CDR: "40%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted ",
          formula: (SpATK, Level) => 1.6 * SpATK + 8 * (Level - 1) + 280,
          type: "special"
        }
      ]
	},

    "s1a": {
      name: "Electro Ball",
      cooldown: 5,
      formulas: [
        {
          label: "Damage (No Light Screen Boost)",
          formula: (SpATK, Level) => 1.14 * SpATK + 12 * (Level - 1) + 260,
          type: "special"
        },
        {
          label: "Damage (Light Screen Boost):",
          formula: (SpATK, Level) => 1.49 * SpATK + 15 * (Level - 1) + 340,
          type: "special"
        }
      ]
    },
    "s1b": {
      name: "Solar Beam",
      cooldown: 9,
      formulas: [
	    	{
          label: "Damage - per Tick (max 3)",
          formula: (SpATK, Level) => 0.61 * SpATK + 3 * (Level - 1) + 126,
          type: "special"
        },
        {
          label: "Damage - per Tick (Light Screen Boost)(max 3)",
          formula: (SpATK, Level) => 0.79 * SpATK + 4 * (Level - 1) + 164,
          type: "special"
        }
      ]
    },
    "s1c": {
      name: "Surf",
      cooldown: 12,
      formulas: [
	    	{
          label: "Damage ",
          formula: (SpATK, Level) => 1.95 * SpATK + 7 * (Level - 1) + 336,
          type: "special"
        },
        {
          label: "Shield",
          formula: (SpATK, Level) => 0.7 * SpATK + 0 * (Level - 1) + 200,
          type: "special"
        },
        {
          label: "Shield Skill Plus",
          formula: (SpATK, Level) => 0.1 * SpATK + 0 * (Level - 1) + 300,
          type: "special"
        }
      ]
    },
    "s2a": {
      name: "Coaching",
      cooldown: 7,
      formulas: [
        {
          label: "Shield",
          formula: (SpATK, Level) => 0.1 * SpATK + 0 * (Level - 1) + 300,
          type: "shield"
        }
      ]
    },
    "s2b": {
      name: "Light Screen",
      cooldown: 9,
      formulas: [  
      ]
    },
    "s2c": {
      name: "Agility",
      cooldown: 10,
      formulas: [	  
      ]
    },
	"ult": {
		name: "Mystical Mirage",
    cooldown: 123,
		formulas: [
        {
          label: "Damage ",
          formula: (SpATK, Level) => 1.2 * SpATK + 10 * (Level - 1) + 340,
          type: "special"
        }
	 ]
	}
  },

  	"mewtwox": {
    "passive": {
          name: "Pressure",
          description: "Building Mega Gauge through attacks boosts stats and enables Mega Evolution, which consumes Aeos energy to extend duration and grants massive stat increases.",
          buff: {
          ATK: "18%",
          DEF: "18%",
          SpDEF: "18%",
          HP: "10%",
          AtkSPD: "5%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1.15 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Basic(Mega)",
          formula: (ATK, Level) => 1.2 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted(Mega)",
          formula: (ATK, Level) => 1.5 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Future Sight",
      cooldown: 9,
      formulas: [
        {
          label: "Damage - Pull and Explosion",
          formula: (ATK, Level) => 0.6 * ATK + 5 * (Level - 1) + 120,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Psystrike",
      cooldown: 9,
      formulas: [
	    	{
          label: "Damage (x5)",
          formula: (ATK, Level) => 0.41 * ATK + 3 * (Level - 1) + 100,
          type: "physical"
        },
        {
          label: "Damage - Final Hit",
          formula: (ATK, Level) => 1.46 * ATK + 7 * (Level - 1) + 319,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Recover",
      cooldown: 10,
      formulas: [
        {
          label: "Shield",
          formula: (ATK, Level) => 1.5 * ATK + 0 * (Level - 1) + 500,
          type: "physical"
        },
        {
          label: "Shield",
          formula: (HP, Level) => 0.1 * HP ,
          type: "hp"
        }
      ]
    },
    
    "s22": {
      name: "Teleport",
      cooldown: 10,
      formulas: [
      ]
    },
	"ult": {
		name: "Infinite Psyburn",
    cooldown: 134,
		formulas: [
        {
          label: "Damage ",
          formula: (ATK, Level) => 1.9 * ATK + 11 * (Level - 1) + 500,
          type: "physical"
        }
	 ]
	}
  },

  	"mewtwoy": {
    "passive": {
          name: "Pressure",
          description: "Basic attacks build Mega Gauge to boost Sp. Atk and attack speed. At max stacks, Mega Evolution consumes Aeos energy for enhanced stats and extended duration.",
          buff: {
          SpATK: "10%",
          Speed: "5%",
          HP: "10%",
          AtkSPD: "35%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (SpATK, Level) => 0.43 * SpATK + 4 * (Level - 1) + 80,
          type: "special"
        },
        {
          label: "Damage - Basic(Mega)",
          formula: (SpATK, Level) => 0.49 * SpATK + 5 * (Level - 1) + 90,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Future Sight",
      cooldown: 8.5,
      formulas: [
        {
          label: "Damage - Shove",
          formula: (SpATK, Level) => 0.54 * SpATK + 7 * (Level - 1) + 150,
          type: "special"
        },
        {
          label: "Damage - Explosion",
          formula: (SpATK, Level) => 0.54 * SpATK + 7 * (Level - 1) + 150,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Psystrike",
      cooldown: 9,
      formulas: [
	    	{
          label: "Damage (x5)",
          formula: (SpATK, Level) => 0.23 * SpATK + 2 * (Level - 1) + 74,
          type: "special"
        },
        {
          label: "Damage - Final Hit",
          formula: (SpATK, Level) => 0.76 * SpATK + 7 * (Level - 1) + 247
        }
      ]
    },
    "s21": {
      name: "Recover",
      cooldown: 11,
      formulas: [
        {
          label: "Shield",
          formula: (SpATK, Level) => 0.7 * SpATK + 0 * (Level - 1) + 310,
          type: "special"
        },
        {
          label: "Shield",
          formula: (HP, Level) => 0.7 * HP ,
          type: "hp"
        }
      ]
    },
    
    "s22": {
      name: "Teleport",
      cooldown: 11,
      formulas: [
		  
      ]
    },
	"ult": {
		name: "Infinite Psyburn",
    cooldown: 134,
		formulas: [
        {
          label: "Damage ",
          formula: (SpATK, Level) => 1.4 * SpATK + 12 * (Level - 1) + 470,
          type: "special"
        }
	 ]
	}
  },

    "mimikyu": {
    "passive": {
          name: "Disguise",
          description: "Starts disguised, blocking damage and marking attackers when hit. Gains speed and damage against marked enemies, and reverts to disguise faster after knocking them out.",
          buff: {
          Speed: "10%",
          ATK: "10%",
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (2x)",
          formula: (ATK, Level) => 0.7 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Play Rough",
      cooldown: 7.5,
      formulas: [
        {
          label: "Damage - Pull and Explosion",
          formula: (ATK, Level) => 2.1 * ATK + 20 * (Level - 1) + 320,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Shadow Claw",
      cooldown: 4,
      formulas: [
	    {
          label: "Damage - Last Hit",
          formula: (ATK, Level) => 1.453 * ATK + 16 * (Level - 1) + 248,
          type: "physical"
        },
        {
          label: "Healing - Per Hit",
          formula: (ATK, Level) => 0.18 * ATK + 0 * (Level - 1) + 48,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Shadow Sneak",
      cooldown: 9,
      formulas: [
        {
          label: "Damage - After Teleporting",
          formula: (ATK, Level) => 1.73 * ATK + 13 * (Level - 1) + 350,
          type: "physical"
        },
        {
          label: "Damage - Additional to Marked Targets",
          type: "text-only",
		  additionalText: "4% Missing HP"
        },
		{
          label: "Healing",
          formula: (ATK, Level) => 0.6 * ATK + 0 * (Level - 1) + 300,
          type: "physical"
        },
		{
          label: "Healing - Additional",
          formula: (HP) => 0.1 * HP,
          type: "physical"
        },
      ]
    },
    
    "s22": {
      name: "Trick Room",
      cooldown: 7,
      formulas: [
      ]
    },
	"ult": {
		name: "Play With Me...",
    cooldown: 112,
		formulas: [
        {
          label: "Damage - per hit",
          formula: (ATK, Level) => 0.83 * ATK + 6 * (Level - 1) + 170,
          type: "physical"
        },
		{
          label: "Shield",
          formula: (ATK, Level) => 1.5 * ATK + 0 * (Level - 1) + 400,
          type: "physical"
        },
		{
          label: "Shield - Additional",
          formula: (HP) => 0.15 * HP,
          type: "physical"
        }
	 ]
	}
  },

    "miraidon": {
    "passive": {
          name: "Hadron Engine",
          description: "Hitting enemies creates Electric Terrain, boosting move damage for Miraidon and allies, enhancing ally goals, and weakening enemy goals. Size scales with consumed Aeos Energy.",
          buff: {
          },
          skillDamageMultiplier: 1.30, // 30% de aumento no dano das skills
          affectsBasicAttack: false,
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (SpATK, Level) => 0.25 * SpATK + 0 * (Level - 1) + 100,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Charge Beam",
      cooldown: 8.5,
      formulas: [
        {
          label: "Damage - Regular",
          formula: (SpATK, Level) => 0.74 * SpATK + 7 * (Level - 1) + 378,
          type: "special"
        },
        {
          label: "Damage - Boosted (per tick, x15 ticks)",
          formula: (SpATK, Level) => 0.20 * SpATK + 2 * (Level - 1) + 92,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Electro Drift",
      cooldown: 12,
      formulas: [
	    	{
          label: "Damage - Regular",
          formula: (SpATK, Level) => 1.13 * SpATK + 9 * (Level - 1) + 494,
          type: "special"
        },
        {
          label: "Damage - Boosted",
          formula: (SpATK, Level) => 1.66 * SpATK + 16 * (Level - 1) + 630,
		  type: "special"
        }
      ]
    },
    "s21": {
      name: "Thunder",
      cooldown: 10,
      formulas: [
        {
          label: "Damage (x5)",
          formula: (SpATK, Level) => 0.18 * SpATK + 6 * (Level - 1) + 200,
          type: "special"
        }
      ]
    },
    
    "s22": {
      name: "Parabolic Charge",
      cooldown: 11,
      formulas: [
		{
          label: "Damage",
          formula: (SpATK, Level) => 0.60 * SpATK + 12 * (Level - 1) + 350,
          type: "special"
        },
		{
          label: "Healing",
          formula: (HP) => 0.06 * HP,
          type: "hp"
        },
		{
          label: "Healing - Additional past the first target",
          formula: (HP) => 0.03 * HP,
          type: "hp"
        },
		{
          label: "Shield Skill Plus",
          formula: (SpATK, Level) => 0.75 * SpATK + 0 * (Level - 1) + 300,
          type: "special"
        },
		{
          label: "Shield - Additional Skill Plus",
          formula: (HP) => 0.1 * HP,
          type: "hp"
        },
      ]
    },
	"ult": {
		name: "Bright Future Meteor Storm",
    cooldown: 112,
		formulas: [
        {
          label: "Damage - Base per meteorite",
          formula: (SpATK, Level) => 0.7 * SpATK + 5 * (Level - 1) + 500,
          type: "special"
        }
	 ]
	}
  },

  	"mrmime": {
      "passive": {
          name: "Filter",
          description: "After using a move, takes 10% reduced damage for 2 seconds.",
          buff: {
            DmgTaken: "10%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SpATK, Level) => 0.5 * SpATK + 16 * (Level - 1) + 290,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Barrier",
      cooldown: 8,
      formulas: [
      ]
    },
    "s12": {
      name: "Psychic",
      cooldown: 6.5,
      formulas: [
	    	{
          label: "Damage - per Pulse",
          formula: (SpATK, Level) => 0.216 * SpATK + 2 * (Level - 1) + 51,
          type: "special"
        },
        {
          label: "Damage - Final Pulse",
          formula: (SpATK, Level) => 0.72 * SpATK + 8 * (Level - 1) + 170,
		  type: "special"
        }
      ]
    },
    "s21": {
      name: "Confusion",
      cooldown: 5,
      formulas: [
        {
          label: "Damage",
          formula: (SpATK, Level) => 1.4875 * SpATK + 14 * (Level - 1) + 340,
          type: "special"
        },
		{
          label: "Damage - Stunned (Wall Hit)",
          formula: (SpATK, Level) => 2 * SpATK + 16 * (Level - 1) + 450,
          type: "special"
        },
		{
          label: "Damage - Stunned (Power Swap)",
          formula: (SpATK, Level) => 0.8 * SpATK + 6 * (Level - 1) + 160,
          type: "special"
        },
		{
          label: "Damage Skill Plus",
          formula: (SpATK, Level) => 1.63 * SpATK + 18 * (Level - 1) + 390,
          type: "special"
        },
		{
          label: "Damage - Stunned (Wall Hit) Skill Plus",
          formula: (SpATK, Level) => 2.19 * SpATK + 21 * (Level - 1) + 500,
          type: "special"
        },
		{
          label: "Damage - Stunned (Power Swap) Skill Plus",
          formula: (SpATK, Level) => 0.88 * SpATK + 7 * (Level - 1) + 200,
          type: "special"
        }
      ]
    },
    
    "s22": {
      name: "Power Swap",
      cooldown: 4.5,
      formulas: [
		{
          label: "Damage - per Tick",
          formula: (SpATK, Level) => 0.18 * SpATK + 1 * (Level - 1) + 30,
          type: "special"
        },
		{
          label: "Healing - per Tick",
          formula: (attribute, Level) => 0.21 * attribute + 2 * (Level - 1) + 15,
          type: "heal",
          healAttribute: "SpATK"
        }
      ]
    },
	"ult": {
		name: "Showtime",
    cooldown: 100,
		formulas: [
        {
          label: "Damage - First 3 Hits",
          formula: (SpATK, Level) => 0.79 * SpATK + 5 * (Level - 1) + 220,
          type: "special"
        },
		{
          label: "Damage - Final Hit",
          formula: (SpATK, Level) => 1.58 * SpATK + 10 * (Level - 1) + 440,
          type: "special"
        }
	 ]
	}
  },

    "ninetales": {
      "passive": {
          name: "Snow Warning",
          description: "Attacks sling snow to slow enemies; hitting the same target 4 times freezes them.",
          buff: {
          },
          formulas: [
          {
          label: "Damage",
          formula: (SpATK, Level) => 0.6 * SpATK + 0 * (Level - 1) + 100,
          type: "special"
          }
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SpATK, Level) => 0.532 * SpATK + 13 * (Level - 1) + 250,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Avalanche",
      cooldown: 7.5,
      formulas: [
		{
          label: "Damage - Wind or Wall",
          formula: (SpATK, Level) => 0.36 * SpATK + 8 * (Level - 1) + 190,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Dazzling Gleam",
      cooldown: 7.5,
      formulas: [
	    	{
          label: "Damage",
          formula: (SpATK, Level) => 0.6 * SpATK + 10 * (Level - 1) + 320,
          type: "special"
        },
        {
          label: "Damage Skill Plus",
          formula: (SpATK, Level) => 0.61 * SpATK + 10 * (Level - 1) + 380,
		  type: "special"
        }
      ]
    },
    "s21": {
      name: "Blizzard",
      cooldown: 7.5,
      formulas: [
        {
          label: "Damage - Initial Blast",
          formula: (SpATK, Level) => 0.39 * SpATK + 4 * (Level - 1) + 250,
          type: "special"
        },
		{
          label: "Damage - Second Hit",
          formula: (SpATK, Level) => 0.78 * SpATK + 8 * (Level - 1) + 500,
          type: "special",
		  additionalText: "Deals twice the damage of the first hit."
        },
		{
          label: "Damage - Area (8 Ticks)",
          formula: (SpATK, Level) => 0.17 * SpATK + 2 * (Level - 1) + 110,
          type: "special"
        },
		{
          label: "Damage - Initial Blast Skill Plus",
          formula: (SpATK, Level) => 0.41 * SpATK + 6 * (Level - 1) + 270,
          type: "special"
        },
		{
          label: "Damage - Second Hit Skill Plus",
          formula: (SpATK, Level) => 0.82 * SpATK + 12 * (Level - 1) + 540,
          type: "special",
		  additionalText: "Deals twice the damage of the first hit."
        },
		{
          label: "Damage - Area (8 Ticks) Skill Plus",
          formula: (SpATK, Level) => 0.18 * SpATK + 3 * (Level - 1) + 115,
          type: "special"
        }
      ]
    },
    
    "s22": {
      name: "Aurora Veil",
      cooldown: 13,
      formulas: [
		{
          label: "Heal - per Boosted Attack",
          formula: (SpATK, Level) => 0.1 * SpATK + 2 * (Level - 1) + 40,
          type: "special"
        }
      ]
    },
	"ult": {
		name: "Snow Globe",
    cooldown: 112,
		formulas: [
        {
          label: "Damage - Frozen Enemies",
          formula: (SpATK, Level) => 2.24 * SpATK + 32 * (Level - 1) + 1520,
          type: "special"
        },
		{
          label: "Damage - Final Hit",
          formula: (SpATK, Level) => 1.568 * SpATK + 30 * (Level - 1) + 1064,
          type: "special"
        }
	 ]
	}
  },
    "pawmot": {
    "passive": {
          name: "Iron Fist",
          description: "Hitting with a move empowers the next basic attack, dealing bonus damage and healing. In Fighter Mode, it also dashes to the target and boosts attack speed with stacking potential.",
          buff: {
          AtkSPD: "30%"
          },
          formulas: [
		{
          label: "Damage - Enhanced Auto",
          formula: (ATK, Level) => 1.6 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Heal",
          formula: (ATK, Level) => 0.76 * ATK + 7 * (Level - 1) + 88,
          type: "physical"
        },
		{
          label: "Damage - Enhanced Auto (Fighter Mode)",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Thunder Punch",
      cooldown: 6,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.53 * ATK + 31 * (Level - 1) + 440,
          type: "physical"
        },
		{
          label: "Damage (Fighter Mode)",
          formula: (ATK, Level) => 3.52 * ATK + 44 * (Level - 1) + 616,
          type: "physical"
        },
		{
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 2.92 * ATK + 35 * (Level - 1) + 506,
          type: "physical"
        },
		{
          label: "Damage (Fighter Mode) Skill Plus",
          formula: (ATK, Level) => 4.07 * ATK + 51 * (Level - 1) + 708,
          type: "physical"
        },
      ]
    },
    "s12": {
      name: "Supercell Slam",
      cooldown: 6,
      formulas: [
	    {
          label: "Damage - First Use",
          formula: (ATK, Level) => 1.3 * ATK + 12 * (Level - 1) + 172,
          type: "physical"
        },
        {
          label: "Damage - Second Use",
          formula: (ATK, Level) => 1.7 * ATK + 16 * (Level - 1) + 225,
          type: "physical"
        },
		{
          label: "Damage - First Use (Fighter Mode)",
          formula: (ATK, Level) => 1.81 * ATK + 18 * (Level - 1) + 242,
          type: "physical"
        },
		{
          label: "Damage - Second Use (Fighter Mode)",
          formula: (ATK, Level) => 2.37 * ATK + 22 * (Level - 1) + 315,
          type: "physical"
        },
		{
          label: "Damage - First Use Skill Plus",
          formula: (ATK, Level) => 1.44 * ATK + 14 * (Level - 1) + 192,
          type: "physical"
        },
        {
          label: "Damage - Second Use Skill Plus",
          formula: (ATK, Level) => 2.09 * ATK + 20 * (Level - 1) + 278,
          type: "physical"
        },
		{
          label: "Damage - First Use (Fighter Mode) Skill Plus",
          formula: (ATK, Level) => 2.16 * ATK + 22 * (Level - 1) + 288,
          type: "physical"
        },
		{
          label: "Damage - Second Use (Fighter Mode) Skill Plus",
          formula: (ATK, Level) => 2.37 * ATK + 26 * (Level - 1) + 362,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Volt Switch",
      cooldown: 8,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.44 * ATK + 15 * (Level - 1) + 220,
          type: "physical"
        },
        {
          label: "Damage (Fighter Mode)",
          formula: (ATK, Level) => 2.86 * ATK + 31 * (Level - 1) + 440,
          type: "physical"
        }
      ]
    },
    
    "s22": {
      name: "Mach Punch",
      cooldown: 7,
      formulas: [
		{
          label: "Damage",
          formula: (ATK, Level) => 1.8 * ATK + 20 * (Level - 1) + 270,
          type: "physical"
        },
        {
          label: "Damage (Fighter Mode)",
          formula: (ATK, Level) => 0.85 * ATK + 9 * (Level - 1) + 126,
          type: "physical"
        },
		{
          label: "Damage (Fighter Mode) Skill Plus",
          formula: (ATK, Level) => 0.96 * ATK + 11 * (Level - 1) + 145,
          type: "physical"
        },
      ]
    },
	"ult": {
		name: "Zip Zap Full-Charge Spark",
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 3.02 * ATK + 36 * (Level - 1) + 504,
          type: "physical"
        }
	 ]
	}
  },

   	"pikachu": {
      "passive": {
          name: "Static",
          description: "When damaged, paralyzes nearby enemies, slowing their movement and attack speed (30s cooldown).",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (SpATK, Level) => 0.38 * SpATK + 10 * (Level - 1) + 200,
          type: "special"
        }
      ]
	},

    "s11": {
      name: "Thunderbolt",
      cooldown: 7,
      formulas: [
		{
          label: "Damage - per Bolt",
          formula: (SpATK, Level) => 0.50 * SpATK + 12 * (Level - 1) + 500,
          type: "special"
        },
		{
          label: "Damage Skill Plus",
          formula: (SpATK, Level) => 0.59 * SpATK + 14 * (Level - 1) + 600,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Electro Ball",
      cooldown: 5.5,
      formulas: [
	    {
          label: "Damage - Area",
          formula: (SpATK, Level) => 0.625 * SpATK + 24 * (Level - 1) + 503,
          type: "special"
        },
        {
          label: "Damage - Execute",
		  type: "text-only",
		  additionalText: "6% of enemy missing HP."
        },
		{
          label: "Damage - Area Skill Plus",
          formula: (SpATK, Level) => 0.727 * SpATK + 28 * (Level - 1) + 608,
          type: "special"
        },
		{
          label: "Damage - Execute Skill Plus",
		  type: "text-only",
		  additionalText: "8% of enemy missing HP."
        },
      ]
    },
    "s21": {
      name: "Volt Tackle",
      cooldown: 9,
      formulas: [
        {
          label: "Damage (5x)",
          formula: (SpATK, Level) => 0.15 * SpATK + 3 * (Level - 1) + 150,
          type: "special"
        }
      ]
    },
    
    "u11": {
      name: "Thunder",
      cooldown: 7,
      formulas: [
		{
          label: "Damage - Area (5x)",
          formula: (SpATK, Level) => 0.209 * SpATK + 5 * (Level - 1) + 218,
          type: "special"
        }
      ]
    },
	"ult": {
		name: "Thunderstorm",
    cooldown: 89,
		formulas: [
        {
          label: "Damage",
          formula: (SpATK, Level) => 0.451 * SpATK + 9 * (Level - 1) + 450,
          type: "special"
        }
	 ]
	}
  },

    "psyduck": {
    "passive": {
          name: "Swift Swim",
          description: "Gains speed when damaged. Taking damage fills a headache gauge; when full, triggers a powerful unstoppable burst that shoves enemies, resets cooldowns, and empowers moves.",
          buff: {
            Speed: "40%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
		}
      ]
	},

    "s11": {
      name: "Surf",
      cooldown: 7.5,
      formulas: [
		{
          label: "Damage",
          formula: (SpATK, Level) => 0.65 * SpATK + 4 * (Level - 1) + 304,
          type: "special"
        },
		{
          label: "Damage - Mysterious Power (x2)",
          formula: (SpATK, Level) => 0.45 * SpATK + 2 * (Level - 1) + 212,
          type: "special"
        }
      ]
    },
	"s12": {
      name: "Bubble Beam",
      cooldown: 6.5,
      formulas: [
		{
          label: "Damage",
          formula: (SpATK, Level) => 0.8 * SpATK + 4 * (Level - 1) + 360,
          type: "special"
        },
		{
          label: "Damage - Bubbles (x3)",
          formula: (SpATK, Level) => 0.4 * SpATK + 2 * (Level - 1) + 180,
          type: "special"
        },
		{
          label: "Damage - Mysterious Power",
          formula: (SpATK, Level) => 0.96 * SpATK + 5 * (Level - 1) + 432,
          type: "special"
        },
		{
          label: "Damage - Bubbles (x3) - Mysterious Power",
          formula: (SpATK, Level) => 0.48 * SpATK + 2 * (Level - 1) + 216,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Disable",
      cooldown: 8,
      formulas: [
	    {
          label: "Damage",
          formula: (SpATK, Level) => 0.544 * SpATK + 3 * (Level - 1) + 260,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Psychic",
      cooldown: 7.5,
      formulas: [
        {
          label: "Damage",
          formula: (SpATK, Level) => 1.035 * SpATK + 9 * (Level - 1) + 495,
          type: "special"
        }
      ]
    },
	"ult": {
		name: "Full-Power Psy-ay-ay!",
    cooldown: 112,
		formulas: [
        {
          label: "Damage",
          formula: (SpATK, Level) => 0.6 * SpATK + 6 * (Level - 1) + 300,
          type: "special"
        }
	 ]
	}
  },

  	"raichu": {
      "passive": {
          name: "Surge Surfer",
          description: "Can attack while moving but is slowed when attacking or using certain moves. Gains a dash after using a move or boosted attack.",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (SPATK, Level) => 0.72 * SPATK + 0 * (Level - 1) + 80,
          type: "special"
		},
		{
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.936 * SPATK + 0 * (Level - 1) + 104,
          type: "special"
		}
      ]
	},

    "s11": {
      name: "Stored Power",
      cooldown: 6,
      formulas: [
		{
          label: "Damage",
          formula: (SpATK, Level) => 0.72 * SpATK + 4 * (Level - 1) + 80,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Electro Ball",
      cooldown: 6,
      formulas: [
	    {
          label: "Damage",
          formula: (SpATK, Level) => 1.93 * SpATK + 0 * (Level - 1) + 370,
          type: "special"
        },
		{
          label: "Damage - Activated by Thunderbolt",
          formula: (SpATK, Level) => 2.13 * SpATK + 0 * (Level - 1) + 404,
          type: "special"
        },
		{
          label: "Damage - DoT (8 Ticks) Skill Plus",
          formula: (SpATK, Level) => 0.085 * SpATK + 0 * (Level - 1) + 20,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Thunderbolt",
      cooldown: 6,
      formulas: [
        {
          label: "Damage",
          formula: (SpATK, Level) => 1.6 * SpATK + 0 * (Level - 1) + 380,
          type: "special"
        }
      ]
    },
	"s22": {
      name: "Psychic",
      cooldown: 9,
      formulas: [
        {
          label: "Damage",
          formula: (SpATK, Level) => 1.024 * SpATK + 0 * (Level - 1) + 240,
          type: "special"
        },
		{
          label: "Damage - Additional",
          formula: (SpATK, Level) => 0.16 * SpATK + 0 * (Level - 1) + 40,
          type: "special"
        },
		{
          label: "Damage - DoT (5 Ticks) Skill Plus",
          formula: (SpATK, Level) => 0.1024 * SpATK + 0 * (Level - 1) + 24,
          type: "special"
        }
      ]
    },
	"ult": {
		name: "Thunderstorm Aerial",
    cooldown: 112,
		formulas: [
        {
          label: "Damage",
          formula: (SpATK, Level) => 1.68 * SpATK + 0 * (Level - 1) + 400,
          type: "special"
        },
		{
          label: "Damage - DoT (5 Ticks)",
          formula: (SpATK, Level) => 0.336 * SpATK + 0 * (Level - 1) + 80,
          type: "special"
        }
	 ]
	}
  },

  	"rapidash": {
    "passive": {
          name: "Pastel Veil",
          description: "Charges a psychic shield by moving, granting hindrance resistance when full. Higher movement speed also significantly boosts move damage.",
          buff: {
          },
          skillDamageMultiplier: 1.60,
          affectsBasicAttack: false,
          formulas: [
          {
          label: "Shield",
          formula: (SPATK, Level) => 1.12 * SPATK + 0 * (Level - 1) + 280,
          type: "special"
		      }
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (SPATK, Level) => 0.675 * SPATK + 0 * (Level - 1) + 90,
          type: "special"
		}
      ]
	},

    "s11": {
      name: "Dazzling Gleam",
      cooldown: 4.5,
      formulas: [
		{
          label: "Damage",
          formula: (SpATK, Level) => 1.37 * SpATK + 14 * (Level - 1) + 194,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Fairy Wind",
      cooldown: 7,
      formulas: [
	    {
          label: "Damage - First 2 Hits (per Hit)",
          formula: (SpATK, Level) => 1.04 * SpATK + 13 * (Level - 1) + 145,
          type: "special"
        },
		{
          label: "Damage - Third Hit",
          formula: (SpATK, Level) => 1.7 * SpATK + 22 * (Level - 1) + 260,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Smart Strike",
      cooldown: 9,
      formulas: [
        {
          label: "Damage",
          formula: (SpATK, Level) => 0.97 * SpATK + 8 * (Level - 1) + 155,
          type: "special"
        }
      ]
    },
	"s22": {
      name: "Agility",
      cooldown: 2,
      formulas: [
      ]
    },
	"ult": {
		name: "Triad Blitz",
    cooldown: 112,
		formulas: [
        {
          label: "Damage",
          formula: (SpATK, Level) => 1 * SpATK + 8 * (Level - 1) + 200,
          type: "special"
        }
	 ]
	}
  },

    "sableye": {
      "passive": {
          name: "Prankster",
          description: "Enters stealth with increased speed when unseen by enemies, briefly maintaining stealth even after being spotted until attacking.",
          buff: {
            Speed: "10%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.5 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Knock Off",
      cooldown: 8.5,
      formulas: [
        {
          label: "Damage (per Hit)",
          formula: (ATK, Level) => 0.56 * ATK + 6 * (Level - 1) + 240,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Shadow Sneak",
      cooldown: 12,
      formulas: [
	    {
          label: "Damage - Additional",
          formula: (ATK, Level) => 1.13 * ATK + 12 * (Level - 1) + 480,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Feint Attack",
      cooldown: 7,
      formulas: [
        {
          label: "Damage - per Tick (9 Ticks)",
          formula: (ATK, Level) => 0.33 * ATK + 2 * (Level - 1) + 80,
          type: "physical"
        }
      ]
    },
    
    "s22": {
		name: "Confuse Ray",
    cooldown: 10,
      	formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.05 * ATK + 12 * (Level - 1) + 450,
          type: "physical"
        }
      ]
    },
	
	"ult": {
		name: "Chaos Glower",
    cooldown: 100,
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.84 * ATK + 16 * (Level - 1) + 790,
          type: "physical"
        }
	 ]
	}
  },

    "scizor": {
      "passive": {
          name: "Technician",
          description: "After using a move, the next basic attack hits twice in a row, with the second hit dealing reduced damage.",
          buff: {
          },
          formulas: [
            {
          label: "Damage - Second Hit",
          formula: (ATK, Level) => 0.5 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s12": {
      name: "Bullet Punch",
      cooldown: 4.5,
      formulas: [
        {
          label: "Damage - Initial Punch",
          formula: (ATK, Level) => 1.14 * ATK + 9 * (Level - 1) + 220,
          type: "physical"
        },
		{
          label: "Damage - Subsequent Punches",
          formula: (firstHitDamage, Level) => 0.3 * firstHitDamage, // 25% do primeiro hit
		  type: "dependent",
		  dependsOn: 0
        },
		{
          label: "Healing - per Hit (3-5 hits)",
          formula: (ATK, Level) => 0.235 * ATK + 2 * (Level - 1) + 48,
          type: "physical"
        },
		{
          label: "Shield Skill Plus",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 300,
          type: "physical"
        },
      ]
    },
    "s21": {
      name: "Double Hit",
      cooldown: 7,
      formulas: [
	    {
          label: "Damage",
          formula: (ATK, Level) => 1.3 * ATK + 12 * (Level - 1) + 375,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Swords Dance",
      cooldown: 8.5,
      formulas: [
        {
          label: "Damage - Eighth Attack",
          formula: (ATK, Level) => 1.22 * ATK + 9 * (Level - 1) + 420,
          type: "physical"
        }
      ]
    },
	
	"ult": {
		name: "Red Illusion Dive",
    cooldown: 112,
		formulas: [
        {
          label: "Damage - Initial Punch, Ground Punch, & Copy Contact",
          formula: (ATK, Level) => 1.29 * ATK + 6 * (Level - 1) + 290,
          type: "physical"
        },
		{
          label: "Damage - Main Target (Copy Dash x5), Grab",
          formula: (ATK, Level) => 0.387 * ATK + 2 * (Level - 1) + 87,
          type: "physical"
        }
	 ]
	}
  },

    "scyther": {
      "passive": {
          name: "Technician",
          description: "After using a move, the next basic attack hits twice in a row, with the second hit dealing reduced damage.",
          buff: {
          },
          formulas: [
            {
          label: "Damage - Second Hit",
          formula: (ATK, Level) => 0.5 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (First Hit)",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted (Second Hit)",
          formula: (ATK, Level) => 0.5 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Dual Wingbeat",
      cooldown: 6,
      formulas: [
        {
          label: "Damage - Slash",
          formula: (ATK, Level) => 0.97 * ATK + 12 * (Level - 1) + 280,
          type: "physical"
        },
		{
          label: "Damage - Dash",
          formula: (ATK, Level) => 0.97 * ATK + 12 * (Level - 1) + 280,
          type: "physical"
        },
		{
          label: "Damage - Execute",
      	  type: "text-only",
          additionalText: "20% of enemy missing HP. Against Wild Pokemon: The total damage is capped at 1200."
        },
		{
          label: "Healing",
          formula: (ATK, Level) => 1.15 * ATK + 0 * (Level - 1) + 345,
          type: "physical"
        },
		{
          label: "Damage - Slash Skill Plus",
          formula: (ATK, Level) => 1.06 * ATK + 13 * (Level - 1) + 315,
          type: "physical"
        },
		{
          label: "Damage - Dash Skill Plus",
          formula: (ATK, Level) => 1.06 * ATK + 13 * (Level - 1) + 315,
          type: "physical"
        }
      ]
    },

    "s21": {
      name: "Double Hit",
      cooldown: 7,
      formulas: [
	    {
          label: "Damage",
          formula: (ATK, Level) => 1.3 * ATK + 12 * (Level - 1) + 375,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Swords Dance",
      cooldown: 8.5,
      formulas: [
        {
          label: "Damage - Eighth Attack",
          formula: (ATK, Level) => 1.22 * ATK + 9 * (Level - 1) + 420,
          type: "physical"
        }
      ]
    },
	
	"ult": {
		name: "Green Illusion Dive",
    cooldown: 112,
		formulas: [
        {
          label: "Damage - Initial, Dash, & Copy Dash",
          formula: (ATK, Level) => 0.93 * ATK + 5 * (Level - 1) + 260,
          type: "physical"
        },
		{
          label: "Heal - per Copy",
          formula: (ATK, Level) => 0.465 * ATK + 3 * (Level - 1) + 130,
          type: "physical"
        }
	 ]
	}
  },

  	"slowbro": {
      "passive": {
          name: "Oblivious",
          description: "Stores lost HP temporarily and deals damage to reduce enemy Sp. Def with certain moves, stacking up to 5 times.",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
		{
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
		},
        {
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 1.1 * SPATK + 9 * (Level - 1) + 180,
          type: "special"
		}
      ]
	},

    "s11": {
      name: "Scald",
      cooldown: 5,
      formulas: [
		{
          label: "Damage - per Hit (3 Hits)",
          formula: (SpATK, Level) => 1.1 * SpATK + 8 * (Level - 1) + 172,
          type: "special"
        },
		{
          label: "Damage - Burn (5 Ticks)",
          formula: (SpATK, Level) => 0.2 * SpATK + 1 * (Level - 1) + 32,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Surf",
      cooldown: 7,
      formulas: [
	    {
          label: "Damage - per Wave (3 Waves)",
          formula: (SpATK, Level) => 1.03 * SpATK + 6 * (Level - 1) + 210,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Amnesia",
      cooldown: 9,
      formulas: [
      ]
    },
	"s22": {
      name: "Telekinesis",
      cooldown: 7.5,
      formulas: [
      ]
    },
	"ult": {
		name: "Slowbeam",
    cooldown: 112,
		formulas: [
        {
          label: "Damage (x6)",
          formula: (SpATK, Level) => 0.8 * SpATK + 3 * (Level - 1) + 170,
          type: "special"
        }
	 ]
	}
  },

    "snorlax": {
       "passive": {
          name: "Gluttony",
          description: "Gains movement speed near berries/food and enhances healing from berries and Alcremie's Recover.",
          buff: {
            Speed: "25%"
          },
          formulas: [
            {
          label: "Heal - Additional",
          formula: (HP, Level) => 0.01 * HP + 0 * (Level - 1) + 23,
          type: "hp"
        },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) =>  0.86 * ATK + 9 * (Level - 1) + 170,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Flail",
      cooldown: 7,
      formulas: [
        {
          label: "Basic Attack - Above 80% HP",
          formula: (ATK, Level, HP) => 0.45 * ATK + 7 * (Level - 1) + 90 + 0.05 * HP,
          type: "physical"
        },
		{
          label: "Basic Attack - Less 80% HP",
          formula: (ATK, Level, HP) => 0.5 * ATK + 8 * (Level - 1) + 150 + 0.06 * HP,
          type: "physical"
        },
		{
          label: "Basic Attack - Less 60% HP",
          formula: (ATK, Level, HP) => 0.55 * ATK + 9 * (Level - 1) + 210 + 0.07 * HP,
          type: "physical"
        },
		{
          label: "Basic Attack - Less 40% HP",
          formula: (ATK, Level, HP) => 0.6 * ATK + 10 * (Level - 1) + 270 + 0.08 * HP,
          type: "physical"
        },
		{
          label: "Basic Attack - Less 20% HP",
          formula: (ATK, Level, HP) => 0.65 * ATK + 11 * (Level - 1) + 330 + 0.09 * HP,
          type: "physical"
        },
		{
          label: "Boosted Attack - Above 80% HP",
          formula: (ATK, Level, HP) => 0.675 * ATK + 10 * (Level - 1) + 135 + 0.06 * HP,
          type: "physical"
        },
		{
          label: "Boosted Attack - Less 80% HP",
          formula: (ATK, Level, HP) => 0.75 * ATK + 11 * (Level - 1) + 225 + 0.07 * HP,
          type: "physical"
        },
		{
          label: "Boosted Attack - Less 60% HP",
          formula: (ATK, Level, HP) => 0.825 * ATK + 12 * (Level - 1) + 315 + 0.08 * HP,
          type: "physical"
        },
		{
          label: "Boosted Attack - Less 40% HP",
          formula: (ATK, Level, HP) => 0.9 * ATK + 13 * (Level - 1) + 405 + 0.09 * HP,
          type: "physical"
        },
		{
          label: "Boosted Attack - Less 20% HP",
          formula: (ATK, Level, HP) => 0.975 * ATK + 14 * (Level - 1) + 495 + 0.1 * HP,
          type: "physical"
        },
		{
          label: "Basic Attack - Above 80% HP Skill Plus",
          formula: (ATK, Level, HP) => 0.81 * ATK + 7 * (Level - 1) + 100 + 0.05 * HP,
          type: "physical"
        },
		{
          label: "Basic Attack - Less 80% HP Skill Plus",
          formula: (ATK, Level, HP) => 0.86 * ATK + 8 * (Level - 1) + 160 + 0.06 * HP,
          type: "physical"
        },
		{
          label: "Basic Attack - Less 60% HP Skill Plus",
          formula: (ATK, Level, HP) => 0.91 * ATK + 9 * (Level - 1) + 220 + 0.07 * HP,
          type: "physical"
        },
		{
          label: "Basic Attack - Less 40% HP Skill Plus",
          formula: (ATK, Level, HP) => 0.96 * ATK + 10 * (Level - 1) + 280 + 0.08 * HP,
          type: "physical"
        },
		{
          label: "Basic Attack - Less 20% HP Skill Plus",
          formula: (ATK, Level, HP) => 1.01 * ATK + 11 * (Level - 1) + 340 + 0.09 * HP,
          type: "physical"
        },
		{
          label: "Boosted Attack - Above 80% HP Skill Plus",
          formula: (ATK, Level, HP) => 1.215 * ATK + 10 * (Level - 1) + 150 + 0.06 * HP,
          type: "physical"
        },
		{
          label: "Boosted Attack - Less 80% HP Skill Plus",
          formula: (ATK, Level, HP) => 1.29 * ATK + 11 * (Level - 1) + 240 + 0.07 * HP,
          type: "physical"
        },
		{
          label: "Boosted Attack - Less 60% HP Skill Plus",
          formula: (ATK, Level, HP) => 1.365 * ATK + 12 * (Level - 1) + 330 + 0.08 * HP,
          type: "physical"
        },
		{
          label: "Boosted Attack - Less 40% HP Skill Plus",
          formula: (ATK, Level, HP) => 1.44 * ATK + 13 * (Level - 1) + 420 + 0.09 * HP,
          type: "physical"
        },
		{
          label: "Boosted Attack - Less 20% HP Skill Plus",
          formula: (ATK, Level, HP) => 1.515 * ATK + 14 * (Level - 1) + 510 + 0.1 * HP,
          type: "physical"
        }
      ]
    },

    "s12": {
      name: "Heavy Slam",
      cooldown: 6,
      formulas: [
	    {
          label: "Damage",
          formula: (ATK, Level) => 1.6 * ATK + 12 * (Level - 1) + 320,
          type: "physical"
        },
		{
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 2.09 * ATK + 17 * (Level - 1) + 416,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Block",
      cooldown: 8,
      formulas: [
        {
          label: "Shield",
          formula: (HP) => 0.174 * HP + 1560,
          type: "hp"
        }
      ]
    },

	"s2": {
      name: "Yawn",
      cooldown: 10.5,
      formulas: [
      ]
    },
	
	"ult": {
		name: "Power Nap",
    cooldown: 89,
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.32 * ATK + 8 * (Level - 1) + 360,
          type: "physical"
        },
		{
          label: "Damage - DoT (3 Ticks)",
          formula: (ATK, Level) => 0.66 * ATK + 4 * (Level - 1) + 180,
          type: "physical",
		  additionalText: "Damage - DoT (3 Ticks): Deals 50% of the initial damage, 3 times."
        }
	 ]
	}
  },

  "suicune": {
    "passive": {
          name: "Pressure",
          description: "Executes frozen low-HP enemies with bonus true damage. Moves grant shields and create/flood areas to freeze and mark enemies for additional effects.",
          buff: {
          },
          formulas: [
            {
          label: "Shield",
          formula: (SpATK, Level) => 0.5 * SpATK + 0 * (Level - 1) + 200,
          type: "special"
        },
         {
          label: "Damage - Freezing",
          formula: (SpATK, Level) => 0.25 * SpATK + 7 * (Level - 1) + 100,
          type: "special"
        },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
		{
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
		},
        {
          label: "Damage - per tick",
          formula: (SPATK, Level) => 0.21 * SPATK + 0 * (Level - 1) + 94,
          type: "special"
		},
		{
          label: "Damage - Frozen Bonus",
          formula: (SPATK, Level) => 0.1 * SPATK + 0 * (Level - 1) + 44,
          type: "special"
		}
      ]
	},

    "s11": {
      name: "Whirlpool",
      cooldown: 7.5,
      formulas: [
		{
          label: "Damage - Per tick",
          formula: (SpATK, Level) => 0.18 * SpATK + 3 * (Level - 1) + 93,
          type: "special"
        },
		{
          label: "Damage - Whirlpool reposition",
          formula: (SpATK, Level) => 0.34 * SpATK + 4 * (Level - 1) + 180,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Surf",
      cooldown: 5,
      formulas: [
	    {
          label: "Damage",
          formula: (SpATK, Level) => 0.55 * SpATK + 4 * (Level - 1) + 270,
          type: "special"
        },
		{
          label: "Damage Skill Plus",
          formula: (SpATK, Level) => 0.66 * SpATK + 5 * (Level - 1) + 324,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Ice Beam",
      cooldown: 7.5,
      formulas: [
		{
          label: "Damage Skill Plus",
          formula: (SpATK, Level) => 0.75 * SpATK + 5 * (Level - 1) + 380,
          type: "special"
        }
      ]
    },
	"s22": {
      name: "Icy Wind",
      cooldown: 5,
      formulas: [
		{
          label: "Damage",
          formula: (SpATK, Level) => 0.75 * SpATK + 3 * (Level - 1) + 360,
          type: "special"
        },
		{
          label: "Damage - Pillar break",
          formula: (SpATK, Level) => 0.75 * SpATK + 3 * (Level - 1) + 360,
          type: "special"
        }
      ]
    },
	"ult": {
		name: "Endless Ice Spikes",
    cooldown: 112,
		formulas: [
        {
          label: "Damage - Spike Creation",
          formula: (SpATK, Level) => 1 * SpATK + 6 * (Level - 1) + 500,
          type: "special"
        },
		{
          label: "Damage - Spike detonation",
          formula: (SpATK, Level) => 1 * SpATK + 6 * (Level - 1) + 500,
          type: "special"
        }
	 ]
	}
  },

  "sylveon": {
    "passive": {
          name: "Pixilate",
          description: "Dealing or taking damage increases Sp. Atk and Sp. Def, stacking up to 6 times.",
          buff: {
            SpATK: "2.5%",
            SpDEF: "2.5%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
		{
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
		},
        {
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.35 * SPATK + 10 * (Level - 1) + 180,
          type: "special"
		}
      ]
	},

    "s11": {
      name: "Mystical Fire",
      cooldown: 7,
      formulas: [
		{
          label: "Damage - First Hit",
          formula: (SpATK, Level) => 0.74 * SpATK + 12 * (Level - 1) + 446,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Hyper Voice",
      cooldown: 5.5,
      formulas: [
	    {
          label: "Damage - Near (6x)",
          formula: (SpATK, Level) => 0.25 * SpATK + 6 * (Level - 1) + 105,
          type: "special"
        },
		{
          label: "Damage - Far (6x)",
          formula: (SpATK, Level) => 0.42 * SpATK + 10 * (Level - 1) + 175,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Draining Kiss",
      cooldown: 9,
      formulas: [
		{
          label: "Damage (3x)",
          formula: (SpATK, Level) => 0.26 * SpATK + 4 * (Level - 1) + 160,
          type: "special"
        },
		{
          label: "Healing (3x)",
          formula: (SpATK, Level) => 0.202 * SpATK + 0 * (Level - 1) + 166,
          type: "special"
        },
		{
          label: "Healing (3x) Skill Plus",
          formula: (SpATK, Level) => 0.303 * SpATK + 0 * (Level - 1) + 249,
          type: "special"
        }
      ]
    },
	"s22": {
      name: "Calm Mind",
      cooldown: 9.5,
      formulas: [
		{
          label: "Shield",
          formula: (SpATK, Level) => 0.90 * SpATK + 0 * (Level - 1) + 100,
          type: "special"
        }
      ]
    },
	"ult": {
		name: "Fairy Frolic",
    cooldown: 112,
		formulas: [
        {
          label: "Damage",
          formula: (SpATK, Level) => 1.3 * SpATK + 13 * (Level - 1) + 750,
          type: "special"
        }
	 ]
	}
  },

    "talonflame": {
      "passive": {
          name: "Gale Wings",
          description: "Gains 15% movement speed while at 85% HP or higher.",
          buff: {
            Speed: "15%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.25 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
      ]
	},

    "s11": {
      name: "Aerial Ace",
      cooldown: 5,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.1 * ATK + 14 * (Level - 1) + 400,
          type: "physical"
        },
		{
          label: "Heal",
          formula: (ATK, Level) => 0.5 * ATK + 0 * (Level - 1) + 45,
          type: "physical"
        },
		{
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 1.25 * ATK + 16 * (Level - 1) + 420,
          type: "physical"
        }
      ]
    },

    "s12": {
      name: "Flame Charge",
      cooldown: 6.5,
      formulas: [
	    {
          label: "Damage",
          formula: (ATK, Level) => 1.23 * ATK + 14 * (Level - 1) + 374,
          type: "physical"
        },
        {
          label: "Defense Pierce",
          formula: (ATK, Level) => 0 * ATK + 3 * (Level - 1) + 60,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Fly",
      cooldown: 12,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.21 * ATK + 21 * (Level - 1) + 910,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Brave Bird",
      cooldown: 8.5,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.53 * ATK + 20 * (Level - 1) + 880,
          type: "physical"
        }
      ]
    },
	
	"ult": {
		name: "Flame Sweep",
    cooldown: 100,
		formulas: [
        {
          label: "Damage (2x)",
          formula: (ATK, Level) => 1.24 * ATK + 11 * (Level - 1) + 510,
          type: "physical"
        },
	 ]
	}
  },

    "tinkaton": {
      "passive": {
          name: "Mold Breaker",
          description: "Deals bonus damage to shielded enemies and permanently increases Attack with each hit, enhancing move range at certain stacks.",
          buff: {
            ATK: "30%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.8 * ATK + 60 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Healing",
          type: "text-only",
          additionalText: "20% Missing HP"
        },

      ]
	},

    "s11": {
      name: "Gigaton Hammer",
      cooldown: 6,
      formulas: [
        {
          label: "Damage - Low charge",
          formula: (ATK, Level) => 1.68 * ATK + 12 * (Level - 1) + 260,
          type: "physical",
          additionalText: "Throw duration: 0.5s"
        },
		{
          label: "Damage - Mid charge",
          formula: (ATK, Level) => 2.94 * ATK + 21 * (Level - 1) + 454,
          type: "physical",
          additionalText: "Throw duration: 1s"
        },
		{
          label: "Damage - Max Charge",
          formula: (ATK, Level) => 4.20 * ATK + 30 * (Level - 1) + 650,
          type: "physical",
          additionalText: "Throw duration: 1.5s"
        }
      ]
    },

    "s12": {
      name: "Smack Down",
      cooldown: 6,
      formulas: [
	    {
          label: "Damage",
          formula: (ATK, Level) => 2.25 * ATK + 22 * (Level - 1) + 540,
          type: "physical"
        },
        {
          label: "Damage - Max Charge",
          formula: (ATK, Level) => 3 * ATK + 30 * (Level - 1) + 720,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Ice Hammer",
      cooldown: 5,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1 * ATK + 13 * (Level - 1) + 200,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Thief",
      cooldown: 7,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.8 * ATK + 60 * (Level - 1) + 0,
          type: "physical"
        }
      ]
    },
	
	"ult": {
		name: "Kiss Bliss Kaboom",
    cooldown: 89,
		formulas: [
        {
          label: "Damage - Kiss Bliss",
          formula: (ATK, Level) => 0.5 * ATK + 3 * (Level - 1) + 100,
          type: "physical"
        },
        {
          label: "Damage - Kaboom",
          formula: (ATK, Level) => 2.5 * ATK + 22 * (Level - 1) + 700,
          type: "physical"
        },
	 ]
	}
  },

    "trevenant": {
      "passive": {
          name: "Natural Cure",
          description: "At low HP, dealing or taking damage triggers healing and cooldown reduction, with a long cooldown reduced by damaging enemies.",
          buff: {
          },
          formulas: [
            {
          label: "Heal - 8 Ticks",
          formula: (HP, Level) => 2 + (0.18 * (Level - 1)) * HP,
          type: "hp"
        },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.3 * ATK + 60 * (Level - 1) + 0,
          type: "physical"
        },
      ]
	},

    "s11": {
      name: "Wood Hammer",
      cooldown: 9,
      formulas: [
        {
          label: "Damage - Both Hits",
          formula: (ATK, Level) => 1 * ATK + 20 * (Level - 1) + 220,
          type: "physical",
          additionalText: "Throw duration: 0.5s"
        },
		{
          label: "Stun Above 70% HP",
          type: "text-only",
          additionalText: "1.1s Stun"
        },
		{
          label: "Stun Between 40%-70% HP",
          type: "text-only",
          additionalText: "1.3s Stun"
        },
        {
          label: "Stun Below 40% HP",
          type: "text-only",
          additionalText: "1.5s Stun"
        }
      ]
    },

    "s12": {
      name: "Curse",
      cooldown: 6,
      formulas: [
	    {
          label: "Damage - per Tick",
          formula: (ATK, Level) => 0.4 * ATK + 3 * (Level - 1) + 30,
          type: "physical"
        },
        {
          label: "Damage - Detonation",
          formula: (ATK, Level) => 1.6 * ATK + 12 * (Level - 1) + 120,
          type: "physical"
        },
        {
          label: "Slow Above 70% HP",
          type: "text-only",
          additionalText: "10% Slow"
        },
		{
          label: "Slow Between 40%-70% HP",
          type: "text-only",
          additionalText: "14% Slow"
        },
        {
          label: "Slow Below 40% HP",
          type: "text-only",
          additionalText: "18% Slow"
        }
      ]
    },
    "s21": {
      name: "Horn Leech",
      cooldown: 9,
      formulas: [
        {
          label: "Damage - 2 Hits",
          formula: (ATK, Level) => 0.43 * ATK + 4 * (Level - 1) + 200,
          type: "physical"
        },
        {
          label: "Basic - Bonus Damage",
          formula: (ATK, Level) => 0.215 * ATK + 2 * (Level - 1) + 100,
          type: "physical"
        },
        {
          label: "Heal (Over 3s) Above 70% HP",
          type: "text-only",
          additionalText: "12% Max HP"
        },
		    {
          label: "Heal (Over 3s) Between 40%-70% HP",
          type: "text-only",
          additionalText: "15% Max HP"
        },
        {
          label: "Heal (Over 3s) Below 40% HP",
          type: "text-only",
          additionalText: "18% Max HP"
        }
      ]
    },
    "s22": {
      name: "Pain Split",
      cooldown: 10,
      formulas: [
        {
          label: "Damage - per conditional tick",
          formula: (ATK, Level) => 0.29 * ATK + 2 * (Level - 1) + 80,
          type: "physical"
        },
        {
          label: "Damage - Redirected (per damage instance) Above 70% HP",
          type: "text-only",
          additionalText: "25% incoming"
        },
		    {
          label: "Damage - Redirected (per damage instance) Between 40%-70% HP",
          type: "text-only",
          additionalText: "35% incoming"
        },
        {
          label: "Damage - Redirected (per damage instance) Below 40% HP",
          type: "text-only",
          additionalText: "45% incoming"
        },
        {
          label: "Heal",
          type: "text-only",
          additionalText: "Trevenant heals for 134.4% of damage dealt on each tick."
        }
      ]
    },
	
	"ult": {
		name: "Phantom Forest",
    cooldown: 112,
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.6 * ATK + 15 * (Level - 1) + 700,
          type: "physical"
        },
        {
          label: "Shield - per Enemy Hit",
          formula: (ATK, Level) => 0.8 * ATK + 0 * (Level - 1) + 500,
          type: "physical"
        },
        {
          label: "Damage - Marked Bonus",
          formula: (ATK, Level) => 0 * ATK + 8 * (Level - 1) + 190,
          type: "physical"
        },
	 ]
	}
  },

  "tsareena": {
      "passive": {
          name: "Queenly Majesty",
          description: "Reduces hindrance duration and gains stacks to empower moves, allowing reuse with enhanced effects after 3 stacks.",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
      ]
	},
    "s11": {
      name: "Triple Axel",
      cooldown: 7,
      formulas: [
        {
          label: "Damage - per Hit",
          formula: (ATK, Level) => 0.46 * ATK + 3 * (Level - 1) + 57,
          type: "physical"
        },
		    {
          label: "Damage - per Hit (Queenly Majesty buff)",
          formula: (ATK, Level) => 0.74 * ATK + 5 * (Level - 1) + 95,
          type: "physical"
        },
		    {
          label: "Heal per hit per target (Queenly Majesty buff)",
          formula: (ATK, Level) => 0.4 * ATK + 3 * (Level - 1) + 20,
          type: "physical"
        },
        {
          label: "Attack Speed - Increase",
          formula: (Level) => 0.04 + (0.015 * (Level - 1)),
          type: "physical"
        },
        {
          label: "Damage - per Hit Skill Plus",
          formula: (ATK, Level) => 0.53 * ATK + 4 * (Level - 1) + 68,
          type: "physical"
        },
        {
          label: "Damage - per Hit (Queenly Majesty buff) Skill Plus",
          formula: (ATK, Level) => 0.85 * ATK + 6 * (Level - 1) + 110,
          type: "physical"
        }
      ]
    },

    "s12": {
      name: "Stomp",
      cooldown: 7,
      formulas: [
	    {
          label: "Damage",
          formula: (ATK, Level) => 1.7 * ATK + 10 * (Level - 1) + 208,
          type: "physical"
        },
        {
          label: "Damage (Queenly Majesty buff)",
          formula: (ATK, Level) => 2.74 * ATK + 14 * (Level - 1) + 334,
          type: "physical"
        },
        {
          label: "Heal per hit per target (Queenly Majesty buff)",
          formula: (ATK, Level) => 0.80 * ATK + 6 * (Level - 1) + 40,
          type: "physical"
        },
		    {
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 1.98 * ATK + 10 * (Level - 1) + 240,
          type: "physical"
        },
        {
          label: "Damage (Queenly Majesty buff) Skill Plus",
          formula: (ATK, Level) => 3.14 * ATK + 16 * (Level - 1) + 385,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Trop Kick",
      cooldown: 7,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 0.7565 * ATK + 3 * (Level - 1) + 113,
          type: "physical"
        },
        {
          label: "Damage - DoT (7 Ticks)",
          formula: (ATK, Level) => 0.113 * ATK + 1 * (Level - 1) + 17,
          type: "physical"
        },
        {
          label: "Damage (Queenly Majesty buff)",
          formula: (ATK, Level) => 1.211 * ATK + 4 * (Level - 1) + 181,
          type: "physical"
        },
		    {
          label: "Damage - DoT (7 Ticks - Queenly Majesty buff)",
          formula: (ATK, Level) => 0.1809 * ATK + 1 * (Level - 1) + 28,
          type: "physical"
        },
        {
          label: "Shield (Queenly Majesty buff)",
          formula: (ATK, Level) => 2.64 * ATK + 18 * (Level - 1) + 216,
          type: "physical"
        },
        {
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 0.87 * ATK + 3 * (Level - 1) + 130,
          type: "physical"
        },
        {
          label: "Damage - DoT (7 Ticks) Skill Plus",
          formula: (ATK, Level) => 0.13 * ATK + 1 * (Level - 1) + 20,
          type: "physical"
        },
        {
          label: "Damage (Queenly Majesty buff) Skill Plus",
          formula: (ATK, Level) => 1.392 * ATK + 5 * (Level - 1) + 208,
          type: "physical"
        },
        {
          label: "Damage - DoT (7 Ticks - Queenly Majesty buff) Skill Plus",
          formula: (ATK, Level) => 0.208 * ATK + 1 * (Level - 1) + 32,
          type: "physical"
        },
      ]
    },
    "s22": {
      name: "Grassy Glide",
      cooldown: 8,
      formulas: [
        {
          label: "Damage (2x)",
          formula: (ATK, Level) => 0.6696 * ATK + 3 * (Level - 1) + 87,
          type: "physical"
        },
        {
          label: "Damage (Queenly Majesty buff)",
          formula: (ATK, Level) => 1.0713 * ATK + 5 * (Level - 1) + 139,
          type: "physical"
        },
		    {
          label: "Shield (Queenly Majesty buff)",
          formula: (ATK, Level) => 2.64 * ATK + 18 * (Level - 1) + 216,
          type: "physical"
        },
        {
          label: "Damage Skill Plus",
          formula: (ATK, Level) => 0.77 * ATK + 4 * (Level - 1) + 100,
          type: "physical"
        },
        {
          label: "Damage (Queenly Majesty buff) Skill Plus",
          formula: (ATK, Level) => 1.232 * ATK + 6 * (Level - 1) + 160,
          type: "physical"
        },
      ]
    },
	
	"ult": {
		name: "Queen Ascendant",
    cooldown: 112,
		formulas: [
        {
          label: "Damage (9x)",
          formula: (ATK, Level) => 0.45 * ATK + 1 * (Level - 1) + 64,
          type: "physical"
        },
        {
          label: "Heal - Landing",
          formula: (ATK, Level) => 0.7 * ATK + 5 * (Level - 1) + 350,
          type: "physical"
        },
        {
          label: "Damage - Final Hit",
          formula: (ATK, Level) => 1.8 * ATK + 4 * (Level - 1) + 256,
          type: "physical"
        },
	 ]
	}
  },

  "tyranitar": {
    "passive": {
          name: "Sand Stream",
          description: "Using a move summons a sandstorm that boosts defenses and damages nearby enemies.",
          buff: {
            DEF: "65%",
            SpDEF: "65%"
          },
          formulas: [
            {
          label: "Damage - per Tick (7 Ticks)",
          formula: (ATK, Level) => 0.2 * ATK + 2 * (Level - 1) + 30,
          type: "physical"
        },
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
      ]
	},

    "s11": {
      name: "Dark Pulse",
      cooldown: 5.5,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.64 * ATK + 13 * (Level - 1) + 330,
          type: "physical"
        },
		{
          label: "Damage - Additional",
          formula: (ATK, Level) => 0.492 * ATK + 4 * (Level - 1) + 99,
          type: "physical"
        }
      ]
    },

    "s12": {
      name: "Stone Edge",
      cooldown: 8,
      formulas: [
	    {
          label: "Damage - Melee Range",
          formula: (ATK, Level) => 1.18 * ATK + 7 * (Level - 1) + 270,
          type: "physical"
        },
        {
          label: "Damage - Max Range",
          formula: (ATK, Level) => 0.91 * ATK + 5 * (Level - 1) + 208,
          type: "physical"
        },
        {
          label: "Damage - Melee Range Skill Plus",
          formula: (ATK, Level) => 1.26 * ATK + 9 * (Level - 1) + 297,
          type: "physical"
        },
		    {
          label: "Damage - Max Range Skill Plus",
          formula: (ATK, Level) => 0.98 * ATK + 6 * (Level - 1) + 235,
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Ancient Power",
      cooldown: 11,
      formulas: [
        {
          label: "Damage - Initial Hit",
          formula: (ATK, Level) => 0.74 * ATK + 3 * (Level - 1) + 140,
          type: "physical"
        },
        {
          label: "Shield - per Stack",
          formula: (ATK, Level) => 0.75 * ATK + 0 * (Level - 1) + 300,
          type: "physical"
        },
        {
          label: "Damage - Second Hit",
          formula: (ATK, Level) => 0.74 * ATK + 0 * (Level - 1) + 140,
          type: "physical"
        },
		    {
          label: "Shield - Additional",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 400,
          type: "physical"
        },
        {
          label: "Shield - per Stack Skill Plus",
          formula: (ATK, Level) => 0.9 * ATK + 0 * (Level - 1) + 360,
          type: "physical"
        },
        {
          label: "Shield - Additional Skill Plus",
          formula: (ATK, Level) => 1.2 * ATK + 0 * (Level - 1) + 480,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Sand Tomb",
      cooldown: 10,
      formulas: [
        {
          label: "Damage - Leap",
          formula: (ATK, Level) => 0.39 * ATK + 3 * (Level - 1) + 60,
          type: "physical"
        },
        {
          label: "Damage - AoE (per Tick)",
          formula: (ATK, Level) => 0.13 * ATK + 0 * (Level - 1) + 20,
          type: "physical"
        }
      ]
    },
	
	"ult": {
		name: "Tyrannical Rampage",
    cooldown: 112,
		formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1.3 * ATK + 6 * (Level - 1) + 240,
          type: "physical"
        }
	 ]
	}
  },

  "umbreon": {
    "passive": {
          name: "Inner Focus",
          description: "Negates shoves, throws, and disabling effects, becoming unstoppable with boosted defenses (40s cooldown, resets on respawn).",
          buff: {
            DEF: "30%",
            SpDEF: "30%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.4 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Heal",
          type: "text-only",
          additionalText: "10% Missing HP"
        },
      ]
	},

    "s11": {
      name: "Mean Look",
      cooldown: 9,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.96 * ATK + 5 * (Level - 1) + 180,
          type: "physical"
        }
      ]
    },

    "s12": {
      name: "Foul Play",
      cooldown: 7,
      formulas: [
	    {
          label: "Damage",
          formula: (ATK, Level) => 0.58 * ATK + 6 * (Level - 1) + 145,
          type: "physical"
        },
        {
          label: "Damage (Second Hit)",
          type: "text-only",
          additionalText: "237.6% Attack of Target"
        }
      ]
    },
    "s21": {
      name: "Wish",
      cooldown: 6,
      formulas: [
        {
          label: "Heal",
          formula: (attribute, Level) => 3 * attribute + 18 * (Level - 1) + 600,
          type: "heal",
          healAttribute: "ATK"
        },
        {
          label: "Heal Skill Plus",
          formula: (ATK, Level) => 3.8 * ATK + 18 * (Level - 1) + 700,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Snarl",
      cooldown: 10,
      formulas: [
        {
          label: "Damage (8x)",
          formula: (ATK, Level) => 0.15 * ATK + 1 * (Level - 1) + 40,
          type: "physical"
        },
        {
          label: "Damage (Final Shout)",
          formula: (ATK, Level) => 0.3 * ATK + 2 * (Level - 1) + 80,
          type: "physical"
        },
        {
          label: "Damage (Final Shout)",
          formula: (HP) => 0.15 * HP,
          type: "hp"
        }
      ]
    },
	
	"ult": {
		name: "Moonlight Prance",
    cooldown: 112,
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.24 * ATK + 13 * (Level - 1) + 630,
          type: "physical"
        }
	 ]
	}
  },

  "urshifu": {
    "passive": {
          name: "Unseen Fist",
          description: "Deals bonus damage to shielded enemies, converting 30% of shield damage to HP damage.",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (Single Strike)",
          formula: (ATK, Level) => 1.5 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted (Kubfu)",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Shield (Single Strike)",
          formula: (ATK, Level) => 0.7 * ATK + 0 * (Level - 1) + 200,
          type: "physical"
        },
        {
          label: "Damage - Boosted (Rapid Strike, 2x)",
          formula: (ATK, Level) => 0.6 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Wicked Blow",
      cooldown: 7,
      formulas: [
        {
          label: "Damage (Uncharged)",
          formula: (ATK, Level) => 1.1 * ATK + 7 * (Level - 1) + 175,
          type: "physical"
        },
        {
          label: "Damage - Center (Charged)",
          formula: (ATK, Level) => 1.75 * ATK + 12 * (Level - 1) + 280,
          type: "physical",
          additionalText: "Damage is always a critical and deals additional damage equal to 10% of the enemies missing HP. Against Wild Pokemon: This additional damage is capped at 1200."
        },
        {
          label: "Damage - Conal (Charged)",
          formula: (ATK, Level) => 1.75 * ATK + 12 * (Level - 1) + 280,
          type: "physical",
          additionalText: "Deals additional damage equal to 5% of the enemies' missing HP. Against Wild Pokemon: This additional damage is capped at 600."
        }
      ]
    },

    "s12": {
      name: "Surging Strikes",
      cooldown: 10,
      formulas: [
	    {
          label: "Damage - per Hit",
          formula: (ATK, Level) => 0.902 * ATK + 4 * (Level - 1) + 125,
          type: "physical"
        },
        {
          label: "Healing (2x)",
          formula: (HP) => 0.02 * HP,
          type: "hp"
        }
      ]
    },
    "s21": {
      name: "Throat Chop",
      cooldown: 7,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.79 * ATK + 6 * (Level - 1) + 340,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Liquidation",
      cooldown: 10,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 0.975 * ATK + 6 * (Level - 1) + 165,
          type: "physical"
        },
        {
          label: "Shield (per Pokémon hit - up to 3)",
          formula: (ATK, Level) => 0.9 * ATK + 0 * (Level - 1) + 260,
          type: "physical"
        },
        {
          label: "Damage (Final Shout)",
          formula: (HP) => 0.15 * HP,
          type: "hp"
        }
      ]
    },
	
	"ult1": {
		name: "Ebon Fist",
    cooldown: 112,
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 3.3 * ATK + 12 * (Level - 1) + 615,
          type: "physical"
        },
        {
          label: "Damage - Collision",
          formula: (ATK, Level) => 2.2 * ATK + 9 * (Level - 1) + 410,
          type: "physical"
        },
        {
          label: "Damage with Directive Input",
          formula: (ATK, Level) => 4.4 * ATK + 17 * (Level - 1) + 820,
          type: "physical"
        }
	 ]
	},
  "ult2": {
		name: "Flowing Fists",
    cooldown: 112,
		formulas: [
        {
          label: "Damage (Initial Hit)",
          formula: (ATK, Level) => 0.37 * ATK + 2 * (Level - 1) + 70,
          type: "physical"
        },
        {
          label: "Damage (Hits during follow-up attack)",
          formula: (ATK, Level) => 0.74 * ATK + 4 * (Level - 1) + 140,
          type: "physical"
        },
        {
          label: "Damage (Final Hit and shove)",
          formula: (ATK, Level) => 0.74 * ATK + 4 * (Level - 1) + 140,
          type: "physical"
        }
	 ]
	}
  },

  "venusaur": {
    "passive": {
          name: "Overgrow",
          description: "Deals 20% increased damage when HP is at 30% or below.",
          buff: {
          },
          skillDamageMultiplier: 1.20, // 20% de aumento
          affectsBasicAttack: true,
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
		{
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
		},
        {
          label: "Damage - Boosted (2x)",
          formula: (SPATK, Level) => 0.54 * SPATK + 10 * (Level - 1) + 180,
          type: "special"
		}
      ]
	},

    "s11": {
      name: "Sludge Bomb",
      cooldown: 6,
      formulas: [
		{
          label: "Damage",
          formula: (SpATK, Level) => 0.45 * SpATK + 13 * (Level - 1) + 300,
          type: "special"
        },
        {
          label: "Damage - Area (10 Ticks)",
          formula: (SpATK, Level) => 0.066 * SpATK + 1 * (Level - 1) + 39,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Giga Drain",
      cooldown: 7,
      formulas: [
	    {
          label: "Damage",
          formula: (SpATK, Level) => 0.55 * SpATK + 16 * (Level - 1) + 400,
          type: "special"
        },
		{
          label: "Healing - per Target",
          formula: (SpATK, Level) => 0.29 * SpATK + 8 * (Level - 1) + 200,
          type: "special"
        },
        {
          label: "Healing Skill Plus",
          formula: (SpATK, Level) => 0.32 * SpATK + 9 * (Level - 1) + 230,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Solar Beam",
      cooldown: 9,
      formulas: [
		{
          label: "Damage - per tick (x5)",
          formula: (SpATK, Level) => 0.275 * SpATK + 6 * (Level - 1) + 230,
          type: "special"
        },
		{
          label: "Damage - Additional per tick (x5)",
          type: "text-only",
          additionalText: "1.5% Enemy Max HP"
        },
      ]
    },
	"s22": {
      name: "Petal Dance",
      cooldown: 8,
      formulas: [
		{
          label: "Damage - Aura (16 Ticks)",
          formula: (SpATK, Level) => 0.12 * SpATK + 2 * (Level - 1) + 70,
          type: "special"
        }
      ]
    },
	"ult": {
		name: "Verdant Anger",
    cooldown: 112,
		formulas: [
        {
          label: "Damage - Initial",
          formula: (SpATK, Level) => 1.31 * SpATK + 23 * (Level - 1) + 1080,
          type: "special"
        },
        {
          label: "Damage - Secondary",
          formula: (SpATK, Level) => 0.655 * SpATK + 12 * (Level - 1) + 540,
          type: "special"
        }
	 ]
	}
  },

  "wigglytuff": {
    "passive": {
          name: "Cute Charm",
          description: "When hit at close range, infatuates the attacker, forcing them to approach Wigglytuff (10s cooldown).",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
		{
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
		},
        {
          label: "Damage - Boosted",
          formula: (SPATK, Level) => 0.44 * SPATK + 18 * (Level - 1) + 340,
          type: "special"
		}
      ]
	},

    "s11": {
      name: "Doubleslap",
      cooldown: 5,
      formulas: [
		{
          label: "Damage - per Slap",
          formula: (SpATK, Level) => 0.20 * SpATK + 10 * (Level - 1) + 230,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Dazzling Gleam",
      cooldown: 4,
      formulas: [
	    {
          label: "Damage - First Hit",
          formula: (SpATK, Level) => 0.22 * SpATK + 6 * (Level - 1) + 130,
          type: "special"
        },
		{
          label: "Damage - Second Hit",
          formula: (SpATK, Level) => 1.125 * SpATK + 31 * (Level - 1) + 670,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Rollout",
      cooldown: 10,
      formulas: [
		{
          label: "Damage - per Hit",
          formula: (SpATK, Level) => 0.47 * SpATK + 14 * (Level - 1) + 590,
          type: "special"
        }
      ]
    },
	"s22": {
      name: "Sing",
      cooldown: 8,
      formulas: [
      ]
    },
	"ult": {
		name: "Starlight Recital",
    cooldown: 89,
		formulas: [
        {
          label: "Shield",
          formula: (SpATK, Level) => 1.519 * SpATK + 0 * (Level - 1) + 810,
          type: "shield"
        }
	 ]
	}
  },

  "zacian": {
    "passive": {
          name: "Intrepid Sword",
          description: "Holding the goal button charges Aeos energy into Zacian's sword, empowering its basic attacks and one move based on charge duration (8s cooldown).",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Stage One",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Stage Two",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical",
          additionalText: "Applies 15% Slow for 1s"
        },
        {
          label: "Stage Three",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical",
          additionalText: "Heals 5% max hp"
        },
        {
          label: "Stage Four",
          formula: (ATK, Level) => 1.6 * ATK + 0 * (Level - 1) + 0,
          type: "physical",
          additionalText: "Dashes towards the target, reducing all Move cooldowns by 15% of their current cooldown."
        },
        {
          label: "Stage One - Boosted",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical",
          additionalText: "Deals additional 2% Max HP. (Additional damage capped at 400 on Wild Pokémon)"
        },
        {
          label: "Stage Two - Boosted",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical",
          additionalText: "Applies 15% Slow for 1s & deals additional 3% Max HP (Additional damage capped at 600 on Wild Pokémon)"
        },
        {
          label: "Stage Three - Boosted",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical",
          additionalText: "Heals 5% Max HP & deals additional 3% Max HP damage (Additional damage capped at 600 on Wild Pokémon)"
        },
        {
          label: "Stage Four - Boosted",
          formula: (ATK, Level) => 1.6 * ATK + 0 * (Level - 1) + 0,
          type: "physical",
          additionalText: "Dashes towards the target, reducing all Move cooldowns by 15% of their current cooldown. Also deals additional 4% Max HP damage. (Additional damage capped at 750 on Wild Pokémon)"
        },
      ]
	},

    "s11": {
      name: "Metal Claw",
      cooldown: 7.5,
      formulas: [
        {
          label: "Damage - Shockwave",
          formula: (ATK, Level) => 1.01 * ATK + 5 * (Level - 1) + 155,
          type: "physical"
        },
        {
          label: "Damage - Charge",
          formula: (ATK, Level) => 1.9 * ATK + 9 * (Level - 1) + 292,
          type: "physical"
        },
        {
          label: "Damage (Boosted) - Shockwave",
          formula: (ATK, Level) => 1.32 * ATK + 6 * (Level - 1) + 202,
          type: "physical"
        },
        {
          label: "Damage (Boosted) - Charge",
          formula: (ATK, Level) => 2.465 * ATK + 12 * (Level - 1) + 380,
          type: "physical"
        },

      ]
    },

    "s12": {
      name: "Sacred Sword",
      cooldown: 8,
      formulas: [
	    {
          label: "Damage - Circle Draw",
          formula: (ATK, Level) => 0.525 * ATK + 5 * (Level - 1) + 85,
          type: "physical"
        },
        {
          label: "Damage - Flurry (x3 hits)",
          formula: (ATK, Level) => 0.345 * ATK + 3 * (Level - 1) + 60,
          type: "physical"
        },
        {
          label: "Damage (Boosted) - Circle Draw",
          formula: (ATK, Level) => 0.675 * ATK + 6 * (Level - 1) + 118,
          type: "physical"
        },
        {
          label: "Damage (Boosted) - Flurry (x3 hits)",
          formula: (ATK, Level) => 0.45 * ATK + 4 * (Level - 1) + 75,
          type: "physical"
        },
      ]
    },
    "s21": {
      name: "Agility",
      cooldown: 10,
      formulas: [
        {
          label: "Boosted Shield (3s)",
          formula: (HP) => 0.12 * HP + 50,
          type: "hp"
        }
      ]
    },
    "s22": {
      name: "Play Rough",
      cooldown: 9,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.46 * ATK + 9 * (Level - 1) + 240,
          type: "physical"
        },
        {
          label: "Damage (Boosted)",
          formula: (ATK, Level) => 1.898 * ATK + 12 * (Level - 1) + 312,
          type: "physical"
        }
      ]
    },
	
	"ult": {
		name: "Sovereign Sword",
    cooldown: 112,
		formulas: [
        {
          label: "Damage (<=10 Energy Charged)",
          formula: (ATK, Level) => 3.96 * ATK + 23 * (Level - 1) + 650,
          type: "physical"
        },
        {
          label: "Damage (21-29 Energy Charged)",
          formula: (ATK, Level) => 5.544 * ATK + 32 * (Level - 1) + 910,
          type: "physical"
        },
        {
          label: "Damage (Additional - Boosted) versus Unite Buffed Pokémon",
          formula: (ATK, Level) => 1.98 * ATK + 12 * (Level - 1) + 325,
          type: "physical"
        },
        {
          label: "Damage (11-20 Energy Charged)",
          formula: (ATK, Level) => 4.752 * ATK + 29 * (Level - 1) + 780,
          type: "physical"
        },
        {
          label: "Damage (30 Energy Charged - Boosted)",
          formula: (ATK, Level) => 7.128 * ATK + 41 * (Level - 1) + 1170,
          type: "physical"
        }
	 ]
	}
  },

  "zeraora": {
    "passive": {
          name: "Volt Absorb",
          description: "Converts 8% of damage taken into bonus Attack for 4s, up to a maximum of 200 bonus Attack.",
          buff: {
            ATK: "8%"
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Volt Switch",
      cooldown: 8,
      formulas: [
        {
          label: "Damage - Initial Dash",
          formula: (ATK, Level) => 0.72 * ATK + 4 * (Level - 1) + 228,
          type: "physical"
        },
        {
          label: "Damage - Return Dash",
          formula: (ATK, Level) => 1.08 * ATK + 6 * (Level - 1) + 342,
          type: "physical"
        },
        {
          label: "Damage - Initial Dash Skill Plus",
          formula: (ATK, Level) => 0.88 * ATK + 5 * (Level - 1) + 264,
          type: "physical"
        },
        {
          label: "Damage - Return Dash Skill Plus",
          formula: (ATK, Level) => 1.32 * ATK + 8 * (Level - 1) + 396,
          type: "physical"
        },
      ]
    },

    "s12": {
      name: "Spark",
      cooldown: 9,
      formulas: [
	    {
          label: "Damage - Jump",
          formula: (ATK, Level) => 0.45 * ATK + 2 * (Level - 1) + 90,
          type: "physical"
        },
        {
          label: "Damage - Additional",
          formula: (ATK, Level) => 1.1 * ATK + 0 * (Level - 1) + 0,
          type: "physical",
          additionalText: "If an auto attack is used before the leap ends, deal 110% Atk as damage instead."
        },
        {
          label: "Damage (Boosted) - Circle Draw",
          formula: (ATK, Level) => 0.675 * ATK + 6 * (Level - 1) + 118,
          type: "physical"
        },
        {
          label: "Damage (Boosted) - Flurry (x3 hits)",
          formula: (ATK, Level) => 0.45 * ATK + 4 * (Level - 1) + 75,
          type: "physical"
        },
      ]
    },
    "s21": {
      name: "Discharge",
      cooldown: 8,
      formulas: [
        {
          label: "Damage - per Tick (6 Ticks)",
          formula: (ATK, Level) => 0.41 * ATK + 2 * (Level - 1) + 70,
          type: "physical"
        },
        {
          label: "Damage - Aura (Final Tick)",
          formula: (ATK, Level) => 0.82 * ATK + 4 * (Level - 1) + 140,
          type: "physical"
        },
        {
          label: "Damage - Pull",
          formula: (ATK, Level) => 0.41 * ATK + 2 * (Level - 1) + 70,
          type: "physical"
        },
        {
          label: "Shield",
          formula: (ATK, Level) => 1.05 * ATK + 0 * (Level - 1) + 200,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Wild Charge",
      cooldown: 8,
      formulas: [
        {
          label: "Damage - Initial Hit",
          formula: (ATK, Level) => 1.64 * ATK + 10 * (Level - 1) + 530,
          type: "physical"
        },
        {
          label: "Damage - Subsequent Hits",
          type: "text-only",
          additionalText: "Deals half damage."
        }
      ]
    },
	
	"ult": {
		name: "Plasma Gale",
    cooldown: 112,
		formulas: [
        {
          label: "Damage - Trail",
          formula: (ATK, Level) => 0.99 * ATK + 6 * (Level - 1) + 270,
          type: "physical"
        },
        {
          label: "Damage - Area",
          formula: (ATK, Level) => 1.98 * ATK + 11 * (Level - 1) + 540,
          type: "physical"
        }
	 ]
	}
  },

  "zoroark": {
     "passive": {
          name: "Illusion",
          description: "Disguises as the nearest enemy, becoming unstoppable briefly. The illusion breaks upon taking damage, attacking, scoring, or recalling.",
          buff: {
          },
          formulas: [
          ]
        },
	"atkboosted": {
	  name: "Basic Attack",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.3 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Shadow Claw",
      cooldown: 4.5,
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 0.91 * ATK + 11 * (Level - 1) + 270,
          type: "physical"
        }
      ]
    },

    "s12": {
      name: "Cut",
      cooldown: 4.5,
      formulas: [
	    {
          label: "Damage",
          formula: (ATK, Level) => 0.85 * ATK + 11 * (Level - 1) + 250,
          type: "physical"
        },
        {
          label: "Healing",
          formula: (ATK, Level) => 0.462 * ATK + 6 * (Level - 1) + 138,
          type: "physical"
        },
        {
          label: "Healing Skill Plus",
          formula: (ATK, Level) => 0.539 * ATK + 7 * (Level - 1) + 161,
          type: "physical"
        }
      ]
    },

    "s21": {
      name: "Night Slash",
      cooldown: 8,
      formulas: [
        {
          label: "Damage - Dash",
          formula: (ATK, Level) => 0.65 * ATK + 10 * (Level - 1) + 225,
          type: "physical"
        },
        {
          label: "Damage - Final Slash",
          formula: (ATK, Level) => 1.55 * ATK + 15 * (Level - 1) + 500,
          type: "physical",
          additionalText: "Deals an additional 10% missing enemy HP as damage. Against Wild Pokemon: The total damage is capped at 1000."
        },
        {
          label: "Healing - Final Slash per Diagonal",
          formula: (ATK, Level) => 0.6 * ATK + 9 * (Level - 1) + 190,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Feint Attack",
      cooldown: 6,
      formulas: [
        {
          label: "Damage - Dash",
          formula: (ATK, Level) => 1 * ATK + 10 * (Level - 1) + 300,
          type: "physical"
        },
        {
          label: "Damage - Leap",
          formula: (ATK, Level) => 2.5 * ATK + 25 * (Level - 1) + 750,
          type: "physical",
          additionalText: "Deals an additional 15% missing enemy HP as damage. Against Wild Pokemon: The total damage is capped at 1200."
        },
      ]
    },
	
	"ult": {
		name: "Nightfall Daze",
    cooldown: 100,
		formulas: [
        {
          label: "Damage - per Shockwave",
          formula: (ATK, Level) => 1.58 * ATK + 9 * (Level - 1) + 430,
          type: "physical"
        }
	 ]
	}
  },
  };
  
  const pokemonSkins = {
  absol: {
    default: "Default",
    skin1: "Fashionable Style",
    skin2: "Dark Suit Style",
    skin3: "Explorer Style",
    skin4: "Sweet Style",
    skin5: "Fashionable Style (Magenta)",
    skin6: "Sacred Style",
    skin7: "Pokébuki Style",
    skin8: "Beach Style"
  },
  aegislash: {
    default: "Default",
    skin1: "Beach Style",
    skin2: "Noble Style",
    skin3: "Orange Unite Style",
    skin4: "Purple Unite Style",
    skin5: "Regal Style"
  },
  alcremie: {
    default: "Default",
    skin1: "Tea Party Style",
  },
  armarouge: {
    default: "Default",
    skin1: "Noble Style",
    skin2: "Fiesta Style"
  },
  azumarill: {
    default: "Default",
    skin1: "Punk Style",
    skin2: "Wanderer Style",
    skin3: "Holiday Style",
    skin4: "Pastel Style",
    skin5: "Space Style",
    skin6: "Tea Party Style"
  },
  blastoise: {
    default: "Default",
    skin1: "Fashionable Style",
    skin2: "Firefighter Style",
    skin3: "Holiday Style",
    skin4: "Tuxedo Style",
    skin5: "Pokébuki Style",
    skin6: "Sacred Style",
    skin7: "New Year Style",
    skin8: "Stage Style",
    skin9: "New Year Festival Style",
    skin10: "Sunglasses Style"
  },
  blaziken: {
    default: "Default",
    skin1: "Orange Unite Style",
    skin2: "Purple Unite Style",
    skin3: "Punk Style",
    skin4: "Champion Style",
    skin5: "Neo Street Style"
  },
  blissey: {
    default: "Default",
    skin1: "Checkered Style",
    skin2: "Starry Night Style",
    skin3: "Sweet Style",
    skin4: "Sacred Style",
    skin5: "Pokébuki Style",
    skin6: "Tuxedo Style",
    skin7: "Starry Night Style (Purple)",
  },
  buzzwole: {
    default: "Default",
    skin1: "Tuxedo Style",
    skin2: "Dark Hero Style",
    skin3: "Tuxedo Style (Blue-Green)",
    skin4: "Purple Unite Style",
    skin5: "Orange Unite Style",
    skin6: "Champion Style"
  },
  ceruledge: {
    default: "Default",
    skin1: "Noble Style",
    skin2: "Neo Street Style"
  },
  chandelure: {
    default: "Default",
    skin1: "Orange Unite Style",
    skin2: "Purple Unite Style",
    skin3: "Magician Style",
    skin4: "Dainty Style"
  },
  charizard: {
    default: "Default",
    skin1: "Captain Style",
    skin2: "Orange Unite Style",
    skin3: "Purple Unite Style",
    skin4: "Bonfire Style",
    skin5: "Adept Style",
    skin6: "Armor Style",
    skin7: "Ninja Style",
    skin8: "Knight Style",
    skin9: "Red Unite Style",
    skin10: "Explorer Style",
    skin11: "Dark Lord Style",
    skin12: "Punk Style",
    skin13: "Super Suit Style"
  },
  megacharizardx: {
    default: "Default"
  },
  cinderace: {
    default: "Default",
    skin1: "Captain Style",
    skin2: "Space Style",
    skin3: "Pastel Style",
    skin4: "Tuxedo Style",
    skin5: "Guardian Style",
    skin6: "Super Suit Style",
    skin7: "Ninja Style",
    skin8: "Bedtime Style",
    skin9: "Neo Guardian Style"
  },
  clefable: {
    default: "Default",
    skin1: "Orange Unite Style",
    skin2: "Purple Unite Style",
    skin3: "Elegant Style",
    skin4: "Costume Party Style",
    skin5: "Warm Style",
    skin6: "Tea Party Style"
  },
  comfey: {
    default: "Default",
    skin1: "Orange Unite Style",
    skin2: "Purple Unite Style",
    skin3: "Merchant Style",
    skin4: "Dainty Style",
    skin5: "Sweet Style"
  },
  cramorant: {
    default: "Default",
    skin1: "Cook Style",
    skin2: "Frontier Style",
    skin3: "Tuxedo Style",
    skin4: "Pokébuki Style",
    skin5: "Hip-Hop Style"
  },
  crustle: {
    default: "Default",
    skin1: "Shrine Style",
    skin2: "Cake Style",
    skin3: "Starry Night Style",
    skin4: "Tuxedo Style",
    skin5: "Starry Night Style (Pink)"
  },
  darkrai: {
    default: "Default",
    skin1: "Costume Party Style",
    skin2: "Dark Lord Style"
    },
  decidueye: {
    default: "Default",
    skin1: "Star Cloak Style",
    skin2: "Theater Style",
    skin3: "Ninja Style",
    skin4: "Tuxedo Style",
    skin5: "Theater Style (Red)",
    skin6: "Star Cloak Style (Light Blue)",
    skin7: "Costume Party Style"
  },
  delphox: {
    default: "Default",
    skin1: "Purple Unite Style",
    skin2: "Orange Unite Style",
    skin3: "Tuxedo Style",
    skin4: "Sacred Style",
    skin5: "Tea Party Style",
    skin6: "Dark Magician Style"
  },
  dodrio: {
    default: "Default",
    skin1: "Purple Unite Style",
    skin2: "Orange Unite Style",
    skin3: "Gift Box Style",
    skin4: "Performer Style",
    skin5: "Pokébuki Style"
  },
  dragapult: {
    default: "Default",
    skin1: "Yellow Unite Style",
    skin2: "Orange Unite Style",
    skin3: "Purple Unite Style",
    skin4: "Scientist Style",
    skin5: "Dark Magician Style",
    skin6: "Racer Style",
    skin7: "Scientist Style (Midnight Blue)"
  },
  dragonite: {
    default: "Default",
    skin1: "Holiday Style",
    skin2: "Gardening Style",
    skin3: "Marine Style",
    skin4: "Champion Style",
    skin5: "Warm Style",
    skin6: "Marching Band Style",
    skin7: "Warm Party Style (Blue)"
  },
  duraludon: {
    default: "Default",
    skin1: "Purple Unite Style",
    skin2: "Orange Unite Style",
    skin3: "Guardian Style",
    skin4: "Dark Suit Style",
    skin5: "Red Unite Style",
    skin6: "Kimono Style",
    skin7: "Bonfire Style",
    skin8: "Dark Suit Style (Burgundy)",
    skin9: "Kimono Style (Coral)"
  },
  eldegoss: {
    default: "Default",
    skin1: "Fashionable Style",
    skin2: "Purple Unite Style",
    skin3: "Orange Unite Style",
    skin4: "Space Style",
    skin5: "Big Ribbon Style",
    skin6: "Pastel Style",
    skin7: "Pokébuki Style",
    skin8: "Blue Unite Style",
    skin9: "Sailor Style",
    skin10: "Sacred Style"
  },
  empoleon: {
    default: "Default",
    skin1: "Regal Style",
  },
  espeon: {
    default: "Default",
    skin1: "Pokébuki Style",
    skin2: "Orange Unite Style",
    skin3: "Purple Unite Style",
    skin4: "Tuxedo Style",
    skin5: "Jingle Bells Style",
    skin6: "Performer Style",
    skin7: "Checkered Style",
    skin8: "Green Unite Style",
    skin9: "Fairy-Tale Style",
    skin10: "Star Style"
  },
  falinks: {
    default: "Default",
    skin1: "Armor Style",
  },
  garchomp: {
    default: "Default",
    skin1: "Beach Style",
    skin2: "Stakeout Style",
    skin3: "Holiday Style",
    skin4: "Masquerade Style",
    skin5: "Martial Arts Style",
    skin6: "Tuxedo Style",
    skin7: "Wanderer Style",
    skin8: "Martial Arts Style (Green)",
    skin9: "Stakeout Style (Light Blue"
  },
  gardevoir: {
    default: "Default",
    skin1: "Fashionable Style",
    skin2: "Holiday Style",
    skin3: "Sacred Style",
    skin4: "Café Style",
    skin5: "Orange Unite Style",
    skin6: "Purple Unite Style",
    skin7: "Aurora Style",
    skin8: "Blue Unite Style",
    skin9: "Stage Style",
    skin10: "Fashionable Style (Black)",
    skin11: "Aristocrat Style",
    skin12: "Songstress Style",
  },
  gengar: {
    default: "Default",
    skin1: "Space Style",
    skin2: "Masked Style",
    skin3: "Reporter Style",
    skin4: "Theater Style",
    skin5: "Tuxedo Style",
    skin6: "Holiday Style",
    skin7: "Beach Style",
    skin8: "Costume Party Style",
    skin9: "Neo Street Style"
  },
  glaceon: {
    default: "Default",
    skin1: "Purple Unite Style",
    skin2: "Orange Unite Style",
    skin3: "Tuxedo Style",
    skin4: "Tea Party Style",
    skin5: "Checkered Style",
    skin6: "Pink Unite Style",
    skin7: "Graceful Style",
    skin8: "Tea Party Style (Brown)",
    skin9: "Beach Style"
  },
  goodra: {
    default: "Default",
    skin1: "Orange Unite Style",
    skin2: "Purple Unite Style",
    skin3: "Performer Style",
    skin4: "Holiday Style",
    skin5: "Bedtime Style",
    skin6: "Sweet Style"
  },
  greedent: {
    default: "Default",
    skin1: "Training Style",
    skin2: "Tuxedo Style",
    skin3: "Frontier Style",
    skin4: "Berry Style",
    skin5: "Masked Style",
    skin6: "Tree Style",
    skin7: "Marine Style"
  },
  greninja: {
    default: "Default",
    skin1: "Hero Style",
    skin2: "Fashionable Style",
    skin3: "Theater Style",
    skin4: "Wanderer Style",
    skin5: "Practice Style",
    skin6: "Costume Party Style",
    skin7: "Holiday Style",
    skin8: "Neo Street Style",
    skin9: "Fairy-Tale Style"
  },
  gyarados: {
    default: "Default",
    skin1: "New Year Style",
    skin2: "Darkness Style",
    skin3: "Captain Style"
  },
  hooh: {
    default: "Default",
    skin1: "Dark Lord Style",
    skin2: "Fairy-Tale Style"
  },
  hoopa: {
    default: "Default",
    skin1: "Special Style",
    skin2: "Hip-Hop Style",
    skin3: "Costume Party Style",
    skin4: "Special Style (Navy)",
    skin5: "Researcher Style",
    skin6: "Captain Style",
    skin7: "Neo Guardian Style"
  },
  inteleon: {
    default: "Default",
    skin1: "Orange Unite Style",
    skin2: "Purple Unite Style",
    skin3: "Marching Band Style",
    skin4: "Phantom Thief Style"
  },
  lapras: {
    default: "Default",
    skin1: "Performer Style",
    skin2: "Songstress Style",
    skin3: "Fashionable Style	",
    skin4: "Beach Style",
    skin5: "Warm Style"
  },
  latias: {
    default: "Default",
    skin1: "Marine Style",
  },
  latios: {
    default: "Default",
    skin1: "Marine Style",
  },
  leafeon: {
    default: "Default",
    skin1: "Checkered Style",
    skin2: "Wanderer Style",
    skin3: "Noble Style"
  },
  lucario: {
    default: "Default",
    skin1: "Space Style",
    skin2: "Costume Party Style",
    skin3: "Concert Style",
    skin4: "Ruins Style",
    skin5: "Martial Arts Style",
    skin6: "Aristocrat Style",
    skin7: "Captain Style",
    skin8: "Wanderer Style",
    skin9: "Martial Arts Style (White)",
    skin10: "Neo Street Style"
  },
  machamp: {
    default: "Default",
    skin1: "Beach Style",
    skin2: "Adept Style",
    skin3: "Excavation Style",
    skin4: "Punk Style",
    skin5: "Tuxedo Style",
    skin6: "Neo Street Style"
  },
  mamoswine: {
    default: "Default",
    skin1: "Holiday Style",
    skin2: "Hip-Hop Style",
    skin3: "Knight Style",
    skin4: "Practice Style",
    skin5: "Tuxedo Style",
    skin6: "Explorer Style",
    skin7: "Marine Style",
  },
  meowscara: {
    default: "Default",
    skin1: "Phantom Thief Style",
    skin2: "Dancer Style",
    skin3: "Beach Style"
  },
  // Adicione mais pokémon aqui
};

if (typeof window !== 'undefined') {
  window.pokemonSkins = pokemonSkins;
}
