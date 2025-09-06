// spartan ---------
interface SpartanBaseConfig {
    id: number,
    name: string,
    bio: string,
};

const TraitEnum = {
    NONE: 0,
    LEROY: 1,
    COWARD: 2,
    AVGJOE: 3 
} as const;
type Trait = typeof TraitEnum[keyof typeof TraitEnum];

interface SpartanStats {
    aim: number,
    awareness: number,
    reactions: number,
    aggression: number,
    power: number,
    teamplay: number,
    trait: Trait
};

const serializeSpartanStats = (stats: SpartanStats): string => {
	const { aim, awareness, reactions, aggression, power, teamplay, trait } = stats;
	let statstr = '' + aim + awareness + reactions + aggression + power + teamplay + trait; 
	return statstr;
}

const deserializeSpartanStats = (value: string): SpartanStats => {
	const chars = Array.from(value);
    return {
        aim: parseInt(chars[0]),
        awareness: parseInt(chars[1]),
        reactions: parseInt(chars[2]),
        aggression: parseInt(chars[3]),
        power: parseInt(chars[4]),
        teamplay: parseInt(chars[5]),
        trait: generateTraitSelection(parseInt(chars[6])),
    }
}

interface SpartanHistory {
    rosters: number[],
    matches: number,
    kills: number,
    deaths: number,
    wins: number,
    losses: number
};

const serializeSpartanHistory = (history: SpartanHistory): string => {
	const { rosters, matches, kills, deaths, wins, losses } = history;
    const rostersStr = rosters.toString();
    const valsStr = [ matches, kills, deaths, wins, losses ].toString();
    const hstr = rostersStr + '-' + valsStr;
    return hstr;
}

const deserializeSpartanHistory = (value: string): SpartanHistory => {
    const split = value.split('-');
    const rosters = split[0].split(',').map(x => parseInt(x));
    const vals = split[1].split(',').map(x => parseInt(x));

    return {
        rosters: rosters,
        matches: vals[0],
        kills: vals[1],
        deaths: vals[2],
        wins: vals[3],
        losses: vals[4]
    };
}

const generateStatValue = (): number => { return Math.round(Math.floor(Math.random() * 10))};

const generateTraitSelection = (selection?: number): Trait => {
    const _selection = selection ? selection : Math.floor((Math.random() * 4));
    switch (_selection) {
        case 1: 
            return TraitEnum.LEROY;
        case 2: 
            return TraitEnum.COWARD;
        case 3: 
            return TraitEnum.AVGJOE;
        case 4:
            return TraitEnum.NONE; 
        default:
            return TraitEnum.NONE;
    };
};

const generateStats = (): SpartanStats => {
    const stats = {
        aim:        generateStatValue(),
        awareness:  generateStatValue(),
        reactions:  generateStatValue(),
        aggression: generateStatValue(),
        power:      generateStatValue(),
        teamplay:   generateStatValue(),
        trait: generateTraitSelection()
    };
	return stats;
};

interface Spartan extends SpartanBaseConfig {
    id: number
    activeDate: Date,
    rosterId: number,
    stats: SpartanStats,
    history: SpartanHistory,
};

const createSpartan = (config: SpartanBaseConfig, rosterId?: number, stats?: SpartanStats): Spartan => {
    return { 
        name: config.name, 
        bio: config.bio, 
        activeDate: new Date(), 
        id: config.id, 
        rosterId: rosterId ? rosterId : 0,
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

const serialize = (spartan: Spartan): string => {
	//sstr = 'S:' + 
	
	return 'placeholder';
}

const deserialize = (value: string): Spartan => {

	return createSpartan({ name: 'placeholder', bio: 'placeholder', id: 333 });
}

// serialize testing
/*
const testStats = generateStats();
console.log();
console.log(testStats);
console.log();
const s = serializeSpartanStats(testStats);
console.log(s);
console.log();
const d = deserializeSpartanStats(s);
console.log(d);

const history = {
    rosters: [0, 1, 2, 44],
    matches: 11,
    kills: 222,
    deaths: 33,
    wins: 44,
    losses: 5,
};

console.log(history);
console.log();
const sh = serializeSpartanHistory(history);
console.log(sh);
console.log();
const dh = deserializeSpartanHistory(sh);
console.log(dh);
*/

export type { Spartan, SpartanBaseConfig, SpartanHistory, SpartanStats };
export {
    createSpartan, generateStats, generateTraitSelection, serialize, deserialize,
};