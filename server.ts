import express from 'express';
//import cors from 'cors';
import type { Match } from './game/match.ts';
import type { Spartan } from './game/spartan.ts'
import { generateStats } from './game/spartan.ts';

const app = express();
 
const testStats = generateStats();

const history = {
    rosters: [0, 1, 2, 44],
    matches: 11,
    kills: 222,
    deaths: 33,
    wins: 44,
    losses: 5,
};

const sp = {
    id: 666, 
    name: 'testname', 
    bio: "testbio", 
    rosterId: 1, 
    history: history, 
    stats: testStats, 
    activeDate: new Date()
};


const testPlayers: Spartan[] = [
    sp
];

const testMatch: Match = {
    players: testPlayers,
    level: null,
    positions: new Map([
        [666,{x:25, y:43}]
    ]), 
    id: 3,
    log: "match loaded"
};

app.use(express.static('public'));
//app.use(cors);

app.get('/match', (req, res) => {
    res.json(testMatch);
});

app.get('/spartan', (req, res) => {
});

app.get('/roster', (req, res) => {
    res.send("");
});

app.get('/level', (req, res) => {
    res.send("");
});

app.get('/profile', (req, res) => {
    res.send("");
});

app.listen(3030);
