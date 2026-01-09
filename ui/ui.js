const playerDiv = document.createElement('div')
playerDiv.className = 'player';
playerDiv.style.position = 'fixed'

const pxRatio = 6;

const centeringOffsetX = 6;
const centeringOffsetY = 7;

const player = {
    direction: { x: 0, y: 0}, // x,y = -1 | 0 | 1

    x:       0, y:       0,   // abstract coords 0-99, 0,99
    row:     0, col:     0,   // index of row in grid (this grows top down)
    offsetX: 0, offsetY: 0    // caluculated pixel offset grid cell
};

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        document.body.appendChild(playerDiv); 
        movePlayer(0,0);          
    }
};

const onKeyDown = (e) => {
    if (e.key == 'ArrowUp') {
        player.direction.y = 1;
    } else if (e.key == 'ArrowDown') {
        player.direction.y = -1;
    } else if (e.key == 'ArrowRight') {
        player.direction.x = 1;
    } else if (e.key == 'ArrowLeft') {
        player.direction.y = -1;
    }
};

const onKeyUp = (e) => {
    if (e.key == 'ArrowUp') {
        player.direction.y = 0;
    } else if (e.key == 'ArrowDown') {
        player.direction.y = 0;
    } else if (e.key == 'ArrowRight') {
        player.direction.x = 0;
    } else if (e.key == 'ArrowLeft') {
        player.direction.y = 0;
    }
}

addEventListener("keydown", onKeyDown); 
addEventListener("keyup", onKeyUp); 

const movePlayerToCell = (x, y) => {
    const el = document.getElementsByClassName('col').item(x).getElementsByClassName('row').item(9-y);
    el.appendChild(playerDiv);
    player.row = 9-y; 
    player.col = x;
};

const movePlayerToOffset = (e) => {   
    playerDiv.style.left = e.offsetX;
    playerDiv.style.top  = e.offsetY;
    player.offsetX = e.offsetX;
    player.offsetY = e.offsetY;
};

const movePlayer = (x_, y_) => {
    playerDiv.style.position = 'relative';
    player.x = x_;
    player.y = y_;
    const x = parseInt(x_ / 10); 
    const y = parseInt(y_ / 10);
    const offsetX = x_ % 10; 
    const offsetY = y_ % 10;
    const adjusted_offsetX = (pxRatio * offsetX) - centeringOffsetX; 
    const adjusted_offsetY = (pxRatio * offsetY) - centeringOffsetY + 60; 
    movePlayerToCell(x, y);
    movePlayerToOffset({offsetX: adjusted_offsetX , offsetY: adjusted_offsetY});
};

const removePlayer = () => {
    playerDiv.parentElement.removeChild(playerDiv);
};

