'use strict'
console.log('meme service loaded');

const FONTSIZESTEP = 5
const MOVESTEP = 10
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
const DEFULT_MEME_LINE = {txt: `Text Here`,size: 40,align: 'left',color: 'white'}
const MEME_KEY = 'SavedMemesDB'


var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}
var gLine = gMeme.lines[0]
var gLineIdx
var gUserMemes
var gCurrMeme = {
    isLoaded: false,
    idx: 0
}

// These Functions give the meme controller accsees to service globals
function getMeme() {
    return gMeme
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}


// these functions set the user prefrences to meme txt
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
    var line = gMeme.lines[gMeme.selectedLineIdx]
    line.size += direction * FONTSIZESTEP
}

function setLineAlignment(value) {
    gMeme.lines[gMeme.selectedLineIdx].align = value
}


// these functions control the meme lines
function changeLines() {
    gLineIdx++
    if (gMeme.lines.length <= gLineIdx) {
        gLineIdx = 0
    }
    gMeme.selectedLineIdx = gLineIdx
    gLine = gMeme.lines[gLineIdx]
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = gLineIdx = 0
}

function moveLine(line, direction) {
    line.pos += line.size*direction
}

function addLine() {
    var line = _createLines(false, 1)
    gMeme.lines.push(...line)
    gMeme.selectedLineIdx = gLineIdx = (gMeme.lines.length -1 < 0) ? 0:gMeme.lines.length -1
}

function updateLinePos(line, idx) {
    var y 
    if (line.pos === undefined){
        switch (idx) {
            case 0:
                y = 0
                break;
            case 1:
                y = gCanvas.height - line.size * LINESPACE
                break;
            default:
                y = (gCanvas.height - line.size) / 2
                break;
        }
        line.pos = y
        return
    }
}


// these functions handles saving and loading memes
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
            color: line.color,
            pos: line.pos
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

function resetCurrMeme() {
    gCurrMeme = {
        isLoaded: false,
        idx: 0
    }
}

function loadUserMemes() {
    if (!loadFromStorage(MEME_KEY)) return false;
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


// These functions create new memes and meme lines
function _createMeme(imgObj, isRandom) {
    var meme = {
        selectedImgId: imgObj.id,
        selectedLineIdx: 0,
        lines: []
    }
    meme.lines = _createLines(isRandom)
    gMeme = meme
}

function _createLines(isRandom, lineNum = 2) {
    // creating meme lines 
    var lines = []
    var line
    if (isRandom) {
        // handles random meme
        lineNum = getLinesNum()
        var lineSize = Math.random() * 100
        for (var i = 0; i < lineNum; i++) {
            line = {
                txt: memesSentences[getRandomInt(0, memesSentences.length)],
                size: lineSize,
                align: 'center',
                color: getRandomHex(),
            }
            lines.push(line)
        }
    } else {
        // Defult Meme Line
        for (var i = 0; i < lineNum; i++) {
            line = {
                txt: DEFULT_MEME_LINE.txt,
                size: DEFULT_MEME_LINE.size,
                align: DEFULT_MEME_LINE.align,
                color: DEFULT_MEME_LINE.color,
            }
            lines.push(line)
        }
    }
    return lines
}




