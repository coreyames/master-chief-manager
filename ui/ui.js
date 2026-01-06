const playerDivStr = '<div class="player"></div>';
const playerDiv = document.createElement('div')
playerDiv.innerHTML = playerDivStr;

const player = {};
player.x, player.y = 0, 0;

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        movePlayer(0, 0);
        const onClick = (e) => {
            movePlayer(5, 5);
        };
        addEventListener("click", onClick); 
    }
};

const movePlayer = (x, y) => {
    const prev = document.getElementsByClassName('player');
    const el = document.getElementsByClassName('col').item(x).getElementsByClassName('row').item(9-y);
    el.insertBefore(playerDiv, el.firstChild);
    if (prev.parentElement) prev.parentElement.removeChild(prev);
    player.x = x; player.y = y;      
};