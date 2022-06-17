'use strict'
console.log('gallery controller loaded');


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

function onImgSelect(imgId) {
    document.body.classList.remove('modal-open');
    setImg(imgId)
    createMeme(getImgById(imgId),false)
    renderMeme()
    var elImgBox = document.querySelector('.img-box-container')
    elImgBox.classList.remove('hidden')
    renderImgBox()    
}

function onGenerateRandomMeme() {
    document.body.classList.remove('modal-open');
    var memeImg = getRandomImg()
    createMeme(memeImg, true)
    resetCurrMeme()
    renderMeme()
    var elImgBox = document.querySelector('.img-box-container')
    elImgBox.classList.remove('hidden')
    renderImgBox()  
}


function onOpenGallery() {
    renderGallery()
    var elImgBox = document.querySelector('.img-box-container')
    elImgBox.classList.add('hidden')
    document.body.classList.add('modal-open');
    
}