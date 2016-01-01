function $_GET(key) 
{
    var key_req = decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)')));
    key_req = key_req.replace(new RegExp(key, "g"), "");
    key_req = key_req.replace(new RegExp("=", "g"), "");
    key_req = key_req.split(',');
    return key_req[0];
}

var access_token = $_GET('access_token');
var script = document.createElement('SCRIPT');

script.src = 'https://api.vk.com/method/likes.add?type=post&owner_id=222652072&item_id=8077&access_token='+access_token+'&v=5.42&callback=res'; 

document.getElementsByTagName("head")[0].appendChild(script); 

function res(result)
{ 
  alert(result); 
} 