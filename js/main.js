'use strict'
console.log('main JS loaded');

function init() {
    gCanvas = document.getElementById('canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
    renderMeme()
    gLineIdx = 0
    gUserMemes = []
}
