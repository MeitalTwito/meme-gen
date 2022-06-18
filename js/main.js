'use strict'
console.log('main JS loaded');

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function init() {
    var defaultFont = new FontFace('impact', 'url(../assets/fonts/impact.ttf)')
    defaultFont.load().then(function (font) {
        document.fonts.add(font)
        console.log('Font loaded')
   })
    gCanvas = document.getElementById('canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
    addListeners()
    gLineIdx = 0
    gUserMemes = []
}


function addListeners() {
    document.querySelector('.download-btn').addEventListener('click', OnDownloadMeme)
    document.querySelector('.share-btn').addEventListener('click', onShareMeme)
}
