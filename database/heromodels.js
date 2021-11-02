/* exported loadHeroModels */

function loadHeroModels() {
	
	// Notes: add "isBetaTesting:true," to beta-tested heroes.

	return [
		// [CODEX-Heroes] Class - The Warrior: A balanced fighter who prefers melee attacks. It's equipped with a short sword, warrior boots, a small flask of cure, a throwing knife, and a Resurrection item.
		{
			id:"warrior",
			heroClass:"Warrior",
			tags:["importantStartingItem"],
			skills:[
				[ {skill:"ATK -1\nRNG 1"}, {skill:"Move\n-3"} ],
				[ {skill:"DEF -3"}, {skill:"Move\n-2", tags:["losable"]} ],
				[ {skill:"Gain HP\n-5", cost:"pay 1G", tags:["losable"] }, {skill:"ATK -3\nRNG 1", tags:["losable"] } ],
				[ {skill:"ATK\nRNG 2", tags:["losable"]}, {skill:"Move"} ]
			],
			placeholders:{
				familiarName:[
					"Dog",
					"Wolf",
					"Bear"
				]
			},
			defense:[1,1,1,1],
			xpRamp:[
				{
					value:0
				},{
					xpGroup:"low",
					round:"floor",
					percentage:1
				},{
					xpGroup:"high",
					round:"floor",
					percentage:0.35
				},{
					xpGroup:"high",
					round:"floor",
					percentage:0.65
				}
			],
			
			//Original XP ramp:
			/*
			xpRamp:[
				{
					value:0
				},{
					xpGroup:"all",
					round:"ceil",
					percentage:0.15
				},{
					xpGroup:"all",
					round:"ceil",
					percentage:0.35
				},{
					xpGroup:"all",
					round:"ceil",
					percentage:0.5
				}
			],
			*/
			
			hpRamp:[0.5,0.15,0.25,0.1],
			damageRatio:0.7,
			equipment:[
				{
					placeholder:"heroItem",
					id:"resurrection",
					isAvailable:true
				}
			],
			enemyModels:[
				// Level 0
				{ skills:[] },
				// Level 1
				{ skills:[] },
				// Level 2
				{
					skills:[
						["DEF -3","ATK -3\nRNG 2"]
					]
				},
				// Level 3
				{ skills:[] },
				// Level 4 - Zombies
				{ skills:[] }
			]
		},

		// [CODEX-Heroes] Class - The Wizard: A powerful mage that fights from the distance. It's equipped with lightning spells, a teleport spell, a magic shield, a healing spell, and a Fireball item.
		{
			id:"wizard",
			heroClass:"Wizard",
			tags:["weak"],
			skills:[
				[ {skill:"ATK -2\nRNG 2"}, {skill:"Move\n-3"} ],
				[ {skill:"Move\n-1"}, {skill:"Move\n-3", tags:["losable"]} ],
				[ {skill:"DEF\n-2", tags:["losable"]}, {skill:"ATK -1\nRNG 3"} ],
				[ {skill:"Gain HP\n-5", cost:"pay 1G"}, {skill:"ATK\nRNG 1", tags:["losable"]} ]
			],
			placeholders:{
				familiarName:[
					"Owl",
					"Cat",
					"Lizard"
				]
			},
			defense:[1,1,1,1],
			xpRamp:[
				{
					value:0
				},{
					xpGroup:"low",
					round:"floor",
					percentage:1
				},{
					xpGroup:"high",
					round:"floor",
					percentage:0.35
				},{
					xpGroup:"high",
					round:"floor",
					percentage:0.65
				}
			],

			hpRamp:[0.6,0.15,0.15,0.1],
			damageRatio:0.7,
			equipment:[
				{
					placeholder:"heroItem",
					id:"fireball",
					isAvailable:true
				}
			],

			enemyModels:[
				// Level 0
				{
					skills:[
						["ATK -1\nRNG 2","Move\n-3"]
					]
				},
				// Level 1
				{ skills:[] },
				// Level 2
				{ skills:[] },
				// Level 3
				{ skills:[] },
				// Level 4 - Zombies
				{ skills:[] }
			]
		},

		// [CODEX-Heroes] Class - The Dwarf: A strong fighter trained on swinging a huge war hammer. It's equipped with a war hammer, leather armor, and a Mead item.
		{
			id:"dwarf",
			heroClass:"Dwarf",
			skills:[
				[ {skill:"ATK -1\nRNG 1"}, {skill:"Move\n-4"} ],
				[ {skill:"DEF -2"}, {skill:"Move\n-3", tags:["losable"]} ],
				[ {skill:"ATK -2\nALL 2", cost:"pay 1G", tags:["losable"]}, {skill:"DEF -3"} ],
				[ {skill:"ATK -1\nRNG 2", cost:"pay 2G", tags:["losable"] }, {skill:"ATK\nRNG 1", cost:"pay 2G", tags:["losable"]} ]
			],
			placeholders:{
				familiarName:[
					"Beaver",
					"Mole",
					"Hedgehog"
				]
			},
			defense:[1,1,1,1],
			xpRamp:[
				{
					value:0
				},{
					xpGroup:"low",
					round:"floor",
					percentage:1
				},{
					xpGroup:"high",
					round:"floor",
					percentage:0.35
				},{
					xpGroup:"high",
					round:"floor",
					percentage:0.65
				}
			],
			
			hpRamp:[0.35,0.30,0.25,0.1],
			damageRatio:0.7,
			equipment:[
				{
					placeholder:"heroItem",
					id:"mead",
					isAvailable:true
				}
			],
			enemyModels:[
				// Level 0
				{ skills:[] },
				// Level 1
				{ skills:[] },
				// Level 2
				{skills: [] },
				// Level 3
				{ skills:[] },
				// Level 4 - Zombies
				{ skills:[] }
			]
		},

		// [CODEX-Heroes] Class - The Ranger: An archer that learns from the beasts. It's equipped with a bow and a Focus item.
		{
			id:"ranger",
			heroClass:"Ranger",
			skills:[
				[ {skill:"ATK -1\nRNG 1"}, {skill:"Move\n-3"} ],
				[ {skill:"ATK -1\nRNG =2", tags:["losable"]}, {skill:"Copy\n-1", tags:["losable"]} ],
				[ {skill:"Copy\n-1", tags:["losable"]}, {skill:"DEF -2"} ],
				[ {skill:"ATK\nRNG 3", tags:["losable"]}, {skill:"Move", tags:["losable"]} ]
			],
			placeholders:{
				familiarName:[
					"Falcon",
					"Pidgeon",
					"Snake"
				]
			},
			defense:[1,1,1,1],
			xpRamp:[
				{
					value:0
				},{
					xpGroup:"low",
					round:"floor",
					percentage:1
				},{
					xpGroup:"high",
					round:"floor",
					percentage:0.35
				},{
					xpGroup:"high",
					round:"floor",
					percentage:0.65
				}
			],
			hpRamp:[0.5,0.15,0.25,0.1],
			damageRatio:0.7,
			equipment:[
				{
					placeholder:"heroItem",
					id:"focus",
					isAvailable:true
				}
			],
			enemyModels:[
				// Level 0
				{ skills:[] },
				// Level 1
				{ skills:[] },
				// Level 2
				{
					skills:[
						["DEF -3","ATK -3\nRNG 2"]
					]
				},
				// Level 3
				{ skills:[] },
				// Level 4 - Zombies
				{ skills:[] }
			]
		},

		// [CODEX-Heroes] Class - The Rogue: An agile thief that tricks enemies. It's equipped with a lazzo, a throwing knife, and a Frag bomb item.
		{
			isBetaTesting:true,
			id:"rogue",
			heroClass:"Rogue",
			skills:[
				[ {skill:"ATK -1\nRNG 1"}, {skill:"Move\n-2"} ],
				[ {skill:"DEF -3"}, {skill:"Lock\n-3", tags:["losable"]} ],
				[ {skill:"DEF -2", tags:["losable"] }, {skill:"Move", tags:["losable"] } ],
				[ {skill:"Lock\n-2", tags:["losable"]}, {skill:"ATK\nRNG 2", tags:["losable"]} ]
			],
			placeholders:{
				familiarName:[
					"Mouse",
					"Crow",
					"Raccoon"
				]
			},
			defense:[1,1,1,1],
			xpRamp:[
				{
					value:0
				},{
					xpGroup:"low",
					round:"floor",
					percentage:1
				},{
					xpGroup:"high",
					round:"floor",
					percentage:0.35
				},{
					xpGroup:"high",
					round:"floor",
					percentage:0.65
				}
			],
			
			hpRamp:[0.5,0.15,0.25,0.1],
			damageRatio:0.7,
			equipment:[
				{
					placeholder:"heroItem",
					id:"frag",
					isAvailable:true
				}
			],
			enemyModels:[
				// Level 0
				{ skills:[] },
				// Level 1
				{ skills:[] },
				// Level 2
				{
					skills:[
						["DEF -3","ATK -3\nRNG 2"]
					]
				},
				// Level 3
				{ skills:[] },
				// Level 4 - Zombies
				{ skills:[] }
			]
		},
	];
}