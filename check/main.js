loginCallback = (res) => {
    document.forms['login-form'].removeAttribute('data-loading')

    if (res.apikey) {
        document.getElementById('error-block').removeAttribute('data-visible')
        document.cookie = 'apikey=' + res.apikey
        document.location.reload()
    } else {
        document.getElementById('error-block').innerText = res.ERR.uk
        document.getElementById('error-block').setAttribute('data-visible', '')
    }
}

apiRequest = (method, params, callback) => {
    if (document.getElementById('apiRequest'))
        return false

    params = JSON.stringify(params)
    params = params.replace(/:/g, '=')
    params = params.replace(/"/g, '')
    params = params.replace(/,/g, '&')
    params = params.replace(/{/, '')
    params = params.replace(/}/, '')

    let js = document.createElement('script')
    js.id = 'apiRequest'
    js.src = 'https://sales-slip.herokuapp.com/' + method + '?' + params + '&callback=' + callback
    js.onload = (e) => {
        document.body.removeChild(js)
    }
    js.onerror = (e) => {
        document.body.removeChild(js)
        document.forms['login-form'].removeAttribute('data-loading')
        document.getElementById('error-block').innerText = 'Сервер недоступний'
        document.getElementById('error-block').setAttribute('data-visible', '')
    }
    document.body.appendChild(js)
}

if (document.forms['login-form'])
    document.forms['login-form'].onsubmit = (e) => {
        e.preventDefault()
        
        document.forms['login-form'].setAttribute('data-loading', '')
        apiRequest('api/login', {
            'invite-code': document.forms['login-form']['invite-code'].value
        }, 'loginCallback')
    }

logout = () => {
    document.cookie = 'apikey=; max-age=0'
    document.location.href = 'index.html'
}