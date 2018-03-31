'use strict'

//vars
var winW, winH, err, animEdit,
    colorP = {
    a: 'rgb(255, 255, 255)', //white
    b: 'rgb(150, 150, 150)', //gray
    c: 'rgb(0, 180, 230)', //blue
    d: 'rgb(255, 100, 120)', //red
    e: 'rgb(0, 255, 200)', //green
    f: 'rgb(244, 255, 142)', //yellow
    g: 'rgb(235, 235, 235)', //light-gray
},
    currColor = 'g',
    anim = {framesC: 2, fDispTime: 300, plotPlates: 2, replay: 1, customS: {bRadius: 0}, frames: []}

/*var anim = {framesC: 3, fDispTime: 1000, plotPlates: 3, replay: 0, customS: {
    bRadius: 50,
}, frames: [
    [
        ['d', 'g', 'g'],
        ['g', 'f', 'g'], 
        ['g', 'g', 'e']
    ],
    [
        ['e', 'g', 'g'],
        ['g', 'd', 'g'], 
        ['g', 'g', 'f']
    ],
    [
        ['f', 'g', 'g'],
        ['g', 'e', 'g'], 
        ['g', 'g', 'd']
    ]
]}*/

//warn
console.warn('Script has injected')

//functions
function doc(p1, p2) {
    return p2 == undefined? document.getElementById(p1) : document.getElementsByClassName(p1)[p2]
}

function resize() {
    winW = window.innerWidth
    winH = window.innerHeight
    
    winH -= doc('title').clientHeight

    if (winH == undefined || winW == undefined) {
        console.error('#001')
    } else { 
        var preloadIMG = document.querySelector('div#preload img')
        if (preloadIMG.clientHeight < winH && preloadIMG.clientWidth < winW) {
            winH > winW? preloadIMG.style.height = 'auto' : preloadIMG.style.width = 'auto' 
            preloadIMG.style.visibility = 'unset'
        }

        var css = function(len) {
            var padding = Math.trunc(len * 0.02) + 'px',
                size = Math.trunc(len * 0.96) + 'px',
                sSize = Math.trunc(len * 0.96) + 2 * Math.trunc(len * 0.02)
            new Map([
                ['height', size],
                ['width', size],
                ['padding', padding],
                ['margin', Math.trunc((winH - len) / 2) + 'px ' + Math.trunc((winW - len) / 2) + 'px']
            ]).forEach((val, key) => {
                if (doc('main').getAttribute('anim') == 'ready') {
                    doc('contentBlock').querySelectorAll('div.plot').forEach((currVal, i, arr) => {
                        arr[i].style[key] = val
                    })
                } else {
                    doc('main').style[key] = val
                }
                
                doc('createBlock').querySelectorAll('div.plot').forEach((currVal, i, arr) => {
                    arr[i].style[key] = val
                })
                doc('create').style[key] = val

                if (key != 'padding') {
                    key == 'width' || key == 'height'? doc('createM').style[key] = sSize + 'px' : doc('createM').style[key] = val
                    key == 'width' || key == 'height'? doc('colors').style[key] = sSize + 'px' : doc('colors').style[key] = val
                }
            })

            var fCurrNumW = Math.trunc(window.innerHeight * 0.072 * 3.5)
            doc('fCurrNum').querySelector('div.counter').style.width = fCurrNumW
            doc('fCurrNum').querySelector('div.counter').style.marginLeft = Math.trunc((len * 0.7 - fCurrNumW) / 2)
            doc('createM').style.fontSize = len * 0.06 + 'px'
            doc('createM').querySelectorAll('div.counter').forEach((e) => {
                e.style.fontSize = len * 0.05 + 'px'
            })
            var bR = Math.trunc(len * 0.03)
            doc('colors').querySelectorAll('div.colorB')[0].style.borderRadius = bR + 'px ' + bR + 'px 0 0'
            doc('colors').querySelectorAll('div.colorB')[6].style.borderRadius = '0 0 ' + bR + 'px ' + bR + 'px'
            doc('createM').querySelectorAll('div.sItem')[0].style.borderRadius = bR + 'px ' + bR + 'px 0 0'
            doc('createM').querySelector('div#continueB').style.borderRadius = '0 0 ' + bR + 'px ' + bR + 'px'
            var counterB = doc('createM').querySelector('div.counterB')
            doc('createM').querySelector('div.switch').style.borderRadius = counterB.clientHeight * 0.2 + 'px'
            doc('title').querySelectorAll('div')[0].style.width = len + 'px'
            doc('title').querySelectorAll('div')[0].style.marginLeft = Math.trunc((winW - len) / 2) + 'px'
        }

        winW >= winH? css(Math.trunc(winH * 0.88)) : css(Math.trunc(winW * 0.88 - winH * 0.12))
    }
}

//drawFunc-s
function setPlates(block, count, customS, create, callback) {
    err = undefined

    if (count > 10 || count < 2 || count == undefined || block == undefined) {
        err = '#002'
    } else {
        if (String(block.innerHTML).length > 0) {
            err = '#004'
        } else {
            var setB = function(x, y) {
                var xB = document.createElement('div'),
                    margin = Math.trunc(10000 / (count * 20)) / 100
                xB.id = 'B' + x
                xB.classList.add('xB')
                xB.style.margin = margin + '%'
                xB.style.width = Math.trunc(10000 / count) / 100 - margin * 2 + '%'
                xB.style.height = 100 - count * margin * 2 + '%'
                create == 0? xB.setAttribute('onclick', 'changePixColor(this);') : null

                if (customS != undefined) {
                    customS.bRadius != undefined? xB.style.borderRadius = customS.bRadius + '%': null
                }

                doc('L' + y).appendChild(xB)
                x < count? setTimeout(() => setB(x + 1, y)) :  y < count? setTimeout(() => setL(y + 1)) : setTimeout(() => callback())
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

function prepareFrames(parrentB, block, animConf, create, callback) {
    var err = undefined

    if (animConf.framesC && animConf.fDispTime && animConf.plotPlates && animConf.frames != undefined && block.getAttribute('anim') == undefined) {
        delPlot()
        setPlates(block, animConf.plotPlates, animConf.customS, create, () => {
            var setF = function(fNum) {
                var frame = block.cloneNode(true)
                frame.id = 'frame' + fNum
                frame.style.display = 'none'
                if (fNum == 1 && create == 1) {
                    frame.style.display = 'block'
                }
                parrentB.appendChild(frame)

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
                        setTimeout(() => callback(block, animConf.framesC, animConf.fDispTime, animConf.replay))
                    }
                }

                var setL = function(y, fNum) {
                    y <= animConf.plotPlates? setTimeout(() => setB(1, y, fNum)) : null
                }

                setTimeout(() => setL(1, fNum))
            }

            setTimeout(() => setF(1))
        })
    } else {
        err = '#005'
    }

    return err == undefined? null : console.error(err)
}

function playAnim(block, framesC, fDispTime, replay) {
    doc('preload').style.display = 'none'
    block.style.display = 'none'
    doc('frame1').style.display = 'block'
    var currF = 0
    console.log('%creplayMode: %c' + replay, 'color: rgb(80, 180, 230)', 'color: rgb(255, 100, 120)')
    console.log('%ccurrF: %c' + currF, 'color: rgb(80, 180, 230)', 'color: rgb(255, 100, 120)')

    var dispF = function(currF, prevF) {
        if (block.getAttribute('anim') == 'ready') {
            block.getAttribute('pause') != 'true'? currF++ : null
            var currFN
            if (replay == 1) {
                if (currF % (framesC * 2 - 2) + 1 > framesC) {
                    currFN = framesC * 2 - currF % (framesC * 2 - 2) - 1
                } else {
                    currFN = currF % (framesC * 2 - 2) + 1
                }
            } else {
                currFN = currF % framesC + 1
            }

            if (block.getAttribute('pause') != 'true') {
                console.log('%ccurrF: %c' + currF, 'color: rgb(80, 180, 230)', 'color: rgb(255, 100, 120)')
                doc('frame' + prevF).style.display = 'none'
                doc('frame' + currFN).style.display = 'block'
            }

            setTimeout(() => dispF(currF, currFN), fDispTime)       
        }
    }

    setTimeout(() => dispF(currF, 1), fDispTime)
}

function delPlot() {
    doc('main').removeAttribute('anim')
    doc('main').removeAttribute('pause')
    doc('contentBlock').querySelectorAll('div.plot').length == 0? console.error('#003') : doc('contentBlock').querySelectorAll('div.plot').forEach((currVal, i, arr) => {
        arr[i].id.split('frame')[0] == ''? arr[i].remove() : arr[i].innerHTML = ''
    })
}

//sys ***arrToStr(anim, (e) => {console.log(e)})
function arrToStr(arr, callback) {
    var response = new String

    if (arr.framesC && arr.fDispTime && arr.plotPlates && arr.frames != undefined) {
        response = arr.framesC + '-' + arr.fDispTime + '-' + arr.plotPlates + '-' + arr.customS['bRadius'] + '-' + arr.replay

        var str = new String,
            framesToStrFirst = function(currF, currL) {
            //currL == 1? str += '-' : null

            if (currL <= arr.plotPlates) {
                str += '-' + arr.frames[currF - 1][currL - 1].join('')
                currL++
            }

            if (currL > arr.plotPlates) {
                currF++
                currL = 1
            }

            currF <= arr.framesC? setTimeout(() => framesToStrFirst(currF, currL)) : setTimeout(() => framesToStr(str, 0, ''))
        }

        var framesToStr = function(str, currPos, stack) {
            if (str[currPos] == stack[0]) {
                stack += str[currPos] 
            } else {
                stack.length == 1? response += stack[0] : null
                stack.length > 1? response += stack.length + stack[0] : null
                stack = str[currPos]
            }

            currPos++

            currPos <= str.length? setTimeout(() => framesToStr(str, currPos, stack)) : setTimeout(() => callback(response))
        }

        setTimeout(() => framesToStrFirst(1, 1))
    }
}

function strToArr(str, callback) {
    var response = {
        framesC: parseInt(str.split('-')[0]), 
        fDispTime: parseInt(str.split('-')[1]), 
        plotPlates: parseInt(str.split('-')[2]), 
        replay: str.split('-')[4],
        customS: {
            bRadius: str.split('-')[3],
        },
        frames: []
    }

    var parseLine = function(line, currPos, arr, callback) {
        if (isNaN(parseInt(line[currPos])) == true) {
            if (currPos < line.length) {
                arr[arr.length] = line[currPos]
                currPos++
                setTimeout(() => parseLine(line, currPos, arr, callback))
            } else {
                callback[0](arr, callback[1])
            } 
        } else {
            if (isNaN(parseInt(line[currPos + 1])) == false) {
                var count = parseInt(line[currPos]) * 10 + parseInt(line[currPos + 1]),
                    char = line[currPos + 2]
                currPos += 3
            } else {
                var count = parseInt(line[currPos]),
                    char = line[currPos + 1]
                currPos += 2
            }

            var fillA = function(line, currPos, arr, curr, char, count, callback) {
                arr[arr.length] = char 
                curr++ 
                if (curr <= count) { 
                    setTimeout(() => fillA(line, currPos, arr, curr, char, count, callback)) 
                } else { 
                    setTimeout(() => parseLine(line, currPos, arr, callback))
                }
            }

            setTimeout(() => fillA(line, currPos, arr, 1, char, count, callback))
        }
    }

    var addFrames = function(currF, currL, strP) {
        setTimeout(() => parseLine(str.split('-')[strP], 0, [], [(arr, data) => {
            currF = data[0]
            currL = data[1]
            strP = data[2]
            response.frames[currF - 1][currL - 1] = arr
            strP++
            currL++
            if (currL > response.plotPlates) {
                currL = 1
                currF++
                if (currF > response.framesC) { 
                    callback(response) 
                } else {
                    response.frames[currF - 1] = new Array()
                    setTimeout(() => addFrames(currF, currL, strP))
                }
            } else {
                setTimeout(() => addFrames(currF, currL, strP))
            }
        }, [currF, currL, strP]]))
    }

    response.frames[0] = new Array()
    setTimeout(() => addFrames(1, 1, 5, callback))
}

function fillFrames(color, arr, callback) {
    var addFrames = function(currF, currL, currP) {
        if (currF <= arr.framesC) {
            arr.frames[currF - 1] == undefined? arr.frames[currF - 1] = new Array() : null
            arr.frames[currF - 1][currL - 1] == undefined? arr.frames[currF - 1][currL - 1] = new Array() : null
            arr.frames[currF - 1][currL - 1][currP - 1] = color 
            currP++
            if (currP > arr.plotPlates) {
                currL++
                currP = 1
            }
            if (currL > arr.plotPlates) {
                currF++
                currL = 1
            }
            setTimeout(() => addFrames(currF, currL, currP))
        } else {
            callback()
        }
    }

    setTimeout(() => addFrames(1, 1, 1))
}

//sButtons 
function sButtonClick(block, operation, min, max, numPerClick, param) {
    var numB = doc(block).querySelector('div.counterT'),
        button = doc(block).querySelectorAll('div.counterB'),
        currN = parseInt(numB.innerHTML),
        conf = function(currN, currNModified, param) {
        if (param == '') {
            doc('createBlock').querySelector('#frame' + currN).style.display = 'none'
            doc('createBlock').querySelector('#frame' + currNModified).style.display = 'block'
        } else {
            if (doc('edit').getAttribute('active') != 'true') {
                param.split('.')[1] != undefined? anim[param.split('.')[0]][param.split('.')[1]] = currNModified : anim[param] = currNModified
            } else {
                param.split('.')[1] != undefined? animEdit[param.split('.')[0]][param.split('.')[1]] = currNModified : animEdit[param] = currNModified
            }
        }
    }

    if (button[0].style.opacity != .4 || button[1].style.opacity != .4) {
        if (operation == '-') {
            if (currN > min) {
                var currNModified = currN - numPerClick
                numB.innerHTML = currNModified

                if (currNModified == min) {
                    button[0].style.opacity = .4
                } else {
                    button[0].style.opacity = 1
                }

                button[1].style.opacity = 1
                conf(currN, currNModified, param)
            }
        } else {
            if (currN < max) {
                var currNModified = currN + numPerClick
                numB.innerHTML = currNModified
            
                if (currNModified == max) {
                    button[1].style.opacity = .4
                } else {
                    button[1].style.opacity = 1
                }

                button[0].style.opacity = 1
                conf(currN, currNModified, param)
            }
        }
    }
}

function switchB() {
    var switchBlock = doc('replayS').querySelector('div.switch')
    if (switchBlock.innerHTML == '1 - 2 - 3 - 2 - ...') {
        switchBlock.innerHTML = '1 - 2 - 3 - 1 - ...'
        doc('edit').getAttribute('active') != 'true'? anim.replay = 0 : animEdit.replay = 0
        switchBlock.style.backgroundColor = 'var(--red)'
    } else {
        switchBlock.innerHTML = '1 - 2 - 3 - 2 - ...'
        doc('edit').getAttribute('active') != 'true'? anim.replay = 1 : animEdit.replay = 1
        switchBlock.style.backgroundColor = 'var(--green)'
    }
}

//create
function changePixColor(block) {
    if (block.style.backgroundColor != colorP[currColor]) {
        block.style.backgroundColor = colorP[currColor]
        var currF = parseInt(block.parentElement.parentElement.id.split('frame')[1]) - 1,
            currL = parseInt(block.parentElement.id.split('L')[1]) - 1,
            currB = parseInt(block.id.split('B')[1]) - 1
        anim.frames[currF][currL][currB] = currColor
    }
}

function changeColor(block) {
    currColor = block.getAttribute('color')
    doc('palette').className = 'icon'
    doc('paletteBlock').className = 'content settings'
    doc('createBlock').className = 'content'
    doc('palette').setAttribute('active', 'false')
}

//events
document.addEventListener('DOMContentLoaded', (e) => {
    resize()
    //setPlates(doc('main'), 9, {bRadius: '50%'})
    var animStr = '4-700-3-40-0-3g-3d-3g-f2g-gfg-2gf-geg-geg-geg-2gc-gcg-c2g'
    location.search.split('?')[1] != undefined? animStr = location.search.split('?')[1] : null
    animStr == 'heart'? animStr = '3-1000-9-50-1-9g-9g-3gdgd3g-2g5d2g-2g5d2g-3g3d3g-4gd4g-9g-9g-9g-2g2dg2d2g-g7dg-g7dg-g7dg-2g5d2g-3g3d3g-4gd4g-9g-2g2dg2d2g-g7dg-9d-9d-9d-g7dg-2g5d2g-3g3d3g-4gd4g' : null

    strToArr(animStr, (r) => {
        animEdit = r
        prepareFrames(doc('contentBlock'), doc('main'), r, 1, (block, framesC, fDispTime, replay) => playAnim(block, framesC, fDispTime, replay))
    })//test

    var animSettings = function(e) {
        var editA = e.target.id == 'edit' && doc('newA').getAttribute('active') != 'true',
            newA = e.target.id == 'newA' && doc('edit').getAttribute('active') != 'true'
        if (editA == true || newA == true) {
            var animV
            e.target.id == 'edit'? animV = animEdit : animV = anim

            var sConf = function(block, min, max, curr, param) {
                document.querySelector(block + ' div.counterT').innerText = curr

                if (param == 1) {
                    document.querySelectorAll(block + ' div.counterB')[0].style.opacity = .4
                    document.querySelectorAll(block + ' div.counterB')[1].style.opacity = .4
                } else if (curr > min && curr < max) {
                    document.querySelectorAll(block + ' div.counterB')[0].style.opacity = 1
                    document.querySelectorAll(block + ' div.counterB')[1].style.opacity = 1
                } else if (curr == min) {
                    document.querySelectorAll(block + ' div.counterB')[0].style.opacity = .4
                    document.querySelectorAll(block + ' div.counterB')[1].style.opacity = 1
                } else if (curr == max) {
                    document.querySelectorAll(block + ' div.counterB')[0].style.opacity = 1
                    document.querySelectorAll(block + ' div.counterB')[1].style.opacity = .4
                }
            }

            var param
            e.target.id == 'edit'? param = 1 : param = 0
            sConf('div#framesCountS', 2, 10, animV.framesC, param)
            sConf('div#plotPlatesS', 2, 10, animV.plotPlates, param)
            sConf('div#borderRadiudS', 0, 50, animV.customS.bRadius)
            sConf('div#fDispTimeS', 300, 1000, animV.fDispTime)
            var replay = document.querySelector('div#replayS div.counterT')
            if (animV.replay == 0) {
                replay.innerText = '1 - 2 - 3 - 1 - ...'
                replay.style.backgroundColor = 'var(--red)'
            } else {
                replay.innerText = '1 - 2 - 3 - 2 - ...'
                replay.style.backgroundColor = 'var(--green)'
            }

            if (e.target.getAttribute('active') == 'true') {
                e.target.setAttribute('active', 'false')
                setTimeout(() => doc('main').setAttribute('pause', 'false'), 500)
                console.warn('Continue')
                doc('settingsBlock').className = 'content settings'
                doc('contentBlock').className = 'content'
                if (e.target.id != 'edit') {
                    doc('edit').style.opacity = ''
                    e.target.className = 'icon'
                } else {
                    doc('newA').style.opacity = ''
                    e.target.className = 'icon r'
                }
            } else {
                e.target.setAttribute('active', 'true')
                doc('main').setAttribute('pause', 'true')
                console.warn('Pause')
                doc('settingsBlock').className = 'content'
                doc('contentBlock').className = 'content toRight'
                if (e.target.id != 'edit' && doc('edit').getAttribute('active') != 'true') {
                    doc('edit').style.opacity = '.4'
                    e.target.className = 'icon iconR'
                } else if (doc('newA').getAttribute('active') != 'true') {
                    doc('newA').style.opacity = '.4'
                    e.target.className = 'icon iconR r'
                }   
            }
        }
    }

    doc('newA').addEventListener('click', (e) => animSettings(e))
    doc('edit').addEventListener('click', (e) => animSettings(e))

    doc('palette').addEventListener('click', (e) => {
        if (e.target.getAttribute('active') == 'true') {
            e.target.className = 'icon'
            doc('paletteBlock').className = 'content settings'
            doc('createBlock').className = 'content'
            e.target.setAttribute('active', 'false')
        } else {
            e.target.className = 'icon iconR90'
            doc('paletteBlock').className = 'content'
            doc('createBlock').className = 'content toRight'
            e.target.setAttribute('active', 'true')
        }
    })

    doc('continueB').addEventListener('click', () => {
        doc('preload').style.display = 'table'
        doc('settingsBlock').className = 'content toRight'
        doc('createBlock').className = 'content'
        doc('create').style.display = 'none'
        doc('tText').className = 'noDisp'
        doc('fCurrNum').className = ''
        doc('iconB', 0).className = 'noDisp'
        doc('iconB', 0).className = 'iconB'
        doc('iconB', 1).className = 'noDisp'
        doc('iconB', 1).className = 'iconB' 

        var drag = false

        //dragPainting
        doc('createBlock').addEventListener('mouseup', (e) => {
            drag = false
        })
        doc('createBlock').addEventListener('mousedown', (e) => {
            drag = true
        })
        doc('createBlock').addEventListener('mousemove', (e) => {
            if (drag == true && e.target.id.split('B')[0] == '') {
                changePixColor(e.target)
            }
        })

        //phone
        doc('createBlock').addEventListener('touchend', (e) => {
            drag = false
        })
        doc('createBlock').addEventListener('touchstart', (e) => {
            drag = true
        })
        doc('createBlock').addEventListener('touchmove', (e) => {
            var target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
            
            if (drag == true && target.id.split('B')[0] == '') {
                changePixColor(target)
            }
        })

        if (doc('edit').getAttribute('active') != 'true') {
            setTimeout(() => {
                fillFrames('g', anim, () => prepareFrames(doc('createBlock'), doc('create'), anim, 0, () => {
                    doc('createBlock').querySelector('#frame1').style.display = 'block'
                    doc('preload').style.display = 'none'
                }))
            }, 500)
        } else {
            anim = animEdit
            setTimeout(() => {
                prepareFrames(doc('createBlock'), doc('create'), anim, 0, () => {
                    doc('createBlock').querySelector('#frame1').style.display = 'block'
                    doc('preload').style.display = 'none'
                })
            }, 500)
        }
    })

    doc('share').addEventListener('click', () => {
        doc('preload').style.display = 'table'
        arrToStr(anim, (e) => {
            location.search = '?' + e
        })
    })
})