window.onload = function() {
    add_banner();
    gotofunc();
    DepartTable();
    AdminTable();
    del_add_Depart();
    del_add_Administrator();
}

function DepartInfo(did, dname) {
    this.head = "<tr id='did"+did+"'><form><th><button class='btn delbutton' value='"+did+"'>注销</button></th><td>";
    this.text1 = "</td></form><td>";
    this.text5 = "</td></tr>";
    this.did = did;
    this.dname = dname;
    this.GetDepartInfo_ = GetDepartInfo(this);
}

function GetDepartInfo(depart) {
    return (depart.head+depart.did+depart.text1+depart.dname+depart.text5);
}


function DepartTable() {
    $.ajax({
        url: '../DepartmentManage/getAllDepartment',
        type: 'POST',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if (res['success'] == 1) {
                var dnames = res['did_depart'];
                for (var x in dnames) {
                    var a = new DepartInfo(x, dnames[x]);
                    $("#DTBody").append(a.GetDepartInfo_);
                    $("#did").append("<li><input type='checkbox' name='checkbox' class='labelauty' id= '"+x+"' style='display: none'><label for='"+x+"'><span class='labelauty-unchecked-img'></span><span class='labelauty-unchecked'>"+dnames[x]+"</span><span class='labelauty-checked-img'></span><span class='labelauty-checked'>"+dnames[x]+"</span></label></li>");
                }
            } else {
                // alert("请求失败");
            }
        }, error: function(err) {
            console.log(err);
        }
    })
}

function AdminInfo(nid, name) {
    this.head = "<tr id='"+nid+"'><form><th><button class='btn delbutton' value='"+nid+"'>注销</button></th><td>";
    this.text1 = "</td></form><td>";
    this.text5 = "</td></tr>";
    this.nid = nid;
    this.name = name;
    this.GetAdminInfo_ = GetAdminInfo(this);
}

function GetAdminInfo(admin) {
    return (admin.head+admin.nid+admin.text1+admin.name+admin.text5);
}


function AdminTable() {
    $.ajax({
        url: '../ManagerManage/getAllManager',
        type: 'POST',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if (res['success'] == 1) {
                var dnames = res['manager'];
                for (var x in dnames) {
                    var a = new AdminInfo(x, dnames[x]);
                    $("#ATBody").append(a.GetAdminInfo_);
                }
            } else {
                // alert("请求失败");
            }
        }, error: function(err) {
            console.log(err);
        }
    })

}

function del_add_Depart() {
    $("#DTBody").delegate('.delbutton', 'click', function() {
        var deldepartId = this.value;
        if (confirm("确定要删除"+deldepartId+"吗？")) {
            //删除成功后，删除表项；
            $.ajax({
                url: '../DepartmentManage/delDepartment',
                type: 'POST',
                dataType: 'json',
                data: {'did': deldepartId},
                success:function(res) {
                    if (res['success'] == 1) {
                        var id_ = "#did" + deldepartId;
                        $(id_.toString()).remove();
                        alert("删除成功！");
                    } else {
                        alert("删除失败！");
                    }
                    console.log(res);
                }, error: function(err) {
                    console.log(err);
                }
            });            
        }

    });

    $("#adddepartbutton").click(function(){
        var dname = $("#dname").val();
        var password = $("#password1").val();
        $.ajax({
            url: '../DepartmentManage/addDepartment',
            type: 'POST',
            dataType: 'json',
            data: {'passwd': password, 'dname':dname},
            success: function(res) {
                if (res['success'] == 1) {
                    var did = res['did'];

                    var a = new DepartInfo(did, dname);
                    $("#DTBody").append(a.GetDepartInfo_);
                    $("#did").append("<li><input type='checkbox' name='checkbox' class='labelauty' id= '"+did+"' style='display: none'><label for='"+did+"'><span class='labelauty-unchecked-img'></span><span class='labelauty-unchecked'>"+dname+"</span><span class='labelauty-checked-img'></span><span class='labelauty-checked'>"+dname+"</span></label></li>");
                    $("#dname").val("");
                    $("#password1").val("");
                    alert("添加成功！");
                } else if (res['success'] == 2){
                    $("#dname").val("");
                    $("#password1").val("");
                    alert("密码错误");
                } else {
                    $("#dname").val("");
                    $("#password1").val("");
                    alert("该部门已存在！");
                }
                console.log(res);
            }, error: function(err) {
                console.log(err);
            }
        });
    });
}

function del_add_Administrator() {
    $("#ATBody").delegate('.delbutton', 'click', function() {
        var delAId = this.value;

        if (confirm("确定要删除"+delAId+"吗？")) {
            //删除成功后，删除表项；
            $.ajax({
                url: 'delManager',
                type: 'post',
                dataType: 'json',
                data: {'mid': delAId},
                success: function(res) {
                    if (res['success'] == 1) {
                        var id_ = "#" + delAId;
                        $(id_.toString()).remove();
                        alert("删除成功");
                    } else {
                        alert("删除失败");
                    }
                }
            });
            
        }

    });


    $("#addadmbutton").click(function(){
        var addAdministratorId = $("#addid").val();
        var addAdministratorPword = $("#password2").val();
        var departments = new Array();
        var obj_checkbox = document.getElementsByName("checkbox");
        for (var i = 0; i < obj_checkbox.length; i++) {
            if (obj_checkbox[i].checked)
                departments.push(obj_checkbox[i].id);
        }
        $.ajax({
            url: 'addManager',
            type: 'POST',
            dataType: 'json',
            data: {'passwd': addAdministratorPword, 'mid': addAdministratorId, 'did': departments},
            success: function(res) {
                if (res['success'] == 1) {
                    var a = new AdminInfo(addAdministratorId, "anonymous");
                    $("#ATBody").append(a.GetAdminInfo_);
                    alert("添加成功！");
                } else if (res['success'] == 2){
                    alert("密码错误！");
                } else {
                    alert("该管理员已存在！");
                }
                $("#addid").val("");
                $("#password2").val("");
                for (var i = 0; i < obj_checkbox.length; i++) {
                    obj_checkbox[i].checked = false;
                }
                console.log(res);
            }, error: function(err) {
                console.log(err);
            }
        });

    });
}
