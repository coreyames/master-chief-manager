const playerDivStr = '<div class="player"></div>';
const playerDiv = document.createElement('div')
playerDiv.innerHTML = playerDivStr;

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        const e = document.getElementsByClassName('row0').item(0).firstElementChild
        e.insertBefore(playerDiv, e.firstChild); 
    }
}

// dn = document.createElement(playerDivStr);


