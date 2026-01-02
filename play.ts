import { nanPoint } from './level.ts'
import type { Edge, Point } from './level.ts'

const PI_OVER_180: number = 0.017453;

/*  ray-edge intersect implementation sourced from:
    
    PolyK library
	url: http://polyk.ivank.net
*/
const rayIntersectEdge = async (origin: Point, direction: Point, edge: Edge, distance?: number): Promise<Point> => {
    var p: Point = nanPoint();
    
    var d_ray_x:  number = (origin.x - direction.x);
    var d_edge_x: number = (edge.a.x - edge.b.x);
    var d_ray_y:  number = (origin.y - direction.y);
	var d_edge_y: number = (edge.a.y - edge.b.y);
    var d_products: number = (d_ray_x * d_edge_y) - (d_ray_y * d_edge_x);
    if (d_products == 0) return p;
    
    var d_ray_products  = (origin.x * direction.y) - (origin.y * direction.x);
    var d_edge_products = (edge.a.x * edge.b.y) - (edge.a.y * edge.b.x);

    var inv_d_products = 1.0/d_products;
    p.x = ((d_ray_products * d_edge_x) - (d_ray_x * d_edge_products )) * inv_d_products;   
    p.y = ((d_ray_products * d_edge_y) - (d_ray_y * d_edge_products )) * inv_d_products;

    if ((d_ray_y > 0 && p.y > origin.y) || (d_ray_y < 0 && p.y < origin.y)) return nanPoint();
    if ((d_ray_x > 0 && p.x > origin.x) || (d_ray_x < 0 && p.x < origin.x)) return nanPoint();
    return p;
};

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
