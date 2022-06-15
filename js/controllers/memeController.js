'use strict'
console.log('meme controller loaded');
const MARGINX = 50
const MARGINY = 50

var gCanvas;
var gCtx;

function renderMeme() {
    var meme = getMeme()
    var lines = meme.lines
    var img = new Image()
    img.src = `essets/meme-img/${meme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        lines.forEach ((line, idx) => {
            drawText(line, idx)
        })
    }
}

function drawText(line, idx) {
    var text = line.txt
    var textAlignment = line.align
    gCtx.textAlign = textAlignment;
    
    var x = gCanvas.width / 2
    switch (textAlignment) {
        case 'right':
            x = gCanvas.width - MARGINX
            break;
        case 'left':
            x = MARGINX
            break;
    }

    var y = (idx === 0) ? MARGINY : gCanvas.height - MARGINY*idx

    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px Arial`;
    gCtx.fillText(text, x, y);//Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y);//Draws (strokes) a given text at the given (x, y) position.
}


function renderTextInput(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=line-txt]')
    const txt = elTxt.value
    setLineTxt(txt)
    renderMeme()
    elTxt.value = ''
}

function renderLineColor(value){
    console.log(value);
    setLineColor(value)
    renderMeme()
}

function renderLineSize(direction) {
    setLineSize(direction)
    renderMeme()
}

function onChangeLine() {
    changeLines()
    renderMeme()
}

function downloadImg(elLink){
    var imgContent = gCanvas.toDataURL('image/jpeg')// image/jpeg the default format
    elLink.href = imgContent
}

function OnSaveMeme() {
    saveMeme()
}

function renderUserMemes() {
        
    var memes = loadUserMemes()

    var strHTMLs = []
    
    memes.forEach((meme, idx)=>{
        var strHtml = `<div class="gallery-img }">
        <img onclick="OnMemeLoad(${idx})" src="essets/meme-img/${meme.selectedImgId}.jpg" alt="" srcset="">
        </div>`
        strHTMLs.push(strHtml)
    })
 
    var elUserMemes = document.querySelector('.saved-memes')
    elUserMemes.innerHTML = strHTMLs.join('')
}


function OnMemeLoad(idx) {
    setLoadedMeme(idx)
    renderMeme()
}

function OnAddEmoji(value) {
    addEmoji(value)
    renderMeme()
}