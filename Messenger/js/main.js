function scroll_fix()
{
    var scroll_block = document.createElement('div');

    scroll_block.style.overflowY = 'scroll';
    scroll_block.style.visibility = 'hidden';
                
    document.body.appendChild(scroll_block);
    var scrollWidth = scroll_block.offsetWidth - scroll_block.clientWidth;
    document.body.removeChild(scroll_block);
            
    document.getElementById('scroll_fix').style.width = String(window.innerWidth - scrollWidth) + 'px';
    document.getElementById('scroll_fix').style.marginLeft = String(scrollWidth/2) + 'px';
    document.getElementById('scroll_fix').style.marginRight = String(scrollWidth/2) + 'px';
}

$(document).ready(function() {
    block = [
        document.getElementsByClassName('settings_button')[0],
        document.getElementsByClassName('settings_button')[1]
    ];
    block[0].onclick = function() {
        if(block[0].className == 'settings_button') {
            block[0].className = block[0].className + ' rotate';
            setTimeout(function(){},1500);
        } else {
            block[0].className = 'settings_button unrotate';
            setTimeout(function(){block[0].className = 'settings_button';},1500);
        }
    };
    block[1].onclick = function() {
        block[1].className = block[1].className + ' messages_button_clicked';
        setTimeout(function(){block[1].className = 'messages_button settings_button';},200);
    };
});

/*function get_file() {
    $.get("test.txt", function(data){$("#res").html(data);});
    console.log("updated");
}
window.onload = function() {
    setInterval(function() {get_file();}, 1000);
};*/