if (window.location.protocol == 'http:')
{
    window.location.protocol = 'https:';
    location.reload()
}

function $_GET(key) 
{
    var key_req = decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)')));
    key_req = key_req.replace(new RegExp(key, "g"), "");
    key_req = key_req.replace(new RegExp("=", "g"), "");
    key_req = key_req.split(',');
    return key_req[0];
}

if ($_GET('access_token') == 'null')
{
    var elem = document.getElementById("block_error"); 
    elem.innerHTML = '<div>Ошибка! Автор второго фото еще не воспользовался нашим приложением</div>';
} else {
    
}