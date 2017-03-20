function $_GET(key) {
    var s = window.location.search;
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;
}

var access_token = $_GET('access_token');
var user_id = $_GET('viewer_id');
var group_id = 140210682;
var v = '5.63';

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
            document.getElementById('button').style.display = 'none';
            document.getElementById('button1').style.display = 'block';
            Code = Code.replace(new RegExp(' ','g'),' ');
            Code = Code.replace(/;|:|end.|begin|program|var|to|then|if|while|do|for|break|function|procedure/g, function myFunction(x){return '<b>'+x+'</b>';});
            ver_align();
        document.body.removeChild(text_out);
    };
    reader.readAsText(file);
    document.getElementById('first_step').style.background = '#008000';
}

function upload() {
    //VK api
    Document_Id = Document_Url.replace(new RegExp('https://vk.com/doc','g'),'');
    VK.api('docs.getById', {'docs': Document_Id, 'access_token': access_token, v: '5.63'}, function (data) {
        VK.api('pages.save', {'text': Code+'<br/><center><b>Download:</b> ['+Document_Url+'|'+data.response[0].title+']</center>', 'title': Title, 'group_id': group_id, 'access_token': access_token, 'user_id': user_id, 'v': v}, function (data) {
            var m_text = document.createElement('div');
            document.body.appendChild(m_text);
            m_text.innerHTML = 'Title: '+Title+'<br/>Description:'+Description;
            message_text = m_text.innerText;
            Document_Url = Document_Url.replace(new RegExp('https://vk.com/','g'),'');
            VK.api('wall.post', {'owner_id': '-'+group_id, 'from_group': 1, 'attachments': ['page-'+group_id+'_'+data.response,Document_Url], 'message': message_text, 'access_token': access_token, 'v': v});
                document.body.removeChild(m_text);
                document.getElementById('second_step').style.background = '#008000';
                close();
            });
    });
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
        if (width >= 250) {
            document.getElementById(name).style.width = width;
        } else {
            document.getElementById(name).style.width = 250;
        } 
    }
    h_and_w('main_block');
    //h_and_w('res_block');
    
    var b = document.getElementById('h').clientHeight;
    
    function center_button(name) {
        var c = document.getElementById(name).clientHeight;
        var b1 = document.getElementById(name).clientWidth;

        document.getElementById(name).style.marginTop = (b - c - 30)/2;
        document.getElementById(name).style.marginLeft = -(b1)/2; 
    }
    
    center_button('button');
    center_button('button1');
    
    /*var res_content = document.getElementById('res_content');
    
    if (document.getElementById('res_block').style.display == 'block') {
        c = res_content.clientHeight;
        b1 = res_content.clientWidth;
        res_content.style.marginTop = -(c)/2;
        res_content.style.marginLeft = -(b1)/2;
    }*/
}

function close() {
    document.getElementById('button1').innerText = 'Close';
    document.getElementById('button1').onclick = function() {close_and_next();};
    ver_align();
}

function close_and_next() {
    document.getElementById('first_step').style.background = '#ffa500';
    document.getElementById('second_step').style.background = '#ffa500';
    document.getElementById('button1').innerText = 'Continue';
    document.getElementById('button1').onclick = function() {upload();};
    document.getElementById('button1').style.display = 'none';
    document.getElementById('button').style.display = 'block';
    ver_align();
}

ver_align();