//Основные функции
if (window.location.protocol == 'http:')
{
    window.location.protocol = 'https:';
}

function $api_GET(url)
{ 
    var req = null;
    try
    {
        req = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e)
    {
        try
        {
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e)
        {
            try
            {
                req = new XMLHttpRequest();
            }
            catch(e)
            {                
            }
        }
    }
    if (req == null) throw new Error('XMLHttpRequest not supported');
    req.open("GET", url, false);
    req.send(null);
    return req.responseText;
}

function $_GET(key) 
{  
    var key_req = decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)')));
    key_req = key_req.replace(new RegExp(key, "g"), "");
    key_req = key_req.replace(new RegExp("=", "g"), "");
    key_req = key_req.split(',');
    return key_req[0];
}

function invite()
{
    VK.callMethod("showInviteBox");
}

$api_URL = 'https://smurfik997.herokuapp.com/api.php?';
$user_id = $_GET('viewer_id');

var api_result = decodeURIComponent(window.location.search.match(new RegExp('api_result' + '=([^&=]+)')));
alert(api_result);
//Проверка на наличее user-а в БД
/*VK.api('users.isAppUser', {user_id: '336624592'}, function(r) { 
    if(r.response) { 
        alert(r.response[0]);
    } 
}); */

//Фото и имя пользователя
VK.api('users.get', {user_ids: $user_id, fields: 'photo_50'}, function(r) { 
    if(r.response) { 
        $first_name = r.response[0].first_name;
        $last_name = r.response[0].last_name;
        $user_photo = r.response[0].photo_50;
        document.getElementById('ava').src = $user_photo;
        document.getElementById('user_name').innerHTML = $first_name+' '+$last_name;
    } 
});

//Проверка URL
    VK.api('photos.getById', {photos: $photo_id, v: 5.42}, function(r) {
        if(r.response) {
            $string = r.response[0].owner_id+','+r.response[0].photo_604;
            return $string
        }
    });

function check1()
{
    $photo_id = document.getElementById('photo1_url').value;
    VK.api('photos.getById', {photos: $photo_id, v: 5.42}, function(r) {
        var result = new Object();
        if (r.response)
        {
            result['owner_id'] = r.response[0].owner_id;
            result['photo_604'] = r.response[0].photo_604;
        } else {
            result['owner_id'] = 'null';
        }         
        if (result['owner_id'] == $user_id)
        {
            document.getElementById('checked1').src = 'images/okey.png';
            document.getElementById('photo1_view').className = 'block_img';
            document.getElementById('photo1_view').src = result['photo_604'];
        } else {
            document.getElementById('checked1').src = 'images/fail.png';
            document.getElementById('photo1_view').className = 'bl_none_img block_img';
            document.getElementById('photo1_view').src = 'images/nofoto.png';      
        }
    });
}

function check2()
{
    //code
}