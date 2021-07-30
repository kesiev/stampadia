/* exported loadQuestsEasyFillers loadQuestsMediumFillers loadQuestsHardFillers */

function loadQuestsEasyFillers() {
	return [

		// Two level 0 enemies
		{
			steps:[[{id:"spawn",atPercentage:100,roomDescriptions:[
				[ "\"Y...you shall not pass!\"" ],
				[ "\"You're outnumbered! Surrender now!\"" ],
				[ "\"Let's kill him! The boss will give us a promotion!\""],
				[ "\"Finally some training!\"" ]		
			],items:[{id:"enemy",level:0},{id:"enemy",level:0}]}]]
		},

		// One level 1 enemy
		{
			steps:[[{id:"spawn",atPercentage:100,roomDescriptions:[
				[ "\"Hey you! Stop there!\"" ],
				[ "\"I'll avenge my brothers!\"" ],
				[ "\"Give me all your money!\"" ],
				[ "\"Yikes!\""],
			],items:[{id:"enemy",level:1}]}]]
		}				
	];
}

function loadQuestsMediumFillers() {
	return [

		// Two level 1 enemies
		{
			minRooms:2,
			steps:[[{id:"spawn",atPercentage:100,roomDescriptions:[
				[ "\"Any last word, fool?\"" ],
				[ "\"It's time to die, thief!\"" ],
				[ "\"This may be a challenge for us! Let's do our best!\""],
			],items:[{id:"enemy",level:1},{id:"enemy",level:1}]}]]
		},

		// One level 2 enemy
		{
			minRooms:2,
			steps:[[{id:"spawn",atPercentage:100,roomDescriptions:[
				[ "\"Your quest ends here!\""],
				[ "\"Raaawwwrrr!\"" ],
				[ "\"Come here, wimp!\"" ]
			],items:[{id:"enemy",level:2}]}]]
		}
	];
}

function loadQuestsHardFillers() {
	return [

		// Two level 2 enemies
		{
			minRooms:2,
			steps:[[{id:"spawn",atPercentage:100,roomDescriptions:[
				[ "\"Let's get him out, guys!\"" ],
				[ "\"Let's tear this guy apart!\"" ],
				[ "\"I want his head on a pike!\"" ]
			],items:[{id:"enemy",level:2},{id:"enemy",level:2}]}]]
		},
		
		// One Level 3 enemy
		{
			minRooms:2,
			steps:[[{id:"spawn",atPercentage:100,roomDescriptions:[
				[ "\"Your bones taste good. Give me bones.\"" ],
				[ "\"You woke me from my sleep. Now you will die.\"" ],
				[ "\"You should be my lunch. Come closer!\"" ]
			],items:[{id:"enemy",level:3}]}]]
		}
	];
}