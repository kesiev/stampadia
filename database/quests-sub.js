/* exported loadQuestsSub */

function loadQuestsSub() {

	const
		QUEST_RARE=40,
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
			labels:["Challenger","Card"],
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
					labels:["Booster"],
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
						labels:["Near Guardian"],
						atPercentage:60,
						items:[{id:"enemy",level:2}],
						roomDescriptions:[
							[									
								"\"We are the Guardian Twins. We cannot let you pass.\", {markRoom:guardian1}",
								"{ifKilledLastFoe}{and}{markRoom:guardian2}{then}{gainXp:2}"
							]
						]
					},
					{
						id:"guardian2",
						labels:["Far Guardian"],
						atPercentage:99,
						items:[{id:"enemy",level:2}],
						roomDescriptions:[
							[									
								"\"We are the Guardian Twins. We cannot let you pass.\", {markRoom:guardian2}",
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
						labels:["Near Waters"],
						atPercentage:60,
						items:[{genericItem:"switch"}],
						roomDescriptions:[
							["{ifMoveOn:switch}{and}{ifRoomIsNotMarked:room1}{then}You drink{hide}from {randomGoodFountain+randomBadFountain}, {markRoom:room1}, {markRoom:room2}"]
						]
					},
					{
						id:"room2",
						labels:["Far Waters"],
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
						labels:["Switch"],
						atPercentage:{from:1,to:99},
						items:[{genericItem:"switch"}],
						roomDescriptions:[
							[ "{ifMoveOn:switch}{then}{randomMysteryHappens}{hide}{markRoom:switchRoom}, {markItem:switch}" ]
						]
					},
					{
						id:"switchEffect",
						labels:["Switched"],
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
						labels:["Lock Key"],
						atPercentage:60,
						items:[{genericItem:"key"}],
						roomDescriptions:[
							[ "{ifMoveOn:key}{then}You found {randomSmallKey}, {markRoom:keyRoom}, {markItem:key}" ]
						]
					},
					{
						id:"chestRoom1",
						atPercentage:1,
						labels:["First Chest"],
						items:[{genericItem:"chest"}],
						roomDescriptions:[
							["{ifMoveOn:chest}{and}{ifRoomIsMarked:keyRoom}{and}{ifRoomIsNotMarked:chestRoom1}{then}You found{hide}{randomGoodLoot+randomBadLoot}, {markRoom:chestRoom1}, {markRoom:chestRoom2}"]
						]
					},
					{
						id:"chestRoom2",
						labels:["Last Chest"],
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
						labels:["Good Key"],
						atPercentage:99,
						items:[{genericItem:"key"}],
						roomDescriptions:[
							[ "{ifMoveOn:key}{then}You found {randomSmallKey}, {markRoom:keyRoom}, {markItem:key}" ]
						]
					},
					{
						id:"chestRoom1",
						labels:["Tiny Chest"],
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
						labels:["Betting","Bet"],
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
					labels:["First "+chest.key],
					atPercentage:20,
					items:[{genericItem:"key"},{id:"enemy",level:0}],
					roomDescriptions:[
						[ "{ifMoveOn:key}{then}You found a "+chest.key+", {markRoom:keyRoom1}, {markItem:key}" ]
					]
				},
				{
					id:"keyRoom2",
					labels:["Last "+chest.key],
					atPercentage:60,
					items:[{genericItem:"key"},{id:"enemy",level:1}],
					roomDescriptions:[
						[ "{ifMoveOn:key}{then}You found a "+chest.key+", {markRoom:keyRoom2}, {markItem:key}" ]
					]
				},
				{
					id:"chestRoom",
					labels:["Great Chest"],
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
					labels:["Training"],
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
						labels:["Risky","Risk"],
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
						labels:["Pray","Prayer"],
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
						labels:["Answer"],
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
						labels:["Question"],
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
						labels:["Answer"],
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
						labels:["Question"],
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
						labels:["Victim","Innocence"],
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
						labels:["Vegeance","Justice"],
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
						labels:["Alcohol","Serving","Drinking"],
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
						labels:["Rumors","Rumored"],
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
						labels:["Alcohol","Serving","Drinking"],
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
						labels:["Rumors","Rumored"],
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
						labels:["Shapes"],
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
						labels:["Shape"],
						atPercentage:{from:1,to:99},
						items:[{genericItem:"circle"},{id:"enemy",level:1}],
						roomDescriptions:[
							[ "{ifMoveOn:circle}{then}The engraved circle on the floor is now glowing, {markItem:circle}, {markRoom:circleRoom}" ]
						]
					},
					{
						id:"triangleRoom",
						labels:["Hint"],
						atPercentage:{from:1,to:99},
						items:[{genericItem:"puzzle"}],
						roomDescriptions:SHAPE_PUZZLES
					}
				],
				// Square+circle, triangle, puzzle room
				[
					{
						id:"squareRoom",
						labels:["Shapes"],
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
						labels:["Shape"],
						atPercentage:{from:1,to:99},
						items:[{genericItem:"triangle"},{id:"enemy",level:1}],
						roomDescriptions:[
							[ "{ifMoveOn:triangle}{then}The engraved triangle on the floor is now glowing, {markItem:triangle}, {markRoom:triangleRoom}" ]
						]
					},
					{
						id:"circleRoom",
						labels:["Hint"],
						atPercentage:{from:1,to:99},
						items:[{genericItem:"puzzle"}],
						roomDescriptions:SHAPE_PUZZLES
					}
				],
				// Triangle+circle, square, puzzle room
				[
					{
						id:"triangleRoom",
						labels:["Shapes"],
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
						labels:["Shape"],
						atPercentage:{from:1,to:99},
						items:[{genericItem:"square"},{id:"enemy",level:1}],
						roomDescriptions:[
							[ "{ifMoveOn:square}{then}The engraved square on the floor is now glowing, {markItem:square}, {markRoom:squareRoom}" ]
						]
					},
					{
						id:"circleRoom",
						labels:["Hint"],
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
						labels:["Sleeping"],
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
						labels:["Wake Up"],
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
						labels:["Hidden"],
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
						labels:["Sleeping"],
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
						labels:["Wake Up"],
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
						labels:["Hidden"],
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
			probability:QUEST_RARE,
			id:"[CODEX-Events] Subquest - The Beastcrafters: A simple trading card game Stampadians used to play. Buy or find new cards and play.",
			steps:BEASTCRAFTERS.events
		},

		{
			id:"[CODEX-Events] Subquest - The Broken Teleport: Solve the riddle to reach an item.",
			minRooms:2,
			steps:[
				{content:"apple"},
				{content:"invisibility"}
			].map(room=>[
					{
						id:"teleportRoom",
						labels:["Broken"],
						atPercentage:10,
						items:[{genericItem:"teleport"}],
						roomDescriptions:[
							[
								"{randomBrokenTeleport} Can you fix it?",
								"{ifMoveOn:teleport}{and}{ifRoomIsNotMarked:teleportRoom}{then}A sign says \"{teleportToRiddleRoom:secretRoom}\""
							]
						]
					},
					{
						id:"secretRoom",
						labels:[], // Riddle teleporters can't have a label.
						isHiddenRoom:true,
						atPercentage:{from:1,to:99},						
						items:[{genericItem:"item"}],
						equipment:[{id:room.content}],
						roomDescriptions:[
							[
								"{ifMoveOn:item}{then}{getEquip:equip-"+room.content+"}, {markItem:item}, {markRoom:teleportRoom}, {teleportToRoom:teleportRoom}"
							]
						]
					},
				]
			)
		},

		{
			id:"[CODEX-Events] Subquest - The Tapeworm: Kill the monster to stop him digesting you.",
			minRooms:3,
			steps:[
				[
					{
						id:"monsterRoom",
						labels:["Eater","Parasite","Head"],
						items:[{id:"enemy",level:2}],
						atPercentage:99,
						roomDescriptions:[
							"\"Yummy meat... escaped... stomach?\"",
							"\"{heroClass} food... hurts!\"",
							"\"Food... go back... belly!\""
						].map(line=>[
							line, "{ifKilledLastFoe}{then}{gainHp:1}, {markRoom:monsterRoom}"
						])
					},
					{
						id:"digestingRoom",
						labels:["Stomach","Eating"],
						atPercentage:{from:50,to:98},
						roomDescriptions:[
							[
								"Organic walls are trying to squeeze you.",
								"{ifEnterRoom}{and}{ifRoomIsNotMarked:monsterRoom}{then}The whole room is trying to digest you, {loseHp:1}"
							]
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Monk: Donate 1G to draw one room walls.",
			minRooms:1,
			steps:[
				[
					{
						id:"monkRoom",
						labels:["Map","Mapping","Peeking"],
						atPercentage:{from:1,to:99},
						items:[{genericItem:"monk"}],
						roomDescriptions:[
							[
								"{ifMoveOn:monk}{and}{ifPayGold:1}{then}Monk: \"Peek at my map!\", {discoverAnyRoom:1}, {markItem:monk}"
							]
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Traitor: Kill the enemy to learn where the boss is lurking.",
			minRooms:1,
			steps:[
				[
					{
						id:"traitorRoom",
						labels:["Traitor","Information"],
						atPercentage:100,
						items:[{id:"enemy",level:2}],
						roomDescriptions:[
							[
								"{ifKilledLastFoe}{then}\"What you're looking for... is... here...\", {discoverRoom:bossRoom}"
							]
						]
					}
				]
			]
		},

		{
			id:"[CODEX-Events] Subquest - The Landslide: Free a room from rubbles or prevent it from collapsing to get an reward.",
			minRooms:1,
			steps:[
				[
					{
						id:"landslideRoom",
						labels:["Landslide","Fallen","Broken"],
						atPercentage:{from:1,to:99},
						isOptionalRoom:true,
						items:[{genericItem:"pickup"}],
						roomDescriptions:[
							[
								"{ifRoomIsMarked:landslideRoom}{then}This room is collapsed, {goBack}",
								"{ifMoveOn:pickup}{then}You found{hide}{randomGoodLoot}, {markItem:pickup}"
							]
						]
					},
					{
						id:"switchRoom",
						labels:["Earthquake","Disaster"],
						atPercentage:{from:1,to:99},
						items:[{genericItem:"switch"},{id:"enemy",level:1,ignoreXp:true}],
						roomDescriptions:[
							[
								"{ifMoveOn:switch}{then}{randomMysteryHappens}{hide}{markRoom:landslideRoom}, {markItem:switch}"
							]
						]
					}
				],
				[
					{
						id:"landslideRoom",
						labels:["Landslide","Fallen","Blocked"],
						atPercentage:{from:1,to:99},
						isOptionalRoom:true,
						items:[{genericItem:"pickup"}],
						roomDescriptions:[
							[
								"{ifRoomIsNotMarked:landslideRoom}{then}This room is collapsed, {goBack}",
								"{ifMoveOn:pickup}{then}You found{hide}{randomGoodLoot}, {markItem:pickup}"
							]
						]
					},
					{
						id:"fixerRoom",
						labels:["Fixer","Worker"],
						atPercentage:{from:1,to:99},
						items:[{genericItem:"helper"},{id:"enemy",level:2}],
						roomDescriptions:[
							[
								"{ifKilledLastFoe}{then}\"Thank you!\"{hide}\"I'll help you with that room!\", {markRoom:landslideRoom}, {markItem:helper}"
							]
						]
					}
				]
			]
		}

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
						labels:["Bottle"],
						isOptionalRoom:true,
						atPercentage:{from:1,to:99},
						items:[{genericItem:"glass"}],
						roomDescriptions:[
							[
								"There is a bottle with a black liquid in a glass display case.",
								"{ifMoveOn:glass}{and}\"Let's end this\"{then}{markItem:glass}, {rollDie}{range:1-3} {loseFullHp}, {range:4-6} {gainFullHp}"
							],
						]
					}
				]
			]
		},
		{
			id:"[CODEX-Events] Filler (very hard) - The Critters: Five level 0 enemy.",
			steps:[[{id:"spawn",labels:["Crowded"],isOptionalRoom:true,atPercentage:{from:1,to:99},roomDescriptions:[
				[ "\"Meat! Meat! Meat!\"" ],
				[ "\"It's mine! It's mine! It's mine!\"" ],
				[ "\"Yummy!\"" ]
			],items:[{id:"enemy",level:0,ignoreXp:true},{id:"enemy",level:0,ignoreXp:true},{id:"enemy",level:0,ignoreXp:true},{id:"enemy",level:0,ignoreXp:true},{id:"enemy",level:0,ignoreXp:true}]}]]
		},
		{steps:[[]]},{steps:[[]]},{steps:[[]]},{steps:[[]]},{steps:[[]]},{steps:[[]]},
		{steps:[[]]},{steps:[[]]},{steps:[[]]},{steps:[[]]},{steps:[[]]},{steps:[[]]}
	];
}

// Anomalies can change the dungeon balance a little, suggesting the player to risk more.

function loadQuestsAnomalies() {
	return [
		{
			id:"[CODEX-Events] Anomaly - The Little Lost One: A level 0 enemy lost in the depth of the dungeon.",
			distance:"farthest",
			steps:[[{id:"spawn",atPercentage:100,roomDescriptions:[
				[ "\"Hey! I lost my way! Please, stop!\"" ],
				[ "\"Wh... where am I?\"" ],
				[ "\"Why I'm here!\"" ],
			],items:[{id:"enemy",level:0}]}]]
		},
		{
			id:"[CODEX-Events] Anomaly - The Lost Privacy: A level 1 in an optional room.",
			steps:[[{id:"spawn",atPercentage:100,roomDescriptions:[
				[ "\"I'm getting ready! Go away!\"" ],
				[ "\"I'm preparing for you, {heroClass}!\"" ],
				[ "\"Hey, go away!\"" ],
			],items:[{id:"enemy",level:1,ignoreXp:true}]}]]
		},
		{
			id:"[CODEX-Events] Anomaly - The Couple: 2 level 0 enemy in the depth of the dungeon.",
			distance:"farthest",
			steps:[[{id:"spawn",atPercentage:100,roomDescriptions:[
				[ "\"My love... We have to defend ourselves!\"" ],
				[ "\"Hey, stop talking! That {heroClass} is spying!\"" ],
				[ "\"Hey! Are you that {heroClass} they are talking about?\"" ],
			],items:[{id:"enemy",level:0},{id:"enemy",level:0}]}]]
		},
		{
			id:"[CODEX-Events] Anomaly - The One In Late: A level 1 enemy lost in the depth of the dungeon.",
			distance:"farthest",
			steps:[[{id:"spawn",atPercentage:100,roomDescriptions:[
				[ "\"Hey! You're here too early!\"" ],
				[ "\"Y... you woke me up, {heroClass}!\"" ],
				[ "\"What time is it? Oww...\"" ],
			],items:[{id:"enemy",level:1}]}]]
		},
	]
}
