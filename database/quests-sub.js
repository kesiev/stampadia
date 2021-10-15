/* exported loadQuestsSub */

function loadQuestsSub() {

	const
		SHAPE_PUZZLES_CIRCLE_TRIANGLE="{ifMoveOn:puzzle}{and}{ifRoomIsMarked:circleRoom}{and}{ifRoomIsMarked:triangleRoom}{and}{ifRoomIsNotMarked:squareRoom}{then}",
		SHAPE_PUZZLES_SQUARE_TRIANGLE="{ifMoveOn:puzzle}{and}{ifRoomIsNotMarked:circleRoom}{and}{ifRoomIsMarked:triangleRoom}{and}{ifRoomIsMarked:squareRoom}{then}",
		SHAPE_PUZZLES_CIRCLE_SQUARE="{ifMoveOn:puzzle}{and}{ifRoomIsMarked:circleRoom}{and}{ifRoomIsNotMarked:triangleRoom}{and}{ifRoomIsMarked:squareRoom}{then}",
		SHAPE_PUZZLES_SOLVED="{hide}{randomGoodReward}, {markItem:puzzle}",
		SHAPE_PUZZLES=[
			// [CODEX-Stuff] Shape puzzle - The Eye Of The Gods: Which shapes are the right ones?
			[ "A painting of the Eye Of The Gods is hanging on the wall.", SHAPE_PUZZLES_CIRCLE_TRIANGLE+"The painting burns"+SHAPE_PUZZLES_SOLVED ],
			// [CODEX-Stuff] Shape puzzle - The Compass: Which shapes are the right ones?
			[ "The needle of the huge compass hanging from the ceiling is spinning.", SHAPE_PUZZLES_CIRCLE_TRIANGLE+"The needle stops"+SHAPE_PUZZLES_SOLVED ],
			// [CODEX-Stuff] Shape puzzle - The Home: Which shapes are the right ones?
			[ "An image of your home comes to your mind.", SHAPE_PUZZLES_SQUARE_TRIANGLE+"You miss home"+SHAPE_PUZZLES_SOLVED ],			
			// [CODEX-Stuff] Shape puzzle - The Glass Of Wine: Which shapes are the right ones?
			[ "There is a glass of wine on an altar.", SHAPE_PUZZLES_SQUARE_TRIANGLE+"The wine disappear"+SHAPE_PUZZLES_SOLVED ],
			// [CODEX-Stuff] Shape puzzle - The Coin With The Hole: Which shapes are the right ones?
			[ "There is a coin with a squared hole on the floor.", SHAPE_PUZZLES_CIRCLE_SQUARE+"The coin liquefies"+SHAPE_PUZZLES_SOLVED ],
			// [CODEX-Stuff] Shape puzzle - The Bolt: Which shapes are the right ones?
			[ "There a bolt from some kind of machine on the floor.", SHAPE_PUZZLES_CIRCLE_SQUARE+"The bolt turns into ink"+SHAPE_PUZZLES_SOLVED ],
		];

	// Beastcrafters trading card games events
	let
		battles={
			id:"challengerRoom",
			atPercentage:{from:1,to:99},
			items:[{genericItem:"challenger"}],
			roomDescriptions:[]
		},
		boosterPacksList=[],
		BEASTCRAFTERS={
			beasts:[
				{label:"Golem",id:"golem",setName:"golemSet",beatenBySet:"manticoreSet"},
				{label:"Manticore",id:"manticore",setName:"manticoreSet",beatenBySet:"hellhoundSet"},
				{label:"Hellhound",id:"hellhound",setName:"hellhoundSet",beatenBySet:"golemSet"},
			],
			events:[
				[battles],
				[{
					id:"shopperRoom",
					atPercentage:{from:1,to:99},
					items:[{genericItem:"shopper"}],
					roomDescriptions:[
						[
							"{ifMoveOn:shopper}{and}{ifPayGold:3}{then}You open a booster pack{hide}{getRandomCard}",
							"{ifMoveOn:shopper}{and}{ifPayGold:3}{then}You open a booster pack{hide}{getRandomCard}",
						],
						[
							"{ifMoveOn:shopper}{then}You found a collectable card, {getRandomCard}, {markItem:shopper}"
						]
					]
				}]
			]
		};

	for (var i=0;i<BEASTCRAFTERS.beasts.length;i++) {
		for (var p=1;p<4;p++) {
			let beast=BEASTCRAFTERS.beasts[i];
			battles.roomDescriptions.push([
				"\"Beat my "+beast.label+" "+p+"!\"{newRule}{ifMoveOn:challenger}{and}{ifLoseKeywordSet:"+beast.beatenBySet+"}{then}{randomHighPrize}, {markItem:challenger}",
				"{ifMoveOn:challenger}{and}{ifLoseKeywordSet:"+beast.setName+"}{andPayGoldToReach:"+(p+1)+"}{then}{randomHighPrize}, {markItem:challenger}",
			]);
		}
	}

	return [

		{
			id:"[CODEX-Events] Subquest - The Guardians: Kill 2 mini-boss and earn bonus XPs.",
			minRooms:3,
			steps:[
				[
					{
						id:"guardian1",
						atPercentage:60,
						items:[{id:"enemy",level:2}],
						roomDescriptions:[
							[									
								"\"We are the Guardian Twins. We cannot let you pass.\", {markRoom:guardian1}, {noEscape}",
								"{ifKilledLastFoe}{and}{markRoom:guardian2}{then}{gainXp:2}"
							]
						]
					},
					{
						id:"guardian2",
						atPercentage:99,
						items:[{id:"enemy",level:2}],
						roomDescriptions:[
							[									
								"\"We are the Guardian Twins. We cannot let you pass.\", {markRoom:guardian2}, {noEscape}",
								"{ifKilledLastFoe}{and}{ifRoomIsMarked:guardian1}{then}{gainXp:2}"
							]
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Fountains: Decide between two effects.",
			minRooms:3,
			steps:[
				[
					{
						id:"room1",
						atPercentage:60,
						items:[{genericItem:"switch"}],
						roomDescriptions:[
							["{ifMoveOn:switch}{and}{ifRoomIsNotMarked:room1}{then}You drink{hide}from {randomGoodFountain+randomBadFountain}, {markRoom:room1}, {markRoom:room2}"]
						]
					},
					{
						id:"room2",
						atPercentage:99,
						items:[{genericItem:"switch"}],
						roomDescriptions:[
							["{ifMoveOn:switch}{and}{ifRoomIsNotMarked:room2}{then}You drink{hide}from {randomGoodFountain+randomBadFountain}, {markRoom:room2}, {markRoom:room1}"]
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Linked Rooms: Walk on a cell and enable another room effect.",
			minRooms:3,
			steps:[
				[
					{
						id:"switchRoom",
						atPercentage:{from:1,to:99},
						items:[{genericItem:"switch"}],
						roomDescriptions:[
							[ "{ifMoveOn:switch}{then}{randomMysteryHappens}{hide}{markRoom:switchRoom}, {markItem:switch}" ]
						]
					},
					{
						id:"switchEffect",
						atPercentage:{from:1,to:99},
						roomDescriptions:[
							[ "{ifRoomIsMarked:switchRoom}{and}{ifRoomIsNotMarked:switchEffect}{then}{hide}{randomGoodRoomEffect+randomBadRoomEffect}, {markRoom:switchEffect}" ]
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Key And The Chests: Find the key and open one of two random chests.",
			minRooms:3,
			steps:[
				[
					{
						id:"keyRoom",
						atPercentage:60,
						items:[{genericItem:"key"}],
						roomDescriptions:[
							[ "{ifMoveOn:key}{then}You found {randomSmallKey}, {markRoom:keyRoom}, {markItem:key}" ]
						]
					},
					{
						id:"chestRoom1",
						atPercentage:1,
						items:[{genericItem:"chest"}],
						roomDescriptions:[
							["{ifMoveOn:chest}{and}{ifRoomIsMarked:keyRoom}{and}{ifRoomIsNotMarked:chestRoom1}{then}You found{hide}{randomGoodLoot+randomBadLoot}, {markRoom:chestRoom1}, {markRoom:chestRoom2}"]
						]
					},
					{
						id:"chestRoom2",
						atPercentage:99,
						items:[{genericItem:"chest"}],
						roomDescriptions:[
							["{ifMoveOn:chest}{and}{ifRoomIsMarked:keyRoom}{and}{ifRoomIsNotMarked:chestRoom2}{then}You found{hide}{randomGoodLoot+randomBadLoot}, {markRoom:chestRoom1}, {markRoom:chestRoom2}"]
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Key And The Chest (good): Find the key and open one good chest.",
			minRooms:3,
			steps:[
				[
					{
						id:"keyRoom",
						atPercentage:99,
						items:[{genericItem:"key"}],
						roomDescriptions:[
							[ "{ifMoveOn:key}{then}You found {randomSmallKey}, {markRoom:keyRoom}, {markItem:key}" ]
						]
					},
					{
						id:"chestRoom1",
						atPercentage:1,
						items:[{genericItem:"chest"}],
						roomDescriptions:[
							["{ifMoveOn:chest}{and}{ifRoomIsMarked:keyRoom}{then}You found{hide}{randomGoodLoot}, {markItem:chest}"]
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Gambler: Bet Gold, roll a die and you may win more gold.",
			minRooms:3,
			steps:[
				[
					{
						id:"keyRoom",
						atPercentage:99,
						items:[{genericItem:"gambler"}],
						roomDescriptions:[
							[ 
								"Gambler: {randomGambler}",
								"{ifMoveOn:gambler}{and}{ifPayGold:3}{then}{markItem:gambler}, {rollDie}{range:1-4} {nothing}, {range:5-6} {gainGold:6}"
							]
						]
					}
				]
			]
		},
		
		{
			id:"[CODEX-Events] Subquest - The Elemental Chest: Find the 2 elemental keys and open a chest containing equipment.",
			minRooms:3,
			steps:[
				{key:"Water Droplet",name:"Flaming Chest",content:"rage"},
				{key:"Cloud Curl",name:"Rock Chest",content:"taunt"},
				{key:"Bright Spark",name:"Windy Chest",content:"dash"},
				{key:"Small Rock",name:"Wet Chest",content:"tactic"},
			].map(chest=>[
				{
					id:"keyRoom1",
					atPercentage:20,
					items:[{genericItem:"key"},{id:"enemy",level:0}],
					roomDescriptions:[
						[ "{ifMoveOn:key}{then}You found a "+chest.key+", {markRoom:keyRoom1}, {markItem:key}" ]
					]
				},
				{
					id:"keyRoom2",
					atPercentage:60,
					items:[{genericItem:"key"},{id:"enemy",level:1}],
					roomDescriptions:[
						[ "{ifMoveOn:key}{then}You found a "+chest.key+", {markRoom:keyRoom2}, {markItem:key}" ]
					]
				},
				{
					id:"chestRoom",
					atPercentage:99,
					items:[{genericItem:"chest"}],
					equipment:[{id:chest.content}],
					roomDescriptions:[
						["{ifMoveOn:chest}{and}{ifRoomIsMarked:keyRoom1}{and}{ifRoomIsMarked:keyRoom2}{then}You opened the "+chest.name+"...{hide}{getEquip:equip-"+chest.content+"}, {markItem:chest}"]
					]
				}
			])
		},

		{
			id:"[CODEX-Events] Subquest - The Trainer: Face his test and earn gold.",
			minRooms:1,
			debug:true,
			steps:[
				{sentence:"A coward hero has no use.",test:"testBravery"},
				{sentence:"A hero respects the enemy.",test:"testMercy"},
				{sentence:"A hero doesn't rush his strength.",test:"testCalm"}
			].map(trainer=>[
				{
					id:"trainerRoom",
					atPercentage:99,
					items:[{genericItem:"trainer"}],
					equipment:[{id:trainer.test}],
					roomDescriptions:[
						["{ifMoveOn:trainer}{then}Trainer: \""+trainer.sentence+"\", {getEquip:equip-"+trainer.test+"}, {markItem:trainer}"]
					]
				}
			])
		},

		{
			id:"[CODEX-Events] Subquest - The Bloody Gambler: Bet HP, roll a die and you may win more HP.",
			minRooms:3,
			steps:[
				[
					{
						id:"keyRoom",
						atPercentage:99,
						items:[{genericItem:"gambler"}],
						roomDescriptions:[
							[ 
								"Bloody Gambler: {randomGambler}",
								"{ifMoveOn:gambler}{and}{loseHp:1}{then}{markItem:gambler}, {rollDie}{range:1-3} {nothing}, {range:4-6} {gainHp:2}"
							]
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Altar: Sacrify important resources for other advantages.",
			minRooms:2,
			steps:[
				[
					{
						id:"keyRoom",
						atPercentage:99,
						items:[{genericItem:"altar"}],
						roomDescriptions:[
							[ "{ifMoveOn:altar}{and}{randomHighCost}{then}Altar: {randomAltar}, {randomHighPrize}, {markItem:altar}" ],
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Sphynx: Give the right answer, meet the Sphynx and get your reward.",
			minRooms:3,
			steps:[
				[
					{
						id:"answerRoom",
						atPercentage:10,
						items:[{genericItem:"sphynx"}],
						shuffleRoomDescriptions:true,
						roomDescriptions:[
							[
								"{ifMoveOn:sphynx}{and}{ifRoomIsMarked:answerRoom}{then}Sphinx: \"Your answer...\"{hide}{randomSphinxOk}, {randomGoodReward}, {markItem:sphynx}",
								"{ifMoveOn:sphynx}{and}{ifRoomIsMarked:questionRoom}{then}Sphinx: \"Your answer...\"{hide}{randomSphinxKo}, {randomBadReward}, {markItem:sphynx}",
							],
						]
					},
					{
						id:"questionRoom",
						atPercentage:99,
						items:[{genericItem:"statue"}],
						shuffleRoomDescriptions:true,
						roomDescriptions:[
							[
								"{ifMoveOn:statue}{and}\"{truth}\"{then}Sphinx: {randomSphinxAnswerAccept}, {markRoom:answerRoom}, {markItem:statue}",
								"{ifMoveOn:statue}{and}\"{lie}\"{then}Sphinx: {randomSphinxAnswerAccept}, {markRoom:questionRoom}, {markItem:statue}",
							],
						]
					}
				],
				// Reversed room usage
				[
					{
						id:"answerRoom",
						atPercentage:10,
						items:[{genericItem:"sphynx"}],
						shuffleRoomDescriptions:true,
						roomDescriptions:[
							[
								"{ifMoveOn:sphynx}{and}{ifRoomIsMarked:questionRoom}{then}Sphinx: \"Your answer...\"{hide}{randomSphinxOk}, {randomGoodReward}, {markItem:sphynx}",
								"{ifMoveOn:sphynx}{and}{ifRoomIsMarked:answerRoom}{then}Sphinx: \"Your answer...\"{hide}{randomSphinxKo}, {randomBadReward}, {markItem:sphynx}",
							],
						]
					},
					{
						id:"questionRoom",
						atPercentage:99,
						items:[{genericItem:"statue"}],
						shuffleRoomDescriptions:true,
						roomDescriptions:[
							[
								"{ifMoveOn:statue}{and}\"{truth}\"{then}Sphinx: {randomSphinxAnswerAccept}, {markRoom:questionRoom}, {markItem:statue}",
								"{ifMoveOn:statue}{and}\"{lie}\"{then}Sphinx: {randomSphinxAnswerAccept}, {markRoom:answerRoom}, {markItem:statue}",
							],
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Murderer: Avenge the dead body or steal its gold?",
			minRooms:3,
			steps:[
				[
					{
						id:"corpseRoom",
						atPercentage:10,
						items:[{genericItem:"corpse"}],
						roomDescriptions:[
							[
								"{ifMoveOn:corpse}{and}\"I'll avenge this {victimName} death!\"{then}{markRoom:killerRoom}, {markItem:corpse}",
								"{ifMoveOn:corpse}{and}\"This dead {victimName} won't need this...\"{then}{randomGold}, {markItem:corpse}"
							]
						]
					},
					{
						id:"killerRoom",
						atPercentage:99,
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{randomMurderer}",
								"{ifKilledLastFoe}{and}{ifRoomIsMarked:killerRoom}{then}{hide}You avenged the {victimName}, {randomGoodReward}"
							]
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Barman: Pay gold for health or a short mission.",
			minRooms:2,
			steps:[
				[
					{
						id:"barmanRoom",
						atPercentage:10,
						items:[{genericItem:"barman"}],
						roomDescriptions:[
							[
								"{ifMoveOn:barman}{and}{ifPayGold:1}{then}Barman: \"Well...\"{hide}\"Someone is hiding here...\", {markRoom:missionRoom}, {markItem:barman}",
								"{ifMoveOn:barman}{and}{ifPayGold:3}{then}Barman: {randomShopKeeper}, {gainHp:1}, {markItem:barman}"
							]
						]
					},
					{
						id:"missionRoom",
						atPercentage:99,
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{ifEnterRoom}{and}{ifRoomIsNotMarked:missionRoom}{then}{roomIsEmpty}, {stopReading}",
								"{randomHiddenFoe}"
							]
						]
					}
				],
				[
					{
						id:"barmanRoom",
						atPercentage:10,
						items:[{genericItem:"barman"}],
						roomDescriptions:[
							[
								"{ifMoveOn:barman}{and}{ifPayGold:1}{then}Barman: \"Well...\"{hide}\"Something is hiding here...\", {markRoom:missionRoom}, {markItem:barman}",
								"{ifMoveOn:barman}{and}{ifPayGold:3}{then}Barman: {randomShopKeeper}, {gainHp:1}, {markItem:barman}"
							]
						]
					},
					{
						id:"missionRoom",
						atPercentage:99,
						items:[{genericItem:"item"}],
						roomDescriptions:[
							[
								"{ifMoveOn:item}{and}{ifRoomIsMarked:missionRoom}{then}You found{hide}{randomGoodLoot+randomBadLoot}, {markItem:item}"
							]
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Shapes Puzzle: Get the right shapes to solve the puzzle.",
			minRooms:3,
			steps:[
				// Square+triangle, circle, puzzle room
				[
					{
						id:"squareRoom",
						atPercentage:{from:1,to:99},
						items:[{genericItem:"square"},{genericItem:"triangle"}],
						roomDescriptions:[
							[ 
								"{ifMoveOn:square}{then}The engraved square on the floor is now glowing, {markItem:square}, {markRoom:squareRoom}",
								"{ifMoveOn:triangle}{then}The engraved triangle on the floor is now glowing, {markItem:triangle}, {markRoom:triangleRoom}"
							]
						]
					},
					{
						id:"circleRoom",
						atPercentage:{from:1,to:99},
						items:[{genericItem:"circle"},{id:"enemy",level:1}],
						roomDescriptions:[
							[ "{ifMoveOn:circle}{then}The engraved circle on the floor is now glowing, {markItem:circle}, {markRoom:circleRoom}" ]
						]
					},
					{
						id:"triangleRoom",
						atPercentage:{from:1,to:99},
						items:[{genericItem:"puzzle"}],
						roomDescriptions:SHAPE_PUZZLES
					}
				],
				// Square+circle, triangle, puzzle room
				[
					{
						id:"squareRoom",
						atPercentage:{from:1,to:99},
						items:[{genericItem:"square"},{genericItem:"circle"}],
						roomDescriptions:[
							[ 
								"{ifMoveOn:square}{then}The engraved square on the floor is now glowing, {markItem:square}, {markRoom:squareRoom}",
								"{ifMoveOn:circle}{then}The engraved circle on the floor is now glowing, {markItem:circle}, {markRoom:circleRoom}"
							]
						]
					},
					{
						id:"triangleRoom",
						atPercentage:{from:1,to:99},
						items:[{genericItem:"triangle"},{id:"enemy",level:1}],
						roomDescriptions:[
							[ "{ifMoveOn:triangle}{then}The engraved triangle on the floor is now glowing, {markItem:triangle}, {markRoom:triangleRoom}" ]
						]
					},
					{
						id:"circleRoom",
						atPercentage:{from:1,to:99},
						items:[{genericItem:"puzzle"}],
						roomDescriptions:SHAPE_PUZZLES
					}
				],
				// Triangle+circle, square, puzzle room
				[
					{
						id:"triangleRoom",
						atPercentage:{from:1,to:99},
						items:[{genericItem:"triangle"},{genericItem:"circle"}],
						roomDescriptions:[
							[ 
								"{ifMoveOn:triangle}{then}The engraved triangle on the floor is now glowing, {markItem:triangle}, {markRoom:triangleRoom}",
								"{ifMoveOn:circle}{then}The engraved circle on the floor is now glowing, {markItem:circle}, {markRoom:circleRoom}"
							]
						]
					},
					{
						id:"squareRoom",
						atPercentage:{from:1,to:99},
						items:[{genericItem:"square"},{id:"enemy",level:1}],
						roomDescriptions:[
							[ "{ifMoveOn:square}{then}The engraved square on the floor is now glowing, {markItem:square}, {markRoom:squareRoom}" ]
						]
					},
					{
						id:"circleRoom",
						atPercentage:{from:1,to:99},
						items:[{genericItem:"puzzle"}],
						roomDescriptions:SHAPE_PUZZLES
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Nothing: A teleport to a place that leaves you no choice.",
			minRooms:2,
			steps:[
				[
					{
						id:"teleportRoom",
						atPercentage:10,
						items:[{genericItem:"teleport"}],
						roomDescriptions:[
							[
								"{ifMoveOn:teleport}{and}{ifRoomIsMarked:teleportRoom}{then}{randomTeleportation}, {markItem:teleport}, {teleportToRoom:hiddenRoom}"
							]
						]
					},
					{
						id:"switchRoom",
						atPercentage:99,
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{ifKilledLastFoe}{then}{randomMysteryHappens}, {markRoom:teleportRoom}"
							]
						]
					},
					{
						id:"hiddenRoom",
						isHiddenRoom:true,
						atPercentage:{from:1,to:99},
						items:[{genericItem:"item"}],
						roomDescriptions:[
							// [CODEX-Stuff] Item - Red Die: Gives you a random good reward.
							[ "{randomConfusion}", "{ifMoveOn:item}{then}You found the Red Die, {randomGoodReward}, {teleportToRoom:teleportRoom}" ],
							// [CODEX-Stuff] Item - Blue Die: Gives you a random bad reward.
							[ "{randomConfusion}", "{ifMoveOn:item}{then}You found the Blue Die, {randomBadReward}, {teleportToRoom:teleportRoom}" ],
						]
					}
				],
				[
					{
						id:"teleportRoom",
						atPercentage:10,
						items:[{genericItem:"teleport"}],
						roomDescriptions:[
							[
								"{ifMoveOn:teleport}{and}{ifRoomIsMarked:teleportRoom}{then}{randomTeleportation}, {markItem:teleport}, {teleportToRoom:hiddenRoom}"
							]
						]
					},
					{
						id:"switchRoom",
						atPercentage:99,
						items:[{id:"enemy",level:0}],
						roomDescriptions:[
							[
								"{ifKilledLastFoe}{then}{randomMysteryHappens}, {markRoom:teleportRoom}"
							]
						]
					},
					{
						id:"hiddenRoom",
						isHiddenRoom:true,
						atPercentage:{from:1,to:99},
						items:[{id:"enemy",level:2,ignoreXp:true}],
						roomDescriptions:[
							[ "{randomConfusion}", "{ifNoFoes}{then}{randomTeleportation}, {teleportToRoom:teleportRoom}" ],
						]
					}
				]
			]
		},

		{
			probability:40,
			id:"[CODEX-Events] Subquest - The Beastcrafters: A simple trading card game Stampadians used to play. Buy or find new cards and play.",
			steps:BEASTCRAFTERS.events
		},
	]

}

function loadQuestsVeryHardSub() {
	return [
		{
			id:"[CODEX-Events] Filler (very hard) - The One: One Level 4 enemy.",
			steps:[[{id:"spawn",isOptionalRoom:true,atPercentage:{from:1,to:99},roomDescriptions:[
				[ "\"Your bones taste good. Give me bones.\"" ],
				[ "\"You woke me up from my sleep. Now you will die.\"" ],
				[ "\"You should be my lunch. Come closer!\"" ]
			],items:[{id:"enemy",level:3,ignoreXp:true}]}]]
		},
		{
			
			id:"[CODEX-Events] Filler (very hard) - The Deadly Sip: Gain all your health... or die.",
			steps:[
				[
					{
						id:"room",
						isOptionalRoom:true,
						atPercentage:{from:1,to:99},
						items:[{genericItem:"glass"}],
						roomDescriptions:[
							[
								"There is a bottle with a black liquid in a glass display case.",
								"{ifMoveOn:glass}{and}\"Let's end this\"{then}{markItem:glass}, {rollDie}{range:1-4} {loseFullHp}, {range:5-6} {gainFullHp}"
							],
						]
					}
				]
			]
		},
		{
			id:"[CODEX-Events] Filler (very hard) - The Critters: Five level 0 enemy.",
			steps:[[{id:"spawn",isOptionalRoom:true,atPercentage:{from:1,to:99},roomDescriptions:[
				[ "\"Meat! Meat! Meat!\"" ],
				[ "\"It's mine! It's mine! It's mine!\"" ],
				[ "\"Yummy!\"" ]
			],items:[{id:"enemy",level:0,ignoreXp:true},{id:"enemy",level:0,ignoreXp:true},{id:"enemy",level:0,ignoreXp:true},{id:"enemy",level:0,ignoreXp:true},{id:"enemy",level:0,ignoreXp:true}]}]]
		},
		{steps:[[]]},{steps:[[]]},{steps:[[]]},{steps:[[]]},{steps:[[]]},{steps:[[]]},
		{steps:[[]]},{steps:[[]]},{steps:[[]]},{steps:[[]]},{steps:[[]]},{steps:[[]]}
	];
}