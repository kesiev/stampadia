/* exported loadEquipment */

function loadEquipment() {
	return [
		// [CODEX-Stuff] Equipment - Resurrection: Pay gold to resurrect once.
		{
			id:"resurrection",
			label:"Resurrection",
			action:"{ifHeroDied}{and}{ifPayGold:5}{then}{gainFullHp}, {moveOnStairs}"
		},
		// [CODEX-Stuff] Equipment - Fireball: Inflict 2 damage.
		{
			id:"fireball",
			label:"Fireball",
			action:"{ifAfterHeroRollInFight}{then}{fightingEnemyLoseHp:1}"
		},
		// [CODEX-Stuff] Equipment - Taunt: Sacrifice XPs to weaken an enemy attack.
		{
			id:"taunt",
			label:"Taunt",
			action:"{ifAfterEnemyRollInFight}{and}{ifPayXp:1}{then}{discardAnyDie:1}"
		},
		// [CODEX-Stuff] Equipment - Dash: Sacrifice XPs to skip the enemy turn.
		{
			id:"dash",
			label:"Dash",
			action:"{ifAfterEnemyRollInFight}{and}{ifPayXp:2}{then}{discardAnyDie:2}"
		},
		// [CODEX-Stuff] Equipment - Rage: Sacrifice XPs to strike a critical hit.
		{
			id:"rage",
			label:"Rage",
			action:"{ifAfterHeroRollInFight}{and}{ifPayXp:2}{then}{setDieTo:1,6}"
		},
		// [CODEX-Stuff] Equipment - Tactic: Sacrifice XPs to strike a two strong hits.
		{
			id:"tactic",
			label:"Tactic",
			action:"{ifAfterHeroRollInFight}{and}{ifPayXp:2}{then}{setDieTo:2,5}"
		},
		// [CODEX-Stuff] Test - Bravery: Skip a turn for gold.
		{
			id:"testBravery",
			label:"Test: Bravery",
			action:"{ifBeforeHeroRollInFight}{and}{pass}{then}{gainGold:6}"
		},
		// [CODEX-Stuff] Test - Mercy: Turn an enemy rolled 1 to a 6.
		{
			id:"testMercy",
			label:"Test: Mercy",
			action:"{ifAfterEnemyRollInFight}{and}{ifSetDie:1,1,6}{then}{gainGold:5}"
		},
		// [CODEX-Stuff] Test - Calm: Discard a rolled 6 for gold.
		{
			id:"testCalm",
			label:"Test: Calm",
			action:"{ifAfterHeroRollInFight}{and}{ifDiscardDie:1,6}{then}{gainGold:4}"
		},
		
		
	];
}