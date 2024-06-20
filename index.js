const scorer = require('./scrabble-scorer');

scorer.runProgram();
// Define the oldScoreKey object
const oldScoreKey = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D', 'G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q', 'Z']
};

// Convert the oldScoreKey object to a newScoreKey object
const newScoreKey = {};
for (let score in oldScoreKey) {
    oldScoreKey[score].forEach(letter => {
        newScoreKey[letter] = parseInt(score);
    });
}

// Define scoring methods
const scoringMethods = {
    method1: function(word) {
        let score = 0;
        word.toUpperCase().split('').forEach(letter => {
            if (newScoreKey[letter]) {
                score += newScoreKey[letter];
            }
        });
        return score;
    },
    method2: function(word) {
        let score = 0;
        word.toUpperCase().split('').forEach(letter => {
            if (newScoreKey[letter]) {
                score += newScoreKey[letter] * 2;
            }
        });
        return score;
    },
    method3: function(word) {
        let score = 0;
        word.toUpperCase().split('').forEach(letter => {
            if (newScoreKey[letter]) {
                score += Math.pow(newScoreKey[letter], 2);
            }
        });
        return score;
    }
};

// Display initial information
console.log("Welcome to the Word Scorer!");
console.log("Choose a scoring method:");
console.log("1. Method 1 (normal score)");
console.log("2. Method 2 (double score)");
console.log("3. Method 3 (squared score)");

// Prompt the user to select a scoring method
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter the number corresponding to the scoring method: ", methodNum => {
    const selectedMethod = "method" + methodNum;
    if (scoringMethods[selectedMethod]) {
        // Prompt the user to enter a word
        readline.question("Enter a word: ", word => {
            // Display the calculated score for the entered word
            console.log("Score for the word '" + word + "':", scoringMethods[selectedMethod](word));
            readline.close();
        });
    } else {
        console.log("Invalid scoring method selected.");
        readline.close();
    }
});
