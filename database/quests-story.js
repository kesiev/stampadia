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