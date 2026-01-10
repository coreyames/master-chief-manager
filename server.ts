import express from 'express';
import cors from 'cors';
import type { Match } from './game/match.ts';
//import type { Point } from './game/level';   
const app = express();

const testMatch: Match = {
    players: [],
    level: null,
    positions: new Map([
        [0,{x:25, y:43}]
    ]), 
    id: 0,
    log: ""
};

app.use(express.static('public'));
app.use(cors);

// get the match info to play
app.get('/match', (req, res) => {
    res.json(testMatch);
});

/*
app.get('/', (req, res) => {
    res.send("")
});

app.get('/', (req, res) => {
    res.send("")
});

app.get('/', (req, res) => {
    res.send("")
});
*/

app.listen(3030);
