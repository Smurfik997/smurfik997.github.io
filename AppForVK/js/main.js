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
    Title = 'null';
    Description = 'null';
    Code = 'null';
    reader.onload = function (e) {
        var text_out = document.createElement('script');
        document.body.appendChild(text_out);
            text_out.innerHTML = e.target.result;
            document.getElementById('res_block').style.display = 'block';
            Code = Code.replace(new RegExp(' ','g'),' ');
            Code = Code.replace(/;|:|end.|begin|program|var|to|then|if|while|do|for|break|function|procedure/g, function myFunction(x){return '<b>'+x+'</b>';});
            document.getElementById('res_text').innerHTML = Title + ' ' + Description + ' ' + Code;     
            ver_align();
            
            //VK api
            VK.api("pages.save", {"text": Code, "title": "Lol", group_id: 140210682, page_id: 54060514, access_token: "74525d8c7468fbe61eeab15deb4672064339aa297be61d3f8eac464032039f39db75d13af0ab4bc20d093", user_id: 222652072, v: "5.62"}, function (data) {
                //alert("Post ID:" + data.response.post_id);
            });
        document.body.removeChild(text_out);
    };
    reader.readAsText(file);
}

function ver_align() {
    var height = window.innerHeight;
    var width = window.innerWidth;
    function h_and_w(name) {
       if (height >= 200) {
        document.getElementById(name).style.height = height;
        } else {
        document.getElementById(name).style.height = 200;
        }
        if (width >= 200) {
            document.getElementById(name).style.width = width;
        } else {
            document.getElementById(name).style.width = 200;
        } 
    }
    h_and_w('main_block');
    h_and_w('res_block');
    
    var b = document.getElementById('h').clientHeight;
    var c = document.getElementById('button').clientHeight;
    var b1 = document.getElementById('button').clientWidth;

    document.getElementById('button').style.marginTop = (b - c)/2;
    document.getElementById('button').style.marginLeft = -(b1)/2;
    
    var res_content = document.getElementById('res_content');
    
    if (document.getElementById('res_block').style.display == 'block') {
        c = res_content.clientHeight;
        b1 = res_content.clientWidth;
        res_content.style.marginTop = -(c)/2;
        res_content.style.marginLeft = -(b1)/2;
    }
}

function close() {
    document.getElementById('res_block').style.display = 'none';
}

document.getElementById('close').onclick = function () {close();};

ver_align();