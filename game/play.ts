import { nanPoint, isNaNpoint } from './level.js';
import type { Edge, Point, Level } from './level.ts';
import type { Match } from './match.ts';

//const PI_OVER_180: number = 0.017453;
const DEFAULT_FOV: number = 90;
const NORMALIZED_DEGREE: number = 1.0/45.0;

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

/*
given set S of spartans {s,...} with position s.p: Point, direction s.d: Point
    and decision function s.f: (C: {collisions}) => <action>
given level l with set E of edges {e,...}
given ray cast degree interval r
given field of view angle v

nav during game tick:
    if (use actions queue) actions = []
    for s of S:
        ray cast from s.p towards s.d;
        repeat this every r degrees up to f/2 degrees from s.d    
        collect collision set C of collisions {c,...}
        call s.f(C) to get the tick action for s
        if (actions): 
            append to actions
    if (actions)
        reorder ? actions.shuffle(priority_function: null | f()); 
        actions.execute()
*/

/*

*/

const raycast = (origin: Point, direction: Point, fov: number, match: Match) => {
    if (fov == 0) {
        fov = DEFAULT_FOV;
    }

    const viewWidth = fov * NORMALIZED_DEGREE;

    const collisions: Map<Point, Point> = new Map(); 
    
    // TODO: CREATE 4 edges for EACH OTHER SPARTAN'S CURRENT POSITION 4 HITBOX, CONCAT WITH EDGES
    const allEdges: Edge[] = match.level.edges;
    // const allEdges = generateSpartanHitboxes + match.level.edges
    for (const edge of allEdges) {
        var x: number = direction.x-(viewWidth/2);
        for (x; x <= x+viewWidth; x+=NORMALIZED_DEGREE) {
            const castDir: Point = {x: x, y: direction.y};
            const c = rayIntersectEdge(origin, castDir, edge);
            collisions.set(direction, c);
        }
    }   
};

export { rayIntersectEdge, raycast };

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