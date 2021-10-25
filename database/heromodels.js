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
				["ATK -1\nRNG 1","Move\n-3"],
				["DEF -3","Move\n-2"],
				["(pay 1G)\nGain HP\n-5","ATK -3\nRNG 1"],
				["ATK\nRNG 2","Move"]
			],
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
				["ATK -2\nRNG 2","Move\n-3"],
				["Move\n-2","Move\n-3"],
				["DEF\n-2","ATK -1\nRNG 3"],
				["(pay 1G)\nGain HP\n-5","ATK\nRNG 1"]
			],
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
				["ATK -1\nRNG 1","Move\n-4"],
				["DEF -2","Move\n-3"],
				["(pay 1G)\nATK -2\nALL 2","DEF -3"],
				["ATK -1\nRNG 1","(pay 2G)\nATK\nRNG 1"]
			],
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

		// [CODEX-Heroes] Class - The Ranger: An archer that learns from the beasts. It's equipped with a bow, and a Focus item.
		{
			isBetaTesting:true,
			id:"ranger",
			heroClass:"Ranger",
			skills:[
				["ATK -1\nRNG 1","Move\n-3"],
				["ATK -1\nRNG =2","Copy"],
				["ATK -1\nRNG 2","DEF -2"],
				["Copy","Move"]
			],
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
	];
}