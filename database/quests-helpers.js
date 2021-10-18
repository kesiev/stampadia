/* exported loadQuestsHelpers */

function loadQuestsHelpers() {

	return [

		{
			id:"[CODEX-Events] Helper - The Insurance: Pay Gold/XP for HP.",
			steps:[[{id:"spawn",labels:["Insurance"],atPercentage:1,roomDescriptions:[
				[
						"Agent: \"Stampadia {placeName} Insurance Service. Welcome, {heroClass}!\"",
						"{ifMoveOn:npc}{and}{ifPayGold:4}{then}\"Thank you!\", {gainHp:1}"
				]
			],items:[{genericItem:"npc"}]}]]
		},
		{
			id:"[CODEX-Events] Helper - The Junk Shop: Trade your class item for full health.",
			ignoreForHeroTags:["startsWithResurrection"],
			steps:[[{id:"spawn",labels:["Junk"],atPercentage:1,roomDescriptions:[
				[
						"Junk Shop Owner: \"Do you have anything interesting to trade, {heroClass}?\"",
						"{ifMoveOn:npc}{and}{payEquip:equip-heroItem}{then}\"Just what I needed!\", {gainFullHp}, {markItem:npc}"
				]
			],items:[{genericItem:"npc"}]}]]
		},
		{ ignoreForHeroTags:["weak"], steps:[[]] }
	]

}