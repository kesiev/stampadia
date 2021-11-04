/* exported loadQuestsStory */

function loadQuestsStory() {

	return [

		{
			id:"[CODEX-Events] Storyline - The End Of Stampadia: Discover how Stampadia ended.",
			steps:[
				[
					{
						id:"room",
						labels:["Sage","Machine","Creation"],
						atPercentage:99,
						isExclusive:true,
						items:[{genericItem:"npc"}],
						roomDescriptions:[
							[ "{ifMoveOn:npc}{then}\"We need machines, to help us create.\", {getKeyword:computer}, {markItem:npc}" ]
						]
					}
				],
				[
					{
						id:"room",
						labels:["Sage","Energy","Growth"],
						atPercentage:99,
						isExclusive:true,
						items:[{genericItem:"npc"}],
						roomDescriptions:[
							[ "{ifMoveOn:npc}{then}\"We need energy, to help us grow.\", {getKeyword:electricity}, {markItem:npc}" ]
						]
					}
				],
				[
					{
						id:"room",
						labels:["Sage","Wings","Flying"],
						atPercentage:99,
						isExclusive:true,
						items:[{genericItem:"npc"}],
						roomDescriptions:[
							[ "{ifMoveOn:npc}{then}\"We need wings, to help us fly.\", {getKeyword:spaceship}, {markItem:npc}" ]
						]
					}
				],
				[
					{
						id:"room",
						labels:["Sage","Wings","Flying"],
						atPercentage:99,
						isExclusive:true,
						items:[{genericItem:"npc"}],
						roomDescriptions:[
							[ "{ifMoveOn:npc}{then}\"We need places, to help us share.\", {getKeyword:city}, {markItem:npc}" ]
						]
					}
				],
				[
					{
						id:"room",
						labels:["Sage","Time","Pressing"],
						atPercentage:99,
						isExclusive:true,
						items:[{genericItem:"npc"}],
						roomDescriptions:[
							[
								"{ifMoveOn:npc}{and}{ifLoseKeyword:computer}{and}{ifLoseKeyword:electricity}{then}{getKeyword:press}",
								"{ifMoveOn:npc}{and}{ifKeyword:press}{then}\"Time is pressing, {heroClass}.\", {markItem:npc}"
							]
						]
					}
				],
				[
					{
						id:"room",
						labels:["Sage","Trace","Path"],
						atPercentage:99,
						isExclusive:true,
						items:[{genericItem:"npc"}],
						roomDescriptions:[
							[
								"{ifMoveOn:npc}{and}{ifLoseKeyword:spaceship}{and}{ifLoseKeyword:city}{then}{getKeyword:ink}",
								"{ifMoveOn:npc}{and}{ifKeyword:ink}{then}\"The path is traced, {heroClass}.\", {markItem:npc}"
							]
						]
					}
				],
				[
					{
						id:"room",
						labels:["Tearing","Scrap"],
						atPercentage:99,
						isExclusive:true,
						items:[{genericItem:"press"}],
						roomDescriptions:[
							[
								"There is a rusty printing press. There are glowing sheets of paper.",
								"{ifMoveOn:press}{and}{ifLoseKeyword:ink}{and}{ifLoseKeyword:press}{then}{hide}{getKeyword:end}, Tear off this sheet"
							]
						]
					}
				],
			]			
		},

	]

}

function loadQuestsScrolls() {
	return [
		{
			id:"[CODEX-Events] Storyline - The Rests: Finds from the world of stampadia.",
			steps:[
				[
					{
						id:"room",
						atPercentage:{from:50,to:70},
						allowBusyRooms:true,
						items:[{genericItem:"storylineRest"}],
						labels:["Rests"],
						roomDescriptions:[

							// Based on NPCs
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"That printing press is way too complex for me! - Carpenter\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"I thought I already mapped this place... - Monk\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"That printing press is a strong temptation - Sergio\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"I wish I had a map... - Traveller\"" ],

							// Based on anomalies
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"See you at the edge of the dungeon, my love! - Enemy\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"Tomorrow is my first day! I can do it! - Enemy\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"I hope not to get bothered as yesterday... - Enemy\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"Hey, me! Don't forget where to go this time! - Enemy\"" ],
							
							// Based on bonus
							[ "{ifMoveOn:storylineRest}{then}There is a book titled: \"Lucky Plants\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"I wonder where my circus friends have gone... - Clown\"" ],
							[ "{ifMoveOn:storylineRest}{then}There is a book titled: \"How To Grow Magic Trees\"" ],
							[ "{ifMoveOn:storylineRest}{then}There are a few schemes of a mirror-shaped teleporter." ],
							[ "{ifMoveOn:storylineRest}{then}There is a book titled: \"Dangerous Explosives\"" ],
							[ "{ifMoveOn:storylineRest}{then}There is a book titled: \"Random Items And Where to Find Them\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"God always gives one last chance to a Stampadian - Saint\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"Heroes are coming! Time to rise the prices! - Shopkeeper\"" ],
							[ "{ifMoveOn:storylineRest}{then}There is a manual titled: \"Teleports Are Fun!\"" ],
							[ "{ifMoveOn:storylineRest}{then}There is a book titled: \"Stampadian Wildness\"" ],

							// Based on fillers (very hard)
							[ "{ifMoveOn:storylineRest}{then}This scroll is so chewed that's unreadable." ],
							[ "{ifMoveOn:storylineRest}{then}There is a book titled: \"Deadly Recipes\"" ],
							[ "{ifMoveOn:storylineRest}{then}On this scroll there is a drawing of a huge monster with four eyes." ],

							// Based on helpers
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"We should open a new branch here - Insurance Manager\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"We Pay For Your Useless Stuff! - Junk Shop\"" ],

							// Based on main quests
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"News: Stampadia Has A New Ruler\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"News: Broken Key Found In Stampadia\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"News: Evil Ritual Traces Found In Stampadia\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"News: Still No Trace Of The Missing\"" ],
							[ "{ifMoveOn:storylineRest}{then}Letter: \"I am looking for a companion for a dangerous mission.\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"News: The Gang Of Evil Is Back\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"We've to find him before it's too late...\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"We've to find her before it's too late...\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"News: The Sacred Item Is Still Missing\"" ],
							[ "{ifMoveOn:storylineRest}{then}Letter: \"Without my familiar... I'm lost...\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"News: Are The Old Gods Back From Their Long Sleep?\"{hide}Yes We Are Back For You {heroClass}" ],
							[ "{ifMoveOn:storylineRest}{then}There is a dungeon map with a boss key sign on it." ],
							[ "{ifMoveOn:storylineRest}{then}There is a diary titled: \"How I Became The Ruler Of Stampadia\"" ],
							[ "{ifMoveOn:storylineRest}{then}There is a necromancy book full of notes." ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"News: Two Evil Colossus Found In Stampadia\"" ],
							[ "{ifMoveOn:storylineRest}{then}There is a book titled: \"Becoming One\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"News: The War Goes On\"" ],
							[ "{ifMoveOn:storylineRest}{then}Letter: \"This curse is consuming me. I have to move.\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"Are you the best {heroClass}? Join the challenge! Win Gold!\"" ],
							[ "{ifMoveOn:storylineRest}{then}Letter: \"Lie and your life will be spared - Enemy\"" ],

							// Based on malus
							[ "{ifMoveOn:storylineRest}{then}Letter: \"You won't get away that easily, {heroClass} - Enemy\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"If a trap sends him back to the stairs, he'll go away! - Enemy\"" ],
							[ "{ifMoveOn:storylineRest}{then}Letter: \"I found the target. It's time to finish the job.\"" ],
							[ "{ifMoveOn:storylineRest}{then}There are some spare parts of a trap." ],
							[ "{ifMoveOn:storylineRest}{then}There is a book titled: \"Bad Luck\"" ],
							[ "{ifMoveOn:storylineRest}{then}There is a broken pressure plate." ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"I'm in my lab. Use the teleport for urgency only! - Enemy\"" ],
							[ "{ifMoveOn:storylineRest}{then}The sand of a broken hourglass is all over the places." ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"I'm waiting for you, {heroClass}! Hee hee... - Witch\"" ],

							// Based on subquests
							[ "{ifMoveOn:storylineRest}{then}There is a small prayer book." ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"Root Beer, Snacks, Water, Orange Juice, ... - Barman\"" ],
							[ "{ifMoveOn:storylineRest}{then}On this scroll there are two kids throwing Beastcrafters cards!" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"You've to bet your life to win! - Bloody Gambler\"" ],
							[ "{ifMoveOn:storylineRest}{then}There is a book titled: \"How To Fix A Teleport\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"Why does only one fountain work at a time? - Enemy\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"That chest is too intimidating... I'm leaving! - Enemy\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"You've to bet your gold to win! - Gambler\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"Just say: We are the Guardian Twins, we cannot let you pass.\"" ],
							[ "{ifMoveOn:storylineRest}{then}There is a map with a small key in one corner." ],
							[ "{ifMoveOn:storylineRest}{then}There is a stack of signs that say: \"Room closed due to a landslide\"." ],
							[ "{ifMoveOn:storylineRest}{then}There is such a large spool of thread that it could join two far rooms!" ],
							[ "{ifMoveOn:storylineRest}{then}A monk has lost his map of this place here." ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"News: Another Murder Case In Stampadia\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"Once The Nothing is opened, there is no way back...\"" ],
							[ "{ifMoveOn:storylineRest}{then}There are some scribbled shapes and numbers on this scroll." ],
							[ "{ifMoveOn:storylineRest}{then}There is a book titled: \"Hard Riddles For Smart Heroes\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"That... monster... is eating the entire room!\"" ],
							[ "{ifMoveOn:storylineRest}{then}There is a book titled: \"Good Training For Good Heroes\"" ],
							[ "{ifMoveOn:storylineRest}{then}Letter: \"I'm sick of this place... I'll leave soon. - Enemy\"" ],
							[ "{ifMoveOn:storylineRest}{then}There are two dice and dozens of annotated scrolls with grids." ],

							// Based on classes
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"Fire and bolts, but nothing beats a good teleport - Wizard\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"Remember to fill your healing flask - Warrior\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"Keep your eyes on the enemy and learn from him - Ranger\"" ],
							[ "{ifMoveOn:storylineRest}{then}Scroll: \"Hammer, leather, and mead makes a good day! - Dwarf\"" ],

						]
					}
				]
			]
		}
	];
}