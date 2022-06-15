'use strict'
console.log('utils loaded')


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getLinesNum() {
    var num = (Math.floor(Math.random()*100) > 50) ? 1 : 2
    return num
}


function getRandomHex() {
    var hex = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
    return hex
}