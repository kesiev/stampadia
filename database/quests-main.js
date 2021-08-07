/* exported loadQuestsMain */

function loadQuestsMain() {
	return [

		// [CODEX-Events] Main quest - The Missing Key: Find the key and beat the boss.
		{
			minRooms:4,
			adventureTitle:[
				"The Quest For The {villainName}",
				"The {villainName}'s Hideout",
				"The {villainName}'s Trap",
				"The {villainName}'s Plan",
				"The Dungeons Of The {villainName}",
				"The {heroClass}'s Revenge",
				"The {heroClass}'s Quest",
				"The Lost {placeName}"
			],
			steps:[
				[
					{
						id:"keyRoom",
						atPercentage:50,
						items:[{genericItem:"bossKey"},{id:"enemy",level:1}],
						roomDescriptions:[
							[ "{ifMoveOn:bossKey}{then}You got the {bossKey}, {markRoom:keyRoom}, {markItem:bossKey}" ]
						]
					},
					{
						id:"bossRoom",
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:keyRoom}{then}{roomIsEmpty}, {stopReading}",
								"{randomBossEntrance}, {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					roomDescriptions:[
						[
							"\"Please, hero! Kill the {villainName} and save the {placeName}!\"",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}"
						]
					]
				}
			]
		},

		// [CODEX-Events] Main quest - The Boss Battle: Beat the boss.
		{
			minRooms:4,
			adventureTitle:[
				"The End Of The {villainName}",
				"The {villainName}'s Bounty",
				"The {villainName}'s Den",
				"The {villainName}'s Revenge",
				"The Battle Of The {villainName}",
				"To The Rescue Of The {goodGuyName}",
				"The {heroClass}'s Final Battle",
				"The {villainName} And The {goodGuyName}",
				"The {goodGuyName} And The {villainName}",
				"The Cursed {placeName}",
				"The {villainName}'s {placeName}",

			],
			steps:[
				[
					{
						id:"bossRoom",
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[
							[ "\"The {goodGuyName} will die... and you with him!\", {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}" ]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					roomDescriptions:[
						[
							"\"Please, hero! You're the only one that can stop the {villainName}!\"",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}"
						]
					]
				}
			]
		},
		
		// [CODEX-Events] Main quest - The Gang: beat a sequence of enemies.
		{
			minRooms:3,
			adventureTitle:[
				"The {placeName}'s {villainName} Gang",
				"The {goodGuyName} Deception",
				"The {heroClass}'s Expedition",
				"The {placeName} Liberation",
				"The {villainName} Trail",
				"The Reclaimed {placeName}",
				"The {heroClass}'s Harvest",
			],
			steps:[
				[
					{
						id:"enemy1room",
						atPercentage:20,
						items:[{id:"enemy",level:0,ignoreXp:true}],
						roomDescriptions:[
							[
								"\"We will stop you at any cost!\"",
								"{ifNoFoes}{then}\"I've to warn... the {villainName}\",{markRoom:enemy1room}"
							]
						]
					},
					{
						id:"enemy2room",
						atPercentage:100,
						items:[{id:"enemy",level:1,ignoreXp:true}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:enemy1room}{then}You feel watched, {roomIsEmpty}, {stopReading}",
								"{ifNoFoes}{then}\"Wrong move, bwahahah!\", {markRoom:enemy2room}"
							]
						]
					},
					{
						id:"enemy3room",
						atPercentage:40,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:enemy2room}{then}{roomIsEmpty}, {stopReading}",
								"\"You're wasting time. The {placeName} is mine!\", {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					roomDescriptions:[
						[
							"\"Sir, we've to stop the {villainName} forces!\"",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}"
						]
					]
				}
			]
		},

		// [CODEX-Events] Main quest - The Curse: Break the spell and kill the bad guy.
		{
			minRooms:4,
			adventureTitle:[
				"The {villainName} Deception",
				"The {goodGuyName}'s Curse",
				"The {heroClass}'s Dilemma",
				"The {placeName} Ritual",
				"The Cursed {placeName}",
				"The {goodGuyName}'s Murderer",
				"The {goodGuyName} Slayer",
				"The {heroClass}'s Murder",
				"The {goodGuyName} Versus the {heroClass}",
				"The {villainName}'s Ritual",				
			],
			steps:[
				[
					{
						id:"spellRoom",
						atPercentage:55,
						items:[{id:"enemy",level:1}],						
						roomDescriptions:[
							[
								"A sorcerer is holding a ritual.",
								"{ifNoFoes}{then}{hide}The ritual has been interrupted, {markRoom:spellRoom}"
							]
						]
					},
					{
						id:"bossRoom",
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[
							[
								"\"I'm the {goodGuyName}. Can't control... Help, {heroClass}!\", {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					roomDescriptions:[
						[
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{and}{ifRoomIsMarked:spellRoom}{then}You did it!{hide}{stopReading}",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}You did it!{hide}but sacrified the {goodGuyName}'s life.",
						]
					]
				}
			]
		},

		// [CODEX-Events] Main quest - The Broken Key: Collect the key parts and beat the boss.
		{
			minRooms:4,
			adventureTitle:[
				"The {bossKey} Hunt",
				"The Shattered {bossKey}",
				"The {bossKey}",
				"The {bossKey} Of The {placeName}",
				"The {bossKey} Of The {villainName}",
				"The Shattered {villainName}",
				"The Quest For The {bossKey}",
				"The {heroClass}'s {bossKey}",
			],
			steps:[
				[
					{
						id:"keyRoom1",
						atPercentage:1,
						items:[{genericItem:"bossKey"}],
						roomDescriptions:[
							[ "{ifMoveOn:bossKey}{then}You got a {bossKey} part, {markRoom:keyRoom1}, {markItem:bossKey}" ]
						]
					},
					{
						id:"keyRoom2",
						atPercentage:25,
						items:[{genericItem:"bossKey"},{id:"enemy",level:0}],
						roomDescriptions:[
							[ "{ifMoveOn:bossKey}{then}You got a {bossKey} part, {markRoom:keyRoom2}, {markItem:bossKey}" ]
						]
					},
					{
						id:"keyRoom3",
						atPercentage:60,
						items:[{genericItem:"bossKey"},{id:"enemy",level:1}],
						roomDescriptions:[
							[ "{ifMoveOn:bossKey}{then}You got a {bossKey} part, {markRoom:keyRoom3}, {markItem:bossKey}" ]
						]
					},
					{
						id:"bossRoom",
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:keyRoom1}{or}{ifRoomIsNotMarked:keyRoom2}{or}{ifRoomIsNotMarked:keyRoom3}{then}{roomIsEmpty}, {stopReading}",
								"{randomBossEntrance}, {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					roomDescriptions:[
						[
							"\"Please, hero! Kill the {villainName} and save the {placeName}!\"",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}"
						]
					]
				}
			]
		},

		// [CODEX-Events] Main quest - The Lost Item: Return an item to NPC and unlock the boss and fight.
		{
			minRooms:4,
			adventureTitle:[
				"The Lost {documentName}",
				"The {documentName}",
				"The {explorerName}",
				"The Missing {explorerName}",
				"The {placeName} Mystery"
			],
			steps:[
				[
					{
						id:"npcRoom",
						atPercentage:10,
						items:[{genericItem:"npc"}],
						roomDescriptions:[
							[
								"{ifMoveOn:npc}{then}{explorerName}: 'I'm looking for the lost {documentName}! Please, help!'",
								"{ifMoveOn:npc}{and}{ifRoomIsMarked:itemRoom}{then}{hide}'Oh, no! It says the {villainName} is hiding here!', {markRoom:npcRoom}"
							]
						]
					},
					{
						id:"itemRoom",
						atPercentage:60,
						items:[{genericItem:"item"},{id:"enemy",level:1}],
						roomDescriptions:[
							[ "{ifMoveOn:item}{and}{ifRoomIsNotMarked:itemRoom}{then}You've found the {documentName}, {markRoom:itemRoom}, {markItem:item}" ]
						]
					},
					{
						id:"bossRoom",
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:npcRoom}{then}{roomIsEmpty}, {stopReading}",
								"{randomBossEntrance}, {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					roomDescriptions:[
						[
							"\"The {explorerName} disappeared days ago. We're worried...\"",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}"
						]
					]
				}
			]
		},

		// [CODEX-Events] Main quest - The Kidnapping: Fight the boss, free the kidnapped, and return it.
		{
			minRooms:3,
			adventureTitle:[
				"The Kidnapped {goodGuyRelativeName}",
				"The {goodGuyName}'s {goodGuyRelativeName}",
				"The Broken {goodGuyName}",
				"The {goodGuyName}'s Tears",
				"The Imprisoned {goodGuyRelativeName}",
				"The {heroClass}'s Rescue"
			],
			steps:[
				[
					{
						id:"goodguyroom",
						atPercentage:20,
						items:[{genericItem:"goodguy"}],
						roomDescriptions:[
							[
								"{ifMoveOn:goodguy}{then}{goodGuyName}: {randomSaveRelativeRequest}",
								"{ifMoveOn:goodguy}{and}{ifRoomIsMarked:goodguyroom}{then}{goodGuyName}: {randomThankYou}, {markRoom:startingRoom}, {markItem:goodguy}"
							]
						]
					},
					{
						id:"bossRoom",
						atPercentage:40,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[
							[
								"{randomBossRevenge}, {noEscape}",
								"{ifNoFoes}{then}{hide}You rescued the {goodGuyName}'s {goodGuyRelativeName}, {markRoom:goodguyroom}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					roomDescriptions:[
						[
							"\"The {goodGuyName} ran to the {placeName} alone... Why?\"",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}"
						]
					]
				}
			]
		},
	]
}