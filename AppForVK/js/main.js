function get_file(file_name) {
    $.get(file_name, function(data) {
        $('body').html(data);
    });
    console.log('loaded');
}
get_file('index.tpl'); //load template

var text = document.getElementsByName('text');
function resize () {
    text[0].style.height = text[0].scrollHeight + 'px';
}
resize();
