import * as Spartan from './spartan.ts';

// roster ----------
interface Roster  {
    id: number
    name: String,
    spartans: Spartan.Spartan[]    
};

const createRoster = (name: string, id: number): Roster => {
    let newRoster = { 
        id, 
        name, 
        spartans: [] 
    };
    return newRoster;
};

export {
    Roster, 
    createRoster
}