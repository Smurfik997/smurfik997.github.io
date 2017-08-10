function changeSizes(dataObj, scale) {
    for (name in dataObj) {
        var cssStr = new String;
        
        for (styleName in dataObj[name]) {
            cssStr += String(styleName + ': ' + dataObj[name][styleName] * scale + 'px; ');
        }

        if (name.split('#')[1] != undefined) {
            doc(name.split('#')[1]).style.cssText += cssStr;
        } else if (name.split('.')[1] != undefined) {
            [].forEach.call(document.getElementsByClassName(name.split('.')[1]), function(e) {
                e.style.cssText += cssStr;
            });
        } else {
            document.getElementsByTagName(name)[0].style.cssText += cssStr;
        }
    }
}

function removePreloader() {
    var frames = [];
    frames = document.querySelectorAll('iframe');

    if (frames.length == 0) {
        doc('pagePreloader').remove();
        doc('mainBlock').style.display = 'block';
    } 
}

function resize(params) {
    var width = document.documentElement.clientWidth;
    var height = window.innerHeight;
    var content;
    console.log(height, width);
    var orientation = new String;
    var sizes = 'height=' + doc('content').getAttribute('height').split('px')[0] + '&width=' + doc('content').getAttribute('width').split('px')[0];
    var scales = new String;
    var scaleX = 1;
    var scaleY = 1;

    if (width > height) {
        orientation = 'orientation=width';
    } else if (width < height) {
        orientation = 'orientation=height';
    }

    if (params == undefined) {
        content = 'content=' + orientation.split('=')[1];
    } else {
        content = params.content;
    }
    console.log(content);

    if (width/720 > 1) {
        scaleX = width/720;
    }

    if (height/480 > 1) {
        scaleY = height/480;
    }

    scales = 'scaleX=' + scaleX + '&scaleY=' + scaleY;
    console.log(scales);

    if (doc('clientX') != undefined) {
        doc('clientX').remove();
    }

    if (doc('clientY') != undefined) {
        doc('clientY').remove();
    }

    var clientX = document.createElement('iframe');    
    var clientY = document.createElement('iframe');    
    clientX.id = 'clientX';
    clientX.src = 'css/main.css.html?file=widthCSS' + '&' + orientation + '&' + sizes + '&' + scales + '&' + content;
    clientX.style.display = 'none';
    clientY.id = 'clientY';
    clientY.src = 'css/main.css.html?file=heightCSS' + '&' + orientation + '&' + sizes + '&' + scales + '&' + content;
    clientY.style.display = 'none';

    clientX.onload = function(e) {
        var dataObj = JSON.parse(clientX.contentWindow.document.body.innerText);

        if (dataObj.errorCode != undefined) {
            console.log(dataObj);
        } else {
            changeSizes(dataObj, scaleX);
            document.body.removeChild(clientX);
            document.body.appendChild(clientY); 
        }
    }

    
    clientY.onload = function(e) {
        var dataObj = JSON.parse(clientY.contentWindow.document.body.innerText);

        if (dataObj.errorCode != undefined) {
            console.log(dataObj);
        } else {
            changeSizes(dataObj, scaleY);
            document.body.removeChild(clientY);
            doc('mainBlock').style.height = height + 'px';
            
            if (doc('content').style.height.split('px')[0] > 350 * scaleY || doc('content').style.width.split('px')[0] > 612 * scaleX) {
                console.log(doc('content').style.height.split('px')[0], 350 * scaleY);
                console.log(doc('content').style.width.split('px')[0], 612 * scaleX);
                if (orientation.split('=')[1] == 'width') 
                {
                    resize({"content": "content=height"});
                } else {
                    resize({"content": "content=width"});
                }
            }

            console.log(orientation);

            if (width != document.documentElement.clientWidth) {
                resize();
            } else if (height != window.innerHeight) {
                resize();
            }

            removePreloader();
        }
    }

    document.body.appendChild(clientX); 
}

document.body.onresize = function(e) {
    preloader();
    resize();
};