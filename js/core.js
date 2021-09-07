/* globals DungeonGenerator loadQuestsSub loadRandomizers loadEnemyModels loadFlavorTexts loadHeroModels loadPlaceholders loadQuestsBonus loadQuestsMalus loadQuestsEasyFillers loadQuestsMediumFillers loadQuestsHardFillers loadQuestsMain */
/* exported Core */

const Core=function() {

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
			"database/truthMap.js",
			"database/equipment.js",
			"database/keywords.js",
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
				tag.setAttribute("src",DATABASES[pos]+"?"+ts);
				tag.setAttribute("async", "false");
				tag.onload =(_e)=>this.initialize(cb,pos+1,ts);
				document.head.firstElementChild.appendChild(tag);
			} else {
				// Load databases
				QUESTS_SUB=loadQuestsSub();
				RANDOMIZERS=loadRandomizers();
				ENEMYMODELS=loadEnemyModels();
				FLAVORTEXTS=loadFlavorTexts();
				HEROMODELS=loadHeroModels();
				PLACEHOLDERS=loadPlaceholders();
				QUESTS_BONUS=loadQuestsBonus();
				QUESTS_MALUS=loadQuestsMalus();
				QUESTS_EASYFILLERS=loadQuestsEasyFillers();
				QUESTS_MEDIUMFILLERS=loadQuestsMediumFillers();
				QUESTS_HARDFILLERS=loadQuestsHardFillers();
				QUESTS_MAIN=loadQuestsMain();
				QUESTS_STORY=loadQuestsStory();
				TRUTHMAP=loadTruthMap();
				EQUIPMENT=loadEquipment();
				KEYWORDS=loadKeywords();
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
		const dunggen=new DungeonGenerator(20,20,seed,debug);

		// Set rooms

		// 1 room
		const room=dunggen.addRoom(0,0,3,3,false,true);
		room.addItem(1,1,{id:"stairs"});
		for (let i=0;i<4;i++) { // 12 rooms
			dunggen.addRoom(0,0,4,4); // 4 empty
			dunggen.addRoom(0,0,3,5); // 3 empty
			dunggen.addRoom(0,0,5,3); // 3 empty
		}
		for (let i=0;i<3;i++) { // 6 random corridors
			dunggen.addRoom(0,0,[2,3,4],1,true);
			dunggen.addRoom(0,0,1,[2,3,4],true);
		}

		// Set rooms base ID
		dunggen.setRoomIds(30);
		
		// Set starting equimpent
		dunggen.setGold(50);

		// Set databases
		dunggen.setQuestsStructure([

			// Basic elements
			{questType:"main",count:1,distance:"farthest"},
			{questType:"sub",count:1,distance:"farthest"},
			{questType:"story",count:1,distance:"farthest"},

			// Initial area
			{questType:"easyFiller",count:2,distance:"nearest"},

			// Hardest area
			{questType:"hardFiller",count:1,distance:"farthest"},
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

		]);
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
				story:QUESTS_STORY
			}
		);

		// Set print configuration
		dunggen.setFooter(footer);
		dunggen.setMapGuidesEvery(5);

		return dunggen;
	}

}
