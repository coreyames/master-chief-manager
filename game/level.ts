// level ------------
interface Level {
    id: number,
    name: string,
    size: number,
    edges: Edge[],
    spawns: Point[]
};

const serialize = (lvl: Level): String => {
    let value = 'L:' + lvl.id + '.' + lvl.name + '.' + lvl.size + '.';
    for (const e of lvl.edges) {
        value += serializeEdge(e) + '+';
    }
    value = value.slice(0, value.length-1);
    value += '.';
    for (const p of lvl.spawns) {
        value += serializePoint(p) + '+';
    }
    value = value.slice(0, value.length-1);
    value += ';';
    return value;
};

const deserialize = (value: string): Level => {
    let vals = value.slice(2, value.length-1).split('.');     
    return { 
        id: vals[0] ? parseInt(vals[0]) : -1, 
        name: vals[1] ? vals[1] : '', 
        size: vals[2] ? parseInt(vals[2]) : -1,
        edges: vals[3] ? vals[3].split('+').map(e => deserializeEdge(e)) : [],
        spawns: vals[4] ? vals[4].split('+').map(p => deserializePoint(p)) : [] 
    };
};

interface Point {
    x: number,
    y: number
};

const isNaNpoint = (p: Point): boolean => {
    return (isNaN(p.x) && isNaN(p.y)) ;
}

const nanPoint = (): Point => {
    return { x: NaN, y: NaN };
}

const serializePoint = (p: Point): String => {
    return "(" + p.x + ',' + p.y + ")";
};

const deserializePoint = (value: string): Point => {
    const vals = value.slice(1, value.length-1).split(',');
    return { 
        x: vals[0] ? parseFloat(vals[0]) : 0, 
        y: vals[1] ? parseFloat(vals[1]) : 0
    };
};

interface Edge {
    a: Point,
    b: Point
};

const serializeEdge = (e: Edge): String => {
    return '[' + serializePoint(e.a) + '-' + serializePoint(e.b) + ']';
};

const deserializeEdge = (value: String): Edge => {
    const vals = value.slice(1, value.length-1).split('-');
    return { 
        a: vals[0] ? deserializePoint(vals[0]) : nanPoint(), 
        b: vals[1] ? deserializePoint(vals[1]) : nanPoint()
    };    
};

// TODO validate edges in a level

export type {
    Level, Edge, Point
};
export {
    serialize, deserialize, nanPoint, isNaNpoint
};

// serialize testing
/*
const p1: Point = { x: 1, y: 2};
const p2: Point = { x: 3, y: 4};
const p3: Point = { x: 5, y: 6};
const p4: Point = { x: 7, y: 8};
const e1: Edge = { a: p1, b: p2 };
const e2: Edge = { a: p3, b: p4 };
const lvl: Level = {
    id: 0,
    name: 'test',
    size: 1,
    edges: [e1, e2]
};

console.log(lvl);
const s = serialize(lvl);
console.log();
console.log(s);
console.log();
const ds = deserialize(s);
console.log(ds);
console.log(ds.edges[0]);
*/