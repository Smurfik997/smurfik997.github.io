function doc(id) {
    return document.getElementById(id);
}

function draw(x_size, y_size, x_count, y_count, padding, block, color) {
    var str = '';

    for (var y = 1; y <= y_count; y++)
    {
        for (var x = 1; x <= x_count; x++) {
            str = str + '<button id="x'+x+'y'+y+'" style="width: '+x_size+'; height: '+y_size+'; background-color: '+color+
            '; float: left; margin: '+padding+'; border: 0; outline: 0;"></button>';
        }
        
        var height = y_size+padding*2;
        block.innerHTML = block.innerHTML + '<div style="height: '+height+';">'+str+'</div>';

        str = '';
    }

    for (var y = 1; y <= y_count; y++)
    {
        for (var x = 1; x <= x_count; x++) {
           doc('x'+x+'y'+y).onclick = function () {click(x.toString()+' '+y.toString())};
        }
    }

    var height = y_size*y_count+padding*2*y_count;
    var width = x_size*x_count+padding*2*x_count;
    doc('main_block').style.height = height;
    doc('main_block').style.width = width;
}

function click(pos) {
    console.log(pos);
}