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

//Проверка на наличее user-а в БД
/*
if ($api_GET($api_URL+'method=get_user&user_id='+$user_id) == 'null')
{
    if ($api_GET($api_URL+'method=save_user&user_id='+$user_id) == 'null')
    {
        $result = 'null';
    }
}*/

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

//Проверка URL фоток
function getPhotoInfo($photo_id)
{
    VK.api('photos.getById', {photos: $photo_id, v: 5.42}, function(r) {
        if(r.response) {
            $string = r.response[0].owner_id+','+r.response[0].photo_604;
            return $string;
        }
    });
    result = $string.split(',');
    var res = new Object();
        res['owner_id'] = result[0];
        res['photo_604'] = result[1];
    return res;
}

function check1()
{
    result = getPhotoInfo(document.getElementById('photo1_url').value);
    if (result['owner_id'] == $user_id)
    {
        document.getElementById('checked1').src = 'images/okey.png';
        document.getElementById('photo1_view').style = '';
        document.getElementById('photo1_view').src = result['photo_604'];
    } else {
        document.getElementById('checked1').src = 'images/fail.png';
        document.getElementById('photo1_view').style = 'height: 300px; width: 300px; background-image: url(//smurfik997.github.io/photo-exchange/images/nofoto.png); background-size: contain;';
        document.getElementById('photo1_view').src = 'images/nofoto.png';      
    }
}

function check2()
{
    //code
}
