/*function get_file(file_name) {
    $.get(file_name, function(data) {
        $('body').html(data);
    });
    console.log('loaded');
}
get_file('index.tpl'); //load template*/

function file_func(files) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        Title = 'null';
        Description = 'null';
        Code = 'null';
        var text_out = document.createElement('script');      
        document.body.appendChild(text_out);
            text_out.innerHTML = e.target.result;
            alert(Title + ' ' + Description + ' ' + Code);
        document.body.removeChild(text_out);
    };
    reader.readAsText(file);
}

function ver_align() {
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    if (height >= 200) {
        document.getElementById('main_block').style.height = height;
    } else {
        document.getElementById('main_block').style.height = 200;
    }
    if (width >= 200) {
        document.getElementById('main_block').style.width = width;
    } else {
        document.getElementById('main_block').style.width = 200;
    }
    
    var a = document.getElementById('main_block').clientHeight;
    var b = document.getElementById('h').clientHeight;
    var c = document.getElementById('text-file').clientHeight;

    var a1 = document.getElementById('main_block').clientWidth;
    var b1 = document.getElementById('button').clientWidth;

    document.getElementById('button').style.marginTop = (a - b - c)/2;
    document.getElementById('button').style.marginLeft = (a1 - b1)/2;
}

ver_align();