/* exported loadQuestsMain */

function loadQuestsMain(MODIFIERS) {

	let
		STARTINGROOMLABELS=["Beginning","Stairs","Enter","Exit"],
		BOSSROOMLABELS=[];

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
						labels:["Boss Key"],
						atPercentage:{from:50,to:90},
						items:[{genericItem:"bossKey"},{id:"enemy",level:1}],
						roomDescriptions:[
							[ "{ifMoveOn:bossKey}{then}You got the {bossKey}, {markRoom:keyRoom}, {markItem:bossKey}" ]
						]
					},
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
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
					labels:STARTINGROOMLABELS,
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
			minRooms:1,
			adventureTitle:[
				"The End Of The {villainName}",
				"The {villainName}'s Bounty",
				"The {villainName}'s Den",
				"The {villainName}'s Revenge",
				"The Battle Of The {villainName}",
				"To The Rescue Of The {goodGuyName}",
				"The {heroClass}'s Final Battle",
				"The {villainName} &amp; The {goodGuyName}",
				"The {goodGuyName} &amp; The {villainName}",
				"The Cursed {placeName}",
				"The {villainName}'s {placeName}",
			],
			steps:[
				[
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
						roomDescriptions:[
							[ "\"The {goodGuyName} will die... and so will you!\", {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}" ]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					labels:STARTINGROOMLABELS,
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
			id:"[CODEX-Events] Main quest - The Gang: Beat a sequence of enemies.",
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
						labels:["1st Encounter","One"],
						atPercentage:{from:20,to:90},
						items:[{id:"enemy",level:0}],
						roomDescriptions:[
							[
								"\"We will stop you at any cost!\"",
								"{ifKilledLastFoe}{then}\"I've to warn... the {villainName}\", {markRoom:enemy1room}"
							]
						]
					},
					{
						id:"enemy2room",
						labels:["2nd Encounter","Two"],
						atPercentage:100,
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:enemy1room}{then}You feel watched, {roomIsEmpty}, {stopReading}",
								"{ifKilledLastFoe}{then}\"Wrong move, bwahahah!\", {markRoom:enemy2room}"
							]
						]
					},
					{
						id:"bossRoom",
						labels:["3rd Encounter","Three"],
						atPercentage:{from:20,to:90},
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
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
					labes:STARTINGROOMLABELS,
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
			id:"[CODEX-Events] Main quest - The Spell: Break the spell and kill the bad guy.",
			minRooms:4,
			adventureTitle:[
				"The {villainName} Deception",
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
						labels:["Ritual"],
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
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
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
					labels:STARTINGROOMLABELS,
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
				"The {villainName}'s {bossKey}",
				"The Shattered {villainName}",
				"The Quest For The {bossKey}",
				"The {heroClass}'s {bossKey}",
			],
			steps:[
				[
					{
						id:"keyRoom1",
						labels:["Near Part"],
						atPercentage:1,
						items:[{genericItem:"bossKey"}],
						roomDescriptions:[
							[ "{ifMoveOn:bossKey}{then}You got a {bossKey} part, {markRoom:keyRoom1}, {markItem:bossKey}" ]
						]
					},
					{
						id:"keyRoom2",
						labels:["Middle Part"],
						atPercentage:25,
						items:[{genericItem:"bossKey"},{id:"enemy",level:0}],
						roomDescriptions:[
							[ "{ifMoveOn:bossKey}{then}You got a {bossKey} part, {markRoom:keyRoom2}, {markItem:bossKey}" ]
						]
					},
					{
						id:"keyRoom3",
						labels:["Far Part"],
						atPercentage:60,
						items:[{genericItem:"bossKey"},{id:"enemy",level:1}],
						roomDescriptions:[
							[ "{ifMoveOn:bossKey}{then}You got a {bossKey} part, {markRoom:keyRoom3}, {markItem:bossKey}" ]
						]
					},
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
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
					labels:STARTINGROOMLABELS,
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
						labels:["Explorer"],
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
						labels:["Lost","Found"],
						atPercentage:{from:60,to:90},
						items:[{genericItem:"item"},{id:"enemy",level:1}],
						roomDescriptions:[
							[ "{ifMoveOn:item}{and}{ifRoomIsNotMarked:itemRoom}{then}You've found the {documentName}, {markRoom:itemRoom}, {markItem:item}" ]
						]
					},
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
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
					labels:STARTINGROOMLABELS,
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
						labels:["{goodGuyName}"], // TODO testa
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
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
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
					labels:STARTINGROOMLABELS,
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
						labels:["1st Spot"],
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
						labels:["2nd Spot"],
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
						labels:["3rd Spot","Last Spot"],
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
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
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
					labels:STARTINGROOMLABELS,
					roomDescriptions:[
						[
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{and}{ifRoomIsNotMarked:step3}{then}{hide}but the {goodGuyName} is lost in the {placeName}."
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
						labels:["Slave","Slavery","Saving"],
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
						labels:["Mob","Mobbing"],
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
						labels:["Dead","Goodbye"],
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
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
						roomDescriptions:[ // Mark is good.
							[
								"{randomBossEntrance}, {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}",
								"{ifNoFoes}{and}{ifRoomIsNotMarked:step1}{and}{ifRoomIsMarked:step2}{and}{ifRoomIsMarked:step3}{then}{hide}You sit on the {villainName} throne. End."
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					labels:STARTINGROOMLABELS,
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
						labels:[],
						atPercentage:99,
						items:[{id:"enemy",level:1},{id:"enemy",level:1}],
						isExclusive:true,
						roomDescriptions:[
							[
								"{randomTwinBossEntrance}, {noEscape}",
								"{ifNoFoes}{then}{hide}{randomFinalFormAnnounce}, {markRoom:bossRoom}, {teleportToRoom:bossRoom}"
							]
						]
					},
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
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
					labels:BOSSROOMLABELS,
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
						labels:["Far part"],
						atPercentage:{from:99,to:50},
						items:[{id:"enemy",level:2}],
						roomDescriptions:[
							[
								"{ifKilledLastFoe}{and}{ifRoomIsNotMarked:part1}{then}You found a {epicWeapon} {epicWeaponPart}, {markRoom:part1}"
							]
						]
					},
					{
						id:"part2",
						labels:["Near part"],
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
						labels:["Forging","Hammering"],
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
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true},{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
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
					labels:STARTINGROOMLABELS,
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
						labels:["Book","Pages"],
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
						labels:["Enlightenment"],
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
						labels:["Abyss","Call","Calling"],
						atPercentage:99,
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:bookRoom}{then}You hear something calling, {roomIsEmpty}, {stopReading}",
								"{ifNoFoes}{then}{teleportToRoom:bossRoom}"
							]
						]
					},
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						isHiddenRoom:true,
						atPercentage:{from:1,to:99},
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
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
					labels:STARTINGROOMLABELS,
					roomDescriptions:[
						[
							"As soon as you arrive to the {placeName} your head feels heavier.",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}",
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The Necromancer: Someone is trying to bring the evil back.",
			minRooms:4,
			adventureTitle:[
				"The Resurrection Of The {villainName}",
				"The Mad {madScientistName}",
				"The {madScientistName}'s {villainName}",
				"The Return Of The {villainName}",
				"The Undead {villainName}",
				"The {madScientistName} Last Experiment",
				"The {madScientistName} Experiment",
			],
			steps:[
				[
					{
						id:"necromancer",
						labels:["Resurrection","Mad"],
						atPercentage:98,
						items:[{id:"enemy",level:2}],
						roomDescriptions:[
							[
								"{ifKilledLastFoe}{then}{madScientistName}: {randomResurrection}, {markRoom:bossRoom}"
							]
						]
					},
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:99,
						items:[{id:"enemy",level:4,ignoreXp:true},{id:"enemy",level:4,ignoreXp:true}],
						isExclusive:true,
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:bossRoom}{then}{roomIsEmpty}, {stopReading}",
								"{randomZombieEntrance}, {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					labels:BOSSROOMLABELS,
					roomDescriptions:[
						[
							"The {madScientistName} is trying to bring the {villainName} back!",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}",
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The Enchantment: Find an NPC lost in the dungeons to make your final battle easier.",
			minRooms:4,
			adventureTitle:[
				"The {heroClass}'s Trinket",
				"The {placeName} Treasure",
				"The {heroClass}'s Weapon",
				"The Weakness Of The {villainName}",
				"The {heroClass} Last Hope",
				"The {placeName}'s Gift",
				"The {goodGuyName}'s Gift",
			],
			steps:[
				// [CODEX-Stuff] Item - Pendant: Scares a boss.
				{trinket:"Pendant",effect:"{applyModifierOnRoomMarked:scared.enemy,npcRoom}"},
				// [CODEX-Stuff] Item - Boots: Can slow down a boss.
				{trinket:"Boots",effect:"{applyModifierOnRoomMarked:crippled.enemy,npcRoom}"},
				// [CODEX-Stuff] Item - Diamond: Can blind a boss.
				{trinket:"Diamond",effect:"{applyModifierOnRoomMarked:blind.enemy,npcRoom}"},
				// [CODEX-Stuff] Item - Necklace: Can stun a boss.
				{trinket:"Necklace",effect:"{applyModifierOnRoomMarked:stunned.enemy,npcRoom}"},

				// [CODEX-Stuff] Item - Shawl: Prevents the boss crippled effect.
				{trinket:"Shawl",effect:"{applyModifierOnRoomNotMarked:crippled.hero,npcRoom}"},
				// [CODEX-Stuff] Item - Belt: Prevents the boss fear effect.
				{trinket:"Belt",effect:"{applyModifierOnRoomNotMarked:scared.hero,npcRoom}"},
				// [CODEX-Stuff] Item - Goggles: Prevents the boss blind effect.
				{trinket:"Goggles",effect:"{applyModifierOnRoomNotMarked:blind.hero,npcRoom}"},
				// [CODEX-Stuff] Item - Helmet: Prevents the boss stun effect.
				{trinket:"Helmet",effect:"{applyModifierOnRoomNotMarked:stunned.hero,npcRoom}"},

			].map(enchantment=>[
				{
					id:"npcRoom",
					labels:["Rescue","Enchantment"],
					atPercentage:{from:60,to:90},
					items:[{genericItem:"npc"},{id:"enemy",level:2}],
					roomDescriptions:[
						[ "{ifKilledLastFoe}{then}{goodGuyName}: \"You saved me! Take this "+enchantment.trinket+"!\", {markRoom:npcRoom}, {markItem:npc}" ]
					]
				},
				{
					id:"bossRoom",
					labels:BOSSROOMLABELS,
					atPercentage:100,
					items:[{id:"enemy",level:3,ignoreXp:true}],
					isExclusive:true,
					roomDescriptions:[
						[
							enchantment.effect,
							"{randomBossEntrance}, {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}"
						]
					]
				}
			]),
			otherDescriptions:[
				{
					at:"startingRoom",
					labels:STARTINGROOMLABELS,
					roomDescriptions:[
						[
							"\"They said that the {villainName} have mystical powers. Let's check this out!\"",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}"
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The Missing Familiar: Find the familiar to get your missing skill back and kill the boss.",
			minRooms:4,
			adventureTitle:[
				"The Lost {familiarName}",
				"The Vengeful {heroClass}",
				"The {villainName}'s {familiarName}",
				"The Trapped {familiarName}",
				"The Lost Power Of The {heroClass}",
				"The {heroClass}'s {familiarName}",
				"The {familiarName}",
			],
			steps:[
				[
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:familiarRoom}{then}\"It's too late for your little friend, {heroClass}!\", {markRoom:familiarRoom}, {markRoom:bossRoom}",
								"\"What a stupid reason to risk your life, {heroClass}!\", {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}"
							]
						]
					},
					{
						id:"familiarRoom",
						labels:["Familiar","Found","Friend"],
						atPercentage:99,
						stealHeroSkill:"losable",
						items:[{genericItem:"familiar"},{id:"enemy",level:2}],
						roomDescriptions:[
							[
								"{ifNoFoes}{and}{ifRoomIsNotMarked:familiarRoom}{then}You saved your {familiarName}!",
								"{ifNoFoes}{and}{ifRoomIsNotMarked:familiarRoom}{then}{regainSkill}, {markRoom:familiarRoom}, {markItem:familiar}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					labels:STARTINGROOMLABELS,
					roomDescriptions:[
						[
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}The {villainName} paid for kidnapping your familiar.",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{and}{ifRoomIsMarked:bossRoom}{then}{hide}But your beloved familiar is lost forever."
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The Test: Beat the boss and get a better ending if you don't use your class item.",
			minRooms:4,
			adventureTitle:[
				"The {heroClass}'s Bet",
				"The {heroClass}'s Challenge",
				"The {heroClass}'s {nameEquip:equip-heroItem}",
				"The {nameEquip:equip-heroItem} Challenge",
				"The {nameEquip:equip-heroItem} Trial",
				"The {heroClass} Trial",
				"The {heroClass} And The {nameEquip:equip-heroItem}",
			],
			steps:[
				[
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
						roomDescriptions:[
							[ "{randomBossEntrance}, {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}" ]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					labels:STARTINGROOMLABELS,
					roomDescriptions:[
						[
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}You proved to be the best {heroClass}...",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{and}{payEquip:equip-heroItem}{then}{hide}...of the world!, {gainGold:5}",
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The Curse: Beat the boss and try to get rid of your curse.",
			minRooms:4,
			adventureTitle:[
				"The Curse Of The {villainName}",
				"The Cursed {heroClass}",
				"The {heroClass}'s Curse",
				"The {heroClass}'s Last Day",
				"The {heroClass}'s Burden",
				"The {heroClass}'s Sickness",
				"The {villainName}'s Gift",
				"The {villainName}'s Reward",
				"The {villainName}'s Last Day",
			],
			steps:[
				[
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
						equipment:[{id:"curse",isAvailable:true}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:bossRoom}{then}{randomCurseJoke}",
								"{randomBossEntrance}, {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					labels:STARTINGROOMLABELS,
					roomDescriptions:[
						[
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}You made the {villainName} pay for it",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{and}{ifRoomIsNotMarked:bossRoom}{then}{hide}{randomCursedEnding}",
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The War: Conquer the dungeon and beat the leader.",
			minRooms:4,
			adventureTitle:[
				"The Conquered {placeName}",
				"The {placeName} Conflict",
				"The Battle Of The {heroClass}",
				"The {villainName}'s Generals",
				"The Conquering {villainName}",
				"The {heroClass}'s War",
				"The Battle Of The {placeName}",
				"The War Of The {placeName}",
			],
			steps:[
				[
					{
						id:"general1room",
						labels:["Weak General","1st Camp"],
						atPercentage:{from:30,to:50},
						items:[{id:"enemy",level:0}],
						roomDescriptions:[
							[
								"{ifKilledLastFoe}{then}General: \"Forgive me, {villainName}!\", {markRoom:general1room}"
							]
						]
					},
					{
						id:"general2room",
						labels:["Brave General","2nd Camp"],
						atPercentage:{from:50,to:70},
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{ifKilledLastFoe}{then}General: \"Ugh... Hold on, {villainName} generals!\", {markRoom:general2room}"
							]
						]
					},
					{
						id:"general3room",
						labels:["Strong General","Third Camp"],
						atPercentage:{from:70,to:90},
						items:[{id:"enemy",level:2}],
						roomDescriptions:[
							[
								"\"We will stop you at any cost!\"",
								"{ifKilledLastFoe}{then}General: \"Argh! You can't beat us all, {heroClass}!\", {markRoom:general3room}"
							]
						]
					},
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:{from:1,to:99},
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
						isDeadEndRoom:true,
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:general1room}{or}{ifRoomIsNotMarked:general2room}{or}{ifRoomIsNotMarked:general3room}{then}\"I see my generals are holding on! Very well!\"",
								"\"You will never take the {placeName} back!\", {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					labes:STARTINGROOMLABELS,
					roomDescriptions:[
						[
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}The {villainName} leader has been defeated",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{and}{ifRoomIsMarked:general1room}{and}{ifRoomIsMarked:general2room}{and}{ifRoomIsMarked:general3room}{then}{hide}...and the {placeName} is free again.",
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The Investigation: Investigate who the impostor may be and eliminate him.",
			minRooms:4,
			adventureTitle:[
				"The {heroClass}'s Investigation",
				"The {goodGuyName}'s Alibi",
				"The {placeName} Case",
				"The {heroClass}'s Interrogations",
				"The {lowerSoldierName}'s Testimony",
				"The {higherSoldierName}'s Testimony",
				"The {lowerSoldierName} And The {higherSoldierName}",
				"The {placeName}'s Culprit",
				"The {villainName}'s Alibi",
				"The {placeName}'s Murder",
			],
			generator:(G,P)=>{
				const
					SENTENCES={
						isCulpritSelf:[
							"\"I'm the culprit!\"",
							"\"I'm behind all this!\"",
							"\"It was me, {heroClass}!\"",
							"\"Come on, it was me!\"",
						],
						isCulpritShort:[
							"\"The {name} did it!\"",
							"\"The {name} is the culprit!\"",
							"\"Punish the {name}!\"",
						],
						isCulpritLong:[
							"\"The one to be punished is the {name}!\"",
							"\"There is the {name} behind all this!\"",
							"\"The {name} is the person you are looking for\"",
							"\"I've the name you want: the {name}\""
						],

						isInnocentSelf:[
							"\"I'm innocent!\"",
							"\"It's not my fault!\"",
							"\"I'm innocent, {heroClass}!\"",
							"\"I'm not the culprit!\""
						],
						isInnocentShort:[
							"\"The {name} is innocent!\"",
							"\"It wasn't the {name}!\"",
						],
						isInnocentLong:[
							"\"The {name} is not guilty!\"",
							"\"The {name} is not at fault\"",
							"\"The {name} is not your target\"",
							"\"It couldn't have been the {name}\"",
							"\"I'd keep an eye on the {name}\""
						],

						isLyingShort:[
							"\"The {name} is lying!\"",
							"\"The {name} is a liar!\"",
							"\"Dont' trust the {name}!\"",
						],
						isLyingLong:[
							"\"The {name} is lying!\"",
							"\"The {name} is a dirty liar!\"",
							"\"Don't trust the {name}...\"",
							"\"The {name} tells lies...\""
						],

						isTrueShort:[
							"\"The {name} is true!\"",
							"\"The {name} is right!\""
						],
						isTrueLong:[
							"\"The {name} is telling the truth\"",
							"\"The {name} is sincere\"",
							"\"The {name} is not telling lies\""
						],

						goodEnding:[
							"...and justice is served.",
							"...and you did a great job.",
							"...and the truth triumphed."
						],
						badEnding:[
							"...but something feels wrong.",
							"...or not?",
							"...but have you made the right decision?"
						],
					}
				let
					rooms=[
						{mark:"{markRoom:goodGuyRoom}",check:["{ifRoomIsMarked:goodGuyRoom}","{ifRoomIsNotMarked:bossRoom}"]},
						{mark:"{markRoom:bossRoom}",check:["{ifRoomIsMarked:bossRoom}","{ifRoomIsNotMarked:goodGuyRoom}"]}
					],
					culprits=[
						{ name:"{goodGuyName}", placeholder:"goodGuySentence", killId:"killGoodGuyId", length:"Short", isId:1 },
						{ name:"{villainName}", placeholder:"villainSentence", killId:"killVillainId", length:"Short", isId:0 },
					],
					characters=[
						culprits[0],
						culprits[1],
						{ name:"{lowerSoldierName}", placeholder:"lowerSoldierSentence", length:"Long", isId:-1 },
						{ name:"{higherSoldierName}", placeholder:"higherSoldierSentence", length:"Long", isId:-1 }
					];
					sentences=[],
					isTruth=G.random(1)>0.5;

				G.shuffleArray(culprits);
				G.shuffleArray(characters);
				G.shuffleArray(rooms);
				sentences.push({character:characters[0],who:culprits[0],type:isTruth?"isCulprit":"isInnocent"});

				for (var i=0;i<characters.length-2;i++) {
					if (G.random(1)>0.5)
						sentences.push({character:characters[i+1],who:characters[i],type:"isTrue"});
					else {
						isTruth=!isTruth;
						sentences.push({character:characters[i+1],who:characters[i],type:"isLying"});
					}		
				}
				sentences.push({character:characters[i+1],who:characters[i],type:isTruth?"isTrue":"isLying"});

				// Prepare placeholders
				sentences.forEach(sentence=>{
					P[sentence.character.placeholder]=G.getRandom(SENTENCES[sentence.type+(sentence.who===sentence.character?"Self":sentence.character.length)]).replace(/{name}/g,sentence.who.name);
				});
				culprits.forEach((culprit,id)=>{
					P[culprit.killId]=rooms[id].mark;
				});
				if (G.random()>0.5) {
					// Good ending
					P.caseEndId=G.getRandom(rooms[0].check);
					P.caseEndText=G.getRandom(SENTENCES.goodEnding);
				} else {
					// Bad ending
					P.caseEndId=G.getRandom(rooms[1].check);
					P.caseEndText=G.getRandom(SENTENCES.badEnding);
				}
				
				// TODO togli
				if (G.debug&&G.debug.logCase)
					console.log("Case",{
						sentences:sentences,
						solution:culprits[0]
					});

			},
			steps:[
				[
					{
						id:"lowerSoldierRoom",
						labels:["Weak General","1st Spy"],
						atPercentage:{from:30,to:50},
						items:[{id:"enemy",level:0}],
						roomDescriptions:[
							[
								"{ifKilledLastFoe}{then}{lowerSoldierName}:{hide}{lowerSoldierSentence}"
							]
						]
					},
					{
						id:"higherSoldierRoom",
						labels:["Brave General","2nd Spy"],
						atPercentage:{from:50,to:70},
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{ifKilledLastFoe}{then}{higherSoldierName}:{hide}{higherSoldierSentence}"
							]
						]
					},
					{
						id:"goodGuyRoom",
						labels:["Good"],
						atPercentage:{from:1,to:99},
						items:[{id:"enemy",level:3}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:startingRoom}{and}\"Speak!\"{then}{goodGuyName}:{hide}{goodGuySentence}, {roomIsEmpty}",
								"{ifRoomIsMarked:startingRoom}{then}The {goodGuyName} is gone, {roomIsEmpty}{newRule}{ifKilledLastFoe}{then}{killGoodGuyId}, {markRoom:startingRoom}"
							]
						]
					},
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:{from:1,to:99},
						items:[{id:"enemy",level:3,ignoreXp:true}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:startingRoom}{and}\"Speak!\"{then}{villainName}:{hide}{villainSentence}, {roomIsEmpty}",
								"{ifRoomIsMarked:startingRoom}{then}The {villainName} is gone, {roomIsEmpty}{newRule}{ifKilledLastFoe}{then}{killVillainId}, {markRoom:startingRoom}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					labes:STARTINGROOMLABELS,
					roomDescriptions:[
						[
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}The culprit has been punished, the case is closed",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{and}{caseEndId}{then}{hide}{caseEndText}",
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The Items: Find the items to explore more and fight the boss.",
			minRooms:4,
			adventureTitle:[
				"The {questLastItem}",
				"The Lost {questLastItem}",
				"The {heroClass}'s {questLastItem}",
				"The Elusive {villainName}",
				"The Quest For The {questLastItem}",
				"The Missing {questLastItem}",
			],
			generator:(G,P)=>{
				const ITEMS=[
					{
						item:["Grappling Hook","Leap Stone","Gravity Boots"],
						cantExplore:"There is a huge chasm in front of you",
						cantFightBoss:"The {villainName} stares at you over the chasm"
					},
					{
						item:["Boomerang","Knife"],
						cantExplore:"A rope is keeping this room door closed",
						cantFightBoss:"The bridge to the {villainName} is held up by a rope"
					},
					{
						item:["Flute","Ocarina"],
						cantExplore:"There is a score drawn on this closed door",
						cantFightBoss:"The {villainName} is singing a creepy song"
					},
					{
						item:["Bomb","Hammer"],
						cantExplore:"A huge rock obstructs the passage",
						cantFightBoss:"The {villainName} is behind a sturdy stone door"
					},
					{
						item:["Flippers","Gills"],
						cantExplore:"A large body of water separates you from the shore",
						cantFightBoss:"The {villainName} is in the middle of a deep lake"
					},
				];

				G.shuffleArray(ITEMS);
				P.getItem1=G.getRandom(ITEMS[0].item);
				P.cantExploreRoom2=ITEMS[0].cantExplore;
				P.getItem2=G.getRandom(ITEMS[1].item);
				P.cantExploreRoom3=ITEMS[1].cantExplore;
				P.getItem3=G.getRandom(ITEMS[2].item);
				P.cantFightBoss=ITEMS[2].cantFightBoss;
				G.globalPlaceholders.questLastItem=P.getItem3;

			},
			steps:[
				[
					{
						id:"itemRoom1",
						labels:["1st Item"],
						isDeadEndRoom:true,
						atPercentage:{from:1,to:99},
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{ifKilledLastFoe}{then}{randomGotItem} {getItem1}, {markRoom:itemRoom1}"
							]
						]
					},
					{
						id:"itemRoom2",
						labels:["2nd Item"],
						isDeadEndRoom:true,
						atPercentage:{from:1,to:99},
						items:[{id:"enemy",level:2}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:itemRoom1}{then}{cantExploreRoom2}, {goBack}",
								"{ifKilledLastFoe}{then}{randomGotItem} {getItem2}, {markRoom:itemRoom2}"
							]
						]
					},
					{
						id:"itemRoom3",
						labels:["3rd Item"],
						atPercentage:{from:1,to:99},
						isDeadEndRoom:true,
						items:[{id:"enemy",level:3}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:itemRoom2}{then}{cantExploreRoom3}, {goBack}",
								"{ifKilledLastFoe}{then}{randomGotItem} {getItem3}, {markRoom:itemRoom3}"
							]
						]
					},
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:itemRoom3}{then}{cantFightBoss}, {goBack}",
								"{randomBossEntrance}, {noEscape}{newRule}{ifNoFoes}{then}{markRoom:startingRoom}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					labes:STARTINGROOMLABELS,
					roomDescriptions:[
						[
							"\"You won't be able to reach the {villainName} with your gear, {heroClass}!\"",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}"
						]
					]
				}
			]
		},

		{
			id:"[CODEX-Events] Main quest - The Deadly Loop: Break the time loop and kill the boss.",
			minRooms:4,
			adventureTitle:[
				"The Looping {heroClass}",
				"The {placeName} Loop",
				"The Looping {placeName}",
				"The Tenacious {heroClass}",
				"The Neverending {placeName}",
				"The Immortal {heroClass}",
				"The {placeName} Loop",
				"The {heroClass} Lost In The Loop",
			],
			steps:[
				[
					{
						id:"loop1room",
						labels:["1st Cycle"],
						isDeadEndRoom:true,
						atPercentage:{from:1,to:99},
						items:[{id:"enemy",level:0}],
						roomDescriptions:[
							[
								"{ifNoFoes}{and}{ifNotKeyword:time}{then}\"Try again!\", {getKeyword:break}, {getKeyword:time}, {killHero}"
							]
						]
					},
					{
						id:"loop2room",
						labels:["2nd Cycle"],
						atPercentage:100,
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{ifNoFoes}{and}{ifLoseKeyword:break}{then}{randomDefendLoop}, {getKeyword:loop}, {killHero}"
							]
						]
					},
					{
						id:"bossRoom",
						labels:BOSSROOMLABELS,
						atPercentage:100,
						items:[{id:"enemy",level:3,ignoreXp:true}],
						isExclusive:true,
						roomDescriptions:[
							[
								"{ifNotKeyword:loop}{then}{roomIsEmpty}",
								"{randomLoopBoss}, {noEscape}{newRule}{ifNoFoes}{then}{loseKeyword:time}, {loseKeyword:loop}, {markRoom:startingRoom}"
							]
						]
					}
				]
			],
			otherDescriptions:[
				{
					at:"startingRoom",
					labes:STARTINGROOMLABELS,
					roomDescriptions:[
						[
							"You came here to break a time loop... but you remember dying in here before.",
							"{ifMoveOnStairs}{and}{ifRoomIsMarked:startingRoom}{then}{winningScene}"
						]
					]
				}
			]
		},
	]
}