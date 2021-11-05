/* exported loadTerrains */

function loadModifiers() {
	return {
		crippled:{
			enemy:{
				id:"[CODEX-Modifiers] Enemy - Crippled: Enemies moves -1.",
				type:"good",
				roomDescription:"{ifEnemyPerformAction:MOVE}{then}It drags forward crippled, {actionEffect:-1}"
			},
			hero:{
				id:"[CODEX-Modifiers] Hero - Paralysis: Hero moves -1.",
				type:"bad",
				roomDescription:"{ifHeroPerformAction:MOVE}{then}Your legs feel so heavy, {actionEffect:-1}"
			},
		},
		scared:{
			enemy:{
				id:"[CODEX-Modifiers] Enemy - Fear: Enemies -1 a die of choice.",
				type:"good",
				roomDescription:"{ifAfterEnemyRollInFight}{then}It trembles with fear, {modifyDice:1,-1}"
			},
			hero:{
				id:"[CODEX-Modifiers] Hero - Fear: Hero -1 a die of choice.",
				type:"bad",
				roomDescription:"{ifAfterHeroRollInFight}{then}Fear makes you flinch, {modifyDice:1,-1}"
			}
		},
		blind:{
			enemy:{
				id:"[CODEX-Modifiers] Enemy - Blind: Enemies plays just 1 die.",
				type:"good",
				roomDescription:"{ifAfterEnemyRollInFight}{then}It can't see you, {activateOnly:1}"
			},
			hero:{
				id:"[CODEX-Modifiers] Hero - Blind: Hero plays just 1 die.",
				type:"bad",
				roomDescription:"{ifAfterHeroRollInFight}{then}You see nothing, {activateOnly:1}"
			},
		},
		stunned:{
			enemy:{
				id:"[CODEX-Modifiers] Enemy - Stunned: Hero rerolls his 1s.",
				type:"good",
				roomDescription:"{ifHeroRolls:1}{then}The enemy looks stunned, {reroll:1}"
			},
			hero:{
				id:"[CODEX-Modifiers] Enemy - Haste: Enemies rerolls his 1s.",
				type:"bad",
				roomDescription:"{ifEnemyRolls:1}{then}It's moving so quickly, {reroll:1}"
			},
		},

		// Rooms
		muddy:{
			room:{
				id:"[CODEX-Modifiers] Terrain - Mud: Everybody moves -1.",
				type:"balanced",
				roomDescription:"{ifPerformAction:MOVE}{then}The muddy floor slows you down, {actionEffect:-1}"
			}
		},
		tallGrass:{
			room:{
				id:"[CODEX-Modifiers] Terrain - Tall grass: Everybody -1 a die of choice.",
				type:"balanced",
				roomDescription:"{ifAfterRollInFight}{then}The tall grass hinders, {modifyDice:1,-1}"
			}
		},
		darkness:{
			room:{
				id:"[CODEX-Modifiers] Terrain - Darkness: Everybody plays just 1 die.",
				type:"balanced",
				roomDescription:"{ifAfterRollInFight}{then}It's too dark here, {activateOnly:1}"
			}
		},
		arena:{
			room:{
				id:"[CODEX-Modifiers] Terrain - Arena: Everybody rerolls his 1s.",
				type:"balanced",
				roomDescription:"{ifRolls:1}{then}It's a matter of life and death, {reroll:1}"
			}
		}
	};
}