function get_file(file_name) {
    $.get(file_name, function(data) {
        $('body').html(data);
    });
    console.log('loaded');
}
get_file('index.tpl'); //load template

function file_func(files) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        alert(e.target.result);
    };
    reader.readAsText(file);
}

function ver_align() {
    var a = document.getElementById('main_block').clientHeight;
    var b = document.getElementById('h').clientHeight;
    var c = document.getElementById('text-file').clientHeight;
    
    document.getElementById('button').style.width = document.getElementById('button').clientWidth + 15;
    var a1 = document.getElementById('main_block').clientWidth;
    var b1 = document.getElementById('button').clientWidth;
    
    document.getElementById('button').style.marginTop = (a - b - c)/2;
    document.getElementById('button').style.marginLeft = (a1 - b1)/2;
}

window.onload = function() {
    ver_align();
};