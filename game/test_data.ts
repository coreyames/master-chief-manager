import type { Match } from './match.ts';
import type { Level } from './level.ts';
import type { Profile } from './profile.ts';
import type { Roster  } from './roster.ts';
import type { Spartan, SpartanStats, SpartanHistory } from './spartan.ts'
import { generateStats } from './spartan.ts';
import { createRoster } from './roster.ts';

// bundle test data type
interface TestSet {
    profiles: Profile[],
    matches: Match[],
    levels: Level[],
    rosters: Roster[],
    spartans: Spartan[]
};

// profiles
const testProfile: Profile = {
    id: 0,
    name: 'testprofile',
    rosterIds: [0],
    startDate: new Date(),
    saveDate: new Date()
};
const testProfiles: Profile[] = [
    testProfile
];

// a 100x100 map, with just the one edge in it
// it is a horizontal line across middle, 10 unites long on each side
const testLevel: Level = {
    id: 0,
    name: "test",
    size: 100, 
    edges: [{a: {x: 40, y: 70}, b: {x: 60, y: 50}}]
};
const testLevels: Level[] = [
    testLevel
];

// spartans, mock stats and history 
const testStats: SpartanStats = generateStats();
const testHistory: SpartanHistory = {
    rosters: [0],
    matches: 11,
    kills: 222,
    deaths: 33,
    wins: 44,
    losses: 5,
};
const testSpartan = {
    id: 0, 
    name: 'testname', 
    bio: "testbio", 
    rosterId: 0, 
    history: testHistory, 
    stats: testStats, 
    activeDate: new Date()
}; 
const testSpartans: Spartan[] = [
    {
        id: 0, 
        name: 'testname', 
        bio: "testbio", 
        rosterId: 0, 
        history: testHistory, 
        stats: testStats, 
        activeDate: new Date()
    }
];

// rosters
const testRoster: Roster = createRoster('testroster', 0, [0]);
const testRosters: Roster[] = [
    testRoster
];

// matches
const testMatch: Match = {
    id: 0,
    level: testLevel,
    players: testSpartans,
    positions: new Map(), 
    log: ""
};
const testMatches: Match[] = [
    testMatch
]

// test sets
const testSetBasic: TestSet = {
    profiles: testProfiles,
    matches: testMatches,
    levels: testLevels,
    rosters: testRosters,
    spartans: testSpartans
};

export {
    testSetBasic
};
export type {
    TestSet
};