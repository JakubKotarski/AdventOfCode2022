const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
let countedCalories = [];

const findMostCaloriesCarried = (inputData) => {
    let currentCalories = 0;

    inputData.split(/\n/).forEach((line) => {
        if (line !== '') {
            currentCalories += parseInt(line);
        } else {
            countedCalories.push(currentCalories);
            currentCalories = 0;
        }
    });
    const mostCalories = Math.max(...countedCalories);
    const sumOfTopThree = countedCalories
        .sort()
        .reverse()
        .slice(0, 3)
        .reduce((sum, calories) => sum + calories, 0);

    console.log(`Most carried calories: ${mostCalories}`);
    console.log(`Sum of top three: ${sumOfTopThree}`);
};

fs.readFile(inputPath, 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    findMostCaloriesCarried(data);
});
