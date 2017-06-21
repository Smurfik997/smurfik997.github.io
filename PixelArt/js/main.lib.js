function doc(id) {
    return document.getElementById(id);
}

function draw(x_size, y_size, x_count, y_count, padding, block, color) {
    var str = '';

    for (var y = 1; y <= y_count; y++)
    {
        for (var x = 1; x <= x_count; x++) {
            str = str + '<div id="x'+x+'y'+y+'" style="width: '+x_size+'; height: '+y_size+'; background-color: '+color+
            '; float: left; margin: '+padding+';"></div>';
        }
        
        var height = y_size+padding*2;
        block.innerHTML = '<div style="height: '+height+';">'+str+'</div>' + block.innerHTML;

        str = '';
    }

    var height = y_size*y_count+padding*2*y_count;
    var width = x_size*x_count+padding*2*x_count;
    doc('main_block').style.height = height;
    doc('main_block').style.width = width;
}

function draw_plates(plates, count, color) {
    for (var i = 1; i <= count; i++) {
        var pos = plates[i].split(' ');
        doc('x'+pos[0]+'y'+pos[1]).style.backgroundColor = color;
    }
}

function clear(x_count, y_count, color) {
    for (var y = 1; y <= y_count; y++)
    {
        for (var x = 1; x <= x_count; x++) {
            doc('x'+x+'y'+y).style.backgroundColor = color;
        }
    }
}