/* exported loadQuestsEasyFillers loadQuestsMediumFillers loadQuestsHardFillers */

function loadQuestsEasyFillers() {
	return [

		// [CODEX-Events] Filler (easy) - The Weak: One level 0 enemy.
		{
			steps:[[{id:"spawn",atPercentage:1,roomDescriptions:[
				[ "\"Hey, the {heroClass} is here! Help!\""],
				[ "\"Oh... no!\""],
				[ "\"S... step away!\""],
				[ "\"Argh!\""],
			],items:[{id:"enemy",level:0}]}]]
		},

		// [CODEX-Events] Filler (easy) - The Pair: Two level 0 enemies.
		{
			steps:[[{id:"spawn",atPercentage:1,roomDescriptions:[
				[ "\"Y...you shall not pass!\"" ],
				[ "\"You're outnumbered! Surrender now!\"" ],
				[ "\"Let's kill him! The boss will give us a promotion!\""],
				[ "\"Finally some training!\"" ]		
			],items:[{id:"enemy",level:0},{id:"enemy",level:0}]}]]
		},

		// [CODEX-Events] Filler (easy) - The One: One level 1 enemy.
		{
			steps:[[{id:"spawn",atPercentage:1,roomDescriptions:[
				[ "\"Hey you! Stop there!\"" ],
				[ "\"I'll avenge my brothers!\"" ],
				[ "\"Give me all your money!\"" ],
				[ "\"Yikes!\""],
			],items:[{id:"enemy",level:1}]}]]
		},
		{
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

		// [CODEX-Events] Filler (medium) - The Swarm: Three level 0 enemy.
		{
			steps:[[{id:"spawn",atPercentage:50,roomDescriptions:[
				[ "\"We want your items! We want your life!\""],
				[ "\"What do you want? What do you want?\""],
				[ "\"Tee-hee! We are going to kill you!\""],
			],items:[{id:"enemy",level:0},{id:"enemy",level:0},{id:"enemy",level:0}]}]]
		},

		// [CODEX-Events] Filler (medium) - The Pair: Two level 1 enemies.
		{
			steps:[[{id:"spawn",atPercentage:50,roomDescriptions:[
				[ "\"Any last word, fool?\"" ],
				[ "\"It's time to die, thief!\"" ],
				[ "\"This may be a challenge for us! Let's do our best!\""],
			],items:[{id:"enemy",level:1},{id:"enemy",level:1}]}]]
		},

		// [CODEX-Events] Filler (medium) - The One: One level 2 enemy.
		{
			steps:[[{id:"spawn",atPercentage:50,roomDescriptions:[
				[ "\"Your quest ends here!\""],
				[ "\"Raaawwwrrr!\"" ],
				[ "\"Come here, wimp!\"" ]
			],items:[{id:"enemy",level:2}]}]]
		},
		{
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

		// [CODEX-Events] Filler (hard) - The Pair: Two level 2 enemies.
		{
			steps:[[{id:"spawn",atPercentage:80,roomDescriptions:[
				[ "\"Let's get him out, guys!\"" ],
				[ "\"Let's tear this guy apart!\"" ],
				[ "\"I want his head on a pike!\"" ]
			],items:[{id:"enemy",level:2},{id:"enemy",level:2}]}]]
		},
		
		// [CODEX-Events] Filler (hard) - The One: One Level 3 enemy.
		{
			steps:[[{id:"spawn",atPercentage:80,roomDescriptions:[
				[ "\"Your bones taste good. Give me bones.\"" ],
				[ "\"You woke me from my sleep. Now you will die.\"" ],
				[ "\"You should be my lunch. Come closer!\"" ]
			],items:[{id:"enemy",level:3}]}]]
		}
	];
}