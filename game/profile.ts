// profile ---------
type Profile = {
    id: number,
    name: string,
    rosterIds: number[],
    startDate: Date,
    saveDate: Date
};

// P:<id>.<name>.<ids,...>.<mm-dd-yyyy>.<mm-dd-yyyy>;
const serialize = (profile: Profile): string => {
    let pstr = 'P:' + profile.id + '.' + profile.name + '.'; 
    
    pstr += profile.rosterIds.toString() + '.';

    pstr += (profile.startDate.getMonth()+1) + '-'
        + (profile.startDate.getDate()) + '-' 
        + profile.startDate.getFullYear() + '.';

    pstr += (profile.saveDate.getMonth()+1) + '-'
        + (profile.saveDate.getDate()) + '-' 
        + profile.saveDate.getFullYear() + ';';
    
    return pstr;
};

const deserialize = (value: string): Profile => {
    let values = value.substring(2, value.length - 1).split('.');
    return ({
        id: parseInt(values[0]),
        name: values[1],
        rosterIds: Array.from(values[2]).filter(v => v != ',').map(v => parseInt(v)),
        startDate: new Date(values[3]),
        saveDate: new Date(values[4])
    });
};

export type {
    Profile,
};
export {
    serialize, deserialize
};

/*
const testProfileSerialize = () => {
    const newProfile = {
        id: 0,
        name: 'prof 1',
        rosterIds: [0, 1, 2], 
        startDate: new Date('01-01-2025'),
        saveDate: new Date('02-02-2025')
    };
    console.log('profile object');
    console.log(newProfile);
    const s = serialize(newProfile);
    console.log('serialized');
    console.log(s);
    console.log('desererialized');
    const ds = deserialize(s);
    console.log(ds);
};
*/