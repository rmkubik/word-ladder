# Portland Word Ladder

This repository was created for fun after I played a word ladder someone else made. I authored it on paper as a way to get away from screens while making games. I couldn't help myself though, so now it's a web app!

🪜 [Climb the ladder](https://pdx-word-ladder.netlify.app/)

## Build your own

This project requires that you have a [Node.js](https://nodejs.org/en/) runtime set up on your computer. After you clone this project you'd need to run `npm install` in a terminal to set everything up and then `npm start` to get the local development environment running.

Once you have an appropriate development environment, it should be relatively straightforward to make your own word ladder. There are two main data files that feed into the puzzle.

### settings.yaml

The first is a [settings.yaml](data/settings.yaml) file that contains things like the game's title, rules, and example.

### ladder.txt

The main file is [ladder.txt](data/ladder.txt) (spoilers if you haven't played yet). It contains an answer word of any length and then a clue separated by a space. The first block of characters will be treated as the answer, the rest of the line after the first space character will be treated as the clue.

**For example:**

```
CARD It comes in a deck
```

`CARD` would be the answer and the clue would be `It comes in a deck`.
