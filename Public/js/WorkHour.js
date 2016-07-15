window.onload = function() {
    add_banner();
    gotofunc();
    GetthisMonthWorkingHour();
    showWorkingHour();
}
function showWorkingHour() {
    $.ajax({
        url: 'showWorkingHour',
        type: 'post',
        dataType: 'json',
        success: function(res) {
            if (res['success'] == 1) {

                for (var i = 0; i < res['data'].length; i++) {
                    var a = new AssistantInfo(res['data'][i]);
                    $("tbody").append(a.GetAssistantInfo_.toString());
                 }
            }
            console.log(res);
        }, error: function(err) {
            console.log(err);
        }
    });
}
function AssistantInfo(data) {
    this.aid = data.aid;
    this.sname = data.name;
    this.dname = data.dname;
    this.phone = data.phone;
    this.email = data.email;
    this.lel_time = data.lel_time;
    this.lel_work_hour = data.lel_work_hour;
    this.work_hour = data.work_hour;
    this.GetAssistantInfo_ = GetAssistantInfo(this);
}

function GetAssistantInfo(Assistant) {
    return ("<tr><td>"+Assistant.aid+"</td><td>"
        +Assistant.sname+"</td><td>"
        +Assistant.dname+"</td><td>"
        +Assistant.lel_time+"</td><td>"
        +Assistant.lel_work_hour+"</td><td>"
        +Assistant.work_hour+"</td><td>"
        +Assistant.phone+"</td><td>"
        +Assistant.email+"</td><tr>");
}

function Set() {
    $.ajax({
        url: 'countWorkingHour',
        type: 'post',
        dataType: 'json',
        success: function(res) {
            if (res['success'] == 1) {
                window.location.reload();
            }
            // console.log(res);
        }, error: function(err) {
            console.log(err);
        }
    });
    
    // var data = [{"aid": "13331190", "name": "罗俊杰", "email": "13331190@123.com", "phone": "123", "lel_time": "0", "lel_work_hour": "0", "work_hour": "0"},
    // {"aid": "13331190", "name": "罗俊杰", "email": "13331190@123.com", "phone": "123", "lel_time": "0", "lel_work_hour": "0", "work_hour": "0"}];
    // for (var i = 0; i < data.length; i++) {
    //     var a = new AssistantInfo(data[i]);
    //     $("tbody").append(a.GetAssistantInfo_.toString());
    // }
}

function GetthisMonthWorkingHour() {
	$("#Settlement").click(function() {

			var d = new Date();
			var vDay = d.getDate();

			// if (vDay < 27) {
			// 	alert("未到本月27日，不可结算本月工时！");
			// } else {
   //              var vYear = d.getFullYear();
   //              var vMon = d.getMonth() + 1;
   //              var h = d.getHours(); 
   //              if (vMon < 10) vMon = "0" + vMon;
   //              if (vDay < 10) vDay = "0" + vDay;
   //              // 获得系统时间，格式如：20160607
   //              var time = vYear+vMon+vDay;
			// 	$("tbody").empty();
   //              // 工时结算完成后，获得最新工时;
			// 	Set();
			// }
                Set();

	});
}
