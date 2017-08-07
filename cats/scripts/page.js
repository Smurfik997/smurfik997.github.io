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
    var width = window.innerWidth;
    var height = window.innerHeight;
    var scaleX = 1;
    var scaleY = 1;

    if (width/720 > 1) {
        scaleX = width/720;
    }

    if (height/480 > 1) {
        scaleY = height/480;
    }

    var clientX = new XMLHttpRequest();

    clientX.open("GET", "css/widthCSS.json", true);
    clientX.send();
    clientX.onload = function(e) {
        if (clientX.readyState === 4 && clientX.status === 200) {
            var dataObj = JSON.parse(clientX.responseText, {});

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
        } 
    }

    var clientY = new XMLHttpRequest();
    
    clientY.open("GET", "css/heightCSS.json", true);
    clientY.send();
    clientY.onload = function(e) {
        if (clientY.readyState === 4 && clientY.status === 200) {
            var dataObj = JSON.parse(clientY.responseText, {});

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
        }
    } 

    console.log(scaleX, scaleY);
}

document.body.onresize = function() {
    onResize();
};

document.body.onload = function() {
    onResize();
};