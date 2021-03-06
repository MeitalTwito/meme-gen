'use strict'
console.log('gallery controller loaded');



// These functions render the new meme gallery
function onOpenGallery() {
    renderGallery()
    _closeImgBox()
    document.body.classList.add('modal-open');
    
}

function renderGallery() {
    var imgs = getImgsToDisplay()

    var strHTMLs = imgs.map(img =>
        `<div class="gallery-img img${img.id}">
        <img onclick="onImgSelect(${img.id})" src="${img.url}" alt="" srcset="">
        </div>`
        
    )
    var elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTMLs.join('')
    renderSearchBar()
    _showSearchBar()
}

function renderSearchBar() {
    var searchWords = getSearchWords()

    var strHTMLs = searchWords.map(word =>
       ` <li style="font-size: ${word.size}em ;" onclick="onSearchWord('${word.value}')">${word.value}</li>`
        
    )

    var elGallery = document.querySelector('.search-values')
    elGallery.innerHTML = strHTMLs.join('')
}

//These Functions filter the gallery Imgs 
function onSearchWord(value) {
    setFilterBy(value)
    document.querySelector('.search-bar').value = value
    var searchWord = getSearchWordByValue(value)

    if(searchWord.size < 3){
        searchWord.size += 0.5
    }
    renderSearchBar()
    renderGallery()
}

function onSetFilterByGallery(filter) {
    setFilterBy(filter)
    renderGallery()
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
    _closeImgBox()
    renderImgBox()  
    _hideSearchBar()
    document.body.classList.add('modal-open');
}


// These Functions close the gallery and open the editor 
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

// This Function get the editor ready to display
function _displayEditor() {
    resetCurrMeme()
    _resetUserImg()
    renderMeme()
    renderEmojiBar()
    renderImgBox()
    _openImgBox()  
}

// this function renders the editor emojis bar 
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

// these functions control the editor image box gallery 
function onSetFilterByImgBox(filter) {
    setFilterBy(filter)
    renderImgBox()
}

function onChangeImg(img) {
    console.log('changing img', img);
    setImg(img)
    _resetUserImg()
    renderMeme()
}

// These controls the img box apprance 
function _closeImgBox(){
    var elImgBox = document.querySelector('.img-box-container') 
    elImgBox.classList.add('hidden')
}

function _openImgBox(){
    var elImgBox = document.querySelector('.img-box-container') 
    elImgBox.classList.remove('hidden')
}


// These functions control the search bar appreance 
function _hideSearchBar() {
    document.querySelector('.search-bar').classList.add('hidden')
    document.querySelector('.search-words-holder').classList.add('hidden')

}
function _showSearchBar() {
    document.querySelector('.search-bar').classList.remove('hidden')
    document.querySelector('.search-words-holder').classList.remove('hidden')
}
