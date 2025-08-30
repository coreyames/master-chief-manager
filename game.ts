import { stat } from 'fs';
import { stdin, stdout } from 'process';
import readline from 'readline';

// spartan ---------
interface SpartanBaseConfig {
    name: string,
    bio: string,
};

enum Trait {
    LEROY,
    COWARD,
    AVGJOE,
    NONE
};

interface SpartanStats {
    aim: number,
    awareness: number,
    reactions: number,
    aggression: number,
    power: number,
    teamplay: number,
    trait: Trait
};

interface SpartanHistory {
    matches: number,
    rosters: number[],
    kills: number,
    deaths: number,
    wins: number,
    losses: number
};

const generateStatValue = (): number => { return (Math.random() * 10) + 1 };

const generateTraitSelection = (selection?: number): Trait => {
    const _selection = selection ? selection : (Math.random() * 4) + 1;
    switch (_selection) {
        case 1: 
            return Trait.LEROY;
        case 2: 
            return Trait.COWARD;
        case 3: 
            return Trait.AVGJOE;
        case 4:
            return Trait.NONE; 
        default:
            return Trait.NONE;
    };
};

const generateStats = (): SpartanStats => {
    return {
        aim:        generateStatValue(),
        awareness:  generateStatValue(),
        reactions:  generateStatValue(),
        aggression: generateStatValue(),
        power:      generateStatValue(),
        teamplay:   generateStatValue(),
        trait: generateTraitSelection()
    };
};

interface Spartan extends SpartanBaseConfig {
    id: number
    activeDate: Date,
    rosterId: number,
    stats: SpartanStats,
    history: SpartanHistory,
};

let spartanIdCount = 0;
const createSpartan = (config: SpartanBaseConfig, rosterId?: number, stats?: SpartanStats): Spartan => {
    const currentIdCount = spartanIdCount;
    spartanIdCount++;
    let _rosterId = rosterId ? rosterId : 0;
    return { 
        name: config.name, 
        bio: config.bio, 
        activeDate: new Date(), 
        id: currentIdCount, 
        rosterId: _rosterId,
        stats: stats ? stats : generateStats(),
        history: {
            matches: 0,
            rosters: [],
            kills: 0,
            deaths: 0,
            wins: 0,
            losses: 0
        }
    };
};

// roster ----------
interface Roster  {
    id: number
    name: String,
    spartans: Spartan[]    
};


const ROSTERS: Roster[] = [];
let rosterIdCount = 0;
const createRoster = (name: string): Roster => {
    const currentIdCount = rosterIdCount;
    rosterIdCount++; 
    let newRoster = { 
        id: currentIdCount, 
        name, 
        spartans: [] 
    };
    ROSTERS.push(newRoster);
    return newRoster;
};

// roster id 0 is global free agents
const freeAgents = createRoster("Free Agents");

// profile ---------
type Profile = {
    name: string,
    roster: Roster,
    startDate: Date,
    saveDate: Date
};

// main menu - functions as game entry point
const rl = readline.createInterface(stdin, stdout);

const menu = (query: string) => {
    rl.question(query, async (answer) => { 
        if (answer.includes('1')) {
            handleAddSpartan();
            menu(query);
        } else if (answer.includes('2')) {
            for await (const spartan of freeAgents.spartans) {
                console.log(spartan.name);
                console.log(spartan.id);
            }
            menu(query);
        } else if (answer.includes('3')) {
            console.log('exiting');
            rl.close();
            return;
        } else {
            console.log('invalid option');
            menu(query);
        }    
    });
};


const handleAddSpartan = () => {
    let name = "";
    let bio =  "";
    let id = 0;
    let stats = generateStats();
    rl.question("Enter name: ", (answer) => {
        name = answer;
    });
    rl.question("Enter bio: ", (answer) => {
        bio = answer;
    });
    rl.question("Enter roster ID: ", (answer) => {
        id = parseInt(answer);
    });
    rl.question("Enter stat spread: ", (answer) => {
        let values = answer.split(' ').map((val) => {
            return parseInt(val);
        });
        stats.aim = values[0];
        stats.awareness = values[1];
        stats.reactions = values[2];
        stats.aggression = values[3];
        stats.power = values[4];
        stats.teamplay = values[5];
        stats.trait = generateTraitSelection(values[6]);
    });
};

// start game with main menu
const game = () => {
    const query = "1. add new spartan to roster\n2. display roster\n3. quit";
    menu(query);
}

game();