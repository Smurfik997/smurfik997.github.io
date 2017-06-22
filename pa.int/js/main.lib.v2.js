//native function of getting blocks by id
function doc(id) {
    return document.getElementById(id);
}

//function for drawing a plates
function draw(auto, width, height, x_count, y_count, padding, block, color, type, styles, padding_main) {
    if (width != undefined && height != undefined) { 
        width_b = width * x_count + padding * 2 * x_count;
        height_b = height * y_count + padding * 2 * y_count;

        //autosizing
        if (auto == 1) {
            elem = document.documentElement;

            //calculating ratio
            width_sum = width_b + padding_main * 2 + elem.clientWidth * 0.04;
            height_sum = height_b + padding_main * 2 + elem.clientHeight * 0.04;

            if (elem.clientWidth / elem.clientHeight > 1) {
                if (elem.clientWidth / elem.clientHeight > width_b / height_b) {
                    ratio = elem.clientHeight / height_sum; 
                } else if (elem.clientWidth / elem.clientHeight < width_b / height_b) {
                    ratio = elem.clientWidth / width_sum;
                } 
            } /*else if (elem.clientWidth / elem.clientHeight < 1) {
                if (elem.clientWidth / elem.clientHeight > width_b / height_b) {
                    
                } else if () {
                    
                }
            }*/

            width *= ratio;
            height *= ratio;
            width_b *= ratio;
            height_b *= ratio;
            padding *= ratio;
            padding_main *= ratio;
        }

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
    }
}