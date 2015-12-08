if (window.location.protocol == 'http:')
{
    window.location.protocol = 'https:';
    location.reload();
}

function $_GET(key) 
{
    var key_req = decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)')));
    key_req = key_req.replace(new RegExp(key, "g"), "");
    key_req = key_req.replace(new RegExp("=", "g"), "");
    key_req = key_req.split(',');
    return key_req[0];
}

function click()
{
   /*for (var i=1; i<20; i++)
   {
        VK.Api.call('fave.getPosts', {offset: 98, count: 1, extended: 0, access_token: $_GET('access_token')}, function(r)
        { 
            if(r.response)
            { 
                alert('Привет, ' + r.response[0].id); 
            } 
        });     
   }*/
   alert("test");
}

window.onload = function()
{
    if ($_GET('access_token') == 'null')
    {    
        var elem = document.getElementById("main"); 
        elem.innerHTML = 'Error';
    } else {
        document.getElementById("meth").style.display = 'block';
    }
};