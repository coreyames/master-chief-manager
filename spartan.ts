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

export type { Spartan, SpartanBaseConfig, SpartanHistory, SpartanStats };
export {
    createSpartan, generateStats, generateTraitSelection
};