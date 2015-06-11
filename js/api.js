function check1()
{
    $url1 = document.getElementById("photo1_url").value;
    VK.api('photos.getById', {photos: $url1, v: '5.34'}, function(data) {
    if (data.response && data.response.length > 0) {
    $id1 = data.response[0].id;
    $owner_id1 = data.response[0].owner_id;
    $photo1 = data.response[0].photo_604;
    document.getElementById("photo1_view").src = $photo1;
    document.getElementById("checked1").src = 'images/okey.png';
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