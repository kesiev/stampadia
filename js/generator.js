/* globals SVGTemplate SVG */
/* exported DungeonGenerator */

const DungeonGenerator=function(mapwidth,mapheight,seed,debug) {

	const
		MAX_EQUIPMENT=3,
		MAX_DESCRIPTION=2,
		ROOMPLACEHOLDERS=[
			{
				regex:/{roomId:([^}]*)}/g,
				replace:"{room:1}"
			},
			{
				regex:/{markRoom:([^}]*)}/g,
				replace:"x{room:1}"
			},
			{
				regex:/{ifRoomIsMarked:([^}]*)}/g,
				replace:"x{room:1}"
			},
			{
				regex:/{ifRoomIsNotMarked:([^}]*)}/g,
				replace:"not x{room:1}"
			},
			{
				regex:/{teleportToRoom:([^}]*)}/g,
				replace:"move anywhere in room {room:1}"
			},
			{
				regex:/{ifMoveOn:([^}]*)}/g,
				replace:"move [{item:1}]"
			},
			{
				regex:/{markItem:([^}]*)}/g,
				replace:"x[{item:1}]"
			}
		];

	const originalSeed=seed=seed||Math.random();
	let
		hero,
		heroModel,
		heroModels,
		originalRandomizers,
		randomizers,
		equipment,
		keywords,
		keywordsIndex={},
		enemies=[],		
		noise=[],
		questsStructure=[],
		gold=0,
		globalPlaceholders={},
		footer="",
		adventureTitle="",
		services=[],
		roomIds=0,
		mapGuidesEvery=0,
		fakeRooms=[],
		rooms=[],
		allRooms=[],
		flavorTexts,
		quests,
		placeholderModels,
		enemyModels,
		truthMap,
		svg;

	this.prepared=false;

	this.setKeywords=(keywordsdata)=>keywords=keywordsdata;
	this.setEquipment=(equipmentdata)=>equipment=equipmentdata;
	this.setTruthMap=(truthmapdata)=>truthMap=truthmapdata;
	this.setRoomIds=(roomidsdata)=>roomIds=roomidsdata;
	this.setMapGuidesEvery=(mapguideseverydata)=>mapGuidesEvery=mapguideseverydata;
	this.setHeroModels=(herodata)=>heroModels=herodata;
	this.setEnemyModels=(enemydata)=>enemyModels=enemydata;
	this.setQuests=(questsdata)=>quests=questsdata;
	this.setFlavorTexts=(flavortextdata)=>flavorTexts=flavortextdata;
	this.setPlaceholderModels=(placeholdersdata)=>placeholderModels=placeholdersdata;
	this.setGold=(amount)=>gold=amount;
	this.setQuestsStructure=(questsstructuredata)=>questsStructure=questsstructuredata;
	this.setFooter=(footerdata)=>footer=footerdata;
	this.setRandomizers=(randomizersdata)=>{
		originalRandomizers=clone(randomizersdata);
		randomizers={};
	}

	function random(max) {
		seed = (seed * 9301 + 49297) % 233280;
		return seed / 233280 * max;
	}

	function clone(v) {
		return JSON.parse(JSON.stringify(v));
	}

	function sortById(a,b) {
		if (a.id>b.id) return 1;
		else if (a.id<b.id) return -1;
		else return 0;
	}

	function sortByLength(a,b){
		if (a.length>b.length) return 1;
		else if (a.length<b.length) return -1;
		else return 0;
	}

	function sortByLengthInverse(a,b){
		if (a.length>b.length) return -1;
		else if (a.length<b.length) return 1;
		else return 0;
	}

	function inRoom(x,y,room) {
		return !((x<room.x)||(x>=room.x+room.width)||(y<room.y)||(y>=room.y+room.height));
	}

	function roomsCollide(room1,room2) {
		return !(
			(room1.x+room1.width<=room2.x)||(room1.x>=room2.x+room2.width)||
			(room1.y+room1.height<=room2.y)||(room1.y>=room2.y+room2.height)
		)
	}

	function getDoorId(exit) {
		switch (exit.side) {
			case "up":{ return exit.x+"-"+(exit.y+1); }
			case "left":{ return (exit.x+1)+"-"+exit.y; } 
			default: { return exit.x+"-"+exit.y; }
		}
	}

	function getCellValue(x,y,room) {
		return room.id-x-y-2;
	}

	function shuffleArray(arr) {
		for (let i=0;i<10;i++)
			for (let fid=0;fid<arr.length;fid++) {
				const
					tid=getRandomId(arr),
					from=arr[fid];
				arr[fid]=arr[tid];
				arr[tid]=from;
			}
	}

	function getRandomId(arr) {
		return Math.floor(random(arr.length));
	}

	function getRandom(arr) {
		return arr[getRandomId(arr)];
	}

	function setCheckBox(svg,checkbox,number) {
		const
			x=svg.getNum(checkbox,"x"),
			y=svg.getNum(checkbox,"y"),
			width=svg.getNum(checkbox,"width"),
			height=svg.getNum(checkbox,"height"),
			hwidth=width/2,
			hheight=height/2;

		switch (number) {
			case 0:{
				svg.delete(checkbox);
				break;
			}
			case 1:{
				break;
			}
			case 2:{
				svg.cloneNodeBy(checkbox,0,hwidth,0);
				svg.moveNodeAt(checkbox,x-hwidth,y);
				break;
			}
			case 3:{
				svg.cloneNodeBy(checkbox,0,-hwidth,-hheight);
				svg.cloneNodeBy(checkbox,0,hwidth,-hheight);
				svg.moveNodeAt(checkbox,x,y+hheight);
				break;
			}
			case 4:{
				svg.cloneNodeBy(checkbox,0,-hwidth,-hheight);
				svg.cloneNodeBy(checkbox,0,hwidth,-hheight);
				svg.cloneNodeBy(checkbox,0,-hwidth,hheight);
				svg.moveNodeAt(checkbox,x+hwidth,y+hheight);
				break;
			}
			case 5:{
				svg.cloneNodeBy(checkbox,0,-width,-hheight);
				svg.cloneNodeBy(checkbox,0,0,-hheight);
				svg.cloneNodeBy(checkbox,0,width,-hheight);
				svg.cloneNodeBy(checkbox,0,-hwidth,hheight);
				svg.moveNodeAt(checkbox,x+hwidth,y+hheight);
				break;
			}
			case 6:{
				svg.cloneNodeBy(checkbox,0,-width,-hheight);
				svg.cloneNodeBy(checkbox,0,0,-hheight);
				svg.cloneNodeBy(checkbox,0,width,-hheight);
				svg.cloneNodeBy(checkbox,0,-width,hheight);
				svg.cloneNodeBy(checkbox,0,0,hheight);
				svg.moveNodeAt(checkbox,x+width,y+hheight);
				break;
			}
			case 7:{
				svg.cloneNodeBy(checkbox,0,-width,-height);
				svg.cloneNodeBy(checkbox,0,0,-height);
				svg.cloneNodeBy(checkbox,0,width,-height);
				svg.cloneNodeBy(checkbox,0,-width,0);
				svg.cloneNodeBy(checkbox,0,0,0);
				svg.cloneNodeBy(checkbox,0,width,0);
				svg.moveNodeAt(checkbox,x,y+height);
				break;
			}
			case 8:{
				svg.cloneNodeBy(checkbox,0,-width,-height);
				svg.cloneNodeBy(checkbox,0,0,-height);
				svg.cloneNodeBy(checkbox,0,width,-height);
				svg.cloneNodeBy(checkbox,0,-width,0);
				svg.cloneNodeBy(checkbox,0,0,0);
				svg.cloneNodeBy(checkbox,0,width,0);
				svg.cloneNodeBy(checkbox,0,-hwidth,height);
				svg.moveNodeAt(checkbox,x+hwidth,y+height);
				break;
			}
			case 9:{
				svg.cloneNodeBy(checkbox,0,-width,-height);
				svg.cloneNodeBy(checkbox,0,0,-height);
				svg.cloneNodeBy(checkbox,0,width,-height);
				svg.cloneNodeBy(checkbox,0,-width,0);
				svg.cloneNodeBy(checkbox,0,0,0);
				svg.cloneNodeBy(checkbox,0,width,0);
				svg.cloneNodeBy(checkbox,0,-width,height);
				svg.cloneNodeBy(checkbox,0,0,height);
				svg.moveNodeAt(checkbox,x+width,y+height);
				break;
			}
			case 10:{
				svg.cloneNodeBy(checkbox,0,-width-hwidth,-height);
				svg.cloneNodeBy(checkbox,0,-hwidth,-height);
				svg.cloneNodeBy(checkbox,0,hwidth,-height);
				svg.cloneNodeBy(checkbox,0,hwidth+width,-height);
				svg.cloneNodeBy(checkbox,0,-width,0);
				svg.cloneNodeBy(checkbox,0,0,0);
				svg.cloneNodeBy(checkbox,0,width,0);
				svg.cloneNodeBy(checkbox,0,-width,height);
				svg.cloneNodeBy(checkbox,0,0,height);
				svg.moveNodeAt(checkbox,x+width,y+height);
				break;
			}
			case 11:{
				svg.cloneNodeBy(checkbox,0,-width-hwidth,-height);
				svg.cloneNodeBy(checkbox,0,-hwidth,-height);
				svg.cloneNodeBy(checkbox,0,hwidth,-height);
				svg.cloneNodeBy(checkbox,0,hwidth+width,-height);
				svg.cloneNodeBy(checkbox,0,-width-hwidth,0);
				svg.cloneNodeBy(checkbox,0,-hwidth,0);
				svg.cloneNodeBy(checkbox,0,hwidth,0);
				svg.cloneNodeBy(checkbox,0,width+hwidth,0);
				svg.cloneNodeBy(checkbox,0,-width,height);
				svg.cloneNodeBy(checkbox,0,0,height);
				svg.moveNodeAt(checkbox,x+width,y+height);
				break;
			}
			default:{
				svg.cloneNodeBy(checkbox,0,-width-hwidth,-height);
				svg.cloneNodeBy(checkbox,0,-hwidth,-height);
				svg.cloneNodeBy(checkbox,0,hwidth,-height);
				svg.cloneNodeBy(checkbox,0,hwidth+width,-height);
				svg.cloneNodeBy(checkbox,0,-width-hwidth,0);
				svg.cloneNodeBy(checkbox,0,-hwidth,0);
				svg.cloneNodeBy(checkbox,0,hwidth,0);
				svg.cloneNodeBy(checkbox,0,width+hwidth,0);
				svg.cloneNodeBy(checkbox,0,-width-hwidth,height);
				svg.cloneNodeBy(checkbox,0,-hwidth,height);
				svg.cloneNodeBy(checkbox,0,hwidth,height);
				svg.moveNodeAt(checkbox,x+width+hwidth,y+height);
				break;
			}
		}
	}

	function shortestPath(room,path) {
		if (!path) path=[];
		if (room.isStartingRoom) return path; else {
			path.push(room.id);
			const subpaths=[];
			room.exits.forEach(exit=>{
				if (path.indexOf(exit.toRoom.id)==-1) {
					const shortest=shortestPath(exit.toRoom,clone(path));
					if (shortest) subpaths.push(shortest);
				}
			});
			subpaths.sort(sortByLength);
			return subpaths[0];
		}
	}

	function formatRandomizers(line) {
		return line.replace(/\{([^}]*)\}/g,(m,match)=>{
			const
				randomizerIds=match.split("+"),
				randomizerPool=[];

			randomizerIds.forEach(id=>{
				if (originalRandomizers[id]) randomizerPool.push(id)
			});

			if (randomizerPool.length) {
				const randomizerId=getRandom(randomizerPool);
				if (!randomizers[randomizerId]||(randomizers[randomizerId].length==0)) randomizers[randomizerId]=clone(originalRandomizers[randomizerId]);
				const randomizerIndex=getRandomId(randomizers[randomizerId]),
					randomizer=randomizers[randomizerId][randomizerIndex];
				randomizers[randomizerId].splice(randomizerIndex,1);
				return randomizer;
			} else return m;
		});
	}

	function formatGlobalPlaceholders(line) {		
		line=line.replaceAll("{hide}","^*v");
		line=line.replaceAll("{nameLine}","_____________________________");
		line=line.replaceAll("{heroClass}",heroModel.heroClass);

		// Logic
		line=line.replaceAll("{newRule}"," | ");
		line=line.replaceAll("{and}"," &amp; ");
		line=line.replaceAll("{or}"," or ");
		line=line.replaceAll("{then}"," &raquo; ");

		// Special - Actions
		line=line.replaceAll("{rollDie}","roll a die: ");
		line=line.replaceAll("{nothing}","nothing happens");
		line=line.replaceAll("{stopReading}","stop reading");

		// Special - Conditions
		line=line.replace(/\{range:([0-9]+)-([0-9]+)\}/g,(m,num1,num2)=>(num1==num2?"="+num1:num1+"~"+num2));

		// Hero state - Conditions
		line=line.replaceAll("{ifHeroDied}","hero died");

		// Fight turn - Conditions
		line=line.replaceAll("{ifAfterEnemyRollInFight}","enemy turn roll");
		line=line.replaceAll("{ifAfterHeroRollInFight}","hero turn roll");
		line=line.replaceAll("{ifBeforeHeroRollInFight}","before hero turn roll");

		// Fight turn - Actions
		line=line.replaceAll("{pass}","pass");
		line=line.replace(/\{fightingEnemyLoseHp:([0-9]+)\}/g,(m,num)=>"-"+num+"HP to a fighting enemy");
		
		// Room - Conditions
		line=line.replaceAll("{ifEnterRoom}","enter room");
		line=line.replaceAll("{ifMoveOnStairs}","move on stairs");
		line=line.replaceAll("{ifNoFoes}","no foes");
		line=line.replaceAll("{ifKilledLastFoe}","killed last foe");

		// Room - Actions
		line=line.replaceAll("{moveOnStairs}","move on stairs");
		line=line.replaceAll("{roomIsEmpty}","room is empty");
		line=line.replaceAll("{noEscape}","no escape");
		line=line.replaceAll("{teleportToStartingRoom}","move anywhere in starting room");

		// HP - Conditions
		line=line.replace(/\{ifPayHp:([0-9]+)\}/g,(m,num)=>"pay "+num+"HP");
		line=line.replace(/\{ifHpLeft=:([0-9]+)\}/g,(m,num)=>"HP left ="+num);

		// HP - Actions
		line=line.replace(/\{gainHp:([0-9]+)\}/g,(m,num)=>"+"+num+"HP");
		line=line.replace(/\{loseHp:([0-9]+)\}/g,(m,num)=>"-"+num+"HP");

		// XP - Conditions
		line=line.replace(/\{ifPayXp:([0-9]+)\}/g,(m,num)=>"pay "+num+"XP");

		// XP - Actions
		line=line.replaceAll("{gainFullHp}","+"+hero.maxHp+"HP");
		line=line.replace(/\{gainXp:([0-9]+)\}/g,(m,num)=>"+"+num+"XP");
		line=line.replace(/\{loseXp:([0-9]+)\}/g,(m,num)=>"-"+num+"XP");

		// Gold - Conditions
		line=line.replace(/\{ifPayGold:([0-9]+)\}/g,(m,num)=>"pay "+num+"G");
		line=line.replace(/\{ifGoldLeft<half\}/g,(m,num)=>"<"+(Math.floor(gold/2)+1)+"G left");
		line=line.replace(/\{ifGoldLeft>half\}/g,(m,num)=>">"+Math.floor(gold/2)+"G left");
		line=line.replace(/\{ifGoldSpentInFifth:([0-9]+)-([0-9]+)\}/g,(m,num,num2)=>(Math.floor(gold/5)*(num-1)+(num==1?0:1))+"~"+(num2==5?gold:Math.floor(gold/5)*num2)+"G spent");

		// Gold - Actions
		line=line.replace(/\{gainGold:([0-9]+)\}/g,(m,num)=>"+"+num+"G");
		line=line.replace(/\{loseGold:([0-9]+)\}/g,(m,num)=>"-"+num+"G");

		// Dice - Conditions
		line=line.replace(/\{ifRolled:([0-9]+),([0-9]+)\}/g,(m,num,num2)=>num+" "+(num==1?"die":"dice")+" is "+num2);
		line=line.replace(/\{ifDiscardDie:([0-9]+),([0-9]+)\}/g,(m,num,num2)=>"discard "+num+" rolled "+num2);
		line=line.replace(/\{ifSetDie:([0-9]+),([0-9]+),([0-9]+)\}/g,(m,num,num2,num3)=>"set "+num+" rolled "+num2+" to "+num3);

		// Dice - Actions
		line=line.replace(/\{setDieTo:([0-9]+),([0-9]+)\}/g,(m,num,num2)=>"set "+num+" "+(num==1?"die":"dice")+" to "+num2);
		line=line.replace(/\{discardAnyDie:([0-9]+)\}/g,(m,num)=>"discard "+num+" "+(num==1?"die":"dice"));
		line=line.replace(/\{flipDieUpsideDown:([0-9]+)\}/g,(m,num)=>"flip "+num+" "+(num==1?"die":"dice"));
		line=line.replaceAll("{playLowerDieFirst}","play lower die first");
		line=line.replaceAll("{placeDiceInSameColumn}","play dice in same column");
		line=line.replaceAll("{placeDiceInSameRow}","play dice in same row");

		// Quest placeholders
		for (const k in globalPlaceholders)
			line=line.replaceAll("{"+k+"}",globalPlaceholders[k]);

		return line;
	}

	function formatFakeDescriptionLine(line) {

		const placeholders={roomIds:{},itemIds:{}};

		line=formatRandomizers(line);

		[
			{regex:/\{payEquip:([^}]+)\}/g,verb:"pay"},
			{regex:/\{loseEquip:([^}]+)\}/g,verb:"lose"},
			{regex:/\{getEquip:([^}]+)\}/g,verb:"get"},
		].forEach((entry)=>{
			line=line.replace(entry.regex,(m,id)=>{
				let equipment=globalPlaceholders[id];
				if (!equipment) equipment=getRandom(services).equipment.label;
				return entry.verb+" "+equipment;
			});
		});

		// Keywords
		[
			{regex:/\{ifKeyword:([^}]+)\}/g,verb:"know"},
			{regex:/\{ifNotKeyword:([^}]+)\}/g,verb:"don't know"},
			{regex:/\{ifLoseKeyword:([^}]+)\}/g,verb:"forget"},
			{regex:/\{loseKeyword:([^}]+)\}/g,verb:"forget"},
			{regex:/\{getKeyword:([^}]+)\}/g,verb:"learn"},
		].forEach((entry)=>{
			line=line.replace(entry.regex,(m,id)=>{
				return entry.verb+" '"+getRandom(keywords).label+"'";
			});
		})
		
		ROOMPLACEHOLDERS.forEach(placeholder=>{
			line=line.replace(placeholder.regex,function (){
				const matches=arguments;
				return placeholder.replace.replace(/{([^:]*):([^}]*)}/g,(line,marker,value)=>{
					switch (marker) {
						case "room":{
							if (!placeholders.roomIds[matches[value]]) placeholders.roomIds[matches[value]]=getRandom(rooms);
							return placeholders.roomIds[matches[value]].id;
						}
						case "item":{
							return 1;
						}
						default:{
							return "???";
						}
					}
				})
			})
		})

		line=formatGlobalPlaceholders(line);

		return line;

	}

	function formatDescriptionLine(line,placeholders) {

		line=formatRandomizers(line);

		line=line.replace(/\{payEquip:([^}]+)\}/g,(m,id)=>"pay "+globalPlaceholders[id]);
		line=line.replace(/\{loseEquip:([^}]+)\}/g,(m,id)=>"lose "+globalPlaceholders[id]);
		line=line.replace(/\{getEquip:([^}]+)\}/g,(m,id)=>"get "+globalPlaceholders[id]);

		// Keywords
		[
			{regex:/\{ifKeyword:([^}]+)\}/g,verb:"know"},
			{regex:/\{ifNotKeyword:([^}]+)\}/g,verb:"don't know"},
			{regex:/\{ifLoseKeyword:([^}]+)\}/g,verb:"forget"},
			{regex:/\{loseKeyword:([^}]+)\}/g,verb:"forget"},
			{regex:/\{getKeyword:([^}]+)\}/g,verb:"learn"},
		].forEach((entry)=>{
			line=line.replace(entry.regex,(m,id)=>{
				let keyword=keywordsIndex[id];
				if (!keyword) console.warn("Can't find keyword",id);
				return entry.verb+" '"+(keyword?keyword.label+"'":"???");
			});
		})

		ROOMPLACEHOLDERS.forEach(placeholder=>{
			line=line.replace(placeholder.regex,function (){
				const matches=arguments;
				return placeholder.replace.replace(/{([^:]*):([^}]*)}/g,(line,marker,value)=>{
					switch (marker) {
						case "room":{
							let room;
							if (placeholders) room=placeholders.roomIds[matches[value]];
							if (!room) room=globalPlaceholders.roomIds[matches[value]];
							if (room) return room.id;
							else {
								console.warn("can't find room",matches[value],"in line",line);
								return "???";
							}
						}
						case "item":{
							return placeholders.itemIds[matches[value]];
						}
						default:{
							return "???";
						}
					}
				})
			})
		})

		line=formatGlobalPlaceholders(line);

		return line;
	}

	function solvePlaceholder(placeholder) {
		if (placeholder.text) return placeholder.text;
		if (placeholder.fakeLine) return formatFakeDescriptionLine(placeholder.fakeLine);
		else return formatDescriptionLine(placeholder.line,placeholder.placeholders);
	}
	
	function solveRoomTemplateArgument(argument) {
		if (Array.isArray(argument))
			return argument[getRandomId(argument)];
		else
			return argument;
	}

	// Equipment management
	function addEquipment(list,equipment,isavailable,placeholder,placeholders) {
		let equip={
			id:equipment.id,
			isAvailable:!!isavailable,
			equipment:equipment
		};
		list.push(equip);
		if (placeholders) {
			// Register item placeholder
			placeholders["equip-"+placeholder]=equipment.label;
			placeholders["equip-"+equipment.id]=equipment.label;
		}
		return equip;
	}

	function pickEquipment(equipment,list,id) {
		let ret;
		if ((equipment.length<MAX_EQUIPMENT)&&list.length)
			for (var i=0;i<list.length;i++)
				if (list[i].id==id) {
					ret=list[i];
					list.splice(i,1);
					return ret;
				}
		return false;
	}

	function pickRandomEquipment(equipment,list) {
		let ret;
		if ((equipment.length<MAX_EQUIPMENT)&&list.length) {
			let i=getRandomId(list);
			ret=list[i];
			list.splice(i,1);
			return ret;
		}
		return false;
	}

	// Rooms

	const Room=function(x,y,width,height,isCorridor,isStartingRoom) {
		this.x=x;
		this.y=y;
		this.isFake=false;
		this.width=width;
		this.height=height;
		this.isCorridor=!!isCorridor;
		this.isStartingRoom=!!isStartingRoom;
		this.occupiedSpaces={};
		this.exits=[];
		this.items=[];
		this.description=[];

		this.addItem=function(x,y,item) {
			const id=x+","+y;
			if (this.occupiedSpaces[id]) {
				if ((item.id!="entrance")||(this.occupiedSpaces[id].id!="entrance"))
					console.warn("Conflicting space in room",this," @",x,",",y,"want place",item,"but there is",this.occupiedSpaces[id]);
				return false;
			} else {
				this.occupiedSpaces[id]=item;
				this.items.push({
					x:x,
					y:y,
					item:item
				});
				return true;
			}
		}

		this.getFreeSpaces=function() {
			const list=[];
			for (let y=0;y<this.height;y++)
				for (let x=0;x<this.width;x++) {
					const id=x+","+y;
					if (!this.occupiedSpaces[id]) list.push({x:x,y:y});
				}
			return list;
		}

		this.addEntrance=function(x,y,fromroom) {
			return this.addItem(x-this.x,y-this.y,{
				id:"entrance",
				fromRoom:fromroom
			});
		}

		this.addExit=function(x,y,side,toroom) {
			this.exits.push({
				toRoom:toroom,
				x:x,
				y:y,
				side:side
			});
		}

		this.setId=function(id) {
			this.id=id;
		}

		this.removeRooms=function(rooms) {
			const newExits=[];
			this.exits.forEach(exit=>{
				if (rooms.indexOf(exit.toRoom)==-1) newExits.push(exit);
			})
			this.exits=newExits;
		}

		this.createEntrances=function() {
			this.exits.forEach(exit=>{
				exit.toRoom.addEntrance(exit.x,exit.y,this);
			})
		}

		this.makeFake=function() {
			this.isFake=true;
			this.exits=[];
			this.occupiedSpaces={};
			this.items=[];
			this.description=[];
		}

		this.applyDelta=function(delta) {
			this.id+=delta;
		}

		return this;
	}

	this.addRoom=function(x,y,width,height,isCorridor,isStartingRoom) {
		const room=new Room(
			solveRoomTemplateArgument(x),
			solveRoomTemplateArgument(y),
			solveRoomTemplateArgument(width),
			solveRoomTemplateArgument(height),
			isCorridor,isStartingRoom);
		rooms.push(room);
		return room;
	}

	this.scatterRooms=function() {
		// TODO continua per un pò a distribuire le stanze
		let valid=false;
		shuffleArray(rooms);
		let minx, miny;
		let w, h;
		for (let i=0;i<100;i++) {
			minx=9999;
			miny=9999;
			let
				maxx=0,
				maxy=0,
				angle=random(Math.PI*2);
			for (i=0;i<rooms.length;i++) {
				angle+=0.1+random(1);
				let
					ok=false,
					room=rooms[i],
					dx=Math.sin(angle),
					dy=Math.cos(angle),
					ox=0,
					oy=0;
				room.x=0;
				room.y=0;

				while (!ok) {
					ok=true;
					for (let j=0;j<i;j++)
						if (roomsCollide(room,rooms[j])) {
							ok=false;
							break;
						}
					if (!ok) {
						ox+=dx;
						oy+=dy;
						if (Math.abs(room.x-ox)>Math.abs(room.y-oy))
							if (room.x>ox) room.x--;
							else room.x++;
						else
							if (room.y>oy) room.y--;
							else room.y++;
					}
				}
				room.x=Math.floor(room.x);
				room.y=Math.floor(room.y);
				if (room.x<minx) minx=room.x;
				if (room.y<miny) miny=room.y;
				if (room.x+room.width>maxx) maxx=room.x+room.width;
				if (room.y+room.height>maxy) maxy=room.y+room.height;
			}
			w=maxx-minx;
			h=maxy-miny;
			valid=((w<=mapwidth)&&(h<=mapheight));
			if (valid) break;				
		}
		
		if (valid) {
			minx-=Math.floor((mapwidth-w)/2);
			miny-=Math.floor((mapheight-h)/2);
			rooms.forEach(room=>{
				room.x-=minx;
				room.y-=miny;
			})
			return true;
		} else return false;
	}

	this.assignIdRooms=function() {
		const ids=[];

		for (let i=0;i<roomIds;i++) ids.push(i);
		shuffleArray(ids);

		rooms.forEach((room,index)=>room.setId(ids[index]));
	}

	this.prepareExits=function() {
		const
			exits={},
			newRooms=[];
		rooms.forEach(room=>{
			// Detect doors
			for (let x=room.x;x<room.x+room.width;x++)
				for (let y=room.y;y<room.y+room.height;y++) {
					rooms.forEach(roomto=>{
						if (room!==roomto) {
							const exitid=Math.min(room.id,roomto.id)+"-"+Math.max(room.id,roomto.id);
							if (!exits[exitid]) exits[exitid]=[];
							if (inRoom(x-1,y,roomto)) exits[exitid].push({from:{room:room,x:x,y:y},to:{room:roomto,x:x-1,y:y},sides:["left","right"]});
							if (inRoom(x+1,y,roomto)) exits[exitid].push({from:{room:room,x:x,y:y},to:{room:roomto,x:x+1,y:y},sides:["right","left"]});
							if (inRoom(x,y-1,roomto)) exits[exitid].push({from:{room:room,x:x,y:y},to:{room:roomto,x:x,y:y-1},sides:["up","down"]});
							if (inRoom(x,y+1,roomto)) exits[exitid].push({from:{room:room,x:x,y:y},to:{room:roomto,x:x,y:y+1},sides:["down","up"]});
						}
					})
				}
		});
		for (const k in exits) {
			if (exits[k].length) {
				const exit=getRandom(exits[k]);
				exit.from.room.addExit(exit.to.x,exit.to.y,exit.sides[0],exit.to.room);
				exit.to.room.addExit(exit.from.x,exit.from.y,exit.sides[1],exit.from.room);
			}
		}
		rooms.forEach(room=>{
			allRooms.push(room);
			if (room.isCorridor&&(room.exits.length<2)) fakeRooms.push(room);
			else newRooms.push(room);
		});
		newRooms.forEach(room=>room.removeRooms(fakeRooms));
		newRooms.forEach(room=>room.createEntrances());
		rooms=newRooms;
	}

	this.optimizeIds=function() {
		let min=10000;
		allRooms.forEach(room=>{
			room.exits.forEach(exit=>{
				const number=getCellValue(exit.x,exit.y,exit.toRoom);
				if (number<min) min=number;
			});
		});
		allRooms.forEach(room=>room.applyDelta(-min));
		return min;
	}

	this.sortRooms=function() {
		rooms.sort(sortById)
	}

	// Quests

	this.getRoutes=function() {
		const
			roomsIndex={},
			routes=[];

		rooms.forEach(room=>{
			roomsIndex[room.id]={
				room:room,
				freeSpaces:room.getFreeSpaces()
			}
		})
		rooms.forEach(room=>{
			if (!room.isStartingRoom)
				routes.push(shortestPath(room).map(roomid=>roomsIndex[roomid]));
		});
		routes.sort(sortByLengthInverse);
		return routes;
	}

	this.getQuestSubroute=function(route,quest,steps) {

		let
			minRooms=quest.minRooms||steps.length;

		if (route.length<minRooms) return false;
		else {

			const
				tempServices=clone(services),
				tempEquipment=clone(equipment);
			let success=true;

			// Check if the equipment fits in the Equipment Scroll
			steps.forEach(step=>{

				// Room must fit the required equipment
				if (step.equipment)
					step.equipment.forEach(equip=>{
						let neededEquipment=pickEquipment(tempServices,tempEquipment,equip.id);
						if (neededEquipment) addEquipment(tempServices,neededEquipment);
						else success=false;
					});

			});

			if (success) {

				const
					roomsMeta=[],
					stepsMeta=[];

				// Generate steps metadata
				steps.forEach((step,id)=>{
					let percentage=step.atPercentage;
					if (percentage.from) percentage=percentage.from+Math.floor(random(percentage.to-percentage.from));
					stepsMeta.push({
						step:step,
						id:id,
						atPercentage:percentage
					})
				});

				// Sort steps by percentage
				stepsMeta.sort((a,b)=>{
					if (a.atPercentage<b.atPercentage) return -1; else
					if (a.atPercentage>b.atPercentage) return 1; else
					return 0;
				});

				// Generate route metadata
				route.forEach((room,id)=>{

					let roomMeta={
						room:room,
						id:id,
						fitSteps:{},
						step:-1
					};

					// Check which steps fits the room
					stepsMeta.forEach(stepMeta=>{

						const step=stepMeta.step;
						success=true;

						// Room must be not busy
						success&=!room.room.isBusy;

						// Room must fit the required amount of items
						success&=!step.items||(room.freeSpaces.length>=step.items.length);

						// Room must fit the required amount of description
						success&=!step.roomDescriptions||(room.room.description.length+step.roomDescriptions[0].length<=MAX_DESCRIPTION);

						if (success) roomMeta.fitSteps[stepMeta.id]=true;

					});

					roomsMeta.unshift(roomMeta);

				});

				// Place steps on rooms, minimal distance.
				let head=-1;
				success=true;

				stepsMeta.forEach(stepMeta=>{
					while (success) {
						head++;
						if (!roomsMeta[head]) success=false;
						else if (roomsMeta[head].fitSteps[stepMeta.id]) break;
					}
					if (success) stepMeta.room=head;
				});

				if (success) {
					// Move steps as near as possible their requested positions
					let head=roomsMeta.length-1;
					const result=[];

					for (var j=stepsMeta.length-1;j>=0;j--) {
						let
							stepMeta=stepsMeta[j],
							q,
							requestedPosition=Math.max(Math.min(Math.floor(stepMeta.atPercentage/101*roomsMeta.length),head),stepMeta.room);
						
						for (q=requestedPosition;q>=stepMeta.room;q--)
							if (roomsMeta[q].fitSteps[stepMeta.id]) {
								result[stepMeta.id]=roomsMeta[q].room;
								stepMeta.room=q;
								break;
							}
						head=q-1;
					};

					if (result.length!=steps.length) debugger;

					return result;
				}

			}

			return false;

		}

	}

	this.addQuest=function(set,excludeQuests,distance) {

		const
			quests=[],
			routes=this.getRoutes();

		set.forEach(quest=>{
			const questVersions=[];
			if (excludeQuests.indexOf(quest)==-1) {
				quest.steps.forEach(steps=>{
					let
						subroutes={},
						allSubroutes=[];
						longestRoute=0,
						shortestRoute=0;
					routes.forEach(route=>{
						const subroute=this.getQuestSubroute(route,quest,steps);
						if (subroute) {
							if (!subroutes[route.length]) subroutes[route.length]=[];
							subroutes[route.length].push(subroute);
							allSubroutes.push(subroute);
							if (!longestRoute||(route.length>longestRoute)) longestRoute=route.length;
							if (!shortestRoute||(route.length<shortestRoute)) shortestRoute=route.length;
						}
					});
					if (quest.debugger) debugger;
					if (allSubroutes.length) {
						var subroute;
						switch (distance) {
							case "nearest":{
								subroute=getRandom(subroutes[shortestRoute]);
								break;
							}
							case "nearest":{
								subroute=getRandom(allSubroutes);
								break;
							}
							default:{
								subroute=getRandom(subroutes[longestRoute]);
								break;
							}
						}
						questVersions.push({subroute:subroute,quest:quest,steps:steps});
					}
				})
				if (questVersions.length) quests.push(getRandom(questVersions));
			};
		})

		if (quests.length) {
			const quest=getRandom(quests);
			this.applyQuest(quest.subroute,quest.quest,quest.steps);
			return quest.quest;
		} else return false;
	}

	this.addQuests=function() {

		let
			quest,
			addedQuests=[];

		questsStructure.forEach(entry=>{
			for (let i=0;i<entry.count;i++) {
				if (entry.debugger) debugger;
				quest=this.addQuest(quests[entry.questType],addedQuests,entry.distance);
				if (quest) addedQuests.push(quest);
				else if (debug&&debug.logMissingQuests) console.log("Can't add requested",entry.questType,"at",entry.distance);
			}
		});

	}

	this.applyQuest=function(subroute,quest,steps) {
		const
			placeholders={
				roomIds:{},
				itemIds:{}
			};

		// Prepare room labels
		steps.forEach((step,index)=>{
			placeholders.roomIds[step.id]=subroute[index].room;
			globalPlaceholders.roomIds[step.id]=subroute[index].room;
		});

		rooms.forEach(room=>{
			placeholders.roomIds["id-"+room.id]=room;
			if (room.isStartingRoom) placeholders.roomIds["startingRoom"]=room;
		});

		// Add items and prepare item labels
		steps.forEach((step,index)=>{
			const room=subroute[index];
			let genericItemId=0;
			room.room.isBusy=true;
			if (step.items)
				step.items.forEach(item=>{
					const freeSpace=getRandomId(room.freeSpaces),
						pos=room.freeSpaces.splice(freeSpace,1)[0];
					if (item.genericItem) {
						genericItemId++;
						room.room.addItem(pos.x,pos.y,{id:"genericItem",itemId:genericItemId});
						placeholders.itemIds[item.genericItem]=genericItemId;
					} else room.room.addItem(pos.x,pos.y,item);
				});
		});

		// Add room labels and required items
		steps.forEach((step,index)=>{
			if (step.roomDescriptions) {
				const
					roomDescription=getRandom(step.roomDescriptions),
					room=subroute[index].room;
				roomDescription.forEach(line=>{
					room.description.push({
						line:line,
						placeholders:placeholders
					});
				});
				if (step.shuffleRoomDescriptions) shuffleArray(room.description);
				if (step.equipment) {
					step.equipment.forEach(equip=>{
						let neededEquipment=pickEquipment(services,equipment,equip.id);
						if (neededEquipment) addEquipment(services,neededEquipment,equip.isAvailable,equip.placeholder,globalPlaceholders);
						else console.warn("Can't find quest equipment",step);						
					});
				}
			}
		});

		// Add extra room labels
		if (quest.otherDescriptions)
			quest.otherDescriptions.forEach(line=>{
				const
					roomDescription=getRandom(line.roomDescriptions),
					room=placeholders.roomIds[line.at];
				roomDescription.forEach(line=>{
					room.description.push({
						line:line,
						placeholders:placeholders
					});
				})
			});

		// Set adventure metadata
		if (quest.adventureTitle) adventureTitle=getRandom(quest.adventureTitle);
	}

	// Flavor text

	this.addFlavorTexts=function() {
		const flavors=clone(flavorTexts);
		allRooms.forEach(room=>{
			if (room.description.length<MAX_DESCRIPTION)
				if (room.isCorridor) {
					if (flavors.corridors.length) {
						let lineId=getRandomId(flavors.corridors),
							line=flavors.corridors[lineId];
						if (debug&&debug.flavorText) line=debug.flavorText;
						flavors.corridors.splice(lineId,1);
						room.description.unshift({
							text:line
						});
					}
				} else if (flavors.rooms.length) {
					let lineId=getRandomId(flavors.rooms),
						line=flavors.rooms[lineId];
					if (debug&&debug.flavorText) line=debug.flavorText;
					flavors.rooms.splice(lineId,1);
					room.description.unshift({
						text:line
					});
				}
		})
	}

	// Equipment

	this.sortEquipment=function() {
		services.sort((a,b)=>{
			if (a.isAvailable&&!b.isAvailable) return -1; else
			if (!a.isAvailable&&b.isAvailable) return 1; else
			if (a.equipment.label<b.equipment.label) return -1; else
			if (a.equipment.label>b.equipment.label) return 1; else
			return 0;
		});
	}

	// Obfuscation

	this.addNoise=function() {
		const
			itemsPlaces=[],
			itemPlacesIndex={},
			fakeEntrancesIndex={},
			fakeDoorsPool=[];

		function addFakeEntrance(x,y) {
			const id=x+","+y;
			if (!fakeEntrancesIndex[id]) {
				noise.push({id:"fakeEntrance",x:x,y:y});
				if (itemPlacesIndex[id]) {
					itemsPlaces.splice(itemsPlaces.indexOf(itemPlacesIndex[id]),1);
					delete itemPlacesIndex[id];
				}
				fakeEntrancesIndex[id]=1;
			}
		}

		for (let y=0;y<mapheight;y++)
			for (let x=0;x<mapheight;x++) {
				const cell={x:x,y:y};
				let
					insideRoom=false,
					onRoomBorderLeft=false,
					onRoomBorderTop=false;
				rooms.forEach(room=>{
					if (inRoom(x,y,room)) insideRoom=room;
					else if (inRoom(x+1,y,room)) onRoomBorderLeft=room;
					else if (inRoom(x,y+1,room)) onRoomBorderTop=room;
				});
				if (!insideRoom) {
					itemPlacesIndex[x+","+y]=cell;
					itemsPlaces.push(cell);
					if ((x+1!=mapwidth)&&!onRoomBorderLeft) fakeDoorsPool.push({id:"fakeDoorRight",x:cell.x,y:cell.y,dx:cell.x+1,dy:cell.y});
					if ((y+1!=mapheight)&&!onRoomBorderTop) fakeDoorsPool.push({id:"fakeDoorDown",x:cell.x,y:cell.y,dx:cell.x,dy:cell.y+1});
				}
			}

		// Randomly add doors
		for (let i=0;i<20;i++)
			if (fakeDoorsPool.length) {
				const doorIndex=getRandomId(fakeDoorsPool),
					door=fakeDoorsPool[doorIndex];
				fakeDoorsPool.splice(doorIndex,1);
				noise.push(door);
				addFakeEntrance(door.x,door.y);
				addFakeEntrance(door.dx,door.dy);
			}

		// Randomly add items
		for (let i=0;i<20;i++)
			if (itemsPlaces.length) {
				const positionIndex=getRandomId(itemsPlaces),
					position=itemsPlaces[positionIndex];
				itemsPlaces.splice(positionIndex,1);
				switch (getRandom(["fakeEnemy","fakeGenericItem"])) {
					case "fakeEnemy":{
						noise.push({id:"fakeEnemy",x:position.x,y:position.y,level:Math.floor(random(4))});
						break;
					}
					case "fakeGenericItem":{
						noise.push({id:"fakeGenericItem",x:position.x,y:position.y,itemId:1+Math.floor(random(2))});
						break;
					}
				}
			}

		// Randomly add equipment
		while (services.length<MAX_EQUIPMENT) {
			let neededEquipment=pickRandomEquipment(services,equipment);
			if (neededEquipment) {
				let equip=addEquipment(services,neededEquipment);
				equip.isFake=true;
			}
			else break;
		}


	}

	this.addFakeRooms=function() {
		const
			fakeDescriptions=[];

		for (const k in quests) {
			quests[k].forEach(quest=>{
				let steps=getRandom(quest.steps);
				steps.forEach(step=>{
					step.roomDescriptions.forEach(description=>{
						fakeDescriptions.push(description);	
					})
				})
			})
		}

		fakeRooms.forEach(room=>{
			room.makeFake();
			const description=getRandom(fakeDescriptions);
			description.forEach(line=>{
				room.description.push({
					fakeLine:(debug&&debug.showFake?"[FAKE] ":"")+line
				});
			})
			rooms.push(room);
		})

	}

	// Enemies

	this.generateEnemies=function() {
		enemyModels.forEach((model,id)=>{
			var skills=clone(model.skills);
			heroModel.enemyModels[id].skills.forEach(skill=>skills.push(skill));
			enemies.push({
				level:id,
				gainXp:id||1,
				defense:id||1,
				skills:getRandom(skills),
				truth:{
					eyes:id,
					horns:2,
					foes:1,
					level1:id==0?1:0,
					level2:id==1?1:0,
					level3:id==2?1:0,
					level4:id==3?1:0,
				}
			})
		});
	}

	// Hero

	this.generateHero=function() {
		let	dungeonEnemies=0;
		const dungeonXp={
			low:0,
			high:0,
			all:0
		};
			
		hero={
			maxHp:0,
			model:heroModel,
			skills:[],
			defense:[]
		};

		rooms.forEach(room=>{
			room.items.forEach(item=>{
				if (item.item.id=="enemy") {
					dungeonEnemies++;
					// Calculate dungeon XPs (except final boss, if any)
					if (!item.item.ignoreXp) {
						const xp=enemies[0].gainXp+(item.item.level?enemies[item.item.level].gainXp:0);
						dungeonXp.all+=xp;
						if (debug&&debug.dumpXPs) console.log("XP","Adding Lv.",item.item.level,"enemy for",enemies[0].gainXp,"+",(item.item.level?enemies[item.item.level].gainXp:0),"=",xp,"XPs from",item.item);
						switch (item.item.level) {
							case 0:{
								dungeonXp.low+=xp;
								break;
							}
							default:{
								dungeonXp.high+=xp;
							}
						}							
					} else if (debug&&debug.dumpXPs) console.log("XP","Ignoring",item.item);
				}
			})
		});
		
		if (debug&&debug.dumpXPs) console.log("XP","Total XPs",dungeonXp);
		if ((dungeonXp.low<3)&&(dungeonXp.high>3)) {
			dungeonXp.high-=3-dungeonXp.low;
			dungeonXp.low=3;
		}

		const maxHp=dungeonEnemies*heroModel.damageRatio;

		// Generate skills
		heroModel.skills.forEach((skill,index)=>{
			const levelHp=Math.ceil(heroModel.hpRamp[index]*maxHp);
			let xp=0;
			if (heroModel.xpRamp[index].value!==undefined) xp=heroModel.xpRamp[index].value;
			else xp=dungeonXp[heroModel.xpRamp[index].xpGroup]*heroModel.xpRamp[index].percentage;
			switch (heroModel.xpRamp[index].round) {
				case "floor":{ xp=Math.floor(xp)||1; break; }
				default:{ xp=Math.ceil(xp); }
			}
			hero.defense.push(heroModel.defense[index]);
			hero.skills.push({
				xp:xp,
				hp:levelHp,
				skills:skill
			});
			hero.maxHp+=levelHp;
		});

	}

	this.selectHeroModel=function() {
		heroModel=getRandom(heroModels);

		if (debug&&debug.heroClass) {
			heroModels.forEach(model=>{
				if (model.heroClass==debug.heroClass) heroModel=model;
			})
		}

		// Add equipment
		heroModel.equipment.forEach(equip=>{
			let neededEquipment=pickEquipment(services,equipment,equip.id);
			if (neededEquipment) addEquipment(services,neededEquipment,equip.isAvailable,equip.placeholder,globalPlaceholders);
			else console.warn("Can't find hero equipment",equip);
		});
	}

	// Global placeholders

	this.prepareGlobalPlaceholders=function() {
		for (const k in placeholderModels)
			globalPlaceholders[k]=getRandom(placeholderModels[k]);
		globalPlaceholders.roomIds={};
	}

	// Keywords index

	this.prepareKeywordsIndex=function() {
		keywords.forEach(keyword=>keywordsIndex[keyword.id]=keyword);
	}

	// Metadata

	this.setupMetadata=function() {
		this.metadata={
			seed:originalSeed,
			title:{line:adventureTitle},
			header:{line:globalPlaceholders.adventureHeader}
		}
	}

	// Placeholders

	this.solvePlaceholders=function() {

		// Solve room descriptions
		rooms.forEach(room=>{
			room.description=room.description.map(descriptionLine=>solvePlaceholder(descriptionLine))
		});

		// Solve metadata
		this.metadata.title=solvePlaceholder(this.metadata.title);
		this.metadata.header=solvePlaceholder(this.metadata.header);

	}

	// Truth/Lies

	function formatTruth(value,map) {
		let model;
		if (!value) model=map.zero;
		else if (value==1) model=map.singular;
		else model=map.plural;
		return model.replaceAll("{value}",value);
	}

	this.generateTruthLies=function() {
		const
			truthCounter={
				fakeRooms:0,
				rooms:0,
				ones:0,
				seed:originalSeed
			},
			truth=[],
			lies=[];

		// Truth about the enemies and the rooms
		rooms.forEach(room=>{
			if (room.isFake) truthCounter.fakeRooms++;
			else {
				truthCounter.rooms++;
				room.items.forEach(item=>{
					switch (item.item.id) {
						case "enemy":{
							for (const k in enemies[item.item.level].truth) {
								if (!truthCounter[k]) truthCounter[k]=0;
								truthCounter[k]+=enemies[item.item.level].truth[k];
							}
							break;
						}
						case "genericItem":{
							if (item.item.itemId==1) truthCounter.ones++;
							break;
						}
					}
				});
			}
		});

		// Generate truth/lies
		truthMap.forEach((map)=>{
			let trueValue=truthCounter[map.id];
			if (map.pair) {
				if (trueValue%2) {
					truth.push(map.odd);
					lies.push(map.pair);
				} else {
					truth.push(map.pair);
					lies.push(map.odd);
				}
			}
			if (map.lie) {
				const subLies=[];
				let
					num=trueValue+map.lie.range[0],
					limit=trueValue+map.lie.range[1];
				truth.push(formatTruth(trueValue,map));
				if ((map.lie.max!==undefined)&&(limit>map.lie.max)) limit=map.lie.max;
				if ((map.lie.min!==undefined)&&(num<map.lie.min)) num=map.lie.min;
				while (num<=limit) {
					if (num!=trueValue)
						subLies.push(formatTruth(num,map));
					num+=(map.lie.step||1);
				}
				if (subLies.length) lies.push(getRandom(subLies));
			}
		});

		// Inject truth/lies in randomizers

		originalRandomizers.truth=clone(truth);
		originalRandomizers.lie=clone(lies);

	}

	// Initializer

	this.prepare=function() {
		if (!this.prepared) {
			let debugBackup;

			this.prepared=true;

			if (debug&&debug.dumpSentences)
				debugBackup={
					quests:clone(quests),
					equipment:clone(equipment)
				};

			// Initialize
			this.prepareGlobalPlaceholders();
			this.prepareKeywordsIndex();
			this.selectHeroModel();

			// Prepare rooms
			this.scatterRooms();
			this.assignIdRooms();
			this.prepareExits();
			this.optimizeIds();

			// Prepare quests
			this.addQuests();

			// Generate actors
			this.generateEnemies();
			this.generateHero();

			// Add noise and tidy up
			if (!debug||!debug.skipNoise) this.addNoise();
			this.addFakeRooms();
			this.addFlavorTexts();
			this.sortRooms();
			this.sortEquipment();

			// Setup metadata
			this.setupMetadata();

			// Generate dungeon stats
			this.generateTruthLies();

			// Debug
			if (debug&&debug.dumpSentences) {
				debugBackup.equipment.forEach(equip=>{
					console.warn("[E]",formatFakeDescriptionLine(equip.action));	
				});
				for (const k in debugBackup.quests) {
					debugBackup.quests[k].forEach(quest=>{
						quest.steps.forEach(steps=>{
							steps.forEach(step=>{
								step.roomDescriptions.forEach(description=>{
									description.forEach(line=>{
										console.warn("[Q]",formatFakeDescriptionLine(line));	
									})
								})
							})
						})
					})
				}
			}

			// Solve placeholders
			this.solvePlaceholders();

		}
	}

	// Renderers

	this.debug=function() {
		const
			CELLSIZE=30,
			HCELLSIZE=CELLSIZE/2,
			canvas=document.createElement("canvas"),
			div=document.createElement("div");
		let table="<table border=1>";

		canvas.style.border="2px solid #ccc";
		canvas.width=mapwidth*CELLSIZE;
		canvas.height=mapheight*CELLSIZE;

		const ctx=canvas.getContext("2d");

		this.prepare();

		noise.forEach(item=>{
			const
				x=item.x,
				y=item.y,
				px=x*CELLSIZE,
				py=y*CELLSIZE;
			switch (item.id) {
				case "fakeEntrance":{
					ctx.beginPath();		
					ctx.fillStyle="#fcc";	
					ctx.fillRect(px,py,CELLSIZE,CELLSIZE);
					ctx.stroke();	
					break;
				}
				case "fakeDoorRight":
				case "fakeDoorDown":{					
					break;
				}
				default:{
					ctx.beginPath();		
					ctx.fillStyle="#eee";	
					ctx.fillRect(px,py,CELLSIZE,CELLSIZE);
					ctx.stroke();
					break;
				}				
			}
		});

		noise.forEach(item=>{
			const
				x=item.x,
				y=item.y,
				px=x*CELLSIZE,
				py=y*CELLSIZE;
			switch (item.id) {
				case "fakeDoorRight":
				case "fakeDoorDown":{
					ctx.beginPath();
					ctx.strokeStyle="#f0f";	
					ctx.moveTo(px+HCELLSIZE,py+HCELLSIZE);
					if (item.id=="fakeDoorRight") ctx.lineTo(px+HCELLSIZE+CELLSIZE,py+HCELLSIZE);
					else ctx.lineTo(px+HCELLSIZE,py+HCELLSIZE+CELLSIZE);
					ctx.stroke();
					break;
				}
			}
		});

		rooms.forEach(room=>{
			table+="<tr>";
			table+="<td>"+room.id+"</td>";
			table+="<td>@"+room.x+","+room.y+" "+room.width+"x"+room.height+"</td>";

			ctx.beginPath();		
			ctx.strokeStyle="#000";	
			ctx.rect(
				room.x*CELLSIZE,
				room.y*CELLSIZE,
				room.width*CELLSIZE,
				room.height*CELLSIZE
			);
			if (room.isStartingRoom)
				ctx.rect(
					room.x*CELLSIZE+3,
					room.y*CELLSIZE+3,
					room.width*CELLSIZE-6,
					room.height*CELLSIZE-6
				);	

			ctx.stroke();	
			ctx.font = HCELLSIZE+"px Arial";
			ctx.fillStyle="#f00";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(room.id, room.x*CELLSIZE+(room.width*CELLSIZE/2),room.y*CELLSIZE+(room.height*CELLSIZE/2));

			table+="<td>";
			room.exits.forEach(exit=>{
				const
					px=exit.x*CELLSIZE,
					py=exit.y*CELLSIZE;
				table+="@"+exit.x+","+exit.y+" door "+getCellValue(exit.x,exit.y,exit.toRoom)+" &raquo; room "+exit.toRoom.id+"<br>";
				ctx.beginPath();
				ctx.strokeStyle="#0ff";	
				ctx.moveTo(px+HCELLSIZE,py+HCELLSIZE);
				switch (exit.side) {
					case "right":{
						ctx.lineTo(px,py+HCELLSIZE);
						break;
					}
					case "left":{
						ctx.lineTo(px+CELLSIZE,py+HCELLSIZE);
						break;
					}
					case "down":{
						ctx.lineTo(px+HCELLSIZE,py);
						break;
					}
					case "up":{
						ctx.lineTo(px+HCELLSIZE,py+CELLSIZE);
						break;
					}
				}
				ctx.stroke();
			});
			table+="</td>";
			table+="</tr>";

			room.items.forEach(item=>{
				const
					x=room.x+item.x,
					y=room.y+item.y,
					px=x*CELLSIZE,
					py=y*CELLSIZE;
				item=item.item;

				ctx.font = HCELLSIZE+"px Arial";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				switch (item.id) {
					case "entrance":{						
						ctx.fillStyle="#000";
						ctx.fillText(getCellValue(x,y,room), px+HCELLSIZE, py+HCELLSIZE);						
						break;
					}
					case "enemy":{						
						ctx.fillStyle="#f00";
						ctx.fillText("E"+item.level, px+HCELLSIZE, py+HCELLSIZE);						
						break;
					}
					case "genericItem":{						
						ctx.fillStyle="#0ff";
						ctx.fillText("g"+item.itemId, px+HCELLSIZE, py+HCELLSIZE);						
						break;
					}
					default:{
						ctx.fillStyle="#f0f";
						ctx.fillText({
							stairs:"S"
						}[item.id]||"?", px+HCELLSIZE, py+HCELLSIZE);	
						break;
					}
				}
			});
		});


		div.innerHTML=table+"</table>";

		document.body.style.backgroundColor="#fff";
		document.body.style.color="#000";
		document.body.style.overflow="scroll";
		document.body.appendChild(canvas);
		document.body.appendChild(div);
	}

	this.downloadPDF=function(filename) {
		this.createSVG(svg=>{
			svg.getPDF(filename);
		})
	}

	this.downloadSVG=function(filename) {
		this.createSVG(svg=>{
			svg.download(filename);
		})
	}

	this.showSVG=function() {
		this.createSVG(svg=>{

			document.write("<body>");

			// Print
			const div=document.createElement("div");
			div.style.display="inline-block";
			div.innerHTML=svg.getSVG();
			document.body.appendChild(div);

			// Buttons
			let btn=document.createElement("input");
			btn.type="button";
			btn.value="Download PDF";
			btn.onclick=()=>{
				this.downloadPDF("dungeon.pdf")
			}
			document.body.appendChild(btn);

			btn=document.createElement("input");
			btn.type="button";
			btn.value="Download SVG";
			btn.onclick=()=>{
				this.downloadSVG("dungeon.svg");
			}
			document.body.appendChild(btn);
			
		});
	}

	this.createSVG=function(cb) {

		if (svg) cb(svg);
		else {

			this.prepare();

			const template=new SVGTemplate("svg/model.svg?"+Math.random());
			template.load(()=>{
				svg=new SVG(template);

				// Draw & prepare empty grid
				const
					grid=[],
					cell=svg.getById("gridCell"),
					cellWidth=svg.getNum(cell,"width"),
					cellHeight=svg.getNum(cell,"height");
				for (let y=0;y<mapheight;y++) {
					const gridrow=[];
					grid.push(gridrow);
					for (let x=0;x<mapwidth;x++) {
						gridrow.push(0);
						svg.cloneNodeBy("gridCell","c_"+x+"_"+y,x*cellWidth,y*cellHeight);
					}
				}

				// Draw Axis
				for (let y=0;y<mapheight;y++) svg.setText(svg.cloneNodeBy("gridRow",0,0,y*cellHeight),y+1);
				for (let x=0;x<mapwidth;x++) svg.setText(svg.cloneNodeBy("gridCol",0,x*cellWidth,0),x+1);

				// Draw guides
				for (let y=0;y<mapheight;y+=mapGuidesEvery)
					for (let x=0;x<mapwidth;x+=mapGuidesEvery) 
						svg.cloneNodeBy("gridGuide",0,x*cellWidth,y*cellHeight,cellWidth*mapGuidesEvery,cellHeight*mapGuidesEvery);

				// Render rooms
				const
					roomDataHeight=svg.getNum(svg.getById("roomHeight"),"height"),
					renderedDoors={};
				rooms.forEach((room,index)=>{

					// Render starting room
					if (debug&&debug.drawRooms) {
						if (room.isFake)
							svg.cloneNodeBy("startingRoom",0,room.x*cellWidth+2,room.y*cellHeight+2,cellWidth*room.width-4,cellHeight*room.height-4);
						else {
							svg.cloneNodeBy("startingRoom",0,room.x*cellWidth,room.y*cellHeight,cellWidth*room.width,cellHeight*room.height);
							if (room.isStartingRoom)
								svg.cloneNodeBy("startingRoom",0,room.x*cellWidth+1,room.y*cellHeight+1,cellWidth*room.width-2,cellHeight*room.height-2);
						}
					} else if (room.isStartingRoom)
						svg.cloneNodeBy("startingRoom",0,room.x*cellWidth,room.y*cellHeight,cellWidth*room.width,cellHeight*room.height);


					room.exits.forEach(exit=>{
						const id=getDoorId(exit);
						if (!renderedDoors[id]) {
							renderedDoors[id]=1;
							switch (exit.side) {
								case "up":{
									svg.cloneNodeBy("doorDown",0,exit.x*cellWidth,exit.y*cellHeight);
									break;
								}
								case "down":{
									svg.cloneNodeBy("doorUp",0,exit.x*cellWidth,exit.y*cellHeight);
									break;
								}
								case "right":{
									svg.cloneNodeBy("doorLeft",0,exit.x*cellWidth,exit.y*cellHeight);
									break;
								}
								case "left":{
									svg.cloneNodeBy("doorRight",0,exit.x*cellWidth,exit.y*cellHeight);
									break;
								}
							}						
						}
					});

					// Render room items
					room.items.forEach(item=>{
						const
							x=item.x+room.x,
							y=item.y+room.y,
							px=x*cellWidth,
							py=y*cellHeight;

						item=item.item;
						switch (item.id) {
							case "entrance":{
								if (debug&&debug.drawRoomNumbers)
									svg.setText(svg.cloneNodeBy("gridNumber",0,px,py),room.id);
								else
									svg.setText(svg.cloneNodeBy("gridNumber",0,px,py),getCellValue(x,y,room));
								break;
							}
							case "enemy":{
								const enemy=svg.cloneNodeBy("gridEnemy",0,px,py);
								setCheckBox(svg,svg.getById("gridEnemyLevel",enemy),item.level);
								break;
							}
							case "genericItem":{
								const genericItem=svg.cloneNodeBy("gridItem",0,px,py);							
								svg.setText(svg.getById("gridItemId",genericItem),item.itemId);
								break;
							}
							case "stairs":{
								svg.cloneNodeBy("gridStairs","map-stairs",px,py);
								break;
							}
						}
					});

					// Render rooms list
					let
						boxY=roomDataHeight*index,
						lineParts;
					const roomData=svg.cloneNodeBy("roomData",0,0,boxY);
					if (room.isStartingRoom) {
						svg.delete(svg.getById("roomCoords",roomData),roomData);
						svg.setId(svg.getById("roomHeight",roomData),"list-stairs");
					} else {
						svg.delete(svg.getById("roomStarting",roomData),roomData);
						svg.setText(svg.getById("roomPosition",roomData),(room.x+1)+","+(room.y+1));
						svg.setText(svg.getById("roomSize",roomData),room.width+"x"+room.height);
					}
					svg.setText(svg.getById("roomId",roomData),room.id);

					if (room.description[0]) {
						lineParts=room.description[0].split("^*v");
						svg.setText(svg.getById("roomLine1",roomData),lineParts[0]||"");
						if (lineParts[1])
							svg.setText(svg.cloneNodeBy("roomLine1UpsideDown",0,0,-boxY),lineParts[1]);
					} else svg.delete(svg.getById("roomLine1",roomData));

					if (room.description[1]) {
						lineParts=room.description[1].split("^*v");
						svg.setText(svg.getById("roomLine2",roomData),lineParts[0]||"");
						if (lineParts[1])
							svg.setText(svg.cloneNodeBy("roomLine2UpsideDown",0,0,-boxY),lineParts[1]);
					} else svg.delete(svg.getById("roomLine2",roomData));

				});

				// Render hero
				let tierWidth=svg.getNum(svg.getById("heroBox"),"width");
				hero.skills.forEach((tier,index)=>{
					const skillTier=svg.cloneNodeBy("heroTier",0,tierWidth*index,0);
					svg.setText(svg.getById("heroSkillUp",skillTier),tier.skills[0]||"");
					svg.setText(svg.getById("heroSkillDown",skillTier),tier.skills[1]||"");
					svg.setText(svg.getById("heroDefense",skillTier),hero.defense[index]?"+"+hero.defense[index]+" DEF":"-");
					setCheckBox(svg,svg.getById("heroXp",skillTier),tier.xp);
					setCheckBox(svg,svg.getById("heroHp",skillTier),tier.hp);
				});

				// Render enemies
				tierWidth=svg.getNum(svg.getById("enemyBox"),"width");
				enemies.forEach((enemy,index)=>{
					const skillTier=svg.cloneNodeBy("enemyTier",0,tierWidth*index,0);
					if (index==0) svg.delete(svg.getById("enemySymbol",skillTier));
					else svg.delete(svg.getById("enemyOutline",skillTier));
					svg.setText(svg.getById("enemySkillUp",skillTier),enemy.skills[0]||"");
					svg.setText(svg.getById("enemySkillDown",skillTier),enemy.skills[1]||"");
					svg.setText(svg.getById("enemyXp",skillTier),"+"+enemy.gainXp+" XP");
					svg.setText(svg.getById("enemyDefense",skillTier),enemy.defense?"+"+enemy.defense+" DEF":"-");
					setCheckBox(svg,svg.getById("enemyLevel",skillTier),enemy.level);
				});

				// Render noise
				noise.forEach(item=>{
					const
						x=item.x,
						y=item.y,
						px=x*cellWidth,
						py=y*cellHeight;
					switch (item.id) {
						case "fakeEntrance":{
							svg.setText(svg.cloneNodeBy("gridNumber",0,px,py),Math.abs(getCellValue(x,y,getRandom(rooms))));
							break;
						}
						case "fakeEnemy":{
							const enemy=svg.cloneNodeBy("gridEnemy",0,px,py);
							setCheckBox(svg,svg.getById("gridEnemyLevel",enemy),item.level);
							break;
						}
						case "fakeGenericItem":{
							const genericItem=svg.cloneNodeBy("gridItem",0,px,py);							
							svg.setText(svg.getById("gridItemId",genericItem),item.itemId);
							break;
						}
						case "fakeDoorDown":{
							svg.cloneNodeBy("doorDown",0,item.x*cellWidth,item.y*cellHeight);
							break;
						}
						case "fakeDoorRight":{
							svg.cloneNodeBy("doorRight",0,item.x*cellWidth,item.y*cellHeight);
							break;
						}
					}
				});

				// Render gold
				const goldSize=svg.getNum(svg.getById("goldLeft"),"width")+0.56;
				for (let i=0;i<gold;i++) {
					svg.cloneNodeBy((gold-i)%10?"goldLeft":"goldLeftMark",0,goldSize*i,0);
				}

				// Render services
				const serviceHeight=svg.getNum(svg.getById("serviceCheckbox"),"width")+1.2;
				services.forEach((service,index)=>{
					const
						line=svg.cloneNodeBy("serviceBox",0,0,index*serviceHeight),
						description=service.isFake?formatFakeDescriptionLine(service.equipment.action):formatDescriptionLine(service.equipment.action);
					svg.setText(svg.getById("serviceName",line),(service.isFake&&debug&&debug.showFake?"[FAKE] ":"")+service.equipment.label+" ("+description+")");
					if (!service.isAvailable) svg.delete(svg.getById("serviceCheckbox",line));
				});

				// Render adventure metadata
				svg.setText(svg.getById("adventureTitle"),this.metadata.title);
				svg.setText(svg.getById("adventureHeader"),this.metadata.header);

				// Render footer
				svg.setText(svg.getById("footer"),footer);

				// Delete stencils
				svg.deleteById("serviceBox");
				svg.deleteById("goldLeft");
				svg.deleteById("goldLeftMark");
				svg.deleteById("heroTier");
				svg.deleteById("enemyTier");
				svg.deleteById("gridCol");
				svg.deleteById("gridRow");
				svg.deleteById("gridCell");
				svg.deleteById("gridNumber");
				svg.deleteById("startingRoom");
				svg.deleteById("doorUp");
				svg.deleteById("doorDown");
				svg.deleteById("doorLeft");
				svg.deleteById("doorRight");
				svg.deleteById("roomData");
				svg.deleteById("gridStairs");
				svg.deleteById("gridEnemy");
				svg.deleteById("gridItem");
				svg.deleteById("gridGuide");
				svg.deleteById("guides");
				svg.deleteById("roomLine1UpsideDown");
				svg.deleteById("roomLine2UpsideDown");

				cb(svg);

			});

		}

	}

	return this;
}