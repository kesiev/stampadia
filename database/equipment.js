/* exported loadEquipment */

function loadEquipment() {
	return [
		// [CODEX-Stuff] Equipment - Resurrection: Pay gold to resurrect once.
		{
			id:"resurrection",
			label:"Resurrection",
			action:"{ifHeroDied}{and}{ifPayGold:2}{then}{gainFullHp}, {moveOnStairs}"
		},
		// [CODEX-Stuff] Equipment - Fireball: Inflict 2 damage.
		{
			id:"fireball",
			label:"Fireball",
			action:"{ifAfterHeroRollInFight}{then}{fightingEnemyLoseHp:1,0,2}"
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
		// [CODEX-Stuff] Equipment - Mirror: Teleport back to the mirror room.
		{
			id:"mirror",
			label:"Small mirror",
			action:"{ifAfterEnemyRollInFight}{then}{teleportToRoom:equip-mirror-room}"
		},
		// [CODEX-Stuff] Test - Bravery: Skip a turn for gold.
		{
			id:"testBravery",
			label:"Test: Bravery",
			action:"{ifBeforeHeroRollInFight}{and}{pass}{then}{gainGold:6}"
		},
		// [CODEX-Stuff] Test - Mercy: Turn an enemy rolled 1 to a 6 for gold.
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
		// [CODEX-Stuff] Equipment - Backflip: Flip a dice upside down.
		{
			id:"backflip",
			label:"Backflip",
			action:"{ifAfterHeroRollInFight}{and}{ifDiscardDie:1,1}{then}{flipDieUpsideDown:1}"
		},
		// [CODEX-Stuff] Equipment - Spin: Play dices in reverse order.
		{
			id:"spin",
			label:"Spin",
			action:"{ifAfterHeroRollInFight}{and}{ifPayGold:2}{then}{playLowerDieFirst}"
		},
		// [CODEX-Stuff] Equipment - Lunge: Place dice on the same column.
		{
			id:"lunge",
			label:"Lunge",
			action:"{ifAfterHeroRollInFight}{and}{ifPayGold:2}{then}{placeDiceInSameColumn}"
		},
		// [CODEX-Stuff] Equipment - Sweep: Place dice on the same row.
		{
			id:"sweep",
			label:"Sweep",
			action:"{ifAfterHeroRollInFight}{and}{ifPayGold:2}{then}{placeDiceInSameRow}"
		},
		// [CODEX-Stuff] Equipment - Mead: Discard one die, set the other one to 6.
		{
			id:"mead",
			label:"Mead",
			action:"{ifAfterHeroRollInFight}{then}{discardAnyDie:1}{and}{setDieTo:1,6}"
		},
		// [CODEX-Stuff] Equipment - Epic Weapon: A weapon with many names. Deal 2 damage to all enemies in range 4.
		{
			id:"epicWeapon",
			label:"{epicWeapon}",
			action:"{ifHeroTurn}{then}{fightingEnemyLoseHp:2,0,4}"
		},
		// [CODEX-Stuff] Equipment - Book: Lose 1 HP, deal 1 damage.
		{
			id:"book",
			label:"Book",
			action:"{ifAfterHeroRollInFight}{and}{loseHp:1}{then}{fightingEnemyLoseHp:1,1,2}"
		},
		// [CODEX-Stuff] Equipment - Apple: Gain 1/2 max HP.
		{
			id:"apple",
			label:"Apple",
			action:"{ifBeforeHeroRollInFight}{then}{gainHalfHp}"
		},
		// [CODEX-Stuff] Equipment - Invisibility: For the next 3 enemy turns, discard all dice less than 6.
		{
			id:"invisibility",
			label:"Invisibility",
			action:"{ifNextEnemyRolls:3}{then}{discardAllDie<=:5}"
		},
		// [CODEX-Stuff] Equipment - Focus: Pay 2G and sum 2 dice values.
		{
			id:"focus",
			label:"Focus",
			action:"{ifAfterHeroRollInFight}{then}{sumDice:2}, {activateAbility:1}, {pass}"
		},
		// [CODEX-Stuff] Equipment - Grenade: Perform an ATK action by the current room size.
		{
			id:"grenade",
			label:"Grenade",
			action:"{ifAfterHeroRollInFight}{then}{performByRoomSize:ATK}"
		},
		// [CODEX-Stuff] Equipment - Smoke: Perform a MOVE action by the current room size.
		{
			id:"smoke",
			label:"Smoke",
			action:"{ifAfterHeroRollInFight}{then}{performByRoomSize:Move}"
		},
		// [CODEX-Stuff] Equipment - Sonic: Perform a DEF action by the current room size.
		{
			id:"sonic",
			label:"Sonic",
			action:"{ifAfterHeroRollInFight}{then}{performByRoomSize:DEF}"
		},
		// [CODEX-Stuff] Equipment - Frag: A fragmentation bomb that damages 2 nearby enemies when getting damage.
		{
			id:"frag",
			label:"Frag",
			action:"{ifAfterHeroLoseHp}{then}{fightingEnemyLoseHp:1,2,3}"
		},
		// [CODEX-Stuff] Equipment - Small die: Perform 1 free action with activation power 4.
		{
			id:"smallDie",
			label:"Small die",
			action:"{ifAfterHeroRollInFight}{then}{performFreeActionWithPower:1,4}"
		},
		// [CODEX-Stuff] Equipment - Big die: Perform 1 free action with activation power 5.
		{
			id:"bigDie",
			label:"Big die",
			action:"{ifAfterHeroRollInFight}{then}{performFreeActionWithPower:1,5}"
		},
		// [CODEX-Stuff] Equipment - Large die: Perform 1 free action with activation power 5.
		{
			id:"hugeDie",
			label:"Huge die",
			action:"{ifAfterHeroRollInFight}{then}{performFreeActionWithPower:1,6}"
		},
		// [CODEX-Stuff] Equipment - Curse: Lose max HP -2, does nothing.
		{
			id:"curse",
			label:"Curse",
			action:"{loseFullHp-:2}{then}You lifted your curse, {markRoom:bossRoom}"
		},
		// [CODEX-Stuff] Equipment - Jacket: When entering a new room, damage 2 adjacent enemies.
		// This game can be used as a framework for other small games that want to add some exploration,
		// like tiny wargames, or more arcadey action games. I'm leaving this item here as a memento: it
		// mimics the very common "door slamming" maneuver in the "Hotline Miami" videogame.
		// You can find it in a broken teleport! - KesieV
		{
			id:"jacket",
			label:"Jacket",
			action:"{ifCrossDoor}{then}{fightingEnemyLoseHp:1,2,1}"
		},
		
	];
}