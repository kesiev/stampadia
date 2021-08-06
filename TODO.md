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

- [ ] Larger text in _Rooms Table_
  - Challenge: How we can make the _Rooms Table_ larger?
  - Challenge: How we can make the _Rooms Table_ taller?
- [ ] Larger _Hero Sheet_ and _Enemy Sheet_ boxes, in order to fit a dice more nicely
  - Challenge: How we can make the sheets larger?
  - Challenge: How we can make the sheets taller?
  - Suggestion: Export the an adventure sheet using `debug.html` and prototype alternate sheets on Inkscape

### Ideas - Gameplay

- [ ] New classes
  - [ ] Wizard - Fewer hit points, but start with a ranged attack (ATK -2, RNG 3).
  - [ ] Tank/Dwarf - Instead of having a Move action in the first column, make it DEF -2. In other words, instead of running away to get away from attacks, the character just takes the attacks, but defends against them.
- [ ] New quests
  - [ ] The Witch - Help me, or else...
- [ ] Improve quests
  - [ ] Pair/odd in Sphinx
  - [ ] Quest ID in Sphinx (pair/odd)
  - [ ] More smaller quests

### In progress

- [ ] _N/A_

### Done

- [x] Simplify the condition in `generator.js`
- [x] New quests
  - [x] The Time Bomb - Reach the room in time
  - [x] The Barman
  - [x] One Last Fight - The enemy spawn only on your way back  