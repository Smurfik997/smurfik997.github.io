function $_GET(key) 
{
    var key_req = decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)')));
    key_req = key_req.replace(new RegExp(key, "g"), "");
    key_req = key_req.replace(new RegExp("=", "g"), "");
    key_req = key_req.split(',');
    return key_req[0];
}
    
if (window.location.hash != "")
{
    hash = window.location.hash.replace(new RegExp("#","g"),"");
    window.location.href = window.location.protocol+"//"+window.location.hostname+"/vk-app/?"+hash;
} else {
    var access_token = $_GET('access_token');
    var user_id = $_GET('user_id');
    
    if (access_token == null)
    {
        window.location.href = "https://oauth.vk.com/authorize?client_id=5175651&display=page&callback=auth&redirect_uri=https://smurfik997.github.io/vk-app/&revoke=1&response_type=token&v=5.40&scope=friends,wall,email,offline";
    } else {
        document.write(access_token);       
    }
}