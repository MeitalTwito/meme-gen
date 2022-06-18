'use strict'
console.log('gallery service loaded');

const gEmojis =['😂', '😅', '😍', '😎', '😡', '😳', '🤩', '🤯', '🧐', '😜', '😰', '🥶', '🤮', '😵‍💫','🤡','👿','😈','💩','👻','🤖']

const gImgs = [
    {id: 1, url: 'assets/meme-img/1.jpg', keywords: ['usa', 'president']},
    {id: 2, url: 'assets/meme-img/2.jpg', keywords: ['cute', 'dog']},
    {id: 3, url: 'assets/meme-img/3.jpg', keywords: ['cute', 'dog', 'baby']},
    {id: 4, url: 'assets/meme-img/4.jpg', keywords: ['cute', 'cat']},
    {id: 5, url: 'assets/meme-img/5.jpg', keywords: ['cute', 'baby', 'funny']},
    {id: 6, url: 'assets/meme-img/6.jpg', keywords: ['funny', 'man']},
    {id: 7, url: 'assets/meme-img/7.jpg', keywords: ['cute', 'funny', 'baby']},
    {id: 8, url: 'assets/meme-img/8.jpg', keywords: ['funny', 'man','movie']},
    {id: 9, url: 'assets/meme-img/9.jpg', keywords: ['funny', 'baby']},
    {id: 10, url: 'assets/meme-img/10.jpg', keywords: ['usa', 'president']},
    {id: 11, url: 'assets/meme-img/11.jpg', keywords: ['man', 'fight']},
    {id: 12, url: 'assets/meme-img/12.jpg', keywords: ['man', 'israel']},
    {id: 13, url: 'assets/meme-img/13.jpg', keywords: ['man', 'movie']},
    {id: 14, url: 'assets/meme-img/14.jpg', keywords: ['man', 'movie']},
    {id: 15, url: 'assets/meme-img/15.jpg', keywords: ['man', 'movie']},
    {id: 16, url: 'assets/meme-img/16.jpg', keywords: ['man', 'movie']},
    {id: 17, url: 'assets/meme-img/17.jpg', keywords: ['russia', 'president']},
    {id: 18, url: 'assets/meme-img/18.jpg', keywords: ['disney', 'movie']},
    {id: 19, url: 'assets/meme-img/19.jpg', keywords: ['cute', 'dog']},
    {id: 20, url: 'assets/meme-img/20.jpg', keywords: ['funny', 'man']},
    {id: 22, url: 'assets/meme-img/22.jpg', keywords: ['cute', 'dog']},
    {id: 23, url: 'assets/meme-img/23.jpg', keywords: ['cute', 'dog']},
    {id: 24, url: 'assets/meme-img/24.jpg', keywords: ['cute', 'dog']},
    {id: 25, url: 'assets/meme-img/25.jpg', keywords: ['cute', 'dog']},

]

function getImgsToDisplay() {
    return gImgs
}

function getEmojis() {
    return gEmojis
}

function getRandomImg() {
    return gImgs[getRandomInt(0,gImgs.length)]
}

function getImgById(idx) {
    return gImgs.find(img => img.id === idx)
}