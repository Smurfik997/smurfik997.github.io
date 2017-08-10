function doc(val, num) {
    return num != undefined ? document.getElementsByClassName(val)[num] : document.getElementById(val);
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};

function preloader() {
    if (doc('pagePreloader') == undefined)
    {
        var pagePreloader = document.createElement('div');
        var preloaderText = document.createElement('div');
        pagePreloader.id = 'pagePreloader';
        preloaderText.id = 'preloaderText';
        preloaderText.innerText = 'Page is prepearing...';
        document.body.appendChild(pagePreloader);
        doc('pagePreloader').appendChild(preloaderText);
        doc('mainBlock').style.display = 'none';
    }
}

function init() {
    var title = 'Cats Finder';
    var client = document.createElement('iframe'); 
    client.src = 'images/cats/cats.json';
    client.style.display = 'none';
    client.onload = function(e) {
        var data = JSON.parse(client.contentWindow.document.body.innerText);
    
        if (data.cats == undefined) {
            window.location.reload();
        } else {
            var num;
            if (GET('num') != 'Invalid Key') {
                num = parseInt(GET('num')) - 1;
            } else {
                num = randomNum(2, data.cats.length - 1);
            }
            var script = document.createElement('script');
            script.src = 'scripts/page.js';
            document.body.appendChild(script).onload = function(e) {
                preloader();
                
                var cat = new Image();
                cat.src = data.cats[num].url;         
                cat.onload = function(e) {
                    doc('content').setAttribute('width', cat.width);
                    doc('content').setAttribute('height', cat.height);
                    doc('content').style.backgroundImage = 'url(' + cat.src + ')';
                    resize();
                    document.body.removeChild(client);
                }
            }
        }
    }

    document.title = title;
    doc('pageName').innerText = title;
    document.body.appendChild(client);
}

document.body.onload = function() {
    preloader();
    init();
}