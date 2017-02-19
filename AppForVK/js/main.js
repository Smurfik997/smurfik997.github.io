function get_file(file_name) {
    $.get(file_name, function(data) {
        $('body').html(data);
    });
    console.log('loaded');
}
get_file('index.tpl'); //load template

var text = document.getElementsByName('text');
height1 = text[0].style.height;
height2 = '';

function resize_main() {
    function resize() {
        height1 = text[0].style.height;
        text[0].style.height = text[0].scrollHeight + 'px';
        height2 = text[0].style.height;
        console.log(text[0].scrollHeight);
    }
    if (height1 != height2) {
        timer = setInterval(function() {
            resize();
        }, 0);
    } else {
        clearInterval(timer);
    }
}
resize_main();
