import express from 'express';
//import cors from 'cors';
import { testSetBasic } from './game/test_data.ts';

const app = express();

// basic test data
const { 
    rosters, 
    spartans, 
    profiles, 
    matches, 
    levels 
} = testSetBasic;   


app.use(express.static('public'));
//app.use(cors);

app.get('/match', (req, res) => {
    res.json(matches);
});

app.get('/match/:matchId(\d+)', (req, res) => {
    const match = matches.find((m) => {
        m.id.toString() == req.params.matchId
    });
    res.json(match);
});

app.get('/spartan', (req, res) => {
    res.json(spartans);
});

app.get('/spartan/:spartanId(\d+)', (req, res) => {
    const spartan = spartans.find((s) => {
        s.id.toString() == req.params.spartanId
    });
    res.json(spartan);
});

app.get('/roster', (req, res) => {
    res.json(rosters);
});

app.get('/roster/:rosterId(\d+)', (req, res) => {
    const roster = rosters.find((r) => {
        r.id.toString() == req.params.rosterId
    });
    res.json(roster);
});

app.get('/level', (req, res) => {
    res.json(levels);
});

app.get('/level/:levelId(\d+)', (req, res) => {
    const level = levels.find((l) => {
        l.id.toString() == req.params.levelId
    });
    res.json(level);
});

app.get('/profile', (req, res) => {
    res.json(profiles);
});

app.get('/profile/:profileId(\d+)', (req, res) => {
    const profile = profiles.find((l) => {
        l.id.toString() == req.params.levelId
    });
    res.json(profile);
});

app.listen(3030);
