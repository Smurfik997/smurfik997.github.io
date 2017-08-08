function changeSizes(name, cssStr) {
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

function preloaderAnim() {

}

function preloader() {
    if (doc('pagePreloader') == undefined)
    {
        var pagePreloader = document.createElement('div');
        var preloaderText = document.createElement('div');
        pagePreloader.id = 'pagePreloader';
        preloaderText.id = 'preloaderText';
        preloaderText.innerText = 'Page is prepearing...';
        document.body.appendChild(pagePreloader);
        doc('pagePreloader').appendChild(preloaderText);
        doc('mainBlock').style.display = 'none';
    }
}

function resize() {
    preloader();

    var width = document.documentElement.clientWidth;
    var height = window.innerHeight;
    var orientation = new String;
    var sizes = 'height=' + doc('contentSizes').style.height.split('px')[0] + '&width=' + doc('contentSizes').style.width.split('px')[0];
    var scales = new String;
    var scaleX = 1;
    var scaleY = 1;

    if (width > height) {
        orientation = 'orientation=width';
    } else if (width < height) {
        orientation = 'orientation=height';
    }

    if (width/720 > 1) {
        scaleX = width/720;
    }

    if (height/480 > 1) {
        scaleY = height/480;
    }

    scales = 'scaleX=' + scaleX + '&scaleY=' + scaleY;

    var clientX = document.createElement('iframe');    

    clientX.src = 'css/main.css.html?file=widthCSS' + '&' + orientation + '&' + sizes + '&' + scales;
    clientX.style.display = 'none';
    clientX.onload = function(e) {
        var dataObj = JSON.parse(clientX.contentWindow.document.body.innerText);

        for (name in dataObj) {
            var cssStr = new String;
            
            for (styleName in dataObj[name]) {
                cssStr += String(styleName + ': ' + dataObj[name][styleName] * scaleX + 'px; ');
            }

            changeSizes(name, cssStr);
        }    

        document.body.removeChild(clientX);
        document.body.appendChild(clientY); 
    }

    var clientY = document.createElement('iframe');    

    clientY.src = 'css/main.css.html?file=heightCSS' + '&' + orientation + '&' + sizes + '&' + scales;
    clientY.style.display = 'none';
    clientY.onload = function(e) {
        var dataObj = JSON.parse(clientY.contentWindow.document.body.innerText);

        for (name in dataObj) {
            var cssStr = new String;
            
            for (styleName in dataObj[name]) {
                cssStr += String(styleName + ': ' + dataObj[name][styleName] * scaleY + 'px; ');
            }

            changeSizes(name, cssStr);
        }

        doc('mainBlock').style.height = height + 'px';

        if (width != document.documentElement.clientWidth) {
            resize();
        } else if (height != window.innerHeight) {
            resize();
        }

        document.body.removeChild(clientY);

        var frames = [];
        frames = document.querySelectorAll('iframe');
    
        if (frames.length == 0) {
            doc('pagePreloader').remove();
            doc('mainBlock').style.display = 'block';
        } 
    }

    document.body.appendChild(clientX); 
}

document.body.onresize = function() {
    resize();
};

document.body.onload = function() {
    resize();
};