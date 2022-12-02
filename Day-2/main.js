const fs = require('fs');
const path = require('path');

inputPath = path.join(__dirname, 'input.txt');
let pointsSumPartOne = 0;
let pointsSumPartTwo = 0;

const options = { A: 'rock', B: 'paper', C: 'scissors', X: 'rock', Y: 'paper', Z: 'scissors' };
const optionsPartTwo = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
    X: 'lose',
    Y: 'draw',
    Z: 'win',
};
const points = { rock: 1, paper: 2, scissors: 3, win: 6, draw: 3, lose: 0 };
const scenarios = [
    ['rock', 'paper', 'paper'],
    ['rock', 'rock', 'draw'],
    ['rock', 'scissors', 'rock'],
    ['paper', 'paper', 'draw'],
    ['paper', 'rock', 'paper'],
    ['paper', 'scissors', 'scissors'],
    ['scissors', 'scissors', 'draw'],
    ['scissors', 'paper', 'scissors'],
    ['scissors', 'rock', 'rock'],
];

const getScenarioPartOne = (firstOption, secondOption) => {
    firstOption = options[firstOption];
    secondOption = options[secondOption];

    const winner = scenarios.find(
        (scenario) => scenario[0] === firstOption && scenario[1] === secondOption
    )[2];

    const optionPoints = points[secondOption];

    if (secondOption === winner) return points.win + optionPoints;
    else if (winner === 'draw') return points.draw + optionPoints;
    else return points.lose + optionPoints;
};

const getScenarioPartTwo = (firstOption, secondOption) => {
    firstOption = optionsPartTwo[firstOption];
    secondOption = optionsPartTwo[secondOption];

    let option;

    switch (secondOption) {
        case 'win':
            option = scenarios.find(
                (scenario) =>
                    scenario[0] === firstOption &&
                    scenario[2] !== 'draw' &&
                    scenario[2] !== firstOption
            )[1];
            return points[option] + points.win;
            break;
        case 'draw':
            option = scenarios.find(
                (scenario) => scenario[0] === firstOption && scenario[2] === 'draw'
            )[1];
            return points[option] + points.draw;
        case 'lose':
            option = scenarios.find(
                (scenario) =>
                    scenario[0] === firstOption &&
                    scenario[2] !== 'draw' &&
                    scenario[2] === firstOption
            )[1];
            return points[option] + points.lose;
        default:
            return 0;
    }
};

const countPointsPartOne = (firstOption, secondOption) => {
    let collectedPoints = 0;
    collectedPoints += getScenarioPartOne(firstOption, secondOption);
    return collectedPoints;
};

const countPointsPartTwo = (firstOption, secondOption) => {
    let collectedPoints = 0;
    collectedPoints += getScenarioPartTwo(firstOption, secondOption);
    return collectedPoints;
};

fs.readFile(inputPath, 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    data.split(/\n/).forEach((line) => {
        if (line !== '') {
            const firstPlayerOption = line.split(' ')[0];
            const secondPlayerOption = line.split(' ')[1];
            pointsSumPartOne += countPointsPartOne(firstPlayerOption, secondPlayerOption);
            pointsSumPartTwo += countPointsPartTwo(firstPlayerOption, secondPlayerOption);
        }
    });

    console.log(`Total points collected part one: ${pointsSumPartOne}`);
    console.log(`Total points collected part two: ${pointsSumPartTwo}`);
});
