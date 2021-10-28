/* exported loadRandomizers */

function loadRandomizers() {

	// Beastcrafters trading card game random events
	let beasts=[
		{label:"Golem",id:"golem",setName:"golemSet",beatenBySet:"manticoreSet"},
		{label:"Manticore",id:"manticore",setName:"manticoreSet",beatenBySet:"hellhoundSet"},
		{label:"Hellhound",id:"hellhound",setName:"hellhoundSet",beatenBySet:"golemSet"},
	];

	var getRandomCard=[];
	beasts.forEach(beast=>{
		for (let p=1;p<4;p++)
			getRandomCard.push("{getKeyword:"+beast.id+"-"+p+"}");
	})


	return {

		// Thanks to...
		randomBookQuote:[
			"Bi-Anca painted all the walls",  // Bianca (wife) for tons of narrative contributes and quest suggestions!
			"Frank is our first Brother",     // FrankBro (Discord) for being the first supporting the project!
			"The stagger Lee lived twice",    // StaggerLee (BGG) for laminating Stampadia dungeons to reuse them!
			"Peter piers them all",           // PeterPiers (BGG) for help and passion!
			"Marianne guided us here",        // Marianne Waage (BGG) for guiding this game on BGG!
			"The word of Preuk helped",       // Preuk (Discord) for tons of clever suggestions!
			"Sam and Marcus gave us voice",   // Sam Marcus (Roguelike Celebration) for suggesting me to talk about CoS!
			"Beep is up, Test is down",       // Beeptest (Discord) for suggesting upside-down text!
			"Supp-Japan was a wizard god",    // SuppJapan (Discord) for suggesting new classes, like The Wizard!
			"Court-Jus balanced our world",   // CourtJus (Discord) for suggesting balance fixes!
		],

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
		randomDarkShopKeeper:[
			"\"Hee hee... Thank you...\"",
			"A grin opens on the shopkeeper face",
			"\"Very well, then...\"",
			"\"Have fun, hee...\"",
			"The shopkeeper rubs his hands",
			"\"Thaaank yooou, tee hee!\"",
			"\"Now leave\"",
			"\"...\""
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
			"\"How you dare to face the {villainName}! Now, die!\"",
			"\"You will die by the hand of the great {villainName}!\"",
			"\"This {placeName} will be your tomb, {heroClass}!\"",
			"\"This {placeName} will be the last thing you'll see!\"",
			"\"Now die, {heroClass}!\"",
			"\"You and your {goodGuyName} will die!\"",
			"\"I'll kill you first, then the {goodGuyName}!\"",
			"\"The {goodGuyName} will regret sending you here!\"",
			"\"A {heroClass} this time... very well! Bring it on!\""
		],
		randomTwinBossEntrance:[
			"\"Do you think you can beat the {villainName} Twins?\"",
			"\"We are the {villainName} Twins and now you'll die!\"",
			"\"The {villainName} Twins will crush you!\"",
			"\"You are all alone, {heroClass}!\"",
		],
		randomFinalFormAnnounce:[
			"\"Behold our final form, {heroClass}!\"",
			"\"This isn't even our final form!\"",
			"\"Now see our full power!\"",
			"\"We've had enough of playing!\"",
		],
		randomBadFeeling:[
			"Are not you feeling good",
			"There is something wrong",
			"Your stomach hurts",
			"Your eyes burn",
			"You feel weak arms",
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
		randomEnemyChallenge:[
			"\"You will never leave the {placeName} alive, {heroClass}!\"",
			"\"Stop right there!\"",
			"\"Now is your turn to die, {heroClass}!\"",
			"\"You will pay for this!\"",
			"\"I'll avenge the {villainName}!\"",
			"\"Where are you going, {heroClass}?\"",
		],
		randomMagicTree:[
			"A tree is growing visibly in the middle of the room.",
			"There is a magic tree, growing at an unnatural speed.",
			"The branches of the tree sway as if they were alive.",
			"The Fruit of the tree pulsates with a dim light."
		],
		randomGoodGuyLost:[
			"\"I missed the {goodGuyName}!\"",
			"\"I've lost the {goodGuyName}...\"",
			"The {goodGuyName} is no longer here",
			"\"Where did the {goodGuyName} go?\"",
		],
		randomGoodGuyLongFollowMe:[
			"\"Hurry! Let's go!\"",
			"\"We've to find the {villainName}! This way!\"",
			"\"There is no time to waste! Follow me!\"",
		],
		randomFollowMe:[
			"\"We're on the right track!\"",
			"\"This way!\"",
			"\"Follow me!\"",
			"\"Oh! It's you! Let's go!\""
		],
		randomVillainFound:[
			"\"It's the {villainName}. Go there!\"",
			"\"Time to end the {villainName} life!\"",
			"\"It's the {villainName}! Go!\"",
			"\"We've found the {villainName}!\"",
		],
		randomSlaverBuy:[
			"\"Okay, the beast is yours.\"",
			"\"Make good use of it, heh!\"",
			"\"Thank you!\"",
			"\"You got a great deal!\"",
		],
		randomMobsterPay:[
			"\"Thanks from the {villainName}!\"",
			"\"You serve the {villainName} well!\"",
			"\"Hail to the {villainName}!\"",
			"\"The {villainName} will be pleased!\"",
		],
		randomGoodDying:[
			"\"So... rry...\"",
			"\"Fare... well...\"",
			"\"I... can't...\"",
			"\"I can't... Thank... you.\"",
		],
		randomBadDying:[
			"\"Why... You... Ugh!\"",
			"\"Please... help... Ugh!\"",
			"\"Why... Ugh...\"",
			"\"Ugh!\"",
		],
		randomCorpse:[
			"Bloodstains are on the floor",
			"There is a corpse here",
			"You see a dead body",
		],
		randomOk:[
			"\"Let me handle this.\"",
			"\"Roger that.\"",
			"\"Understood.\"",
			"\"It's settled then.\""
		],
		randomConfusion:[
			"You are sitting in the middle of nowhere.",
			"You feel like you're floating into the void.",
			"\"Am... I... still in Stampadia?\"",
			"Being a {heroClass} makes no longer sense.",
			"You are doubting yourself. Are you still a {heroClass}?",
			"There is nothing here. Not even yourself.",
			"Is it all in your mind?"
		],
		randomFear:[
			"You feel the taste of blood in your mouth.",
			"You have the feeling that you will not be able to do it.",
			"This time it really is the end for you.",
			"Hopes leave you in an instant."
		],
		randomResurrection:[
			"\"The {villainName}... is BACK!\"",
			"\"Take my life, {villainName}! Gwaah!\"",
			"\"Too late, {heroClass}! I revived the {villainName}!\"",
			"\"The final step of my plan... is over!\"",
			"\"I... I improved the {villainName}!\""
		],
		randomZombieEntrance:[
			"\"Kill... me...\"",
			"\"I'm... suffering...\"",
			"\"What... am I?\"",
			"\"Please... kill me...\"",
			"\"My body... is...\"",
		],
		randomBrokenTeleport:[
			"There is an unfinished teleport to a secret room.",
			"Someone broke this secret room teleport.",
			"There is a secret room teleport that doesn't work well.",
			"Someone teared down this secret room teleport."
		],
		/*
		randomRightGuess:[
			"You have the feeling that everything has gone well.",
			"There is no doubt: you are in the right place.",
			"You're exactly where you expected to be.",
			"All in all you managed to get it this time too.",
			"Even if the room is dimly lit, you know it's the right one.",
			"Who would have thought you could make it this far?",
			"This is probably where you should have arrived."
		],
		*/
		
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
			"{loseHp:1}",
			"{loseGold:3}"
		],
		randomGoodLoot:[
			// [CODEX-Stuff] Item - The Heart Shard: Gain 1 HP.
			"an Heart Shard, {gainHp:1}",
			// [CODEX-Stuff] Item - The Star Pin: Gain 1 XP.
			"a Star Pin, {gainXp:1}",
			// [CODEX-Stuff] Item - The Bag Of Gold: Gain 3 gold.
			"a bag of gold, {gainGold:3}",
		],
		randomBadLoot:[
			"nothing",
			// [CODEX-Stuff] Trap - The Mimic: Lose 1 HP.
			"a Mimic, {loseHp:1}"
		],
		randomHighCost:[
			"{ifPayHp:2}",
			"{ifPayXp:3}",
			"{payEquip:equip-heroItem}"
		],
		randomHighPrize:[
			"{gainGold:5}",
			"{gainFullHp}"
		],

		// Fountains
		randomGoodFountain:[
			// [CODEX-Stuff] Fountain - The Clean Fountain: Gain 1 HP.
			"a clean fountain, {gainHp:1}",
			// [CODEX-Stuff] Fountain - The Fresh Fountain: Gain 2 HP.
			"a fresh fountain, {gainHp:2}",
		],
		randomBadFountain:[
			// [CODEX-Stuff] Fountain - The Muddy Fountain: Lose 1 HP.
			"a muddy fountain, {loseHp:1}",
			// [CODEX-Stuff] Fountain - The Black Fountain: Lose 2 HP.
			"a black fountain, {loseHp:2}",
		],

		// Room effects
		randomGoodRoomEffect:[
			// [CODEX-Stuff] Special room - The Blessed Room: Gain 1 HP.
			"This room is blessed, {gainHp:1}"
		],
		randomBadRoomEffect:[
			// [CODEX-Stuff] Special room - The Poisonous Room: Lose 1 HP.
			"Poisonous gas fills the room, {loseHp:1}"
		],

		// Beastcrafters
		getRandomCard:getRandomCard
	}
}