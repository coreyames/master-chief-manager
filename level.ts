interface Level {
    id: number,
    name: string,
    size: number,
    edges: Edge[]
};

const serialize = (lvl: Level): string => {
    return "";
};

const deserialize = (value: string): Level => {
    return { id: 0, name: "", size: 1, edges: [] };
};

interface Point {
    id: number,
    x: number,
    y: number
};

const serializePoint = (p: Point): string => {
    return "";
};

const deserializePoint = (value: string): Point => {
    return { id: 0, x: 0, y: 0 };
}

interface Edge {
    id: number,
    a: Point,
    b: Point
};

const serializeEdge = (e: Edge): string => {
    return "";
};

const deserializeEdge = (value: string): Edge => {
    return { id: 0, a: { id: 0, x: 0, y: 0 }, b: { id: 0, x: 0, y: 0 } };    
};

export type {
    Level, Edge, Point
};

/*
const testLevelSerialize = () => {

}
*/
