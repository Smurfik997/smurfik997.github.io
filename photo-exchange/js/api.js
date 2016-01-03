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
    VK.callMethod("showInviteBox()");
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