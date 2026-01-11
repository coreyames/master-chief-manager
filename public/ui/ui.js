const playerDiv = document.createElement('div')
playerDiv.className = 'player';

const pxRatio = 6;

const centeringOffsetX = 6;
const centeringOffsetY = 7;

const player = {
    direction: { x: 0, y: 0 }, // x,y = -1 | 0 | 1 (with respect to positive abstract coords)

    x:      -1, y:      -1,     // abstract coords ([0,99], [0,99]), start negative for init 
    row:     0, col:     0,     // child index of row in grid (this grows top down)
    offsetXpx: 0, offsetYpx: 0  // caluculated pixel offset for within a grid cell
};

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        document.body.appendChild(playerDiv); 
        movePlayer(0,0);
        //getMatch();          
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
        player.direction.x = -1;
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
        player.direction.x = 0;
    }
};

addEventListener("keydown", onKeyDown); 
addEventListener("keyup", onKeyUp); 

const movePlayerToCell = (col, row) => {
    const el = document.getElementsByClassName('col').item(col).getElementsByClassName('row').item(row);
    el.appendChild(playerDiv);
    player.row = row; 
    player.col = col;
};

const movePlayerToOffset = (e) => {   
    playerDiv.style.left = e.offsetXpx;
    playerDiv.style.top  = e.offsetYpx;
    player.offsetXpx = e.offsetXpx;
    player.offsetYpx = e.offsetYpx;
};

const movePlayer = (x, y) => {
    // skip if no change or if trying to go out of bounds
    if (player.x == x && player.y == y) return;
    if ((x < 0 || x > 99) || (y < 0 || y > 99)) return;
    player.x = x;
    player.y = y;
    const col = parseInt(x / 10); 
    const row = 9-parseInt(y / 10);
    const offsetX = x % 10; 
    const offsetY = y % 10;
    const adjusted_offsetX = (pxRatio * offsetX) - centeringOffsetX; 
    const adjusted_offsetY = -(pxRatio * offsetY) - centeringOffsetY + 60; 
    movePlayerToCell(col, row);
    movePlayerToOffset({offsetXpx: adjusted_offsetX , offsetYpx: adjusted_offsetY});
};

const removePlayer = () => {
    playerDiv.parentElement.removeChild(playerDiv);
};

const gameTick = () => {
    const x = player.x + player.direction.x;
    const y = player.y + player.direction.y;
    movePlayer(x,y);
};

const getMatch = async () => {
    const res = await fetch('http://localhost:3030/match');
    if (!res.ok) {
        throw new Error(`Response Status: ${res.status}`)
    }   
    const match = await res.json();
    const idDiv = document.getElementsByClassName('info match-id').item(0);
    const playersDiv = document.getElementsByClassName('info players').item(0);
    const logDiv = document.getElementsByClassName('info log').item(0);
    idDiv.textContent = idDiv.textContent + match.id;
    playersDiv.textContent = playersDiv.textContent + match.players[0].id;
    logDiv.textContent = match.log;
};

setInterval(gameTick, 100);