import { nanPoint } from './level.ts';
import type { Edge, Level, Point } from './level.ts';
import type { Spartan } from './spartan.ts';
import { rayIntersectEdge } from './play.ts';

interface Match {
    players: Spartan[],
    level: Level,
    id: number,
    log: String
}

const spawnPlayer = (id: number, point?: Point): Point => {
    const x = Math.random() * 10;
    const y = Math.random() * 10;
    return {x, y}
}

const runMatch = (match: Match) => {
    const { players, level } = match;
    const duration: number = 10;
    const positions: Map<number, Point> = new Map();

    for (const pl of players) {
        positions.set(pl.id, spawnPlayer(pl.id));
    }

    const target: Point = { x: 4.5, y: 4.5};

    var tick: number = 0;
    for (;tick < duration; tick++) {
        for (const pl of players) {
            var zero = { x: 0, y: 0 };
            var pos = positions.get(pl.id);
            if (pos == null) pos = zero; 
            console.log(pos);
            for (const edge of level.edges) {
                const isc = rayIntersectEdge(pos, target, edge);
                console.log(isc);
            }
        }        


    }

}

export {
    runMatch
}

export type {
    Match
}