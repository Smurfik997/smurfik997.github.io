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
client.setAttribute('enctype', 'application/json');
client.style.display = 'none';
client.onload = function(e) {
    var data = JSON.parse(client.contentWindow.document.body.innerText);

    var random = Math.sRandom(0, data.cats.length - 1);
    
    doc('content').setAttribute('imageURL', data.cats[random].url)
    doc('contentSizes').style.width = data.cats[random].width;
    doc('contentSizes').style.height = data.cats[random].height;

    document.body.removeChild(client);

    var script = document.createElement('script');
    script.src = 'scripts/page.js';
    document.body.appendChild(script).onload = function() {
        preloader();
        
        var cat = new Image()
        cat.src = doc('content').getAttribute('imageURL');
        doc('content').removeAttribute('imageURL');
        cat.onload = function(e) {
            doc('content').style.backgroundImage = 'url(' + cat.src + ')';
            resize();
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