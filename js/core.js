/* globals DungeonGenerator loadQuestsSub loadRandomizers loadEnemyModels loadFlavorTexts loadHeroModels loadPlaceholders loadQuestsBonus loadQuestsMalus loadQuestsEasyFillers loadQuestsMediumFillers loadQuestsHardFillers loadQuestsMain */
/* exported Core */

const Core=function(settings) {
	if (!settings) settings={};
	if (!settings.root) settings.root="";

	const
		DATABASES=[
			"database/enemymodels.js",
			"database/randomizers.js",
			"database/flavortexts.js",
			"database/heromodels.js",
			"database/placeholders.js",
			"database/quests-bonusmalus.js",
			"database/quests-fillers.js",
			"database/quests-main.js",
			"database/quests-sub.js",
			"database/quests-story.js",
			"database/quests-helpers.js",
			"database/truthMap.js",
			"database/equipment.js",
			"database/keywords.js",
			"database/modifiers.js",
		],
		PADSEED=10,
		METADATA={
			version:"1.0",
			filePrefix:"stampadia",
			projectName:"Chronicles of Stampadia",
			year:"2021",
			by:"KesieV",
			homepage:"kesiev.com/stampadia",
			sourcesPage:"github.com/kesiev/stampadia"
		},
		PRINTFOOTER='{projectName} v{version} - Page #{seed} - (c) {rangeYear} by KesieV - Manual &amp; more adventures at {homepage} - Sources at {sourcesPage}',
		WEBFOOTER='Best on Firefox/Chrome &dash; <a class=mark href="index.html">{projectName}</a> v{version} &dash; &copy; {rangeYear} by KesieV &dash; Sources at <a class=mark href="https://{sourcesPage}">{sourcesPage}</a>';

	// Databases
	let
		QUESTS_SUB,
		QUESTS_VERYHARDSUB,
		RANDOMIZERS,
		ENEMYMODELS,
		FLAVORTEXTS,
		HEROMODELS,
		PLACEHOLDERS,
		QUESTS_BONUS,
		QUESTS_MALUS,
		QUESTS_EASYFILLERS,
		QUESTS_MEDIUMFILLERS,
		QUESTS_HARDFILLERS,
		QUESTS_MAIN,
		QUESTS_STORY,
		QUESTS_HELPERS,
		QUESTS_ANOMALIES,
		QUESTS_SCROLLS,
		MODIFIERS,
		KEYWORDS,
		TRUTHMAP,
		EQUIPMENT,
		initialize;

	function fillPlaceholders(model,seed) {
		const year=new Date().getFullYear();
		let strSeed=seed+"";

		while (strSeed.length<PADSEED) strSeed="0"+strSeed;

		for (const k in METADATA)
			model=model.replaceAll("{"+k+"}",METADATA[k]);
		model=model.replaceAll("{seed}",strSeed);
		if (year==METADATA.year)
			model=model.replaceAll("{rangeYear}",year);
		else
			model=model.replaceAll("{rangeYear}",METADATA.year+"-"+year);

		return model;
	}

	this.initialize=function(cb,pos,ts) {
		if (pos===undefined) {
			if (!initialize) {
				initialize=true;				
				this.initialize(cb,0,Date.now());
			}
		} else {
			if (DATABASES[pos]) {
				const tag = document.createElement('script');
				tag.setAttribute("src",settings.root+DATABASES[pos]+"?"+ts);
				tag.setAttribute("async", "false");
				tag.onload =(_e)=>this.initialize(cb,pos+1,ts);
				document.head.firstElementChild.appendChild(tag);
			} else {
				// Load databases
				MODIFIERS=loadModifiers();
				FLAVORTEXTS=loadFlavorTexts();
				HEROMODELS=loadHeroModels();
				RANDOMIZERS=loadRandomizers();
				ENEMYMODELS=loadEnemyModels();
				PLACEHOLDERS=loadPlaceholders();
				TRUTHMAP=loadTruthMap();
				EQUIPMENT=loadEquipment();
				KEYWORDS=loadKeywords();

				QUESTS_SUB=loadQuestsSub();
				QUESTS_BONUS=loadQuestsBonus();
				QUESTS_MALUS=loadQuestsMalus();
				QUESTS_EASYFILLERS=loadQuestsEasyFillers();
				QUESTS_MEDIUMFILLERS=loadQuestsMediumFillers();
				QUESTS_HARDFILLERS=loadQuestsHardFillers();
				QUESTS_VERYHARDSUB=loadQuestsVeryHardSub();
				QUESTS_MAIN=loadQuestsMain();
				QUESTS_STORY=loadQuestsStory();
				QUESTS_HELPERS=loadQuestsHelpers();
				QUESTS_ANOMALIES=loadQuestsAnomalies();
				QUESTS_SCROLLS=loadQuestsScrolls();
				cb();
			}
		}
	}

	this.getWebFooter=function() {
		return fillPlaceholders(WEBFOOTER,0);
	}

	this.generateAdventureDaily=function(daysdelta,debug) {
		daysdelta=daysdelta||0;
		const
			date=new Date(),
			seed=Math.floor((date.getTime()-(date.getTimezoneOffset()*60000))/86400000)+daysdelta,
			generator=this.generateAdventureById(seed,debug);

		generator.coreMetadata={
			filename:METADATA.filePrefix+"-"+date.getFullYear()+"_"+(date.getMonth() + 1)+"_"+date.getDate()
		}

		return generator;
	}

	this.generateAdventureById=function(seed,debug) {

		const maxSeed=Math.pow(10,PADSEED);

		seed=seed||Math.floor(Math.random()*maxSeed);

		// Prepare footer
		let footer=fillPlaceholders(PRINTFOOTER+(debug&&debug.footer?" ["+debug.footer+"]":""),seed);

		// Set dungeon size
		const dunggen=new DungeonGenerator(settings.root,20,20,seed,debug);

		dunggen.setSymbolsMap(debug&&debug.symbolsMap?debug.symbolsMap:{
			items:{
				mark:"x",
				map:[0,1,2,3,4,5,6,7,8,9],
				roomsTable:["[0]","[1]","[2]","[3]","[4]","[5]","[6]","[7]","[8]","[9]"]
			},
			rooms:{
				label:"room ",
				symbol:"",
				markRoom:"x",
				notMarkRoom:"not x",
				unspacedLabel:"room"
			},
			equipment:{
				pay:"pay ",
				lose:"lose ",
				get:"get "
			},
			actions:{
				then:" &raquo; ",
				and:" &amp; ",
				newRule:" | ",
				or:" or ",
				move:"move",
				pay:"pay "
			}
		});

		dunggen.setRoomsModels([
			[
				// [CODEX-Generator] Roomset - The Stampadian: A set of multiple sized rooms.
				{ times:1, type:"startingRoom", width:3, height: 3, isStarting:true },
				{ times:4, type:"largeRooms", width:4, height: 4 },
				{ times:4, type:"midRooms", width:3, height: 5 },
				{ times:4, type:"midRooms", width:5, height: 3 },
				{ times:3, type:"corridors", width:[2,3,4], height: 1, isCorridor:true },
				{ times:3, type:"corridors", width:1, height: [2,3,4], isCorridor:true },
			],
			[
				// [CODEX-Generator] Roomset - The Towers: A set of small squared rooms and corridors.
				{ times:1, type:"startingRoom", width:3, height: 3, isStarting:true },
				{ times:2, type:"largeRooms", width:4, height: 4 },
				{ times:10, type:"midRooms", width:3, height: 3 },
				{ times:3, type:"corridors", width:[2,3,4], height: 1, isCorridor:true },
				{ times:3, type:"corridors", width:1, height: [2,3,4], isCorridor:true },
			],
			[
				// [CODEX-Generator] Roomset - The Sewers: A set of small rectangular rooms with 2 huge halls.
				{ times:1, type:"startingRoom", width:3, height: 3, isStarting:true },
				{ times:1, type:"largeRooms", width:5, height: 4 },
				{ times:1, type:"largeRooms", width:4, height: 5 },
				{ times:5, type:"midRooms", width:2, height: 3 },
				{ times:5, type:"midRooms", width:3, height: 2 },
				{ times:3, type:"corridors", width:[2,3,4], height: 1, isCorridor:true },
				{ times:3, type:"corridors", width:1, height: [2,3,4], isCorridor:true },
			],
			[
				// [CODEX-Generator] Roomset - The Sewers: A set of small rectangular rooms with 2 huge halls.
				{ times:1, type:"startingRoom", width:3, height: 3, isStarting:true },
				{ times:1, type:"largeRooms", width:6, height: 6 },
				{ times:6, type:"midRooms", width:4, height: 2 },
				{ times:7, type:"midRooms", width:2, height: 4 },
				{ times:2, type:"corridors", width:[2,3,4], height: 1, isCorridor:true },
				{ times:2, type:"corridors", width:1, height: [2,3,4], isCorridor:true },
			]
		]);

		// Set room priorities
		dunggen.setRoomPriorities([
			{
				// [CODEX-Generator] Layout - The Classic: Fully randomized dungeons.
				startingRoom:100,
				largeRooms:100,
				midRooms:100,
				corridors:100,
			},{
				// [CODEX-Generator] Layout - The Maze: Starting room inside, then corridors and large and mid rooms on the outside.
				startingRoom:50,
				largeRooms:150,
				midRooms:150,
				corridors:100,
			},{
				// [CODEX-Generator] Layout - The Halls: Starting room inside, then large and mid rooms, and corridors on the outside.
				startingRoom:50,
				largeRooms:100,
				midRooms:100,
				corridors:150,
			},{
				// [CODEX-Generator] Layout - The Crossing: Corridors inside, then the starting room, and large and mid rooms on the outside.
				startingRoom:100,
				largeRooms:150,
				midRooms:150,
				corridors:50,
			},
			{
				// [CODEX-Generator] Layout - The Hill: Large and mid rooms inside, then the corridors, and the starting room outside.
				startingRoom:150,
				largeRooms:50,
				midRooms:50,
				corridors:100,
			},
			{
				// [CODEX-Generator] Layout - The City: Large rooms inside, then the corridors, then mid rooms, and the starting room outside.
				startingRoom:200,
				largeRooms:50,
				midRooms:150,
				corridors:100,
			}
		]);

		// Set mix mode
		if (debug&&(debug.setMixMode!=undefined)) dunggen.setMixMode(debug.setMixMode);
		else dunggen.setMixMode(false);

		// Set rooms base ID
		dunggen.setRoomIds(30);
		
		// Set starting equimpent
		dunggen.setGold(50);

		// Set databases
		dunggen.setQuestsStructure([

			// Basic elements
			{questType:"main",count:1,distance:"farthest"},
			{questType:"helpers",count:1,distance:"nearest"},
			{questType:"veryHardSub",count:1,distance:"farthest"},
			
			{questType:"sub",count:1,distance:"farthest"},
			{questType:"story",count:1,distance:"farthest"},

			// Anomaly
			{questType:"anomaly",count:1, probability:40},

			// Initial area
			{questType:"easyFiller",count:2,distance:"nearest"},

			// Hardest area
			{questType:"hardFiller",count:1,distance:"farthest"},

			// Bonus & Malus
			{questType:"bonus",count:1,distance:"farthest"},
			{questType:"malus",count:1,distance:"farthest"},

			// Medium area
			{questType:"mediumFiller",count:1,distance:"farthest"},
			{questType:"sub",count:1,distance:"farthest"},
			{questType:"bonus",count:1,distance:"farthest"},
			{questType:"malus",count:1,distance:"farthest"},

			// Filling
			{questType:"sub",count:1,distance:"farthest"},
			{questType:"mediumFiller",count:1,distance:"random"},

			// Scroll
			{questType:"scrolls",count:1,distance:"random"},

		]);
		dunggen.setModifiers(MODIFIERS);
		dunggen.setModifiersModel([
			[
				// Harder at the beginning, easier at the end
				{ atPercentage:25, modifierType:"bad"},
				{ atPercentage:75, modifierType:"good"},
			],
			[
				// Balanced in the middle
				{ atPercentage:50, modifierType:"balanced"}
			],
			[
				// Balanced at the beginning
				{ atPercentage:25, modifierType:"balanced"}
			],
			[
				// Balanced at the end
				{ atPercentage:75, modifierType:"balanced"}
			],
			[
				// Easier in the middle
				{ atPercentage:50, modifierType:"good"}
			],
			[
				// Harder in the middle
				{ atPercentage:50, modifierType:"bad"}
			],
			[
				// Balanced in the middle, easier at end
				{ atPercentage:50, modifierType:"balanced"},
				{ atPercentage:75, modifierType:"good"},
			],
			[
				// Harder in the middle, easier at end
				{ atPercentage:50, modifierType:"bad"},
				{ atPercentage:75, modifierType:"good"},
			]
		]);
		dunggen.setShredderMode(true);
		dunggen.setComplexityEvaluation(true);
		dunggen.setPlaceholderModels(PLACEHOLDERS);
		dunggen.setRandomizers(RANDOMIZERS);
		dunggen.setHeroModels(HEROMODELS);
		dunggen.setEnemyModels(ENEMYMODELS);
		dunggen.setFlavorTexts(FLAVORTEXTS)
		dunggen.setTruthMap(TRUTHMAP);
		dunggen.setEquipment(EQUIPMENT);
		dunggen.setKeywords(KEYWORDS);
		dunggen.setQuests(
			{
				main:QUESTS_MAIN,
				sub:QUESTS_SUB,
				bonus:QUESTS_BONUS,
				malus:QUESTS_MALUS,
				easyFiller:QUESTS_EASYFILLERS,
				mediumFiller:QUESTS_MEDIUMFILLERS,
				hardFiller:QUESTS_HARDFILLERS,
				veryHardSub:QUESTS_VERYHARDSUB,
				story:QUESTS_STORY,
				helpers:QUESTS_HELPERS,
				anomaly:QUESTS_ANOMALIES,
				scrolls:QUESTS_SCROLLS,
			}
		);

		// Set print configuration
		dunggen.setFooter(footer);
		dunggen.setMapGuidesEvery(5);

		return dunggen;
	}

}
