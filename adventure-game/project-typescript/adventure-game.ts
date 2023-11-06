import chalk from 'chalk';
import inquirer from 'inquirer';

// Game variables
const enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];

let playerHealth = 100;
const playerAttackDamage = 50;
let numHealthPotions = 3;
const healthPotionHealAmount = 30;
const healthPotionDropChance = 50; // percentage

console.log(chalk.yellow("Welcome to the Dungeon!\n"));

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

async function promptUser() {
  const userInput = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: 'Attack', value: 'attack' },
        { name: 'Drink health potion', value: 'drink' },
        { name: 'Run', value: 'run' },
        { name: 'Quit', value: 'quit' }, // Add Quit option
      ],
    },
  ]);

  const action = userInput.action;

  if (action === "attack") {
    const damageDealt = getRandomInt(playerAttackDamage);
    const damageTaken = getRandomInt(25); // Simplified enemy damage

    playerHealth -= damageTaken;

    console.log(chalk.red(`\n> You strike the enemy for ${damageDealt} damage.`));
    console.log(chalk.red(`> You receive ${damageTaken} in retaliation!`));
  } else if (action === "drink") {
    if (numHealthPotions > 0) {
      playerHealth += healthPotionHealAmount;
      numHealthPotions--;
      console.log(chalk.blue(`\n> You drink a health potion, healing yourself for ${healthPotionHealAmount}.`));
      console.log(chalk.blue(`> You now have ${playerHealth} HP.`));
      console.log(chalk.blue(`> You have ${numHealthPotions} health potions left.`));
    } else {
      console.log(chalk.yellow("\n> You have no health potions left! Defeat enemies for a chance to get one!"));
    }
  } else if (action === "run") {
    console.log(chalk.yellow(`\nYou run away from the enemy!\n`));
    startGame();
    return;
  } else if (action === "quit") { // Handle Quit option
    console.log(chalk.yellow("\nTHANKS FOR PLAYING!"));
    console.log(chalk.yellow("\nYou have quit the game."));
    process.exit(0);
  } else {
    console.log(chalk.yellow("\nInvalid command!"));
  }

  console.log(chalk.green("\n#######################"));
  console.log(chalk.green(`# Your health: ${playerHealth} HP #`));
  console.log(chalk.green("#######################"));

  if (playerHealth > 0) {
    await promptUser();
  } else {
    console.log(chalk.red("You have been defeated! Game over."));
  }
}

async function startGame() {
  console.log(chalk.green("---------------------------------------------"));

  const enemy = enemies[getRandomInt(enemies.length)];

  console.log(chalk.yellow(`\t#${enemy} has appeared! #\n`));

  await promptUser();
}

startGame();

