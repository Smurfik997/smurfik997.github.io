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