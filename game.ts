import { stdin, stdout } from 'process';
import readline from 'readline';
import * as Spartan from './spartan.ts';
import * as Roster from './roster.ts';
import * as readlinePromise from 'readline/promises';
//import * as Profile from './profile.ts';

// globals
const ALL_SPARTANS: Map<number, Spartan.Spartan> = new Map();
const ROSTERS: Map<number, Roster.Roster> = new Map();
const FREE_AGENTS: Roster.Roster = Roster.createRoster("Free Agents", 0);
ROSTERS.set(0, FREE_AGENTS);

// debug menuing ~~~~
const rl = readlinePromise.createInterface(stdin, stdout);

// main menu query and function
const QUERY = 
    "1. add new spartan to roster\n" +
    "2. display roster\n" + 
    "3. quit";
      
const menu = async (): Promise<boolean> => {
    const answer = await rl.question(QUERY); 
    if (answer.includes('1')) {
        await handleAddSpartan();
    } else if (answer.includes('2')) {
        ROSTERS.forEach((roster, r_id) => {
            console.log(`Roster #${r_id}-<${roster.name}>`);
            roster.spartans.forEach((s_id => {
                const sprtn = ALL_SPARTANS.get(s_id);
                console.log(`~~~~ Spartan #${s_id}-<${sprtn?.name}>`);
            }));
        });            
    } else if (answer.includes('3')) {
        console.log('exiting');
        return false;
    } else {
        console.log('invalid option');
    }    
    return true;
};

// debug options 1 - add a spartan wih input
const handleAddSpartan = async () => {


    let name = await rl.question("Enter name: ");
    let bio = await rl.question("Enter bio: ");
    let id = parseInt(await rl.question("Enter roster id: "));
    let stats = Spartan.generateStats();
    let statsString = await rl.question("Enter stat spread (x x x x x x x): ");
    let values = statsString.split(' ').map((val) => {
        return parseInt(val);
    });
    
    stats.aim        = values[0];
    stats.awareness  = values[1];
    stats.reactions  = values[2];
    stats.aggression = values[3];
    stats.power      = values[4];
    stats.teamplay   = values[5];
    stats.trait      = Spartan.generateTraitSelection(values[6]);
    
    const newSpartan = Spartan.createSpartan({ name, bio, id }, 0, stats);
    ALL_SPARTANS.set(id, newSpartan) 
    ROSTERS.get(0)?.spartans.push(newSpartan.id);
};

// start game with main menu
const game = async () => {
    // any extra startup setup
    let ok = true;
    ok = await menu(); 
    if (ok) game(); else return;
}

await game();