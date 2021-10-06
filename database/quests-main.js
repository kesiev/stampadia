/* exported loadQuestsMain */

function loadQuestsMain() {

	return [

		{
			id:"[CODEX-Events] Main quest - The Missing Key: Find the key and beat the boss.",
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
						atPercentage:{from:50,to:90},
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

		{
			id:"[CODEX-Events] Main quest - The Boss Battle: Beat the boss.",
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
		
		{
			id:"[CODEX-Events] Main quest - The Gang: beat a sequence of enemies.",
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
						atPercentage:{from:20,to:90},
						items:[{id:"enemy",level:0}],
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
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:enemy1room}{then}You feel watched, {roomIsEmpty}, {stopReading}",
								"{ifNoFoes}{then}\"Wrong move, bwahahah!\", {markRoom:enemy2room}"
							]
						]
					},
					{
						id:"enemy3room",
						atPercentage:{from:20,to:90},
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

		{
			id:"[CODEX-Events] Main quest - The Curse: Break the spell and kill the bad guy.",
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

		{
			id:"[CODEX-Events] Main quest - The Broken Key: Collect the key parts and beat the boss.",
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

		{
			id:"[CODEX-Events] Main quest - The Lost Item: Return an item to NPC and unlock the boss and fight.",
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
						atPercentage:{from:60,to:90},
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

		{
			id:"[CODEX-Events] Main quest - The Kidnapping: Fight the boss, free the kidnapped, and return it.",
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
						atPercentage:{from:20,to:30},
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
						atPercentage:100,
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

		{
			id:"[CODEX-Events] Main quest - The Escort: Escort the good guy near the boss and fight.",
			minRooms:4,
			adventureTitle:[
				"The {goodGuyName}'s Escort",
				"The Running {goodGuyName}",
				"The Escort {heroClass}",
				"The {villainName} Traces",
				"The {villainName} Hunt",
				"The Chasing {goodGuyName}",
				"The Wanted {villainName}",
				"The {goodGuyName} Run",
			],
			steps:[
				[
					{
						id:"step1",
						atPercentage:20,
						items:[{genericItem:"goodguy"},{id:"enemy",level:0}],
						roomDescriptions:[
							[
								"{ifEnterRoom}{and}{ifGoldSpentInFifth:2-5}{then}{markItem:goodguy}, {randomGoodGuyLost}",
								"{ifMoveOn:goodguy}{then}{goodGuyName}: {randomGoodGuyLongFollowMe}, {markItem:goodguy}, {markRoom:step1}",
							]
						]
					},
					{
						id:"step2",
						atPercentage:40,
						items:[{genericItem:"goodguy"},{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{ifEnterRoom}{and}{ifGoldSpentInFifth:4-5}{then}{markItem:goodguy}, {randomGoodGuyLost}",
								"{ifMoveOn:goodguy}{and}{ifRoomIsMarked:step1}{and}{ifGoldSpentInFifth:2-3}{then}{randomFollowMe}, {markItem:goodguy}, {markRoom:step2}",
							]
						]
					},
					{
						id:"step3",
						atPercentage:60,
						items:[{genericItem:"goodguy"}],
						roomDescriptions:[
							[
								"{ifEnterRoom}{and}{ifGoldSpentInFifth:4-5}{then}You hear noises coming from nearby, {markRoom:bossRoom}",
								"{ifMoveOn:goodguy}{and}{ifRoomIsMarked:step2}{and}{ifGoldSpentInFifth:4-5}{then}{randomVillainFound}, {markRoom:step3}",
							]
						]
					},
					{
						id:"bossRoom",
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:bossRoom}{then}{roomIsEmpty}, {stopReading}",
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
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{and}{ifRoomIsNotMarked:step3}{then}{hide}but the {goodGuyName} got lost in the {placeName}."
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The Moral Compass: Do good or bad things and trigger a different ending.",
			minRooms:4,
			adventureTitle:[
				"The End Of The {goodGuyName}",
				"The {heroClass}'s Destiny",
				"The {heroClass}'s Last Quest",
				"The {goodGuyName}'s Last Words",
				"The {heroClass}'s Destiny",
				"The {heroClass}'s Resolve",
				"The Dying {goodGuyName}",
				"The {heroClass}'s Heart",
				"The Last {heroClass}",
				"The Last {goodGuyName}",
			],
			steps:[
				[
					{
						id:"step1",
						atPercentage:20,
						items:[{genericItem:"slaver"},{id:"enemy",level:0}],
						roomDescriptions:[ // Pay good, fight bad. Mark is good.
							[
								"{ifEnterRoom}{and}{ifPayGold:3}{then}Slaver: {randomSlaverBuy}, {markItem:slaver}, {markRoom:step1}",
								"{ifEnterRoom}{and}{ifRoomIsMarked:step1}{then}{roomIsEmpty}",
							]
						]
					},
					{
						id:"step2",
						atPercentage:40,
						items:[{genericItem:"mobster"},{id:"enemy",level:1}],
						roomDescriptions:[ // Pay bad, fight good. Mark is bad.
							[
								"{ifEnterRoom}{and}{ifPayGold:3}{then}Mobster: {randomMobsterPay}, {markItem:mobster}, {markRoom:step2}",
								"{ifEnterRoom}{and}{ifRoomIsMarked:step2}{then}{roomIsEmpty}, {markItem:mobster}",
							]
						]
					},
					{
						id:"step3",
						atPercentage:80,
						items:[{genericItem:"goodguy"}],
						roomDescriptions:[ // Pay good, Pay bad. Mark is bad.
							[
								"{ifMoveOn:goodguy}{and}{ifPayHp:2}{and}\"Live!\"{then}{goodGuyName}: {randomGoodDying}, {markItem:goodguy}, {markRoom:bossRoom}",
								"{ifMoveOn:goodguy}{and}{ifPayXp:2}{and}\"...\"{then}{goodGuyName}: {randomBadDying}, {markItem:goodguy}, {markRoom:step3}",
							]
						]
					},
					{
						id:"bossRoom",
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[ // Mark is good.
							[
								"{randomBossEntrance}, {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}",
								"{ifNoFoes}{and}{ifRoomIsNotMarked:step1}{and}{ifRoomIsMarked:step2}{and}{ifRoomIsMarked:step3}{then}{hide}You sit on the {villainName} throne. The end."
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
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{and}{ifRoomIsMarked:step1}{and}{ifRoomIsNotMarked:step2}{and}{ifRoomIsMarked:bossRoom}{hide}You sit on the Stampadia thorne.",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}",
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The Twins: Fight a 2-stages boss.",
			minRooms:4,
			adventureTitle:[
				"The {villainName} Twins",
				"The {villainName}'s Final Form",
				"The {villainName} Double",
				"The {heroClass}'s Endurance",
				"The {villainName}'s Trick",
				"The {villainName}'s Transformation",
			],
			steps:[
				[
					{
						id:"bossRoom1",
						atPercentage:99,
						items:[{id:"enemy",level:1},{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{randomTwinBossEntrance}, {noEscape}",
								"{ifNoFoes}{then}{hide}{randomFinalFormAnnounce}, {markRoom:bossRoom2}, {teleportToRoom:bossRoom2}"
							]
						]
					},
					{
						id:"bossRoom2",
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:bossRoom2}{then}{roomIsEmpty}, {stopReading}",
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
							"\"The {villainName} Twins are keeping the {placeName} on their knees!\"",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}",
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The Suicide Mission: Fight 2 bosses at once, or...",
			minRooms:4,
			adventureTitle:[
				"The {villainName} Victory",
				"The {epicWeapon} {epicWeaponPart}",
				"The {epicWeaponPart}",
				"The Lost {epicWeaponPart}",
				"The {epicWeapon} Forge",
				"The {heroClass} Despair",
				"The {heroClass} Defeat",
				"The {epicWeapon}",				
			],
			steps:[
				[
					{
						id:"part1",
						atPercentage:{from:99,to:50},
						items:[{id:"enemy",level:2}],
						roomDescriptions:[
							[
								"{ifNoFoes}{and}{ifRoomIsNotMarked:part1}{then}You found a {epicWeapon} {epicWeaponPart}, {markRoom:part1}"
							]
						]
					},
					{
						id:"part2",
						atPercentage:{from:30,to:49},
						items:[{id:"enemy",level:1},{genericItem:"part"}],
						roomDescriptions:[
							[
								"{ifMoveOn:part}{then}You found a {epicWeapon} {epicWeaponPart}, {markItem:part}, {markRoom:part2}"
							]
						]
					},
					{
						id:"forge",
						atPercentage:{from:1,to:99},
						equipment:[{id:"epicWeapon"}],
						items:[{genericItem:"blacksmith"}],
						roomDescriptions:[
							[
								"A blacksmith is working tirelessly on a sword.",
								"{ifRoomIsMarked:part1}{and}{ifRoomIsMarked:part2}{then}\"Done! It's my masterpiece!\"{hide}{getEquip:equip-epicWeapon}, {markItem:blacksmith}"
							]
						]
					},
					{
						id:"bossRoom",
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true},{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[
							[
								"{randomFear}",
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
							"\"You'll never get out alive! {heroClass}! Please, don't go!\"",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}",
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The Great Old Ones: Beat the boss before being corrupted by madness.",
			minRooms:4,
			adventureTitle:[
				"The {heroClass}'s Madness",
				"The {heroClass} Mind",
				"The {placeName} Gods",
				"The {heroClass}'s Insanity",
				"The Madness Of A {heroClass}",
				"The Depths Of The {placeName}",
				"The {placeName}'s Book",
				"The Insane {heroClass}",
			],
			steps:[
				[
					{
						id:"bookRoom",
						atPercentage:1,
						equipment:[{id:"book"}],
						items:[{genericItem:"book"}],
						roomDescriptions:[
							[
								"{ifMoveOn:book}{then}You read: \"{randomBookQuote}\", {getEquip:equip-book}, {markRoom:bookRoom}, {markItem:book}"
							]
						]
					},


					{
						id:"enlightenment",
						atPercentage:80,
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{ifRoomIsMarked:bookRoom}{and}{ifRoomIsNotMarked:enlightenment}{then}Now you know the Truth, {gainHp:1}, {markRoom:enlightenment}"
							]
						]
					},
					{
						id:"abyss",
						atPercentage:99,
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:bookRoom}{then}You hear something calling, {roomIsEmpty}, {stopReading}",
								"{ifKilledLastFoe}{then}{teleportToRoom:bossRoom}"
							]
						]
					},
					{
						id:"bossRoom",
						isHiddenRoom:true,
						atPercentage:{from:1,to:99},
						items:[{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[
							[
								"{ifEveryBattleRoundStarts}{then}{rollDie}{range:1-1} {loseXp:2}, {range:2-5} {nothing}, {range:6-6} {gainHp:1}",
								"{ifNoFoes}{then}\"Your mind is still mine\", {markRoom:startingRoom}, {teleportToRoom:abyss}"
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
							"As soon as you arrive to the {placeName} your head feels heavier.",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}",
						]
					]
				}
			]
		},
	]
}