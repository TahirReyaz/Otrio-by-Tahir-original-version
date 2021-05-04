var gameDiv = document.getElementById("gameDiv");
var radioTwo = document.getElementById("radioTwo");
var radioThree = document.getElementById("radioThree");
var radioFour = document.getElementById("radioFour");
var formTwo = document.getElementById("twoPform")
var formThree = document.getElementById("threePform")
var formFour = document.getElementById("fourPform")
var playerNameDiv = document.getElementById("playerName");
var winDiv = document.getElementById("winDiv");
var winnerName = document.getElementById("winnerName");
var blueRing = document.getElementById("blueRing");
var redRing = document.getElementById("redRing");
var yellowRing = document.getElementById("yellowRing");
var greenRing = document.getElementById("greenRing");
var blueDot = document.getElementById("blueDot");
var redDot = document.getElementById("redDot");
var yellowDot = document.getElementById("yellowDot");
var greenDot = document.getElementById("greenDot");
var pname = document.getElementById("pname");
var i, j, winnerCount = 0, p1win = 0, p2win = 0;
var bigRingArray= new Array(12), smallRingArray= new Array(12), dotArray= new Array(12);
var dragTarget, bp, rp, yp, gp, currentPname, currentPNum, enabledColor, enabledColor2;
var winners = new Array(3), playerNumber, p1name= undefined, p2name= undefined, winColour, winColour2 = "a";

// For creating and assigning the pieces into an array
for(i=0; i<12; i++)
{
    // Blue pieces
    if(i<3)
    {
        bigRingArray[i] =  blueRing.cloneNode(true);
        bigRingArray[i].className = "bigRing";
        smallRingArray[i] =  blueRing.cloneNode(true);
        smallRingArray[i].className = "smallRing";
        dotArray[i] =  blueDot.cloneNode(true);
        dotArray[i].className = "dot";
        // Set their IDs
        bigRingArray[i].id= "bPieceB" + i;
        smallRingArray[i].id= "sPieceB" + i;
        dotArray[i].id= "dPieceB" + i;
    }
    // Red pieces
    else if(i>=3 && i<6)
    {
        bigRingArray[i] =  redRing.cloneNode(true);
        bigRingArray[i].className = "bigRing";
        smallRingArray[i] =  redRing.cloneNode(true);
        smallRingArray[i].className = "smallRing";
        dotArray[i] =  redDot.cloneNode(true);
        dotArray[i].className = "dot";
        // Set their IDs
        bigRingArray[i].id= "bPieceR" + (i % 3);
        smallRingArray[i].id= "sPieceR" + (i % 3);
        dotArray[i].id= "dPieceR" + (i % 3);
    }
    // Yellow pieces
    else if(i>=6 && i<9)
    {
        bigRingArray[i] =  yellowRing.cloneNode(true);
        bigRingArray[i].className = "bigRing";
        smallRingArray[i] =  yellowRing.cloneNode(true);
        smallRingArray[i].className = "smallRing";
        dotArray[i] =  yellowDot.cloneNode(true);
        dotArray[i].className = "dot";
        // Set their IDs
        bigRingArray[i].id= "bPieceY" + (i % 3);
        smallRingArray[i].id= "sPieceY" + (i % 3);
        dotArray[i].id= "dPieceY" + (i % 3);
    }
    // Green pieces
    else if(i>=9 && i<12)
    {
        bigRingArray[i] =  greenRing.cloneNode(true);
        bigRingArray[i].className = "bigRing";
        smallRingArray[i] =  greenRing.cloneNode(true);
        smallRingArray[i].className = "smallRing";
        dotArray[i] =  greenDot.cloneNode(true);
        dotArray[i].className = "dot";
        // Set their IDs
        bigRingArray[i].id= "bPieceG" + (i % 3);
        smallRingArray[i].id= "sPieceG" + (i % 3);
        dotArray[i].id= "dPieceG" + (i % 3);
    }
}
blueRing.remove();
redRing.remove();
yellowRing.remove();
greenRing.remove();
blueDot.remove();
redDot.remove();
yellowDot.remove();
greenDot.remove();

// For creating the grid blocks, appending them in the gameDiv and positioning the pieces to their initila location
for(i=0; i<5; i++)
{
    for(j=0; j<5; j++)
    {
        var pieceHolder = document.createElement("div");
        pieceHolder.className= "pieceHolder";
        pieceHolder.id = i + "," + j;
        gameDiv.appendChild(pieceHolder);
        /////////////////////////Hiding the corner blocks/////////////////////////////////
        if(i == 0 && j == 0)    
            pieceHolder.className="noBlock";
        else if(i == 0 && j == 4)    
            pieceHolder.className="noBlock";
        else if(i == 4 && j == 4)    
            pieceHolder.className="noBlock";
        else if(i == 4 && j == 0)    
            pieceHolder.className="noBlock";
        ////////////////////////////Setting the drop property of the center blocks//////////
        else if(i > 0 && j > 0 && i < 4 && j < 4)    
            {
                pieceHolder.ondrop=drop;
                pieceHolder.ondragover=allowDrop;
                pieceHolder.ondragenter=enterTheDragOn;
                pieceHolder.ondragleave=enterTheDragOff;
            }
        ////////////////////////////Placing the pieces to their initial position////////////
        // Blue pieces
        else if(i == 0 && j == 1)    
        {
            pieceHolder.appendChild(bigRingArray[0]);
            pieceHolder.appendChild(smallRingArray[0]);
            pieceHolder.appendChild(dotArray[0]);
        }
        else if(i == 0 && j == 2)    
        {
            pieceHolder.appendChild(bigRingArray[1]);
            pieceHolder.appendChild(smallRingArray[1]);
            pieceHolder.appendChild(dotArray[1]);
        }
        else if(i == 0 && j == 3)    
        {
            pieceHolder.appendChild(bigRingArray[2]);
            pieceHolder.appendChild(smallRingArray[2]);
            pieceHolder.appendChild(dotArray[2]);
        }
        // Red pieces
        else if(i == 1 && j == 4)    
        {
            pieceHolder.appendChild(bigRingArray[3]);
            pieceHolder.appendChild(smallRingArray[3]);
            pieceHolder.appendChild(dotArray[3]);
        }
        else if(i == 2 && j == 4)    
        {
            pieceHolder.appendChild(bigRingArray[4]);
            pieceHolder.appendChild(smallRingArray[4]);
            pieceHolder.appendChild(dotArray[4]);
        }
        else if(i == 3 && j == 4)    
        {
            pieceHolder.appendChild(bigRingArray[5]);
            pieceHolder.appendChild(smallRingArray[5]);
            pieceHolder.appendChild(dotArray[5]);
        }
        // Yellow pieces
        else if(i == 4 && j == 2)    
        {
            pieceHolder.appendChild(bigRingArray[6]);
            pieceHolder.appendChild(smallRingArray[6]);
            pieceHolder.appendChild(dotArray[6]);
        }
        else if(i == 4 && j == 1)    
        {
            pieceHolder.appendChild(bigRingArray[7]);
            pieceHolder.appendChild(smallRingArray[7]);
            pieceHolder.appendChild(dotArray[7]);
        }
        else if(i == 4 && j == 3)    
        {
            pieceHolder.appendChild(bigRingArray[8]);
            pieceHolder.appendChild(smallRingArray[8]);
            pieceHolder.appendChild(dotArray[8]);
        }
        // Green pieces
        else if(i == 3 && j == 0)    
        {
            pieceHolder.appendChild(bigRingArray[9]);
            pieceHolder.appendChild(smallRingArray[9]);
            pieceHolder.appendChild(dotArray[9]);
        }
        else if(i == 2 && j == 0)    
        {
            pieceHolder.appendChild(bigRingArray[10]);
            pieceHolder.appendChild(smallRingArray[10]);
            pieceHolder.appendChild(dotArray[10]);
        }
        else if(i == 1 && j == 0)    
        {
            pieceHolder.appendChild(bigRingArray[11]);
            pieceHolder.appendChild(smallRingArray[11]);
            pieceHolder.appendChild(dotArray[11]);
        }
    }
}

function disablePiece()
{
for(i=0; i<12; i++)
{
    // Big rings
    if((bigRingArray[i].id[6] == enabledColor || bigRingArray[i].id[6] == enabledColor2) && bigRingArray[i].id[6] != winColour && bigRingArray[i].id[6] != winColour2)
        bigRingArray[i].setAttribute("draggable",true);
    else 
        bigRingArray[i].setAttribute("draggable",false);
    // Small Rings
    if((smallRingArray[i].id[6] == enabledColor || smallRingArray[i].id[6] == enabledColor2) && smallRingArray[i].id[6] != winColour && smallRingArray[i].id[6] != winColour2)
        smallRingArray[i].setAttribute("draggable",true);
    else 
        smallRingArray[i].setAttribute("draggable",false);
    // Dots
    if((dotArray[i].id[6] == enabledColor || dotArray[i].id[6] == enabledColor2) && dotArray[i].id[6] != winColour && dotArray[i].id[6] != winColour2)
        dotArray[i].setAttribute("draggable",true);
    else 
        dotArray[i].setAttribute("draggable",false);
}
}

function allowDrop(event) 
{
    event.preventDefault();
}
function dragStart(event)
{
    dragTarget= event.target;
}
function enterTheDragOn(event)
{
    if(event.target.id[1]== ",")
       event.target.className = "dragOn";
    else if (event.target.id[1] == "P")
       event.target.parentNode.className = "dragOn";
}
function enterTheDragOff(event)
{
    if(event.target.id[1]== ",")
       event.target.className = "pieceHolder";
    else if (event.target.id[1] == "P")
       event.target.parentNode.className = "pieceHolder";
}
function drop(event)
{
    var permission = true;
    // Check if the drop target is a block div
    if(event.target.id[1]== ",")
    {
        for(i=0; i<event.target.childNodes.length; i++)
            if(event.target.childNodes[i].id[0] == dragTarget.id[0])
                permission = false;
        if(permission)
        {
            event.target.appendChild(dragTarget);
            event.target.className = "pieceHolder";    
            dragTarget.setAttribute("draggable",false);
        }
    }
    // Check if the drop target is another game piece
    else if (event.target.id[1] == "P")
    {
        // Check if a piece of same category is already present the block
        for(i=0; i<event.target.parentNode.childNodes.length; i++)
            if(event.target.parentNode.childNodes[i].id[0] == dragTarget.id[0])
                permission = false;
        // If permission is given then drop the drop piece
        if(permission)
        {
            event.target.parentNode.appendChild(dragTarget);
            event.target.parentNode.className = "pieceHolder";    
            dragTarget.setAttribute("draggable",false);
        }
    }
    winCheck();
    if(playerNumber == 2)
    {
        if(currentPname == p1name)
        {
            currentPname = p2name;
            enabledColor = "R";
            enabledColor2 = "G";
        }
        else
        {
            currentPname = p1name;
            enabledColor = "B";
            enabledColor2 = "Y";
        }
    }
    else
    {
        // Blue
        if(dragTarget.id[6] == "B")
        {
            if(winColour != "R" && winColour2 != "R")
            {
                currentPname = rp;
                enabledColor = "R";
            }
            else if(winColour != "Y" && winColour2 != "Y")
            {
                currentPname = yp;
                enabledColor = "Y";    
            }
            else if(winColour != "G" && winColour2 != "G" && playerNumber != 3)
            {
                currentPname = gp;
                enabledColor = "G";
            }
        }
        // Red
        else if(dragTarget.id[6] == "R")
        {
            if(winColour != "Y" && winColour2 != "Y")
            {
                currentPname = yp;
                enabledColor = "Y";
            }
            else if(winColour != "G" && winColour2 != "G" && playerNumber != 3)
            {
                currentPname = gp;
                enabledColor = "G";
            }
            else if(winColour != "B" && winColour2 != "B")
            {
                currentPname = bp;
                enabledColor = "B";    
            }
        }
        // Yellow
        else if(dragTarget.id[6] == "Y")
        {
            if(winColour != "G" && winColour2 != "G" && playerNumber != 3)
            {
                currentPname = gp;
                enabledColor = "G";
            }
            else if(winColour != "B" && winColour2 != "B")
            {
                currentPname = bp;
                enabledColor = "B";    
            }
            else if(winColour != "R" && winColour2 != "R")
            {
                currentPname = rp;
                enabledColor = "R";
            }
        }
        // Green
        else if(dragTarget.id[6] == "G")
        {
            if(winColour != "B" && winColour2 != "B")
            {
                currentPname = bp;
                enabledColor = "B";    
            }
            else if(winColour != "R" && winColour2 != "R")
            {
                currentPname = rp;
                enabledColor = "R";
            }
            else if(winColour != "Y" && winColour2 != "Y")
            {
                currentPname = yp;
                enabledColor = "Y";
            }
        }
    }
    disablePiece();
    pname.innerHTML= currentPname +"\'s Turn";
}

// This is the most complex part of this game till now (it won't look good, too messy)
function winCheck()
{
    var point=0, decPoint = 0;
    var targetParentBlock= dragTarget.parentNode, checkBlock;
    var y = targetParentBlock.id[0], x = targetParentBlock.id[2];

    //////////////////BLOCK COMPLETELY////////////////////////////////////////
    // Check if the block is completely filled by the pieces of same colour
    for(i=0; i<targetParentBlock.childNodes.length; i++)
        if(targetParentBlock.childNodes[i].id[6] == dragTarget.id[6])
            point++;
    if(point == 3)
        winDisplay();
    point= 0;

    ////////////////////ROW, COLUMN OR DIAGONAL WITH SAME SIZE/////////////////
    // Check if the row is filled with the same kind of piece of same colour
    for(i=1; i<4; i++)
    {
        checkBlock = document.getElementById(y + "," + i);
        for(j=0; j<checkBlock.childNodes.length; j++)
            if(checkBlock.childNodes[j].id[0] == dragTarget.id[0] && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
                point++;
    }  
    if(point == 3)
        winDisplay();
    point = 0;
    // Check if the column is filled with the same kind of piece of same colour
    for(i=1; i<4; i++)
    {
        checkBlock = document.getElementById(i + "," + x);
        for(j=0; j<checkBlock.childNodes.length; j++)
        {
            if(checkBlock.childNodes[j].id[0] == dragTarget.id[0] && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
                point++;
            else if(checkBlock.childNodes[j].id[0] == dragTarget.id[0] && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
                point++;
        }
    }  
    if(point == 3)
        winDisplay();
    point = 0;
    // Check if the left diagonal is filled with the same kind of piece of same colour
    for(i=1; i<4; i++)
    {
        checkBlock = document.getElementById(i + "," + i);
        for(j=0; j<checkBlock.childNodes.length; j++)
            if(checkBlock.childNodes[j].id[0] == dragTarget.id[0] && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
                point++;
    }  
    if(point == 3)
        winDisplay();
    point = 0;
    // Check if the right diagonal is filled with the same kind of piece of same colour
    for(i=1; i<4; i++)
    {
        for(k=1; k<4; k++)
        {
            if(i+k == 4)
            {
                checkBlock = document.getElementById(i + "," + k);
                for(j=0; j<checkBlock.childNodes.length; j++)
                if(checkBlock.childNodes[j].id[0] == dragTarget.id[0] && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
                    point++;
            }
        }
    }  
    if(point == 3)
        winDisplay();
    point = 0;  

    ///////////////////ROW DIAGONAL OR COLUMN WITH INCREASING OR DECREASING SIZE/////////////////////
    // Check if the row is filled with pieces of same colour and increasing or decreasing size
    checkBlock = document.getElementById(y + "," + 1);
    for(j=0; j<checkBlock.childNodes.length; j++)
    {
        if(checkBlock.childNodes[j].id[0] == "d" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            point++;
        if(checkBlock.childNodes[j].id[0] == "b" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            decPoint++;
    }
    checkBlock = document.getElementById(y + "," + 2);
    for(j=0; j<checkBlock.childNodes.length; j++)
        if(checkBlock.childNodes[j].id[0] == "s" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
        {
            point++;
            decPoint++;
        }   
    checkBlock = document.getElementById(y + "," + 3);
    for(j=0; j<checkBlock.childNodes.length; j++)
    {
        if(checkBlock.childNodes[j].id[0] == "b" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            point++;
        if(checkBlock.childNodes[j].id[0] == "d" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            decPoint++;
    }
    if(point == 3 || decPoint == 3)
        winDisplay();
    point = 0;
    decPoint = 0;
    // Check if the column is filled with pieces of same colour and increasing size
    checkBlock = document.getElementById(1 + "," + x);
    for(j=0; j<checkBlock.childNodes.length; j++)
    {
        if(checkBlock.childNodes[j].id[0] == "d" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            point++;
        if(checkBlock.childNodes[j].id[0] == "b" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            decPoint++;
    }
    checkBlock = document.getElementById(2 + "," + x);
    for(j=0; j<checkBlock.childNodes.length; j++)
        if(checkBlock.childNodes[j].id[0] == "s" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
        {
            point++;
            decPoint++;
        }   
    checkBlock = document.getElementById(3 + "," + x);
    for(j=0; j<checkBlock.childNodes.length; j++)
    {
        if(checkBlock.childNodes[j].id[0] == "b" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            point++;
        if(checkBlock.childNodes[j].id[0] == "d" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            decPoint++;
    }
    if(point == 3 || decPoint == 3)
        winDisplay();
    point = 0;
    decPoint = 0;
    // Check if the left diagonal is filled with pieces of same colour and increasing size
    checkBlock = document.getElementById(1 + "," + 1);
    for(j=0; j<checkBlock.childNodes.length; j++)
    {
        if(checkBlock.childNodes[j].id[0] == "d" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            point++;
        if(checkBlock.childNodes[j].id[0] == "b" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            decPoint++;
    }
    checkBlock = document.getElementById(2 + "," + 2);
    for(j=0; j<checkBlock.childNodes.length; j++)
        if(checkBlock.childNodes[j].id[0] == "s" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
        {
            point++;
            decPoint++;
        }   
    checkBlock = document.getElementById(3 + "," + 3);
    for(j=0; j<checkBlock.childNodes.length; j++)
    {
        if(checkBlock.childNodes[j].id[0] == "b" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            point++;
        if(checkBlock.childNodes[j].id[0] == "d" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            decPoint++;
    }
    if(point == 3 || decPoint == 3)
        winDisplay();
    point = 0;
    decPoint = 0;
    // Check if the right diagonal is filled with pieces of same colour increasing size
    checkBlock = document.getElementById(1 + "," + 3);
    for(j=0; j<checkBlock.childNodes.length; j++)
    {
        if(checkBlock.childNodes[j].id[0] == "d" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            point++;
        if(checkBlock.childNodes[j].id[0] == "b" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            decPoint++;
    }
    checkBlock = document.getElementById(2 + "," + 2);
    for(j=0; j<checkBlock.childNodes.length; j++)
        if(checkBlock.childNodes[j].id[0] == "s" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
        {
            point++;
            decPoint++;
        }   
    checkBlock = document.getElementById(3 + "," + 1);
    for(j=0; j<checkBlock.childNodes.length; j++)
    {
        if(checkBlock.childNodes[j].id[0] == "b" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            point++;
        if(checkBlock.childNodes[j].id[0] == "d" && checkBlock.childNodes[j].id[6] == dragTarget.id[6])
            decPoint++;
    }
    if(point == 3 || decPoint == 3)
        winDisplay();
    point = 0;
    decPoint = 0;
}

function winDisplay()
{
    // For disabling the winning player
    if(currentPNum == playerNumber)
        winColour = dragTarget.id[6];
    else if(currentPNum == (playerNumber - 1))
        winColour2 = dragTarget.id[6];
    // For noting the winning player's names
    if(currentPname == p1name)
        p1win++;
    else if(currentPname == p2name)
        p2win++;
    winners[winnerCount] = currentPname;
    winnerCount++;
    currentPNum--;
    // When the game is over
    if(playerNumber == 2 && (p1win == 2 || p2win == 2))
    {
        if(p1win == 2)
            winners[0] = p1name;
        else
            winners[0] = p2name;
        winnerName.innerHTML = winners[0] + " is the winner";
        winDiv.className = "box";
        pname.className = "hideDiv";
        gameDiv.className = "hideDiv";
    }
    else if(winnerCount == (playerNumber - 1) && playerNumber != 2)
    {
        winnerName.innerHTML = "Winner Ranks:<br>";
        for(i=0; i<playerNumber-1; i++)
            winnerName.innerHTML +=  (i + 1) + ". " + winners[i] + "<br>";
        winDiv.className = "box";
        pname.className = "hideDiv";
        gameDiv.className = "hideDiv";
    }
}

function submitForm(){
    gameDiv.className="gameDiv";
    //Name of players
    bp=document.getElementById("bpName").value;
    rp=document.getElementById("rpName").value;
    yp=document.getElementById("ypName").value;
    if(playerNumber == 4)
        gp=document.getElementById("gpName").value;
    currentPname = bp;
    playerNameDiv.className = "box";
    pname.innerHTML= currentPname +"\'s Turn";
    document.getElementById("formDiv").remove();
    enabledColor = "B";
    disablePiece();
}

function submitForm2p(){
    gameDiv.className="gameDiv";
    //Name of players
    p1name=document.getElementById("p1name").value;
    p2name=document.getElementById("p2name").value;
    currentPname = p1name;
    playerNameDiv.className = "box";
    pname.innerHTML= currentPname +"\'s Turn";
    document.getElementById("formDiv").remove();
    enabledColor = "B";
    enabledColor2 = "Y";
    disablePiece();
}

function submitNumbers()
{
    if(radioTwo.checked)
    {
        playerNumber = 2;
        formTwo.className = "box";
    }
    else if(radioThree.checked)
    {
        playerNumber = 3;
        formThree.className = "box";
    }
    else
    {
        playerNumber = 4;
        formFour.className = "box";
    }
    currentPNum = playerNumber;
    document.getElementById("playerNumber").remove();
}