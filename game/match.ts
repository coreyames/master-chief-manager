import { nanPoint, isNaNpoint } from './level.js';
import type { Edge, Level, Point } from './level.ts';
import type { Spartan } from './spartan.js';
import { createSpartan } from './spartan.js';
import { rayIntersectEdge } from './play.js';

const zero = { x: 0, y: 0 };

interface Match {
    players: Spartan[],
    level: Level | null,
    positions: Map<number, Point>
    id: number,
    log: String
};

const cardinal: Map<String, Point> = new Map([
    ["N", {x:0,y:1}],
    ["S", {x:0,y:-1}],
    ["E", {x:1,y:0}],
    ["W", {x:-1,y:0}]
]);

const spawnPlayer = (id: number, point?: Point): Point => {
    const x = Math.random() * 10;
    const y = Math.random() * 10;
    return {x, y}
};

const navPlayer = (match: Match, id: number, point?: Point): Point => {
    const TEMP_STEP: number = 3;    
    const { players, level, positions } = match;

    var direction: Point = nanPoint();
    const pos: Point | undefined = positions.get(id);
    if (pos) {
        if (point) {
            // not correctly used atm
            direction = point;
        } else {
            const _direction: String | undefined = Array.from(cardinal.keys()).at((Math.random() * 4)|0);
            if (_direction) {
                var p: Point | undefined = cardinal.get(_direction);
                if (p) {
                    direction = p;
                }
            }
        }
        return { x: pos.x + TEMP_STEP*direction.x, y: pos.y + TEMP_STEP*direction.y }           
    }
    return nanPoint();
};


const runMatch = (match: Match) => {
    const { players, level, positions } = match;
    const duration: number = 1;

    for (const pl of players) {
        positions.set(pl.id, spawnPlayer(pl.id));
    } 

    const target: Point = {x: 4.5, y: 4.5};

    var tick: number = 0;
    for (;tick < duration; tick++) {
        for (const pl of players) {
            var pos = positions.get(pl.id);
            if (pos == null) pos = zero; 
            console.log("current");
            console.log(pos);
            console.log("nav");
            pos = navPlayer(match, pl.id);
            console.log(pos);
            if (!isNaNpoint(pos)) {
                positions.set(pl.id, pos);
            }
            if (level == null) { continue; }
            for (const edge of level.edges) {
                const isc = rayIntersectEdge(pos, target, edge);
                console.log("raycast");
                console.log(isc);
            }
        }        
    }
}

export {
    runMatch
};

export type {
    Match
};