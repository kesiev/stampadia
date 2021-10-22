/* exported loadTerrains */

function loadModifiers() {
	return {
		good:[
			{
				id:"[CODEX-Modifiers] Enemy - Crippled: Enemies moves -1.",
				roomDescriptions:[["{ifEnemyPerformAction:MOVE}{then}The crippled enemy drags forward, {actionEffect:-1}"]]
			},
			{
				id:"[CODEX-Modifiers] Enemy - Scared: Enemies -1 a die of choice.",
				roomDescriptions:[["{ifAfterEnemyRollInFight}{then}The enemy is trembling with fear, {modifyDice:1,-1}"]]
			},
			{
				id:"[CODEX-Modifiers] Enemy - Blind: Enemies plays just 1 die.",
				roomDescriptions:[["{ifAfterEnemyRollInFight}{then}The enemy can't see you, {activateOnly:1}"]]
			},
			{
				id:"[CODEX-Modifiers] Enemy - Stunned: Hero rerolls his 1s.",
				roomDescriptions:[["{ifHeroRolls:1}{then}The enemy looks stunned, {reroll:1}"]]
			},
		],
		balanced:[
			{
				id:"[CODEX-Modifiers] Terrain - Mud: Everybody moves -1.",
				roomDescriptions:[["{ifPerformAction:MOVE}{then}The muddy floor slows you down, {actionEffect:-1}"]]
			},
			{
				id:"[CODEX-Modifiers] Terrain - Tall grass: Everybody -1 a die of choice.",
				roomDescriptions:[["{ifAfterRollInFight}{then}The tall grass is a hindrance, {modifyDice:1,-1}"]]
			},
			{
				id:"[CODEX-Modifiers] Terrain - Darkness: Everybody plays just 1 die.",
				roomDescriptions:[["{ifAfterRollInFight}{then}It's too dark here, {activateOnly:1}"]]
			},
			{
				id:"[CODEX-Modifiers] Terrain - Arena: Everybody rerolls his 1s.",
				roomDescriptions:[["{ifRolls:1}{then}It's a matter of life and death, {reroll:1}"]]
			},
		],
		bad:[
			{
				id:"[CODEX-Modifiers] Hero - Fear: Hero moves -1.",
				roomDescriptions:[["{ifHeroPerformAction:MOVE}{then}You're so scared your legs can't move, {actionEffect:-1}"]]
			},
			{
				id:"[CODEX-Modifiers] Hero - Weak: Hero -1 a die of choice.",
				roomDescriptions:[["{ifAfterHeroRollInFight}{then}You feel weak, {modifyDice:1,-1}"]]
			},
			{
				id:"[CODEX-Modifiers] Hero - Blind: Hero plays just 1 die.",
				roomDescriptions:[["{ifAfterHeroRollInFight}{then}Everything goes dark, {activateOnly:1}"]]
			},
			{
				id:"[CODEX-Modifiers] Enemy - Haste: Enemies rerolls his 1s.",
				roomDescriptions:[["{ifEnemyRolls:1}{then}The enemy is moving so quickly, {reroll:1}"]]
			},
		]
	};
}