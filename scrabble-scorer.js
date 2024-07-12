// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}'; ${pointValue}\n`
      }
    }
  }
  return letterPoints;
}




function initialPrompt() {
  let intro = input.question("Let's play some scrabble! Enter a word: ");
  return intro;
}


function simpleScorer(word) {
  return word.length
};

function vowelBonusScorer(word) {
  let vowels = ['A', 'E', 'I', 'O', 'U'];
  let score = 0;
  word = word.toUpperCase();
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;

}

function scrabbleScorer(word) {
  let score = 0;
  word = word.toLowerCase();

  for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]];
  }

  return score;
}


const scoringAlgorithms = [
  {
    name: 'Simple Scorer',
    description: 'Each letter is worth 1 point.',
    scorerFunction: simpleScorer

  },
  {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scorerFunction: vowelBonusScorer
  },

  {
    name: 'Scrabble',
    description: 'The traditional scoring algorithm.',
    scorerFunction: scrabbleScorer
  }
];

function scorerPrompt(word) {
  console.log(`\nWhich scoring algorithm would you like to use?`)
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
  }
  let scoreQuestion = Number(input.question(`\nEnter 0, 1, or 2: `));
  console.log(`Score for '${word}': ${scoringAlgorithms[scoreQuestion].scorerFunction(word)}`);
}

function transform(oldScoreKey) {
  let newScoreKey = {};

  for (let pointValue in oldScoreKey) {
    let letters = oldScoreKey[pointValue];
    for (let letter of letters) {
      newScoreKey[letter.toLowerCase()] = Number(pointValue);
    }
  }
  return newScoreKey;
}

const newPointStructure = transform(oldPointStructure);

function runProgram() {
  let word = initialPrompt();
  scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};