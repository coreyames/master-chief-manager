// level ------------
interface Level {
    id: number,
    name: string,
    size: number,
    edges: Edge[]
};

const serialize = (lvl: Level): string => {
    let value = 'L:' + lvl.id + '.' + lvl.name + '.' + lvl.size + '.';
    for (const e of lvl.edges) {
        value += serializeEdge(e) + ',';
    }
    value = value.slice(0, value.length-1);
    value += ';'
    return value;
};

const deserialize = (value: string): Level => {
    let vals = value.slice(2, value.length-1).split('.');     
    return { 
        id: parseInt(vals[0]), 
        name: vals[1], 
        size: parseInt(vals[2]), 
        edges: vals[3].split(',').map(e => deserializeEdge(e)) 
    };
};

interface Point {
    x: number,
    y: number
};

const serializePoint = (p: Point): string => {
    return "(" + p.x + ',' + p.y + ")";
};

const deserializePoint = (value: string): Point => {
    const vals = value.slice(1, value.length-1).split(',');
    return { x: parseFloat(vals[0]), y: parseFloat(vals[0]) };
}

interface Edge {
    a: Point,
    b: Point
};

const serializeEdge = (e: Edge): string => {
    return '[' + serializePoint(e.a) + ',' + serializePoint(e.b) + ']';
};

const deserializeEdge = (value: string): Edge => {
    const vals = value.slice(1, value.length-1).split(',');
    return { a: deserializePoint(vals[0]), b: deserializePoint(vals[1]) };    
};

export type {
    Level, Edge, Point
};
export {
    serialize, deserialize
}

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

/*
const testLevelSerialize = () => {

}
*/