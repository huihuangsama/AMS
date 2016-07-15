window.onload = function() {
	add_banner();
	gotofunc();
	SelectInput();
	GetDepartment();
	SelectDepart();
	SaveScheduling();
}

function GetDepartment() {
	// 从后台获得该管理员所辖部门信息
	$.ajax({
		url: '../DepartmentManage/getRelatedDepartment',
		type: 'post',
		dataType: 'json',
		success: function(res) {
			if (res['success'] == 1) {
				var dnames = res['did_depart'];
				for (var x in dnames) {
					$("#department").append("<option value='"+x+"'>"+dnames[x]+"</option>");
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
		$("input").parent().remove();
		SetScheduling();
	});
}

function SetScheduling() {
	// 向后台传送所选部门ID
	var did = $("#department").val();
	$.ajax({
		url: '../FreeTimeManage/getAllFreeTime',
		type: 'post',
		dataType: 'json',
		data: {'did': did},
		success:function(res) {
			if (res['success'] == 1) {
				var free_time = res['free_time'];
				for (var i = 0; i < free_time.length; i++) {
					var sid = free_time[i].substring(0,8);
					var time = free_time[i].substring(8,17);
					var stime = "#" + time;
					$(stime.toString()).append("<li><input type='checkbox' name='checkbox' class='labelauty' id= '"+sid+time+"' style='display: none'><label for='"+sid+time+"'><span class='labelauty-unchecked-img'></span><span class='labelauty-unchecked'>"+sid+"</span><span class='labelauty-checked-img'></span><span class='labelauty-checked'>"+sid+"</span></label></li>");	
				}
			} else {
				alert("请求失败！");
			}
		}, error: function(err) {
			console.log(err);
		}
	});

}

function SelectInput() {
	$(':input').labelauty();
}

function SaveScheduling() {
	$("#saveScheduling").click(function() {
		var did = $("#department").val();
		var Scheduling = new Array();
		var obj_checkbox = document.getElementsByName("checkbox");
		for (var i = 0; i < obj_checkbox.length; i++) {
			if (obj_checkbox[i].checked)
				Scheduling.push(obj_checkbox[i].id);
		}
		// 传给后台部门ID和该部门的排班表
		$.ajax({
			url: 'setScheduling',
			type: 'post',
			dataType: 'json',
			data: {'did': did, 'scheduling':Scheduling},
			success: function(res) {
				alert("排班成功");
			}, error:function(err) {
				console.log(err);
			}
		});
	});
}
