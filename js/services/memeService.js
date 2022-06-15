'use strict'
console.log('meme service loaded');

const FONTSIZESTEP = 5
const memesSentences = [
    'I never eat falafel',
    'DOMS DOMS EVERYWHERE',
    'Stop Using i in for loops',
    'Armed in knowledge',
    'Js error "Unexpected String"',
    'One does not simply write js',
    'I`m a simple man i see vanilla JS, i click like!',
    'JS, HTML,CSS?? Even my momma can do that',
    'May the force be with you',
    'I know JS',
    'JS Where everything is made up and the rules dont matter',
    'Not sure if im good at programming or good at googling',
    'But if we could',
    'JS what is this?',
    'Write hello world , add to cv 7 years experienced',
]

const EMOJISTIKERS = ['😃', '😃']

const MEME_KEY = 'SavedMemesDB'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        { txt: 'I sometimes eat Falafel', size: 20, align: 'left', color: 'red' },
        { txt: 'I sometimes eat Falafel', size: 20, align: 'left', color: 'red' }
    ]
}

var gLineIdx
var gUserMemes
var gCurrMeme = {
    isLoaded: false,
    idx: 0
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgNum) {
    gMeme.selectedImgId = imgNum
}

function setLineColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value
}

function setLineSize(direction) {
    gMeme.lines[gMeme.selectedLineIdx].size += direction * FONTSIZESTEP
}

function changeLines() {
    gLineIdx++
    if (gMeme.lines.length <= gLineIdx) {
        gLineIdx = 0
    }
    gMeme.selectedLineIdx = gLineIdx
}

function createRandomMeme(imgObj) {

    var randomMeme = {
        selectedImgId: imgObj.id,
        selectedLineIdx: 0,
        lines: []
    }

    randomMeme.lines = getLines(getLinesNum())

    gMeme = randomMeme
    console.log(gMeme);
}

function getLines(num) {
    var lines = []

    for (var i = 0; i < num; i++) {
        var line = {
            txt: memesSentences[getRandomInt(0, memesSentences.length)],
            size: Math.random() * 100,
            align: 'center',
            color: getRandomHex()

        }

        lines.push(line)
    }
    return lines
}

function saveMeme() {
    var savedMeme = {
        selectedImgId: gMeme.selectedImgId,
        selectedLineIdx: 0,
        lines: []
    }

    gMeme.lines.forEach(line => {
        var savedLine = {
            txt: line.txt,
            size: line.size,
            align: line.align,
            color: line.color
        }
        savedMeme.lines.push(savedLine)
    })

    if (gCurrMeme.isLoaded) {
        gUserMemes[gCurrMeme.idx] = savedMeme
    } else {
        gUserMemes.push(savedMeme)
    }
    saveToStorage(MEME_KEY, gUserMemes)
}

function loadUserMemes() {
    if (!loadFromStorage(MEME_KEY)) return
    gUserMemes = loadFromStorage(MEME_KEY)
    return gUserMemes
}

function setLoadedMeme(idx) {
    gMeme = gUserMemes[idx]
    gCurrMeme.isLoaded = true
    gCurrMeme.idx = idx

}

function _saveMemesToStorage() {
    saveToStorage(MEME_KEY, gUserMemes)
}

function resetCurrMeme() {
    gCurrMeme = {
        isLoaded: false,
        idx: 0
    }
}

function addEmoji(value) {
    var emoji = {
        txt: value,
        size: 60, 
        align: 'center', 
        color: 'black'
    }
    console.log(emoji);
    gMeme.lines.push(emoji)
}