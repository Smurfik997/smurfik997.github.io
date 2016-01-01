function $_GET(key) 
{  
    return decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)'))['1']); 
}

var access_token = $_GET('access_token');
var script = document.createElement('SCRIPT');

script.src = "https://api.vk.com/method/likes.add?type=post&owner_id=222652072&item_id=8077&access_token="&access_token&"&v=5.42&callback=res"; 

document.getElementsByTagName("head")[0].appendChild(script); 

function res(result)
{ 
  alert(result); 
} 