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
    catch (e) {
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

//Проверка на наличее user-а в БД
alert($api_GET('http://smurfik997.96.lt/api.php?method=get_user&user_id=1'));