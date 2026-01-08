const playerDiv = document.createElement('div')
playerDiv.className = 'player';

const pxRatio = 6; 

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
};

const movePlayerToOffset = (e) => {
    console.log(e);
    playerDiv.style.left = e.offsetX;
    playerDiv.style.top = e.offsetY;
}

const movePlayer = (x_, y_) => {
    const x = parseInt(x_ / 10); 
    const y = parseInt(y_ / 10);
    const offsetX = x_ % 10; 
    const offsetY = y_ % 10; 
    movePlayerToCell(x, y);
    movePlayerToOffset({offsetX: offsetX*pxRatio, offsetY: offsetY*pxRatio});
}

const removePlayer = () => {
    playerDiv.parentElement.removeChild(playerDiv);
}

