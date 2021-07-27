/* exported loadQuestsSub */

function loadQuestsSub() {

	return [

		// Kill 2 mini-boss and earn 2 XPs
		{
			minRooms:3,
			steps:[
				{
					id:"guardian1",
					atPercentage:60,
					items:[{id:"enemy",level:2}],
					roomDescriptions:[
						[									
							"\"We are the Guardian Twins. We cannot let you pass.\", {markRoom:guardian1}, {cantLeave}",
							"{ifLastEnemyKilled}{and}{markRoom:guardian2}{then}{gainXp:2}"
						]
					]
				},
				{
					id:"guardian2",
					atPercentage:100,
					items:[{id:"enemy",level:2}],
					roomDescriptions:[
						[									
							"\"We are the Guardian Twins. We cannot let you pass.\", {markRoom:guardian2}, {cantLeave}",
							"{ifLastEnemyKilled}{and}{ifRoomIsMarked:guardian1}{then}{gainXp:2}"
						]
					]
				}
			]
		},

		// Fountains: decide between two bonuses
		{
			minRooms:3,
			steps:[
				{
					id:"room1",
					atPercentage:60,
					items:[{genericItem:"switch"}],
					roomDescriptions:[
						["{ifMoveOn:switch}{and}{ifRoomIsNotMarked:room1}{then}You drink from {randomGoodFountain+randomBadFountain}, {markRoom:room1}, {markRoom:room2}"]
					]
				},
				{
					id:"room2",
					atPercentage:100,
					items:[{genericItem:"switch"}],
					roomDescriptions:[
						["{ifMoveOn:switch}{and}{ifRoomIsNotMarked:room2}{then}You drink from {randomGoodFountain+randomBadFountain}, {markRoom:room2}, {markRoom:room1}"]
					]
				}
			]
		},

		// Walk on a cell and enable another room effect.
		{
			minRooms:3,
			steps:[
				{
					id:"switchRoom",
					atPercentage:60,
					items:[{genericItem:"switch"}],
					roomDescriptions:[
						[ "{ifMoveOn:switch}{then}{randomMysteryHappens}, {markRoom:switchRoom}, {markItem:switch}" ]
					]
				},
				{
					id:"switchEffect",
					atPercentage:100,
					roomDescriptions:[
						[ "{ifRoomIsMarked:switchRoom}{and}{ifRoomIsNotMarked:switchEffect}{then}{randomGoodRoomEffect+randomBadRoomEffect}, {markRoom:switchEffect}" ]
					]
				}
			]
		},

		// Found the key and open one of two random chests.
		{
			minRooms:3,
			steps:[
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
						["{ifMoveOn:chest}{and}{ifRoomIsMarked:keyRoom}{and}{ifRoomIsNotMarked:chestRoom1}{then}You found {randomGoodLoot+randomBadLoot}, {markRoom:chestRoom1}, {markRoom:chestRoom2}"]
					]
				},
				{
					id:"chestRoom2",
					atPercentage:100,
					items:[{genericItem:"chest"}],
					roomDescriptions:[
						["{ifMoveOn:chest}{and}{ifRoomIsMarked:keyRoom}{and}{ifRoomIsNotMarked:chestRoom2}{then}You found {randomGoodLoot+randomBadLoot}, {markRoom:chestRoom1}, {markRoom:chestRoom2}"]
					]
				}
			]
		},

		// Found the key and open one good chest.
		{
			minRooms:3,
			steps:[
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
						["{ifMoveOn:chest}{and}{ifRoomIsMarked:keyRoom}{then}You found {randomGoodLoot}, {markItem:chest}"]
					]
				}
			]
		},

		// The Gambler: bet Gold, roll a die and you may win more gold.
		{
			minRooms:3,
			steps:[
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
		},

		// The Bloody Gambler: bet HP, roll a die and you may win more HP.
		{
			minRooms:3,
			steps:[
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
		}
	]

}