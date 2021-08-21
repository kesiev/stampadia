/* exported loadQuestsStory */

function loadQuestsStory() {

	return [

		// [CODEX-Events] Storyline - The End Of Stampadia: Discover how Stampadia ended.
		{
			steps:[
				[
					{
						id:"room",
						atPercentage:100,
						items:[{genericItem:"npc"}],
						roomDescriptions:[
							[ "{ifMoveOn:npc}{then}\"We need machines, to help us create.\", {getKeyword:computer}, {markItem:npc}" ]
						]
					}
				],
				[
					{
						id:"room",
						atPercentage:100,
						items:[{genericItem:"npc"}],
						roomDescriptions:[
							[ "{ifMoveOn:npc}{then}\"We need energy, to help us grow.\", {getKeyword:electricity}, {markItem:npc}" ]
						]
					}
				],
				[
					{
						id:"room",
						atPercentage:100,
						items:[{genericItem:"npc"}],
						roomDescriptions:[
							[ "{ifMoveOn:npc}{then}\"We need wings, to help us fly.\", {getKeyword:spaceship}, {markItem:npc}" ]
						]
					}
				],
				[
					{
						id:"room",
						atPercentage:100,
						items:[{genericItem:"npc"}],
						roomDescriptions:[
							[ "{ifMoveOn:npc}{then}\"We need places, to help us share.\", {getKeyword:city}, {markItem:npc}" ]
						]
					}
				],
				[
					{
						id:"room",
						atPercentage:100,
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
						atPercentage:100,
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
						atPercentage:100,
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