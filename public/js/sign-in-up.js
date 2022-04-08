$(document).on('click', '#login', function() {
    var email = $('.email').val()
    var password = $('.password').val()
    $('.notice').show()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:4007/api/admin/login',
        dataType: 'json',
        data: {
            email: email,
            password: password
        },
        success: function(data, status) {
            if (data.success == 1) {
                $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
                setTimeout(function() {
                    window.location.replace('/admin')
                }, 2000)
            } else {
                $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('.notice-text').html('<span class="text-danger">' + err.status + ' ' + err.statusText + '</span>')
        }
    })
})