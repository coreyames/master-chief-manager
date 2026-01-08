const playerDiv = document.createElement('div')
playerDiv.className = 'player';
playerDiv.style.position = 'fixed'

const pxRatio = 6;
const centeringOffsetX = 7;
const centeringOffsetY = 8;

const player = {
    x: 0, y: 0, // abstract coords 0-99, 0,99
    row: 0 , col: 0, // index of row in grid (grows top down)
    offsetX: 0, offsetY: 0 // px offset (for visual, values not coords) for grid cell
};

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        
        const b = document.getElementsByTagName('BODY').item(0);        
        b.insertBefore(playerDiv, b.firstChild);
       
        const clickToMove = (e) => {
            /*
            console.log(e);
            if (e.target.tagName == 'BODY') return;
            e.target.insertBefore(playerDiv, e.target.firstChild);
            movePlayerToOffset(e);
            */
            const coords = { x: 55, y: 55 };
            movePlayer(coords.x, coords.y);
        };
        
        addEventListener("click", clickToMove); 
    }
};

const movePlayerToCell = (x, y) => {
    const el = document.getElementsByClassName('col').item(x).getElementsByClassName('row').item(9-y);
    el.insertBefore(playerDiv, el.firstChild);
    player.row = 9-y; 
    player.col = x;
};

const movePlayerToOffset = (e) => {   
    playerDiv.style.left = e.offsetX;
    playerDiv.style.top  = e.offsetY;

    player.offsetX = e.offsetX;
    player.offsetY = e.offsetY;
}

const movePlayer = (x_, y_) => {
    playerDiv.style.position = 'relative';
    player.x = x_;
    player.y = y_;
    const x = parseInt(x_ / 10); 
    const y = parseInt(y_ / 10);
    const offsetX = x_ % 10; 
    const offsetY = y_ % 10; 
    const adjusted_offsetX = (pxRatio * offsetX) - centeringOffsetX; 
    const adjusted_offsetY = (pxRatio * offsetY) - centeringOffsetY; 
    movePlayerToCell(x, y);
    movePlayerToOffset({offsetX: adjusted_offsetX , offsetY: adjusted_offsetY});
}

const removePlayer = () => {
    playerDiv.parentElement.removeChild(playerDiv);
}

