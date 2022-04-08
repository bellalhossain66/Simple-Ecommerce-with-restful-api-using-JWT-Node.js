function get_Product_list() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:4007/api/product/get-product',
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                var html = ''
                for (var i = 0; i < data.data.length; i++) {
                    html += '<tr>'
                    html += '<td>' + data.data[i].id + '</td>'
                    html += '<td> <img src="' + data.data[i].image + '" class="img-fluid" width="100"></td>'
                    html += '<td>' + data.data[i].name + '</td>'
                    html += '<td>' + data.data[i].price + '</td>'
                    html += '<td>'
                    html += '<span class="btn btn-sm btn-info viewProduct" proId="' + data.data[i].id + '" data-toggle="modal" data-target="#pro-view-detail"><i class="fa fa-eye"></i></span> '
                    html += '<span class="btn btn-sm btn-danger deleteProduct" proId="' + data.data[i].id + '"><i class="fa fa-trash"></i></span>'
                    html += '</td>'
                    html += '</tr>'
                }
                $('#pro-list').html(html)
            } else {
                $('#pro-list').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('#pro-list').html('<span class="text-danger">' + err.status + ' ' + err.statusText + '</span>')
        }
    })
}
var url = window.location.href
url = url.substring(url.lastIndexOf('/') + 1)
if (url == 'product-list') {
    get_Product_list()
}

$(document).on('click', '#product-add-submit', function() {
    var name = $('#inputName').val();
    var price = $('#inputPrice').val();
    var img = $('#inputImage').val()
    $('.notice').show()
    $('.notice-text').text(' ');
    $('.notice-text').text('Loading...');
    $.ajax({
        method: 'POST',
        url: 'http://localhost:4007/api/product/add-product',
        dataType: 'json',
        data: {
            name: name,
            price: price,
            image: img
        },
        success: function(data, status) {
            if (data.success == 1) {
                $('.notice-text').html('<span class="text-success">' + data.message + '</span>')
            } else {
                $('.notice-text').html('<span class="text-danger">' + data.message + '</span>')
            }
        },
        error: function(err) {
            $('.notice-text').html('<span class="text-danger">' + err.status + ' ' + err.statusText + '</span>')
        }
    })
})
var Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
});

$(document).on('click', '.deleteProduct', function() {
    var id = $(this).attr('proId')
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:4007/api/product/delete-product',
        dataType: 'json',
        data: {
            id: id
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                setTimeout(function() {
                    $('#pro-list').html('')
                    get_Product_list()
                }, 1000)
            } else {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        },
        error: function(err) {
            Toast.fire({
                icon: 'error',
                title: ' ' + err.status + ' ' + err.statusText
            })
        }
    })
})
$('.searchProduct').keyup(function() {
    var search = $(this).val()
    if (search != '') {
        $('#pro-list').html('')
        $.ajax({
            method: 'POST',
            url: 'http://localhost:4007/api/product/search-product/',
            dataType: 'json',
            data: {
                search: search
            },
            success: function(data) {
                //alert(data.data.length)
                if (data.success == 1) {
                    var html = ''
                    for (var i = 0; i < data.data.length; i++) {
                        html += '<tr>'
                        html += '<td>' + data.data[i].id + '</td>'
                        html += '<td> <img src="' + data.data[i].image + '" class="img-fluid" width="100"></td>'
                        html += '<td>' + data.data[i].name + '</td>'
                        html += '<td>' + data.data[i].price + '</td>'
                        html += '<td>'
                        html += '<span class="btn btn-sm btn-info viewProduct" proId="' + data.data[i].id + '" data-toggle="modal" data-target="#pro-view-detail"><i class="fa fa-eye"></i></span> '
                        html += '<span class="btn btn-sm btn-danger deleteProduct" proId="' + data.data[i].id + '"><i class="fa fa-trash"></i></span>'
                        html += '</td>'
                        html += '</tr>'
                    }
                    $('#pro-list').html(html)
                } else {
                    $('#pro-list').html('<tr><td colspan="5"><span class="text-danger">' + data.message + '</span></td></tr>')
                }
            },
            error: function(err) {
                $('#pro-list').html('<tr><td colspan="5"><span class="text-danger">' + err.statusText + '</span></td></tr>')
            }
        })
    } else {
        get_Product_list()
    }
})
$(document).on('click', '.viewProduct', function() {
    var id = $(this).attr('proId')
    $.ajax({
        method: 'GET',
        url: 'http://localhost:4007/api/product/detail/' + id,
        dataType: 'json',
        success: function(data) {
            if (data.success == 1) {
                $('.pro-view-img').attr('src', data.data.image)
                $('.pro-view-img-url').val(data.data.image)
                $('.pro-view-name').val(data.data.name)
                $('.pro-view-price').val(data.data.price)
                $('.pro-view-id').val(data.data.id)
            } else {
                $('.pro-view-img').attr('src', '')
                $('.pro-view-img-url').val('')
                $('.pro-view-name').val('')
                $('.pro-view-price').val('')
                $('.pro-view-id').val('')
            }
        },
        error: function(err) {
            $('.pro-view-img').attr('src', '')
            $('.pro-view-img-url').val('')
            $('.pro-view-name').val('')
            $('.pro-view-price').val('')
            $('.pro-view-id').val('')
        }
    })
})
$(document).on('click', '.product-update-submit', function() {
    var name = $('.pro-view-name').val()
    var price = $('.pro-view-price').val()
    var image = $('.pro-view-img-url').val()
    var id = $('.pro-view-id').val()
    $.ajax({
        method: 'PATCH',
        url: 'http://localhost:4007/api/product/update-product',
        dataType: 'json',
        data: {
            name: name,
            price: price,
            image: image,
            id: id
        },
        success: function(data) {
            if (data.success == 1) {
                Toast.fire({
                    icon: 'success',
                    title: ' ' + data.message
                })
                setTimeout(function() {
                    $('#pro-list').html('')
                    get_Product_list()
                }, 1000)
            } else {
                Toast.fire({
                    icon: 'error',
                    title: ' ' + data.message
                })
            }
        },
        error: function(err) {
            Toast.fire({
                icon: 'error',
                title: ' ' + err.status + ' ' + err.statusText
            })
        }
    })
})