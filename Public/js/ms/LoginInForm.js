window.onload = function() {
    post_data();
    $("#account").blur(function(event) {
        var account = $("#account").val();
        var is_num = true;
        for(var i = 0; i < account.length; i++) {
            if (isNaN(Number(account[i]))) {
                is_num = false;
            }
        }
        if (account.length == 8 && is_num) {
            if ($("#account-group").hasClass('has-error')) {
                $("#account-group").removeClass('has-error');
                $(".alert").addClass('sr-only');
            }
        } else {
            $("#account-group").addClass('has-error');
            $(".alert").removeClass('sr-only');
            $("#danger-word").text('请输入正确的账号(必须为8位数字)');
        }
        
    });
}

function post_data() {
    $("#signinbutton").click(function() {
        data = $("form").serializeArray();
        if (data.length < 3) {
            alert("请输入所要登陆信息");
            return;
        }
        // console.log(data[2]);
        // alert(data[0].value + data[1].value + data[2].value);//test

        $.ajax({
            url: 'login',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(data) {
                if (data['success'] == 1) {
                    location.href = '../Index/HomePage';
                } else {
                    alert("登陆失败");
                }
            }, error:function(err) {
                console.log(err);
            }
        });
    });
}
