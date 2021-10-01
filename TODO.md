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

**Suggestion:** Export the an adventure sheet using `debug.html` and prototype alternate sheets on Inkscape

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

- [ ] Asterisk for more hidden rows
- [ ] FAQ
  - [ ] How to manage pairs
- [ ] Rooms & Dungeon generator
  - [ ] Include a square in a room/Join another room when solving a puzzle
  - [ ] Preset rooms
  - [ ] Arena with multiple enemies
  - [ ] A room with missing [1] that's drawn by the player (and maybe be there)
- [ ] New helpers
  - [ ] "Easy mode" item purchase.
- [ ] Mechanics
  - [ ] Excess XP/HP to gold
    - Is this a way to buy too much time?
- [ ] Enemy abilities
  - [ ] PUSH: pushes the hero away, for ranged enemies
    - It takes an enemy slot.
- [ ] Variants 
  - [ ] Roleplay variant: play aggressive or defensive depending on the enemy description
  - [ ] Some room descriptions give pointers to mobs behavior; maybe add a code for each room descripbing combat strategy for mobs: berserk, cautious, daring, defensive ...
  - [ ] Arcade variant: damage = atk - defense
- [ ] Skills & Items
  - [ ] Powerful skills with exact range like "RNG =2". Explain on manual.
  - [ ] Debuff skills to subtract defense to an enemy for 1 round: with 1 round, you can go for die-2/die-3 debuffs; the idea is if you spend a 6 on it you can possibly land 2 hits on next round even with a secondary ATK-3 for example. May be applied to all enemies.
  - [ ] Fireball item that damages all enemies in the room.
  - [ ] Dice roll skill: the hero locks a dice for other enemies
- [ ] New classes
  - [ ] Rogue: Get gold by fights
  - [ ] Elf/Paladin: a better healing ability. Maybe a Paladin is better fitting instead of an elf here.
- [ ] New quests
  - [ ] Exchange xp/hp
  - [ ] Use luck/unluck more
  - [ ] The messenger - bring messages between adventures using keywords
- [ ] NPC
  - [ ] The Corrupted

### In progress

### Done

- [x] Rooms & Dungeon generator
  - [x] Teleports enabled only on conditions
- [x] New class
  - [x] Tank/Dwarf
    - Instead of having a Move action in the first column, make it DEF -2. In other words, instead of running away to get away from attacks, the character just takes the attacks, but defends against them.
    - lower movement
- [x] Very hard rooms
  - [x] The Risky Sip - 1/6 probability to gain health full, 1/6 probability to die
  - [x] The Swarm - A lot of LVL0 enemies!
- [x] The game could spawn some kind of "help kiosk" near the entrance.
  - [x] gold/XP to health converter. Conversion ratio may vary.
  - [x] should for wizard, could for warrior/dwarf?
- [x] Bugs
  - [x] There is 1 extra xp box in the tutorial pdf!
- [x] Simplify the condition in `generator.js`
- [x] Equipment
  - [x] Flip - Complementary dice values (upside down dice)
  - [x] Turn - Use dice in reverse order (lower-higher)
- [x] New quests
  - [x] The Witch - Help me, or else...
  - [x] The Mirror - teleport back to a room
  - [x] Final form - Mini boss, then forced bigger boss
  - [x] Moral choices - Become the next ruler
  - [x] Escort mission
  - [x] Challenge - Items with a challenge
  - [x] The Time Bomb - Reach the room in time
  - [x] The Barman
  - [x] One Last Fight - The enemy spawn only on your way back  
- [x] Improve quests
  - [x] Pair/odd in Sphinx
  - [x] Quest ID in Sphinx (pair/odd)
  - [x] More smaller quests
