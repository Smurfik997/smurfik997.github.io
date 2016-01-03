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

//Проверка на наличее user-а в БД
$user_id = $_GET('viewer_id');
if ($api_GET($api_URL+'method=get_user&user_id='+$user_id) == 'null')
{
    if ($api_GET($api_URL+'method=save_user&user_id='+$user_id) == 'null')
    {
        $result = 'null';
    }
}

//Фото и имя пользователя
VK.api('users.get', {user_ids: $user_id, fields: 'photo_50', v: 5.42}, function(r) { 
    if(r.response) { 
    $first_name = r.response[0].first_name;
    $last_name = r.response[0].last_name;
    $photo_user = r.response[0].photo_50;
    document.getElementById('ava').src = $photo_user;
    document.getElementById('user_name').innerHTML = $first_name+' '+$last_name;
    } 
}); 