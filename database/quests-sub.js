/* exported loadQuestsSub */

function loadQuestsSub() {

	return [

		// The Guardians: kill 2 mini-boss and earn 2 XPs
		{
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
								"{ifNoFoes}{and}{markRoom:guardian2}{then}{gainXp:2}"
							]
						]
					},
					{
						id:"guardian2",
						atPercentage:100,
						items:[{id:"enemy",level:2}],
						roomDescriptions:[
							[									
								"\"We are the Guardian Twins. We cannot let you pass.\", {markRoom:guardian2}, {noEscape}",
								"{ifNoFoes}{and}{ifRoomIsMarked:guardian1}{then}{gainXp:2}"
							]
						]
					}
				]
			]
		},

		// The fountains: decide between two bonuses
		{
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
						atPercentage:100,
						items:[{genericItem:"switch"}],
						roomDescriptions:[
							["{ifMoveOn:switch}{and}{ifRoomIsNotMarked:room2}{then}You drink{hide}from {randomGoodFountain+randomBadFountain}, {markRoom:room2}, {markRoom:room1}"]
						]
					}
				]
			]
		},

		// The linked rooms: walk on a cell and enable another room effect.
		{
			minRooms:3,
			steps:[
				[
					{
						id:"switchRoom",
						atPercentage:60,
						items:[{genericItem:"switch"}],
						roomDescriptions:[
							[ "{ifMoveOn:switch}{then}{randomMysteryHappens}{hide}{markRoom:switchRoom}, {markItem:switch}" ]
						]
					},
					{
						id:"switchEffect",
						atPercentage:100,
						roomDescriptions:[
							[ "{ifRoomIsMarked:switchRoom}{and}{ifRoomIsNotMarked:switchEffect}{then}{hide}{randomGoodRoomEffect+randomBadRoomEffect}, {markRoom:switchEffect}" ]
						]
					}
				]
			]
		},

		// The key and the chests: find the key and open one of two random chests.
		{
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
						atPercentage:100,
						items:[{genericItem:"chest"}],
						roomDescriptions:[
							["{ifMoveOn:chest}{and}{ifRoomIsMarked:keyRoom}{and}{ifRoomIsNotMarked:chestRoom2}{then}You found{hide}{randomGoodLoot+randomBadLoot}, {markRoom:chestRoom1}, {markRoom:chestRoom2}"]
						]
					}
				]
			]
		},

		// The key and the chest: find the key and open one good chest.
		{
			minRooms:3,
			steps:[
				[
					{
						id:"keyRoom",
						atPercentage:100,
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

		// The Gambler: bet Gold, roll a die and you may win more gold.
		{
			minRooms:3,
			steps:[
				[
					{
						id:"keyRoom",
						atPercentage:100,
						items:[{genericItem:"gambler"}],
						roomDescriptions:[
							[ 
								"Gambler: {randomGambler}",
								"{ifMoveOn:gambler}{and}{payGold:3}{then}{markItem:gambler}, {rollDie}{range:1-4} {nothing}, {range:5-6} {gainGold:6}"
							]
						]
					}
				]
			]
		},

		// The Bloody Gambler: bet HP, roll a die and you may win more HP.
		{
			minRooms:3,
			steps:[
				[
					{
						id:"keyRoom",
						atPercentage:100,
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

		// The Altar: Sacrify important resources for other advantages.
		{
			minRooms:2,
			steps:[
				[
					{
						id:"keyRoom",
						atPercentage:100,
						items:[{genericItem:"altar"}],
						roomDescriptions:[
							[ "{ifMoveOn:altar}{and}{randomHighCost}{then}Altar: {randomAltar}, {randomHighPrize}, {markItem:altar}" ],
						]
					}
				]
			]
		},

		// The Sphynx: Give the right answer, meet the Sphynx and get your reward.
		{
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
						atPercentage:100,
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
						atPercentage:100,
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

		// The Murderer: avenge the dead body or steal its gold?
		{
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
						atPercentage:100,
						items:[{id:"enemy",level:1}],
						roomDescriptions:[
							[
								"{randomMurderer}",
								"{ifKilledLastFoe}{and}{ifRoomIsMarked:killerRoom}{then}{hide}You avenged the {victimName}, {randomGoodReward}, {markRoom:killerRoom}"
							]
						]
					}
				]
			]
		},
	]

}