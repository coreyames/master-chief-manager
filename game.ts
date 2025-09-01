import { stdin, stdout } from 'process';
import readline from 'readline';
import * as Spartan from './spartan.ts';
import * as Roster from './roster.ts';
import * as Profile from './profile.ts';

// globals
const ROSTERS: Roster.Roster[] = [];
const FREE_AGENTS = Roster.createRoster("Free Agents", 0);
ROSTERS.push(FREE_AGENTS);

// debug menuing ~~~~
const rl = readline.createInterface(stdin, stdout);

// main menu query and function
const QUERY = 
    "1. add new spartan to roster\n" +
    "display roster\n" + 
    "3. quit";
  
const menu = () => {
    rl.question(QUERY, async (answer) => { 
        if (answer.includes('1')) {
            handleAddSpartan();
            menu();
        } else if (answer.includes('2')) {
            for (const r of ROSTERS) {
                for (const s of r.spartans) {
                    console.log(s.id + ' ' + s.name + ' ' + s.activeDate);
                }
            }
            menu();
        } else if (answer.includes('3')) {
            console.log('exiting');
            rl.close();
            return;
        } else {
            console.log('invalid option');
            menu();
        }    
    });
};

// debug options 1 - add a spartan wih input
const handleAddSpartan = () => {
    let name = "";
    let bio =  "";
    let id = 0;
    let stats = Spartan.generateStats();
    rl.question("Enter name: ", (answer) => {
        name = answer;
    });
    rl.question("Enter bio: ", (answer) => {
        bio = answer;
    });
    rl.question("Enter roster ID: ", (answer) => {
        id = parseInt(answer);
    });
    rl.question("Enter stat spread (x x x x x x x): ", (answer) => {
        let values = answer.split(' ').map((val) => {
            return parseInt(val);
        });
        stats.aim = values[0];
        stats.awareness = values[1];
        stats.reactions = values[2];
        stats.aggression = values[3];
        stats.power = values[4];
        stats.teamplay = values[5];
        stats.trait = Spartan.generateTraitSelection(values[6]);
    });
};

// start game with main menu
const game = () => {
    // any extra startup setup
    menu();
}

game();