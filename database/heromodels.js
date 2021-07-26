/* exported loadHeroModels */

function loadHeroModels() {
	return [
		{
			heroClass:"Warrior",
			skills:[
				["ATK -1\nRNG 1","Move\n-3"],
				["DEF -3","Move\n-2"],
				["Gain HP\n-5","ATK -3\nRNG 1"],
				["ATK\nRNG 2","Move"]
			],
			defense:[1,1,1,1]
		}
	];
}