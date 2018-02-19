'use strict'

//vars
var winW, winH, err
var colorP = {
    a: 'rgb(255, 255, 255)', //white
    b: 'rgb(120, 120, 120)', //gray
    c: 'rgb(80, 180, 230)', //blue
    d: 'rgb(255, 100, 120)', //red
    e: 'rgb(160, 255, 200)', //green
    f: 'rgb(244, 255, 142)', //yellow
    g: 'rgb(220, 220, 220)', //light-gray
}

var anim = {framesC: 3, fDispTime: 1000, plotPlates: 9, customS: {bRadius: '50%'}, frames: [
    [
        ['g' /*x1*/, 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'], //y1
        ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'], //y2
        ['g', 'g', 'g', 'd', 'g', 'd', 'g', 'g', 'g'],
        ['g', 'g', 'd', 'd', 'd', 'd', 'd', 'g', 'g'],
        ['g', 'g', 'd', 'd', 'd', 'd', 'd', 'g', 'g'],
        ['g', 'g', 'g', 'd', 'd', 'd', 'g', 'g', 'g'],
        ['g', 'g', 'g', 'g', 'd', 'g', 'g', 'g', 'g'],
        ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
        ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g']
    ],
    [
        ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
        ['g', 'g', 'd', 'd', 'g', 'd', 'd', 'g', 'g'],
        ['g', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'g'],
        ['g', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'g'],
        ['g', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'g'],
        ['g', 'g', 'd', 'd', 'd', 'd', 'd', 'g', 'g'],
        ['g', 'g', 'g', 'd', 'd', 'd', 'g', 'g', 'g'],
        ['g', 'g', 'g', 'g', 'd', 'g', 'g', 'g', 'g'],
        ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g']
    ],
    [
        ['g', 'g', 'd', 'd', 'g', 'd', 'd', 'g', 'g'],
        ['g', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'g'],
        ['d', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd'],
        ['d', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd'],
        ['d', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd'],
        ['g', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'g'],
        ['g', 'g', 'd', 'd', 'd', 'd', 'd', 'g', 'g'],
        ['g', 'g', 'g', 'd', 'd', 'd', 'g', 'g', 'g'],
        ['g', 'g', 'g', 'g', 'd', 'g', 'g', 'g', 'g']
    ]
]}

//warn
console.warn('Script has injected')

//functions
function doc(p1, p2) {
    return p2 == undefined? document.getElementById(p1) : document.getElementsByClassName(p1)[p2]
}

function resize() {
    winW = (window.innerWidth || document.documentElement.clientWidth)
    winH = (window.innerHeight || document.documentElement.clientHeight)
    
    var titleH = doc('title').clientHeight
    doc('title').style.cssText = 'font-size: ' + titleH / 2 + 'px; line-height: ' + titleH + 'px;'
    winH -= titleH

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
                if (doc('main').getAttribute('anim') == 'ready') {
                    document.body.querySelectorAll('div.plot').forEach((currVal, i, arr) => {
                        arr[i].style[key] = val
                    })
                } else {
                    doc('main').style[key] = val
                }
            })

            doc('title').querySelectorAll('div')[0].style.width = len + 'px'
        }

        doc('title').style.width = winW + 'px'

        winW >= winH? css(Math.trunc(winH * 0.9)) : css(Math.trunc(winW * 0.9))
    }
}

//drawFunc-s
function setPlates(block, count, customS) {
    err = undefined

    if (count > 10 || count < 2 || count == undefined || block == undefined) {
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
                x < count? setTimeout(() => setB(x + 1, y)) :  y < count? setTimeout(() => setL(y + 1)) : block.setAttribute('status', 'ready')
            }

            var setL = function(y) {
                var yL = document.createElement('div')
                yL.id = 'L' + y
                yL.classList.add('yL')
                yL.style.height = Math.trunc(10000 / count) / 100 + '%'
                block.appendChild(yL)
                
                y <= count? setTimeout(() => setB(1, y)) : null
            }

            setTimeout(() => setL(1))
        }
    }

    return err == undefined? null : console.error(err)
}

function prepareFrames(block, animConf) {
    var err = undefined

    if (animConf.framesC && animConf.fDispTime && animConf.plotPlates && animConf.frames != undefined && block.getAttribute('anim') == undefined) {
        delPlot()
        setPlates(block, animConf.plotPlates, animConf.customS)
        block.addEventListener('DOMSubtreeModified', (e) => {
            if (e.target.lastChild.id == 'B' + animConf.plotPlates && e.target.id == 'L' + animConf.plotPlates) {
                var setF = function(fNum) {
                    var frame = block.cloneNode(true)
                    frame.id = 'frame' + fNum
                    frame.style.display = 'none'
                    document.body.appendChild(frame)

                    var setB = function(x, y, fNum) {
                        var pixB = doc('frame' + fNum).querySelector('div#L' + y + ' div#B' + x)
                        pixB.style.backgroundColor = colorP[animConf.frames[fNum - 1][y - 1][x - 1]]

                        if (x < animConf.plotPlates) {
                            setTimeout(() => setB(x + 1, y, fNum))
                        } else if (y < animConf.plotPlates) {
                            setTimeout(() => setL(y + 1, fNum))
                        } else if (fNum < animConf.framesC) {
                            setTimeout(() => setF(fNum + 1))
                        } else if (fNum == animConf.framesC && x == animConf.plotPlates) {
                            block.setAttribute('anim', 'ready')
                            playAnim(block, animConf.framesC, animConf.fDispTime)
                        }
                    }

                    var setL = function(y, fNum) {
                        y <= animConf.plotPlates? setTimeout(() => setB(1, y, fNum)) : null
                    }

                    setTimeout(() => setL(1, fNum))
                }

                setTimeout(() => setF(1))
            }
        })
    } else {
        err = '#005'
    }

    return err == undefined? null : console.error(err)
}

function playAnim(block, framesC, fDispTime) {
    block.style.display = 'none'
    doc('frame1').style.display = 'block'
    var currF = 0
    console.log('currF: ' + currF)

    var dispF = function(currF, prevF) {
        currF++
        console.log('currF: ' + currF)
        var currFN
        if (currF % (framesC * 2 - 2) + 1 > framesC) {
            currFN = framesC * 2 - currF % (framesC * 2 - 2) - 1
        } else {
            //currFN = currF % framesC + 1
            currFN = currF % (framesC * 2 - 2) + 1
        }
        doc('frame' + prevF).style.display = 'none'
        doc('frame' + currFN).style.display = 'block'
        setTimeout(() => dispF(currF, currFN), fDispTime)       
    }

    setTimeout(() => dispF(currF, 1), fDispTime)
}

function delPlot() {
    document.body.querySelectorAll('div.plot').length == 0? console.error('#003') : document.body.querySelectorAll('div.plot').forEach((currVal, i, arr) => {
        arr[i].id.split('frame')[0] == ''? arr[i].remove() : arr[i].innerHTML = null
    })
}

//events
document.addEventListener('DOMContentLoaded', (e) => {
    resize()
    //setPlates(doc('main'), 9, {bRadius: '50%'})
    prepareFrames(doc('main'), anim) //test
})