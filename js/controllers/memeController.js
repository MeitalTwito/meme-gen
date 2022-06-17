'use strict'
console.log('meme controller loaded');

const LINESPACE = 1.5
var gCanvas
var gCtx
var gFont
var gIsDownload = false

function renderMeme() {
    var meme = getMeme()
    var lines = meme.lines
    var img = new Image()
    img.src = `assets/meme-img/${meme.selectedImgId}.jpg`;
    img.onload = () => {
        gCanvas.height = img.height * gCanvas.width / img.width //Support using various aspect-ratio of images
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        lines.forEach((line, idx) => {
            CheckIfNewLine(line, idx)
            drawLine(line, idx, meme.selectedLineIdx)
        })
    }
}

function drawText(line, posY) {
    // horisontal location 
    var MarginX = line.size / 2 // distance from right or left
    var x = gCanvas.width / 2 // defult: center
    switch (line.align) {
        case 'right':
            x = gCanvas.width - MarginX
            break;
        case 'left':
            x = MarginX
            break;
    }

    var marginY = line.size / 10 //position text at line vertical center
    var y = posY + line.size + marginY

    gCtx.textAlign = line.align
    gCtx.fillStyle = line.color
    gCtx.lineWidth = 2
    gCtx.font = `${line.size}px ${gFont}`;
    gCtx.fillText(line.txt, x, y);//Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(line.txt, x, y);//Draws (strokes) a given text at the given (x, y) position.
}

function drawLine(line, idx, slectedIdx) {
    var yStart = line.pos
    if (idx === slectedIdx && !gIsDownload) {
        gCtx.rect(0, yStart, gCanvas.width, line.size*LINESPACE)
        gCtx.stroke()
    }
    drawText(line, yStart)
}


function renderTextInput() { // Changes the text of a selected line while typing
    const elTxt = document.querySelector('[name=line-txt]')
    const txt = elTxt.value
    setLineTxt(txt)
    renderMeme()
}

function clearInputBox(ev){ // clears the input filed after submitting the text
    ev.preventDefault()
    const elTxt = document.querySelector('[name=line-txt]')
    elTxt.value = ''
}

function renderLineColor(value) {
    setLineColor(value)
    renderMeme()
}

function renderLineSize(direction) {
    setLineSize(direction)
    renderMeme()
}

function changeFont(value) {
    gFont = value
    renderMeme()
}

function onChangeLine() {
    changeLines()
    renderMeme()
}

function OnDeleteLine() {
    deleteLine()
    renderMeme()
}

function OnMoveLine(direction) {
    var line = getSelectedLine()
    moveLine(line, direction)
    renderMeme()
}

function alignText(value) {
    setLineAlignment(value)
    renderMeme()
}

function OnDownloadMeme(elLink) {
    removeSelection()
    var imgContent = gCanvas.toDataURL('image/jpeg')// image/jpeg the default format
    elLink.href = imgContent
}

function removeSelection() {
    gIsDownload = true
    renderMeme()
}


function OnSaveMeme() {
    saveMeme()
}

function renderUserMemes() {
    

    var memes = loadUserMemes()
    if (!memes) return

    var strHTMLs = []

    memes.forEach((meme, idx) => {
        var strHtml = `<div class="gallery-img }">
        <img onclick="OnMemeLoad(${idx})" src="assets/meme-img/${meme.selectedImgId}.jpg" alt="" srcset="">
        </div>`
        strHTMLs.push(strHtml)
    })

    var elUserMemes = document.querySelector('.gallery')
    elUserMemes.innerHTML = strHTMLs.join('')
    var elImgBox = document.querySelector('.img-box-container')
    elImgBox.classList.add('hidden')
    renderImgBox()  
    document.body.classList.add('modal-open');
}

function OnMemeLoad(idx) {
    setLoadedMeme(idx)
    renderMeme()
    var elImgBox = document.querySelector('.img-box-container')
    elImgBox.classList.remove('hidden')
    renderImgBox()  
    document.body.classList.remove('modal-open');
}

function onAddLine() {
    addLine()
    renderMeme()
}




