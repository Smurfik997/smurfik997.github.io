$info = $api_GET('http://smurfik997.96.lt/api.php');
alert($info);
if (window.location.protocol == 'https:')
{
    SetTimeout("window.location.protocol = 'http:', 5000");
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
    return decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)'))[1]); 
}
function check1()
{
    document.getElementById("block_error").style.display = 'none';
    $url1 = document.getElementById("photo1_url").value;
    VK.api('photos.getById', {photos: $url1, v: '5.34'}, function(data) {
    if (data.response && data.response.length > 0) {
        $id1 = data.response[0].id;
        $owner_id1 = data.response[0].owner_id;
        $photo1 = data.response[0].photo_604;
        document.getElementById("photo1_view").src = $photo1;
        document.getElementById("checked1").src = 'images/okey.png';
        $uid = $_GET('viewer_id');
        if ($uid != $owner_id1) {
            document.getElementById("block_error").style.display = 'block';
            var elem = document.getElementById("block_error"); 
            elem.innerHTML = '<div class="block_error">Ошибка! Вы должны быть автором первого фото</div>';
        }
    } else {
        document.getElementById("photo1_view").src = 'images/nofoto.png';
        document.getElementById("checked1").src = 'images/fail.png';
    }
    });
}
function check2()
{
    $url2 = document.getElementById("photo2_url").value;
    VK.api('photos.getById', {photos: $url2, v: '5.34'}, function(data) {
    if (data.response && data.response.length > 0) {
    $id2 = data.response[0].id;
    $owner_id2 = data.response[0].owner_id;
    $photo2 = data.response[0].photo_604;
    document.getElementById("photo2_view").src = $photo2;
    document.getElementById("checked2").src = 'images/okey.png';
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
