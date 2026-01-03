import { Level, Edge, Point, nanPoint } from './level.ts';
import { Spartan } from './spartan.ts';

interface Match {
    players: Spartan[],
    level: Level,
    id: number,
    log: String
}

const spawnPlayer = (id: number): Point => {
    return nanPoint();
}

const runMatch = (match: Match) => {
    const duration: number = 10;
    

}

export type {
    Match
}