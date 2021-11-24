/* globals SVGTemplate SVG */
/* exported DungeonGenerator */

const DungeonGenerator=function(root,mapwidth,mapheight,seed,debug) {

	const
		MAX_EQUIPMENT=3,
		MAX_DESCRIPTION=2,
		MIN_LVL1_XP=3,
		ROOMPLACEHOLDERS=[
			{
				regex:/{roomId:([^}]*)}/g,
				replace:"{roomSymbol}{room:1}"
			},
			{
				regex:/{markRoom:([^}]*)}/g,
				replace:"{markRoomSymbol}{room:1}"
			},
			{
				regex:/{ifRoomIsMarked:([^}]*)}/g,
				replace:"{markRoomSymbol}{room:1}"
			},
			{
				regex:/{ifRoomIsNotMarked:([^}]*)}/g,
				replace:"{notMarkRoomSymbol}{room:1}"
			},
			{
				regex:/{teleportToRoom:([^}]*)}/g,
				replace:"{moveSymbol} anywhere in {roomLabelSymbol}{room:1}"
			},
			{
				regex:/{teleportToRiddleRoom:([^}]*)}/g,
				replace:"{moveSymbol} anywhere in {roomRiddle:1}"
			},
			{
				regex:/{ifMoveOn:([^}]*)}/g,
				replace:"{moveSymbol} {item:1}"
			},
			{
				regex:/{markItem:([^}]*)}/g,
				replace:"{itemMarkSymbol}{item:1}"
			},
			{
				regex:/{applyModifierOnRoomMarked:([^,]+),([^}]+)\}/g,
				replace:"{markRoomSymbol}{room:2}{and}{modifierCondition:1}{then}{modifierAction:1}"
			},
			{
				regex:/{applyModifierOnRoomNotMarked:([^,]+),([^}]+)\}/g,
				replace:"{notMarkRoomSymbol}{room:2}{and}{modifierCondition:1}{then}{modifierAction:1}"
			},
			{
				regex:/{applyModifier:([^}]+)}/g,
				replace:"{modifier:1}"
			},
			{
				regex:/{discoverRoom:([^}]*)}/g,
				replace:"discover {roomLabelSymbol}{room:1}"
			},
			{
				regex:/{drawItemAt:([^,]+),([^}]+)\}/g,
				replace:"draw {itemId:1} in {roomLabelSymbol}{room:2}"
			},
			{
				regex:/{regainSkill}/g,
				replace:"gain hero ability \"{stealHeroSkill:1}\""
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
		keywordsSetsIndex={},
		modifiers=0,
		modifiersByType=[],
		modifiersById=[],
		modifiersIds=[],
		modifiersModel=0,
		mixMode=false,
		roomsModels=0,
		startingRoom=0,
		globalModifier=0,
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
		roomLabels={
			index:{},
			byRoomId:{},
			rooms:[]
		},
		questGeneratorInterface={},
		allRooms=[],
		flavorTexts,
		quests,
		placeholderModels,
		enemyModels,
		truthMap,
		roomPriorities,
		shredderMode,
		complexityEnabled,
		fakeDescriptions=[],
		symbolsMap={},
		optionalRoomsCache={},
		svg;

	this.prepared=false;

	this.setSymbolsMap=(map)=>symbolsMap=map;
	this.setMixMode=(v)=>mixMode=v;
	this.setRoomsModels=(roomsmodelsdata)=>roomsModels=roomsmodelsdata;
	this.setComplexityEvaluation=(v)=>complexityEnabled=v;
	this.setShredderMode=(v)=>shredderMode=v; // Shredder mode uses starting room distance instead of shortest paths.
	this.setModifiers=(modifiersdata)=>modifiers=modifiersdata;
	this.setModifiersModel=(modifiersmodeldata)=>modifiersModel=modifiersmodeldata;
	this.setRoomPriorities=(roomprioritiesdata)=>roomPriorities=roomprioritiesdata;
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
			case "up":{ return exit.x+"-v-"+(exit.y+1); }
			case "left":{ return (exit.x+1)+"-h-"+exit.y; } 
			case "down":{ return exit.x+"-v-"+exit.y;; } 
			case "right":{ return exit.x+"-h-"+exit.y; } 
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

	function isIntersecting(list1,list2) {
		if (!list1||!list1.length||!list2||!list2.length) return false;
		for (let i=0;i<list1.length;i++)
			if (list2.indexOf(list1[i])!=-1) return true;
		return false;
	}

	function generateRoomRiddle(roomid) {
		let riddleRoom=0;
		do {
			riddleRoom=getRandom(roomLabels.rooms);
		} while (riddleRoom.id==roomid);
		let delta=roomid-riddleRoom.id;
		return getRandom(riddleRoom.labels)+" Room "+(debug&&debug.solveRoomRiddles?"("+riddleRoom.id+") ":"")+(delta>0?"+ ":"- ")+Math.abs(delta)+(debug&&debug.solveRoomRiddles?" = "+roomid:"");
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

	function shortestPath(room,exclude) {
		if (
			room.isStartingRoom||
			(exclude&&(exclude.indexOf(room.id)!=-1))
		) return [];
		let
			queue = [ room ],
			visited = { },
			predecessor = {},
			tail = 0;
			visited[room.id]=1;
		while (tail < queue.length) {
			let
				u = queue[tail++],
				neighbors = u.exits;
			for (let i = 0; i < neighbors.length; ++i) {
				let exit = neighbors[i];
				if (
					(visited[exit.toRoom.id])||
					(exit.toRoom.isOptionalRoom)||
					(exclude&&(exclude.indexOf(exit.toRoom.id)!=-1))
				) continue;
				let v=exit.toRoom;
				visited[v.id] = 1;
				if (v.isStartingRoom) {
					let path = [ ];
					while (u !== room) {	        
						path.push(u.id);
						u = predecessor[u.id];
					}
					path.push(u.id);
					path.reverse();
					return path;
				}
				predecessor[v.id] = u;
				queue.push(v);
			}
		}
		return [];
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
		line=line.replaceAll("{newRule}",symbolsMap.actions.newRule);
		line=line.replaceAll("{and}",symbolsMap.actions.and);
		line=line.replaceAll("{or}",symbolsMap.actions.or);
		line=line.replaceAll("{then}",symbolsMap.actions.then);

		// Special - Actions
		line=line.replaceAll("{rollDie}","roll a die: ");
		line=line.replaceAll("{nothing}","nothing happens");
		line=line.replaceAll("{stopReading}","stop reading");
		line=line.replace(/\{sumDice:([0-9]+)\}/g,(m,num)=>"sum "+num+" dice");
		line=line.replace(/\{activateAbility:([0-9]+)\}/g,(m,num)=>"activate "+num+" "+(num==1?"ability":"abilities"));

		// Special - Conditions
		line=line.replace(/\{range:([0-9]+)-([0-9]+)\}/g,(m,num1,num2)=>(num1==num2?"="+num1:num1+"~"+num2));

		// Hero state - Conditions
		line=line.replaceAll("{ifHeroDied}","hero died");

		// Fight turn - Conditions
		line=line.replaceAll("{ifAfterEnemyRollInFight}","enemy turn roll");
		line=line.replaceAll("{ifAfterHeroRollInFight}","hero turn roll");
		line=line.replaceAll("{ifAfterRollInFight}","any battle turn roll");
		line=line.replaceAll("{ifAfterHeroLoseHp}","hero loses HP");
		line=line.replace(/\{ifHeroPerformAction:([^}]+)\}/g,(m,act)=>"hero activates "+act);
		line=line.replace(/\{ifEnemyPerformAction:([^}]+)\}/g,(m,act)=>"enemy activates "+act);
		line=line.replace(/\{ifPerformAction:([^}]+)\}/g,(m,act)=>"any "+act+" activation");
		line=line.replaceAll("{ifHeroTurn}","hero turn");
		line=line.replaceAll("{ifBeforeHeroRollInFight}","before hero turn roll");
		line=line.replaceAll("{ifEveryBattleRoundStarts}","a battle round starts");
		line=line.replace(/\{ifNextEnemyRolls:([0-9]+)\}/g,(m,num)=>"next "+num+" enemy turn rolls");
		line=line.replace(/\{ifNextHeroRolls:([0-9]+)\}/g,(m,num)=>"next "+num+" hero turn rolls");
		line=line.replace(/\{ifEnemyRolls:([0-9]+)\}/g,(m,num)=>"enemy turn rolled "+num);
		line=line.replace(/\{ifHeroRolls:([0-9]+)\}/g,(m,num)=>"hero turn rolled "+num);
		line=line.replace(/\{ifRolls:([0-9]+)\}/g,(m,num)=>"rolled "+num+" in battle");

		// Fight turn - Actions
		line=line.replaceAll("{pass}","pass");
		line=line.replace(/\{fightingEnemyLoseHp:([0-9]+),([0-9]+),([0-9]+)\}/g,(m,num,num2,num3)=>"-"+num+"HP to "+(num2*1?(num2==1?"1 enemy":"up to "+num2+" enemies"):"all enemies")+" in range "+num3);
		line=line.replace(/\{actionEffect:([-0-9]+)\}/g,(m,num)=>"effect "+(num>0?"+":"")+num);
		line=line.replace(/\{modifyDice:([0-9]+),([-0-9]+)\}/g,(m,num,num2)=>(num2>0?"add":"reduce")+" "+num+" "+(num==1?"die":"dice")+" value by "+Math.abs(num2));
		line=line.replace(/\{activateOnly:([-0-9]+)\}/g,(m,num)=>"can activate "+num+" "+(num==1?"ability":"abilities")+" only");
		line=line.replace(/\{reroll:([0-9]+)\}/g,(m,num)=>"reroll all "+num+" once");
		line=line.replace(/\{performByRoomSize:([^}]+)\}/g,(m,skill)=>skill+" by current room cells count");
		line=line.replace(/\{performFreeActionWithPower:([0-9]+),([0-9]+)\}/g,(m,num,num2)=>"activate 1 "+(num==1?"ability":"abilities")+" using value "+num2);
		
		// Room - Conditions
		line=line.replaceAll("{ifEnterRoom}","enter {roomUnspacedLabelSymbol}");
		line=line.replaceAll("{ifCrossDoor}","cross door");
		line=line.replaceAll("{ifMoveOnStairs}","{moveSymbol} on stairs");
		line=line.replaceAll("{ifNoFoes}","no foes");
		line=line.replaceAll("{ifKilledLastFoe}","killed last foe");
		line=line.replaceAll("{goBack}","move back");

		// Room - Actions
		line=line.replaceAll("{moveOnStairs}","{moveSymbol} on stairs");
		line=line.replaceAll("{roomIsEmpty}","{roomUnspacedLabelSymbol} is empty");
		line=line.replaceAll("{noEscape}","no escape");
		line=line.replaceAll("{teleportToStartingRoom}","{moveSymbol} anywhere in starting {roomUnspacedLabelSymbol}");
		line=line.replace(/\{discoverAnyRoom:([0-9]+)\}/g,(m,num)=>"select "+num+" "+(num==1?"room":"rooms")+", discover "+(num==1?"it":"them"));

		// HP - Conditions
		line=line.replace(/\{ifPayHp:([0-9]+)\}/g,(m,num)=>"{paySymbol}"+num+"HP");
		line=line.replace(/\{ifHpLeft=:([0-9]+)\}/g,(m,num)=>"HP left ="+num);

		// HP - Actions
		line=line.replaceAll("{gainFullHp}","+"+hero.maxHp+"HP");
		line=line.replaceAll("{loseFullHp}","-"+hero.maxHp+"HP");
		line=line.replaceAll("{killHero}","-"+(hero.maxHp+1)+"HP");
		line=line.replace(/\{loseFullHp-:([0-9]+)\}/g,(m,num)=>"-"+(hero.maxHp-num)+"HP");
		line=line.replaceAll("{gainHalfHp}","+"+Math.ceil(hero.maxHp/2)+"HP");
		line=line.replaceAll("{loseHalfHp}","-"+Math.ceil(hero.maxHp/2)+"HP");
		line=line.replace(/\{gainHp:([0-9]+)\}/g,(m,num)=>"+"+num+"HP");
		line=line.replace(/\{loseHp:([0-9]+)\}/g,(m,num)=>"-"+num+"HP");

		// XP - Conditions
		line=line.replace(/\{ifPayXp:([0-9]+)\}/g,(m,num)=>"{paySymbol}"+num+"XP");

		// XP - Actions		
		line=line.replace(/\{gainXp:([0-9]+)\}/g,(m,num)=>"+"+num+"XP");
		line=line.replace(/\{loseXp:([0-9]+)\}/g,(m,num)=>"-"+num+"XP");

		// Gold - Conditions
		line=line.replace(/\{ifPayGold:([0-9]+)\}/g,(m,num)=>"{paySymbol}"+num+"G");
		line=line.replace(/\{ifGoldLeft<half\}/g,(m,num)=>"<"+(Math.floor(gold/2)+1)+"G left");
		line=line.replace(/\{ifGoldLeft>half\}/g,(m,num)=>">"+Math.floor(gold/2)+"G left");
		line=line.replace(/\{ifGoldSpentInFifth:([0-9]+)-([0-9]+)\}/g,(m,num,num2)=>(Math.floor(gold/5)*(num-1)+(num==1?0:1))+"~"+(num2==5?gold:Math.floor(gold/5)*num2)+"G spent");
		line=line.replace(/\{andPayGoldToReach:([0-9]+)\}/g,(m,num)=>"+ G to reach >="+num);

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
		line=line.replace(/\{discardAllDie<=:([0-9]+)\}/g,(m,num)=>"discard dice <="+num);
		line=line.replace(/\{flipDieUpsideDown:([0-9]+)\}/g,(m,num)=>"flip "+num+" "+(num==1?"die":"dice"));
		line=line.replaceAll("{playLowerDieFirst}","play lower die first");
		line=line.replaceAll("{placeDiceInSameColumn}","play dice in same column");
		line=line.replaceAll("{placeDiceInSameRow}","play dice in same row");

		// Quest placeholders
		for (const k in globalPlaceholders)
			line=line.replaceAll("{"+k+"}",globalPlaceholders[k]);

		// Symbols
		line=line.replaceAll("{itemMarkSymbol}",symbolsMap.items.mark);
		line=line.replaceAll("{markRoomSymbol}",symbolsMap.rooms.markRoom);
		line=line.replaceAll("{notMarkRoomSymbol}",symbolsMap.rooms.notMarkRoom);
		line=line.replaceAll("{roomSymbol}",symbolsMap.rooms.symbol);
		line=line.replaceAll("{roomUnspacedLabelSymbol}",symbolsMap.rooms.unspacedLabel);
		line=line.replaceAll("{roomLabelSymbol}",symbolsMap.rooms.label);
		line=line.replaceAll("{moveSymbol}",symbolsMap.actions.move);
		line=line.replaceAll("{paySymbol}",symbolsMap.actions.pay);

		return line;
	}

	function formatKeywords(line) {

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
				return entry.verb+" '"+(keyword?keyword.label+"'":"{missingKeyword}");
			});
		});

		// Keywords sets
		[
			{regex:/\{ifKeywordSet:([^}]+)\}/g,verb:"know any"},
			{regex:/\{ifNotKeywordSet:([^}]+)\}/g,verb:"don't know any"},
			{regex:/\{ifLoseKeywordSet:([^}]+)\}/g,verb:"forget any"},
			{regex:/\{loseKeywordSet:([^}]+)\}/g,verb:"forget any"},
			{regex:/\{getKeywordSet:([^}]+)\}/g,verb:"learn any"},
		].forEach((entry)=>{
			line=line.replace(entry.regex,(m,id)=>{
				let keyword=keywordsSetsIndex[id];
				if (!keyword) console.warn("Can't find keyword",id);
				return entry.verb+" '"+(keyword?keyword.label+"...'":"{missingKeywordSet}");
			});
		});

		return line;
	}

	function formatFakeDescriptionLine(line) {

		const placeholders={roomIds:{},itemIds:{}};

		line=formatRandomizers(line);
		line=formatKeywords(line);

		[
			{regex:/\{payEquip:([^}]+)\}/g,verb:symbolsMap.equipment.pay},
			{regex:/\{loseEquip:([^}]+)\}/g,verb:symbolsMap.equipment.lose},
			{regex:/\{getEquip:([^}]+)\}/g,verb:symbolsMap.equipment.get},
			{regex:/\{nameEquip:([^}]+)\}/g},
		].forEach((entry)=>{
			line=line.replace(entry.regex,(m,id)=>{
				let equipment=globalPlaceholders[id];
				if (!equipment) equipment=getRandom(services).equipment.label;
				return (entry.verb?entry.verb:"")+equipment;
			});
		});

		ROOMPLACEHOLDERS.forEach(placeholder=>{
			line=line.replace(placeholder.regex,function (){
				const matches=arguments;
				return placeholder.replace.replace(/{([^:}]*):([^}]*)}/g,(line,marker,value)=>{
					switch (marker) {
						case "roomRiddle":
						case "room":{
							if (!placeholders.roomIds[matches[value]]) placeholders.roomIds[matches[value]]=getRandom(rooms);
							if (marker=="roomRiddle") return generateRoomRiddle(placeholders.roomIds[matches[value]].id);
							return placeholders.roomIds[matches[value]].id;
						}
						case "itemId":
						case "item":{
							return symbolsMap.items.roomsTable[1];
						}
						case "stealHeroSkill":{
							return "ATK -1 RNG 1";
						}
						case "modifierCondition":{
							return modifiersById[getRandom(modifiersIds)].condition;
						}
						case "modifierAction":{
							return modifiersById[getRandom(modifiersIds)].action;
						}
						case "modifier":{
							return modifiersById[getRandom(modifiersIds)].full;
						}
						default:{
							return line;
						}
					}
				})
			})
		});

		line=formatGlobalPlaceholders(line);

		return line;

	}

	function formatDescriptionLine(line,placeholders) {

		line=formatRandomizers(line);
		line=formatKeywords(line);

		line=line.replace(/\{payEquip:([^}]+)\}/g,(m,id)=>symbolsMap.equipment.pay+globalPlaceholders[id]);
		line=line.replace(/\{loseEquip:([^}]+)\}/g,(m,id)=>symbolsMap.equipment.lose+globalPlaceholders[id]);
		line=line.replace(/\{getEquip:([^}]+)\}/g,(m,id)=>symbolsMap.equipment.get+globalPlaceholders[id]);
		line=line.replace(/\{nameEquip:([^}]+)\}/g,(m,id)=>globalPlaceholders[id]);

		ROOMPLACEHOLDERS.forEach(placeholder=>{
			line=line.replace(placeholder.regex,function (){
				const matches=arguments;
				return placeholder.replace.replace(/{([^:}]*):([^}]*)}/g,(line,marker,value)=>{
					switch (marker) {
						case "roomRiddle":
						case "room":{
							let room;
							if (placeholders) room=placeholders.roomIds[matches[value]];
							if (!room) room=globalPlaceholders.roomIds[matches[value]];
							if (room) {
								if (marker=="roomRiddle") return generateRoomRiddle(room.id);
								else return room.id;
							} else {
								debugger;
								console.warn("can't find room",matches[value],"in line",line);
								return "{missingRoom}";
							}
						}
						case "modifierCondition":{
							return modifiersById[matches[value]].condition;
						}
						case "modifierAction":{
							return modifiersById[matches[value]].action;
						}
						case "modifier":{
							return modifiersById[matches[value]].full;
						}
						case "item":{
							return symbolsMap.items.roomsTable[placeholders.itemIds[matches[value]]];
						}
						case "itemId":{
							return matches[value];
						}
						case "stealHeroSkill":{
							return placeholders.stealHeroSkill;
						}
						default:{
							return line;
						}
					}
				})
			})
		});

		// Local placeholders
		for (const k in placeholders)
			line=line.replaceAll("{"+k+"}",placeholders[k]);

		line=formatGlobalPlaceholders(line);

		return line;
	}

	function solvePlaceholder(placeholder,isfake,label) {
		if (placeholder.text) return placeholder.text;
		if (isfake||placeholder.fakeLine) {
			let text=placeholder.fakeLine||placeholder[label];
			for (let i=0;i<3;i++) text=formatFakeDescriptionLine(text);
			text=text.replace(/{[^}]*}/g,"\"...\""); // Solve unknown local placeholders with ellipsis
			return text;
		} else {
			let text=placeholder.line||placeholder[label];
			for (let i=0;i<3;i++) text=formatDescriptionLine(text,placeholder.placeholders);
			return text;
		}
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

	function clearOptionaRoomsCache() {
		optionalRoomsCache={};
	}

	function isOptionalRoom(id) {
		if (optionalRoomsCache[id]===undefined) {
			let avoidRooms=[id];
			optionalRoomsCache[id]=true;
			for (let j=0;j<rooms.length;j++)
				if (
						!rooms[j].isStartingRoom&&
						(rooms[j].id!=id)
				) {
					var path=shortestPath(rooms[j],avoidRooms);
					if (!path.length) {
						optionalRoomsCache[id]=false;
						break;
					}
				}
		}
		return optionalRoomsCache[id];
	}

	// Rooms

	const Room=function(priorityid,x,y,width,height,isCorridor,isStartingRoom) {
		this.priorityId=priorityid;
		this.x=x;
		this.y=y;
		this.isFake=false;
		this.width=width;
		this.height=height;
		this.isCorridor=!!isCorridor;
		this.isStartingRoom=!!isStartingRoom;
		this.isMarkable=this.isStartingRoom;
		this.hasEnemies=false;
		this.isExclusive=false;
		this.itemsIndex=[];
		this.items=[];
		this.entrancesIndex=[];
		this.entrances=[];
		this.exits=[];
		this.description=[];
		this.isOptionalRoom=false;
		this.genericItemId=0;

		this.addItem=function(x,y,item) {
			if (this.entrancesIndex[y]&&this.entrancesIndex[y][x])
				console.warn("Conflicting space in room",this," @",x,",",y,"want place",item,"but there is an entrance");
			else if (this.itemsIndex[y]&&this.itemsIndex[y][x])
				console.warn("Conflicting space in room",this," @",x,",",y,"want place",item,"but there is an item",this.itemsIndex[y][x]);
			else {
				const wrappeditem={
					x:x,
					y:y,
					item:item
				};
				if (!this.itemsIndex[y]) this.itemsIndex[y]=[];
				if (!this.itemsIndex[y][x]) this.itemsIndex[y][x]=[];
				this.itemsIndex[y][x].push(wrappeditem);
				this.items.push(wrappeditem);
				return true;
			}
		}

		this.addEntrance=function(x,y,fromroom) {
			x=x-this.x;
			y=y-this.y;
			const wrappedentrance={
				x:x,
				y:y,
				fromRoom:fromroom
			};
			if (!this.entrancesIndex[y]) this.entrancesIndex[y]=[];
			if (!this.entrancesIndex[y][x]) this.entrancesIndex[y][x]=[];
			this.entrancesIndex[y][x].push(wrappedentrance);
			this.entrances.push(wrappedentrance);
		}

		this.removeEntrance=function(x,y,fromroom) {
			x=x-this.x;
			y=y-this.y;
			if (this.entrancesIndex[y]&&this.entrancesIndex[y][x]) {
				let entrancesPointer=this.entrancesIndex[y][x];
				for (let i=0;i<entrancesPointer.length;i++)
					if (
						(entrancesPointer[i].x==x)&&
						(entrancesPointer[i].y==y)&&
						(entrancesPointer[i].fromRoom==fromroom)
					) {
						let index=this.entrances.indexOf(entrancesPointer[i]);
						if (index!=-1) this.entrances.splice(index,1);
						entrancesPointer.splice(i,1);
					}
				if (!entrancesPointer.length) this.entrancesIndex[y][x]=0;
			}
		}

		this.getFreeSpaces=function() {
			const list=[];
			for (let y=0;y<this.height;y++)
				for (let x=0;x<this.width;x++) {
					if (
						((!this.itemsIndex[y])||(!this.itemsIndex[y][x]))&&
						((!this.entrancesIndex[y])||(!this.entrancesIndex[y][x]))
					) list.push({x:x,y:y});
				}
			return list;
		}

		this.addExit=function(x,y,fromX,fromY,side,toroom) {
			this.exits.push({
				toRoom:toroom,
				x:x,
				y:y,
				fromX:fromX,
				fromY:fromY,
				side:side
			});
		}

		this.removeExit=function(x,y,toroom,entrancesonly) {
			for (let i=0;i<this.exits.length;i++)
				if (this.exits[i].toRoom===toroom) {
					this.removeEntrance(x,y,toroom);
					if (!entrancesonly) {
						this.exits.splice(i,1);
						i--;
					}
				}
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

		this.shuffleExits=function() {
			shuffleArray(this.exits)
		}

		this.makeFake=function() {
			this.isFake=true;
			this.exits=[];
			this.itemsIndex=[];
			this.items=[];
			this.entrancesIndex=[];
			this.entrances=[];
			this.description=[];
		}

		this.makeOptional=function() {
			this.isOptionalRoom=true;
		}

		this.makeHidden=function() {
			this.makeOptional();
			this.exits.forEach(exit=>{
				exit.toRoom.removeExit(exit.x,exit.y,this);
			})
			this.exits=[];
			this.entrances=[];
			this.entrancesIndex=[];
		}

		this.makeDeadEnd=function() {
			this.makeOptional();
			var onlyExit=getRandom(this.exits);
			this.exits.forEach(exit=>{
				if (exit!==onlyExit) {
					exit.toRoom.removeExit(exit.x,exit.y,this);
					this.removeExit(exit.fromX,exit.fromY,exit.toRoom,true);
				}
			})
			this.exits=[onlyExit];
		}

		this.applyDelta=function(delta) {
			this.id+=delta;
		}

		return this;
	}

	this.addRoom=function(priorityid,x,y,width,height,isCorridor,isStartingRoom) {
		const room=new Room(
			priorityid,
			solveRoomTemplateArgument(x),
			solveRoomTemplateArgument(y),
			solveRoomTemplateArgument(width),
			solveRoomTemplateArgument(height),
			isCorridor,isStartingRoom);
		rooms.push(room);
		return room;
	}

	this.scatterRooms=function() {
		let
			valid=false,
			priorities=getRandom(roomPriorities),
			roomsPerPriority=[];

		// Shuffle same priority rooms
		rooms.forEach(room=>{
			var priority=priorities[room.priorityId];
			if (!roomsPerPriority[priority]) roomsPerPriority[priority]=[];
			roomsPerPriority[priority].push(room);
		});
		roomsPerPriority.forEach(rooms=>shuffleArray(rooms));
		rooms=roomsPerPriority.flat();

		let minx, miny;
		let w, h;
		while (!valid) {
			minx=9999;
			miny=9999;
			let
				maxx=0,
				maxy=0,
				angle=random(Math.PI*2);
			for (let i=0;i<rooms.length;i++) {
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
				exit.from.room.addExit(exit.to.x,exit.to.y,exit.from.x,exit.from.y,exit.sides[0],exit.to.room);
				exit.to.room.addExit(exit.from.x,exit.from.y,exit.to.x,exit.to.y,exit.sides[1],exit.from.room);
			}
		}
		rooms.forEach(room=>{
			allRooms.push(room);
			if (room.isCorridor&&(room.exits.length<2)) fakeRooms.push(room);
			else newRooms.push(room);
		});
		newRooms.forEach(room=>room.removeRooms(fakeRooms));
		newRooms.forEach(room=>room.createEntrances());
		newRooms.forEach(room=>room.shuffleExits());
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
			if (!room.isStartingRoom&&!room.isOptionalRoom)
				routes.push(shortestPath(room).map(roomid=>roomsIndex[roomid]));
		});
		routes.sort(sortByLengthInverse);
		return routes;
	}

	function isRoomFittingStep(room,step) {

		success=true;

		if (mixMode) {
			success&=!room.room.isExclusive; // Never use rooms that are already marked by an exclusive event.
			success&=!step.isExclusive||!room.room.isBusy; // Cannot mix exclusive events with busy rooms (i.e. they are already hosting an event)
			success&=!step.hasEnemies||!room.room.hasEnemies; // Cannot mix multiple enemy rooms to avoid flooding.
			success&=!step.isMarkable||!room.room.isMarkable; // Cannot mix multiple markable rooms to avoid checkmark conflicts.
		} else {
			success&=step.allowBusyRooms||!room.room.isBusy;
		}
		
		// Room may host a hidden room
		if (success&&(step.isOptionalRoom||step.isHiddenRoom||step.isDeadEndRoom))
			success=isOptionalRoom(room.room.id);

		// Room must fit the required amount of items
		success&=!step.items||(room.freeSpaces.length>=step.items.length);

		// If a room requires a hero skill to steal, it must be available
		success&=!step.stealHeroSkill||hasHeroSkillTag(step.stealHeroSkill);

		// Room must fit the required amount of description
		success&=!step.roomDescriptions||(room.room.description.length+step.roomDescriptions[0].length<=MAX_DESCRIPTION);

		return success;					
	}

	this.getQuestSubroute=function(route,quest,steps) {

		let
			minRooms=quest.minRooms||steps.length;

		if (route.length<minRooms) return false;
		else {

			// The quest must fit the selected hero class
			if (
				(!quest.ignoreForHeroTags||!isIntersecting(quest.ignoreForHeroTags,heroModel.tags))&&
				(!quest.onlyForHeroTags||isIntersecting(quest.onlyForHeroTags,heroModel.tags))
			) {

				const
					tempServices=clone(services),
					tempEquipment=clone(equipment);
				let success=true;

				// Check if the equipment fits in the Equipment Scroll
				steps.forEach(step=>{

					// Inventory must fit the required equipment
					if (step.equipment)
						step.equipment.forEach(equip=>{
							let neededEquipment=pickEquipment(tempServices,tempEquipment,equip.id);
							if (neededEquipment) addEquipment(tempServices,neededEquipment);
							else success=false;
						});

					// Global modifier should be still available
					if (step.globalModifier&&globalModifier) success=false;

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
					if (shredderMode) {

						// Place a single quest on multiple paths, keeping distances

						const
							done={};
							toVisit=[],
							distance=0;

						rooms.forEach(room=>{
							if (room.isStartingRoom) {
								toVisit.push(room);
								done[room.id]=true;
							} else if (room.isFake) done[room.id]=true;
						})

						do {
							let nextVisit=[];
							toVisit.forEach(room=>{
								room.exits.forEach(exit=>{
									if (!exit.toRoom.isFake&&!done[exit.toRoom.id]) {
										var room={
											room:exit.toRoom,
											freeSpaces:exit.toRoom.getFreeSpaces()
										}
										if (!roomsMeta[distance]) roomsMeta[distance]={
											fitSteps:{},
											step:-1
										};
										// Check which steps fits the room
										stepsMeta.forEach(stepMeta=>{
											if (isRoomFittingStep(room,stepMeta.step)) {
												if (!roomsMeta[distance].fitSteps[stepMeta.id]) roomsMeta[distance].fitSteps[stepMeta.id]=[];
												roomsMeta[distance].fitSteps[stepMeta.id].push(room);
											}
										});
										done[exit.toRoom.id]=true;
										nextVisit.push(exit.toRoom);
									}
								})
							})
							toVisit=nextVisit;
							distance++;
						} while (toVisit.length);

					} else {
						
						// Place a single quest on a single path, keeping distances

						route.forEach((room,id)=>{

							let roomMeta={
								room:room,
								id:id,
								fitSteps:{},
								step:-1
							};

							// Check which steps fits the room
							stepsMeta.forEach(stepMeta=>{
								if (isRoomFittingStep(room,stepMeta.step)) roomMeta.fitSteps[stepMeta.id]=[room];
							});

							roomsMeta.unshift(roomMeta);

						});

					}
					
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
						let
							head=roomsMeta.length-1,
							nearestRoom=1000,
							farthestRoom=-1;
						const result=[];

						for (var j=stepsMeta.length-1;j>=0;j--) {
							let
								stepMeta=stepsMeta[j],
								q,
								requestedPosition=Math.max(Math.min(Math.floor(stepMeta.atPercentage/101*roomsMeta.length),head),stepMeta.room),
								force=(stepMeta.atPercentage==0)||(stepMeta.atPercentage==100);
							for (q=requestedPosition;q>=stepMeta.room;q--)
								if (roomsMeta[q].fitSteps[stepMeta.id]) {
									if (force&&(q!=requestedPosition)) {
										success=false;
										break;
									}
									result[stepMeta.id]=getRandom(roomsMeta[q].fitSteps[stepMeta.id]);
									stepMeta.room=q;
									if (q>farthestRoom) farthestRoom=q;
									if (q<nearestRoom) nearestRoom=q;
									break;
								}
							head=q-1;
							if (!success) break;
						};

						if (success) {

							if (result.length!=steps.length) debugger;
							return {subroute:result,farthestRoom:farthestRoom,nearestRoom:nearestRoom};

						} else return false;
					}

				}

			}

			return false;

		}

	}

	this.addQuest=function(set,excludeQuests,distance) {

		const
			quests=[],
			slices=[],
			routes=this.getRoutes();
		let roll=0;

		set.forEach(quest=>{
			const questVersions=[];
			if (excludeQuests.indexOf(quest)==-1) {
				quest.steps.forEach(steps=>{
					let
						subroutesNearest={},
						subroutesFarthest={},
						allSubroutes=[];
						longestRoute=0,
						shortestRoute=0;
					routes.forEach(route=>{
						const subroute=this.getQuestSubroute(route,quest,steps);
						if (subroute) {
							if (!subroutesNearest[subroute.nearestRoom]) subroutesNearest[subroute.nearestRoom]=[];
							subroutesNearest[subroute.nearestRoom].push(subroute);

							if (!subroutesFarthest[subroute.farthestRoom]) subroutesFarthest[subroute.farthestRoom]=[];
							subroutesFarthest[subroute.farthestRoom].push(subroute);

							allSubroutes.push(subroute);

							if (!longestRoute||(subroute.farthestRoom>longestRoute)) longestRoute=subroute.farthestRoom;
							if (!shortestRoute||(subroute.nearestRoom<shortestRoute)) shortestRoute=subroute.nearestRoom;

						}
					});
					if (quest.debugger) debugger;
					if (allSubroutes.length) {
						var subroute;
						switch (distance||quest.distance) {
							case "nearest":{
								subroute=getRandom(subroutesNearest[shortestRoute]);
								break;
							}
							case "farthest":{
								subroute=getRandom(subroutesFarthest[longestRoute]);
								break;
							}
							default:{
								subroute=getRandom(allSubroutes);
								break;
							}
						}
						questVersions.push({subroute:subroute.subroute,quest:quest,steps:steps});
					}
				})
				if (questVersions.length) {
					let
						version=getRandom(questVersions),
						complexity=version.quest.complexity;
					slices.push(roll);
					roll+=complexity;
					quests.push(version);
				}
			};
		})

		if (quests.length) {
			let
				quest,
				number=random(roll);
			for (let i=0;i<slices.length;i++)
				if (number>=slices[i]) quest=quests[i];
				else break;
			this.applyQuest(quest.subroute,quest.quest,quest.steps);
			return quest.quest;
		} else return false;
	}

	this.evaluateQuestsComplexity=function() {

		// Check quests spawn probability
		for (let k in quests) {
			quests[k].forEach(quest=>{
				if (complexityEnabled) {
					let complexity=1;
					quest.steps[0].forEach(step=>
						complexity+=0.3+
							(step.equipment?0.3:0)+
							(step.isHiddenRoom||step.isDeadEndRoom||step.isOptionalRoom?1:0)
					);
					complexity*=quest.probability?quest.probability/100:1;
					quest.complexity=complexity;
				} else {
					quest.complexity=quest.probability?quest.probability/100:1;
				}
			});
		}

	}

	this.addQuestsMetadata=function() {
		for (let k in quests) {
			quests[k].forEach(quest=>{
				quest.steps.forEach(step=>{
					let
						roomsIndex={
							startingRoom:startingRoom
						},
						referenced={};
					step.forEach(event=>{
						roomsIndex[event.id]=event;
						// Hidden rooms or dead end rooms are always exclusive.
						if (event.isHiddenRoom||event.isDeadEndRoom||event.isOptionalRoom)
							event.isExclusive=true;
						if (event.roomDescriptions)
							event.roomDescriptions.forEach(description=>{
								description.forEach(line=>{
									line.replace(/{markRoom:([^}]*)}/g,(m,id)=>referenced[id]=1);
									// Rooms with conditions and actions on enemies are always exclusive.
									if (
										line.match("{ifNoFoes}")||
										line.match("{ifKilledLastFoe}")||
										line.match("{roomIsEmpty}")
									) event.isExclusive=true;
								});
							});
						if (event.items)
							event.items.forEach(item=>{
								if (item.id=="enemy") event.hasEnemies=true;
							});
					})
					for (let w in referenced) {
						if (roomsIndex[w]) roomsIndex[w].isMarkable=true;
						else console.warn("Missing room reference in",quest,"step",step);
					}
				})
			})
		}
	}

	this.addQuests=function() {

		let
			quest,
			addedQuests=[];

		questsStructure.forEach(entry=>{
			if (!entry.probability||(random(100)<entry.probability)) {
				for (let i=0;i<entry.count;i++) {
						if (entry.debugger) debugger;
						quest=this.addQuest(quests[entry.questType],addedQuests,entry.distance);
						if (quest) addedQuests.push(quest);
						else if (debug&&debug.logMissingQuests) console.log("Can't add requested",entry.questType,"at",entry.distance);
					}
				}
		});

	}

	this.generateDictionaries=function() {
		for (let k in roomLabels.byRoomId)
			roomLabels.rooms.push({id:k,labels:roomLabels.byRoomId[k]});
	}

	function updateRoomLabels(roomid,labels) {
		if (labels)
			labels.forEach(label=>{
				if (roomLabels.index[label]) {
					// Labels are colliding, so they aren't meaningful
					if (roomLabels.index[label]!=-1) {
						let labelsList=roomLabels.byRoomId[roomLabels.index[label]];
						labelsList.splice(labelsList.indexOf(label),1);
						if (labelsList.length==0) delete roomLabels.byRoomId[roomLabels.index[label]];
						roomLabels.index[label]=-1; // Disable the room label
					}
				} else {
					// Register the new label
					roomLabels.index[label]=roomid;
					if (!roomLabels.byRoomId[roomid]) roomLabels.byRoomId[roomid]=[];
					roomLabels.byRoomId[roomid].push(label);
				}
			})
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

		// Run the quest generator
		if (quest.generator) quest.generator(questGeneratorInterface,placeholders);

		// Add items and prepare item labels
		steps.forEach((step,index)=>{
			const room=subroute[index];
			room.room.isBusy=true;
			if (step.items)
				step.items.forEach(item=>{
					const freeSpace=getRandomId(room.freeSpaces),
						pos=room.freeSpaces.splice(freeSpace,1)[0];
					if (item.genericItem) {
						room.room.genericItemId++;
						room.room.addItem(pos.x,pos.y,{id:"genericItem",itemId:room.room.genericItemId,isHidden:item.isHidden});
						placeholders.itemIds[item.genericItem]=room.room.genericItemId;
					} else room.room.addItem(pos.x,pos.y,item);
				});
			if (step.globalModifier)
				globalModifier={
					line:step.globalModifier,
					placeholders:placeholders
				}
			if (step.stealHeroSkill) {
				let skill=removeHeroSkillByTag(step.stealHeroSkill);
				placeholders.stealHeroSkill=skill.text;
			}
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
				if (step.isMarkable) room.isMarkable=true;
				if (step.hasEnemies) room.hasEnemies=true;
				if (step.isExclusive) room.isExclusive=true;
				if (step.shuffleRoomDescriptions) shuffleArray(room.description);
				if (step.equipment) {
					step.equipment.forEach(equip=>{
						let neededEquipment=pickEquipment(services,equipment,equip.id);
						if (neededEquipment) addEquipment(services,neededEquipment,equip.isAvailable,equip.placeholder,globalPlaceholders);
						else console.warn("Can't find quest equipment",step);						
					});
				}
				if (step.isHiddenRoom) room.makeHidden();
				else if (step.isDeadEndRoom) room.makeDeadEnd();
				else if (step.isOptionalRoom) room.makeOptional();
				if (room.isOptionalRoom) clearOptionaRoomsCache();

				updateRoomLabels(room.id,step.labels);
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
				updateRoomLabels(room.id,line.labels);
			});

		// Set adventure metadata
		if (quest.adventureTitle) {
			adventureTitle=getRandom(quest.adventureTitle);
			this.metadata.title.line=adventureTitle;
		}

		// Log quest to metadata
		if (debug&&debug.dumpSelection) this.metadata.selection.push({quest:quest,route:subroute});
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

	// Modifiers

	this.indexModifiers=function() {
		for (let label in modifiers) {
			for (let target in modifiers[label]) {
				let
					modifier=modifiers[label][target],
					descriptionParts=modifier.roomDescription.split("{then}"),
					modId=label+"."+target;
				if (!modifiersByType[modifier.type]) modifiersByType[modifier.type]=[];
				modifiersByType[modifier.type].push(modifier);
				modifiersIds.push(modId);
				modifiersById[modId]={
					full:modifier.roomDescription,
					condition:descriptionParts[0],
					action:descriptionParts[1]
				}
			}
		}
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
				isVirtual:model.isVirtual,
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
					zombie:id==4?1:0
				}
			})
		});
	}

	// Hero

	function hasHeroSkillTag(tag) {
		return !!hero.tagsCount[tag];
	}

	function removeHeroSkillByTag(tag) {
		let skills=[];
		if (hasHeroSkillTag(tag)) {
			hero.skills.forEach((col,colId)=>{
				col.skills.forEach((skill,rowId)=>{
					if (skill.tags&&(skill.tags.indexOf(tag)!=-1)) skills.push({
						col:colId,
						row:rowId,
						text:skill.skill.replace(/\n/g," "),
						skill:skill
					});
				})
			})
			let selected=getRandom(skills);
			if (selected) {
				selected.skill.tags.forEach(tag=>hero.tagsCount[tag]--);
				hero.skills[selected.col].skills[selected.row].skill="";
				hero.skills[selected.col].skills[selected.row].cost="";
				return selected;
			}
		}
	}

	this.generateHero=function() {
		let	dungeonEnemies=0;
		const dungeonXp={
			low:0,
			high:0,
			all:0
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
		if ((dungeonXp.low<MIN_LVL1_XP)&&(dungeonXp.high>MIN_LVL1_XP)) {
			dungeonXp.high-=MIN_LVL1_XP-dungeonXp.low;
			dungeonXp.low=MIN_LVL1_XP;
		}

		const maxHp=dungeonEnemies*heroModel.damageRatio;

		// Prepare growth
		heroModel.skills.forEach((skill,index)=>{
			const levelHp=Math.ceil(heroModel.hpRamp[index]*maxHp);
			let xp=0;
			if (heroModel.xpRamp[index].value!==undefined) xp=heroModel.xpRamp[index].value;
			else xp=dungeonXp[heroModel.xpRamp[index].xpGroup]*heroModel.xpRamp[index].percentage;
			switch (heroModel.xpRamp[index].round) {
				case "floor":{ xp=Math.floor(xp)||1; break; }
				default:{ xp=Math.ceil(xp); }
			}
			hero.skills[index].xp=xp;
			hero.skills[index].hp=levelHp;
			hero.maxHp+=levelHp;
		});

	}

	this.selectHeroModel=function() {

		let models=[];

		heroModels.forEach(model=>{
			if (!model.isBetaTesting) models.push(model);
		});

		heroModel=getRandom(models);

		if (debug&&debug.heroId) {
			heroModels.forEach(model=>{
				if (model.id==debug.heroId) heroModel=model;
			})
		}

		hero={
			maxHp:0,
			model:heroModel,
			goldNotes:{
				line:heroModel.goldNotes,
				placeholders:{}
			},
			tagsCount:{},
			skills:[],
			defense:[]
		};

		// Add equipment
		heroModel.equipment.forEach(equip=>{
			let neededEquipment=pickEquipment(services,equipment,equip.id);
			if (neededEquipment) addEquipment(services,neededEquipment,equip.isAvailable,equip.placeholder,globalPlaceholders);
			else console.warn("Can't find hero equipment",equip);
		});

		// Add skills
		heroModel.skills.forEach((skill,index)=>{			
			skill.forEach((s,row)=>{
				if (s.tags)
					s.tags.forEach(tag=>{
						if (!hero.tagsCount[tag]) hero.tagsCount[tag]=0;
						hero.tagsCount[tag]++;
					})
			});
			hero.defense.push(heroModel.defense[index]);
			hero.skills.push({
				xp:0,
				hp:0,
				skills:skill
			});
		});

		// Prepare class placeholders
		if (heroModel.placeholders)
			for (var k in heroModel.placeholders)
				globalPlaceholders[k]=getRandom(heroModel.placeholders[k]);
	}

	// Global placeholders

	this.prepareGlobalPlaceholders=function() {
		for (const k in placeholderModels)
			globalPlaceholders[k]=getRandom(placeholderModels[k]);
		globalPlaceholders.roomIds={};

		// Update metadata
		this.metadata.header.line=globalPlaceholders.adventureHeader;
	}

	// Quest generator interface

	this.prepareQuestGeneratorInterface=function() {
		questGeneratorInterface={
			shuffleArray:shuffleArray,
			random:random,
			getRandom:getRandom,
			getRandomId:getRandomId,
			globalPlaceholders:globalPlaceholders,
			debug:debug
		}
	}

	// Keywords index

	this.prepareKeywordsIndex=function() {
		keywords.list.forEach(keyword=>keywordsIndex[keyword.id]=keyword);
		keywords.sets.forEach(set=>keywordsSetsIndex[set.id]=set);
	}

	// Metadata

	this.setupMetadata=function() {
		this.metadata={
			seed:originalSeed,
			title:{line:"{blankTitle}"},
			header:{line:"{blankHeader}"},
			selection:[]
		}
	}

	// Placeholders

	this.solvePlaceholders=function() {

		// Solve room descriptions
		rooms.forEach(room=>{
			room.description=room.description.map(descriptionLine=>
				solvePlaceholder(descriptionLine)
			)
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

	// Modifiers

	this.generateModifiers=function() {

		let
			validRooms={},
			validRoomDistances=[],
			modifiersSet=getRandom(modifiersModel);

		rooms.forEach(room=>{
			let valid=false;
			if (!room.isFake&&(room.description.length<MAX_DESCRIPTION)) {
				room.items.forEach(item=>{
					if (item.item.id=="enemy") valid=true;
				});
			}
			if (valid) {
				let score=shortestPath(room).length;
				if (!validRooms[score]) {
					validRoomDistances.push(score);
					validRooms[score]=[]
				}
				validRooms[score].push(room);
			}
		});
		if (globalModifier) {

			for (let k in validRooms)
				validRooms[k].forEach(room=>room.description.unshift(globalModifier));

		} else {

			validRoomDistances.sort();
			modifiersSet.forEach(step=>{
				let
					position=Math.floor(step.atPercentage/100*validRoomDistances.length),
					roomsSet=validRooms[validRoomDistances[position]];
				if (roomsSet) {
					let
						roomId=getRandomId(roomsSet),
						room=roomsSet[roomId];
					if (room) {				
						let modifier=getRandom(modifiersByType[step.modifierType]);
						roomsSet.splice(roomId,1);
						if (debug&&debug.dumpSelection) this.metadata.selection.push({modifier:modifier,room:room});
						room.description.unshift({line:modifier.roomDescription,placeholders:{}});
					}
				}
			})

		}
	}

	// Room models

	this.selectRoomsModel=function() {
		
		let
			model=getRandom(roomsModels),
			room;

		model.forEach(entry=>{
			let times=entry.times||1;

			for (let i=0;i<times;i++) {
				room=this.addRoom(entry.type,0,0,entry.width,entry.height,entry.isCorridor,entry.isStarting);
				if (entry.isStarting) {
					room.addItem(1,1,{id:"stairs"});
					startingRoom=room;
				}
			}
		})

	}

	// Initializer

	this.prepare=function() {
		if (!this.prepared) {
			let debugBackup;

			this.prepared=true;

			if (debug&&debug.dumpSentences)
				debugBackup={
					equipment:clone(equipment)
				};

			// Initialize
			this.prepareQuestGeneratorInterface();
			this.selectRoomsModel();
			this.indexModifiers();
			this.addQuestsMetadata();
			this.evaluateQuestsComplexity();
			this.setupMetadata();
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
			this.generateDictionaries();

			// Generate actors
			this.generateEnemies();
			this.generateHero();

			// Apply modifiers
			this.generateModifiers();

			// Add noise and tidy up
			this.addNoise();
			this.addFakeRooms();
			this.addFlavorTexts();
			this.sortRooms();
			this.sortEquipment();

			// Generate dungeon stats
			this.generateTruthLies();

			// Debug
			if (debug&&debug.dumpSentences) {
				debugBackup.equipment.forEach(equip=>{
					console.warn("[E] "+solvePlaceholder(equip,true,"label")+": "+solvePlaceholder(equip,true,"action"));
				});
				fakeDescriptions.forEach(description=>
					description.forEach(line=>
						console.warn("[Q] "+solvePlaceholder({fakeLine:line}))
					)
				);
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
					case "enemy":{						
						ctx.fillStyle="#f00";
						ctx.fillText("E"+item.level, px+HCELLSIZE, py+HCELLSIZE);						
						break;
					}
					case "genericItem":{						
						if (item.isHidden) ctx.fillStyle="#099";
						else ctx.fillStyle="#0ff";
						ctx.fillText("g"+symbolsMap.items.map[item.itemId], px+HCELLSIZE, py+HCELLSIZE);						
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


			room.entrances.forEach(entrance=>{
				const
					x=room.x+entrance.x,
					y=room.y+entrance.y,
					px=x*CELLSIZE,
					py=y*CELLSIZE;
				ctx.fillStyle="#000";
				ctx.fillText(getCellValue(x,y,room), px+HCELLSIZE, py+HCELLSIZE);						
			})
		});



		div.innerHTML=table+"</table>";

		document.body.style.backgroundColor="#fff";
		document.body.style.color="#000";
		document.body.style.overflow="scroll";
		document.body.appendChild(canvas);
		document.body.appendChild(div);
	}

	this.debugDatabase=function() {
		console.warn("\n\nDebugging data for database\n\n");
		var labels={};
		for (let k in quests) {
			let questSet=quests[k];
			questSet.forEach(quest=>{
				let
					warnMissingLabels=false;
					questLabels={};
				quest.steps.forEach(step=>{
					step.forEach(room=>{
						if (!room.labels) warnMissingLabels=true;
						else room.labels.forEach(label=>questLabels[label]=1)
					});
				});
				if (quest.otherDescriptions)
					quest.otherDescriptions.forEach(step=>{
						if (step.labels) step.labels.forEach(label=>questLabels[label]=1)
					});
				for (let k in questLabels) {
					if (!labels[k]) labels[k]=[];
					labels[k].push(quest);
				}
				if (warnMissingLabels) console.log("Quest",quest.id,"has missing labels");
			});
		}

		for (let k in labels)
			if (labels[k].length>1) {
				console.warn("Duplicate label",k);
				labels[k].forEach(quest=>{
					console.log(" \\_ ",quest.id);
				})
			}

		console.log(roomLabels);
	}

	this.createDownloadPDFAnchor=function(anchor,filename) {
		this.createSVG(svg=>{
			svg.assignPDFDownloadToAnchor(anchor,filename);
		})
	}

	this.downloadPDF=function(filename) {
		this.createSVG(svg=>{
			svg.downloadPDF(filename);
		})
	}

	this.downloadSVG=function(filename) {
		this.createSVG(svg=>{
			svg.downloadSVG(filename);
		})
	}

	this.showSVG=function() {
		this.createSVG(svg=>{
			let svgText=svg.getSVG();

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

			const template=new SVGTemplate(root+"svg/model.svg",true);
			template.load(()=>{
				svg=new SVG(template);

				if (debug&&debug.svgPatcher) svg.setPatcher(debug.svgPatcher);

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
							if (room.isOptionalRoom)
								svg.cloneNodeBy("startingRoom",0,room.x*cellWidth+0.5,room.y*cellHeight+0.5,cellWidth*room.width-1,cellHeight*room.height-1);
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

							if (!item.isHidden) {
								switch (item.id) {
									case "enemy":{
										const enemy=svg.cloneNodeBy("gridEnemy",0,px,py);
										setCheckBox(svg,svg.getById("gridEnemyLevel",enemy),item.level);
										break;
									}
									case "genericItem":{
										const genericItem=svg.cloneNodeBy("gridItem",0,px,py);							
										svg.setText(svg.getById("gridItemId",genericItem),symbolsMap.items.map[item.itemId]);
										break;
									}
									case "stairs":{
										svg.cloneNodeBy("gridStairs","map-stairs",px,py);
										break;
									}
								}
							}
					});

					// Render room entrances
					let renderedEntrances={};
					room.entrances.forEach(entrance=>{
						const
							x=entrance.x+room.x,
							y=entrance.y+room.y,
							px=x*cellWidth,
							py=y*cellHeight,
							id=x+","+y;

						if (!renderedEntrances[id]) {
							renderedEntrances[id]=1;
							if (debug&&debug.drawRoomNumbers)
								svg.setText(svg.cloneNodeBy("gridNumber",0,px,py),room.id);
							else
								svg.setText(svg.cloneNodeBy("gridNumber",0,px,py),getCellValue(x,y,room));

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
					if (debug&&debug.showRoomAttributes) {
						let label=svg.getById("roomId",roomData);
						svg.delete(svg.getById("roomCheckbox",roomData));
						svg.moveNodeAt(svg.getById("roomId",roomData),svg.getNum(label,"x")-2,svg.getNum(label,"y"));
						svg.setText(label,(room.isMarkable?"x":"")+(room.isExclusive?"E":"")+(room.hasEnemies?"!":"")+room.id);
					} else
						svg.setText(svg.getById("roomId",roomData),room.id);

					if (room.description[0]) {
						let svgLine=svg.getById("roomLine1",roomData);
						lineParts=room.description[0].split("^*v");
						svg.setText(svgLine,lineParts[0]||"");
						svg.setClassName(svgLine,"room-"+index+"-0-l");
						if (lineParts[1]) {
							let svgUpsiddownLine=svg.cloneNodeBy("roomLine1UpsideDown",0,0,-boxY);
							svg.setText(svgUpsiddownLine,lineParts[1]);
							svg.setClassName(svgUpsiddownLine,"room-"+index+"-0-r");
						}
					} else svg.delete(svg.getById("roomLine1",roomData));

					if (room.description[1]) {
						let svgLine=svg.getById("roomLine2",roomData);
						lineParts=room.description[1].split("^*v");
						svg.setText(svgLine,lineParts[0]||"");
						svg.setClassName(svgLine,"room-"+index+"-1-l");
						if (lineParts[1]) {
							let svgUpsiddownLine=svg.cloneNodeBy("roomLine2UpsideDown",0,0,-boxY);
							svg.setText(svgUpsiddownLine,lineParts[1]);
							svg.setClassName(svgUpsiddownLine,"room-"+index+"-1-r");
						}
					} else svg.delete(svg.getById("roomLine2",roomData));

				});

				// Render hero
				let tierWidth=svg.getNum(svg.getById("heroBox"),"width");
				hero.skills.forEach((tier,index)=>{
					const skillTier=svg.cloneNodeBy("heroTier",0,tierWidth*index,0);
					svg.setText(svg.getById("heroSkillUp",skillTier),(tier.skills[0].cost?"("+tier.skills[0].cost+")\n":"")+tier.skills[0].skill||"");
					svg.setText(svg.getById("heroSkillDown",skillTier),(tier.skills[1].cost?"("+tier.skills[1].cost+")\n":"")+tier.skills[1].skill||"");
					svg.setText(svg.getById("heroDefense",skillTier),hero.defense[index]?"+"+hero.defense[index]+" DEF":"-");
					setCheckBox(svg,svg.getById("heroXp",skillTier),tier.xp);
					setCheckBox(svg,svg.getById("heroHp",skillTier),tier.hp);
				});
				svg.setText(svg.getById("goldNotes"),solvePlaceholder(hero.goldNotes));

				// Render enemies
				tierWidth=svg.getNum(svg.getById("enemyBox"),"width");
				enemies.forEach((enemy,index)=>{
					if (!enemy.isVirtual) {
						const skillTier=svg.cloneNodeBy("enemyTier",0,tierWidth*index,0);
						if (index==0) svg.delete(svg.getById("enemySymbol",skillTier));
						else svg.delete(svg.getById("enemyOutline",skillTier));
						svg.setText(svg.getById("enemySkillUp",skillTier),enemy.skills[0]||"");
						svg.setText(svg.getById("enemySkillDown",skillTier),enemy.skills[1]||"");
						svg.setText(svg.getById("enemyXp",skillTier),"+"+enemy.gainXp+" XP");
						svg.setText(svg.getById("enemyDefense",skillTier),enemy.defense?"+"+enemy.defense+" DEF":"-");
						setCheckBox(svg,svg.getById("enemyLevel",skillTier),enemy.level);
					}
				});

				// Render noise
				if (!debug||!debug.skipNoise)
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
								svg.setText(svg.getById("gridItemId",genericItem),symbolsMap.items.map[item.itemId]);
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
						label=solvePlaceholder(service.equipment,service.isFake,"label"),
						description=solvePlaceholder(service.equipment,service.isFake,"action");
					svg.setText(svg.getById("serviceName",line),(service.isFake&&debug&&debug.showFake?"[FAKE] ":"")+label+" ("+description+")");
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