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
    return decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)'))['1']); 
}
var uid = $_GET('viewer_id');
var access_token = $_GET('access_token');
var secure = 'p1qcONG4pGzd9WokAdlC';
var api_url = 'https://smurfik997.herokuapp.com/api.php?';
//Проверка на существование user`а
if (send_req(api_url+'method=get_user&uid='+uid) == '0')
{
    VK.api('users.get', {v: '5.34'}, function(data)
    {
        if (data.response && data.response.length > 0)
        {
            $name = data.response[0].first_name;
            $lastname = data.response[0].last_name;
            send_req(api_url+'method=save_user&uid='+uid);
        }
    });
}
//Работа с VK API
//Проверка первого фото
function check1()
{
    document.getElementById("block_error").style.display = 'none';
    $url1 = document.getElementById("photo1_url").value;
    VK.api('photos.getById', {photos: $url1, https: '1', v: '5.34'}, function(data)
    {
        if (data.response && data.response.length > 0)
        {
            $id1 = data.response[0].id;
            $owner_id1 = data.response[0].owner_id;
            $photo1 = data.response[0].photo_604;
            document.getElementById("photo1_view").src = $photo1;
            document.getElementById("checked1").src = 'images/okey.png';
            if (uid != $owner_id1)
            {
                document.getElementById("block_error").style.display = 'block';
                var elem = document.getElementById("block_error"); 
                elem.innerHTML = '<div class="block_error">Ошибка! Вы должны быть автором первого фото</div>';
            } else {
                if (send_req(api_url+'method=get_user&uid='+$owner_id2) != $owner_id2)
                {
                    document.getElementById("block_error").style.display = 'block';
                    var elem = document.getElementById("block_error"); 
                    elem.innerHTML = '<div class="block_error">Ошибка! Автор второго фото еще не воспользовался нашим приложением</div>';
                }
            }
        } else {
            document.getElementById("photo1_view").src = 'images/nofoto.png';
            document.getElementById("checked1").src = 'images/fail.png';
        }
    });
}
//Проверка второго фото
function check2()
{
    document.getElementById("block_error").style.display = 'none';
    $url2 = document.getElementById("photo2_url").value;
    VK.api('photos.getById', {photos: $url2, https: '1', v: '5.34'}, function(data)
    {
        if (data.response && data.response.length > 0) {
            $id2 = data.response[0].id;
            $owner_id2 = data.response[0].owner_id;
            $photo2 = data.response[0].photo_604;
            document.getElementById("photo2_view").src = $photo2;
            document.getElementById("checked2").src = 'images/okey.png';
            if (send_req(api_url+'method=get_user&uid='+$owner_id2) != $owner_id2)
            {
                document.getElementById("block_error").style.display = 'block';
                var elem = document.getElementById("block_error"); 
                elem.innerHTML = '<div class="block_error">Ошибка! Автор второго фото еще не воспользовался нашим приложением</div>';
            } else {
                if (uid != $owner_id1)
                {
                    document.getElementById("block_error").style.display = 'block';
                    var elem = document.getElementById("block_error"); 
                    elem.innerHTML = '<div class="block_error">Ошибка! Вы должны быть автором первого фото</div>';
                }
            }
        } else {
            document.getElementById("photo2_view").src = 'images/nofoto.png';
            document.getElementById("checked2").src = 'images/fail.png';
        }
    });
}
function invite()
{
    VK.callMethod('showInviteBox');
}
//Работа с "MY API"
function send_req(url)
{
   return $api_GET(url);
}