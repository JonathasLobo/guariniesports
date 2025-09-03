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
	meowscara: 'meowscara-left-bg',
	metagross: 'metagross-left-bg',
    mew: 'mew-left-bg',
	mewtwox: 'mewtwox-left-bg',
	mewtwoy: 'mewtwoy-left-bg',
	mimikyu: 'mimikyu-left-bg',
	miraidon: 'miraidon-left-bg',
    mrmime: 'mrmime-left-bg',
    ninetales: 'ninetales-left-bg',
    pikachu: 'pikachu-left-bg',
	psyduck: 'psyduck-left-bg',
	rapidash: 'rapidash-left-bg',
    sableye: 'sableye-left-bg',
    scizor: 'scizor-left-bg',
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
	raichu: 'Attacker',
	armarouge: 'Attacker',
    azumarill: 'All Rounder',
    blastoise: 'Defender',
	blaziken: 'All Rounder',
    blissey: 'Support',
    buzzwole: 'All Rounder',
    chandelure: 'Attacker',
    charizard: 'All Rounder',
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
	meowscara: 'Speedster',
	metagross: 'All Rounder',
    mew: 'Attacker',
	mewtwox: 'All Rounder',
	mewtwoy: 'Attacker',
	mimikyu: 'All Rounder',
	miraidon: 'Attacker',
    mrmime: 'Support',
    ninetales: 'Attacker',
    pikachu: 'Attacker',
	psyduck: 'Support',
	rapidash: 'Speedster',
    sableye: 'Support',
    scizor: 'All Rounder',
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
	meowscara: 'Jungle',
	metagross: 'Top',
    mew: 'Bot',
	mewtwox: 'Top',
	mewtwoy: 'Bot',
	mimikyu: 'Top',
	miraidon: 'Bot',
    mrmime: 'Top',
    ninetales: 'Bot',
    pikachu: 'Bot',
	psyduck: 'Bot',
	rapidash: 'Jungle',
    sableye: 'Top',
    scizor: 'Top',
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
	"buddybarrier": 'Buddy Barrier',
	"chargingcharm": 'Charging Charm',
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
	"weaknesspolice": 'Weakness Police',
	"wiseglasses": 'Wise Glasses',
}

const gameHeldItensStatus = {
	"accelbracer": ['ATK +15','CDR +4.5%'],
	"aeoscookie": ['HP +240'],
	"amuletcoin": ['HP +240','Speed +150'],
	"assaultvest": ['HP +270','SpDEF +51'],
	"attackweight": ['ATK +18'],
	"buddybarrier": ['HP +450'],
	"chargingcharm": ['ATK +15','Speed +120'],
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
	"weaknesspolice": ['HP +210','ATK +15'],
	"wiseglasses": ['SpATK +39'],
}

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
	meowscara: ['scopelens','attackweight','razorclaw'],
	metagross: ['muscleband','attackweight','weaknesspolice'],
    mew: ['slickspoon','wiseglasses','choicespecs'],
	mewtwox: ['muscleband','rapidscarf','razorclaw'],
	mewtwoy: ['muscleband','rapidscarf','slickspoon'],
	mimikyu: ['muscleband','attackweight','razorclaw'],
	miraidon: ['wiseglasses','choicespecs','slickspoon'],
    mrmime: ['buddybarrier','aeoscookie','expshare'],
    ninetales: ['curseincense','slickspoon','choicespecs'],
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
	"scizor": {
		"HP": 8100,
		"ATK": 460,
		"DEF": 510,
		"SpATK": 115,
		"SpDEF": 410,
		"CritRate": 20,
		"CDR": 0,
		"AtkSPD": 30,
		"HPRegen": 15,
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
	"meowscara": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"metagross": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"mew": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"mewtwox": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"mewtwoy": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
	"mimikyu": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"miraidon": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"mrmime": { inferior: { min: 0, max: 2 }, media: { min: 2.1, max: 4 }, acima: { min: 4.1, max: Infinity } },
	"ninetales": { inferior: { min: 0, max: 4 }, media: { min: 4.1, max: 7 }, acima: { min: 7.1, max: Infinity } },
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
	"meowscara": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"metagross": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"mew": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"mewtwox": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"mewtwoy": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"mimikyu": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"miraidon": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
	"mrmime": { inferior: { min: 0, max: 5 }, media: { min: 5.1, max: 8 }, acima: { min: 8.1, max: Infinity } },
	"ninetales": { inferior: { min: 0, max: 3 }, media: { min: 3.1, max: 5 }, acima: { min: 5.1, max: Infinity } },
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
	"meowscara": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"metagross": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"mew": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"mewtwox": { inferior: { min: 0, max: 47000 }, media: { min: 40001, max: 73000 }, acima: { min: 73001, max: Infinity } },
	"mewtwoy": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"mimikyu": { inferior: { min: 0, max: 40000 }, media: { min: 40001, max: 70000 }, acima: { min: 70001, max: Infinity } },
	"miraidon": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"mrmime": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"ninetales": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
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
	"meowscara": { inferior: { min: 70001, max: Infinity }, media: { min: 45000, max: 70000 }, acima: { min: 0, max: 44999 } },
	"metagross": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"mew": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"mewtwox": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"mewtwoy": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"mimikyu": { inferior: { min: 0, max: 45000 }, media: { min: 45001, max: 75000 }, acima: { min: 75001, max: Infinity } },
	"miraidon": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
	"mrmime": { inferior: { min: 0, max: 50000 }, media: { min: 50001, max: 80000 }, acima: { min: 80001, max: Infinity } },
	"ninetales": { inferior: { min: 60001, max: Infinity }, media: { min: 35000, max: 60000 }, acima: { min: 0, max: 34999 } },
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
	"meowscara": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"metagross": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"mew": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"mewtwox": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"mewtwoy": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"mimikyu": { inferior: { min: 0, max: 10000 }, media: { min: 10001, max: 15000 }, acima: { min: 15001, max: Infinity } },
	"miraidon": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
	"mrmime": { inferior: { min: 0, max: 20000 }, media: { min: 20001, max: 50000 }, acima: { min: 50001, max: Infinity } },
	"ninetales": { inferior: { min: 0, max: 8000 }, media: { min: 8001, max: 14000 }, acima: { min: 14001, max: Infinity } },
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
	meowscara: 'B',
	metagross: 'B+',
    mew: 'A+',
	mewtwox: 'D',
	mewtwoy: 'A',
	mimikyu: 'B+',
	miraidon: 'B+',
    mrmime: 'B',
    ninetales: 'B',
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
    1: { HP: 3000, ATK: 140, DEF: 52, SpATK: 20, SpDEF: 36, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3114, ATK: 159, DEF: 61, SpATK: 23, SpDEF: 42, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.71 , Speed: 3650 },
    3: { HP: 3239, ATK: 180, DEF: 71, SpATK: 27, SpDEF: 48, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.49 , Speed: 3650 },
    4: { HP: 3377, ATK: 203, DEF: 82, SpATK: 31, SpDEF: 55, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.35 , Speed: 3650 },
    5: { HP: 3528, ATK: 228, DEF: 94, SpATK: 36, SpDEF: 63, CritRate: 5 , CDR: 10 , HPRegen: 5 , AtkSPD: 13.29 , Speed: 3800 },
    6: { HP: 3695, ATK: 256, DEF: 107, SpATK: 41, SpDEF: 72, CritRate: 5 , CDR: 10 , HPRegen: 5 , AtkSPD: 14.33 , Speed: 3800 },
    7: { HP: 3878, ATK: 286, DEF: 121, SpATK: 47, SpDEF: 81, CritRate: 5 , CDR: 10 , HPRegen: 5 , AtkSPD: 15.48 , Speed: 3950 },
    8: { HP: 4080, ATK: 319, DEF: 137, SpATK: 53, SpDEF: 91, CritRate: 5 , CDR: 10 , HPRegen: 5 , AtkSPD: 16.74 , Speed: 3950 },
    9: { HP: 4303, ATK: 356, DEF: 154, SpATK: 60, SpDEF: 102, CritRate: 10 , CDR: 20 , HPRegen: 10 , AtkSPD: 18.13 , Speed: 4100 },
    10: { HP: 4549, ATK: 397, DEF: 173, SpATK: 68, SpDEF: 115, CritRate: 10 , CDR: 20 , HPRegen: 10 , AtkSPD: 19.66 , Speed: 4100 },
    11: { HP: 4819, ATK: 442, DEF: 194, SpATK: 76, SpDEF: 129, CritRate: 10 , CDR: 20 , HPRegen: 10 , AtkSPD: 21.35 , Speed: 4250 },
    12: { HP: 5116, ATK: 491, DEF: 217, SpATK: 85, SpDEF: 144, CritRate: 10 , CDR: 20 , HPRegen: 10 , AtkSPD: 23.21 , Speed: 4250 },
    13: { HP: 5443, ATK: 545, DEF: 242, SpATK: 95, SpDEF: 161, CritRate: 10 , CDR: 20 , HPRegen: 10 , AtkSPD: 25.26 , Speed: 4250 },
    14: { HP: 5803, ATK: 605, DEF: 270, SpATK: 106, SpDEF: 180, CritRate: 10 , CDR: 20 , HPRegen: 10 , AtkSPD: 27.51 , Speed: 4250 },
    15: { HP: 6200, ATK: 670, DEF: 300, SpATK: 118, SpDEF: 200, CritRate: 10 , CDR: 20 , HPRegen: 10 , AtkSPD: 29.99 , Speed: 4250 }
  },
  "aegislash": {
    1: { HP: 3000, ATK: 168, DEF: 80, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 15.00 , Speed: 3600 },
    2: { HP: 3062, ATK: 171, DEF: 83, SpATK: 21, SpDEF: 62, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 15.98 , Speed: 3600 },
    3: { HP: 3136, ATK: 174, DEF: 86, SpATK: 23, SpDEF: 64, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 17.16 , Speed: 3600 },
    4: { HP: 3225, ATK: 178, DEF: 90, SpATK: 25, SpDEF: 67, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 18.57 , Speed: 3600 },
    5: { HP: 3547, ATK: 192, DEF: 105, SpATK: 32, SpDEF: 77, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 21.77 , Speed: 3750 },
    6: { HP: 3675, ATK: 198, DEF: 111, SpATK: 35, SpDEF: 81, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 23.81 , Speed: 3750 },
    7: { HP: 4259, ATK: 223, DEF: 138, SpATK: 48, SpDEF: 100, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 29.25 , Speed: 3900 },
    8: { HP: 4444, ATK: 231, DEF: 147, SpATK: 52, SpDEF: 106, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 35.18 , Speed: 3900 },
    9: { HP: 4665, ATK: 241, DEF: 157, SpATK: 57, SpDEF: 113, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 35.7 , Speed: 4050 },
    10: { HP: 4931, ATK: 253, DEF: 169, SpATK: 63, SpDEF: 122, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 39.92 , Speed: 4050 },
    11: { HP: 5250, ATK: 267, DEF: 184, SpATK: 70, SpDEF: 132, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 44.99 , Speed: 4200 },
    12: { HP: 5632, ATK: 284, DEF: 202, SpATK: 78, SpDEF: 144, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 44.99 , Speed: 4200 },
    13: { HP: 6091, ATK: 304, DEF: 223, SpATK: 88, SpDEF: 159, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 44.99 , Speed: 4200 },
    14: { HP: 6641, ATK: 328, DEF: 249, SpATK: 100, SpDEF: 177, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 44.99 , Speed: 4200 },
    15: { HP: 7302, ATK: 357, DEF: 280, SpATK: 115, SpDEF: 200, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 44.99 , Speed: 4200 }
  },
  "alcremie": {
    1: { HP: 3100, ATK: 120, DEF: 40, SpATK: 50, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3231, ATK: 124, DEF: 46, SpATK: 64, SpDEF: 38, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.22 , Speed: 3800 },
    3: { HP: 3381, ATK: 128, DEF: 53, SpATK: 80, SpDEF: 47, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.47 , Speed: 3800 },
    4: { HP: 4144, ATK: 149, DEF: 89, SpATK: 164, SpDEF: 91, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.76 , Speed: 3800 },
    5: { HP: 4343, ATK: 154, DEF: 99, SpATK: 186, SpDEF: 102, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.1 , Speed: 3950 },
    6: { HP: 4572, ATK: 160, DEF: 110, SpATK: 211, SpDEF: 115, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.49 , Speed: 3950 },
    7: { HP: 4835, ATK: 167, DEF: 123, SpATK: 240, SpDEF: 130, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.94 , Speed: 4100 },
    8: { HP: 5138, ATK: 175, DEF: 137, SpATK: 273, SpDEF: 147, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.45 , Speed: 4100 },
    9: { HP: 5487, ATK: 184, DEF: 154, SpATK: 311, SpDEF: 167, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.04 , Speed: 4250 },
    10: { HP: 5888, ATK: 195, DEF: 173, SpATK: 355, SpDEF: 190, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.72 , Speed: 4250 },
    11: { HP: 6349, ATK: 208, DEF: 195, SpATK: 406, SpDEF: 217, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.5 , Speed: 4400 },
    12: { HP: 6880, ATK: 222, DEF: 220, SpATK: 464, SpDEF: 248, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.4 , Speed: 4400 },
    13: { HP: 7491, ATK: 239, DEF: 249, SpATK: 531, SpDEF: 283, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.43 , Speed: 4400 },
    14: { HP: 8193, ATK: 258, DEF: 282, SpATK: 608, SpDEF: 323, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.62 , Speed: 4400 },
    15: { HP: 9000, ATK: 280, DEF: 320, SpATK: 696, SpDEF: 370, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 19.99 , Speed: 4400 }
  },
    "armarouge": {
	1: { HP: 3300, ATK: 150, DEF: 60, SpATK: 80, SpDEF: 40, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3387, ATK: 154, DEF: 65, SpATK: 94, SpDEF: 44, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.89 , Speed: 3600 },
    3: { HP: 3486, ATK: 159, DEF: 71, SpATK: 110, SpDEF: 49, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.91 , Speed: 3600 },
    4: { HP: 3600, ATK: 165, DEF: 78, SpATK: 128, SpDEF: 55, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.08 , Speed: 3750 },
    5: { HP: 4122, ATK: 192, DEF: 110, SpATK: 211, SpDEF: 82, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 18.43 , Speed: 3750 },
    6: { HP: 4273, ATK: 200, DEF: 119, SpATK: 235, SpDEF: 90, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 19.98 , Speed: 3900 },
    7: { HP: 4447, ATK: 209, DEF: 130, SpATK: 263, SpDEF: 99, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 21.76 , Speed: 3900 },
    8: { HP: 4647, ATK: 219, DEF: 142, SpATK: 295, SpDEF: 109, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 23.82 , Speed: 4050 },
    9: { HP: 4878, ATK: 231, DEF: 156, SpATK: 332, SpDEF: 121, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 26.18 , Speed: 4050 },
    10: { HP: 5143, ATK: 244, DEF: 172, SpATK: 374, SpDEF: 134, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 28.9 , Speed: 4200 },
    11: { HP: 5448, ATK: 260, DEF: 191, SpATK: 422, SpDEF: 150, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 32.03 , Speed: 4200 },
    12: { HP: 5799, ATK: 278, DEF: 213, SpATK: 478, SpDEF: 168, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 35.63 , Speed: 4200 },
    13: { HP: 6203, ATK: 299, DEF: 238, SpATK: 542, SpDEF: 189, CritRate: 0 , CDR: 20 , HPRegen: 0 , AtkSPD: 39.77 , Speed: 4200 },
    14: { HP: 6667, ATK: 323, DEF: 267, SpATK: 616, SpDEF: 213, CritRate: 0 , CDR: 20 , HPRegen: 0 , AtkSPD: 44.53 , Speed: 4200 },
    15: { HP: 7200, ATK: 350, DEF: 300, SpATK: 700, SpDEF: 240, CritRate: 0 , CDR: 20 , HPRegen: 0 , AtkSPD: 50.00 , Speed: 4200 }
  },
    "azumarill": {
    1: { HP: 3250, ATK: 125, DEF: 80, SpATK: 20, SpDEF: 80, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3352, ATK: 132, DEF: 87, SpATK: 22, SpDEF: 87, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.67 , Speed: 3600 },
    3: { HP: 3469, ATK: 141, DEF: 95, SpATK: 24, SpDEF: 95, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.43 , Speed: 3600 },
    4: { HP: 4064, ATK: 185, DEF: 136, SpATK: 36, SpDEF: 136, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.31 , Speed: 3600 },
    5: { HP: 4219, ATK: 196, DEF: 147, SpATK: 40, SpDEF: 147, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 16.32 , Speed: 3750 },
    6: { HP: 4398, ATK: 209, DEF: 159, SpATK: 44, SpDEF: 159, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 17.48 , Speed: 3750 },
    7: { HP: 4603, ATK: 224, DEF: 173, SpATK: 48, SpDEF: 173, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 18.82 , Speed: 3900 },
    8: { HP: 4839, ATK: 241, DEF: 189, SpATK: 53, SpDEF: 189, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 20.36 , Speed: 3900 },
    9: { HP: 5111, ATK: 261, DEF: 208, SpATK: 59, SpDEF: 208, CritRate: 0 , CDR: 0 , HPRegen: 10 , AtkSPD: 22.13 , Speed: 4050 },
    10: { HP: 5424, ATK: 284, DEF: 230, SpATK: 65, SpDEF: 230, CritRate: 0 , CDR: 0 , HPRegen: 10 , AtkSPD: 24.17 , Speed: 4050 },
    11: { HP: 5784, ATK: 310, DEF: 255, SpATK: 72, SpDEF: 255, CritRate: 0 , CDR: 0 , HPRegen: 10 , AtkSPD: 26.52 , Speed: 4200 },
    12: { HP: 6198, ATK: 340, DEF: 284, SpATK: 81, SpDEF: 284, CritRate: 0 , CDR: 0 , HPRegen: 10 , AtkSPD: 29.22 , Speed: 4200 },
    13: { HP: 6674, ATK: 375, DEF: 317, SpATK: 91, SpDEF: 317, CritRate: 0 , CDR: 0 , HPRegen: 10 , AtkSPD: 32.33 , Speed: 4200 },
    14: { HP: 7221, ATK: 415, DEF: 355, SpATK: 102, SpDEF: 355, CritRate: 0 , CDR: 0 , HPRegen: 10 , AtkSPD: 35.9 , Speed: 4200 },
    15: { HP: 7850, ATK: 461, DEF: 399, SpATK: 115, SpDEF: 399, CritRate: 0 , CDR: 0 , HPRegen: 10 , AtkSPD: 40.00 , Speed: 4200 }
  },
    "blastoise": {
    1: { HP: 3225, ATK: 150, DEF: 100, SpATK: 50, SpDEF: 70, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3326, ATK: 152, DEF: 108, SpATK: 55, SpDEF: 75, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3447, ATK: 154, DEF: 117, SpATK: 61, SpDEF: 82, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3593, ATK: 157, DEF: 128, SpATK: 68, SpDEF: 90, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 4122, ATK: 168, DEF: 169, SpATK: 95, SpDEF: 119, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 4333, ATK: 172, DEF: 185, SpATK: 106, SpDEF: 130, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 5293, ATK: 191, DEF: 205, SpATK: 155, SpDEF: 144, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.86 , Speed: 4000 },
    8: { HP: 5597, ATK: 197, DEF: 229, SpATK: 171, SpDEF: 160, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.72 , Speed: 4000 },
    9: { HP: 5961, ATK: 204, DEF: 312, SpATK: 190, SpDEF: 218, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 6398, ATK: 213, DEF: 346, SpATK: 212, SpDEF: 242, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 6923, ATK: 224, DEF: 387, SpATK: 239, SpDEF: 271, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 7552, ATK: 237, DEF: 436, SpATK: 271, SpDEF: 305, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 8307, ATK: 252, DEF: 495, SpATK: 310, SpDEF: 346, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 9213, ATK: 270, DEF: 565, SpATK: 356, SpDEF: 395, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 10300, ATK: 292, DEF: 650, SpATK: 412, SpDEF: 455, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },
    "blaziken": {
    1: { HP: 3250, ATK: 160, DEF: 80, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3315, ATK: 165, DEF: 85, SpATK: 21, SpDEF: 64, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3393, ATK: 171, DEF: 92, SpATK: 23, SpDEF: 69, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3487, ATK: 178, DEF: 100, SpATK: 25, SpDEF: 75, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 3827, ATK: 203, DEF: 128, SpATK: 32, SpDEF: 97, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 3963, ATK: 213, DEF: 139, SpATK: 35, SpDEF: 106, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 4581, ATK: 258, DEF: 190, SpATK: 48, SpDEF: 145, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.86 , Speed: 4000 },
    8: { HP: 4776, ATK: 272, DEF: 206, SpATK: 52, SpDEF: 157, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 16.72 , Speed: 4000 },
    9: { HP: 5010, ATK: 289, DEF: 226, SpATK: 57, SpDEF: 172, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 5291, ATK: 309, DEF: 249, SpATK: 63, SpDEF: 190, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 5628, ATK: 333, DEF: 277, SpATK: 70, SpDEF: 212, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 6033, ATK: 362, DEF: 311, SpATK: 78, SpDEF: 238, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 6518, ATK: 397, DEF: 351, SpATK: 88, SpDEF: 269, CritRate: 10 , CDR: 0 , HPRegen: 15 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 7101, ATK: 439, DEF: 400, SpATK: 100, SpDEF: 306, CritRate: 10 , CDR: 0 , HPRegen: 15 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 7800, ATK: 490, DEF: 458, SpATK: 115, SpDEF: 351, CritRate: 10 , CDR: 0 , HPRegen: 15 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "blissey": {
    1: { HP: 3278, ATK: 130, DEF: 40, SpATK: 40, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3427, ATK: 134, DEF: 44, SpATK: 52, SpDEF: 65, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.22 , Speed: 3700 },
    3: { HP: 3598, ATK: 139, DEF: 48, SpATK: 66, SpDEF: 71, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.47 , Speed: 3700 },
    4: { HP: 4467, ATK: 162, DEF: 69, SpATK: 138, SpDEF: 102, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.76 , Speed: 3700 },
    5: { HP: 4694, ATK: 168, DEF: 74, SpATK: 157, SpDEF: 110, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.1 , Speed: 3850 },
    6: { HP: 4955, ATK: 175, DEF: 80, SpATK: 179, SpDEF: 119, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.49 , Speed: 3850 },
    7: { HP: 5255, ATK: 183, DEF: 87, SpATK: 204, SpDEF: 130, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.94 , Speed: 4000 },
    8: { HP: 5600, ATK: 192, DEF: 95, SpATK: 233, SpDEF: 142, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.45 , Speed: 4000 },
    9: { HP: 5997, ATK: 203, DEF: 104, SpATK: 266, SpDEF: 156, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.04 , Speed: 4150 },
    10: { HP: 6454, ATK: 215, DEF: 115, SpATK: 304, SpDEF: 172, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.72 , Speed: 4150 },
    11: { HP: 6980, ATK: 229, DEF: 128, SpATK: 348, SpDEF: 191, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.5 , Speed: 4300 },
    12: { HP: 7585, ATK: 245, DEF: 142, SpATK: 398, SpDEF: 213, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.4 , Speed: 4300 },
    13: { HP: 8281, ATK: 264, DEF: 159, SpATK: 456, SpDEF: 238, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.43 , Speed: 4300 },
    14: { HP: 9081, ATK: 285, DEF: 178, SpATK: 523, SpDEF: 267, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.62 , Speed: 4300 },
    15: { HP: 10000, ATK: 310, DEF: 200, SpATK: 600, SpDEF: 300, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 19.99 , Speed: 4300 },
  },

    "buzzwole": {
    1: { HP: 3250, ATK: 170, DEF: 120, SpATK: 20, SpDEF: 80, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3412, ATK: 180, DEF: 134, SpATK: 23, SpDEF: 91, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.71 , Speed: 3700 },
    3: { HP: 3590, ATK: 191, DEF: 149, SpATK: 27, SpDEF: 103, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.49 , Speed: 3700 },
    4: { HP: 3786, ATK: 203, DEF: 165, SpATK: 31, SpDEF: 116, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.35 , Speed: 3700 },
    5: { HP: 4001, ATK: 216, DEF: 183, SpATK: 35, SpDEF: 130, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 13.29 , Speed: 3850 },
    6: { HP: 4238, ATK: 231, DEF: 203, SpATK: 40, SpDEF: 146, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 14.33 , Speed: 3850 },
    7: { HP: 4499, ATK: 247, DEF: 225, SpATK: 45, SpDEF: 163, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.48 , Speed: 4000 },
    8: { HP: 4786, ATK: 265, DEF: 249, SpATK: 51, SpDEF: 182, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 16.74 , Speed: 4000 },
    9: { HP: 5103, ATK: 285, DEF: 275, SpATK: 58, SpDEF: 203, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 18.13 , Speed: 4150 },
    10: { HP: 5452, ATK: 306, DEF: 304, SpATK: 65, SpDEF: 226, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 19.66 , Speed: 4150 },
    11: { HP: 5836, ATK: 330, DEF: 336, SpATK: 73, SpDEF: 251, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 21.35 , Speed: 4300 },
    12: { HP: 6259, ATK: 356, DEF: 371, SpATK: 82, SpDEF: 279, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 23.21 , Speed: 4300 },
    13: { HP: 6724, ATK: 385, DEF: 410, SpATK: 92, SpDEF: 309, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 25.26 , Speed: 4300 },
    14: { HP: 7236, ATK: 417, DEF: 453, SpATK: 103, SpDEF: 343, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 27.51 , Speed: 4300 },
    15: { HP: 7800, ATK: 452, DEF: 500, SpATK: 115, SpDEF: 380, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 29.99 , Speed: 4300 },
  },

    "ceruledge": {
    1: { HP: 3250, ATK: 125, DEF: 80, SpATK: 20, SpDEF: 64, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3352, ATK: 132, DEF: 85, SpATK: 22, SpDEF: 71, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.89 , Speed: 3700 },
    3: { HP: 3469, ATK: 140, DEF: 91, SpATK: 24, SpDEF: 79, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.91 , Speed: 3700 },
    4: { HP: 3604, ATK: 149, DEF: 98, SpATK: 27, SpDEF: 88, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.08 , Speed: 3700 },
    5: { HP: 4219, ATK: 190, DEF: 130, SpATK: 40, SpDEF: 130, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 18.43 , Speed: 3850 },
    6: { HP: 4398, ATK: 202, DEF: 139, SpATK: 44, SpDEF: 142, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 19.98 , Speed: 3850 },
    7: { HP: 4603, ATK: 216, DEF: 150, SpATK: 48, SpDEF: 156, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 21.76 , Speed: 4000 },
    8: { HP: 4839, ATK: 232, DEF: 162, SpATK: 53, SpDEF: 172, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 23.82 , Speed: 4000 },
    9: { HP: 5111, ATK: 250, DEF: 176, SpATK: 59, SpDEF: 191, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 26.18 , Speed: 4150 },
    10: { HP: 5424, ATK: 271, DEF: 192, SpATK: 66, SpDEF: 213, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 28.9 , Speed: 4150 },
    11: { HP: 5784, ATK: 295, DEF: 211, SpATK: 73, SpDEF: 238, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 32.03 , Speed: 4300 },
    12: { HP: 6198, ATK: 322, DEF: 233, SpATK: 82, SpDEF: 266, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 35.63 , Speed: 4300 },
    13: { HP: 6674, ATK: 353, DEF: 258, SpATK: 92, SpDEF: 299, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 39.77 , Speed: 4300 },
    14: { HP: 7221, ATK: 389, DEF: 287, SpATK: 103, SpDEF: 337, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 44.53 , Speed: 4300 },
    15: { HP: 7850, ATK: 430, DEF: 320, SpATK: 116, SpDEF: 380, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 50.00 , Speed: 4300 },
  },

    "chandelure": {
    1: { HP: 3200, ATK: 135, DEF: 35, SpATK: 50, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3244, ATK: 137, DEF: 37, SpATK: 64, SpDEF: 32, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3297, ATK: 140, DEF: 40, SpATK: 80, SpDEF: 35, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3361, ATK: 143, DEF: 43, SpATK: 100, SpDEF: 39, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 3593, ATK: 155, DEF: 55, SpATK: 171, SpDEF: 52, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 3685, ATK: 160, DEF: 60, SpATK: 199, SpDEF: 57, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 4106, ATK: 181, DEF: 82, SpATK: 328, SpDEF: 80, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.86 , Speed: 4000 },
    8: { HP: 4239, ATK: 188, DEF: 89, SpATK: 369, SpDEF: 87, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.72 , Speed: 4000 },
    9: { HP: 4399, ATK: 196, DEF: 97, SpATK: 418, SpDEF: 96, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 4591, ATK: 206, DEF: 107, SpATK: 477, SpDEF: 107, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 4821, ATK: 218, DEF: 119, SpATK: 548, SpDEF: 120, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 5097, ATK: 232, DEF: 124, SpATK: 633, SpDEF: 135, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 5428, ATK: 249, DEF: 152, SpATK: 735, SpDEF: 153, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 5825, ATK: 269, DEF: 173, SpATK: 857, SpDEF: 175, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 6300, ATK: 295, DEF: 200, SpATK: 1005, SpDEF: 203, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4300 },
  },

    "charizard": {
    1: { HP: 3200, ATK: 161, DEF: 70, SpATK: 20, SpDEF: 54, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 0.00 , Speed: 3700 },
    2: { HP: 3264, ATK: 165, DEF: 75, SpATK: 21, SpDEF: 58, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 0.00 , Speed: 3700 },
    3: { HP: 3341, ATK: 170, DEF: 81, SpATK: 23, SpDEF: 63, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 0.00 , Speed: 3700 },
    4: { HP: 3434, ATK: 176, DEF: 88, SpATK: 25, SpDEF: 68, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 0.00 , Speed: 3700 },
    5: { HP: 3771, ATK: 199, DEF: 121, SpATK: 32, SpDEF: 95, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 0.00 , Speed: 3850 },
    6: { HP: 3905, ATK: 208, DEF: 131, SpATK: 35, SpDEF: 103, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 0.00 , Speed: 3850 },
    7: { HP: 4516, ATK: 249, DEF: 168, SpATK: 48, SpDEF: 132, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 0.00 , Speed: 4000 },
    8: { HP: 4709, ATK: 262, DEF: 182, SpATK: 52, SpDEF: 143, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 0.00 , Speed: 4000 },
    9: { HP: 4941, ATK: 277, DEF: 199, SpATK: 57, SpDEF: 157, CritRate: 30 , CDR: 0 , HPRegen: 10 , AtkSPD: 0.00 , Speed: 4150 },
    10: { HP: 5219, ATK: 296, DEF: 219, SpATK: 63, SpDEF: 173, CritRate: 30 , CDR: 0 , HPRegen: 10 , AtkSPD: 0.00 , Speed: 4150 },
    11: { HP: 5553, ATK: 318, DEF: 243, SpATK: 70, SpDEF: 193, CritRate: 30 , CDR: 0 , HPRegen: 10 , AtkSPD: 0.00 , Speed: 4300 },
    12: { HP: 5953, ATK: 345, DEF: 272, SpATK: 78, SpDEF: 217, CritRate: 30 , CDR: 0 , HPRegen: 10 , AtkSPD: 0.00 , Speed: 4300 },
    13: { HP: 6433, ATK: 377, DEF: 307, SpATK: 88, SpDEF: 245, CritRate: 30 , CDR: 0 , HPRegen: 15 , AtkSPD: 0.00 , Speed: 4300 },
    14: { HP: 7009, ATK: 416, DEF: 349, SpATK: 100, SpDEF: 279, CritRate: 30 , CDR: 0 , HPRegen: 15 , AtkSPD: 0.00 , Speed: 4300 },
    15: { HP: 7700, ATK: 462, DEF: 400, SpATK: 115, SpDEF: 320, CritRate: 30 , CDR: 0 , HPRegen: 15 , AtkSPD: 0.00 , Speed: 4300 },
  },

    "cinderace": {
    1: { HP: 3000, ATK: 135, DEF: 50, SpATK: 20, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3043, ATK: 140, DEF: 53, SpATK: 21, SpDEF: 33, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.87 , Speed: 3650 },
    3: { HP: 3095, ATK: 145, DEF: 57, SpATK: 23, SpDEF: 36, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 14.11 , Speed: 3650 },
    4: { HP: 3157, ATK: 151, DEF: 62, SpATK: 25, SpDEF: 40, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 16.8 , Speed: 3650 },
    5: { HP: 3382, ATK: 174, DEF: 78, SpATK: 32, SpDEF: 55, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 26.53 , Speed: 3800 },
    6: { HP: 3471, ATK: 183, DEF: 84, SpATK: 35, SpDEF: 61, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 30.4 , Speed: 3800 },
    7: { HP: 3878, ATK: 221, DEF: 114, SpATK: 49, SpDEF: 88, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 48.04 , Speed: 3950 },
    8: { HP: 4007, ATK: 233, DEF: 123, SpATK: 53, SpDEF: 97, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 53.61 , Speed: 3950 },
    9: { HP: 4161, ATK: 247, DEF: 134, SpATK: 58, SpDEF: 107, CritRate: 30 , CDR: 0 , HPRegen: 10 , AtkSPD: 60.3 , Speed: 4100 },
    10: { HP: 4346, ATK: 264, DEF: 147, SpATK: 64, SpDEF: 119, CritRate: 30 , CDR: 0 , HPRegen: 10 , AtkSPD: 68.33 , Speed: 4100 },
    11: { HP: 4568, ATK: 284, DEF: 163, SpATK: 71, SpDEF: 134, CritRate: 30 , CDR: 0 , HPRegen: 10 , AtkSPD: 77.96 , Speed: 4250 },
    12: { HP: 4835, ATK: 309, DEF: 182, SpATK: 80, SpDEF: 152, CritRate: 30 , CDR: 0 , HPRegen: 10 , AtkSPD: 89.52 , Speed: 4250 },
    13: { HP: 5155, ATK: 339, DEF: 206, SpATK: 91, SpDEF: 175, CritRate: 30 , CDR: 0 , HPRegen: 15 , AtkSPD: 103.39 , Speed: 4250 },
    14: { HP: 5539, ATK: 375, DEF: 235, SpATK: 104, SpDEF: 201, CritRate: 30 , CDR: 0 , HPRegen: 15 , AtkSPD: 120.03 , Speed: 4250 },
    15: { HP: 6000, ATK: 418, DEF: 268, SpATK: 119, SpDEF: 232, CritRate: 30 , CDR: 0 , HPRegen: 15 , AtkSPD: 140.00 , Speed: 4250 },
  },

    "clefable": {
    1: { HP: 3300, ATK: 130, DEF: 40, SpATK: 40, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3427, ATK: 134, DEF: 46, SpATK: 54, SpDEF: 37, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.22 , Speed: 3700 },
    3: { HP: 3527, ATK: 138, DEF: 53, SpATK: 70, SpDEF: 45, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.47 , Speed: 3700 },
    4: { HP: 4309, ATK: 160, DEF: 87, SpATK: 152, SpDEF: 84, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.76 , Speed: 3700 },
    5: { HP: 4502, ATK: 166, DEF: 96, SpATK: 173, SpDEF: 94, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.1 , Speed: 3850 },
    6: { HP: 4723, ATK: 173, DEF: 106, SpATK: 198, SpDEF: 106, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.49 , Speed: 3850 },
    7: { HP: 4977, ATK: 181, DEF: 118, SpATK: 226, SpDEF: 119, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.94 , Speed: 4000 },
    8: { HP: 5270, ATK: 190, DEF: 131, SpATK: 258, SpDEF: 134, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.45 , Speed: 4000 },
    9: { HP: 5607, ATK: 200, DEF: 146, SpATK: 295, SpDEF: 152, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.04 , Speed: 4150 },
    10: { HP: 5994, ATK: 211, DEF: 164, SpATK: 338, SpDEF: 172, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.72 , Speed: 4150 },
    11: { HP: 6440, ATK: 224, DEF: 184, SpATK: 387, SpDEF: 195, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.5 , Speed: 4300 },
    12: { HP: 6953, ATK: 239, DEF: 207, SpATK: 444, SpDEF: 222, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.4 , Speed: 4300 },
    13: { HP: 7543, ATK: 257, DEF: 234, SpATK: 509, SpDEF: 253, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.44 , Speed: 4300 },
    14: { HP: 8221, ATK: 277, DEF: 265, SpATK: 584, SpDEF: 289, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.63 , Speed: 4300 },
    15: { HP: 9000, ATK: 300, DEF: 300, SpATK: 670, SpDEF: 330, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 20.00 , Speed: 4300 },
  },

    "comfey":{
    1: { HP: 3000, ATK: 120, DEF: 40, SpATK: 50, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3103, ATK: 126, DEF: 47, SpATK: 71, SpDEF: 37, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.36 , Speed: 3700 },
    3: { HP: 3217, ATK: 133, DEF: 55, SpATK: 95, SpDEF: 44, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.75 , Speed: 3700 },
    4: { HP: 3342, ATK: 140, DEF: 64, SpATK: 121, SpDEF: 52, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.18 , Speed: 3700 },
    5: { HP: 3479, ATK: 148, DEF: 74, SpATK: 149, SpDEF: 61, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 11.65 , Speed: 3850 },
    6: { HP: 3630, ATK: 157, DEF: 85, SpATK: 180, SpDEF: 71, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.17 , Speed: 3850 },
    7: { HP: 3796, ATK: 167, DEF: 97, SpATK: 214, SpDEF: 82, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.74 , Speed: 4000 },
    8: { HP: 3979, ATK: 178, DEF: 110, SpATK: 252, SpDEF: 94, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.37 , Speed: 4000 },
    9: { HP: 4181, ATK: 190, DEF: 125, SpATK: 294, SpDEF: 107, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.07 , Speed: 4150 },
    10: { HP: 4403, ATK: 203, DEF: 141, SpATK: 340, SpDEF: 122, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.84 , Speed: 4150 },
    11: { HP: 4648, ATK: 217, DEF: 159, SpATK: 391, SpDEF: 138, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.68 , Speed: 4300 },
    12: { HP: 4917, ATK: 233, DEF: 179, SpATK: 447, SpDEF: 156, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.61 , Speed: 4300 },
    13: { HP: 5214, ATK: 250, DEF: 200, SpATK: 508, SpDEF: 175, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.63 , Speed: 4300 },
    14: { HP: 5541, ATK: 269, DEF: 224, SpATK: 576, SpDEF: 196, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.76 , Speed: 4300 },
    15: { HP: 5900, ATK: 290, DEF: 250, SpATK: 650, SpDEF: 220, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 20.00 , Speed: 4300 }
  },

    "cramorant": {
    1: { HP: 3292, ATK: 134, DEF: 60, SpATK: 50, SpDEF: 40, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3399, ATK: 139, DEF: 69, SpATK: 75, SpDEF: 46, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.78 , Speed: 3700 },
    3: { HP: 3517, ATK: 145, DEF: 78, SpATK: 102, SpDEF: 52, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.74 , Speed: 3700 },
    4: { HP: 3647, ATK: 151, DEF: 88, SpATK: 132, SpDEF: 59, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 15.89 , Speed: 3700 },
    5: { HP: 3789, ATK: 158, DEF: 99, SpATK: 165, SpDEF: 67, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 18.25 , Speed: 3850 },
    6: { HP: 3946, ATK: 166, DEF: 112, SpATK: 201, SpDEF: 75, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 20.86 , Speed: 3850 },
    7: { HP: 4118, ATK: 175, DEF: 126, SpATK: 240, SpDEF: 84, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 23.72 , Speed: 4000 },
    8: { HP: 4308, ATK: 185, DEF: 141, SpATK: 283, SpDEF: 94, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 26.88 , Speed: 4000 },
    9: { HP: 4517, ATK: 196, DEF: 158, SpATK: 331, SpDEF: 105, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 30.36 , Speed: 4150 },
    10: { HP: 4748, ATK: 208, DEF: 176, SpATK: 384, SpDEF: 117, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 34.19 , Speed: 4150 },
    11: { HP: 5002, ATK: 221, DEF: 196, SpATK: 442, SpDEF: 131, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 38.41 , Speed: 4300 },
    12: { HP: 5281, ATK: 235, DEF: 218, SpATK: 506, SpDEF: 146, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 43.05 , Speed: 4300 },
    13: { HP: 5589, ATK: 250, DEF: 243, SpATK: 576, SpDEF: 162, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 48.16 , Speed: 4300 },
    14: { HP: 5928, ATK: 267, DEF: 270, SpATK: 654, SpDEF: 180, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 53.79 , Speed: 4300 },
    15: { HP: 6301, ATK: 286, DEF: 300, SpATK: 739, SpDEF: 200, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 60.00 , Speed: 4300 },
  },

    "crustle": {
    1: { HP: 3300, ATK: 175, DEF: 97, SpATK: 20, SpDEF: 67, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3447, ATK: 179, DEF: 109, SpATK: 22, SpDEF: 76, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.44 , Speed: 3600 },
    3: { HP: 3615, ATK: 183, DEF: 123, SpATK: 24, SpDEF: 86, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3600 },
    4: { HP: 4469, ATK: 205, DEF: 193, SpATK: 36, SpDEF: 137, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.54 , Speed: 3600 },
    5: { HP: 4692, ATK: 211, DEF: 211, SpATK: 39, SpDEF: 150, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.22 , Speed: 3750 },
    6: { HP: 4948, ATK: 218, DEF: 232, SpATK: 43, SpDEF: 165, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.00 , Speed: 3750 },
    7: { HP: 5242, ATK: 226, DEF: 256, SpATK: 47, SpDEF: 182, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.89 , Speed: 3900 },
    8: { HP: 5581, ATK: 235, DEF: 284, SpATK: 52, SpDEF: 202, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.92 , Speed: 3900 },
    9: { HP: 5971, ATK: 245, DEF: 316, SpATK: 58, SpDEF: 225, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.1 , Speed: 4050 },
    10: { HP: 6420, ATK: 256, DEF: 353, SpATK: 65, SpDEF: 252, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 19.46 , Speed: 4050 },
    11: { HP: 6936, ATK: 269, DEF: 396, SpATK: 73, SpDEF: 283, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 21.02 , Speed: 4200 },
    12: { HP: 7530, ATK: 284, DEF: 445, SpATK: 82, SpDEF: 318, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 22.82 , Speed: 4200 },
    13: { HP: 8213, ATK: 301, DEF: 501, SpATK: 92, SpDEF: 359, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 24.89 , Speed: 4200 },
    14: { HP: 8998, ATK: 321, DEF: 566, SpATK: 103, SpDEF: 406, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 27.27 , Speed: 4200 },
    15: { HP: 9900, ATK: 344, DEF: 640, SpATK: 116, SpDEF: 460, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4200 }
  },

    "darkrai": {
    1: { HP: 3600, ATK: 160, DEF: 80, SpATK: 90, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3739, ATK: 167, DEF: 90, SpATK: 112, SpDEF: 67, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.71 , Speed: 3800 },
    3: { HP: 3892, ATK: 175, DEF: 101, SpATK: 137, SpDEF: 75, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.49 , Speed: 3800 },
    4: { HP: 4060, ATK: 184, DEF: 113, SpATK: 164, SpDEF: 84, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.35 , Speed: 3800 },
    5: { HP: 4244, ATK: 193, DEF: 126, SpATK: 194, SpDEF: 93, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.3 , Speed: 3950 },
    6: { HP: 4447, ATK: 203, DEF: 140, SpATK: 227, SpDEF: 103, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.34 , Speed: 3950 },
    7: { HP: 4670, ATK: 214, DEF: 155, SpATK: 263, SpDEF: 114, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.49 , Speed: 4100 },
    8: { HP: 4916, ATK: 227, DEF: 172, SpATK: 303, SpDEF: 127, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.75 , Speed: 4100 },
    9: { HP: 5187, ATK: 241, DEF: 191, SpATK: 347, SpDEF: 141, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.14 , Speed: 4250 },
    10: { HP: 5486, ATK: 256, DEF: 212, SpATK: 395, SpDEF: 156, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 19.67 , Speed: 4250 },
    11: { HP: 5816, ATK: 273, DEF: 235, SpATK: 448, SpDEF: 173, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 21.36 , Speed: 4400 },
    12: { HP: 6178, ATK: 292, DEF: 260, SpATK: 507, SpDEF: 192, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 23.22 , Speed: 4400 },
    13: { HP: 6577, ATK: 312, DEF: 287, SpATK: 571, SpDEF: 212, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 25.27 , Speed: 4400 },
    14: { HP: 7016, ATK: 335, DEF: 317, SpATK: 642, SpDEF: 235, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 27.52 , Speed: 4400 },
    15: { HP: 7500, ATK: 360, DEF: 350, SpATK: 720, SpDEF: 260, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4400 },
  },

    "decidueye": {
    1: { HP: 3000, ATK: 125, DEF: 50, SpATK: 20, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3031, ATK: 130, DEF: 53, SpATK: 22, SpDEF: 33, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.57 , Speed: 3600 },
    3: { HP: 3068, ATK: 136, DEF: 57, SpATK: 24, SpDEF: 36, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.46 , Speed: 3600 },
    4: { HP: 3112, ATK: 143, DEF: 62, SpATK: 27, SpDEF: 40, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 15.73 , Speed: 3600 },
    5: { HP: 3273, ATK: 167, DEF: 78, SpATK: 37, SpDEF: 55, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 23.96 , Speed: 3750 },
    6: { HP: 3337, ATK: 177, DEF: 85, SpATK: 41, SpDEF: 61, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 27.24 , Speed: 3750 },
    7: { HP: 3629, ATK: 221, DEF: 115, SpATK: 58, SpDEF: 88, CritRate: 15 , CDR: 0 , HPRegen: 10 , AtkSPD: 42.17 , Speed: 3900 },
    8: { HP: 3721, ATK: 235, DEF: 124, SpATK: 64, SpDEF: 97, CritRate: 15 , CDR: 0 , HPRegen: 10 , AtkSPD: 46.89 , Speed: 3900 },
    9: { HP: 3832, ATK: 252, DEF: 135, SpATK: 71, SpDEF: 107, CritRate: 30 , CDR: 0 , HPRegen: 15 , AtkSPD: 52.55 , Speed: 4050 },
    10: { HP: 3965, ATK: 272, DEF: 149, SpATK: 79, SpDEF: 119, CritRate: 30 , CDR: 0 , HPRegen: 15 , AtkSPD: 59.34 , Speed: 4050 },
    11: { HP: 4125, ATK: 296, DEF: 165, SpATK: 89, SpDEF: 134, CritRate: 30 , CDR: 0 , HPRegen: 20 , AtkSPD: 67.5 , Speed: 4200 },
    12: { HP: 4316, ATK: 325, DEF: 185, SpATK: 100, SpDEF: 152, CritRate: 30 , CDR: 0 , HPRegen: 20 , AtkSPD: 77.28 , Speed: 4200 },
    13: { HP: 4546, ATK: 359, DEF: 208, SpATK: 114, SpDEF: 173, CritRate: 30 , CDR: 0 , HPRegen: 25 , AtkSPD: 89.02 , Speed: 4200 },
    14: { HP: 4821, ATK: 400, DEF: 236, SpATK: 130, SpDEF: 199, CritRate: 30 , CDR: 0 , HPRegen: 25 , AtkSPD: 103.1 , Speed: 4200 },
    15: { HP: 5152, ATK: 450, DEF: 270, SpATK: 150, SpDEF: 230, CritRate: 30 , CDR: 0 , HPRegen: 25 , AtkSPD: 120.00 , Speed: 4200 },
  },

    "delphox": {
    1: { HP: 3300, ATK: 134, DEF: 35, SpATK: 80, SpDEF: 27, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3343, ATK: 136, DEF: 37, SpATK: 92, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.21 , Speed: 3700 },
    3: { HP: 3394, ATK: 139, DEF: 39, SpATK: 107, SpDEF: 33, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.47 , Speed: 3700 },
    4: { HP: 3605, ATK: 150, DEF: 49, SpATK: 168, SpDEF: 47, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.53 , Speed: 3700 },
    5: { HP: 3679, ATK: 154, DEF: 52, SpATK: 190, SpDEF: 52, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 11.9 , Speed: 3850 },
    6: { HP: 4067, ATK: 174, DEF: 70, SpATK: 303, SpDEF: 78, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.85 , Speed: 3850 },
    7: { HP: 4174, ATK: 180, DEF: 75, SpATK: 334, SpDEF: 85, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.39 , Speed: 4000 },
    8: { HP: 4302, ATK: 187, DEF: 81, SpATK: 371, SpDEF: 93, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.03 , Speed: 4000 },
    9: { HP: 4456, ATK: 195, DEF: 88, SpATK: 416, SpDEF: 103, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 15.8 , Speed: 4150 },
    10: { HP: 4641, ATK: 205, DEF: 97, SpATK: 470, SpDEF: 115, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 16.73 , Speed: 4150 },
    11: { HP: 4863, ATK: 217, DEF: 107, SpATK: 535, SpDEF: 130, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 17.84 , Speed: 4300 },
    12: { HP: 5129, ATK: 231, DEF: 119, SpATK: 612, SpDEF: 148, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 19.17 , Speed: 4300 },
    13: { HP: 5448, ATK: 248, DEF: 134, SpATK: 705, SpDEF: 169, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 20.77 , Speed: 4300 },
    14: { HP: 5831, ATK: 268, DEF: 152, SpATK: 816, SpDEF: 194, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 22.69 , Speed: 4300 },
    15: { HP: 6290, ATK: 292, DEF: 175, SpATK: 950, SpDEF: 225, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 24.99 , Speed: 4300 },
  },

    "dodrio": {
    1: { HP: 3050, ATK: 150, DEF: 45, SpATK: 20, SpDEF: 35, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3122, ATK: 161, DEF: 51, SpATK: 22, SpDEF: 39, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.44 , Speed: 3700 },
    3: { HP: 3205, ATK: 173, DEF: 57, SpATK: 24, SpDEF: 43, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3700 },
    4: { HP: 3300, ATK: 187, DEF: 64, SpATK: 26, SpDEF: 48, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.54 , Speed: 3700 },
    5: { HP: 3735, ATK: 251, DEF: 98, SpATK: 40, SpDEF: 70, CritRate: 5 , CDR: 0 , HPRegen: 0 , AtkSPD: 14.22 , Speed: 3850 },
    6: { HP: 3861, ATK: 269, DEF: 108, SpATK: 44, SpDEF: 76, CritRate: 5 , CDR: 0 , HPRegen: 0 , AtkSPD: 15.00 , Speed: 3850 },
    7: { HP: 4006, ATK: 290, DEF: 119, SpATK: 48, SpDEF: 83, CritRate: 5 , CDR: 0 , HPRegen: 0 , AtkSPD: 15.89 , Speed: 4000 },
    8: { HP: 4173, ATK: 314, DEF: 132, SpATK: 53, SpDEF: 91, CritRate: 5 , CDR: 0 , HPRegen: 0 , AtkSPD: 16.92 , Speed: 4000 },
    9: { HP: 4365, ATK: 342, DEF: 147, SpATK: 59, SpDEF: 101, CritRate: 10 , CDR: 0 , HPRegen: 0 , AtkSPD: 18.1 , Speed: 4150 },
    10: { HP: 4586, ATK: 374, DEF: 164, SpATK: 66, SpDEF: 112, CritRate: 10 , CDR: 0 , HPRegen: 0 , AtkSPD: 19.46 , Speed: 4150 },
    11: { HP: 4840, ATK: 411, DEF: 184, SpATK: 74, SpDEF: 125, CritRate: 10 , CDR: 0 , HPRegen: 0 , AtkSPD: 21.02 , Speed: 4300 },
    12: { HP: 5133, ATK: 454, DEF: 207, SpATK: 83, SpDEF: 140, CritRate: 10 , CDR: 0 , HPRegen: 0 , AtkSPD: 22.82 , Speed: 4300 },
    13: { HP: 5469, ATK: 503, DEF: 233, SpATK: 93, SpDEF: 157, CritRate: 10 , CDR: 0 , HPRegen: 0 , AtkSPD: 24.89 , Speed: 4300 },
    14: { HP: 5856, ATK: 560, DEF: 263, SpATK: 105, SpDEF: 177, CritRate: 10 , CDR: 0 , HPRegen: 0 , AtkSPD: 27.27 , Speed: 4300 },
    15: { HP: 6300, ATK: 625, DEF: 298, SpATK: 118, SpDEF: 200, CritRate: 10 , CDR: 0 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "dragapult": {
    1: { HP: 3000, ATK: 140, DEF: 50, SpATK: 20, SpDEF: 40, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3043, ATK: 145, DEF: 53, SpATK: 21, SpDEF: 42, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.01 , Speed: 3650 },
    3: { HP: 3095, ATK: 151, DEF: 56, SpATK: 23, SpDEF: 44, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.22 , Speed: 3650 },
    4: { HP: 3157, ATK: 158, DEF: 60, SpATK: 25, SpDEF: 46, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.67 , Speed: 3650 },
    5: { HP: 3382, ATK: 185, DEF: 74, SpATK: 32, SpDEF: 55, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 18.91 , Speed: 3800 },
    6: { HP: 3471, ATK: 196, DEF: 80, SpATK: 35, SpDEF: 59, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 20.99 , Speed: 3800 },
    7: { HP: 3578, ATK: 209, DEF: 87, SpATK: 38, SpDEF: 63, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 23.49 , Speed: 3950 },
    8: { HP: 3707, ATK: 224, DEF: 95, SpATK: 42, SpDEF: 68, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 26.49 , Speed: 3950 },
    9: { HP: 4161, ATK: 279, DEF: 124, SpATK: 56, SpDEF: 86, CritRate: 25 , CDR: 0 , HPRegen: 10 , AtkSPD: 37.09 , Speed: 4100 },
    10: { HP: 4346, ATK: 301, DEF: 136, SpATK: 62, SpDEF: 93, CritRate: 25 , CDR: 0 , HPRegen: 10 , AtkSPD: 41.41 , Speed: 4100 },
    11: { HP: 4568, ATK: 328, DEF: 150, SpATK: 69, SpDEF: 102, CritRate: 25 , CDR: 0 , HPRegen: 10 , AtkSPD: 46.6 , Speed: 4250 },
    12: { HP: 4835, ATK: 360, DEF: 167, SpATK: 77, SpDEF: 113, CritRate: 25 , CDR: 0 , HPRegen: 10 , AtkSPD: 52.82 , Speed: 4250 },
    13: { HP: 5155, ATK: 399, DEF: 187, SpATK: 87, SpDEF: 126, CritRate: 25 , CDR: 0 , HPRegen: 15 , AtkSPD: 60.29 , Speed: 4250 },
    14: { HP: 5539, ATK: 445, DEF: 211, SpATK: 99, SpDEF: 141, CritRate: 25 , CDR: 0 , HPRegen: 15 , AtkSPD: 69.25 , Speed: 4250 },
    15: { HP: 6000, ATK: 500, DEF: 240, SpATK: 114, SpDEF: 160, CritRate: 25 , CDR: 0 , HPRegen: 15 , AtkSPD: 80.00 , Speed: 4250 },
  },

    "dragonite": {
    1: { HP: 3050, ATK: 165, DEF: 78, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3117, ATK: 170, DEF: 84, SpATK: 21, SpDEF: 64, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.57 , Speed: 3700 },
    3: { HP: 3198, ATK: 177, DEF: 91, SpATK: 23, SpDEF: 69, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.26 , Speed: 3700 },
    4: { HP: 3295, ATK: 185, DEF: 99, SpATK: 25, SpDEF: 75, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.08 , Speed: 3700 },
    5: { HP: 3647, ATK: 214, DEF: 128, SpATK: 32, SpDEF: 97, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.07 , Speed: 3850 },
    6: { HP: 3787, ATK: 225, DEF: 140, SpATK: 35, SpDEF: 106, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 16.26 , Speed: 3850 },
    7: { HP: 3955, ATK: 239, DEF: 154, SpATK: 38, SpDEF: 117, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 17.69 , Speed: 4000 },
    8: { HP: 4627, ATK: 294, DEF: 209, SpATK: 52, SpDEF: 160, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 23.41 , Speed: 4000 },
    9: { HP: 4869, ATK: 314, DEF: 229, SpATK: 57, SpDEF: 175, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 25.47 , Speed: 4150 },
    10: { HP: 5159, ATK: 338, DEF: 253, SpATK: 63, SpDEF: 194, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 27.94 , Speed: 4150 },
    11: { HP: 5507, ATK: 367, DEF: 282, SpATK: 70, SpDEF: 216, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 30.91 , Speed: 4300 },
    12: { HP: 5925, ATK: 401, DEF: 316, SpATK: 78, SpDEF: 243, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 34.47 , Speed: 4300 },
    13: { HP: 6426, ATK: 442, DEF: 357, SpATK: 88, SpDEF: 275, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 38.74 , Speed: 4300 },
    14: { HP: 7028, ATK: 491, DEF: 406, SpATK: 100, SpDEF: 314, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 43.86 , Speed: 4300 },
    15: { HP: 7750, ATK: 550, DEF: 465, SpATK: 115, SpDEF: 360, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 50.00 , Speed: 4300 }
  },

    "duraludon": {
    1: { HP: 3000, ATK: 135, DEF: 70, SpATK: 20, SpDEF: 50, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3085, ATK: 148, DEF: 78, SpATK: 24, SpDEF: 55, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.14 , Speed: 3650 },
    3: { HP: 3179, ATK: 162, DEF: 87, SpATK: 28, SpDEF: 61, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 16.59 , Speed: 3650 },
    4: { HP: 3282, ATK: 178, DEF: 97, SpATK: 32, SpDEF: 67, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 20.39 , Speed: 3650 },
    5: { HP: 3395, ATK: 195, DEF: 108, SpATK: 37, SpDEF: 74, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 24.57 , Speed: 3800 },
    6: { HP: 3520, ATK: 214, DEF: 120, SpATK: 42, SpDEF: 82, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 29.16 , Speed: 3800 },
    7: { HP: 3657, ATK: 235, DEF: 133, SpATK: 48, SpDEF: 91, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 34.21 , Speed: 3950 },
    8: { HP: 3808, ATK: 258, DEF: 148, SpATK: 54, SpDEF: 100, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 39.77 , Speed: 3950 },
    9: { HP: 3975, ATK: 284, DEF: 164, SpATK: 61, SpDEF: 110, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 45.88 , Speed: 4100 },
    10: { HP: 4159, ATK: 312, DEF: 182, SpATK: 69, SpDEF: 122, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 52.6 , Speed: 4100 },
    11: { HP: 4362, ATK: 343, DEF: 201, SpATK: 77, SpDEF: 135, CritRate: 20 , CDR: 0 , HPRegen: 20 , AtkSPD: 60.00 , Speed: 4250 },
    12: { HP: 4585, ATK: 377, DEF: 222, SpATK: 86, SpDEF: 149, CritRate: 20 , CDR: 0 , HPRegen: 20 , AtkSPD: 60.00 , Speed: 4250 },
    13: { HP: 4830, ATK: 414, DEF: 246, SpATK: 96, SpDEF: 164, CritRate: 20 , CDR: 0 , HPRegen: 25 , AtkSPD: 60.00 , Speed: 4250 },
    14: { HP: 5100, ATK: 455, DEF: 272, SpATK: 107, SpDEF: 181, CritRate: 20 , CDR: 0 , HPRegen: 25 , AtkSPD: 60.00 , Speed: 4250 },
    15: { HP: 5397, ATK: 500, DEF: 301, SpATK: 119, SpDEF: 200, CritRate: 20 , CDR: 0 , HPRegen: 25 , AtkSPD: 60.00 , Speed: 4250 }
  },

    "eldegoss": {
    1: { HP: 3278, ATK: 130, DEF: 40, SpATK: 40, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3383, ATK: 134, DEF: 44, SpATK: 54, SpDEF: 33, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.22 , Speed: 3800 },
    3: { HP: 3503, ATK: 139, DEF: 48, SpATK: 70, SpDEF: 36, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.47 , Speed: 3800 },
    4: { HP: 4114, ATK: 162, DEF: 69, SpATK: 152, SpDEF: 52, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.76 , Speed: 3800 },
    5: { HP: 4274, ATK: 168, DEF: 74, SpATK: 173, SpDEF: 56, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.1 , Speed: 3950 },
    6: { HP: 4457, ATK: 175, DEF: 80, SpATK: 198, SpDEF: 61, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.49 , Speed: 3950 },
    7: { HP: 4668, ATK: 183, DEF: 87, SpATK: 226, SpDEF: 66, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.94 , Speed: 4100 },
    8: { HP: 4911, ATK: 192, DEF: 95, SpATK: 258, SpDEF: 72, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.45 , Speed: 4100 },
    9: { HP: 5190, ATK: 203, DEF: 104, SpATK: 295, SpDEF: 79, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.04 , Speed: 4250 },
    10: { HP: 5511, ATK: 215, DEF: 115, SpATK: 338, SpDEF: 87, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.72 , Speed: 4250 },
    11: { HP: 5880, ATK: 229, DEF: 128, SpATK: 387, SpDEF: 96, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.5 , Speed: 4400 },
    12: { HP: 6305, ATK: 245, DEF: 142, SpATK: 444, SpDEF: 107, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.4 , Speed: 4400 },
    13: { HP: 6794, ATK: 264, DEF: 159, SpATK: 509, SpDEF: 119, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.43 , Speed: 4400 },
    14: { HP: 7356, ATK: 285, DEF: 178, SpATK: 584, SpDEF: 133, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.62 , Speed: 4400 },
    15: { HP: 8002, ATK: 310, DEF: 200, SpATK: 670, SpDEF: 149, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 19.99 , Speed: 4400 }
  },

    "espeon": {
    1: { HP: 3200, ATK: 134, DEF: 35, SpATK: 50, SpDEF: 27, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3269, ATK: 137, DEF: 39, SpATK: 71, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    3: { HP: 3349, ATK: 141, DEF: 44, SpATK: 95, SpDEF: 34, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    4: { HP: 3753, ATK: 161, DEF: 69, SpATK: 218, SpDEF: 54, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    5: { HP: 3858, ATK: 166, DEF: 75, SpATK: 250, SpDEF: 59, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3850 },
    6: { HP: 3979, ATK: 172, DEF: 82, SpATK: 287, SpDEF: 65, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3850 },
    7: { HP: 4118, ATK: 179, DEF: 90, SpATK: 329, SpDEF: 72, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4000 },
    8: { HP: 4278, ATK: 187, DEF: 100, SpATK: 378, SpDEF: 80, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4000 },
    9: { HP: 4462, ATK: 196, DEF: 111, SpATK: 434, SpDEF: 89, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4150 },
    10: { HP: 4674, ATK: 207, DEF: 124, SpATK: 499, SpDEF: 99, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4150 },
    11: { HP: 4918, ATK: 219, DEF: 139, SpATK: 573, SpDEF: 111, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
    12: { HP: 5199, ATK: 233, DEF: 156, SpATK: 658, SpDEF: 125, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
    13: { HP: 5522, ATK: 249, DEF: 176, SpATK: 756, SpDEF: 141, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
    14: { HP: 5893, ATK: 268, DEF: 199, SpATK: 869, SpDEF: 159, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
    15: { HP: 6320, ATK: 289, DEF: 225, SpATK: 999, SpDEF: 180, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 }
  },

    "falinks": {
    1: { HP: 3200, ATK: 150, DEF: 90, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3371, ATK: 160, DEF: 103, SpATK: 23, SpDEF: 80, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.71 , Speed: 3700 },
    3: { HP: 3559, ATK: 171, DEF: 118, SpATK: 27, SpDEF: 91, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.49 , Speed: 3700 },
    4: { HP: 3766, ATK: 183, DEF: 134, SpATK: 31, SpDEF: 103, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.35 , Speed: 3700 },
    5: { HP: 3993, ATK: 196, DEF: 152, SpATK: 35, SpDEF: 117, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 13.3 , Speed: 3850 },
    6: { HP: 4243, ATK: 211, DEF: 171, SpATK: 40, SpDEF: 132, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 14.34 , Speed: 3850 },
    7: { HP: 4518, ATK: 227, DEF: 192, SpATK: 45, SpDEF: 149, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.49 , Speed: 4000 },
    8: { HP: 4821, ATK: 245, DEF: 215, SpATK: 51, SpDEF: 167, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 16.75 , Speed: 4000 },
    9: { HP: 5155, ATK: 264, DEF: 241, SpATK: 58, SpDEF: 187, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 18.14 , Speed: 4150 },
    10: { HP: 5523, ATK: 285, DEF: 269, SpATK: 65, SpDEF: 209, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 19.67 , Speed: 4150 },
    11: { HP: 5928, ATK: 309, DEF: 300, SpATK: 73, SpDEF: 234, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 21.36 , Speed: 4300 },
    12: { HP: 6374, ATK: 335, DEF: 334, SpATK: 82, SpDEF: 261, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 23.22 , Speed: 4300 },
    13: { HP: 6865, ATK: 364, DEF: 372, SpATK: 92, SpDEF: 291, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 25.27 , Speed: 4300 },
    14: { HP: 7405, ATK: 395, DEF: 414, SpATK: 103, SpDEF: 324, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 27.52 , Speed: 4300 },
    15: { HP: 8000, ATK: 430, DEF: 460, SpATK: 115, SpDEF: 360, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "garchomp": {
    1: { HP: 3050, ATK: 165, DEF: 90, SpATK: 20, SpDEF: 67, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3117, ATK: 170, DEF: 95, SpATK: 21, SpDEF: 71, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.5 , Speed: 3800 },
    3: { HP: 3198, ATK: 176, DEF: 102, SpATK: 23, SpDEF: 76, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.1 , Speed: 3800 },
    4: { HP: 3295, ATK: 183, DEF: 110, SpATK: 25, SpDEF: 82, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.82 , Speed: 3800 },
    5: { HP: 3647, ATK: 209, DEF: 138, SpATK: 32, SpDEF: 104, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 14.44 , Speed: 3950 },
    6: { HP: 3787, ATK: 219, DEF: 149, SpATK: 35, SpDEF: 113, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.48 , Speed: 3950 },
    7: { HP: 3955, ATK: 232, DEF: 163, SpATK: 38, SpDEF: 124, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 16.73 , Speed: 4100 },
    8: { HP: 4157, ATK: 247, DEF: 179, SpATK: 42, SpDEF: 137, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 18.23 , Speed: 4100 },
    9: { HP: 4869, ATK: 300, DEF: 237, SpATK: 56, SpDEF: 183, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 23.53 , Speed: 4250 },
    10: { HP: 5159, ATK: 322, DEF: 261, SpATK: 62, SpDEF: 202, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 25.69 , Speed: 4250 },
    11: { HP: 5507, ATK: 348, DEF: 289, SpATK: 69, SpDEF: 224, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 28.28 , Speed: 4400 },
    12: { HP: 5925, ATK: 379, DEF: 323, SpATK: 77, SpDEF: 251, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 31.39 , Speed: 4400 },
    13: { HP: 6426, ATK: 417, DEF: 364, SpATK: 87, SpDEF: 283, CritRate: 10 , CDR: 0 , HPRegen: 15 , AtkSPD: 35.12 , Speed: 4400 },
    14: { HP: 7028, ATK: 462, DEF: 413, SpATK: 99, SpDEF: 321, CritRate: 10 , CDR: 0 , HPRegen: 15 , AtkSPD: 39.6 , Speed: 4400 },
    15: { HP: 7750, ATK: 516, DEF: 472, SpATK: 114, SpDEF: 367, CritRate: 10 , CDR: 0 , HPRegen: 15 , AtkSPD: 45.00 , Speed: 4400 },
  },

    "gardevoir": {
    1: { HP: 3200, ATK: 134, DEF: 35, SpATK: 65, SpDEF: 27, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3250, ATK: 136, DEF: 39, SpATK: 79, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    3: { HP: 3310, ATK: 139, DEF: 43, SpATK: 96, SpDEF: 33, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    4: { HP: 3382, ATK: 142, DEF: 48, SpATK: 116, SpDEF: 37, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    5: { HP: 3644, ATK: 154, DEF: 66, SpATK: 190, SpDEF: 52, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3850 },
    6: { HP: 3748, ATK: 159, DEF: 73, SpATK: 219, SpDEF: 58, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3850 },
    7: { HP: 4223, ATK: 180, DEF: 106, SpATK: 353, SpDEF: 86, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4000 },
    8: { HP: 4373, ATK: 187, DEF: 117, SpATK: 395, SpDEF: 95, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4000 },
    9: { HP: 4553, ATK: 195, DEF: 130, SpATK: 446, SpDEF: 105, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4150 },
    10: { HP: 4769, ATK: 205, DEF: 145, SpATK: 507, SpDEF: 118, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4150 },
    11: { HP: 5029, ATK: 216, DEF: 163, SpATK: 580, SpDEF: 133, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
    12: { HP: 5340, ATK: 230, DEF: 185, SpATK: 668, SpDEF: 151, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
    13: { HP: 5714, ATK: 247, DEF: 211, SpATK: 773, SpDEF: 173, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
    14: { HP: 6162, ATK: 267, DEF: 242, SpATK: 899, SpDEF: 199, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
    15: { HP: 6700, ATK: 291, DEF: 280, SpATK: 1050, SpDEF: 230, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 }
  },

    "gengar": {
    1: { HP: 3456, ATK: 20, DEF: 52, SpATK: 80, SpDEF: 38, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3510, ATK: 21, DEF: 56, SpATK: 89, SpDEF: 40, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.43 , Speed: 3650 },
    3: { HP: 3574, ATK: 23, DEF: 61, SpATK: 99, SpDEF: 43, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.94 , Speed: 3650 },
    4: { HP: 3651, ATK: 25, DEF: 67, SpATK: 112, SpDEF: 47, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.56 , Speed: 3650 },
    5: { HP: 3931, ATK: 32, DEF: 87, SpATK: 158, SpDEF: 60, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.8 , Speed: 3800 },
    6: { HP: 4043, ATK: 35, DEF: 95, SpATK: 176, SpDEF: 65, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.69 , Speed: 3800 },
    7: { HP: 4177, ATK: 38, DEF: 105, SpATK: 198, SpDEF: 71, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.76 , Speed: 3950 },
    8: { HP: 4338, ATK: 42, DEF: 116, SpATK: 224, SpDEF: 78, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 17.05 , Speed: 3950 },
    9: { HP: 4905, ATK: 56, DEF: 156, SpATK: 316, SpDEF: 104, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 21.59 , Speed: 4100 },
    10: { HP: 5136, ATK: 62, DEF: 172, SpATK: 354, SpDEF: 115, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 23.44 , Speed: 4100 },
    11: { HP: 5414, ATK: 69, DEF: 192, SpATK: 399, SpDEF: 128, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 25.66 , Speed: 4250 },
    12: { HP: 5747, ATK: 78, DEF: 216, SpATK: 453, SpDEF: 143, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 28.33 , Speed: 4250 },
    13: { HP: 6146, ATK: 88, DEF: 245, SpATK: 518, SpDEF: 161, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 31.53 , Speed: 4250 },
    14: { HP: 6625, ATK: 100, DEF: 279, SpATK: 596, SpDEF: 183, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 35.37 , Speed: 4250 },
    15: { HP: 7200, ATK: 115, DEF: 320, SpATK: 690, SpDEF: 210, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 39.98 , Speed: 4250 }
  },

    "glaceon": {
    1: { HP: 3200, ATK: 20, DEF: 35, SpATK: 100, SpDEF: 25, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3270, ATK: 22, DEF: 39, SpATK: 117, SpDEF: 28, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.00 , Speed: 3700 },
    3: { HP: 3350, ATK: 24, DEF: 44, SpATK: 137, SpDEF: 32, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 14.29 , Speed: 3700 },
    4: { HP: 3758, ATK: 36, DEF: 69, SpATK: 238, SpDEF: 52, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 25.93 , Speed: 3700 },
    5: { HP: 3864, ATK: 39, DEF: 75, SpATK: 264, SpDEF: 57, CritRate: 10 , CDR: 5 , HPRegen: 0 , AtkSPD: 28.97 , Speed: 3850 },
    6: { HP: 3986, ATK: 43, DEF: 82, SpATK: 294, SpDEF: 63, CritRate: 10 , CDR: 5 , HPRegen: 0 , AtkSPD: 32.46 , Speed: 3850 },
    7: { HP: 4127, ATK: 47, DEF: 90, SpATK: 329, SpDEF: 70, CritRate: 10 , CDR: 5 , HPRegen: 0 , AtkSPD: 36.47 , Speed: 4000 },
    8: { HP: 4289, ATK: 52, DEF: 100, SpATK: 369, SpDEF: 78, CritRate: 10 , CDR: 5 , HPRegen: 0 , AtkSPD: 41.09 , Speed: 4000 },
    9: { HP: 4475, ATK: 58, DEF: 111, SpATK: 415, SpDEF: 87, CritRate: 20 , CDR: 5 , HPRegen: 0 , AtkSPD: 46.41 , Speed: 4150 },
    10: { HP: 4689, ATK: 65, DEF: 124, SpATK: 468, SpDEF: 98, CritRate: 20 , CDR: 5 , HPRegen: 0 , AtkSPD: 52.53 , Speed: 4150 },
    11: { HP: 4935, ATK: 73, DEF: 139, SpATK: 529, SpDEF: 110, CritRate: 20 , CDR: 10 , HPRegen: 0 , AtkSPD: 59.57 , Speed: 4300 },
    12: { HP: 5218, ATK: 82, DEF: 156, SpATK: 599, SpDEF: 124, CritRate: 20 , CDR: 10 , HPRegen: 0 , AtkSPD: 67.67 , Speed: 4300 },
    13: { HP: 5544, ATK: 92, DEF: 176, SpATK: 680, SpDEF: 140, CritRate: 20 , CDR: 10 , HPRegen: 0 , AtkSPD: 76.99 , Speed: 4300 },
    14: { HP: 5919, ATK: 103, DEF: 199, SpATK: 773, SpDEF: 158, CritRate: 20 , CDR: 10 , HPRegen: 0 , AtkSPD: 87.7 , Speed: 4300 },
    15: { HP: 6350, ATK: 116, DEF: 225, SpATK: 880, SpDEF: 180, CritRate: 20 , CDR: 10 , HPRegen: 0 , AtkSPD: 100.00 , Speed: 4300 }
  },

	"goodra": {
    1: { HP: 3225, ATK: 150, DEF: 100, SpATK: 50, SpDEF: 100, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3326, ATK: 152, DEF: 107, SpATK: 56, SpDEF: 107, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3447, ATK: 155, DEF: 116, SpATK: 63, SpDEF: 115, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3593, ATK: 158, DEF: 127, SpATK: 71, SpDEF: 125, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 4122, ATK: 169, DEF: 166, SpATK: 101, SpDEF: 162, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 4333, ATK: 174, DEF: 181, SpATK: 113, SpDEF: 177, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 4586, ATK: 179, DEF: 200, SpATK: 127, SpDEF: 195, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.86 , Speed: 4000 },
    8: { HP: 5597, ATK: 201, DEF: 274, SpATK: 184, SpDEF: 265, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.72 , Speed: 4000 },
    9: { HP: 5961, ATK: 209, DEF: 301, SpATK: 205, SpDEF: 290, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 6398, ATK: 218, DEF: 333, SpATK: 230, SpDEF: 320, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 6923, ATK: 229, DEF: 372, SpATK: 260, SpDEF: 356, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 7552, ATK: 242, DEF: 418, SpATK: 295, SpDEF: 400, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 8307, ATK: 258, DEF: 473, SpATK: 338, SpDEF: 452, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 9213, ATK: 277, DEF: 540, SpATK: 389, SpDEF: 515, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 10300, ATK: 300, DEF: 620, SpATK: 450, SpDEF: 590, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "greedent": {
    1: { HP: 3000, ATK: 170, DEF: 75, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3135, ATK: 174, DEF: 85, SpATK: 22, SpDEF: 69, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.44 , Speed: 3600 },
    3: { HP: 3290, ATK: 178, DEF: 97, SpATK: 24, SpDEF: 79, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3600 },
    4: { HP: 3469, ATK: 183, DEF: 111, SpATK: 27, SpDEF: 91, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.54 , Speed: 3600 },
    5: { HP: 4285, ATK: 206, DEF: 173, SpATK: 40, SpDEF: 144, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.22 , Speed: 3750 },
    6: { HP: 4522, ATK: 213, DEF: 191, SpATK: 44, SpDEF: 159, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.00 , Speed: 3750 },
    7: { HP: 4794, ATK: 221, DEF: 212, SpATK: 48, SpDEF: 177, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.89 , Speed: 3900 },
    8: { HP: 5107, ATK: 230, DEF: 236, SpATK: 53, SpDEF: 198, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.92 , Speed: 3900 },
    9: { HP: 5467, ATK: 240, DEF: 263, SpATK: 59, SpDEF: 222, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.1 , Speed: 4050 },
    10: { HP: 5882, ATK: 252, DEF: 295, SpATK: 66, SpDEF: 249, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 19.46 , Speed: 4050 },
    11: { HP: 6359, ATK: 266, DEF: 331, SpATK: 74, SpDEF: 280, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 21.02 , Speed: 4200 },
    12: { HP: 6908, ATK: 282, DEF: 373, SpATK: 83, SpDEF: 316, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 22.82 , Speed: 4200 },
    13: { HP: 7539, ATK: 300, DEF: 421, SpATK: 93, SpDEF: 357, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 24.89 , Speed: 4200 },
    14: { HP: 8265, ATK: 321, DEF: 476, SpATK: 104, SpDEF: 405, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 27.27 , Speed: 4200 },
    15: { HP: 9099, ATK: 345, DEF: 540, SpATK: 117, SpDEF: 460, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4200 }
  },

    "greninja": {
    1: { HP: 3000, ATK: 146, DEF: 50, SpATK: 20, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3035, ATK: 151, DEF: 53, SpATK: 21, SpDEF: 32, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.57 , Speed: 3600 },
    3: { HP: 3077, ATK: 157, DEF: 56, SpATK: 23, SpDEF: 34, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.46 , Speed: 3600 },
    4: { HP: 3127, ATK: 164, DEF: 60, SpATK: 25, SpDEF: 36, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 15.73 , Speed: 3600 },
    5: { HP: 3308, ATK: 191, DEF: 75, SpATK: 32, SpDEF: 45, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 23.96 , Speed: 3750 },
    6: { HP: 3380, ATK: 202, DEF: 81, SpATK: 35, SpDEF: 49, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 27.24 , Speed: 3750 },
    7: { HP: 3708, ATK: 250, DEF: 108, SpATK: 49, SpDEF: 65, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 42.17 , Speed: 3900 },
    8: { HP: 3812, ATK: 265, DEF: 117, SpATK: 53, SpDEF: 70, CritRate: 15 , CDR: 0 , HPRegen: 5 , AtkSPD: 46.89 , Speed: 3900 },
    9: { HP: 3937, ATK: 283, DEF: 127, SpATK: 58, SpDEF: 76, CritRate: 30 , CDR: 0 , HPRegen: 10 , AtkSPD: 52.55 , Speed: 4050 },
    10: { HP: 4086, ATK: 305, DEF: 139, SpATK: 64, SpDEF: 83, CritRate: 30 , CDR: 0 , HPRegen: 10 , AtkSPD: 59.34 , Speed: 4050 },
    11: { HP: 4265, ATK: 331, DEF: 154, SpATK: 71, SpDEF: 92, CritRate: 30 , CDR: 0 , HPRegen: 10 , AtkSPD: 67.5 , Speed: 4200 },
    12: { HP: 4480, ATK: 363, DEF: 172, SpATK: 80, SpDEF: 103, CritRate: 30 , CDR: 0 , HPRegen: 10 , AtkSPD: 77.28 , Speed: 4200 },
    13: { HP: 4738, ATK: 401, DEF: 193, SpATK: 91, SpDEF: 116, CritRate: 30 , CDR: 0 , HPRegen: 15 , AtkSPD: 89.02 , Speed: 4200 },
    14: { HP: 5048, ATK: 446, DEF: 219, SpATK: 104, SpDEF: 131, CritRate: 30 , CDR: 0 , HPRegen: 15 , AtkSPD: 103.1 , Speed: 4200 },
    15: { HP: 5420, ATK: 500, DEF: 250, SpATK: 119, SpDEF: 149, CritRate: 30 , CDR: 0 , HPRegen: 15 , AtkSPD: 120.00 , Speed: 4200 },
  },

  "gyarados": {
    1: { HP: 3250, ATK: 140, DEF: 80, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3389, ATK: 149, DEF: 93, SpATK: 23, SpDEF: 70, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    3: { HP: 3542, ATK: 159, DEF: 108, SpATK: 27, SpDEF: 81, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    4: { HP: 3710, ATK: 170, DEF: 124, SpATK: 31, SpDEF: 93, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    5: { HP: 3894, ATK: 182, DEF: 142, SpATK: 35, SpDEF: 107, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 10.00 , Speed: 3850 },
    6: { HP: 4097, ATK: 196, DEF: 161, SpATK: 40, SpDEF: 122, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 10.00 , Speed: 3850 },
    7: { HP: 4320, ATK: 211, DEF: 182, SpATK: 45, SpDEF: 138, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 10.00 , Speed: 4000 },
    8: { HP: 4566, ATK: 228, DEF: 205, SpATK: 51, SpDEF: 156, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 10.00 , Speed: 4000 },
    9: { HP: 4837, ATK: 246, DEF: 231, SpATK: 58, SpDEF: 176, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 10.00 , Speed: 4150 },
    10: { HP: 5136, ATK: 266, DEF: 259, SpATK: 65, SpDEF: 198, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 10.00 , Speed: 4150 },
    11: { HP: 5466, ATK: 288, DEF: 290, SpATK: 73, SpDEF: 222, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 10.00 , Speed: 4300 },
    12: { HP: 5828, ATK: 312, DEF: 324, SpATK: 82, SpDEF: 249, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 10.00 , Speed: 4300 },
    13: { HP: 6227, ATK: 339, DEF: 362, SpATK: 92, SpDEF: 278, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 10.00 , Speed: 4300 },
    14: { HP: 6666, ATK: 368, DEF: 404, SpATK: 103, SpDEF: 310, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 10.00 , Speed: 4300 },
    15: { HP: 7150, ATK: 400, DEF: 450, SpATK: 115, SpDEF: 345, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 10.00 , Speed: 4300 },
  },

  "hooh": {
    1: { HP: 3400, ATK: 170, DEF: 90, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3631, ATK: 177, DEF: 106, SpATK: 23, SpDEF: 82, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.71 , Speed: 3700 },
    3: { HP: 3886, ATK: 185, DEF: 124, SpATK: 27, SpDEF: 96, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.49 , Speed: 3700 },
    4: { HP: 4166, ATK: 194, DEF: 143, SpATK: 31, SpDEF: 111, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.35 , Speed: 3700 },
    5: { HP: 4473, ATK: 204, DEF: 164, SpATK: 36, SpDEF: 128, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.3 , Speed: 3850 },
    6: { HP: 4812, ATK: 215, DEF: 187, SpATK: 41, SpDEF: 146, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.34 , Speed: 3850 },
    7: { HP: 5184, ATK: 227, DEF: 213, SpATK: 46, SpDEF: 166, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.49 , Speed: 4000 },
    8: { HP: 5594, ATK: 240, DEF: 241, SpATK: 52, SpDEF: 188, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.75 , Speed: 4000 },
    9: { HP: 6046, ATK: 255, DEF: 272, SpATK: 59, SpDEF: 212, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.14 , Speed: 4150 },
    10: { HP: 6544, ATK: 271, DEF: 307, SpATK: 66, SpDEF: 239, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 19.67 , Speed: 4150 },
    11: { HP: 7093, ATK: 289, DEF: 345, SpATK: 74, SpDEF: 269, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 21.36 , Speed: 4300 },
    12: { HP: 7697, ATK: 309, DEF: 387, SpATK: 83, SpDEF: 302, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 23.22 , Speed: 4300 },
    13: { HP: 8362, ATK: 330, DEF: 433, SpATK: 93, SpDEF: 338, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 25.27 , Speed: 4300 },
    14: { HP: 9094, ATK: 354, DEF: 484, SpATK: 104, SpDEF: 377, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 27.52 , Speed: 4300 },
    15: { HP: 9900, ATK: 380, DEF: 540, SpATK: 116, SpDEF: 420, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

  "hoopa": {
    1: { HP: 3278, ATK: 130, DEF: 72, SpATK: 40, SpDEF: 50, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3443, ATK: 136, DEF: 80, SpATK: 61, SpDEF: 55, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.07 , Speed: 3700 },
    3: { HP: 3624, ATK: 143, DEF: 89, SpATK: 84, SpDEF: 61, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.24 , Speed: 3700 },
    4: { HP: 3823, ATK: 151, DEF: 99, SpATK: 109, SpDEF: 67, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.53 , Speed: 3700 },
    5: { HP: 4041, ATK: 160, DEF: 110, SpATK: 136, SpDEF: 74, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.95 , Speed: 3850 },
    6: { HP: 4282, ATK: 169, DEF: 122, SpATK: 166, SpDEF: 82, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.51 , Speed: 3850 },
    7: { HP: 4547, ATK: 179, DEF: 135, SpATK: 199, SpDEF: 91, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 18.23 , Speed: 4000 },
    8: { HP: 4839, ATK: 190, DEF: 149, SpATK: 236, SpDEF: 100, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 20.12 , Speed: 4000 },
    9: { HP: 5161, ATK: 203, DEF: 165, SpATK: 276, SpDEF: 110, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 22.21 , Speed: 4150 },
    10: { HP: 5516, ATK: 217, DEF: 182, SpATK: 320, SpDEF: 122, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 24.51 , Speed: 4150 },
    11: { HP: 5906, ATK: 232, DEF: 201, SpATK: 369, SpDEF: 135, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 27.04 , Speed: 4300 },
    12: { HP: 6335, ATK: 249, DEF: 222, SpATK: 423, SpDEF: 149, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 29.83 , Speed: 4300 },
    13: { HP: 6808, ATK: 267, DEF: 245, SpATK: 482, SpDEF: 164, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 32.9 , Speed: 4300 },
    14: { HP: 7329, ATK: 287, DEF: 271, SpATK: 547, SpDEF: 181, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 36.28 , Speed: 4300 },
    15: { HP: 7902, ATK: 309, DEF: 299, SpATK: 619, SpDEF: 200, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 40.00 , Speed: 4300 }
  },

  "inteleon": {
    1: { HP: 3200, ATK: 20, DEF: 35, SpATK: 100, SpDEF: 25, CritRate: 5 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3244, ATK: 21, DEF: 38, SpATK: 111, SpDEF: 28, CritRate: 5 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.00 , Speed: 3700 },
    3: { HP: 3297, ATK: 23, DEF: 41, SpATK: 125, SpDEF: 31, CritRate: 5 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.2 , Speed: 3700 },
    4: { HP: 3361, ATK: 25, DEF: 45, SpATK: 142, SpDEF: 35, CritRate: 5 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.64 , Speed: 3700 },
    5: { HP: 3593, ATK: 32, DEF: 59, SpATK: 202, SpDEF: 50, CritRate: 5 , CDR: 5 , HPRegen: 0 , AtkSPD: 18.88 , Speed: 3850 },
    6: { HP: 3685, ATK: 35, DEF: 65, SpATK: 226, SpDEF: 56, CritRate: 5 , CDR: 5 , HPRegen: 0 , AtkSPD: 20.97 , Speed: 3850 },
    7: { HP: 4106, ATK: 48, DEF: 91, SpATK: 335, SpDEF: 83, CritRate: 5 , CDR: 5 , HPRegen: 0 , AtkSPD: 30.47 , Speed: 4000 },
    8: { HP: 4239, ATK: 52, DEF: 99, SpATK: 369, SpDEF: 92, CritRate: 5 , CDR: 5 , HPRegen: 0 , AtkSPD: 33.47 , Speed: 4000 },
    9: { HP: 4399, ATK: 57, DEF: 109, SpATK: 410, SpDEF: 102, CritRate: 10 , CDR: 5 , HPRegen: 0 , AtkSPD: 37.07 , Speed: 4150 },
    10: { HP: 4590, ATK: 63, DEF: 121, SpATK: 459, SpDEF: 114, CritRate: 10 , CDR: 5 , HPRegen: 0 , AtkSPD: 41.39 , Speed: 4150 },
    11: { HP: 4820, ATK: 70, DEF: 135, SpATK: 518, SpDEF: 129, CritRate: 10 , CDR: 10 , HPRegen: 0 , AtkSPD: 46.58 , Speed: 4300 },
    12: { HP: 5096, ATK: 78, DEF: 152, SpATK: 589, SpDEF: 147, CritRate: 10 , CDR: 10 , HPRegen: 0 , AtkSPD: 52.81 , Speed: 4300 },
    13: { HP: 5427, ATK: 88, DEF: 172, SpATK: 674, SpDEF: 168, CritRate: 10 , CDR: 10 , HPRegen: 0 , AtkSPD: 60.28 , Speed: 4300 },
    14: { HP: 5824, ATK: 100, DEF: 196, SpATK: 777, SpDEF: 194, CritRate: 10 , CDR: 10 , HPRegen: 0 , AtkSPD: 69.24 , Speed: 4300 },
    15: { HP: 6300, ATK: 115, DEF: 225, SpATK: 900, SpDEF: 225, CritRate: 10 , CDR: 10 , HPRegen: 0 , AtkSPD: 80.00 , Speed: 4300 }
  },

  "lapras": {
    1: { HP: 3300, ATK: 160, DEF: 90, SpATK: 90, SpDEF: 75, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3531, ATK: 165, DEF: 109, SpATK: 102, SpDEF: 91, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.71 , Speed: 3700 },
    3: { HP: 3786, ATK: 171, DEF: 130, SpATK: 115, SpDEF: 108, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.49 , Speed: 3700 },
    4: { HP: 4066, ATK: 177, DEF: 153, SpATK: 130, SpDEF: 127, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.35 , Speed: 3700 },
    5: { HP: 4373, ATK: 184, DEF: 178, SpATK: 146, SpDEF: 148, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.3 , Speed: 3850 },
    6: { HP: 4712, ATK: 192, DEF: 206, SpATK: 164, SpDEF: 171, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.34 , Speed: 3850 },
    7: { HP: 5084, ATK: 201, DEF: 237, SpATK: 183, SpDEF: 196, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.49 , Speed: 4000 },
    8: { HP: 5494, ATK: 210, DEF: 271, SpATK: 204, SpDEF: 224, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.75 , Speed: 4000 },
    9: { HP: 5946, ATK: 220, DEF: 308, SpATK: 228, SpDEF: 254, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.14 , Speed: 4150 },
    10: { HP: 6444, ATK: 232, DEF: 349, SpATK: 254, SpDEF: 288, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 19.67 , Speed: 4150 },
    11: { HP: 6993, ATK: 245, DEF: 394, SpATK: 283, SpDEF: 325, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 21.36 , Speed: 4300 },
    12: { HP: 7597, ATK: 259, DEF: 444, SpATK: 315, SpDEF: 366, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 23.22 , Speed: 4300 },
    13: { HP: 8262, ATK: 274, DEF: 499, SpATK: 350, SpDEF: 411, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 25.27 , Speed: 4300 },
    14: { HP: 8994, ATK: 291, DEF: 559, SpATK: 388, SpDEF: 460, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 27.52 , Speed: 4300 },
    15: { HP: 9800, ATK: 310, DEF: 625, SpATK: 430, SpDEF: 512, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

  "latias": {
    1: { HP: 3300, ATK: 120, DEF: 60, SpATK: 100, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3489, ATK: 127, DEF: 69, SpATK: 127, SpDEF: 69, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.36 , Speed: 3700 },
    3: { HP: 3697, ATK: 135, DEF: 78, SpATK: 156, SpDEF: 79, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.75 , Speed: 3700 },
    4: { HP: 3925, ATK: 144, DEF: 88, SpATK: 188, SpDEF: 90, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.18 , Speed: 3700 },
    5: { HP: 4175, ATK: 154, DEF: 99, SpATK: 223, SpDEF: 102, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 11.65 , Speed: 3850 },
    6: { HP: 4451, ATK: 165, DEF: 112, SpATK: 262, SpDEF: 116, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.17 , Speed: 3850 },
    7: { HP: 4755, ATK: 177, DEF: 126, SpATK: 305, SpDEF: 131, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.74 , Speed: 4000 },
    8: { HP: 5089, ATK: 190, DEF: 141, SpATK: 352, SpDEF: 148, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.37 , Speed: 4000 },
    9: { HP: 5458, ATK: 205, DEF: 158, SpATK: 404, SpDEF: 166, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.07 , Speed: 4150 },
    10: { HP: 5864, ATK: 221, DEF: 176, SpATK: 462, SpDEF: 186, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.84 , Speed: 4150 },
    11: { HP: 6312, ATK: 239, DEF: 196, SpATK: 525, SpDEF: 208, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.68 , Speed: 4300 },
    12: { HP: 6804, ATK: 259, DEF: 218, SpATK: 595, SpDEF: 232, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.61 , Speed: 4300 },
    13: { HP: 7346, ATK: 280, DEF: 243, SpATK: 672, SpDEF: 259, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.63 , Speed: 4300 },
    14: { HP: 7943, ATK: 304, DEF: 270, SpATK: 757, SpDEF: 288, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.76 , Speed: 4300 },
    15: { HP: 8600, ATK: 330, DEF: 300, SpATK: 850, SpDEF: 320, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 20.00 , Speed: 4300 }
  },

  "latios": {
    1: { HP: 3300, ATK: 120, DEF: 60, SpATK: 100, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3403, ATK: 127, DEF: 67, SpATK: 128, SpDEF: 68, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.36 , Speed: 3700 },
    3: { HP: 3517, ATK: 134, DEF: 75, SpATK: 159, SpDEF: 77, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.75 , Speed: 3700 },
    4: { HP: 3642, ATK: 142, DEF: 84, SpATK: 193, SpDEF: 87, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.18 , Speed: 3700 },
    5: { HP: 3779, ATK: 151, DEF: 93, SpATK: 231, SpDEF: 98, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 11.65 , Speed: 3850 },
    6: { HP: 3930, ATK: 161, DEF: 103, SpATK: 273, SpDEF: 110, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.17 , Speed: 3850 },
    7: { HP: 4096, ATK: 172, DEF: 114, SpATK: 319, SpDEF: 123, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.74 , Speed: 4000 },
    8: { HP: 4279, ATK: 184, DEF: 127, SpATK: 370, SpDEF: 138, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.37 , Speed: 4000 },
    9: { HP: 4481, ATK: 197, DEF: 141, SpATK: 426, SpDEF: 154, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 14.07 , Speed: 4150 },
    10: { HP: 4703, ATK: 212, DEF: 156, SpATK: 487, SpDEF: 172, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 14.84 , Speed: 4150 },
    11: { HP: 4948, ATK: 228, DEF: 173, SpATK: 555, SpDEF: 191, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 15.68 , Speed: 4300 },
    12: { HP: 5217, ATK: 246, DEF: 192, SpATK: 629, SpDEF: 212, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 16.61 , Speed: 4300 },
    13: { HP: 5514, ATK: 265, DEF: 212, SpATK: 711, SpDEF: 236, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 17.63 , Speed: 4300 },
    14: { HP: 5841, ATK: 286, DEF: 235, SpATK: 801, SpDEF: 262, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 18.76 , Speed: 4300 },
    15: { HP: 6200, ATK: 310, DEF: 260, SpATK: 900, SpDEF: 291, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 20.00 , Speed: 4300 },
  },

  "leafeon": {
    1: { HP: 3100, ATK: 160, DEF: 40, SpATK: 20, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3170, ATK: 171, DEF: 46, SpATK: 22, SpDEF: 34, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.44 , Speed: 3650 },
    3: { HP: 3250, ATK: 184, DEF: 52, SpATK: 24, SpDEF: 39, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3650 },
    4: { HP: 3658, ATK: 249, DEF: 84, SpATK: 36, SpDEF: 62, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.54 , Speed: 3650 },
    5: { HP: 3764, ATK: 266, DEF: 92, SpATK: 39, SpDEF: 68, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.22 , Speed: 3800 },
    6: { HP: 3886, ATK: 285, DEF: 102, SpATK: 43, SpDEF: 75, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.00 , Speed: 3800 },
    7: { HP: 4027, ATK: 307, DEF: 113, SpATK: 47, SpDEF: 83, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.89 , Speed: 3950 },
    8: { HP: 4189, ATK: 333, DEF: 126, SpATK: 52, SpDEF: 92, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.92 , Speed: 3950 },
    9: { HP: 4375, ATK: 363, DEF: 141, SpATK: 58, SpDEF: 103, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 18.1 , Speed: 4100 },
    10: { HP: 4589, ATK: 397, DEF: 158, SpATK: 65, SpDEF: 115, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 19.46 , Speed: 4100 },
    11: { HP: 4835, ATK: 436, DEF: 178, SpATK: 73, SpDEF: 129, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 21.02 , Speed: 4250 },
    12: { HP: 5118, ATK: 481, DEF: 200, SpATK: 82, SpDEF: 145, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 22.82 , Speed: 4250 },
    13: { HP: 5444, ATK: 533, DEF: 226, SpATK: 92, SpDEF: 164, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 24.89 , Speed: 4250 },
    14: { HP: 5819, ATK: 592, DEF: 256, SpATK: 103, SpDEF: 185, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 27.27 , Speed: 4250 },
    15: { HP: 6250, ATK: 660, DEF: 290, SpATK: 116, SpDEF: 210, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4250 }
  },

  "lucario": {
    1: { HP: 3250, ATK: 160, DEF: 78, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3392, ATK: 170, DEF: 89, SpATK: 23, SpDEF: 69, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.07 , Speed: 3700 },
    3: { HP: 3549, ATK: 180, DEF: 101, SpATK: 27, SpDEF: 78, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.24 , Speed: 3700 },
    4: { HP: 3721, ATK: 192, DEF: 114, SpATK: 31, SpDEF: 88, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.53 , Speed: 3700 },
    5: { HP: 3910, ATK: 205, DEF: 129, SpATK: 35, SpDEF: 99, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 14.95 , Speed: 3850 },
    6: { HP: 4118, ATK: 219, DEF: 145, SpATK: 40, SpDEF: 112, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 16.51 , Speed: 3850 },
    7: { HP: 4347, ATK: 234, DEF: 163, SpATK: 45, SpDEF: 126, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 18.23 , Speed: 4000 },
    8: { HP: 4599, ATK: 251, DEF: 183, SpATK: 51, SpDEF: 141, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 20.12 , Speed: 4000 },
    9: { HP: 4877, ATK: 270, DEF: 205, SpATK: 58, SpDEF: 158, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 22.21 , Speed: 4150 },
    10: { HP: 5184, ATK: 291, DEF: 229, SpATK: 65, SpDEF: 176, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 24.51 , Speed: 4150 },
    11: { HP: 5522, ATK: 314, DEF: 255, SpATK: 73, SpDEF: 196, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 27.04 , Speed: 4300 },
    12: { HP: 5894, ATK: 339, DEF: 284, SpATK: 82, SpDEF: 218, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 29.83 , Speed: 4300 },
    13: { HP: 6303, ATK: 366, DEF: 316, SpATK: 92, SpDEF: 243, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 32.9 , Speed: 4300 },
    14: { HP: 6753, ATK: 396, DEF: 351, SpATK: 103, SpDEF: 270, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 36.28 , Speed: 4300 },
    15: { HP: 7249, ATK: 429, DEF: 390, SpATK: 115, SpDEF: 300, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 40.00 , Speed: 4300 },
  },

  "machamp": {
    1: { HP: 3250, ATK: 165, DEF: 100, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3313, ATK: 170, DEF: 106, SpATK: 21, SpDEF: 74, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3389, ATK: 175, DEF: 113, SpATK: 23, SpDEF: 79, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3480, ATK: 181, DEF: 121, SpATK: 25, SpDEF: 85, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 3809, ATK: 205, DEF: 152, SpATK: 32, SpDEF: 106, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 3940, ATK: 214, DEF: 164, SpATK: 35, SpDEF: 114, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 4097, ATK: 225, DEF: 179, SpATK: 38, SpDEF: 124, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 13.86 , Speed: 4000 },
    8: { HP: 4286, ATK: 239, DEF: 197, SpATK: 42, SpDEF: 136, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 14.72 , Speed: 4000 },
    9: { HP: 4953, ATK: 287, DEF: 259, SpATK: 56, SpDEF: 178, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 5225, ATK: 306, DEF: 284, SpATK: 62, SpDEF: 195, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 5551, ATK: 329, DEF: 314, SpATK: 69, SpDEF: 216, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 5942, ATK: 357, DEF: 350, SpATK: 77, SpDEF: 241, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 6411, ATK: 391, DEF: 394, SpATK: 87, SpDEF: 271, CritRate: 20 , CDR: 0 , HPRegen: 20 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 6974, ATK: 431, DEF: 447, SpATK: 99, SpDEF: 307, CritRate: 20 , CDR: 0 , HPRegen: 20 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 7650, ATK: 479, DEF: 510, SpATK: 114, SpDEF: 350, CritRate: 20 , CDR: 0 , HPRegen: 20 , AtkSPD: 30.00 , Speed: 4300 }
  },

  "mamoswine": {
    1: { HP: 3280, ATK: 170, DEF: 85, SpATK: 20, SpDEF: 65, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3371, ATK: 172, DEF: 91, SpATK: 21, SpDEF: 70, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.29 , Speed: 3600 },
    3: { HP: 3480, ATK: 175, DEF: 98, SpATK: 23, SpDEF: 75, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.63 , Speed: 3600 },
    4: { HP: 3611, ATK: 178, DEF: 107, SpATK: 25, SpDEF: 81, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.04 , Speed: 3600 },
    5: { HP: 4087, ATK: 190, DEF: 139, SpATK: 32, SpDEF: 105, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.54 , Speed: 3750 },
    6: { HP: 4277, ATK: 195, DEF: 152, SpATK: 35, SpDEF: 114, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.14 , Speed: 3750 },
    7: { HP: 4505, ATK: 201, DEF: 167, SpATK: 38, SpDEF: 125, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.86 , Speed: 3900 },
    8: { HP: 4778, ATK: 208, DEF: 185, SpATK: 42, SpDEF: 139, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.72 , Speed: 3900 },
    9: { HP: 5743, ATK: 231, DEF: 249, SpATK: 57, SpDEF: 187, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.75 , Speed: 4050 },
    10: { HP: 6136, ATK: 240, DEF: 275, SpATK: 63, SpDEF: 206, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.98 , Speed: 4050 },
    11: { HP: 6608, ATK: 251, DEF: 307, SpATK: 70, SpDEF: 229, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 20.46 , Speed: 4200 },
    12: { HP: 7174, ATK: 265, DEF: 345, SpATK: 79, SpDEF: 257, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 22.24 , Speed: 4200 },
    13: { HP: 7854, ATK: 281, DEF: 390, SpATK: 89, SpDEF: 291, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 24.37 , Speed: 4200 },
    14: { HP: 8669, ATK: 301, DEF: 445, SpATK: 101, SpDEF: 331, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 26.93 , Speed: 4200 },
    15: { HP: 9648, ATK: 325, DEF: 510, SpATK: 116, SpDEF: 379, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4200 }
  },

  "meowscara": {
    1: { HP: 3100, ATK: 160, DEF: 50, SpATK: 20, SpDEF: 40, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3149, ATK: 167, DEF: 54, SpATK: 21, SpDEF: 43, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.43 , Speed: 3650 },
    3: { HP: 3207, ATK: 175, DEF: 59, SpATK: 23, SpDEF: 46, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3650 },
    4: { HP: 3446, ATK: 208, DEF: 79, SpATK: 30, SpDEF: 59, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.07 , Speed: 3650 },
    5: { HP: 3530, ATK: 220, DEF: 86, SpATK: 32, SpDEF: 64, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 13.81 , Speed: 3800 },
    6: { HP: 3970, ATK: 281, DEF: 124, SpATK: 44, SpDEF: 89, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.7 , Speed: 3800 },
    7: { HP: 4091, ATK: 298, DEF: 134, SpATK: 47, SpDEF: 96, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.77 , Speed: 3950 },
    8: { HP: 4237, ATK: 318, DEF: 146, SpATK: 51, SpDEF: 104, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 20.06 , Speed: 3950 },
    9: { HP: 4412, ATK: 342, DEF: 161, SpATK: 56, SpDEF: 114, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 21.61 , Speed: 4100 },
    10: { HP: 4621, ATK: 371, DEF: 179, SpATK: 62, SpDEF: 126, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 23.46 , Speed: 4100 },
    11: { HP: 4872, ATK: 406, DEF: 201, SpATK: 69, SpDEF: 140, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 25.68 , Speed: 4250 },
    12: { HP: 5174, ATK: 448, DEF: 227, SpATK: 77, SpDEF: 157, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 28.35 , Speed: 4250 },
    13: { HP: 5536, ATK: 498, DEF: 258, SpATK: 87, SpDEF: 177, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 31.55 , Speed: 4250 },
    14: { HP: 5970, ATK: 558, DEF: 295, SpATK: 99, SpDEF: 201, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 35.39 , Speed: 4250 },
    15: { HP: 6490, ATK: 630, DEF: 340, SpATK: 114, SpDEF: 230, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 40.00 , Speed: 4250 },
  },

  "metagross": {
    1: { HP: 3100, ATK: 160, DEF: 85, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3172, ATK: 165, DEF: 92, SpATK: 21, SpDEF: 75, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3259, ATK: 171, DEF: 100, SpATK: 23, SpDEF: 81, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3363, ATK: 179, DEF: 110, SpATK: 25, SpDEF: 88, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 3741, ATK: 207, DEF: 145, SpATK: 32, SpDEF: 113, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 3891, ATK: 218, DEF: 159, SpATK: 35, SpDEF: 123, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 4072, ATK: 231, DEF: 176, SpATK: 38, SpDEF: 135, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 13.86 , Speed: 4000 },
    8: { HP: 4289, ATK: 247, DEF: 196, SpATK: 42, SpDEF: 150, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 14.72 , Speed: 4000 },
    9: { HP: 5054, ATK: 303, DEF: 266, SpATK: 56, SpDEF: 202, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 5366, ATK: 326, DEF: 295, SpATK: 62, SpDEF: 223, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 5740, ATK: 353, DEF: 329, SpATK: 69, SpDEF: 248, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 6189, ATK: 386, DEF: 370, SpATK: 77, SpDEF: 278, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 6728, ATK: 426, DEF: 420, SpATK: 87, SpDEF: 314, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 7374, ATK: 473, DEF: 479, SpATK: 99, SpDEF: 358, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 8150, ATK: 530, DEF: 550, SpATK: 114, SpDEF: 410, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 30.00 , Speed: 4300 }
  },

  "mew": {
    1: { HP: 3300, ATK: 130, DEF: 50, SpATK: 90, SpDEF: 50, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3414, ATK: 136, DEF: 56, SpATK: 119, SpDEF: 55, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.36 , Speed: 3700 },
    3: { HP: 3539, ATK: 143, DEF: 63, SpATK: 151, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.75 , Speed: 3700 },
    4: { HP: 3677, ATK: 150, DEF: 71, SpATK: 186, SpDEF: 66, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.18 , Speed: 3700 },
    5: { HP: 3828, ATK: 158, DEF: 80, SpATK: 224, SpDEF: 72, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 11.65 , Speed: 3850 },
    6: { HP: 3995, ATK: 167, DEF: 89, SpATK: 266, SpDEF: 79, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.17 , Speed: 3850 },
    7: { HP: 4178, ATK: 177, DEF: 99, SpATK: 312, SpDEF: 86, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.74 , Speed: 4000 },
    8: { HP: 4380, ATK: 188, DEF: 110, SpATK: 363, SpDEF: 94, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.37 , Speed: 4000 },
    9: { HP: 4603, ATK: 200, DEF: 123, SpATK: 419, SpDEF: 103, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 14.07 , Speed: 4150 },
    10: { HP: 4849, ATK: 213, DEF: 137, SpATK: 481, SpDEF: 113, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 14.84 , Speed: 4150 },
    11: { HP: 5119, ATK: 227, DEF: 152, SpATK: 550, SpDEF: 124, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 15.68 , Speed: 4300 },
    12: { HP: 5416, ATK: 243, DEF: 169, SpATK: 625, SpDEF: 136, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 16.61 , Speed: 4300 },
    13: { HP: 5743, ATK: 260, DEF: 188, SpATK: 708, SpDEF: 149, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 17.63 , Speed: 4300 },
    14: { HP: 6103, ATK: 279, DEF: 208, SpATK: 799, SpDEF: 164, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 18.76 , Speed: 4300 },
    15: { HP: 6500, ATK: 300, DEF: 230, SpATK: 900, SpDEF: 180, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 20.00 , Speed: 4300 }
  },

  "mewtwox": {
    1: { HP: 3500, ATK: 170, DEF: 90, SpATK: 20, SpDEF: 90, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3653, ATK: 182, DEF: 102, SpATK: 23, SpDEF: 99, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 11.07 , Speed: 3700 },
    3: { HP: 3821, ATK: 195, DEF: 115, SpATK: 27, SpDEF: 109, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 12.24 , Speed: 3700 },
    4: { HP: 4006, ATK: 209, DEF: 130, SpATK: 31, SpDEF: 120, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 13.53 , Speed: 3700 },
    5: { HP: 4209, ATK: 225, DEF: 146, SpATK: 35, SpDEF: 132, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 14.95 , Speed: 3850 },
    6: { HP: 4433, ATK: 242, DEF: 164, SpATK: 40, SpDEF: 145, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 16.51 , Speed: 3850 },
    7: { HP: 4679, ATK: 261, DEF: 183, SpATK: 45, SpDEF: 159, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 18.23 , Speed: 4000 },
    8: { HP: 4950, ATK: 282, DEF: 204, SpATK: 51, SpDEF: 175, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 20.12 , Speed: 4000 },
    9: { HP: 5249, ATK: 305, DEF: 228, SpATK: 58, SpDEF: 192, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 22.21 , Speed: 4150 },
    10: { HP: 5579, ATK: 330, DEF: 254, SpATK: 65, SpDEF: 211, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 24.51 , Speed: 4150 },
    11: { HP: 5942, ATK: 358, DEF: 283, SpATK: 73, SpDEF: 232, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 27.04 , Speed: 4300 },
    12: { HP: 6342, ATK: 388, DEF: 315, SpATK: 82, SpDEF: 255, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 29.83 , Speed: 4300 },
    13: { HP: 6782, ATK: 422, DEF: 350, SpATK: 92, SpDEF: 281, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 32.9 , Speed: 4300 },
    14: { HP: 7267, ATK: 459, DEF: 388, SpATK: 103, SpDEF: 309, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 36.28 , Speed: 4300 },
    15: { HP: 7800, ATK: 500, DEF: 430, SpATK: 115, SpDEF: 340, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 40.00 , Speed: 4300 }
  },

    "mewtwoy": {
    1: { HP: 3400, ATK: 20, DEF: 50, SpATK: 150, SpDEF: 50, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3510, ATK: 23, DEF: 55, SpATK: 172, SpDEF: 55, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.42 , Speed: 3650 },
    3: { HP: 3631, ATK: 27, DEF: 61, SpATK: 197, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.99 , Speed: 3650 },
    4: { HP: 3764, ATK: 31, DEF: 67, SpATK: 224, SpDEF: 66, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 14.71 , Speed: 3650 },
    5: { HP: 3910, ATK: 36, DEF: 74, SpATK: 254, SpDEF: 72, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.6 , Speed: 3800 },
    6: { HP: 4072, ATK: 41, DEF: 82, SpATK: 287, SpDEF: 79, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 18.68 , Speed: 3800 },
    7: { HP: 4250, ATK: 46, DEF: 91, SpATK: 323, SpDEF: 86, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 20.97 , Speed: 3950 },
    8: { HP: 4446, ATK: 52, DEF: 100, SpATK: 363, SpDEF: 94, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 23.49 , Speed: 3950 },
    9: { HP: 4662, ATK: 59, DEF: 110, SpATK: 407, SpDEF: 103, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 26.27 , Speed: 4100 },
    10: { HP: 4900, ATK: 66, DEF: 122, SpATK: 455, SpDEF: 113, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 29.34 , Speed: 4100 },
    11: { HP: 5162, ATK: 74, DEF: 135, SpATK: 508, SpDEF: 124, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 32.72 , Speed: 4250 },
    12: { HP: 5450, ATK: 83, DEF: 149, SpATK: 567, SpDEF: 136, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 36.44 , Speed: 4250 },
    13: { HP: 5767, ATK: 93, DEF: 164, SpATK: 631, SpDEF: 149, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 40.53 , Speed: 4250 },
    14: { HP: 6116, ATK: 104, DEF: 181, SpATK: 702, SpDEF: 164, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 45.03 , Speed: 4250 },
    15: { HP: 6500, ATK: 116, DEF: 200, SpATK: 780, SpDEF: 180, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 49.99 , Speed: 4250 },
  },

    "mimikyu": {
    1: { HP: 3150, ATK: 155, DEF: 80, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3301, ATK: 164, DEF: 91, SpATK: 23, SpDEF: 80, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.71 , Speed: 3700 },
    3: { HP: 3467, ATK: 174, DEF: 104, SpATK: 27, SpDEF: 91, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.49 , Speed: 3700 },
    4: { HP: 3650, ATK: 185, DEF: 118, SpATK: 31, SpDEF: 103, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.35 , Speed: 3700 },
    5: { HP: 3851, ATK: 198, DEF: 133, SpATK: 35, SpDEF: 117, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 13.3 , Speed: 3850 },
    6: { HP: 4072, ATK: 212, DEF: 150, SpATK: 40, SpDEF: 132, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 14.34 , Speed: 3850 },
    7: { HP: 4315, ATK: 227, DEF: 168, SpATK: 45, SpDEF: 149, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.49 , Speed: 4000 },
    8: { HP: 4583, ATK: 244, DEF: 188, SpATK: 51, SpDEF: 167, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 16.75 , Speed: 4000 },
    9: { HP: 4879, ATK: 263, DEF: 210, SpATK: 58, SpDEF: 187, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 18.14 , Speed: 4150 },
    10: { HP: 5205, ATK: 283, DEF: 234, SpATK: 65, SpDEF: 209, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 19.67 , Speed: 4150 },
    11: { HP: 5564, ATK: 305, DEF: 261, SpATK: 73, SpDEF: 234, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 21.36 , Speed: 4300 },
    12: { HP: 5959, ATK: 330, DEF: 291, SpATK: 82, SpDEF: 261, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 23.22 , Speed: 4300 },
    13: { HP: 6394, ATK: 357, DEF: 324, SpATK: 92, SpDEF: 291, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 25.27 , Speed: 4300 },
    14: { HP: 6873, ATK: 387, DEF: 360, SpATK: 103, SpDEF: 324, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 27.52 , Speed: 4300 },
    15: { HP: 7400, ATK: 420, DEF: 400, SpATK: 115, SpDEF: 360, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "miraidon": {
    1: { HP: 3300, ATK: 140, DEF: 70, SpATK: 100, SpDEF: 80, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3442, ATK: 147, DEF: 79, SpATK: 132, SpDEF: 87, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.36 , Speed: 3650 },
    3: { HP: 3599, ATK: 154, DEF: 89, SpATK: 167, SpDEF: 95, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.75 , Speed: 3650 },
    4: { HP: 3771, ATK: 162, DEF: 100, SpATK: 206, SpDEF: 104, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 11.18 , Speed: 3650 },
    5: { HP: 3960, ATK: 171, DEF: 112, SpATK: 248, SpDEF: 113, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 11.65 , Speed: 3800 },
    6: { HP: 4168, ATK: 181, DEF: 125, SpATK: 295, SpDEF: 123, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.17 , Speed: 3800 },
    7: { HP: 4397, ATK: 192, DEF: 139, SpATK: 347, SpDEF: 134, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.74 , Speed: 3950 },
    8: { HP: 4649, ATK: 204, DEF: 155, SpATK: 404, SpDEF: 147, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.37 , Speed: 3950 },
    9: { HP: 4927, ATK: 217, DEF: 172, SpATK: 467, SpDEF: 161, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.07 , Speed: 4100 },
    10: { HP: 5234, ATK: 232, DEF: 191, SpATK: 536, SpDEF: 176, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.84 , Speed: 4100 },
    11: { HP: 5572, ATK: 248, DEF: 212, SpATK: 612, SpDEF: 193, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.68 , Speed: 4250 },
    12: { HP: 5944, ATK: 266, DEF: 235, SpATK: 696, SpDEF: 212, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.61 , Speed: 4250 },
    13: { HP: 6353, ATK: 285, DEF: 261, SpATK: 788, SpDEF: 232, CritRate: 0 , CDR: 20 , HPRegen: 0 , AtkSPD: 17.63 , Speed: 4250 },
    14: { HP: 6804, ATK: 306, DEF: 289, SpATK: 889, SpDEF: 255, CritRate: 0 , CDR: 20 , HPRegen: 0 , AtkSPD: 18.76 , Speed: 4250 },
    15: { HP: 7300, ATK: 330, DEF: 320, SpATK: 1000, SpDEF: 280, CritRate: 0 , CDR: 20 , HPRegen: 0 , AtkSPD: 20.00 , Speed: 4250 },
  },

    "mrmime": {
    1: { HP: 3150, ATK: 150, DEF: 70, SpATK: 50, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3351, ATK: 155, DEF: 82, SpATK: 64, SpDEF: 71, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.71 , Speed: 3800 },
    3: { HP: 3572, ATK: 161, DEF: 96, SpATK: 80, SpDEF: 83, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.49 , Speed: 3800 },
    4: { HP: 3815, ATK: 167, DEF: 111, SpATK: 97, SpDEF: 96, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.35 , Speed: 3800 },
    5: { HP: 4082, ATK: 174, DEF: 128, SpATK: 116, SpDEF: 110, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.29 , Speed: 3950 },
    6: { HP: 4376, ATK: 181, DEF: 146, SpATK: 137, SpDEF: 126, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.33 , Speed: 3950 },
    7: { HP: 4700, ATK: 189, DEF: 166, SpATK: 160, SpDEF: 143, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.48 , Speed: 4100 },
    8: { HP: 5057, ATK: 198, DEF: 188, SpATK: 185, SpDEF: 162, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.74 , Speed: 4100 },
    9: { HP: 5450, ATK: 208, DEF: 212, SpATK: 213, SpDEF: 183, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.13 , Speed: 4250 },
    10: { HP: 5883, ATK: 219, DEF: 239, SpATK: 244, SpDEF: 206, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 19.66 , Speed: 4250 },
    11: { HP: 6360, ATK: 231, DEF: 269, SpATK: 278, SpDEF: 231, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 21.35 , Speed: 4400 },
    12: { HP: 6885, ATK: 244, DEF: 302, SpATK: 315, SpDEF: 259, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 23.21 , Speed: 4400 },
    13: { HP: 7463, ATK: 259, DEF: 338, SpATK: 356, SpDEF: 290, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 25.26 , Speed: 4400 },
    14: { HP: 8099, ATK: 275, DEF: 377, SpATK: 401, SpDEF: 324, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 27.51 , Speed: 4400 },
    15: { HP: 8800, ATK: 293, DEF: 420, SpATK: 450, SpDEF: 361, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 29.99 , Speed: 4400 },
  },

    "ninetales": {
    1: { HP: 3197, ATK: 134, DEF: 35, SpATK: 51, SpDEF: 27, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3266, ATK: 137, DEF: 39, SpATK: 72, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.44 , Speed: 3700 },
    3: { HP: 3345, ATK: 141, DEF: 44, SpATK: 96, SpDEF: 34, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3700 },
    4: { HP: 3747, ATK: 161, DEF: 69, SpATK: 219, SpDEF: 53, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.54 , Speed: 3700 },
    5: { HP: 3852, ATK: 166, DEF: 75, SpATK: 251, SpDEF: 58, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.22 , Speed: 3850 },
    6: { HP: 3972, ATK: 172, DEF: 82, SpATK: 288, SpDEF: 64, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.00 , Speed: 3850 },
    7: { HP: 4110, ATK: 179, DEF: 90, SpATK: 330, SpDEF: 71, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.89 , Speed: 4000 },
    8: { HP: 4269, ATK: 187, DEF: 100, SpATK: 379, SpDEF: 79, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.92 , Speed: 4000 },
    9: { HP: 4452, ATK: 196, DEF: 111, SpATK: 435, SpDEF: 88, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 18.1 , Speed: 4150 },
    10: { HP: 4663, ATK: 207, DEF: 124, SpATK: 500, SpDEF: 98, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 19.46 , Speed: 4150 },
    11: { HP: 4906, ATK: 219, DEF: 139, SpATK: 574, SpDEF: 110, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 21.02 , Speed: 4300 },
    12: { HP: 5185, ATK: 233, DEF: 156, SpATK: 660, SpDEF: 123, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 22.82 , Speed: 4300 },
    13: { HP: 5506, ATK: 249, DEF: 176, SpATK: 759, SpDEF: 138, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 24.89 , Speed: 4300 },
    14: { HP: 5875, ATK: 268, DEF: 199, SpATK: 872, SpDEF: 155, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 27.27 , Speed: 4300 },
    15: { HP: 6299, ATK: 289, DEF: 225, SpATK: 1002, SpDEF: 175, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "pikachu": {
    1: { HP: 3292, ATK: 134, DEF: 35, SpATK: 50, SpDEF: 27, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3399, ATK: 140, DEF: 42, SpATK: 82, SpDEF: 33, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    3: { HP: 3517, ATK: 146, DEF: 50, SpATK: 117, SpDEF: 40, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    4: { HP: 3646, ATK: 153, DEF: 59, SpATK: 156, SpDEF: 47, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    5: { HP: 3788, ATK: 160, DEF: 69, SpATK: 199, SpDEF: 55, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3850 },
    6: { HP: 3945, ATK: 168, DEF: 80, SpATK: 246, SpDEF: 64, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3850 },
    7: { HP: 4117, ATK: 177, DEF: 92, SpATK: 298, SpDEF: 74, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4000 },
    8: { HP: 4307, ATK: 187, DEF: 105, SpATK: 355, SpDEF: 85, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4000 },
    9: { HP: 4516, ATK: 198, DEF: 119, SpATK: 418, SpDEF: 97, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4150 },
    10: { HP: 4747, ATK: 210, DEF: 135, SpATK: 487, SpDEF: 110, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4150 },
    11: { HP: 5001, ATK: 223, DEF: 152, SpATK: 563, SpDEF: 125, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
    12: { HP: 5280, ATK: 237, DEF: 171, SpATK: 647, SpDEF: 141, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
    13: { HP: 5588, ATK: 253, DEF: 192, SpATK: 740, SpDEF: 159, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
    14: { HP: 5927, ATK: 271, DEF: 215, SpATK: 842, SpDEF: 179, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
    15: { HP: 6300, ATK: 290, DEF: 240, SpATK: 954, SpDEF: 200, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 4300 },
  },

    "psyduck": {
    1: { HP: 3300, ATK: 130, DEF: 80, SpATK: 50, SpDEF: 70, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3503, ATK: 137, DEF: 90, SpATK: 71, SpDEF: 79, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.36 , Speed: 3700 },
    3: { HP: 3726, ATK: 144, DEF: 101, SpATK: 95, SpDEF: 88, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.75 , Speed: 3700 },
    4: { HP: 3971, ATK: 152, DEF: 113, SpATK: 121, SpDEF: 98, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.18 , Speed: 3700 },
    5: { HP: 4240, ATK: 161, DEF: 127, SpATK: 149, SpDEF: 109, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 11.65 , Speed: 3850 },
    6: { HP: 4537, ATK: 171, DEF: 142, SpATK: 180, SpDEF: 122, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.17 , Speed: 3850 },
    7: { HP: 4864, ATK: 182, DEF: 159, SpATK: 214, SpDEF: 136, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.74 , Speed: 4000 },
    8: { HP: 5224, ATK: 194, DEF: 177, SpATK: 252, SpDEF: 151, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.37 , Speed: 4000 },
    9: { HP: 5621, ATK: 207, DEF: 197, SpATK: 294, SpDEF: 168, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.07 , Speed: 4150 },
    10: { HP: 6058, ATK: 222, DEF: 219, SpATK: 340, SpDEF: 186, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.84 , Speed: 4150 },
    11: { HP: 6539, ATK: 238, DEF: 244, SpATK: 391, SpDEF: 206, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.68 , Speed: 4300 },
    12: { HP: 7068, ATK: 256, DEF: 271, SpATK: 447, SpDEF: 228, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.61 , Speed: 4300 },
    13: { HP: 7651, ATK: 275, DEF: 301, SpATK: 508, SpDEF: 253, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.63 , Speed: 4300 },
    14: { HP: 8293, ATK: 296, DEF: 334, SpATK: 576, SpDEF: 280, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.76 , Speed: 4300 },
    15: { HP: 9000, ATK: 320, DEF: 370, SpATK: 650, SpDEF: 310, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 20.00 , Speed: 4300 }
  },

    "raichu": {
    1: { HP: 3400, ATK: 20, DEF: 50, SpATK: 150, SpDEF: 40, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3600 },
    2: { HP: 3500, ATK: 23, DEF: 57, SpATK: 171, SpDEF: 46, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.42 , Speed: 3600 },
    3: { HP: 3610, ATK: 27, DEF: 65, SpATK: 194, SpDEF: 53, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.99 , Speed: 3600 },
    4: { HP: 3731, ATK: 31, DEF: 74, SpATK: 220, SpDEF: 61, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 14.71 , Speed: 3600 },
    5: { HP: 3863, ATK: 36, DEF: 83, SpATK: 248, SpDEF: 70, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.6 , Speed: 3750 },
    6: { HP: 4009, ATK: 41, DEF: 93, SpATK: 279, SpDEF: 79, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 18.68 , Speed: 3750 },
    7: { HP: 4169, ATK: 46, DEF: 104, SpATK: 313, SpDEF: 89, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 20.97 , Speed: 3900 },
    8: { HP: 4346, ATK: 52, DEF: 117, SpATK: 351, SpDEF: 100, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 23.49 , Speed: 3900 },
    9: { HP: 4541, ATK: 59, DEF: 131, SpATK: 393, SpDEF: 113, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 26.27 , Speed: 4050 },
    10: { HP: 4756, ATK: 66, DEF: 146, SpATK: 439, SpDEF: 127, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 29.34 , Speed: 4050 },
    11: { HP: 4993, ATK: 74, DEF: 163, SpATK: 490, SpDEF: 142, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 32.72 , Speed: 4200 },
    12: { HP: 5253, ATK: 83, DEF: 182, SpATK: 546, SpDEF: 159, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 36.44 , Speed: 4200 },
    13: { HP: 5539, ATK: 93, DEF: 202, SpATK: 607, SpDEF: 177, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 40.53 , Speed: 4200 },
    14: { HP: 6200, ATK: 104, DEF: 225, SpATK: 675, SpDEF: 197, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 45.04 , Speed: 4200 },
    15: { HP: 6854, ATK: 116, DEF: 250, SpATK: 750, SpDEF: 220, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 50.00 , Speed: 4200 }
  },

    "rapidash": {
    1: { HP: 3300, ATK: 130, DEF: 60, SpATK: 90, SpDEF: 70, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3364, ATK: 133, DEF: 64, SpATK: 99, SpDEF: 74, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.43 , Speed: 3800 },
    3: { HP: 3441, ATK: 136, DEF: 69, SpATK: 110, SpDEF: 79, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3800 },
    4: { HP: 3534, ATK: 140, DEF: 75, SpATK: 123, SpDEF: 85, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.57 , Speed: 3800 },
    5: { HP: 4321, ATK: 173, DEF: 122, SpATK: 233, SpDEF: 136, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.82 , Speed: 3950 },
    6: { HP: 4455, ATK: 179, DEF: 130, SpATK: 252, SpDEF: 145, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 17.71 , Speed: 3950 },
    7: { HP: 4616, ATK: 186, DEF: 140, SpATK: 274, SpDEF: 155, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 18.78 , Speed: 4100 },
    8: { HP: 4809, ATK: 194, DEF: 151, SpATK: 301, SpDEF: 167, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 20.07 , Speed: 4100 },
    9: { HP: 5041, ATK: 204, DEF: 165, SpATK: 333, SpDEF: 182, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 21.62 , Speed: 4250 },
    10: { HP: 5319, ATK: 216, DEF: 182, SpATK: 372, SpDEF: 200, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 23.47 , Speed: 4250 },
    11: { HP: 5653, ATK: 230, DEF: 202, SpATK: 419, SpDEF: 222, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 25.69 , Speed: 4400 },
    12: { HP: 6053, ATK: 247, DEF: 226, SpATK: 475, SpDEF: 248, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 28.36 , Speed: 4400 },
    13: { HP: 6533, ATK: 267, DEF: 255, SpATK: 542, SpDEF: 279, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 31.56 , Speed: 4400 },
    14: { HP: 7109, ATK: 291, DEF: 289, SpATK: 623, SpDEF: 316, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 35.4 , Speed: 4400 },
    15: { HP: 7800, ATK: 320, DEF: 330, SpATK: 720, SpDEF: 361, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 40.01 , Speed: 4400 },
  },

    "sableye": {
    1: { HP: 3000, ATK: 110, DEF: 40, SpATK: 20, SpDEF: 30, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3139, ATK: 117, DEF: 46, SpATK: 24, SpDEF: 34, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.36 , Speed: 3700 },
    3: { HP: 3292, ATK: 124, DEF: 52, SpATK: 28, SpDEF: 39, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.75 , Speed: 3700 },
    4: { HP: 3460, ATK: 132, DEF: 59, SpATK: 32, SpDEF: 44, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.18 , Speed: 3700 },
    5: { HP: 3644, ATK: 141, DEF: 67, SpATK: 37, SpDEF: 50, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 11.65 , Speed: 3850 },
    6: { HP: 3847, ATK: 151, DEF: 75, SpATK: 42, SpDEF: 56, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.17 , Speed: 3850 },
    7: { HP: 4070, ATK: 162, DEF: 84, SpATK: 48, SpDEF: 63, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.74 , Speed: 4000 },
    8: { HP: 4316, ATK: 174, DEF: 94, SpATK: 54, SpDEF: 71, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.37 , Speed: 4000 },
    9: { HP: 4587, ATK: 187, DEF: 105, SpATK: 61, SpDEF: 79, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.07 , Speed: 4150 },
    10: { HP: 4886, ATK: 202, DEF: 117, SpATK: 69, SpDEF: 88, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.84 , Speed: 4150 },
    11: { HP: 5216, ATK: 218, DEF: 131, SpATK: 78, SpDEF: 98, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.68 , Speed: 4300 },
    12: { HP: 5578, ATK: 236, DEF: 146, SpATK: 87, SpDEF: 109, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.61 , Speed: 4300 },
    13: { HP: 5977, ATK: 255, DEF: 162, SpATK: 97, SpDEF: 121, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.63 , Speed: 4300 },
    14: { HP: 6416, ATK: 276, DEF: 180, SpATK: 108, SpDEF: 135, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.76 , Speed: 4300 },
    15: { HP: 6900, ATK: 300, DEF: 200, SpATK: 120, SpDEF: 150, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 20.00 , Speed: 4300 },
  },

    "scizor": {
    1: { HP: 3100, ATK: 160, DEF: 45, SpATK: 20, SpDEF: 40, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3174, ATK: 170, DEF: 51, SpATK: 22, SpDEF: 44, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.44 , Speed: 3650 },
    3: { HP: 3259, ATK: 182, DEF: 58, SpATK: 24, SpDEF: 48, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3650 },
    4: { HP: 3357, ATK: 196, DEF: 66, SpATK: 27, SpDEF: 53, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.54 , Speed: 3650 },
    5: { HP: 4154, ATK: 224, DEF: 143, SpATK: 40, SpDEF: 118, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 14.22 , Speed: 3800 },
    6: { HP: 4348, ATK: 236, DEF: 161, SpATK: 44, SpDEF: 132, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.00 , Speed: 3800 },
    7: { HP: 4571, ATK: 249, DEF: 182, SpATK: 48, SpDEF: 149, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.89 , Speed: 3950 },
    8: { HP: 4828, ATK: 264, DEF: 206, SpATK: 53, SpDEF: 168, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 16.92 , Speed: 3950 },
    9: { HP: 5123, ATK: 282, DEF: 233, SpATK: 59, SpDEF: 190, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 18.1 , Speed: 4100 },
    10: { HP: 5463, ATK: 302, DEF: 265, SpATK: 65, SpDEF: 215, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 19.46 , Speed: 4100 },
    11: { HP: 5854, ATK: 325, DEF: 301, SpATK: 72, SpDEF: 244, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 21.02 , Speed: 4250 },
    12: { HP: 6304, ATK: 352, DEF: 343, SpATK: 81, SpDEF: 277, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 22.82 , Speed: 4250 },
    13: { HP: 6821, ATK: 383, DEF: 391, SpATK: 91, SpDEF: 315, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 24.89 , Speed: 4250 },
    14: { HP: 7416, ATK: 419, DEF: 446, SpATK: 102, SpDEF: 359, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 27.27 , Speed: 4250 },
    15: { HP: 8100, ATK: 460, DEF: 510, SpATK: 115, SpDEF: 410, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 30.00 , Speed: 4250 },
  },

    "slowbro": {
    1: { HP: 3225, ATK: 150, DEF: 70, SpATK: 50, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3361, ATK: 153, DEF: 79, SpATK: 58, SpDEF: 68, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.44 , Speed: 3700 },
    3: { HP: 3517, ATK: 157, DEF: 89, SpATK: 67, SpDEF: 77, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3700 },
    4: { HP: 4309, ATK: 175, DEF: 142, SpATK: 114, SpDEF: 124, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.54 , Speed: 3700 },
    5: { HP: 4516, ATK: 180, DEF: 156, SpATK: 126, SpDEF: 136, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 14.22 , Speed: 3850 },
    6: { HP: 4754, ATK: 186, DEF: 172, SpATK: 140, SpDEF: 150, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 15.00 , Speed: 3850 },
    7: { HP: 5027, ATK: 192, DEF: 190, SpATK: 156, SpDEF: 166, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 15.89 , Speed: 4000 },
    8: { HP: 5342, ATK: 199, DEF: 211, SpATK: 175, SpDEF: 185, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 16.92 , Speed: 4000 },
    9: { HP: 5704, ATK: 207, DEF: 235, SpATK: 196, SpDEF: 206, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 18.1 , Speed: 4150 },
    10: { HP: 6120, ATK: 217, DEF: 263, SpATK: 221, SpDEF: 231, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 19.46 , Speed: 4150 },
    11: { HP: 6599, ATK: 228, DEF: 295, SpATK: 249, SpDEF: 259, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 21.02 , Speed: 4300 },
    12: { HP: 7150, ATK: 241, DEF: 332, SpATK: 282, SpDEF: 291, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 22.82 , Speed: 4300 },
    13: { HP: 7784, ATK: 256, DEF: 375, SpATK: 319, SpDEF: 328, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 24.89 , Speed: 4300 },
    14: { HP: 8513, ATK: 273, DEF: 424, SpATK: 362, SpDEF: 371, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 27.27 , Speed: 4300 },
    15: { HP: 9350, ATK: 292, DEF: 480, SpATK: 411, SpDEF: 420, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "snorlax": {
    1: { HP: 3300, ATK: 175, DEF: 97, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3553, ATK: 181, DEF: 116, SpATK: 23, SpDEF: 85, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.07 , Speed: 3650 },
    3: { HP: 3831, ATK: 188, DEF: 137, SpATK: 27, SpDEF: 101, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.24 , Speed: 3650 },
    4: { HP: 4137, ATK: 195, DEF: 160, SpATK: 31, SpDEF: 119, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.53 , Speed: 3650 },
    5: { HP: 4472, ATK: 203, DEF: 186, SpATK: 36, SpDEF: 139, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 14.95 , Speed: 3800 },
    6: { HP: 4842, ATK: 212, DEF: 214, SpATK: 41, SpDEF: 161, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.51 , Speed: 3800 },
    7: { HP: 5249, ATK: 222, DEF: 245, SpATK: 46, SpDEF: 185, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 18.23 , Speed: 3950 },
    8: { HP: 5697, ATK: 233, DEF: 279, SpATK: 52, SpDEF: 212, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 20.12 , Speed: 3950 },
    9: { HP: 6191, ATK: 245, DEF: 317, SpATK: 59, SpDEF: 241, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 22.21 , Speed: 4100 },
    10: { HP: 6735, ATK: 258, DEF: 359, SpATK: 66, SpDEF: 273, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 24.51 , Speed: 4100 },
    11: { HP: 7335, ATK: 272, DEF: 405, SpATK: 74, SpDEF: 309, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 27.04 , Speed: 4250 },
    12: { HP: 7994, ATK: 288, DEF: 456, SpATK: 83, SpDEF: 348, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 29.83 , Speed: 4250 },
    13: { HP: 8720, ATK: 305, DEF: 512, SpATK: 93, SpDEF: 391, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 32.9 , Speed: 4250 },
    14: { HP: 9520, ATK: 324, DEF: 573, SpATK: 104, SpDEF: 438, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 36.28 , Speed: 4250 },
    15: { HP: 10400, ATK: 345, DEF: 640, SpATK: 116, SpDEF: 490, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 40.00 , Speed: 4250 }
  },

    "suicune": {
    1: { HP: 3250, ATK: 134, DEF: 70, SpATK: 80, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3398, ATK: 140, DEF: 80, SpATK: 105, SpDEF: 68, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.71 , Speed: 3700 },
    3: { HP: 3561, ATK: 146, DEF: 91, SpATK: 132, SpDEF: 76, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.49 , Speed: 3700 },
    4: { HP: 3740, ATK: 153, DEF: 103, SpATK: 162, SpDEF: 85, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.35 , Speed: 3700 },
    5: { HP: 3936, ATK: 160, DEF: 116, SpATK: 195, SpDEF: 95, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.3 , Speed: 3850 },
    6: { HP: 4152, ATK: 168, DEF: 130, SpATK: 231, SpDEF: 106, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.34 , Speed: 3850 },
    7: { HP: 4390, ATK: 177, DEF: 145, SpATK: 271, SpDEF: 118, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.49 , Speed: 4000 },
    8: { HP: 4652, ATK: 187, DEF: 162, SpATK: 315, SpDEF: 132, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.75 , Speed: 4000 },
    9: { HP: 4941, ATK: 198, DEF: 181, SpATK: 364, SpDEF: 147, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.14 , Speed: 4150 },
    10: { HP: 5259, ATK: 210, DEF: 202, SpATK: 418, SpDEF: 164, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 19.67 , Speed: 4150 },
    11: { HP: 5610, ATK: 223, DEF: 225, SpATK: 477, SpDEF: 182, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 21.36 , Speed: 4300 },
    12: { HP: 5995, ATK: 237, DEF: 250, SpATK: 542, SpDEF: 202, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 23.22 , Speed: 4300 },
    13: { HP: 6419, ATK: 253, DEF: 277, SpATK: 614, SpDEF: 224, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 25.27 , Speed: 4300 },
    14: { HP: 6886, ATK: 271, DEF: 307, SpATK: 693, SpDEF: 248, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 27.52 , Speed: 4300 },
    15: { HP: 7400, ATK: 290, DEF: 340, SpATK: 780, SpDEF: 275, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "sylveon": {
    1: { HP: 3406, ATK: 167, DEF: 52, SpATK: 70, SpDEF: 38, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3494, ATK: 171, DEF: 57, SpATK: 84, SpDEF: 42, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.67 , Speed: 3700 },
    3: { HP: 3595, ATK: 176, DEF: 62, SpATK: 101, SpDEF: 47, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.43 , Speed: 3700 },
    4: { HP: 4105, ATK: 201, DEF: 89, SpATK: 185, SpDEF: 73, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 15.31 , Speed: 3700 },
    5: { HP: 4238, ATK: 208, DEF: 96, SpATK: 207, SpDEF: 80, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.32 , Speed: 3850 },
    6: { HP: 4391, ATK: 216, DEF: 104, SpATK: 232, SpDEF: 88, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 17.48 , Speed: 3850 },
    7: { HP: 4567, ATK: 225, DEF: 113, SpATK: 261, SpDEF: 97, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 18.82 , Speed: 4000 },
    8: { HP: 4770, ATK: 235, DEF: 124, SpATK: 294, SpDEF: 107, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 20.36 , Speed: 4000 },
    9: { HP: 5003, ATK: 247, DEF: 136, SpATK: 332, SpDEF: 119, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 22.13 , Speed: 4150 },
    10: { HP: 5271, ATK: 260, DEF: 150, SpATK: 376, SpDEF: 133, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 24.17 , Speed: 4150 },
    11: { HP: 5579, ATK: 275, DEF: 166, SpATK: 427, SpDEF: 149, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 26.52 , Speed: 4300 },
    12: { HP: 5934, ATK: 293, DEF: 185, SpATK: 486, SpDEF: 167, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 29.22 , Speed: 4300 },
    13: { HP: 6342, ATK: 313, DEF: 207, SpATK: 553, SpDEF: 188, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 32.32 , Speed: 4300 },
    14: { HP: 6811, ATK: 336, DEF: 232, SpATK: 631, SpDEF: 212, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 35.89 , Speed: 4300 },
    15: { HP: 7350, ATK: 363, DEF: 260, SpATK: 720, SpDEF: 240, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 39.99 , Speed: 4300 },
  },

    "talonflame": {
    1: { HP: 3024, ATK: 200, DEF: 58, SpATK: 20, SpDEF: 40, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3072, ATK: 207, DEF: 62, SpATK: 21, SpDEF: 43, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.43 , Speed: 3650 },
    3: { HP: 3130, ATK: 216, DEF: 66, SpATK: 23, SpDEF: 46, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.94 , Speed: 3650 },
    4: { HP: 3200, ATK: 227, DEF: 71, SpATK: 25, SpDEF: 50, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.56 , Speed: 3650 },
    5: { HP: 3453, ATK: 265, DEF: 91, SpATK: 32, SpDEF: 63, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 13.8 , Speed: 3800 },
    6: { HP: 3554, ATK: 280, DEF: 99, SpATK: 35, SpDEF: 68, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.69 , Speed: 3800 },
    7: { HP: 4012, ATK: 349, DEF: 135, SpATK: 48, SpDEF: 92, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.76 , Speed: 3950 },
    8: { HP: 4157, ATK: 371, DEF: 146, SpATK: 52, SpDEF: 100, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 20.05 , Speed: 3950 },
    9: { HP: 4331, ATK: 397, DEF: 159, SpATK: 57, SpDEF: 109, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 21.59 , Speed: 4100 },
    10: { HP: 4539, ATK: 428, DEF: 175, SpATK: 63, SpDEF: 120, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 23.44 , Speed: 4100 },
    11: { HP: 4789, ATK: 466, DEF: 194, SpATK: 70, SpDEF: 133, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 25.66 , Speed: 4250 },
    12: { HP: 5089, ATK: 511, DEF: 217, SpATK: 79, SpDEF: 149, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 28.33 , Speed: 4250 },
    13: { HP: 5499, ATK: 565, DEF: 245, SpATK: 89, SpDEF: 168, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 31.53 , Speed: 4250 },
    14: { HP: 5881, ATK: 630, DEF: 279, SpATK: 102, SpDEF: 190, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 35.37 , Speed: 4250 },
    15: { HP: 6400, ATK: 710, DEF: 320, SpATK: 117, SpDEF: 215, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 39.98 , Speed: 4250 }
  },

    "tinkaton": {
    1: { HP: 3250, ATK: 100, DEF: 60, SpATK: 20, SpDEF: 80, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3324, ATK: 105, DEF: 64, SpATK: 21, SpDEF: 85, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.29 , Speed: 3700 },
    3: { HP: 3412, ATK: 111, DEF: 69, SpATK: 23, SpDEF: 91, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.63 , Speed: 3700 },
    4: { HP: 3518, ATK: 118, DEF: 75, SpATK: 25, SpDEF: 98, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.04 , Speed: 3700 },
    5: { HP: 3903, ATK: 145, DEF: 95, SpATK: 32, SpDEF: 124, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 12.54 , Speed: 3850 },
    6: { HP: 4057, ATK: 156, DEF: 103, SpATK: 35, SpDEF: 134, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 13.14 , Speed: 3850 },
    7: { HP: 4756, ATK: 205, DEF: 139, SpATK: 48, SpDEF: 182, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.86 , Speed: 4000 },
    8: { HP: 4997, ATK: 220, DEF: 151, SpATK: 52, SpDEF: 197, CritRate: 0 , CDR: 0 , HPRegen: 5 , AtkSPD: 16.72 , Speed: 4000 },
    9: { HP: 5242, ATK: 239, DEF: 165, SpATK: 57, SpDEF: 215, CritRate: 0 , CDR: 0 , HPRegen: 10 , AtkSPD: 17.75 , Speed: 4150 },
    10: { HP: 5560, ATK: 261, DEF: 182, SpATK: 63, SpDEF: 237, CritRate: 0 , CDR: 0 , HPRegen: 10 , AtkSPD: 18.98 , Speed: 4150 },
    11: { HP: 5942, ATK: 288, DEF: 202, SpATK: 70, SpDEF: 263, CritRate: 0 , CDR: 0 , HPRegen: 10 , AtkSPD: 20.46 , Speed: 4300 },
    12: { HP: 6400, ATK: 320, DEF: 226, SpATK: 78, SpDEF: 294, CritRate: 0 , CDR: 0 , HPRegen: 10 , AtkSPD: 22.24 , Speed: 4300 },
    13: { HP: 6950, ATK: 359, DEF: 255, SpATK: 88, SpDEF: 331, CritRate: 0 , CDR: 0 , HPRegen: 15 , AtkSPD: 24.37 , Speed: 4300 },
    14: { HP: 7609, ATK: 405, DEF: 289, SpATK: 100, SpDEF: 376, CritRate: 0 , CDR: 0 , HPRegen: 15 , AtkSPD: 26.93 , Speed: 4300 },
    15: { HP: 8400, ATK: 460, DEF: 330, SpATK: 115, SpDEF: 430, CritRate: 0 , CDR: 0 , HPRegen: 15 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "trevenant": {
    1: { HP: 3250, ATK: 175, DEF: 100, SpATK: 20, SpDEF: 70, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3391, ATK: 178, DEF: 109, SpATK: 22, SpDEF: 78, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.44 , Speed: 3800 },
    3: { HP: 3553, ATK: 182, DEF: 120, SpATK: 24, SpDEF: 87, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3800 },
    4: { HP: 3739, ATK: 187, DEF: 132, SpATK: 27, SpDEF: 97, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 11.54 , Speed: 3800 },
    5: { HP: 4589, ATK: 208, DEF: 188, SpATK: 40, SpDEF: 144, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.22 , Speed: 3950 },
    6: { HP: 4835, ATK: 214, DEF: 204, SpATK: 44, SpDEF: 158, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.00 , Speed: 3950 },
    7: { HP: 5118, ATK: 221, DEF: 223, SpATK: 48, SpDEF: 174, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.89 , Speed: 4100 },
    8: { HP: 5444, ATK: 229, DEF: 245, SpATK: 53, SpDEF: 192, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.92 , Speed: 4100 },
    9: { HP: 5819, ATK: 238, DEF: 270, SpATK: 59, SpDEF: 213, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.1 , Speed: 4250 },
    10: { HP: 6251, ATK: 249, DEF: 299, SpATK: 66, SpDEF: 237, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 19.46 , Speed: 4250 },
    11: { HP: 6748, ATK: 261, DEF: 332, SpATK: 74, SpDEF: 264, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 21.02 , Speed: 4400 },
    12: { HP: 7319, ATK: 275, DEF: 370, SpATK: 83, SpDEF: 295, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 22.82 , Speed: 4400 },
    13: { HP: 7976, ATK: 291, DEF: 413, SpATK: 93, SpDEF: 331, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 24.89 , Speed: 4400 },
    14: { HP: 8731, ATK: 309, DEF: 463, SpATK: 104, SpDEF: 373, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 27.27 , Speed: 4400 },
    15: { HP: 9599, ATK: 330, DEF: 520, SpATK: 117, SpDEF: 421, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4400 }
  },

    "tsareena": {
    1: { HP: 3100, ATK: 155, DEF: 70, SpATK: 20, SpDEF: 50, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3160, ATK: 159, DEF: 75, SpATK: 21, SpDEF: 54, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.57 , Speed: 3650 },
    3: { HP: 3232, ATK: 164, DEF: 81, SpATK: 23, SpDEF: 59, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.26 , Speed: 3650 },
    4: { HP: 3529, ATK: 185, DEF: 105, SpATK: 30, SpDEF: 79, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 14.08 , Speed: 3650 },
    5: { HP: 3633, ATK: 193, DEF: 113, SpATK: 32, SpDEF: 86, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.07 , Speed: 3800 },
    6: { HP: 4178, ATK: 233, DEF: 157, SpATK: 44, SpDEF: 124, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 20.26 , Speed: 3800 },
    7: { HP: 4328, ATK: 244, DEF: 169, SpATK: 47, SpDEF: 134, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 21.69 , Speed: 3950 },
    8: { HP: 4508, ATK: 257, DEF: 184, SpATK: 51, SpDEF: 146, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 23.41 , Speed: 3950 },
    9: { HP: 4724, ATK: 273, DEF: 202, SpATK: 56, SpDEF: 161, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 25.47 , Speed: 4100 },
    10: { HP: 4983, ATK: 292, DEF: 223, SpATK: 62, SpDEF: 179, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 27.94 , Speed: 4100 },
    11: { HP: 5294, ATK: 315, DEF: 248, SpATK: 69, SpDEF: 201, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 30.91 , Speed: 4250 },
    12: { HP: 5667, ATK: 342, DEF: 278, SpATK: 78, SpDEF: 227, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 34.47 , Speed: 4250 },
    13: { HP: 6115, ATK: 374, DEF: 314, SpATK: 88, SpDEF: 258, CritRate: 20 , CDR: 0 , HPRegen: 20 , AtkSPD: 38.74 , Speed: 4250 },
    14: { HP: 6653, ATK: 413, DEF: 358, SpATK: 100, SpDEF: 295, CritRate: 20 , CDR: 0 , HPRegen: 20 , AtkSPD: 43.86 , Speed: 4250 },
    15: { HP: 7298, ATK: 460, DEF: 410, SpATK: 115, SpDEF: 340, CritRate: 20 , CDR: 0 , HPRegen: 20 , AtkSPD: 50.01 , Speed: 4250 },
  },

    "tyranitar": {
    1: { HP: 3300, ATK: 150, DEF: 110, SpATK: 20, SpDEF: 90, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3800 },
    2: { HP: 3381, ATK: 154, DEF: 116, SpATK: 21, SpDEF: 94, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.29 , Speed: 3800 },
    3: { HP: 3478, ATK: 159, DEF: 123, SpATK: 23, SpDEF: 99, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.63 , Speed: 3800 },
    4: { HP: 3595, ATK: 165, DEF: 131, SpATK: 25, SpDEF: 105, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.04 , Speed: 3800 },
    5: { HP: 4018, ATK: 187, DEF: 162, SpATK: 32, SpDEF: 128, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 12.54 , Speed: 3950 },
    6: { HP: 4186, ATK: 196, DEF: 174, SpATK: 35, SpDEF: 137, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 13.14 , Speed: 3950 },
    7: { HP: 4388, ATK: 207, DEF: 189, SpATK: 38, SpDEF: 148, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 13.86 , Speed: 4100 },
    8: { HP: 4630, ATK: 220, DEF: 207, SpATK: 42, SpDEF: 161, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 14.72 , Speed: 4100 },
    9: { HP: 5486, ATK: 266, DEF: 269, SpATK: 56, SpDEF: 207, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 17.75 , Speed: 4250 },
    10: { HP: 5835, ATK: 285, DEF: 294, SpATK: 62, SpDEF: 226, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 18.98 , Speed: 4250 },
    11: { HP: 6254, ATK: 307, DEF: 324, SpATK: 69, SpDEF: 249, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 20.46 , Speed: 4400 },
    12: { HP: 6756, ATK: 334, DEF: 360, SpATK: 77, SpDEF: 276, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 22.24 , Speed: 4400 },
    13: { HP: 7359, ATK: 366, DEF: 404, SpATK: 87, SpDEF: 309, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 24.37 , Speed: 4400 },
    14: { HP: 8082, ATK: 404, DEF: 457, SpATK: 99, SpDEF: 348, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 26.93 , Speed: 4400 },
    15: { HP: 8950, ATK: 450, DEF: 520, SpATK: 114, SpDEF: 395, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 30.00 , Speed: 4400 }
  },

    "umbreon": {
    1: { HP: 3300, ATK: 170, DEF: 85, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3439, ATK: 174, DEF: 96, SpATK: 22, SpDEF: 69, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.44 , Speed: 3700 },
    3: { HP: 3598, ATK: 179, DEF: 108, SpATK: 24, SpDEF: 79, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3700 },
    4: { HP: 4407, ATK: 202, DEF: 170, SpATK: 36, SpDEF: 130, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.54 , Speed: 3700 },
    5: { HP: 4618, ATK: 208, DEF: 186, SpATK: 39, SpDEF: 143, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 14.22 , Speed: 3850 },
    6: { HP: 4861, ATK: 215, DEF: 204, SpATK: 43, SpDEF: 158, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.00 , Speed: 3850 },
    7: { HP: 5140, ATK: 223, DEF: 225, SpATK: 47, SpDEF: 175, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 15.89 , Speed: 4000 },
    8: { HP: 5461, ATK: 232, DEF: 249, SpATK: 52, SpDEF: 195, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 16.92 , Speed: 4000 },
    9: { HP: 5830, ATK: 243, DEF: 277, SpATK: 58, SpDEF: 218, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.1 , Speed: 4150 },
    10: { HP: 6255, ATK: 255, DEF: 309, SpATK: 64, SpDEF: 245, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 19.46 , Speed: 4150 },
    11: { HP: 6744, ATK: 269, DEF: 346, SpATK: 71, SpDEF: 276, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 21.02 , Speed: 4300 },
    12: { HP: 7306, ATK: 285, DEF: 389, SpATK: 80, SpDEF: 311, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 22.82 , Speed: 4300 },
    13: { HP: 7953, ATK: 304, DEF: 438, SpATK: 90, SpDEF: 351, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 24.89 , Speed: 4300 },
    14: { HP: 8696, ATK: 325, DEF: 495, SpATK: 101, SpDEF: 397, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 27.27 , Speed: 4300 },
    15: { HP: 9550, ATK: 350, DEF: 560, SpATK: 114, SpDEF: 450, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4300 }
  },

    "urshifu": {
    1: { HP: 3200, ATK: 150, DEF: 80, SpATK: 20, SpDEF: 60, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3304, ATK: 157, DEF: 88, SpATK: 22, SpDEF: 66, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.44 , Speed: 3700 },
    3: { HP: 3424, ATK: 165, DEF: 97, SpATK: 24, SpDEF: 73, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3700 },
    4: { HP: 3562, ATK: 175, DEF: 107, SpATK: 27, SpDEF: 81, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.54 , Speed: 3700 },
    5: { HP: 4191, ATK: 219, DEF: 154, SpATK: 40, SpDEF: 119, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 14.22 , Speed: 3850 },
    6: { HP: 4373, ATK: 232, DEF: 168, SpATK: 44, SpDEF: 130, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.00 , Speed: 3850 },
    7: { HP: 4583, ATK: 247, DEF: 184, SpATK: 48, SpDEF: 143, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 15.89 , Speed: 4000 },
    8: { HP: 4824, ATK: 264, DEF: 202, SpATK: 53, SpDEF: 157, CritRate: 10 , CDR: 0 , HPRegen: 5 , AtkSPD: 16.92 , Speed: 4000 },
    9: { HP: 5102, ATK: 284, DEF: 223, SpATK: 59, SpDEF: 174, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 18.1 , Speed: 4150 },
    10: { HP: 5421, ATK: 306, DEF: 247, SpATK: 65, SpDEF: 193, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 19.46 , Speed: 4150 },
    11: { HP: 5789, ATK: 332, DEF: 274, SpATK: 72, SpDEF: 215, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 21.02 , Speed: 4300 },
    12: { HP: 6212, ATK: 362, DEF: 305, SpATK: 81, SpDEF: 240, CritRate: 20 , CDR: 0 , HPRegen: 10 , AtkSPD: 22.82 , Speed: 4300 },
    13: { HP: 6698, ATK: 396, DEF: 341, SpATK: 91, SpDEF: 269, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 24.89 , Speed: 4300 },
    14: { HP: 7257, ATK: 435, DEF: 382, SpATK: 102, SpDEF: 302, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 27.27 , Speed: 4300 },
    15: { HP: 7900, ATK: 480, DEF: 430, SpATK: 115, SpDEF: 340, CritRate: 20 , CDR: 0 , HPRegen: 15 , AtkSPD: 30.00 , Speed: 4300 },
  },

    "venusaur": {
    1: { HP: 3300, ATK: 134, DEF: 45, SpATK: 50, SpDEF: 35, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3346, ATK: 136, DEF: 48, SpATK: 63, SpDEF: 37, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.14 , Speed: 3700 },
    3: { HP: 3401, ATK: 139, DEF: 51, SpATK: 79, SpDEF: 39, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.31 , Speed: 3700 },
    4: { HP: 3467, ATK: 142, DEF: 55, SpATK: 98, SpDEF: 42, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.52 , Speed: 3700 },
    5: { HP: 3706, ATK: 154, DEF: 69, SpATK: 166, SpDEF: 52, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 11.27 , Speed: 3850 },
    6: { HP: 3801, ATK: 159, DEF: 74, SpATK: 193, SpDEF: 56, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 11.57 , Speed: 3850 },
    7: { HP: 4235, ATK: 180, DEF: 99, SpATK: 317, SpDEF: 74, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.93 , Speed: 4000 },
    8: { HP: 4372, ATK: 187, DEF: 107, SpATK: 356, SpDEF: 80, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.36 , Speed: 4000 },
    9: { HP: 4537, ATK: 195, DEF: 116, SpATK: 403, SpDEF: 87, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 13.87 , Speed: 4150 },
    10: { HP: 4735, ATK: 205, DEF: 127, SpATK: 459, SpDEF: 95, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 14.49 , Speed: 4150 },
    11: { HP: 4972, ATK: 217, DEF: 140, SpATK: 527, SpDEF: 105, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 15.23 , Speed: 4300 },
    12: { HP: 5257, ATK: 231, DEF: 156, SpATK: 608, SpDEF: 117, CritRate: 0 , CDR: 15 , HPRegen: 0 , AtkSPD: 16.12 , Speed: 4300 },
    13: { HP: 5598, ATK: 248, DEF: 175, SpATK: 705, SpDEF: 131, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 17.19 , Speed: 4300 },
    14: { HP: 6008, ATK: 268, DEF: 198, SpATK: 822, SpDEF: 148, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 18.47 , Speed: 4300 },
    15: { HP: 6500, ATK: 292, DEF: 225, SpATK: 962, SpDEF: 169, CritRate: 0 , CDR: 25 , HPRegen: 0 , AtkSPD: 20.01 , Speed: 4300 }
  },

    "wigglytuff": {
    1: { HP: 3278, ATK: 130, DEF: 90, SpATK: 40, SpDEF: 80, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3700 },
    2: { HP: 3415, ATK: 134, DEF: 100, SpATK: 51, SpDEF: 89, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.22 , Speed: 3700 },
    3: { HP: 3573, ATK: 139, DEF: 111, SpATK: 64, SpDEF: 99, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.48 , Speed: 3700 },
    4: { HP: 4372, ATK: 162, DEF: 169, SpATK: 131, SpDEF: 151, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.77 , Speed: 3700 },
    5: { HP: 4581, ATK: 168, DEF: 184, SpATK: 148, SpDEF: 165, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.11 , Speed: 3850 },
    6: { HP: 4821, ATK: 175, DEF: 201, SpATK: 168, SpDEF: 181, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.5 , Speed: 3850 },
    7: { HP: 5097, ATK: 183, DEF: 221, SpATK: 191, SpDEF: 199, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 12.95 , Speed: 4000 },
    8: { HP: 5414, ATK: 192, DEF: 244, SpATK: 217, SpDEF: 220, CritRate: 0 , CDR: 5 , HPRegen: 0 , AtkSPD: 13.46 , Speed: 4000 },
    9: { HP: 5779, ATK: 203, DEF: 271, SpATK: 247, SpDEF: 244, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.05 , Speed: 4150 },
    10: { HP: 6199, ATK: 215, DEF: 302, SpATK: 282, SpDEF: 271, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.73 , Speed: 4150 },
    11: { HP: 6681, ATK: 229, DEF: 337, SpATK: 322, SpDEF: 302, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.51 , Speed: 4300 },
    12: { HP: 7236, ATK: 245, DEF: 377, SpATK: 368, SpDEF: 338, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.41 , Speed: 4300 },
    13: { HP: 7874, ATK: 264, DEF: 424, SpATK: 421, SpDEF: 379, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 17.44 , Speed: 4300 },
    14: { HP: 8608, ATK: 285, DEF: 477, SpATK: 482, SpDEF: 427, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.63 , Speed: 4300 },
    15: { HP: 9452, ATK: 310, DEF: 539, SpATK: 552, SpDEF: 482, CritRate: 0 , CDR: 10 , HPRegen: 0 , AtkSPD: 20.00 , Speed: 4300 }
  },

    "zacian": {
    1: { HP: 3600, ATK: 160, DEF: 100, SpATK: 20, SpDEF: 80, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 25.00 , Speed: 3800 },
    2: { HP: 3757, ATK: 175, DEF: 112, SpATK: 23, SpDEF: 90, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 25.53 , Speed: 3800 },
    3: { HP: 3929, ATK: 191, DEF: 125, SpATK: 27, SpDEF: 101, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 26.12 , Speed: 3800 },
    4: { HP: 4118, ATK: 209, DEF: 140, SpATK: 31, SpDEF: 113, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 26.77 , Speed: 3800 },
    5: { HP: 4326, ATK: 229, DEF: 156, SpATK: 35, SpDEF: 126, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 27.48 , Speed: 3950 },
    6: { HP: 4555, ATK: 251, DEF: 174, SpATK: 40, SpDEF: 140, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 28.26 , Speed: 3950 },
    7: { HP: 4807, ATK: 275, DEF: 193, SpATK: 45, SpDEF: 155, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 29.12 , Speed: 4100 },
    8: { HP: 5085, ATK: 302, DEF: 214, SpATK: 51, SpDEF: 172, CritRate: 5 , CDR: 0 , HPRegen: 5 , AtkSPD: 30.07 , Speed: 4100 },
    9: { HP: 5391, ATK: 331, DEF: 238, SpATK: 58, SpDEF: 191, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 31.11 , Speed: 4250 },
    10: { HP: 5728, ATK: 363, DEF: 264, SpATK: 65, SpDEF: 212, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 32.26 , Speed: 4250 },
    11: { HP: 6100, ATK: 399, DEF: 293, SpATK: 73, SpDEF: 235, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 33.53 , Speed: 4400 },
    12: { HP: 6509, ATK: 438, DEF: 325, SpATK: 82, SpDEF: 260, CritRate: 10 , CDR: 0 , HPRegen: 10 , AtkSPD: 34.92 , Speed: 4400 },
    13: { HP: 6959, ATK: 481, DEF: 360, SpATK: 92, SpDEF: 287, CritRate: 10 , CDR: 0 , HPRegen: 15 , AtkSPD: 36.45 , Speed: 4400 },
    14: { HP: 7455, ATK: 528, DEF: 398, SpATK: 103, SpDEF: 317, CritRate: 10 , CDR: 0 , HPRegen: 15 , AtkSPD: 38.14 , Speed: 4400 },
    15: { HP: 8000, ATK: 580, DEF: 440, SpATK: 115, SpDEF: 350, CritRate: 10 , CDR: 0 , HPRegen: 15 , AtkSPD: 40.00 , Speed: 4400 }
  },

    "zeraora": {
    1: { HP: 3002, ATK: 159, DEF: 60, SpATK: 20, SpDEF: 40, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3120, ATK: 176, DEF: 69, SpATK: 23, SpDEF: 46, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.07 , Speed: 3650 },
    3: { HP: 3250, ATK: 195, DEF: 78, SpATK: 27, SpDEF: 52, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 12.24 , Speed: 3650 },
    4: { HP: 3393, ATK: 216, DEF: 88, SpATK: 31, SpDEF: 59, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 13.53 , Speed: 3650 },
    5: { HP: 3550, ATK: 239, DEF: 99, SpATK: 36, SpDEF: 67, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.95 , Speed: 3800 },
    6: { HP: 3723, ATK: 265, DEF: 112, SpATK: 41, SpDEF: 75, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.51 , Speed: 3800 },
    7: { HP: 3913, ATK: 293, DEF: 126, SpATK: 47, SpDEF: 84, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 18.23 , Speed: 3950 },
    8: { HP: 4122, ATK: 324, DEF: 141, SpATK: 53, SpDEF: 94, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 20.12 , Speed: 3950 },
    9: { HP: 4353, ATK: 358, DEF: 158, SpATK: 60, SpDEF: 105, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 22.21 , Speed: 4100 },
    10: { HP: 4607, ATK: 396, DEF: 176, SpATK: 68, SpDEF: 117, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 24.51 , Speed: 4100 },
    11: { HP: 4887, ATK: 437, DEF: 196, SpATK: 76, SpDEF: 131, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 27.04 , Speed: 4250 },
    12: { HP: 5195, ATK: 483, DEF: 218, SpATK: 85, SpDEF: 146, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 29.83 , Speed: 4250 },
    13: { HP: 5534, ATK: 533, DEF: 243, SpATK: 95, SpDEF: 162, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 32.9 , Speed: 4250 },
    14: { HP: 5908, ATK: 588, DEF: 270, SpATK: 106, SpDEF: 180, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 36.28 , Speed: 4250 },
    15: { HP: 6319, ATK: 649, DEF: 300, SpATK: 118, SpDEF: 200, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 40.00 , Speed: 4250 },
  },

    "zoroark": {
    1: { HP: 3030, ATK: 135, DEF: 55, SpATK: 20, SpDEF: 45, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.00 , Speed: 3650 },
    2: { HP: 3100, ATK: 147, DEF: 60, SpATK: 22, SpDEF: 48, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.44 , Speed: 3650 },
    3: { HP: 3181, ATK: 160, DEF: 65, SpATK: 25, SpDEF: 51, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 10.95 , Speed: 3650 },
    4: { HP: 3274, ATK: 175, DEF: 71, SpATK: 28, SpDEF: 55, CritRate: 0 , CDR: 0 , HPRegen: 0 , AtkSPD: 11.54 , Speed: 3650 },
    5: { HP: 3698, ATK: 245, DEF: 99, SpATK: 41, SpDEF: 73, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 14.22 , Speed: 3800 },
    6: { HP: 3821, ATK: 265, DEF: 107, SpATK: 45, SpDEF: 78, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.00 , Speed: 3800 },
    7: { HP: 3962, ATK: 288, DEF: 116, SpATK: 49, SpDEF: 84, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 15.89 , Speed: 3950 },
    8: { HP: 4125, ATK: 315, DEF: 127, SpATK: 54, SpDEF: 91, CritRate: 5 , CDR: 10 , HPRegen: 0 , AtkSPD: 16.92 , Speed: 3950 },
    9: { HP: 4312, ATK: 346, DEF: 139, SpATK: 60, SpDEF: 99, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 18.1 , Speed: 4100 },
    10: { HP: 4528, ATK: 382, DEF: 153, SpATK: 67, SpDEF: 108, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 19.46 , Speed: 4100 },
    11: { HP: 4776, ATK: 423, DEF: 169, SpATK: 75, SpDEF: 119, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 21.02 , Speed: 4250 },
    12: { HP: 5061, ATK: 470, DEF: 187, SpATK: 84, SpDEF: 131, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 22.82 , Speed: 4250 },
    13: { HP: 5389, ATK: 525, DEF: 208, SpATK: 94, SpDEF: 145, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 24.89 , Speed: 4250 },
    14: { HP: 5766, ATK: 588, DEF: 232, SpATK: 106, SpDEF: 161, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 27.27 , Speed: 4250 },
    15: { HP: 6200, ATK: 660, DEF: 260, SpATK: 120, SpDEF: 180, CritRate: 10 , CDR: 20 , HPRegen: 0 , AtkSPD: 30.00 , Speed: 4250 }
  }
  // continue manualmente
}

const skillDamage = {
 "absol": {
	"atkboosted": {
	  name: "Ataque Básico",
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
		formulas: [
        {
          label: "Damage - Full (6 Hits)",
          formula: (ATK, Level) => 0.91 * ATK + 4 * (Level - 1) + 200,
          type: "physical"
        },
	]
	}
  },

   "aegislash": {
	"atkboosted": {
	  name: "Ataque Básico",
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
        },
        {
          label: "Healing - Boosted",
          formula: (ATK, Level) => 1.5 * ATK + 12 * (Level - 1) + 72,
          type: "physical"
        },
		{
          label: "Damage - Boosted",
          formula: (ATK, Level) => 1.35 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Sacred Sword",
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
      formulas: [
        {
          label: "Shield",
          formula: (ATK, Level) => 1.7 * ATK + 0 * (Level - 1) + 340,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Iron Head",
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
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.82 * ATK + 13 * (Level - 1) + 640,
          type: "physical"
        },
	]
	}
  },

    "armarouge": {
	"atkboosted": {
	  name: "Ataque Básico",
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
        }
      ]
	},

    "s11": {
      name: "Fire Spin",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
      formulas: [
        {
          label: "Healing - Basic",
          formula: (SPATK, Level) => 2.6 * SPATK + 16 * (Level - 1) + 330,
          type: "special"
        },
        {
          label: "Healing - Empowered",
          formula: (SPATK, Level) => 3.9 * SPATK + 24 * (Level - 1) + 495,
          type: "special"
        },
		{
          label: "Additional Healing (Ally Snorlax) - Basic",
          formula: (SPATK, Level) => 0.192 * SPATK + 1 * (Level - 1) + 24,
          type: "special"
        },
		{
          label: "Additional Healing (Ally Snorlax) - Empowered",
          formula: (SPATK, Level) => 0.288 * SPATK + 2 * (Level - 1) + 36,
          type: "special"
        },
      ]
    },
    "s12": {
      name: "Sweet Scent",
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
        }
      ]
    },
    "s21": {
      name: "Decorate",
      formulas: [
        {
          label: "Shield",
          formula: (SPATK, Level) => 1.28 * SPATK + 16 * (Level - 1) + 400,
          type: "special"
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
          type: "special"
        },
      ]
    },
    "s22": {
      name: "Dazzling Gleam",
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
		formulas: [
        {
          label: "Healing - per Cream (48 max)",
          formula: (SPATK, Level) => 0.19 * SPATK + 3 * (Level - 1) + 45,
          type: "special"
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
	"atkboosted": {
	  name: "Ataque Básico",
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
	"atkboosted": {
	  name: "Ataque Básico",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 1 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Basic (2x)",
          formula: (ATK, Level) => 0.5 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
		{
          label: "Damage - Boosted (3x)",
          formula: (SPATK, Level) => 0.24 * SPATK + 6 * (Level - 1) + 110,
          type: "special"
        },
      ]
	},

    "s11": {
      name: "Water Spout",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
		formulas: [
        {
          label: "Damage (2x)",
          formula: (ATK, Level) => 0.5 * ATK + 4 * (Level - 1) + 100,
          type: "physical"
        }
	 ]
	}
  },

    "blissey": {
	"atkboosted": {
	  name: "Ataque Básico",
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
	  formulas: [
      ]
    },
    "s21": {
      name: "Soft-Boiled",
      formulas: [
        {
          label: "Healing",
          formula: (SPATK, Level) => 1.70 * SPATK + 0 * (Level - 1) + 220,
          type: "special"
        },
		{
          label: "Healing - HoT (2x)",
          formula: (SPATK, Level) => 0.70 * SPATK + 0 * (Level - 1) + 85,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Safeguard",
      formulas: [
        {
          label: "Shield",
          formula: (SPATK, Level) => 1.85 * SPATK + 13 * (Level - 1) + 620,
          type: "special"
        },
		{
          label: "Shield Skill Plus",
          formula: (SPATK, Level) => 2.05 * SPATK + 14 * (Level - 1) + 690,
          type: "special"
        }
      ]
    },
	"ult": {
		name: "Bliss Assistance",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
      formulas: [
        {
          label: "Damage - per Tick",
          formula: (ATK, Level) => 0.76 * ATK + 3 * (Level - 1) + 120,
          type: "physical"
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
      ]
    },
	"ult": {
		name: "Ultra Swole Slam",
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
        }
	 ]
	}
  },

    "ceruledge": {
	"atkboosted": {
	  name: "Ataque Básico",
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
      formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 2.42 * ATK + 33 * (Level - 1) + 330,
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Pyscho Cut",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
        }
      ]
    },
    "s21": {
      name: "Poltergeist",
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
      formulas: [
      ]
    },
	"ult": {
		name: "Ignite Midnight",
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
	"atkboosted": {
	  name: "Ataque Básico",
      formulas: [
        {
          label: "Damage - Basic (4x)",
          formula: (ATK, Level) => 0.308 * ATK + 0 * (Level - 1) + 0,
          type: "physical"
        },
        {
          label: "Damage - Additional to Charizard burned targets (4x)",
          formula: (ATK, Level) => 0.32 * ATK + 2 * (Level - 1) + 10,
          type: "physical"
        }
      ]
	},

    "s11": {
      name: "Flamethrower",
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
        }
	 ]
	}
  },

    "cinderace": {
	"atkboosted": {
	  name: "Ataque Básico",
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
      formulas: [
      ]
    },
	"ult": {
		name: "Blazing Bicycle Kick",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
      formulas: [
        {
          label: "Heal - per Tick (per half second)",
          formula: (SPATK, Level) => 0.64 * SPATK + 0 * (Level - 1) + 58,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Draining Kiss",
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.4 * SPATK + 20 * (Level - 1) + 350,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Gravity",
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
		formulas: [
        {
          label: "Explosion",
          formula: (SPATK, Level) => 4.86 * SPATK + 34 * (Level - 1) + 1640,
          type: "special"
        },
		{
          label: "Hydro Pump - Damage - per Hit (3 Hits)",
          formula: (SPATK, Level) => 1.215 * SPATK + 9 * (Level - 1) + 410,
          type: "special"
        },
		{
          label: "Hyper Beam",
          formula: (SPATK, Level) => 2.43 * SPATK + 17 * (Level - 1) + 820,
          type: "special"
        },
		{
          label: "Close Combat - Damage - per Hit (7 Hits)",
          formula: (SPATK, Level) => 0.5207 * SPATK + 4 * (Level - 1) + 176,
          type: "special"
        },
		{
          label: "Close Combat - Heal - per Hit, per Target",
          formula: (SPATK, Level) => 0.104 * SPATK + 1 * (Level - 1) + 35,
          type: "special"
        },
		{
          label: "Fly",
          formula: (SPATK, Level) => 3.159 * SPATK + 22 * (Level - 1) + 1066,
          type: "special"
        }
	]
	}
  },

    "comfey": {
	"atkboosted": {
	  name: "Ataque Básico",
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
      formulas: [
        {
          label: "Healing",
          formula: (SPATK, Level) => 0.97 * SPATK + 0 * (Level - 1) + 300,
          type: "special"
        },
		{
          label: "Healing - Additional Per Flower",
          formula: (SPATK, Level) => 0.15 * SPATK + 0 * (Level - 1) + 45,
          type: "special"
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
      formulas: [
        {
          label: "Additional Shield",
          formula: (SPATK, Level) => 0.85 * SPATK + 0 * (Level - 1) + 288,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Magical Leaf",
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
		formulas: [
        {
          label: "Heal - per tick",
          formula: (SPATK, Level) => 0.225 * SPATK + 0 * (Level - 1) + 120,
          type: "special"
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
	"atkboosted": {
	  name: "Ataque Básico",
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
		}
      ]
    },
	"ult": {
		name: "Gatling Gulp Missile",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
      formulas: [
      ]
    },
    "s21": {
      name: "Stealth Rock",
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
		formulas: [
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
	"atkboosted": {
	  name: "Ataque Básico",
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
        }
      ]
	},

    "s11": {
      name: "Dark Void",
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
      formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 1.5 * SPATK + 3 * (Level - 1) + 345,
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
		formulas: [
	]
	}
  },

  "decidueye": {
	"atkboosted": {
	  name: "Ataque Básico",
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
      name: "Razor leaf",
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
        }
      ]
    },
    "s12": {
      name: "Spirit Shackle",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Drill Peck",
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
        }
      ]
    },
    "s21": {
      name: "Agility",
      formulas: [
      ]
    },
    "s22": {
      name: "Jump Kick",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
        }
      ]
    },
    "s22": {
      name: "Phantom Force",
      formulas: [
      ]
    },
	"ult": {
		name: "Dreep and Destroy",
		formulas: [
        {
          label: "Damage",
          formula: (ATK, Level) => 1.01 * ATK + 4 * (Level - 1) + 180,
          type: "physical"
        }
	 ]
	}
  },

    "dragonite": {
	"atkboosted": {
	  name: "Ataque Básico",
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
        }
      ]
	},

    "s11": {
      name: "Dragon Dance",
      formulas: [
      ]
    },
    "s12": {
      name: "Extreme Speed",
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
          label: "Damage - Stage 2",
          formula: (ATK, Level) => 2.992 * ATK + 13 * (Level - 1) + 560,
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Outrage",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
        }
      ]
	},

    "s11": {
      name: "Flash Cannon",
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
      ]
    },
    "s12": {
      name: "Dragon Pulse",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 0.80 * SPATK + 5 * (Level - 1) + 155,
          type: "special"
        },
		{
          label: "Healing",
          formula: (SPATK, Level) => 1.5 * SPATK + 13 * (Level - 1) + 300,
          type: "special"
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
      formulas: [
        {
          label: "Shield",
          formula: (SPATK, Level) => 1.725 * SPATK + 23 * (Level - 1) + 290,
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Cotton Spore",
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
		formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 2 * SPATK + 8 * (Level - 1) + 530,
          type: "special"
        },
		{
          label: "Damage",
          formula: (SPATK, Level) => 3.06 * SPATK + 13 * (Level - 1) + 636,
          type: "special"
        }
	]
	}
  },

    "espeon": {
	"atkboosted": {
	  name: "Ataque Básico",
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
      formulas: [
        {
          label: "Damage - First Hit",
          formula: (SPATK, Level) => 0.726 * SPATK + 14 * (Level - 1) + 374,
          type: "special"
        },
		{
          label: "Damage - Subsequent Hits",
          formula: (SPATK, Level) => 0.22 * SPATK + 4 * (Level - 1) + 122,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Stored Power",
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
      formulas: [
        {
          label: "Damage - Initial",
          formula: (SPATK, Level) => 0.91 * SPATK + 13 * (Level - 1) + 540,
          type: "special",
		  additionalText: "6% max HP of the first enemy hit as additional damage."
        }
      ]
    },
    "s22": {
      name: "Future Sight",
      formulas: [
		{
		  label: "Damage",
          formula: (SPATK, Level) => 0.576 * SPATK + 9 * (Level - 1) + 338,
          type: "special",
		  additionalText: "10% of enemy missing HP."
		}
      ]
    },
	"ult": {
		name: "Psychic Solare",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
          type: "physical",
		  additionalText: "Damage (No Retreat Formation): Deals additional damage equal to 3% of the enemies' max HP. This additional damage is capped at 1000."
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
		  additionalText: "Shield - Additional: 12% Max HP"
        },
      ]
    },
    "s12": {
      name: "Iron Head",
      formulas: [
		{
          label: "Shield",
          formula: (ATK, Level) => 0.6 * ATK + 10 * (Level - 1) + 250,
          type: "physical",
		  additionalText: "Shield - Additional: 10% Max HP"
        },
		{
          label: "Damage",
          formula: (ATK, Level) => 1.5 * ATK + 8 * (Level - 1) + 150,
          type: "physical"
        },
		{
          label: "Damage (Dispatch formation per Trooper)",
          formula: (ATK, Level) => 0.9 * ATK + 2 * (Level - 1) + 100,
          type: "physical",
		  additionalText: "1.6% target missing HP"
		}
      ]
    },
    "s21": {
      name: "No Retreat",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
      formulas: [
        {
          label: "Damage",
          formula: (SPATK, Level) => 1.06 * SPATK + 6 * (Level - 1) + 230,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Shadow Ball",
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
	"atkboosted": {
	  name: "Ataque Básico",
      formulas: [
        {
          label: "Damage - Basic",
          formula: (ATK, Level) => 0.39 * ATK + 4 * (Level - 1) + 70,
          type: "physical"
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
      formulas: [
        {
          label: "Damage - per Ice Crystal",
          formula: (SPATK, Level) => 0.37 * SPATK + 4 * (Level - 1) + 97,
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Icy Wind",
      formulas: [
        {
          label: "Damage - per Ice Crystal",
          formula: (SPATK, Level) => 0.20 * SPATK + 2 * (Level - 1) + 35,
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Ice Shard",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
        }
      ]
	},

    "s11": {
      name: "Muddy Water",
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
		formulas: [
	]
	}
  },

  	"greedent": {
	"atkboosted": {
	  name: "Ataque Básico",
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
      formulas: [
      ]
    },
    "2b": {
      name: "Covet",
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
	"atkboosted": {
	  name: "Ataque Básico",
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
      formulas: [
      ]
    },
    "s22": {
      name: "Smokescreen",
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
		formulas: [
        {
          label: "Damage (2x)",
          formula: (ATK, Level) => 2.2 * ATK + 11 * (Level - 1) + 420,
          type: "physical"
        }
	 ]
	}
  },

  /*"pikachu": {
    "s11": {
      name: "Thunder Shock",
      formulas: [
        {
          label: "Damage",
          formula: "0.60 * SpATK + 2 * (Level - 1) + 50",
          type: "special"
        }
      ]
    },
    "s12": {
      name: "Electro Ball",
      formulas: [
        {
          label: "Damage",
          formula: "0.75 * SpATK + 3 * (Level - 1) + 80",
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Thunderbolt",
      formulas: [
        {
          label: "Initial Damage",
          formula: "1.10 * SpATK + 7 * (Level - 1) + 110",
          type: "special"
        },
        {
          label: "Chain Lightning",
          formula: "0.55 * SpATK + 3.5 * (Level - 1) + 55",
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Thunder",
      formulas: [
        {
          label: "Damage",
          formula: "1.50 * SpATK + 10 * (Level - 1) + 150",
          type: "special"
        }
      ]
    }
  },

  "charizard": {
    "s11": {
      name: "Fire Punch",
      formulas: [
        {
          label: "Damage",
          formula: "0.65 * ATK + 2.5 * (Level - 1) + 75",
          type: "physical"
        },
        {
          label: "Burn Damage (per tick)",
          formula: "0.20 * ATK + 1 * (Level - 1) + 20",
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Flame Burst",
      formulas: [
        {
          label: "Direct Hit",
          formula: "0.70 * SpATK + 3 * (Level - 1) + 70",
          type: "special"
        },
        {
          label: "Area Damage",
          formula: "0.45 * SpATK + 2 * (Level - 1) + 45",
          type: "special"
        }
      ]
    },
    "s21": {
      name: "Fire Blast",
      formulas: [
        {
          label: "Damage",
          formula: "1.30 * SpATK + 8 * (Level - 1) + 130",
          type: "special"
        }
      ]
    },
    "s22": {
      name: "Flamethrower",
      formulas: [
        {
          label: "Damage (per hit)",
          formula: "0.35 * SpATK + 2 * (Level - 1) + 35",
          type: "special"
        },
        {
          label: "Total Damage (full channel)",
          formula: "2.10 * SpATK + 12 * (Level - 1) + 210",
          type: "special"
        }
      ]
    }
  },

  "garchomp": {
    "s11": {
      name: "Sand Attack",
      formulas: [
        {
          label: "Damage",
          formula: "0.55 * ATK + 2 * (Level - 1) + 60",
          type: "physical"
        }
      ]
    },
    "s12": {
      name: "Dragon Rush",
      formulas: [
        {
          label: "Damage",
          formula: "0.85 * ATK + 4 * (Level - 1) + 90",
          type: "physical"
        }
      ]
    },
    "s21": {
      name: "Earthquake",
      formulas: [
        {
          label: "Damage",
          formula: "1.25 * ATK + 9 * (Level - 1) + 140",
          type: "physical"
        }
      ]
    },
    "s22": {
      name: "Dragon Claw",
      formulas: [
        {
          label: "First Hit",
          formula: "0.90 * ATK + 5 * (Level - 1) + 100",
          type: "physical"
        },
        {
          label: "Second Hit",
          formula: "1.10 * ATK + 7 * (Level - 1) + 120",
          type: "physical"
        }
      ]
    }
  }*/
  };
