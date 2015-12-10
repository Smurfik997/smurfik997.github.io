if (window.location.protocol == 'http:')
{
    window.location.protocol = 'https:';
}

window.onload = function(){
function $_GET(key) 
{
    var key_req = decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)')));
    key_req = key_req.replace(new RegExp(key, "g"), "");
    key_req = key_req.replace(new RegExp("=", "g"), "");
    key_req = key_req.split(',');
    return key_req[0];
}

var script = document.createElement('SCRIPT'); 

script.src = "https://api.vk.com/method/fave.getPosts?&v=5.40&extended=0&count=1&offset=98&access_token="&$_GET('access_token')&"&callback=callbackFunc"; 

document.getElementsByTagName("head")[0].appendChild(script); 

function callbackFunc(result) { 
  alert(result); 
} };