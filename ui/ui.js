const playerDivStr = '<div class="player"></div>';
const playerDiv = document.createElement('div')
playerDiv.innerHTML = playerDivStr;
const a2x = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4,
    'f': 5, 'g': 6, 'h': 7, 'i': 8, 'j': 9
};
const x2a = Object.fromEntries(Object.entries(a2x).map(([k,v]) => {
    return [v,k];
}));

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        const e = document.getElementsByClassName('colA').item(0).firstElementChild
        e.insertBefore(playerDiv, e.firstChild); 
    }
};

const movePlayer = (x, y) => {

};




