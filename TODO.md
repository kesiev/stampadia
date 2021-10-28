# Chronicles of Stampadia

A daily print-and-play roguelike adventure you can play offline.

### Bugs

- [ ] on `play.html` tokens are not placed in the right position when the page is opened and the sheet is not fully visible

### Ideas - Misc

- [ ] i18n
  - Challenge: Descriptions must be still oneliners and fit the _Rooms Table_
  - Challenge: New contents must be always translated in order to generate the same adventure sheet every day
  - Suggestion: Prototype a version with a translated `database` folder and then think about a slim i18n system

### Ideas - Print

**Suggestion:** Export the an adventure sheet using `tools/debug.html` and prototype alternate sheets on Inkscape

- [ ] Larger text in _Rooms Table_
  - Challenge: How we can make the _Rooms Table_ larger?
  - Challenge: How we can make the _Rooms Table_ taller?  

- [ ] Larger _Hero Sheet_ and _Enemy Sheet_ boxes, in order to fit a dice more nicely
  - **Not a problem with 12mm dice**
  - Challenge: How we can make the sheets larger?
  - Challenge: How we can make the sheets taller?

- [ ] New layout
  - Checkboxes on the top
  - Split lines in the room description with IDs
  - Link cell IDs in room cells/room IDs may link to a specific line, that chain the other lines.

### Ideas - Gameplay

- [ ] Quests
  - [ ] Sub - ??? - More luck/unluck uses
  - [ ] Sub - The Messenger - bring messages between adventures using keywords

- [ ] Enemies with special rules
  - [ ] New monstr/trap idea: mimic, can use player moves

- [ ] Gameplay
  - [ ] Diagonal movement?

- [ ] Rooms Table
  - [ ] Asterisk for more hidden rows

- [ ] Rooms & Dungeon generator
  - [ ] Black squares like crosswords
    - [ ] Runes that can be broken by events/items
  - [ ] Include a square in a room/Join another room when solving a puzzle
    - [ ] Allows arenas with multiple enemies to beat in sequence
  - [ ] Preset rooms

- [ ] Variants
  - [ ] Roleplay variant: play aggressive or defensive depending on the enemy description
    - [ ] Some room descriptions give pointers to mobs behavior; maybe add a code for each room describing combat strategy for mobs: berserk, cautious, daring, defensive ...
  - [ ] Arcade variant: damage = atk - defense

- [ ] Skills & Items
  - [ ] Hero/Enemy - Damage reflection

- [ ] New classes
  - [ ] Rogue: Get gold by fights/lock dice
    - [ ] Hero - Dice roll skill: the hero locks a die for other enemies
  - [ ] Elf/Paladin: a better healing ability. Maybe a Paladin is better fitting instead of an elf here.
  - [ ] Druid: class item (haste spell/potion) to get a third roll once (and use 2 moves from player list and one from monster)
  - [ ] Rookie: most of the skills are copied to empty Hero Sheet cells from enemies

- [ ] NPC
  - [ ] The Corrupted

### Ideas - Gameplay (questions)

- [ ] New actions
  - [ ] Resting: when not in combat, 5G to get 1HP
    - Aren't The Helpers enough?

- [ ] New helpers
  - [ ] "Easy mode" item purchase.
    - Is that truly needed?

- [ ] Mechanics
  - [ ] Excess XP/HP to gold
    - Is this a way to buy too much time?

- [ ] Enemy abilities
  - [ ] PUSH: pushes the hero away, for ranged enemies
    - It takes an enemy slot.

- [ ] Rooms & Dungeon generator
  - [ ] A room with missing [1] that's drawn by the player (and maybe be there)
    - [ ] Quests can create the same effect with checkboxes conditions - that may be never checked
    - [ ] *Implemented but unused*
      - [ ] As {drawItemAt:itemId,roomId} (i.e. {drawItem:1,destinationRoom}). Add a {genericItem:"xxx", isHidden:true} to the destination room to reserve an empty cell.
      - [ ] Unused definition for the manual: draw [1] in room 35: Discover room 35 and draw a 1 on any of its empty cells. It will act as a grayed numbered cell.

### Ideas - Misc (questions)

- [ ] Publishing
  - [ ] Send the daily dungeon via mail
    - Adventure sheets are generated with no server ATM

### In progress

- [ ] New classes
  - [ ] new class: ranger
    - [ ] can use monster moves
    - [ ] Powerful skills with exact range like "RNG =2". Explain on manual.

### Done

- [x] Dungeon generation
  - [x] Shredder mode - Quests are no longer distributed on a single path *(previous version available via setShredderMode)*
  - [x] A way to truly create enemies/rooms with modifiers
  - [x] More dungeons layouts

- [x] Mechanics
  - [x] Remove the "don't visit new rooms in fight" rule? (Thank you, PeterPiers!)
  - [x] Rich terrain: areas with enemies that have special effects (fire scares the enemies: every turn -1 on one player chosen die, mud: movement -1 in this room...)

- [x] Skills & items
  - [x] Reveal a room position the player can choose
  - [x] Invisibility potion: enemy rolls < 6 are discarded for the 3 next rolls
  - [x] Fireball item that damages all enemies in the room.
  - [x] Debuff skills to subtract defense to an enemy for 1 round: with 1 round, you can go for die-2/die-3 debuffs; the idea is if you spend a 6 on it you can possibly land 2 hits on next round even with a secondary ATK-3 for example. May be applied to all enemies.
  - [x] Item - Grenade: ATK by the number of cells of the current room

- [x] New class
  - [x] Tank/Dwarf
      - Instead of having a Move action in the first column, make it DEF -2. In other words, instead of running away to get away from attacks, the character just takes the attacks, but defends against them.
      - lower movement

- [x] Equipment
  - [x] Flip - Complementary dice values (upside down dice)
  - [x] Turn - Use dice in reverse order (lower-higher)

- [x] New quests
  - [x] General  
    - [x] Room modifiers can be enabled by items/characters/events
  - [x] Helpers
    - [x] The game could spawn some kind of "help kiosk" near the entrance.
      - [x] gold/XP to health converter. Conversion ratio may vary.
      - [x] should for wizard, could for warrior/dwarf?
  - [x] Very hard rooms
    - [x] The Risky Sip - 1/6 probability to gain health full, 1/6 probability to die
    - [x] The Swarm - A lot of LVL0 enemies!
  - [x] Main Quests
    - [x] Final form - Mini boss, then forced bigger boss
    - [x] Moral choices - Become the next ruler
    - [x] Main - The Curse: debuff on boss until you get an item / buff on boss when you get an item
  - [x] Good/bad quests
    - [x] The Wildness: do something to get a buff on all encounters
    - [x] Sub - The Trader - Exchange xp/hp *(Added a darker version of the shopper)*
    - [x] Sub - The Armory - Choose between two items
  - [x] Sub Quests
    - [x] The Tapeworm
      - [x] digesting track: corridor "organic walls are trying to squeeze you, -1HP" until you kill lvl3/4 mob in adjacent room (not adjacent, weaker enemy, loot added)
    - [x] The Witch - Help me, or else...
    - [x] The Mirror - teleport back to a room
    - [x] Escort mission
    - [x] Challenge - Items with a challenge
    - [x] The Time Bomb - Reach the room in time
    - [x] The Barman
    - [x] One Last Fight - The enemy spawn only on your way back  
    - [x] room with mob -> room with necromancy lab "I ain't dead" -> respawn mob (maybe in two rooms)
      - [x] Implemented in 2-phases boss main quest
    - [x] Teleports enabled only on conditions
    - [x] Sub - The Traitor: reveal where the boss room is on death
    - [x] Sub - The Landslide - Optional rooms can be "closed" due to player decisions (falling bridges, closed caves, etc.)

- [x] Classes balances
  - [x] Lower damageRatio for all classes
    - [x] Maybe moving 1 HP from LVL1 to LVL2?

- [x] Quests improvements
  - [x] Pair/odd in Sphinx
  - [x] Quest ID in Sphinx (pair/odd)
  - [x] More smaller quests

- [x] Bugs/Code
  - [x] Simplify the condition in `generator.js`
  - [x] There is 1 extra xp box in the tutorial pdf!
