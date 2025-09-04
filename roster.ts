// roster ----------
interface Roster  {
    id: number
    name: String,
    spartans: number[]    
};

const createRoster = (name: string, id: number, spartanIds?: number[]): Roster => {
    let newRoster = { 
        id, 
        name, 
        spartans: spartanIds ? spartanIds : [] 
    };
    return newRoster;
};

const serialize = (roster: Roster): string => {
    let rStr = 'R:' + roster.id + '.' + roster.name; 
    let spStr = roster.spartans.toString();
    rStr += '.' + spStr + ';';
    return rStr;
}

const deserialize = (value: string): Roster => {
    const _value = value.substring(2, value.length - 1);
    const valueSplit = _value.split('.');
    const idStr = valueSplit[0];
    const id = parseInt(idStr);
    const name = valueSplit[1];
    const spStr = valueSplit[2];
    const spIdList: number[] = Array.from(spStr).filter(v => v != ',' ).map(v => parseInt(v) );
    return createRoster(name, id, spIdList);
}

export type {
    Roster,
}
export { 
    createRoster, serialize, deserialize
}
