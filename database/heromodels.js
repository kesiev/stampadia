/* exported loadHeroModels */

function loadHeroModels() {
	return [
		// [CODEC-Heroes] Class - The Warrior: A balanced fighter. It's equipped with a sword, a small flask of cure, and a Resurrection item.
		{
			heroClass:"Warrior",
			skills:[
				["ATK -1\nRNG 1","Move\n-3"],
				["DEF -3","Move\n-2"],
				["Gain HP\n-5","ATK -3\nRNG 1"],
				["ATK\nRNG 2","Move"]
			],
			defense:[1,1,1,1],
			xpRamp:[
				{
					value:0
				},{
					xpGroup:"low",
					round:"floor",
					percentage:0.95
				},{
					xpGroup:"high",
					round:"floor",
					percentage:0.35
				},{
					xpGroup:"high",
					round:"floor",
					percentage:0.65
				}
			],
			
			//Original XP ramp:
			/*
			xpRamp:[
				{
					value:0
				},{
					xpGroup:"all",
					round:"ceil",
					percentage:0.15
				},{
					xpGroup:"all",
					round:"ceil",
					percentage:0.35
				},{
					xpGroup:"all",
					round:"ceil",
					percentage:0.5
				}
			],
			*/
			
			hpRamp:[0.5,0.15,0.25,0.1],
			damageRatio:0.5,
			equipment:[
				{
					placeholder:"heroItem",
					id:"resurrection",
					isAvailable:true
				}
			]
		}
	];
}