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
    var title = doc('title').style;

    if (winW / winH >= 1) {
        title.cssText = 'font-size: 30px; line-height: 60px;'
        winH -= 60 
    } else if (winH / winW >= 1.35) {
        title.cssText = 'font-size: 90px; line-height: 180px;'
        winH -= 180
    } else {
        title.cssText = 'font-size: 60px; line-height: 120px;'
        winH -= 120
    }

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
    if (count > 10 || count < 2) {
        console.error('#002')
    } else {
        var setB = function(x, y) {
            var xB = document.createElement('div')
            var margin = Math.trunc(10000 / (count * 20)) / 100
            xB.id = 'B' + x
            xB.classList.add('xB')
            xB.style.margin = margin + '%'
            xB.style.width = Math.trunc(10000 / count) / 100 - margin * 2 + '%'
            xB.style.height = 100 - count * margin * 2 + '%'
            //xB.style.background = 'rgb(220, 220, 220)'
            doc('L' + y).appendChild(xB)
            
            x < count? setTimeout(() => setB(x + 1, y)) :  y < count? setTimeout(() => setL(y + 1)) : null
        }

        var setL = function(y) {
            var yL = document.createElement('div')
            yL.id = 'L' + y
            yL.classList.add('yL')
            yL.style.height = Math.trunc(10000 / count) / 100 + '%'
            doc('main').appendChild(yL)
            
            y <= count? setTimeout(() => setB(1, y)) : null
        }

        setL(1)
    }
}

//events
document.addEventListener('DOMContentLoaded', (e) => {
    resize()
    setPlates(10)
})