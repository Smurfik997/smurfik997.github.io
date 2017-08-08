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

function onResize() {
    doc('pagePreloader').style.display = 'block';

    var width = window.innerWidth;
    var height = window.innerHeight;
    var priority = new String;
    var scaleX = 1;
    var scaleY = 1;

    if (width > height) {
        priority = 'priority=width';
    } else if (width < height) {
        priority = 'priority=height';
    }

    if (width/720 > 1) {
        scaleX = width/720;
    }

    if (height/480 > 1) {
        scaleY = height/480;
    }

    var clientX = document.createElement('iframe');    
    clientX.src = 'css/main.css.html?file=widthCSS' + '&' + priority;
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

        if (width != window.innerWidth) {
            onResize();
        }

        document.body.removeChild(clientX);
        document.body.appendChild(clientY); 
    }

    var clientY = document.createElement('iframe');    
    clientY.src = 'css/main.css.html?file=heightCSS' + '&' + priority;
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

        if (height != window.innerHeight) {
            onResize();
        }

        doc('mainBlock').style.height = height + 'px';

        document.body.removeChild(clientY);

        var frames = [];
        frames = document.querySelectorAll('iframe');
    
        if (frames.length == 0) {
            if (doc('pagePreloader')) {
                doc('pagePreloader').style.display = 'none';
            }
        } 
    }

    document.body.appendChild(clientX); 
}

document.body.onresize = function() {
    onResize();
};

document.body.onload = function() {
    onResize();
};