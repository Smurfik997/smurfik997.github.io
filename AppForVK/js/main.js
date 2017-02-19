function get_file(file_name) {
    $.get(file_name, function(data) {
        $('body').html(data);
    });
    console.log('loaded');
}
get_file('index.tpl'); //load template

/*var text = document.getElementsByName('text');

/function resize_main(data) {
    function resize() {
        text[0].style.height = text[0].scrollHeight + 'px';
        console.log(text[0].scrollHeight);
    }
    if (data == 1) {
        timer = setInterval(function() {
            resize();
        }, 0);
    } else {
        clearInterval(timer);
    }
}
resize_main();*/
