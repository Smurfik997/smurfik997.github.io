'use strict'

//vars
var winW, winH

//warn
console.warn('Script has injected')

//functions
function doc(p1, p2) {
    return p2 == undefined? document.getElementById(p1) : document.getElementsByClassName(p1)[p2]
}

function resize() {
    winW = window.innerWidth
    winH = window.innerHeight

    if (winH == undefined || winW == undefined) {
        console.error('#001')
    } else { 
        var css = function(len) {
            new Map([
                ['height', Math.trunc(len * 0.96) + 'px'],
                ['width', Math.trunc(len * 0.96) + 'px'],
                ['padding', Math.trunc(len * 0.02) + 'px'],
                ['margin', Math.trunc((winH - len) / 2) + 'px ' + Math.trunc((winW - len) / 2) + 'px']
            ]).forEach(function(val, key) {
                doc('main').style[key] = val;
            })
        }

        winW >= 300? null : winW = 300
        winH >= 300? null : winH = 300

        winW >= winH? css(Math.trunc(winH * 0.9)) : css(Math.trunc(winW * 0.9))
    }
}

//drawFunc-s
function setPlates(count) {
    var setB = function(x, y) {
        var xB = document.createElement('div')
        xB.id = 'B' + x
        xB.style.width = Math.trunc(100 / count) - 2 + '%'
        xB.style.float = 'left'
        xB.style.margin = '1%'
        xB.style.height = '80%'
        xB.style.background = 'rgb(0, 0, 0)'
        doc('L' + y).appendChild(xB)
        
        x < count? setTimeout(() => setB(x + 1, y)) :  setTimeout(() => setL(y + 1))
    }

    var setL = function(y) {
        var yL = document.createElement('div')
        yL.id = 'L' + y
        yL.style.width = '100%'
        yL.style.height = Math.trunc(100 / count) + '%'
        doc('main').appendChild(yL)
        
        y <= count? setTimeout(() => setB(1, y)) : null
    }

    setL(1)
}

//events
document.addEventListener('DOMContentLoaded', (e) => {
    resize()
    setPlates(10, 10)
})