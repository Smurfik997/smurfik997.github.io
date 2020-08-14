let data, sendCallback, recordCallback, getListCallback

if (data = JSON.parse(localStorage.getItem('form-data'))) {
    localStorage.clear()
    const main = getElement('main', 'byTagName')[0]
    const status = getElement('status')
    main.setAttr('data-send', '')
    let apikey
    try {
        apikey = encodeURIComponent(doc.cookie.split('apikey=')[1].split(';')[0])
    } catch {
        main.rmAttr('data-loading')
        main.setAttr('data-error', '')
        status.innerHTML = 'Невірний код'
        throw new Error('apikey fault')
    }
    
    const sendedholder = getElement('data-sended')
    const totalholder = getElement('data-total')
    
    let sended = 0
    let total = 0

    const addRecord = () => {
        status.innerHTML = 'Завершення надсилання'
        total++
        totalholder.innerHTML = total

        if (!parseInt(data['shop-name']))
            data['shop-name'] = localStorage.getItem(data['shop-name'])

        let finalData = data['shop-name'] + '_' + data['date']

        data['products'].forEach(el => {
            if (!parseInt(el.product))
                el.product = localStorage.getItem(el.product)

            finalData += '_' + el.product + '_' + el.count

            if (el.type == 'kgs')
                finalData += '_0'
            else
                finalData += '_1'
            
            finalData += '_' + el.price
        })

        localStorage.clear()
        sessionStorage.setItem('data', finalData)
        apiRequest('api/addRecord', {
            'data': finalData,
            'apikey': apikey
        }, 'recordCallback')
    }

    recordCallback = (res) => {
        if (res.ERR) {
            sessionStorage.clear()
            main.rmAttr('data-loading')
            main.setAttr('data-error', '')
            status.innerHTML = res.ERR.uk
            return
        }

        sended++
        sendedholder.innerHTML = sended

        status.innerHTML = 'Збережено'
        main.rmAttr('data-loading')
        main.setAttr('data-loaded', '')

        doc.location.href = 'transfer.html#view'
        doc.location.reload()
    }
    
    sendCallback = (res) => {
        if (main.getAttr('data-error'))
            return

        if (res.ERR) {
            main.rmAttr('data-loading')
            main.setAttr('data-error', '')
            status.innerHTML = res.ERR.uk
            return
        }

        sended++
        sendedholder.innerHTML = sended
        
        if (res['callback-data'] == 'shop')
            localStorage.setItem(res['shop-name'], res.id)
        else
            localStorage.setItem(res['product-name'], res.id)

        if (sended == total)
            addRecord()
    }

    data.products.forEach((el, index) => {
        if (!parseInt(el['product'])) {
            const productName = encodeURIComponent(el['product'])
            if (getElement('api/addProduct-' + productName))
                return

            total++
            totalholder.innerHTML = total

            apiRequest('api/addProduct', {
                'product-name': productName,
                'apikey': apikey
            }, 'sendCallback', productName)
        }
    })

    if (!parseInt(data['shop-name'])) {
        total++
        totalholder.innerHTML = total
        apiRequest('api/addShop', {
            'shop-name': encodeURIComponent(data['shop-name']),
            'apikey': apikey
        }, 'sendCallback', 'shop')
    }

    if (total == 0)
        addRecord()
} else {
    localStorage.clear()
    
    class getList {
        constructor() {
            this.loaded = 0
            this.error = false
            this.status = getElement('status')
            this.countholder = getElement('data-loaded')
            this.main = getElement('main', 'byTagName')[0]
        }

        callback(type, res) {
            if (res.ERR) {
                this.error = true
                this.status.innerHTML = res.ERR.uk
                this.main.rmAttr('data-loading')
                this.main.setAttr('data-error', '')
            } else if (!this.error) {
                this.loaded++
                this.countholder.innerHTML = this.loaded
                localStorage.setItem(type + 's', JSON.stringify(res))

                if (this.loaded == 2) {
                    this.status.innerHTML = ''
                    this.main.rmAttr('data-loading')
                    this.main.setAttr('data-loaded', '')
                    if (!doc.location.hash)
                        doc.location.href = 'create.html'
                    else
                        doc.location.href = doc.location.hash.split('#')[1] + '.html'
                }
            }
        }

        shops(res) { this.callback('shop', res) }
        products(res) { this.callback('product', res) }
    }

    getListCallback = new getList()

    apiRequest('api/getShops', null, 'getListCallback.shops')
    apiRequest('api/getProducts', null, 'getListCallback.products')
}