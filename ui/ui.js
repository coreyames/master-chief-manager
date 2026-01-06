const playerDivStr = '<div class="player"></div>';
const playerDiv = document.createElement('div')
playerDiv.innerHTML = playerDivStr;

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        //console.log(document.getElementsByClassName("row0").item(0).childNodes.item(0));
        console.log(document.getElementsByClassName("row0").item(0).childNodes[1].appendChild(playerDiv));
        //console.log(output);
        
        //document.getElementsByClassName("row0").item(0);



    }
}

