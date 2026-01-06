const playerDivStr = '<div class="player"></div>';
const playerDiv = document.createElement('div')
playerDiv.innerHTML = playerDivStr;

const player = {};
player.x, player.y = 0, 0;


document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        movePlayer(0, 0);
    }
};

const movePlayer = (x, y) => {
    const e = document.getElementsByClassName('col').item(x).getElementsByClassName('row').item(9-y);
    console.log(e);
    e.insertBefore(playerDiv, e.firstChild);      
};