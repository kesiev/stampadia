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
		SHOP.push([ "{ifMoveOn:item}{and}{ifPayGold:"+item.cost+"}{then}{randomShopKeeper}, "+item.effect+", {markItem:item}"]);
	})

	return [

		// [CODEX-Events] Bonus - The Random Item: A random bonus item.
		{
			minRooms:2,
			steps:[[{id:"spawn",atPercentage:100,roomDescriptions:[
				[ "{ifMoveOn:item}{then}{hide}You found {randomGoodLoot}, {markItem:item}" ]
			],items:[{genericItem:"item"}]}]]
		},

		// [CODEX-Events] Bonus - The NPC: Learn about the Stampadia lore by Stampadians.
		{
			minRooms:2,
			steps:[[{id:"spawn",atPercentage:100,roomDescriptions:[

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

			],items:[{genericItem:"item"}]}]]
		},

		// [CODEX-Events] Bonus - The Teleports: Teleport from a room to another.
		{
			minRooms:4,
			steps:[[
				{id:"roomA",atPercentage:1,roomDescriptions:[
					[ "{ifMoveOn:item1}{then}{randomTeleportation}{hide}{teleportToRoom:roomB}" ]
				],items:[{genericItem:"item1"}]},
				{id:"roomB",atPercentage:100,roomDescriptions:[
					[ "{ifMoveOn:item2}{then}{randomTeleportation}{hide}{teleportToRoom:roomA}" ]
				],items:[{genericItem:"item2"}]}
			]]
		},

		// [CODEX-Events] Bonus - The Shop: Pay gold for useful items.
		{
			minRooms:2,
			steps:[[
				{id:"spawn",atPercentage:100,roomDescriptions:SHOP
				,items:[{genericItem:"item"}]}
			]]
		},

		// [CODEX-Events] Bonus - The Saint: They will help you when you're in danger.
		{
			minRooms:4,
			steps:[[
				{id:"roomA",atPercentage:{from:50,to:100},roomDescriptions:[
					[ "{ifMoveOn:saint}{and}{ifHpLeft=:0}{then}Saint: {randomSaint}, {gainHp:2}, {markItem:saint}" ]
				],items:[{genericItem:"saint"}]}
			]]
		},

		// [CODEX-Events] Bonus - The Magic Tree: It grows a healing fruit after some time.
		{
			minRooms:2,
			steps:[
				[
					{id:"roomA",atPercentage:{from:1,to:100},roomDescriptions:[
						[
							"{randomMagicTree}",
							"{ifMoveOn:tree}{and}{ifGoldLeft<half}{then}You pick a Fruit, {randomGoodReward}, {markItem:tree}"
						]
					],items:[{genericItem:"tree"}]}
				],
				[
					{id:"roomA",atPercentage:{from:1,to:100},roomDescriptions:[
						[
							"{randomMagicTree}",
							"{ifMoveOn:tree}{and}{ifGoldLeft>half}{then}You pick a Fruit, {randomGoodReward}, {markItem:tree}"
						]
					],items:[{genericItem:"tree"}]}
				],
			]
		},

		// [CODEX-Events] Bonus - The Mirror: Go back to this room using an item.
		{
			minRooms:2,
			steps:[
				[
					{id:"equip-mirror-room",atPercentage:100,equipment:[{id:"mirror"}],roomDescriptions:[
						[
							"{ifMoveOn:mirror}{then}You see your reflection on a large mirror, {markItem:mirror}, {getEquip:equip-mirror}"
						]
					],items:[{genericItem:"mirror"}]}
				]
			]
		},

		// [CODEX-Events] Bonus - The Clover: It may bring good luck in your future adventures...
		{
			minRooms:2,
			steps:[
				[
					{id:"roomA",atPercentage:100,roomDescriptions:[
						[
							"{ifMoveOn:item}{and}{ifLoseKeyword:luck}{then}You found{hide}{randomGoodLoot}, {markItem:item}",
							"{ifMoveOn:item}{and}{ifNotKeyword:luck}{then}You found a clover, {getKeyword:luck}, {markItem:item}"
						]
					],items:[{genericItem:"item"}]}
				]
			]
		},

		// [CODEX-Events] Bonus - The Clown: Pay him to learn cool stunts!
		{
			minRooms:1,
			steps:[
				[
					{id:"clownRoom",atPercentage:100,equipment:[{id:"backflip"}],roomDescriptions:[
						[
							"{ifMoveOn:clown}{and}{ifPayGold:5}{then}Clown: \"Nice jump, {heroClass}!\", {getEquip:equip-backflip}, {markItem:clown}"
						]
					],items:[{genericItem:"clown"}]}
				],
				[
					{id:"clownRoom",atPercentage:100,equipment:[{id:"spin"}],roomDescriptions:[
						[
							"{ifMoveOn:clown}{and}{ifPayGold:5}{then}Clown: \"Nice dancing, {heroClass}!\", {getEquip:equip-spin}, {markItem:clown}"
						]
					],items:[{genericItem:"clown"}]}
				],
				[
					{id:"clownRoom",atPercentage:100,equipment:[{id:"lunge"}],roomDescriptions:[
						[
							"{ifMoveOn:clown}{and}{ifPayGold:5}{then}Clown: \"Nice stretch, {heroClass}!\", {getEquip:equip-lunge}, {markItem:clown}"
						]
					],items:[{genericItem:"clown"}]}
				],
				[
					{id:"clownRoom",atPercentage:100,equipment:[{id:"sweep"}],roomDescriptions:[
						[
							"{ifMoveOn:clown}{and}{ifPayGold:5}{then}Clown: \"Nice sweep, {heroClass}!\", {getEquip:equip-sweep}, {markItem:clown}"
						]
					],items:[{genericItem:"clown"}]}
				]
			]
		},

	];
}

function loadQuestsMalus() {

	return [

		// [CODEX-Events] Malus - The Switch Trap: Step on a trap to get injured.
		{
			steps:[[{id:"trap",atPercentage:100,items:[{genericItem:"switch"}],roomDescriptions:[
				[ "{ifMoveOn:switch}{then}{hide}{randomTrap}, {loseHp:1}, {markItem:switch}" ]
			]}]]
		},

		// [CODEX-Events] Malus - The Loop Rooms: It will teleport you to the starting room.
		{
			steps:[[{id:"trap",atPercentage:{from:50,to:100},roomDescriptions:[
				[ "{ifEnterRoom}{and}{ifRoomIsNotMarked:trap}{then}{markRoom:trap}, {teleportToStartingRoom}" ]
			]}]]
		},

		// [CODEX-Events] Malus - The Teleport Trap: It will teleport you to a room with an enemy.
		{
			minRooms:4,
			steps:[[
				{id:"switch",atPercentage:51,roomDescriptions:[
					[ "{ifMoveOn:item1}{then}{randomTeleportation}{hide}{markItem:item1}, {teleportToRoom:trap}" ]
				],items:[{genericItem:"item1"}]},
				{id:"trap",atPercentage:100,roomDescriptions:[
					[ "\"You fell in my trap!\"" ],
					[ "\"What are you doing here?!\"" ],
					[ "\"Hey... YOU!\"" ],
					[ "\"Well well... What we have here?\"" ],
					[ "\"Food... appeared...\"" ],
				],items:[{id:"enemy",level:2}]}
			]]
		},
		
		// [CODEX-Events] Malus - The Random Trap: Dodge a trap rolling a die.
		{
			steps:[[{id:"trap",atPercentage:100,roomDescriptions:[
				[ "{ifEnterRoom}{and}{ifRoomIsNotMarked:trap}{then}{markRoom:trap}, {rollDie}{range:1-4} {loseHp:1}, {range:5-6} {nothing}" ],
				[ "{ifEnterRoom}{and}{ifRoomIsNotMarked:trap}{then}{markRoom:trap}, {rollDie}{range:1-2} {loseHp:2}, {range:3-6} {nothing}" ]
			]}]]
		},

		// [CODEX-Events] Malus - The Last Fight: An enemy will challenge you on your way back.
		{
			steps:[[{id:"enemy",atPercentage:50,items:[{id:"enemy",level:2}],roomDescriptions:[
				[
					"{ifRoomIsNotMarked:startingRoom}{then}{roomIsEmpty}, {stopReading}",
					"{randomEnemyChallenge}"
				]
			]}]]
		},

		// [CODEX-Events] Malus - The Timed Traps: Defuse it with the right timing or it will trigger!
		{
			minRooms:2,
			steps:[
				[
					{id:"roomA",atPercentage:100,roomDescriptions:[
						[
							"{ifEnterRoom}{and}{ifRoomIsNotMarked:roomA}{and}{ifGoldLeft<half}{then}The trap is triggered, {randomBadReward}, {markRoom:roomA}",
							"{ifEnterRoom}{and}{ifRoomIsNotMarked:roomA}{and}{ifGoldLeft>half}{then}The trap clicks, {markRoom:roomA}"
						]
					]}
				],
				[
					{id:"roomA",atPercentage:100,roomDescriptions:[
						[
							"{ifEnterRoom}{and}{ifRoomIsNotMarked:roomA}{and}{ifGoldLeft>half}{then}The trap is triggered, {randomBadReward}, {markRoom:roomA}",
							"{ifEnterRoom}{and}{ifRoomIsNotMarked:roomA}{and}{ifGoldLeft<half}{then}The trap clicks, {markRoom:roomA}"
						]
					]}
				]
			]
		},

		// [CODEX-Events] Malus - The Witch: Pay her or she will curse you!
		{
			minRooms:2,
			steps:[
				[
					{id:"witchRoom",items:[{genericItem:"witch"}],atPercentage:{from:10,to:40},roomDescriptions:[
						[
							"{ifMoveOn:witch}{and}{ifPayGold:3}{then}Witch: \"Thank you, {heroClass}! Heh heh...\", {markRoom:witchRoom}, {markItem:witch}"
						]
					]},
					{id:"cursedRoom",atPercentage:100,roomDescriptions:[
						[
							"{ifEnterRoom}{and}{ifRoomIsNotMarked:cursedRoom}{and}{ifRoomIsNotMarked:witchRoom}{then}{randomBadFeeling}, {randomBadReward}, {markRoom:cursedRoom}"
						]
					]}
				]
			]
		},

		// [CODEX-Events] Malus - The Mercenary: Eliminate an enemy or pay the Mercenary to do that.
		{
			minRooms:3,
			steps:[
				[
					{id:"mercenaryRoom",items:[{genericItem:"mercenary"}],atPercentage:10,roomDescriptions:[
						[
							"{ifMoveOn:mercenary}{and}{ifPayGold:5}{then}Mercenary: {randomOk}, {markRoom:mercenaryRoom}, {markItem:mercenary}"
						]
					]},
					{id:"enemyRoom",atPercentage:100,roomDescriptions:[
						[
							"{ifEnterRoom}{and}{ifRoomIsMarked:mercenaryRoom}{then}{randomCorpse}, {roomIsEmpty}, {stopReading}",
							"{randomEnemyChallenge}"
						]
					],items:[{id:"enemy",level:2}]}
				]
			]
		},

		// [CODEX-Events] Malus - The Small Horn: It may bring bad luck in your future adventures...
		{
			minRooms:2,
			steps:[
				[
					{id:"roomA",atPercentage:100,roomDescriptions:[
						[
							"{ifEnterRoom}{and}{ifRoomIsNotMarked:roomA}{and}{ifKeyword:unluck}{then}{randomBadReward}, {loseKeyword:unluck}, {markRoom:roomA}",
							"{ifEnterRoom}{and}{ifRoomIsNotMarked:roomA}{then}You found a small horn, {getKeyword:unluck}, {markRoom:roomA}"
						]
					],items:[{genericItem:"item"}]}
				]
			]
		},
	];

}