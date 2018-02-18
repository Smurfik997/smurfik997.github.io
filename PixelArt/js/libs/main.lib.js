'use strict'

//vars
var winW, winH, err
var colorP = {
    a: 'rgb(255, 255, 255)', //white
    b: 'rgb(120, 120, 120)', //gray
    c: 'rgb(80, 180, 230)', //blue
    d: 'rgb(255, 100, 120)', //red
    e: 'rgb(160, 255, 200)', //green
    f: 'rgb(244, 255, 142)' //yellow
}

//warn
console.warn('Script has injected')

//functions
function doc(p1, p2) {
    return p2 == undefined? document.getElementById(p1) : document.getElementsByClassName(p1)[p2]
}

function resize() {
    winW = (window.innerWidth || document.documentElement.clientWidth)
    winH = (window.innerHeight || document.documentElement.clientHeight)
    
    var titleH = doc('title').clientHeight;
    doc('title').style.cssText = 'font-size: ' + titleH / 2 + 'px; line-height: ' + titleH + 'px;'
    winH -= titleH;

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

            doc('title').querySelectorAll('div')[0].style.width = len + 'px';
        }

        winW >= 400? null : winW = 400
        winH + titleH >= 400? null : winH = 400 - titleH
        doc('title').style.width = winW + 'px'

        winW >= winH? css(Math.trunc(winH * 0.9)) : css(Math.trunc(winW * 0.9))
    }
}

//drawFunc-s
function setPlates(block, count, customS) {
    err = undefined

    if (count > 10 || count < 2 || block == undefined) {
        err = '#002'
    } else {
        if (String(block.innerHTML).length > 0) {
            err = '#004'
        } else {
            var setB = function(x, y) {
                var xB = document.createElement('div')
                var margin = Math.trunc(10000 / (count * 20)) / 100
                xB.id = 'B' + x
                xB.classList.add('xB')
                xB.style.margin = margin + '%'
                xB.style.width = Math.trunc(10000 / count) / 100 - margin * 2 + '%'
                xB.style.height = 100 - count * margin * 2 + '%'

                if (customS != undefined) {
                    customS.color != undefined? xB.style.background = customS.color : null
                    customS.bRadius != undefined? xB.style.borderRadius = customS.bRadius : null
                }

                doc('L' + y).appendChild(xB)
                x < count? setTimeout(() => setB(x + 1, y)) :  y < count? setTimeout(() => setL(y + 1)) : null
            }

            var setL = function(y) {
                var yL = document.createElement('div')
                yL.id = 'L' + y
                yL.classList.add('yL')
                yL.style.height = Math.trunc(10000 / count) / 100 + '%'
                block.appendChild(yL)
                
                y <= count? setTimeout(() => setB(1, y)) : null
            }

            setL(1)
        }
    }

    return err = 'undefined'? null : console.error(err)
}

function delPlot() {
    return doc('main') != undefined? doc('main').innerHTML = null : console.error('#003')
}

//events
document.addEventListener('DOMContentLoaded', (e) => {
    resize()
    setPlates(doc('main'), 10, {bRadius: '50%'})
})