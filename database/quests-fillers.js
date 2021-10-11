/* exported loadQuestsEasyFillers loadQuestsMediumFillers loadQuestsHardFillers */

function loadQuestsEasyFillers() {
	return [

		{
			id:"[CODEX-Events] Filler (easy) - The Weak: One level 0 enemy.",
			steps:[[{id:"spawn",atPercentage:1,roomDescriptions:[
				[ "\"Hey, the {heroClass} is here! Help!\""],
				[ "\"Oh... no!\""],
				[ "\"S... step away!\""],
				[ "\"Argh!\""],
			],items:[{id:"enemy",level:0}]}]]
		},

		{
			id:"[CODEX-Events] Filler (easy) - The Pair: Two level 0 enemies.",
			steps:[[{id:"spawn",atPercentage:1,roomDescriptions:[
				[ "\"Y...you shall not pass!\"" ],
				[ "\"You're outnumbered! Surrender now!\"" ],
				[ "\"Let's kill! The boss will give us a promotion!\""],
				[ "\"Finally some training!\"" ]		
			],items:[{id:"enemy",level:0},{id:"enemy",level:0}]}]]
		},

		{
			id:"[CODEX-Events] Filler (easy) - The One (1): One level 1 enemy.",
			ignoreForHeroTags:["weak"],
			steps:[[{id:"spawn",atPercentage:1,roomDescriptions:[
				[ "\"Hey you! Stop there!\"" ],
				[ "\"I'll avenge my brothers!\"" ],
				[ "\"Give me all your money!\"" ],
				[ "\"Yikes!\""],
			],items:[{id:"enemy",level:1}]}]]
		},
		{
			id:"[CODEX-Events] Filler (easy) - The One (2): One level 1 enemy.",
			ignoreForHeroTags:["weak"],
			steps:[[{id:"spawn",atPercentage:1,roomDescriptions:[
				[ "\"Don't move a muscle, {heroClass}!\"" ],
				[ "\"Damn {heroClass}! You killed my sister!\"" ],
				[ "\"Hey, {heroClass}! I recognize you!\"" ],
				[ "\"Hands up, {heroClass}!\""],
			],items:[{id:"enemy",level:1}]}]]
		}
	];
}

function loadQuestsMediumFillers() {
	return [

		{
			id:"[CODEX-Events] Filler (medium) - The Swarm: Three level 0 enemy.",
			steps:[[{id:"spawn",atPercentage:50,roomDescriptions:[
				[ "\"We want your items! We want your life!\""],
				[ "\"What do you want? What do you want?\""],
				[ "\"Tee-hee! We are going to kill you!\""],
			],items:[{id:"enemy",level:0},{id:"enemy",level:0},{id:"enemy",level:0}]}]]
		},

		{
			id:"[CODEX-Events] Filler (medium) - The Pair: Two level 1 enemies.",
			steps:[[{id:"spawn",atPercentage:50,roomDescriptions:[
				[ "\"Any last word, fool?\"" ],
				[ "\"It's time to die, thief!\"" ],
				[ "\"This may be a challenge for us! Let's do our best!\""],
			],items:[{id:"enemy",level:1},{id:"enemy",level:1}]}]]
		},

		{
			id:"[CODEX-Events] Filler (medium) - The One (1): One level 2 enemy.",
			ignoreForHeroTags:["weak"],
			steps:[[{id:"spawn",atPercentage:50,roomDescriptions:[
				[ "\"Your quest ends here!\""],
				[ "\"Raaawwwrrr!\"" ],
				[ "\"Come here, wimp!\"" ]
			],items:[{id:"enemy",level:2}]}]]
		},
		{
			id:"[CODEX-Events] Filler (medium) - The One (2): One level 2 enemy.",
			ignoreForHeroTags:["weak"],
			steps:[[{id:"spawn",atPercentage:50,roomDescriptions:[
				[ "\"I'm sorry for you, {heroClass}!\""],
				[ "\"I'll mince you up, {heroClass}!\"" ],
				[ "\"Say goodbye, {heroClass}!\"" ]
			],items:[{id:"enemy",level:2}]}]]
		}
	];
}

function loadQuestsHardFillers() {
	return [

		{
			id:"[CODEX-Events] Filler (medium) - The One: One level 2 enemy.",
			onlyForHeroTags:["weak"],
			steps:[[{id:"spawn",atPercentage:50,roomDescriptions:[
				[ "\"I'm sorry for you, {heroClass}!\""],
				[ "\"I'll mince you up, {heroClass}!\"" ],
				[ "\"Say goodbye, {heroClass}!\"" ]
			],items:[{id:"enemy",level:2}]}]]
		},
		{
			id:"[CODEX-Events] Filler (hard) - The Weak Pair: Two level 1 enemies.",
			steps:[[{id:"spawn",atPercentage:50,roomDescriptions:[
				[ "\"See you in hell, {heroClass}!\"" ],
				[ "\"Farewell, {heroClass}!\"" ],
				[ "\"End of the line, {heroClass}!\"" ],
			],items:[{id:"enemy",level:1},{id:"enemy",level:1}]}]]
		},
		{
			id:"[CODEX-Events] Filler (hard) - The Strong Pair: Two level 2 enemies.",
			steps:[[{id:"spawn",atPercentage:80,roomDescriptions:[
				[ "\"Let's get it on, guys!\"" ],
				[ "\"Let's tear it up!\"" ],
				[ "\"I want that head on a pike!\"" ]
			],items:[{id:"enemy",level:2},{id:"enemy",level:2}]}]]
		}

	];
}

