function get_Product_list() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:4007/user/fetch-product',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<div class="col-lg-4 col-md-12 mt-3">'
                    html += '<div class="card w-75 projects">'
                    html += '<img src="' + data.data[i].image + '" class="card-img-top">'
                    html += '<div class="card-body">'
                    html += '<h5 class="card-title">' + data.data[i].name + '</h5>'
                    html += '<p class="card-text" style="text-align: justify;">' + data.data[i].price + ' tk</p>'
                    html += '</div>'
                    html += '</div>'
                    html += '</div>'
                }
                $('#pro-list').html(html)
            } else {
                $('#pro-list').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('#pro-list').html('<span class="text-danger">' + err.statusText + '</span>')
        }
    })
}
var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == '') {
    get_Product_list()
}
$(document).on('click', '#registration', function() {
    var first_name = $('.first-name').val()
    var last_name = $('.last-name').val()
    var email = $('.email').val()
    var password = $('.password').val()
    $('.notice').show()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:4007/user/create-user',
        dataType: 'json',
        data: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        },
        success: function(data, status) {
            if (data.success == 1) {
                $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
            } else {
                $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('.notice-text').html('<span class="text-danger">' + err.statusText + '</span>')
        }
    })
})
$(document).on('click', '#login', function() {
    var email = $('.email').val()
    var password = $('.password').val()
    $('.notice').show()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:4007/user/login',
        dataType: 'json',
        data: {
            email: email,
            password: password
        },
        success: function(data, status) {
            if (data.success == 1) {
                $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                setTimeout(function() {
                    window.location.replace('/')
                }, 2000)
            } else {
                $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('.notice-text').html('<span class="text-danger">Invalid email & password</span>')
        }
    })
})