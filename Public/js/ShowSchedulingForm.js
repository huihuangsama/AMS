window.onload = function() {
	add_banner();
	gotofunc();
	GetDepartment();
	SelectDepart();
}

function GetDepartment() {
    $.ajax({
        url: '../DepartmentManage/getRelatedDepartment',
        type: 'post',
        dataType: 'json',
        success: function(res) {
            if (res['success'] == 1) {
                var dnames = res['did_depart'];
                if (dnames == 0) {
                    $("#department").parent().parent().remove();
                    ShowScheduling();
                } else {
                    for (var x in dnames) {
                        $("#department").append("<option value='"+x+"'>"+dnames[x]+"</option>");
                    }
                }
            } else {
                alert("请求失败！");
            }
        }, error: function(err) {
            console.log(err);
        }
    });
}

function SelectDepart() {
	$("#department").change(function() {
		// alert($("#department").val());
		$("tbody p").parent().remove();
		ShowScheduling();
	});
}

function ShowScheduling() {
    var did = null;
    did = $("#department").val();

    // 向后台传送所选部门ID
    $.ajax({
        url: 'getScheduling',
        type: 'post',
        dataType: 'json',
        data: {'did': did},
        success:function(res) {            
            if (res['success'] == 1) {
                var Scheduling = res['data'];
                for (var i = 0; i < Scheduling.length; i++) {
                    var sid = Scheduling[i].substring(0,8);
                    var time = Scheduling[i].substring(8,17);
                    var stime = "#" + time;
                    $(stime.toString()).append("<li><p>"+sid+"</p></li>");
                }
            } else {
                // alert("还未排班！");
            }
        }, error: function(err) {
            console.log(err);
        }
    });
}
