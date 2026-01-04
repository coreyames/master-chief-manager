import { nanPoint } from './level.ts';
import type { Edge, Point, Level } from './level.ts';
import { runMatch } from './match.ts';
import type { Match } from './match.ts';
import type { Spartan } from './spartan.ts';
import { createSpartan, generateStats } from './spartan.ts';

const PI_OVER_180: number = 0.017453;

/*  ray-edge intersect implementation sourced from:
    
    PolyK library
	url: http://polyk.ivank.net
*/
const rayIntersectEdge = (origin: Point, direction: Point, edge: Edge, distance?: number): Point => {
    const p: Point = nanPoint();
    
    const d_ray_x:  number = (origin.x - direction.x);
    const d_edge_x: number = (edge.a.x - edge.b.x);
    const d_ray_y:  number = (origin.y - direction.y);
	const d_edge_y: number = (edge.a.y - edge.b.y);
    
    const d_products: number = (d_ray_x * d_edge_y) - (d_ray_y * d_edge_x);
    if (d_products == 0) return p;
    
    const d_ray_products  = (origin.x * direction.y) - (origin.y * direction.x);
    const d_edge_products = (edge.a.x * edge.b.y) - (edge.a.y * edge.b.x);

    const inv_d_products = 1.0/d_products;
    p.x = ((d_ray_products * d_edge_x) - (d_ray_x * d_edge_products )) * inv_d_products;   
    p.y = ((d_ray_products * d_edge_y) - (d_ray_y * d_edge_products )) * inv_d_products;

    if ((d_ray_y > 0 && p.y > origin.y) || (d_ray_y < 0 && p.y < origin.y)) return nanPoint();
    if ((d_ray_x > 0 && p.x > origin.x) || (d_ray_x < 0 && p.x < origin.x)) return nanPoint();
    return p;
};

export { rayIntersectEdge };

// 10x10 level with a 2 unit horizontal edge in the middle (x: 4-> 6, y: 5)

const testEdges: Edge[] = [
    {a: {x: 4, y: 5}, b: {x: 6, y: 5}}
];

const testLevel: Level = {
    id: 0,
    name: "test",
    size: 10, 
    edges: testEdges
};

const testStats = generateStats();

const history = {
    rosters: [0, 1, 2, 44],
    matches: 11,
    kills: 222,
    deaths: 33,
    wins: 44,
    losses: 5,
};

const testPlayers: Spartan[] = [
    {
        id: 0, 
        name: 'testname', 
        bio: "testbio", 
        rosterId: 0, 
        history: history, 
        stats: testStats, 
        activeDate: new Date()
    }
];

const testMatch: Match = {
    id: 0,
    level: testLevel,
    players: testPlayers,
    positions: new Map(), 
    log: "",
};

runMatch(testMatch);

// test intersect edge
/*
    origin 0,0 through 1,1 should intersect segment 0,1 -> 1,0 at .5, .5;

const test = () => {
    const origin: Point = {x: 0, y: 0};
    const direction: Point = {x: 1, y: 1};
    const a: Point = {x: 0, y: 1};
    const b: Point = {x: 1, y: 0};
    const edge: Edge = {a, b}; 
    const i: Point = await rayIntersectEdge(origin, direction, edge);
    console.log(i);
};
*/
