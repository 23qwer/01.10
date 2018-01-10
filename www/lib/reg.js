$('input[type=text]').on('input', function () {
    const username = $(this).val();
    $.get('/test?username=' + username, function (res) {
        console.log(res)
        if (res.success == 0) {
            const regex = /^[\u4e00-\u9fa5\w!@#￥%&]{2,15}$/
            if(regex.test(username)){
                $('.namePD').html('<span>正确</span>')
            }else{
                $('.namePD').html('<span>格式错误</span>')
            }
        }else{
            $('.namePD').html('<span>该用户已经存在</span>')
        }
    })
})
$('input[type=password]:first').on('input', function () {
    const password = $(this).val();
    const regex = /^[\w!@#￥%&]{6,12}$/;
    if (regex.test(password)) {
        $('.passwordPD').html('<span>正确</span>')
    } else {
        $('.passwordPD').html('<span>格式错误</span>')
    }
})
$('input[type=password]:EQ(1)').on('input', function () {
    const password = $('input[type=password]:first').val();
    const passwordcON = $(this).val();
    if (password == passwordcON) {
        $('.PD').html('<span>两次密码一致</span>')
    } else {
        $('.PD').html('<span>两次不密码一致</span>')
    }
})
$('form').submit(function (event) {
    event.preventDefault();
    const value = $(this).serialize();
    console.log(value);
    $.post('/reg', value, function (res) {
        console.log(res)
    })
})

$.get('/getall',function(res){
    $('#container').html(res)
})