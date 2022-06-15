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

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()    
}

function onGenerateRandomMeme() {
    var memeImg = getImg()
    createRandomMeme(memeImg)
    resetCurrMeme()
    renderMeme()
}