//native function of getting blocks by id
function doc(id) {
    return document.getElementById(id);
}

//native function of getting blocks by tag name
function doc_t(tag) {
    return document.getElementsByTagName(tag);
}

//function for drawing plates
function draw(auto, width, height, x_count, y_count, padding, block, color, type, styles, padding_main) {
    if (width != undefined && height != undefined) { 
        width_b = width * x_count + padding * 2 * x_count;
        height_b = height * y_count + padding * 2 * y_count;

        //configurating block
        block.style.width = width_b;
        block.style.height = height_b;
        block.style.padding = padding_main;

        for (y = 1; y <= y_count; y++) {
            //generating x blocks
            delete x_blocks;

            var x_blocks = '<'+ type +' id="1' +' '+ y +'"' +
            'style="width: '+ width +'; height: '+ height +'; background-color: '+ color +'; margin: '+ padding +';'+ 
            styles + ' float: left;"></'+ type +'>';

            for (x = 2; x <= x_count; x++) {
                x_blocks += '<'+ type +' id="'+ x +' '+ y +'"' +
                'style="width: '+ width +'; height: '+ height +'; background-color: '+ color +'; margin: '+ padding +';'+ 
                styles + ' float: left;"></'+ type +'>';
            }

            //insert content
            block.innerHTML = '<div>'+ x_blocks +'</div>'+ block.innerHTML;
        }

        //autosize
        if (auto == 1)
        {
            onBodyResize(['width','height','margin','padding']);
            doc_t('body')[0].onresize = function() {
                onBodyResize(['width','height','margin','padding']);
            };
        }
    }
}

//native function
function draw_plates(plates, x_count, y_count, offset_x, offset_y, color) {
    var i = 1;

    while (true) {
        if (plates[i] != undefined)
        {
            var pos = plates[i].split(' ');
            x = parseInt(pos[0]);
            y = parseInt(pos[1]);

            if (doc((x + offset_x) +' '+ (y + offset_y)) != null && x <= x_count && y <= y_count) {
                doc((x + offset_x) +' '+ (y + offset_y)).style.backgroundColor = color;
            }
            i++;
        } else {
            break;
        }
    }
}

//function for clearing current plates
function clear(x_count, y_count, offset_x, offset_y, color) {
    for (var y = 1; y <= y_count; y++)
    {
        for (var x = 1; x <= x_count; x++) {
            if (doc((x + offset_x) +' '+ (y + offset_y)) != null) {
                doc((x + offset_x) +' '+ (y + offset_y)).style.backgroundColor = color;
            }
        }
    }
}

function onBodyResize(types) {
    elem = document.documentElement;
    width_sum = parseFloat(doc('main_block').style.width) / 0.92;
    height_sum = parseFloat(doc('main_block').style.height) / 0.92;
    clientWidth = elem.clientWidth;
    clientHeight = elem.clientHeight;

    //calculating ratio
    if (clientWidth / clientHeight > 0) {
        if (clientWidth / clientHeight >= width_sum / height_sum) {
            ratio = clientHeight / height_sum; 
        } else if (clientWidth / clientHeight < width_sum / height_sum) {
            ratio = clientWidth / width_sum;
        } 
    }
    
    var i = 0;
    var k = 0;

    while (true) { 
        if (doc_t('div')[i] != null) {  
            while (true) {
                if (types[k] != undefined) {
                    elem = eval("doc_t('div')[i].style." + types[k]);
                    if (elem != '')
                    {
                        eval('doc_t("div")[i].style.' + types[k] + ' = parseFloat(elem) * ratio');  
                        if (i == 8 && k == 4) {
                            console.log(doc_t('div')[8].style.borderRadius = 50);
                        }
                    }
                    k++;
                } else {
                    break;
                }
            }
            k = 0;
            i++;
        } else {
            break;
        }
    }
}