'use strict'
console.log('main JS loaded');

var gFont
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function init() {
    gCanvas = document.getElementById('canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
    addListeners()
    gLineIdx = 0
    gUserMemes = []
    gFont = new FontFace('impact', 'url(../assets/fonts/impact.ttf)')
    gFont.load().then(function (font) {
        document.fonts.add(font)
        console.log('Font loaded')
        gFont = 'impact'
    })
    
}

//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}


function onDown(ev) {
    const pos = getEvPos(ev)
    // console.log(pos);
}

function onMove(ev) {
    const pos = getEvPos(ev)
    // console.log(pos);
}

function onUp() {
    // console.log('mouse up');
    
}

function getEvPos(ev) {

    //Gets the offset pos , the default pos
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (gTouchEvs.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}


function isLineClicked(clickedPos) {
    const { pos } = gCircle
    // Calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    //If its smaller then the radius of the circle we are inside
    return distance <= gCircle.size
}