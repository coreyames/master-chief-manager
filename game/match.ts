import type { Level, Point } from './level.ts';
import type { Spartan } from './spartan.js';

interface Match {
    players: Spartan[],
    level: Level,
    positions: Map<number, Point>
    id: number,
    log: String
};

export type {
    Match
};