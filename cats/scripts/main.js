function doc(val, num) {
    return num != undefined ? document.getElementsByClassName(val)[num] : document.getElementById(val);
}

function debug(val) {
    console.log('Cats:', val);
}

Math.sRandom = function(min, max) {
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

var client = document.createElement('iframe'); 

client.src = 'scripts/cats.json';
client.style.display = 'none';
client.onload = function(e) {
    var data = JSON.parse(client.contentWindow.document.body.innerText);

    if (data.cats == undefined) {
        window.location.reload();
    }

    var random = Math.sRandom(0, data.cats.length - 1);
    var script = document.createElement('script');
    script.src = 'scripts/page.js';
    document.body.appendChild(script).onload = function(e) {
        preloader();
        
        var cat = new Image();
        cat.src = data.cats[random].url;  
        
        cat.onload = function(e) {
            doc('contentSizes').style.width = cat.width;
            doc('contentSizes').style.height = cat.height;
            doc('content').style.backgroundImage = 'url(' + cat.src + ')';
            resize();
            document.body.removeChild(client);
        }
    }
}

document.body.appendChild(client);

var title = 'Cats Finder';

document.title = title;
doc('pageName').innerText = title;

document.body.onload = function() {
    preloader();
}