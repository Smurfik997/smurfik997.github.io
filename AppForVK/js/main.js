function get_file(file_name) {
    $.get(file_name, function(data) {
        $('body').html(data);
    });
    console.log('loaded');
}
get_file('index.tpl'); //load template

function resizeArea(text_id, minHeight, maxHeight)
{
   var area = $(text_id);
   var area_hidden = $(text_id + "_hidden");
   var text = '';
   area.value.replace(/[<>]/g, '_').split("\n").each( function(s) {
    text = text + '<div>' + s.replace(/\s\s/g, ' &nbsp;') + '&nbsp;</div>'+"\n";
   } );
   area_hidden.innerHTML = text;
   var height = area_hidden.offsetHeight + 15;
   height = Math.max(minHeight, height);
   height = Math.min(maxHeight, height);
   area.style.height = height + 'px';
}