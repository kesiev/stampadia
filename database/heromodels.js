/* exported loadHeroModels */

function loadHeroModels() {
	return [
		// [CODEX-Heroes] Class - The Warrior: A balanced fighter who prefers melee attacks. It's equipped with a short sword, warrior boots, a small flask of cure, a throwing knife, and a Resurrection item.
		{
			heroClass:"Warrior",
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
			damageRatio:0.5,
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
				{ skills:[] }
			]
		},

		// [CODEX-Heroes] Class - The Wizard: A powerful mage that fights from the distance. It's equipped with lightning spells, a teleport spell, a magic shield, a healing spell, and a Fireball item.
		{
			heroClass:"Wizard",
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
			damageRatio:0.5,
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
				{ skills:[] }
			]
		}
	];
}