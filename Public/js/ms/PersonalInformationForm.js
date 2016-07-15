window.onload = function() {
    document.getElementById("assure").style.display = "none";
    document.getElementById("PersonalInformationForm").style.display = "";
    document.getElementById("pas").style.display = "none";
    document.getElementById("au_pas").style.display = "none";
    document.getElementById("err").style.display = "none";
    document.getElementById("err0").style.display = "none";
    document.getElementById("savepersonalinfo").innerHTML = "修改";
    var input_array = $(":input");
    for (var i = 2; i <= 6; i++) {
        input_array[i].setAttribute("readOnly", "true");
        input_array[i].style.backgroundColor = "transparent";
        input_array[i].style.border = "none";
        input_array[i].style.paddingBottom = "7px";
    }
    input_array.removeClass("form-control");
    $("#password").blur(function() {
        if ($("#password").val().length <= 8 && $("#password").val().length > 0) {
            document.getElementById("err0").style.display = "";
        } else {
            document.getElementById("err0").style.display = "none";
        }
    });
    $("#au_password").blur(function() {
        if ($("#au_password").val() !== $("#password").val() && $("#password").val().length > 8) {
            document.getElementById("err").style.display = "";
        } else {
            document.getElementById("err").style.display = "none";
        }
    });
    add_banner();
    gotofunc();
    giveInfo();
    assure();
    addDangerAlert();
    setInfo()
}

function setInfo() { //显示从后台返回的个人信息
    $.ajax({
        url: 'getUserInfo',
        type: 'post',
        dataType: 'json',
        // data: data,
        success: function(res) {
            console.log(res);
            if (res['success'] == 1) {
                $("#account").val(res['data']['account']);
                $("#department").val(res['data'][0]['department']);
                $("#name").val(res['data'][0]['name']);
                $("#phone").val(res['data'][0]['phone']);
                $("#email").val(res['data'][0]['email']);
                closeDangerAlter();
            } else {
                openDangerAlter('请求失败');
            }
        }, error: function(err) {
            console.log(err);
        }
    });
}

function giveInfo() { //将设置好的个人信息交互给后台
    $("#savepersonalinfo").click(function() {
        if (this.innerHTML === "修改") {
            document.getElementById("assure").style.display = "";
            document.getElementById("PersonalInformationForm").style.display = "none";
        } else if (this.innerHTML === "保存") {
            var info = $("#infoform").serializeArray();
            $.ajax({
                url: 'updateUserInfo',
                type: 'post',
                dataType: 'JSON',
                data: info,
                success: function(res) {
                    if (res['success'] == 1) {
                        window.location.reload();
                        document.getElementById("err").style.display = "none";
                        document.getElementById("pas").style.display = "none";
                        document.getElementById("au_pas").style.display = "none";
                        document.getElementById("savepersonalinfo").innerHTML = "修改";
                    } else {
                        openDangerAlter('更新失败');
                    }
                    console.log(res);
                }, error: function(err) {
                    console.log(err);
                }
            });
            console.log(info);
        }
    });
}

function assure() {
    $("#confirm").click(function() {
        data = $("#assureform").serializeArray();
        $.ajax({
            url: 'checkUser',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(res) {
                // console.log(res);
                if (res['success'] == 1) {
                    document.getElementById("savepersonalinfo").innerHTML = "保存";
                    document.getElementById("pas").style.display = "";
                    document.getElementById("au_pas").style.display = "";
                    document.getElementById("PersonalInformationForm").style.display = "";
                    document.getElementById("assure").style.display = "none";
                    var input_array = $(":input");
                    for (var i = 3; i <= 6; i++) {
                        input_array[i].removeAttribute("readOnly");
                        input_array[i].removeAttribute("style");
                    }
                    input_array.addClass("form-control");
                    document.getElementById("account").setAttribute("readOnly", "true");
                    document.getElementById("account").style.backgroundColor = "transparent";
                    document.getElementById("account").style.border = "none";
                    document.getElementById("account").style.paddingBottom = "7px"
                    $("#department").removeClass("form-control");
                    $("#account").removeClass("form-control");
                    $("#confirm").children().removeClass("form-control")
                    $("#asspassword").removeClass("form-control");
                    $("#savepersonalinfo").removeClass("form-control");
                    closeDangerAlter();
                } else {
                    openDangerAlter('密码错误');
                }
            }, error: function(err) {
                console.log(err);
            }
        });
    });
}
