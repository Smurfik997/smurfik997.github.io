//init
var script = document.createElement('script')
script.src = 'https://vk.com/js/api/openapi.js?152'
script.onload = function(){
    VK.init({
        apiId: 6437126
    })
    
    //glVars
    var checkAge = 14, 
        userID = window.location.pathname.split('/')[1],
        token = '63eb3737fcf5f366049c16e1dfbbde55c105a27edbf6d40042a61f10b73020154e5f81fdd854ecd583c8f',
        name,
        res
    
    //asyncF 
    var asyncF = function(data) {
        console.log({'access_token': token, 'q': name, 'age_from': checkAge, 'age_to': checkAge, 'count': 1000, 'v': '5.74'}, data)
    
        data.response.items.forEach((currVal, i, arr) => {
            if (arr[i].id == userID) {
                res = checkAge
            }
        })
    
        if (res == undefined && checkAge < 120) {
            checkAge++
    
            VK.api('users.search', {'access_token': token, 'q': name, 'age_from': checkAge, 'age_to': checkAge, 'count': 1000, 'v': '5.74'}, function(data) {
                setTimeout(() => asyncF(data), 1000)
            })
        } else {
            console.log('CurrentAge: ' + res)
        }
    }
    
    //getMethod
    VK.api('users.get', {'name_case': 'nom', 'user_ids': userID, 'access_token': token, 'v': '5.74'}, function(data) {
        name = String(data.response[0]['first_name'] + ' ' + data.response[0]['last_name'].replace('\'', ' '))
        userID = data.response[0]['id']
    
        VK.api('users.search', {'access_token': token, 'q': name, 'age_from': checkAge, 'age_to': checkAge, 'count': 1000, 'v': '5.74'}, function(data) {
            setTimeout(() => asyncF(data))
        })
    }) 
}
document.head.appendChild(script)

//useManual
/*
    var script = document.createElement('script')
    script.src = 'https://smurfik997.github.io/getAge.js'
    document.head.appendChild(script)
*/