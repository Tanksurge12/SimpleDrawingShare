//MAIN CODE
var dropDownItems={};

var isMouseDown = false;
var curX;
var curY;
var initX;
var initY;
var initCrds;
var crds1;
var moved = false;
var prevX;
var prevY;
var i = 0;
var curPosX;
var curPosY;
var canvasW = 800;
var canvasH = 375;
var LIvisible;
var dSvisible;
var toI = 1;
var strtX;
var strtY;

var drawingSquare = false;
var drawingCircle = false;
var drawingLine = true;

//UNIV CODE

function showItems(listParent) {
    /*list parent is the name of the item that contains all the items in the list. its also a class*/
    var dropdowns = document.getElementsByClassName(listParent);
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        openDropdown.classList.toggle("show");
    }
}

function loadPage(page) {//use class name (the page name with "page" at the end: mainpage, infopage,contactpage.
    alert(page);
    var elements = document.getElementsByTagName("page");
    
    for (i = 0; i < elements.length; i++) {
        alert(elements[i]);
    }
    for (i = 0; i < elements.length; i++) {
        pages = elements[i];
        if(pages.class !== page) {
            pages.style.visibility = "hidden";
            alert(pages.style.visibility);
        } else {
            document.getElementById(page).style.visibility="visible";
        }
    }
}

function startApp() {
    document.getElementById("mainPage").style.visibility="hidden";
    document.getElementById("appInfoPage").style.visibility="hidden";
    document.getElementById("contactPage").style.visibility="hidden";
    document.getElementById("drawingApp").style.visibility="visible";
    document.getElementById("body")
}

//MAIN PAGE


//DRAWING APP

function mouseDown(event)
{
    strtX = event.pageX-10;
    strtY = event.pageY-84;
    initX = event.pageX-10;
    initY = event.pageY-84;
    prevX = event.pageX-10;
    prevY = event.pageY-84;
    isMouseDown = true;
    initCrds = initX +", "+ initY;
    updateCanvasSettings();
    saveLayout(getCurrentLayout());
}

function mouseUp()
{
    saveLayout(getCurrentLayout());
    i = 0;
    isMouseDown = false;
}

function mouseMove(event)
{
    if(isMouseDown === true)
    {
        c = document.getElementById("myCanvas"); 
        ctx = c.getContext("2d");
        i = i + 1;
        if (i === toI)
        {
            initX = prevX;
            initY = prevY;
            i = 0;
        }
        curX = event.pageX-10;
        curY = event.pageY-84;
        prevX = curX;
        prevY = curY;
        curPosX = event.pageX-10;
        curPosY = event.pageY-84;
        
        ctx.moveTo(curPosX,curPosY);
        if(drawingSquare === true)
        {
            var sqrClr = getValueByTextField("hex");
            drawSquare(strtX,strtY,curX,curY,sqrClr,sqrClr);
        }
        else if(drawingCircle === true)
        {
            drawCircle();
        }
        else if(drawingLine === true)
        {
            drawLine();
        }
    }
}

function clear()
{
    var c = document.getElementById("myCanvas"); 
    var ctx = c.getContext("2d");
    ctx.width = ctx.width;
    ctx.height = ctx.height;
    // var ctx = c.getContext("2d");
    // ctx.rect(0,0,800,375);
    // ctxstrokeRect();
    // ctx.clearRect(0,0,800,375);
    // alert(800 +", "+ 375);
}

function setLineIterations()
{
    toI = document.getElementById("itr").value;
}

function setLineWidth(Width)
{
    var c = document.getElementById("myCanvas"); 
    var ctx = c.getContext("2d");
    ctx.lineWidth = Width;
}

function getLineWidth()
{
    var c = document.getElementById("myCanvas"); 
    var ctx = c.getContext("2d");
    return ctx.lineWidth;
}

function getLineWidthByTextField(field)
{
    return document.getElementById(field).value;
}


function LIBtnClicked()
{
    if(LIvisible === true)
    {
        document.getElementById('LIinfo').style.visibility="hidden";
        LIvisible = false;
    }
    else
    {
        document.getElementById('LIinfo').style.visibility="visible";
        LIvisible = true;
    }
}

function getValueByTextField(field)
{
    return document.getElementById(field).value;
}

function changeColor(hexValue)
{
    var c = document.getElementById("myCanvas"); 
    var ctx = c.getContext("2d");
    ctx.strokeStyle = hexValue;
}

function updateCanvasSettings()
{
    changeColor(getValueByTextField("hex"));
    setLineWidth(getLineWidthByTextField("widthField"));
}

/*--------*\
|Overlaying|
\*--------*/

function getCurrentLayout() {
    var C = document.getElementById("myCanvas"); 
    var CTX = c.getContext("2d");
    return CTX;
}

function saveLayout(layout) {
    var lastSavedLayout = layout.save();
}

function restoreLastSavedLayout() {
    lastSavedLayout.restore();
}

/*-----*\
|Drawing|
\*-----*/

function drawSquare(x1,y1,x2,y2,border,fill) {
    drawingSquare = true;
    drawingCircle = false;
    drawingLine = false;
    checkIsDrawing();
    // restoreLastSavedLayout();
    
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    
    var w = x2-x1;
    var h = y2-y1;
    ctx.fillRect(x1,y1,w,h);
    ctx.fillStyle = fill;
    ctx.strokeStyle = border;
}

function drawCircle(x1,y1,x2,y2,border,fill) {
    drawingSquare = false;
    drawingCircle = true;
    drawingLine = false;
    checkIsDrawing();
    
    var c = document.getElementById("myCanvas"); 
    var ctx = c.getContext("2d");
    
    
}

function drawLine() {
    drawingSquare = false;
    drawingCircle = false;
    drawingLine = true;
    checkIsDrawing();
    
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 
    ctx.moveTo(initX,initY);
    ctx.lineTo(curX,curY);
    ctx.stroke();
}

function checkIsDrawing() {
    if(drawingSquare === true) {
        document.getElementById('drawingSquareTXT').style.visibility="visible";
        document.getElementById('drawingCircleTXT').style.visibility="hidden";
        document.getElementById('drawingLineTXT').style.visibility="hidden";
    }
    if(drawingCircle === true) {
        document.getElementById('drawingSquareTXT').style.visibility="hidden";
        document.getElementById('drawingCircleTXT').style.visibility="visible";
        document.getElementById('drawingLineTXT').style.visibility="hidden";
    }
    if(drawingLine === true) {
        document.getElementById('drawingSquareTXT').style.visibility="hidden";
        document.getElementById('drawingCircleTXT').style.visibility="hidden";
        document.getElementById('drawingLineTXT').style.visibility="visible";
    }
}
