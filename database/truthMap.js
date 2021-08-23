/* exported loadTruthMap */

function loadTruthMap() {
	return [
		{
			id:"eyes",
			zero:"No eyes",
			singular:"{value} eye",
			plural:"{value} eyes",
			pair:"Pair eyes",
			odd:"Odd eyes",
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
			pair:"Pair lies",
			odd:"Odd lies",
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
			pair:"Pair foes",
			odd:"Odd foes",
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
			pair:"Pair blinds",
			odd:"Odd blinds",
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
			pair:"Pair cyclops",
			odd:"Odd cyclops",
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
			pair:"Pair pairs",
			odd:"Odd pairs",
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
			pair:"Pair ones",
			odd:"Odd ones",
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
			pair:"Pair rooms",
			odd:"Odd rooms",
			lie:{
				range:[-1,1],
				min:0
			}
		},
		{
			id:"seed",
			pair:"Pair day",
			odd:"Odd day"
		}
	];
}