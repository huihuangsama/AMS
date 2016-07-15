function add_banner() {
	var div_banner = document.createElement("div");
	div_banner.setAttribute("class", "banner");
	var p_banner = document.createElement("p");
	p_banner.innerHTML = "勤工俭学助理工作管理系统";
	div_banner.appendChild(p_banner);
	$(".navigationbar").prepend(div_banner);
}

function gotofunc() {
	$("a").click(function() {
		if (this.innerHTML == "个人信息管理") {
			window.location = "../InfoManage/infoManageForm";
		} else if (this.innerHTML == "登记空闲时间") {
			window.location = "../FreeTimeManage/freeTimeManageForm";
		} else if(this.innerHTML == "上下班登记") {
			window.location = "../CheckInOut/checkInOutForm";
		}	else if (this.innerHTML == "管理助理") {
			window.location = "../AssistantManage/assistantManageForm"; //need to change
		} else if (this.innerHTML == "结算工时") {
			window.location = "../Scheduling/workingHourForm"; //need to change
		} else if (this.innerHTML == "助理排班") {
			window.location = "../Scheduling/schedulingForm"; //need to change
		} else if (this.innerHTML == "退出") {
			$.ajax({
				url: '../UserManage/logoff',
			});
			window.location = "../UserManage/LoginInForm";
		} else if (this.innerHTML == "查看排班表") {
			window.location = "../Scheduling/getSchedulingForm";
		} else {
			window.location = "../Index/Home";
		}
	});
}

// function is_assistant() {
// 	document.getElementById("dj").style.display = "";
// }

// function CheckCookie() {
// 	var strCookie = document.cookie;
// 	var arrCookie = strCookie.split(";");
// 	var type, userId;

// 	for (var i = 0; i < arrCookie.length; i++) {
// 		var arr = arrCookie[i].split("=");
// 		if ($.trim(arr[0]) == "userId") {
// 			userId = arr[1];
// 		}
// 		if ($.trim(arr[0]) == "type") {
// 			type = arr[1];
// 		}
// 	}

// 	if (typeof(userId) != 'undefined' && typeof(type) != 'undefined') {
//         console.log('userId');
//         return true;
//     }
//     return false;
// }

// function OverTime() {
// 	if (confirm("操作超时！是否重新登陆？")) {
// 		window.location = "../UserManage/loginForm";
// 	}
// }

// function GetIdInCookie() {
// 	var strCookie = document.cookie;
// 	var arrCookie = strCookie.split(";");
// 	var type;

// 	for (var i = 0; i < arrCookie.length; i++) {
// 		var arr = arrCookie[i].split("=");
// 		if ($.trim(arr[0]) == "userId") {
// 			userId = arr[1];
// 		}
// 	}
// 	return userId;
// }

// function GetTypeInCookie() {
// 	var strCookie = document.cookie;
// 	var arrCookie = strCookie.split(";");
// 	var userId;

// 	for (var i = 0; i < arrCookie.length; i++) {
// 		var arr = arrCookie[i].split("=");
// 		if ($.trim(arr[0]) == "type") {
// 			type = arr[1];
// 		}
// 	}
// 	return type;
// }

function addDangerAlert() {
	$(".content").prepend('<div class="alert alert-dismissible sr-only" role="alert"><p id="danger-word"></p></div>');
	$(".alert").css({
		"float": 'right',
		"width": '30%',
		"margin-top": '2em',
		"text-align": 'center'
	});
	console.log("danger-alert");
}
function openDangerAlter(text) {
	$("#danger-word").text(text);
	$(".alert").addClass('alert-danger');
	$(".alert").removeClass('sr-only');
}
function closeDangerAlter() {
	if($(".alert").hasClass('sr-only')) {
		$(".alert").addClass('sr-only');
		$(".alert").removeClass('alter-danger');
	}
}

function openSuccessAlter(text) {
	$("#danger-word").text(text);
	$(".alert").addClass('alert-success');
	$(".alert").removeClass('sr-only');
}
function closeDangerAlter() {
	if(!$(".alert").hasClass('sr-only')) {
		$(".alert").addClass('sr-only');
		$(".alert").removeClass('alter-danger');
	}
}