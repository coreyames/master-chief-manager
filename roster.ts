// roster ----------
interface Roster  {
    id: number
    name: String,
    spartans: number[]    
};

const createRoster = (name: string, id: number): Roster => {
    let newRoster = { 
        id, 
        name, 
        spartans: [] 
    };
    return newRoster;
};

export type {
    Roster,
}
export { 
    createRoster,
}
