/* exported loadRandomizers */

function loadRandomizers() {
	return {

		// Narrative
		randomShopKeeper:[
			"\"Thank you, stranger!\"",
			"The shopkeeper stares at you",
			"\"Here you are, {heroClass}.\"",
			"\"Thank you, {heroClass}.\"",
			"\"Thanks for the gold!\"",
			"\"Hope it helps!\"",
			"\"The best of the {placeName} for you!\"",
			"\"You take. Me thanks.\""
		],
		randomGambler:[
			"\"Feeling lucky, huh?\"",
			"\"Wanna play a little game?\"",
			"\"It looks like you like playing games, huh? Come here!\"",
			"\"Do you want to play with me?\"",
			"\"Let's bet, kid.\"",
			"\"I've a little game for you!\""
		],
		randomTeleportation:[
			"You disappear",
			"You vanish into thin air",
			"You feel dizzy"
		],
		randomMysteryHappens:[
			"You hear a click under your feets",
			"You hear a noise somewhere",
			"Everything rumbles around you"
		],
		randomTrap:[
			"A dart hits you on a leg",
			"You step on a spike",
			"A small red spider bites you"
		],
		randomSmallKey:[
			"a small key",
			"a rusty key",
			"a tiny key",
			"a copper key",
			"a wooden key"
		],
		randomSaint:[
			"\"Let me help you.\"",
			"\"You need assistance. Here.\"",
			"\"May the Gods be with you.\"",
			"\"Come here. Take this.\"",
			"\"I bless you.\""
		],
		randomAltar:[
			"\"Bow down.\"",
			"\"Pray the gods.\"",
			"\"Sacrifice.\"",
			"\"...\""
		],
		randomBossEntrance:[
			"\"How you DARE to challenge the {villainName}! Now, die!\"",
			"\"You will die by the hand of the great {villainName}!\"",
			"\"This {placeName} will be your tomb, {heroClass}!\"",
			"\"This {placeName} will be the last thing you'll see!\"",
			"\"Now die, {heroClass}!\"",
			"\"You and your {goodGuyName} will die!\"",
			"\"I'll kill you first, then the {goodGuyName}!\"",
			"\"The {goodGuyName} will regret sending you here!\"",
			"\"A {heroClass} this time... very well! Bring it on!\""
		],
		randomBossRevenge:[
			"\"That's the right price for the {goodGuyName}'s indolence!\"",
			"\"A simple {heroClass} can't save the {goodGuyName}'s {goodGuyRelativeName} life!\"",
			"{goodGuyName}'s {goodGuyRelativeName}: \"Please, help me!\"",
			"{goodGuyName}'s {goodGuyRelativeName}: \"The {villainName} kidnapped me! Help!\"",
			"\"The {goodGuyName}'s {goodGuyRelativeName} life is mine!\"",
			"\"The {goodGuyName} will never see the {goodGuyRelativeName} again!\"",
			"\"The {goodGuyName}'s {goodGuyRelativeName} will be my reward!\"",
		],
		randomSaveRelativeRequest:[
			"\"The {villainName} kidnapped my {goodGuyRelativeName}... Help!\"",
			"\"My {goodGuyRelativeName} is in danger... Please, help me!\"",
			"\"Please, save my {goodGuyRelativeName}!\"",
		],
		randomThankYou:[
			"\"Thank you!\"",
			"\"You have my thanks!\"",
			"\"I owe you. Thanks!\"",
		],
		randomSphinxAnswerAccept:[
			"\"That's your answer.\"",
			"\"...\"",
			"\"Very well.\"",
			"\"Interesting.\"",
			"\"Is that true?\"",
			"\"We'll see.\""
		],
		randomSphinxOk:[
			"\"...pleases me.\"",
			"\"...is the truth.\"",
			"\"...is the right one.\""
		],
		randomSphinxKo:[
			"\"...is disappointing.\"",
			"\"...condamned you.\"",
			"\"...is illogic.\""
		],
		randomMurderer:[
			"\"That {victimName} was a too easy fight... Hey, YOU!\"",
			"\"That {victimName} taste was so good...\"",
			"\"Hey {heroClass}! Are you here for that {victimName}?\"",
			"\"I wonder why the {villainName} wanted that {victimName} dead... What?\""
		],
		randomHiddenFoe:[
			"\"Damn {heroClass}! How did you manage to find me?!\"",
			"\"It was the best hiding place in the {placeName}!\"",
			"\"So you came, at last.\"",
			"\"Did the {goodGuyName} tell you where I was? Damn!\"",
			"\"Finding me will be your worst mistake.\""
		],

		// Loot
		randomGold:[
			"{gainGold:1}",
			"{gainGold:2}"
		],
		randomGoodReward:[
			"{gainHp:1}",
			"{gainXp:1}",
			"{gainGold:3}",
		],
		randomBadReward:[
			"nothing",
			"{loseHp:1}"
		],
		randomGoodLoot:[
			"an Heart Shard, {gainHp:1}",
			"a Star Pin, {gainXp:1}",
			"a bag of gold, {gainGold:3}",
		],
		randomBadLoot:[
			"nothing",
			"a Mimic, {loseHp:1}"
		],
		randomHighCost:[
			"{payHp:2}",
			"{payXp:3}",
			"{loseEquip:equip-heroItem}"
		],
		randomHighPrize:[
			"{gainGold:5}",
			"{gainFullHp}"
		],

		// Fountains
		randomGoodFountain:[
			"a clean fountain, {gainHp:1}",
			"a fresh fountain, {gainHp:2}",
		],
		randomBadFountain:[
			"a muddy fountain, {loseHp:1}",
			"a black fountain, {loseHp:2}",
		],

		// Room effects
		randomGoodRoomEffect:[
			"This room is blessed, {gainHp:1}"
		],
		randomBadRoomEffect:[
			"Poisonous gas fills the room, {loseHp:1}"
		]
	}
}