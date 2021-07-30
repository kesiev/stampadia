/* exported loadTruthMap */

function loadTruthMap() {
	return [
		{
			id:"eyes",
			zero:"No eyes",
			singular:"{value} eye",
			plural:"{value} eyes",
			lie:{
				range:[-2,2],
				min:0,	
			}
		},
		{
			id:"fakeRooms",
			zero:"I see the truth",
			singular:"One lie",
			plural:"{value} lies",
			lie:{
				range:[-1,1],
				min:0,
				max:2
			}
		},
		{
			id:"foes",
			zero:"No foes",
			singular:"{value} foe",
			plural:"{value} foes",
			lie:{
				range:[-1,1],
				min:0
			}
		},
		{
			id:"horns",
			zero:"No horns",
			singular:"{value} horn",
			plural:"{value} horns",
			lie:{
				range:[-4,4],
				step:2,
				min:0
			}
		},
		{
			id:"level1",
			zero:"No blind",
			singular:"{value} blind",
			plural:"{value} blinds",
			lie:{
				range:[-1,1],
				min:0
			}
		},
		{
			id:"level2",
			zero:"No cyclops",
			singular:"{value} cyclop",
			plural:"{value} cyclops",
			lie:{
				range:[-1,1],
				min:0
			}
		},
		{
			id:"level3",
			zero:"No pairs",
			singular:"{value} pair",
			plural:"{value} pairs",
			lie:{
				range:[-1,1],
				min:0
			}
		},
		{
			id:"ones",
			zero:"No one",
			singular:"{value} one",
			plural:"{value} ones",
			lie:{
				range:[-2,2],
				min:0
			}
		},
		{
			id:"rooms",
			zero:"No place",
			singular:"{value} place",
			plural:"{value} places",
			lie:{
				range:[-1,1],
				min:0
			}
		}
	];
}