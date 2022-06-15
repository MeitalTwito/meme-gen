'use strict'
console.log('gallery service loaded');


const gImgs = [
    {id: 1, url: 'essets/meme-img/1.jpg', keywords: ['usa', 'president']},
    {id: 2, url: 'essets/meme-img/2.jpg', keywords: ['cute', 'dog']},
    {id: 3, url: 'essets/meme-img/3.jpg', keywords: ['cute', 'dog', 'baby']},
    {id: 4, url: 'essets/meme-img/4.jpg', keywords: ['cute', 'cat']},
    {id: 5, url: 'essets/meme-img/5.jpg', keywords: ['cute', 'baby', 'funny']},
    {id: 6, url: 'essets/meme-img/6.jpg', keywords: ['funny', 'man']},
    {id: 7, url: 'essets/meme-img/7.jpg', keywords: ['cute', 'funny', 'baby']},
    {id: 8, url: 'essets/meme-img/8.jpg', keywords: ['funny', 'man','movie']},
    {id: 9, url: 'essets/meme-img/9.jpg', keywords: ['funny', 'baby']},
    {id: 10, url: 'essets/meme-img/10.jpg', keywords: ['usa', 'president']},
    {id: 11, url: 'essets/meme-img/11.jpg', keywords: ['man', 'fight']},
    {id: 12, url: 'essets/meme-img/12.jpg', keywords: ['man', 'israel']},
    {id: 13, url: 'essets/meme-img/13.jpg', keywords: ['man', 'movie']},
    {id: 14, url: 'essets/meme-img/14.jpg', keywords: ['man', 'movie']},
    {id: 15, url: 'essets/meme-img/15.jpg', keywords: ['man', 'movie']},
    {id: 16, url: 'essets/meme-img/16.jpg', keywords: ['man', 'movie']},
    {id: 17, url: 'essets/meme-img/17.jpg', keywords: ['russia', 'president']},
    {id: 18, url: 'essets/meme-img/18.jpg', keywords: ['disney', 'movie']},
]

function getImgsToDisplay() {
    return gImgs
}

function getImg() {
    return gImgs[getRandomInt(0,gImgs.length)]
    
}