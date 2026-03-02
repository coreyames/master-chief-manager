import type { Level, Point } from './level.ts';
import type { Spartan } from './spartan.js';

interface Match {
    players: Spartan[],
    level: Level,
    positions: Map<number, Point>
    id: number,
    records: MatchRecord[]
};

interface MatchRecord {
    id: number,
    matchID: number,
    ticks: GameTick[],
}

interface GameTick {
    turns: Turn[],
    log: String
}

interface Turn {
    movement: Point,
    action: String,
    received: String
}

const runMatch = (match: Match) => {
    const {
        players,
        level,
        positions,
    } = match;

    if (players.length != positions.size) {
        console.log('player count and position map size do not match');
        return;
    }

    runTick(players, level, positions);
};

const runTick = (players: Spartan[], level: Level, positions: Map<number, Point>) => {
    // do stuff
    if (isGameOver(players)) {
        return;
    } else {
        runTick(players, level, positions);
    }
};

const isGameOver = (players: Spartan[]): boolean => {
    return true;  
};

export type { Match };
export {
    runMatch
};