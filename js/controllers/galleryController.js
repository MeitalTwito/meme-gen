'use strict'
console.log('gallery controller loaded');


// this function renders the new meme gallery
function renderGallery() {
    var imgs = getImgsToDisplay()

    var strHTMLs = imgs.map(img =>
        `<div class="gallery-img img${img.id}">
        <img onclick="onImgSelect(${img.id})" src="${img.url}" alt="" srcset="">
        </div>`
        
    )

    var elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTMLs.join('')
}

function renderEmojiBar() {
    var emojis = getEmojis()

    var strHTMLs = emojis.map(emoji =>
        `<li class="emoji-btn" onclick="onAddEmoji('${emoji}')">${emoji}</li>`
        
    )

    var elGallery = document.querySelector('.emoji-bar')
    elGallery.innerHTML = strHTMLs.join('')
}

// this function renders the img gallery for the editor
function renderImgBox() {
    var imgs = getImgsToDisplay()

    var strHTMLs = imgs.map(img =>
        `<div class="img-box img${img.id}">
        <img onclick="onChangeImg(${img.id})" src="${img.url}" alt="" srcset="">
        </div>`
    )

    var elGallery = document.querySelector('.img-box-container')
    elGallery.innerHTML = strHTMLs.join('')
}

// this function renders the user saved memes gallery
function renderUserMemes() {
    var memes = loadUserMemes()
    if (!memes) return // if user have no memes, return
    
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

function onImgSelect(imgId) {
    document.body.classList.remove('modal-open');
    setImg(imgId)
    _createMeme(getImgById(imgId),false)
    _displayEditor()  
}

function onGenerateRandomMeme() {
    document.body.classList.remove('modal-open');
    var memeImg = getRandomImg()
    _createMeme(memeImg, true)
    _displayEditor()    
}


function onOpenGallery() {
    renderGallery()
    _closeImgBox()
    document.body.classList.add('modal-open');
    
}

function onChangeImg(img) {
    console.log('changing img', img);
    setImg(img)
    _resetUserImg()
    renderMeme()
}

// controls the img box apprance 
function _closeImgBox(){
    var elImgBox = document.querySelector('.img-box-container') 
    elImgBox.classList.add('hidden')
}

function _openImgBox(){
    var elImgBox = document.querySelector('.img-box-container') 
    elImgBox.classList.remove('hidden')
}

// Gets everything ready
function _displayEditor() {
    resetCurrMeme()
    _resetUserImg()
    renderMeme()
    renderEmojiBar()
    renderImgBox()
    _openImgBox()  
}