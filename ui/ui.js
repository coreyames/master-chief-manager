const playerDivStr = '<div class="player"></div>';
const playerDiv = document.createElement('div')
playerDiv.innerHTML = playerDivStr;

const player = {};
player.x, player.y = 0, 0;
player.parentElement = null;

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        movePlayer(0, 0);
        const clickToMove = (e) => {
            console.log(e);
            if (e.target.tagName == 'BODY') return;
            e.target.insertBefore(playerDiv, e.target.firstChild);
            player.parentElement = e.target;             
        };
        addEventListener("click", clickToMove); 
    }
};

const movePlayer = (x, y) => {
    const el = document.getElementsByClassName('col').item(x).getElementsByClassName('row').item(9-y);
    el.insertBefore(playerDiv, el.firstChild);
    player.x = x; player.y = y;      
};

const removePlayer = () => {
   playerDiv.parentElement.removeChild(playerDiv);
}