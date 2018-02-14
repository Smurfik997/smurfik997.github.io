'use strict';

//vars
var winW, winH, docE;

docE = document.documentElement;

//warn
console.warn('Script has injected');

//functions
function doc(p1, p2) {
    return p2 == undefined? document.getElementById(p1) : document.getElementsByClassName(p1)[p2];
}

function resize() {
    winW = docE.clientWidth;
    winH = docE.clientHeight;

    if (winH == undefined || winW == undefined) {
        console.error('#001')
    } else { 
        var css = function(len) {
            new Map([
                ['height', len + 'px'],
                ['width', len + 'px'],
                ['marginLeft', (winW - len) / 2 + 'px'],
                ['marginTop', (winH - len) / 2 + 'px']
            ]).forEach(function(val, key) {
                console.log(val, key);
                doc('main').style[key] = val;
            });
        }

        winW >= winH? css(winH * 0.9): css(winW * 0.9);
    }
}

//events
document.body.onresize = resize();
windows.onresize = resize();