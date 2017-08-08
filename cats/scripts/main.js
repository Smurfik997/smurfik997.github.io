function doc(val, num) {
    return num != undefined ? document.getElementsByClassName(val)[num] : document.getElementById(val);
}

function debug(val) {
    console.log('Cats:', val);
}

Math.sRandom = function(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var client = document.createElement('iframe'); 

client.src = 'scripts/cats.json';
client.setAttribute('enctype', 'application/json');
client.style.display = 'none';
client.onload = function(e) {
    var data = JSON.parse(client.contentWindow.document.body.innerText);

    var random = Math.sRandom(0, data.cats.length - 1);
    doc('content').style.backgroundImage = 'url(' + data.cats[random].url + ')';
    doc('contentSizes').style.width = data.cats[random].width;
    doc('contentSizes').style.height = data.cats[random].height;

    document.body.removeChild(client);
}

document.body.appendChild(client);

var title = 'Cats Finder';

document.title = title;
doc('pageName').innerText = title;