function $_GET(key) 
{
    return decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)'))['1']); 
}
    
if (window.location.hash != "")
{
    hash = window.location.hash.replace(new RegExp("#","g"),"");
    window.location.href = window.location.protocol+"//"+window.location.hostname+"/vk-app/?"+hash;
} else {
    var access_token = $_GET('access_token');
    var user_id = $_GET('user_id');
    alert(access_token);
    
    if (access_token == "")
    {
        window.location.href = "https://oauth.vk.com/authorize?client_id=5175651&display=page&callback=auth&redirect_uri=https://smurfik997.github.io/vk-app/&revoke=1&response_type=token&v=5.40&scope=friends,wall,email,offline";
    } else {
        document.write(access_token);       
    }
}