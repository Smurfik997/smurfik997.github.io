function doc(id) {
    return document.getElementById(id);
}

function click(pos, color_in, color_out) {
    if (doc(pos).style.backgroundColor == color_in) {
        doc(pos).style.backgroundColor = color_out;
    } else {
        doc(pos).style.backgroundColor = color_in;
    }
}

function save(x_count, y_count, color) {
    var count = 0, res;

    for (var y = 1; y <= y_count; y++)
    {
        for (var x = 1; x <= x_count; x++) {
            if (doc('x'+x+'y'+y).style.backgroundColor == color) {
                count++;
                if (count > 1) {
                    res = res + ',\r\n' + count + ': ' + '"'+x+' '+y+'"';
                } else {
                    res = count + ': ' + '"'+x+' '+y+'"';
                }
            }
        }
    }
    if (res != null) {
        console.log(res);
    }
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
        block.innerHTML = '<div style="height: '+height+';">'+str+'</div>' + block.innerHTML;

        str = '';
    }

    for (var y = 1; y <= y_count; y++)
    {
        for (var x = 1; x <= x_count; x++) {
            doc('x'+x+'y'+y).onclick = function(args) {
                var pos = args['target']['id'];
                click(pos, color, 'green');
            };
        }
    }

    var height = y_size*y_count+padding*2*(y_count+1)+24;
    var width = x_size*x_count+padding*2*x_count;
    doc('main_block').style.height = height;
    doc('main_block').style.width = width;
}