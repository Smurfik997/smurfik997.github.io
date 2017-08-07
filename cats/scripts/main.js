function doc(val, num) {
    return num != undefined ? document.getElementsByClassName(val)[num] : document.getElementById(val);
}

function debug(val) {
    console.log('Cats:', val);
}

Math.sRandom = function(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var client = new XMLHttpRequest();

client.open("GET", "scripts/cats.json", true);
client.send();
client.onload = function(e) {
    if (client.readyState === 4 && client.status === 200) {
        var data = JSON.parse(client.responseText, {});

        var random = Math.sRandom(0, data.cats.length - 1);
        debug(data.cats[random].url); 
    }
}

var title = 'Cats Finder';

document.title = title;
doc('pageName').innerText = title;