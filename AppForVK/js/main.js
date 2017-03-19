/*function get_file(file_name) {
    $.get(file_name, function(data) {
        $('body').html(data);
    });
    console.log('loaded');
}
get_file('index.tpl'); //load template*/

var access_token = "74525d8c7468fbe61eeab15deb4672064339aa297be61d3f8eac464032039f39db75d13af0ab4bc20d093";
var user_id = 222652072;
var group_id = 140210682;

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
}

function file_upload(files) {
    var file = files[0];
    
    VK.api("docs.getUploadServer", {"group_id": group_id, "access_token": access_token, v: "5.62"}, function (data) {
        alert(data.response.upload_url);
        
        /*xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', data.response.upload_url, true);
        xmlhttp.setRequestHeader('Content-Type', 'multipart/form-data');
        xmlhttp.send("file=" + file); 
        xmlhttp.onreadystatechange = function() { 
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) { 
                    alert(xmlhttp.responseText);
                }
            }
        };*/
    
        $.ajax({
        url: data.response.upload_url,
        data: file,
        processData: false,
        contentType: "multipart/form-data",
        type: 'POST',
        success: function (data) {
                alert(data);
            }
        });
        /*$.post(data.response.upload_url, {"file":file}, function (data) {
            alert('ok');
            VK.api("docs.save", {"file": data.response.file, "title": 'lol', "access_token": access_token, v: "5.62"}, function (data) {
                alert(data.response.url);
            });
        });*/
    });  
}

function upload() {
    //VK api
    VK.api("pages.save", {"text": Code+'<br/><center><b>Download:</b> [http://v.com/doc|program.pas]</center>', "title": Title, "group_id": group_id, "access_token": access_token, "user_id": user_id, v: "5.62"}, function (data) {
        var m_text = document.createElement('div');
        document.body.appendChild(m_text);
            m_text.innerHTML = 'Title: '+Title+'<br/>Description: '+Description;
            message_text = m_text.innerText;
            VK.api("wall.post", {owner_id: '-'+group_id, from_group: 1, attachments: "page-140210682_"+data.response, message: message_text, "access_token": access_token, v: "5.62"});
        document.body.removeChild(m_text);
        close();
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
    document.getElementById('button').innerText = 'Select Program File';
    document.getElementById('text-file').onchange = function() {file_upload(this.files);};
    document.getElementById('button').style.display = 'block';
    document.getElementById('button1').style.display = 'none';
    document.getElementById('first_step').style.background = '#008000';
    ver_align();
}

ver_align();