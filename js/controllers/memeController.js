'use strict'
console.log('meme controller loaded');

const LINESPACE = 1.5
var gUserFont
var gCanvas
var gCtx
var gIsDownload = false
var gUserImg

function renderMeme() {

    var meme = getMeme()
    var lines = meme.lines
    if (!gUserImg) {
        var img = new Image()
        img.src = `assets/meme-img/${meme.selectedImgId}.jpg`;
        img.onload = () => {
            gCanvas.height = img.height * gCanvas.width / img.width // Support using various aspect-ratio of images
            gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img, starting point x, starting point y, width ,height
            renderLines(lines, meme)
        }
    } else {
        gCtx.drawImage(gUserImg, 0, 0, gCanvas.width, gCanvas.height) //img, starting point x, starting point y, width ,height 
        renderLines(lines, meme)
    }

}

function renderLines(lines, meme) {
    lines.forEach((line, idx) => {
        updateLinePos(line, idx)
        drawLine(line, idx, meme.selectedLineIdx)
    })
}

// These function render the meme text lines and selection rectangle 
function drawText(line, posY) {
    // horisontal location 
    var marginX = line.size / 2 // sets line margin on x 
    var x = gCanvas.width / 2 // defult: center

    switch (line.align) {
        case 'right':
            x = gCanvas.width - marginX
            break;
        case 'left':
            x = marginX
            break;
    }

    var marginY = line.size / 10 // position text at line vertical center
    var y = posY + line.size + marginY

    if (!gUserFont) {
        gCtx.font = `${line.size}px impact`
    } else {
        gCtx.font = `${line.size}px ${gUserFont}`

    }

    gCtx.textAlign = line.align
    gCtx.fillStyle = line.color
    gCtx.lineWidth = 2
    gCtx.fillText(line.txt, x, y);//Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(line.txt, x, y);//Draws (strokes) a given text at the given (x, y) position.
}

function drawLine(line, idx, slectedIdx) {
    var yStart = line.pos
    if (idx === slectedIdx && !gIsDownload) {
        gCtx.rect(0, yStart, gCanvas.width, line.size * LINESPACE)
        gCtx.stroke()
    }
    drawText(line, yStart)
}


// thses functions handles user input
function renderTextInput() { // Changes the text of a selected line while typing
    const elTxt = document.querySelector('[name=line-txt]')
    const txt = elTxt.value
    setLineTxt(txt)
    renderMeme()
}

function clearInputBox(ev) { // clears the input filed after submitting the text
    ev.preventDefault()
    const elTxt = document.querySelector('[name=line-txt]')
    elTxt.value = ''
}


// these functions handle user text prefrences 
function renderLineColor(value) {
    setLineColor(value)
    renderMeme()
}

function renderLineSize(direction) {
    setLineSize(direction)
    renderMeme()
}

function changeFont(value) {
    gUserFont = value
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

function onAddEmoji(emoji){
    console.log('adding emoji');
    addEmoji(emoji)
    renderMeme()
}

// these functions handle downloading, sharing and uploading memes 
function OnDownloadMeme() {
    _hideSelectionBorder()
    setTimeout(() => {
        const imgContent = gCanvas.toDataURL('image/jpeg')// image/jpeg the default format
        const link = document.createElement('a')
        link.href = imgContent
        link.download = 'my-meme.jpg'
        link.click()
    }, 1000);

    setTimeout(() => {
        _showSelectionBorder()
    }, 3000);
}

function _hideSelectionBorder() {
    gIsDownload = true
    renderMeme()
}

function _showSelectionBorder() {
    gIsDownload = false
    renderMeme()
}


function onImgInput(ev) {
    loadImageFromInput(ev, setUserImg)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    //After we read the file
    reader.onload = function (event) {
        var img = new Image()// Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        //Run the callBack func , To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function setUserImg(img) {
    gUserImg = img
    renderMeme()
}

function onShareMeme() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");// Gets the canvas content as an image format

    //Encode the instance of certain characters in the url
    const link = document.createElement('a')
        // A function to be called if request succeeds
        function onSuccess(uploadedImgUrl) {
            //Encode the instance of certain characters in the url
            const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
            const link = document.createElement('a')
            link.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}"`
            link.target = '_blank'
            link.open = `https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`
            link.click()
            console.log(encodedUploadedImgUrl);
        }
        //Send the image to the server
        doUploadImg(imgDataUrl, onSuccess);
}



function doUploadImg(imgDataUrl, onSuccess) {
    //Pack the image for delivery
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    //Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })   //Gets the result and extract the text/ url from it
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            //Pass the url we got to the callBack func onSuccess, that will create the link to facebook
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}


function _resetUserImg() {
    gUserImg = null
}

// these functions handle saving and loading of memes 
function OnSaveMeme() {
    saveMeme()
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




