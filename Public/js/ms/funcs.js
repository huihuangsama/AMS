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
			window.location = "PersonalInformationForm.html";
		} else if (this.innerHTML == "登记空闲时间") {
			window.location = "FreeTimeForm.html";
		} else if(this.innerHTML == "上下班登记") {
			window.location = "WorkRegister.html";
		}	else if (this.innerHTML == "管理助理") {
			window.location = "javascript:void(0)"; //need to change
		} else if (this.innerHTML == "结算工时") {
			window.location = "javascript:void(0)"; //need to change
		} else if (this.innerHTML == "助理排班") {
			window.location = "javascript:void(0)"; //need to change
		} else if (this.innerHTML == "退出") {
			window.location = "LoginInForm.html";
		} else if (this.innerHTML == "首页") {
			window.location = "HomePage.html";
		}
	});
}

function is_assistant() {
	document.getElementById("dj").style.display = "";
}