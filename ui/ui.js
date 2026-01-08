const playerDiv = document.createElement('div')
playerDiv.className = 'player';

const player = {};
player.x, player.y = 0, 0;
player.parentElement = null;

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        
        const b = document.getElementsByTagName('BODY').item(0);        
        b.insertBefore(playerDiv, b.firstChild);
        const clickToMove = (e) => {
            console.log(e);
            if (e.target.tagName == 'BODY') return;
            e.target.insertBefore(playerDiv, e.target.firstChild);
            movePlayerToOffset(e);
            player.parentElement = e.target.parentElement;             
        };
        
        addEventListener("click", clickToMove); 
    }
};

const movePlayerToCell = (x, y) => {
    const el = document.getElementsByClassName('col').item(x).getElementsByClassName('row').item(9-y);
    el.insertBefore(playerDiv, el.firstChild);
    player.x = x; player.y = y;      
};

const movePlayerToOffset = (e) => {
    console.log(e.offsetX)
    console.log(e.offsetY)
    playerDiv.style.left = e.offsetX;
    playerDiv.style.top = e.offsetY;
}

const removePlayer = () => {
    playerDiv.parentElement.removeChild(playerDiv);
}

