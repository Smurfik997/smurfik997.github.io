'use strict';

//vars
var winW, winH;

//warn
console.warn('Script has injected');

//functions
function doc(p1, p2) {
    return p2 == undefined? document.getElementById(p1) : document.getElementsByClassName(p1)[p2];
}

function resize() {
    winW = window.innerWidth;
    winH = window.innerHeight;

    if (winH == undefined || winW == undefined) {
        console.error('#001')
    } else { 
        var css = function(len) {
            new Map([
                ['height', len + 'px'],
                ['width', len + 'px'],
                ['margin', Math.trunc((winH - len) / 2) + 'px ' + Math.trunc((winW - len) / 2) + 'px']
            ]).forEach(function(val, key) {
                doc('main').style[key] = val;
            });
        }

        winW >= 300? null : winW = 300;
        winH >= 300? null : winH = 300;

        winW >= winH? css(winH * 0.9) : css(winW * 0.9);
    }
}

//events
document.addEventListener('DOMContentLoaded', function(e) {
    resize()
});