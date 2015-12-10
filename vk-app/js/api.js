if (window.location.protocol == 'http:')
{
    window.location.protocol = 'https:';
}

function $_GET(key) 
{
    var key_req = decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)')));
    key_req = key_req.replace(new RegExp(key, "g"), "");
    key_req = key_req.replace(new RegExp("=", "g"), "");
    key_req = key_req.split(',');
    return key_req[0];
}

VK.api('fave.getPosts', {v: '5.34', extended: 0, count:1, offset: 98, access_token: $_GET('access_token')}, function(data)
{
    if (data.response && data.response.length > 0)
    {
        alert(data.response[0].id);
    }
});