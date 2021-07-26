/* exported loadQuestsBonus loadQuestsMalus */

function loadQuestsBonus() {

	const
		SHOPITEMS=[
			{cost:3,effect:"{gainHp:1}"},
			{cost:10,effect:"{gainHp:2}"},
			{cost:5,effect:"{gainXp:1}"},
		];

	const SHOP=[];

	SHOPITEMS.forEach(item=>{
		SHOP.push([ "{ifMoveOn:item}{and}{payGold:"+item.cost+"}{then}{randomShopKeeper}, "+item.effect+", {markItem:item}"]);
	})

	return [

		// Bonus item
		{
			minRooms:2,
			steps:[{id:"spawn",atPercentage:100,roomDescriptions:[
				[ "{ifMoveOn:item}{then}You found {randomGoodLoot}, {markItem:item}" ]
			],items:[{genericItem:"item"}]}]
		},

		// Lore NPCs
		{
			minRooms:2,
			steps:[{id:"spawn",atPercentage:100,roomDescriptions:[

				// The Travellers, who has interesting unanswered questions about Stampadia...
				[ "{ifMoveOn:item}{then}Traveller: \"Are the wall of this dungeon moving?\"" ],
				[ "{ifMoveOn:item}{then}Traveller: \"Is this world just... someone's dream?\"" ],
				[ "{ifMoveOn:item}{then}Traveller: \"Is the Monk I meet around ever the same?\"" ],
				[ "{ifMoveOn:item}{then}Traveller: \"Is this the first time I enter this place?\"" ],

				// The Ghosts, who gives cryptic tips on gameplay...
				[ "{ifMoveOn:item}{then}Ghost: \"You don't have to use both of them.\"" ],
				[ "{ifMoveOn:item}{then}Ghost: \"What you see is not always what you get.\"" ],
				[ "{ifMoveOn:item}{then}Ghost: \"Sometimes looking back is not a waste of money.\"" ],
				[ "{ifMoveOn:item}{then}Ghost: \"The second time is always easier.\"" ],
				[ "{ifMoveOn:item}{then}Ghost: \"Time is money. Make sure to spend it well.\"" ],

				// The Monks, who are mapping all the dungeons...
				[ "{ifMoveOn:item}{then}Monk: \"Excuse me, where the exit is located? Thanks!\", {markItem:item}" ],
				[ "{ifMoveOn:item}{then}Monk: \"Excuse me, what is your name? Thanks!\", {markItem:item}" ],
				[ "{ifMoveOn:item}{then}Monk: \"Excuse me, was the previous room squared? Thanks!\", {markItem:item}" ],
				[ "{ifMoveOn:item}{then}Monk: \"Excuse me, do you know the {goodGuyName}? Thanks!\", {markItem:item}" ],
				[ "{ifMoveOn:item}{then}Monk: \"Excuse me, are you a {heroClass}? Thanks!\", {markItem:item}" ],
				[ "{ifMoveOn:item}{then}Monk: \"Excuse me, is the {villainName} here? Thanks!\", {markItem:item}" ],
				[ "{ifMoveOn:item}{then}Monk: \"Excuse me, are we at the {placeName}? Thanks!\", {markItem:item}" ],

				// The Carpenters, who are looking for a strange machine to fix...
				[ "{ifMoveOn:item}{then}Carpenter: \"Someone here asked for my help...\"" ],
				[ "{ifMoveOn:item}{then}Carpenter: \"Where is the machine I've to fix?\"" ],
				[ "{ifMoveOn:item}{then}Carpenter: \"Did you find any spare parts lying around?\"" ],
				[ "{ifMoveOn:item}{then}Carpenter: \"Damn... is the ink already out?\"" ],
				[ "{ifMoveOn:item}{then}Carpenter: \"They will have to pay me well for this job!\"" ],

				// Sergio, the mysterious wandering philosopher...
				[ "{ifMoveOn:item}{then}Sergio: \"And so I'm here. A philosopher in a world of monsters.\""],
				[ "{ifMoveOn:item}{then}Sergio: \"Is this really the best possible world?\""],
				[ "{ifMoveOn:item}{then}Sergio: \"I spent my life spent inventing such a weird world...\""],
				[ "{ifMoveOn:item}{then}Sergio: \"Maybe we need a new world. With a lot of self-irony.\""],
				[ "{ifMoveOn:item}{then}Sergio: \"Is this really the best possible world?\""],
				[ "{ifMoveOn:item}{then}Sergio: \"Dignity, of course. And some good self-irony.\""],

			],items:[{genericItem:"item"}]}]
		},

		// Teleport shortcut
		{
			minRooms:4,
			steps:[
				{id:"roomA",atPercentage:1,roomDescriptions:[
					[ "{ifMoveOn:item1}{then}{randomTeleportation}, {teleportToRoom:roomB}" ]
				],items:[{genericItem:"item1"}]},
				{id:"roomB",atPercentage:100,roomDescriptions:[
					[ "{ifMoveOn:item2}{then}{randomTeleportation}, {teleportToRoom:roomA}" ]
				],items:[{genericItem:"item2"}]}
			]
		},

		// Shop
		{
			minRooms:2,
			steps:[{id:"spawn",atPercentage:100,roomDescriptions:SHOP
			,items:[{genericItem:"item"}]}]
		},
	];
}

function loadQuestsMalus() {

	return [

		// Switch trap room
		{
			steps:[{id:"trap",atPercentage:100,items:[{genericItem:"switch"}],roomDescriptions:[
				[ "{ifMoveOn:switch}{then}{randomTrap}, {loseHp:1}, {markItem:switch}" ]
			]}]
		},

		// Teleport to starting room
		{
			steps:[{id:"trap",atPercentage:100,roomDescriptions:[
				[ "{ifEnterRoom}{and}{ifRoomIsNotMarked:trap}{then}{markRoom:trap}, {teleportToStartingRoom}" ]
			]}]
		},

		// Teleport to enemy
		{
			minRooms:4,
			steps:[
				{id:"switch",atPercentage:51,roomDescriptions:[
					[ "{ifMoveOn:item1}{then}{randomTeleportation}, {markItem:item1}, {teleportToRoom:trap}" ]
				],items:[{genericItem:"item1"}]},
				{id:"trap",atPercentage:100,roomDescriptions:[
					[ "\"You fell in my trap!\"" ],
					[ "\"What are you doing here?!\"" ],
					[ "\"Hey... YOU!\"" ],
					[ "\"Well well... What we have here?\"" ],
					[ "\"Food... appeared...\"" ],
				],items:[{id:"enemy",level:2}]}
			]
		},
		
		// Random trap room
		{
			steps:[{id:"trap",atPercentage:100,roomDescriptions:[
				[ "{ifEnterRoom}{and}{ifRoomIsNotMarked:trap}{then}{markRoom:trap}, {rollDie}{range:1-4} {loseHp:1}, {range:5-6} {nothing}" ],
				[ "{ifEnterRoom}{and}{ifRoomIsNotMarked:trap}{then}{markRoom:trap}, {rollDie}{range:1-2} {loseHp:2}, {range:3-6} {nothing}" ]
			]}]
		},
	];

}