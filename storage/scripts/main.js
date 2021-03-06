const doc = document
if (!/index.html/.test(doc.location.href) && !/apikey/.test(doc.cookie))
    doc.location.href = 'index.html'

getElement = (query, option, element) => {
    let byId, byTagName, byClassName, byName

    if (!element) element = doc

    if (element == doc && (option == 'byId' || !option) && (byId = element.getElementById(query)))
        return byId

    if ((option == 'byName' || !option) && (byName = element.getElementsByName(query)) && byName.length > 0)
        return byName

    if ((option == 'byClassName' || !option) && (byClassName = element.getElementsByClassName(query)) && byClassName.length > 0)
        return byClassName

    if ((option == 'byTagName' || !option) && (byTagName = element.getElementsByTagName(query)) && byTagName.length > 0)
        return byTagName
}

HTMLElement.prototype.setAttr = HTMLElement.prototype.setAttribute
HTMLElement.prototype.getAttr = HTMLElement.prototype.getAttribute
HTMLElement.prototype.rmAttr = HTMLElement.prototype.removeAttribute

const apiRequest = (method, params, callback, callbackData) => {
    if (getElement(method, 'byId'))
        return false

    params = JSON.stringify(params)
    params = params.replace(/:/g, '=')
    params = params.replace(/"/g, '')
    params = params.replace(/,/g, '&')
    params = params.replace(/{/, '')
    params = params.replace(/}/, '')

    let js = doc.createElement('script')
    js.id = method
    js.src = 'https://purchase-history.herokuapp.com/' + method + '?' + params + '&callback=' + callback
    if (callbackData != undefined) {
        js.id += '-' + callbackData
        js.src += '&callback-data=' + callbackData
    }
    js.onload = () => {
        doc.body.removeChild(js)
    }
    js.onerror = () => {
        doc.body.removeChild(js)
        eval(`${callback}({
            'ERR': {
                'en': 'Server error',
                'uk': 'Сервер недоступний'
            }
        })`)
    }

    doc.body.appendChild(js)
}