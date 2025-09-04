import { stdin, stdout } from 'process';
import * as Spartan from './spartan.ts';
import * as Roster from './roster.ts';
import * as readlinePromise from 'readline/promises';
import * as Profile from './profile.ts';
import { start } from 'repl';
import { deserialize, serialize } from 'v8';

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
    "3. quit\n";
      
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
    ALL_SPARTANS.set(id, newSpartan); 
    ROSTERS.get(0)?.spartans.push(newSpartan.id);
};

// game 'loop' with main menu as entry point; recurses
const game = async () => {
    let ok = true;
    ok = await menu(); 
    if (ok) game(); else return;
}

// run game
game();

// TESTS

const testRosterSerialize = async () => {
    console.log('start');
    console.log(FREE_AGENTS.id);
    console.log(FREE_AGENTS.name);
    console.log(FREE_AGENTS.spartans);
    console.log();

    console.log('serial0');
    const serial0 = Roster.serialize(FREE_AGENTS);
    console.log(serial0);
    console.log();
    
    console.log('deserial0');
    const r0 = Roster.deserialize(serial0);
    console.log(r0.id);
    console.log(r0.name);
    console.log(r0.spartans);
    console.log();

    let newSpartan = Spartan.createSpartan({ name: 's0', bio: 'b0', id: 0 }, 0, Spartan.generateStats());
    ALL_SPARTANS.set(newSpartan.id, newSpartan); 
    ROSTERS.get(0)?.spartans.push(newSpartan.id);
    
    newSpartan = Spartan.createSpartan({ name: 's1', bio: 'b1', id: 1 }, 0, Spartan.generateStats());
    ALL_SPARTANS.set(newSpartan.id, newSpartan); 
    ROSTERS.get(0)?.spartans.push(newSpartan.id);
    
    newSpartan = Spartan.createSpartan({ name: 's2', bio: 'b2', id: 2 }, 0, Spartan.generateStats());
    ALL_SPARTANS.set(newSpartan.id, newSpartan); 
    ROSTERS.get(0)?.spartans.push(newSpartan.id);

    console.log('serial1 added spartans');
    console.log('spartans field: ' + FREE_AGENTS.spartans);
    const serial1 = Roster.serialize(FREE_AGENTS);
    console.log(serial1);
   
    console.log('deserialize1');
    const r1 = Roster.deserialize(serial1);
    console.log(r1.id);
    console.log(r1.name);
    console.log(r1.spartans);
    console.log();

    rl.close();
}

const testProfileSerialize = () => {
    const newProfile = {
        id: 0,
        name: 'prof 1',
        rosterIds: [0, 1, 2], 
        startDate: new Date('01-01-2025'),
        saveDate: new Date('02-02-2025')
    };
    console.log('profile object');
    console.log(newProfile);
    const s = Profile.serialize(newProfile);
    console.log('serialized');
    console.log(s);
    console.log('desererialized');
    const ds = Profile.deserialize(s);
    console.log(ds);
};

// RUN TESTS HERE

//await testRosterSerialize();
await testProfileSerialize();